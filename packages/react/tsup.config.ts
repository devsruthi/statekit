import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { isAbsolute, join, relative } from 'node:path';
import { defineConfig } from 'tsup';

const packageRoot = process.cwd();

const CSS_NAMESPACE = 'statekit-css-modules';

function cssModulesPlugin() {
  return {
    name: 'statekit-css-modules',
    setup(build: {
      onResolve: (
        options: { filter: RegExp },
        callback: (args: { path: string; resolveDir: string }) => {
          path: string;
          namespace: string;
          pluginData: { cssPath: string };
        },
      ) => void;
      onLoad: (
        options: { filter: RegExp; namespace: string },
        callback: (args: {
          path: string;
          pluginData?: { cssPath?: string };
        }) => {
          contents: string;
          loader: 'js';
        },
      ) => void;
    }) {
      build.onResolve({ filter: /\.module\.css$/ }, (args) => {
        const cssPath = isAbsolute(args.path)
          ? args.path
          : join(args.resolveDir, args.path);

        return {
          // Avoid a ".css" path so tsup/esbuild do not treat this as a stylesheet.
          path: `${cssPath}.js`,
          namespace: CSS_NAMESPACE,
          pluginData: { cssPath },
        };
      });

      build.onLoad({ filter: /.*/, namespace: CSS_NAMESPACE }, (args) => {
        const cssPath =
          args.pluginData?.cssPath ?? args.path.replace(/\.js$/, '');
        const source = readFileSync(cssPath, 'utf8');
        const classNames: Record<string, string> = {};

        const css = source.replace(
          /\.([A-Za-z_][\w-]*)/g,
          (_match, name: string) => {
            if (!classNames[name]) {
              const hash = createHash('sha256')
                .update(`${cssPath}:${name}`)
                .digest('hex')
                .slice(0, 6);
              classNames[name] = `sk_${name}_${hash}`;
            }

            return `.${classNames[name]}`;
          },
        );

        const stableId = relative(packageRoot, cssPath).replace(/\\/g, '/');

        return {
          contents: `
              const css = ${JSON.stringify(css)};
              const styleId = ${JSON.stringify(`statekit:${stableId}`)};

              if (typeof document !== 'undefined') {
                let style = document.querySelector('style[data-statekit="' + styleId + '"]');
                if (!style) {
                  style = document.createElement('style');
                  style.setAttribute('data-statekit', styleId);
                  style.textContent = css;
                  document.head.appendChild(style);
                }
              }

              export default ${JSON.stringify(classNames)};
            `,
          loader: 'js' as const,
        };
      });
    },
  };
}

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: false,
  target: 'es2022',
  outDir: 'dist',
  tsconfig: 'tsconfig.build.json',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  esbuildPlugins: [cssModulesPlugin()],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.js' : '.cjs',
    };
  },
});

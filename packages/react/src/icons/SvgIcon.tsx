import type { ReactElement } from 'react';

export type SvgIconProps = {
  /** Raw SVG markup (from a `.svg` file import). */
  svg: string;
  className?: string;
  /** Square size in px. @default 22 */
  size?: number;
};

/**
 * Renders a raw SVG string as an icon, preserving `currentColor` theming.
 */
export function SvgIcon({
  svg,
  className,
  size = 22,
}: SvgIconProps): ReactElement {
  let markup = svg
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!DOCTYPE[\s\S]*?>/gi, '')
    .trim();

  markup = markup
    .replace(/\s(?:width|height)="[^"]*"/g, '')
    .replace(/<svg\b([^>]*)>/i, (_match, attrs: string) => {
      const cleaned = attrs
        .replace(/\sclass="[^"]*"/g, '')
        .replace(/\sfocusable="[^"]*"/g, '');
      const classAttr = className ? ` class="${className}"` : '';
      return `<svg width="${size}" height="${size}" focusable="false"${classAttr}${cleaned}>`;
    });

  return (
    <span
      style={{ display: 'inline-flex', lineHeight: 0 }}
      // SVG assets are first-party and static.
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

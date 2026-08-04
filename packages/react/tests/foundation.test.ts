import { describe, expect, it } from 'vitest';
import * as publicApi from '../src/index';
import { State } from '../src/index';

describe('@statekit/react public API', () => {
  it('exports the State component', () => {
    expect(State).toBeTypeOf('function');
  });

  it('does not export internal Loading, Error, or Empty components', () => {
    expect(publicApi).not.toHaveProperty('Loading');
    expect(publicApi).not.toHaveProperty('Error');
    expect(publicApi).not.toHaveProperty('Empty');
  });
});

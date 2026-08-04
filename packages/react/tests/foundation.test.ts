import { describe, expect, it } from 'vitest';
import { State } from '../src/index';

describe('@statekit/react public API', () => {
  it('exports the State component', () => {
    expect(State).toBeTypeOf('function');
  });
});

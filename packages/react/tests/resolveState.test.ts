import { describe, expect, it } from 'vitest';
import { STATE_KIND, STATE_PRIORITY } from '../src/constants/priority';
import { resolveState } from '../src/core/resolveState';

describe('resolveState', () => {
  it('exposes loading → error → empty → success priority', () => {
    expect(STATE_PRIORITY).toEqual([
      STATE_KIND.loading,
      STATE_KIND.error,
      STATE_KIND.empty,
      STATE_KIND.success,
    ]);
  });

  it('resolves success when no flags are active', () => {
    expect(resolveState({})).toEqual({ type: STATE_KIND.success });
  });

  it('resolves loading', () => {
    expect(resolveState({ loading: true })).toEqual({
      type: STATE_KIND.loading,
    });
  });

  it('resolves error', () => {
    const error = new Error('boom');
    expect(resolveState({ error })).toEqual({
      type: STATE_KIND.error,
      error,
    });
  });

  it('resolves empty', () => {
    expect(resolveState({ empty: true })).toEqual({ type: STATE_KIND.empty });
  });

  it('prioritizes loading over error and empty', () => {
    expect(resolveState({ loading: true, error: 'boom', empty: true })).toEqual(
      { type: STATE_KIND.loading },
    );
  });

  it('prioritizes error over empty', () => {
    expect(resolveState({ error: 'boom', empty: true })).toEqual({
      type: STATE_KIND.error,
      error: 'boom',
    });
  });

  it('treats falsy error values as inactive', () => {
    expect(resolveState({ error: null })).toEqual({
      type: STATE_KIND.success,
    });
    expect(resolveState({ error: undefined })).toEqual({
      type: STATE_KIND.success,
    });
  });
});

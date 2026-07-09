'use client';

import { useEffect, useRef } from 'react';

export interface KeyState {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  ArrowUp: boolean;
  ArrowLeft: boolean;
  ArrowDown: boolean;
  ArrowRight: boolean;
  e: boolean;
}

const KEY_MAP: Record<string, keyof KeyState> = {
  w: 'w', W: 'w',
  a: 'a', A: 'a',
  s: 's', S: 's',
  d: 'd', D: 'd',
  ArrowUp: 'ArrowUp',
  ArrowLeft: 'ArrowLeft',
  ArrowDown: 'ArrowDown',
  ArrowRight: 'ArrowRight',
  e: 'e', E: 'e',
};

/**
 * Returns a stable ref whose .current reflects which movement/interact keys
 * are currently held down. Safe to read from useFrame without causing re-renders.
 */
export function usePlayerControls() {
  const keys = useRef<KeyState>({
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false,
    e: false,
  });

  useEffect(() => {
    const onDown = (ev: KeyboardEvent) => {
      // Don't hijack keys when the user is typing in an input
      const tag = (ev.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const mapped = KEY_MAP[ev.key];
      if (!mapped) return;
      keys.current[mapped] = true;

      // Prevent arrow keys from scrolling the page during play
      if (ev.key.startsWith('Arrow')) ev.preventDefault();
    };

    const onUp = (ev: KeyboardEvent) => {
      const mapped = KEY_MAP[ev.key];
      if (mapped) keys.current[mapped] = false;
    };

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, []);

  return keys;
}

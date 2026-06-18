export const INTRO_DONE_EVENT = 'portfolio-intro-done';

let introDone = false;

export function isIntroDone() {
  return introDone;
}

export function markIntroDone() {
  if (typeof window === 'undefined') return;
  introDone = true;
  window.dispatchEvent(new CustomEvent(INTRO_DONE_EVENT));
}

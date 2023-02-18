import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  open: boolean
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      const tar = event?.target as HTMLElement;

      if (open) {
        return;
      }

      if (tar.closest('[data-test-id=button-burger]')) {
        return;
      }

      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler, open]);
};

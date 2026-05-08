import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NAV_OFFSET = 80; // adjust if your navbar is taller/shorter

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');

      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = rect.top + scrollTop - NAV_OFFSET;

          window.scrollTo({
            top: targetY,
            behavior: 'smooth',
          });
        }
      }, 50);

      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
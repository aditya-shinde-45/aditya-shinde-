import { useEffect, useRef, useState } from 'react';

/**
 * Returns the ID of the section currently most visible in the viewport.
 * Defaults to the first section ID if none are intersecting.
 */
function useScrollSpy(
  sectionIds: string[],
  options?: IntersectionObserverInit
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');
  // Track intersection ratios for each section to pick the most visible one
  const ratioMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (sectionIds.length === 0) return;

    // Reset ratio map when sectionIds change
    ratioMap.current = new Map(sectionIds.map((id) => [id, 0]));

    const observerOptions: IntersectionObserverInit = {
      threshold: Array.from({ length: 21 }, (_, i) => i / 20), // 0, 0.05, 0.1 … 1.0
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        ratioMap.current.set(entry.target.id, entry.intersectionRatio);
      });

      // Pick the section with the highest intersection ratio
      let bestId = sectionIds[0];
      let bestRatio = -1;

      for (const id of sectionIds) {
        const ratio = ratioMap.current.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      // Only update if at least one section is partially visible;
      // otherwise keep the current active section (or fall back to first)
      if (bestRatio > 0) {
        setActiveId(bestId);
      }
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(','), options]);

  return activeId;
}

export default useScrollSpy;

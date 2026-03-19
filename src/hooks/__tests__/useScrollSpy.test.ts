import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useScrollSpy from '../useScrollSpy';

// Minimal IntersectionObserver mock
type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

let observerCallback: ObserverCallback | null = null;
const observedElements: Map<string, Element> = new Map();

const mockObserve = vi.fn((el: Element) => {
  observedElements.set(el.id, el);
});
const mockDisconnect = vi.fn(() => {
  observedElements.clear();
});
const mockUnobserve = vi.fn();

function fireIntersection(entries: Partial<IntersectionObserverEntry>[]) {
  if (observerCallback) {
    observerCallback(entries as IntersectionObserverEntry[]);
  }
}

beforeEach(() => {
  observedElements.clear();
  mockObserve.mockClear();
  mockDisconnect.mockClear();
  mockUnobserve.mockClear();

  class MockIntersectionObserver {
    constructor(cb: ObserverCallback) {
      observerCallback = cb;
    }
    observe = mockObserve;
    unobserve = mockUnobserve;
    disconnect = mockDisconnect;
  }

  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

  // Create DOM elements for each section
  ['hero', 'about', 'projects', 'experience', 'achievements', 'contact'].forEach((id) => {
    const el = document.createElement('section');
    el.id = id;
    document.body.appendChild(el);
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  observerCallback = null;
  document.body.innerHTML = '';
});

const SECTION_IDS = ['hero', 'about', 'projects', 'experience', 'achievements', 'contact'];

describe('useScrollSpy', () => {
  it('defaults to the first section ID on mount', () => {
    const { result } = renderHook(() => useScrollSpy(SECTION_IDS));
    expect(result.current).toBe('hero');
  });

  it('returns empty string when sectionIds is empty', () => {
    const { result } = renderHook(() => useScrollSpy([]));
    expect(result.current).toBe('');
  });

  it('updates to the section with the highest intersection ratio', () => {
    const { result } = renderHook(() => useScrollSpy(SECTION_IDS));

    act(() => {
      fireIntersection([
        { target: { id: 'hero' } as Element, intersectionRatio: 0.1 },
        { target: { id: 'about' } as Element, intersectionRatio: 0.8 },
      ]);
    });

    expect(result.current).toBe('about');
  });

  it('keeps the current active section when all ratios are 0', () => {
    const { result } = renderHook(() => useScrollSpy(SECTION_IDS));

    // First make 'projects' active
    act(() => {
      fireIntersection([
        { target: { id: 'projects' } as Element, intersectionRatio: 0.6 },
      ]);
    });
    expect(result.current).toBe('projects');

    // Now fire with all zeros — should stay on 'projects'
    act(() => {
      fireIntersection([
        { target: { id: 'hero' } as Element, intersectionRatio: 0 },
        { target: { id: 'projects' } as Element, intersectionRatio: 0 },
      ]);
    });
    expect(result.current).toBe('projects');
  });

  it('picks the section with the strictly highest ratio among multiple visible sections', () => {
    const { result } = renderHook(() => useScrollSpy(SECTION_IDS));

    act(() => {
      fireIntersection([
        { target: { id: 'hero' } as Element, intersectionRatio: 0.3 },
        { target: { id: 'about' } as Element, intersectionRatio: 0.5 },
        { target: { id: 'projects' } as Element, intersectionRatio: 0.9 },
      ]);
    });

    expect(result.current).toBe('projects');
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = renderHook(() => useScrollSpy(SECTION_IDS));
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('observes all provided section elements', () => {
    renderHook(() => useScrollSpy(SECTION_IDS));
    expect(mockObserve).toHaveBeenCalledTimes(SECTION_IDS.length);
  });
});

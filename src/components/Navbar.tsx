import { useState } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  items: NavItem[];
  activeSection: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home',         href: '#hero' },
  { label: 'About',        href: '#about' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact' },
];

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Navbar({ items, activeSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_1px_8px_0_rgba(0,0,0,0.07)]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <span className="font-bold text-lg text-gray-900 tracking-tight select-none">
            Aditya Shinde
          </span>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {items.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[44px] min-w-[44px] inline-flex items-center',
                      isActive
                        ? 'text-sky-500 bg-sky-50'
                        : 'text-gray-600 hover:text-sky-500 hover:bg-sky-50',
                    ].join(' ')}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Hamburger button (mobile) */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-gray-600 hover:text-sky-500 hover:bg-sky-50 transition-colors duration-200"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              /* X icon */
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <line x1="3" y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        id="mobile-menu"
        className={[
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <ul
          className="flex flex-col px-4 pb-4 pt-1 gap-1 bg-white border-t border-gray-100"
          role="list"
        >
          {items.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setMenuOpen(false);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[44px] flex items-center',
                    isActive
                      ? 'text-sky-500 bg-sky-50'
                      : 'text-gray-600 hover:text-sky-500 hover:bg-sky-50',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

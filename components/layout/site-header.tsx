"use client";

import {
  ArrowRight,
  ChevronRight,
  Grid2X2,
  MapPin,
  Menu,
  MessageCircleQuestion,
  Route,
  Star,
  UsersRound,
  X,
} from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/shared/brand-mark";
import { navigation } from "@/lib/site-config";

const mobileNavigation = [
  { ...navigation[0], icon: Grid2X2 },
  { ...navigation[1], icon: Route },
  { ...navigation[2], icon: UsersRound },
  { ...navigation[3], icon: Star },
  { ...navigation[4], icon: MessageCircleQuestion },
  { ...navigation[5], icon: MapPin },
] as const;

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const mobileMenuTrigger = mobileMenuTriggerRef.current;
    const focusFrame = window.requestAnimationFrame(() =>
      mobileMenuPanelRef.current?.focus(),
    );

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !mobileMenuPanelRef.current) return;

      const focusableElements = Array.from(
        mobileMenuPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements.at(-1);

      if (!firstFocusable || !lastFocusable) return;

      if (
        event.shiftKey &&
        (document.activeElement === firstFocusable ||
          document.activeElement === mobileMenuPanelRef.current)
      ) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastFocusable ||
          document.activeElement === mobileMenuPanelRef.current)
      ) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      mobileMenuTrigger?.focus({ preventScroll: true });
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1200px)");

    function closeMenuOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) setMobileMenuOpen(false);
    }

    desktopMedia.addEventListener("change", closeMenuOnDesktop);

    return () =>
      desktopMedia.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <BrandMark inverse />

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="button button-primary header-cta" href="#simulador">
          Simular agora
          <ArrowRight aria-hidden="true" />
        </a>

        <div className="mobile-menu">
          <button
            ref={mobileMenuTriggerRef}
            className="mobile-menu-trigger"
            type="button"
            aria-label="Abrir menu de navegação"
            aria-controls="mobile-navigation-dialog"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu aria-hidden="true" />
            <span>Menu</span>
          </button>

          {mobileMenuOpen ? (
            <div
              className="mobile-menu-overlay"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeMobileMenu();
              }}
            >
              <div
                ref={mobileMenuPanelRef}
                id="mobile-navigation-dialog"
                className="mobile-menu-panel"
                role="dialog"
                tabIndex={-1}
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
              >
                <div className="mobile-menu-panel-header">
                  <p id="mobile-menu-title">
                    <span aria-hidden="true" />
                    Explore a página
                  </p>
                  <button
                    className="mobile-menu-close"
                    type="button"
                    aria-label="Fechar menu de navegação"
                    onClick={closeMobileMenu}
                  >
                    <X aria-hidden="true" />
                  </button>
                </div>

                <div className="mobile-menu-separator" aria-hidden="true" />

                <nav
                  className="mobile-menu-links"
                  aria-label="Navegação para celular"
                >
                  {mobileNavigation.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <Fragment key={item.href}>
                        <a
                          className={
                            index === 0
                              ? "mobile-menu-link mobile-menu-link-active"
                              : "mobile-menu-link"
                          }
                          href={item.href}
                          onClick={closeMobileMenu}
                        >
                          <Icon aria-hidden="true" />
                          <span>{item.label}</span>
                          <ChevronRight aria-hidden="true" />
                        </a>
                        {index === 2 ? (
                          <span
                            className="mobile-menu-group-separator"
                            aria-hidden="true"
                          />
                        ) : null}
                      </Fragment>
                    );
                  })}
                </nav>

                <div className="mobile-menu-separator" aria-hidden="true" />

                <a
                  className="mobile-menu-cta"
                  href="#simulador"
                  onClick={closeMobileMenu}
                >
                  <span>Simular agora</span>
                  <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

import { ArrowRight, Menu } from "lucide-react";

import { BrandMark } from "@/components/shared/brand-mark";
import { navigation } from "@/lib/site-config";

export function SiteHeader() {
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

        <details className="mobile-menu">
          <summary aria-label="Abrir menu de navegação">
            <Menu aria-hidden="true" />
            <span>Menu</span>
          </summary>
          <nav aria-label="Navegação para celular">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a className="button button-primary" href="#simulador">
              Simular agora
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}

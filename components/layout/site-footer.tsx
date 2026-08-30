import Link from "next/link";
import { AtSign, MapPin, MessageCircle } from "lucide-react";

import { BrandMark } from "@/components/shared/brand-mark";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid" data-reveal-stagger>
        <div className="footer-brand">
          <BrandMark inverse />
          <p>
            Orientação clara e próxima para planejar imóveis, veículos, motos,
            serviços e patrimônio.
          </p>
          <p className="footer-people">Atendimento com Diego e Paula.</p>
        </div>

        <div>
          <p className="footer-title">Contato</p>
          <address>
            <a
              href={`tel:${siteConfig.phoneE164}`}
              aria-label={`Ligar para ${siteConfig.phoneDisplay}`}
            >
              <MessageCircle aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </a>
            <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin aria-hidden="true" />
              Em frente ao Supermercado Tai Max
            </a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
              <AtSign aria-hidden="true" />
              @jipaconsorcio
            </a>
          </address>
        </div>

        <div>
          <p className="footer-title">Informações</p>
          <nav aria-label="Informações legais">
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
              Encontre nossa empresa
            </a>
            <a href="#duvidas">Dúvidas frequentes</a>
          </nav>
        </div>
      </div>

      <div className="footer-bottom" data-reveal>
        <p>© {new Date().getFullYear()} JIPA Consórcios.</p>
        <p>
          Condições sujeitas às regras do grupo, contrato e administradora.
          Contemplação por sorteio ou lance; não há garantia de data.
        </p>
      </div>
    </footer>
  );
}

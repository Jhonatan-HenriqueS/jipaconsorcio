import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Entenda como os dados informados na simulação da JIPA Consórcios são utilizados no contato pelo WhatsApp.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main className="privacy-main" id="conteudo">
        <header>
          <p className="eyebrow">Privacidade e transparência</p>
          <h1>Política de Privacidade</h1>
          <p>
            Esta página explica, em linguagem direta, como funciona o envio de dados
            pela simulação da JIPA Consórcios. Última atualização: 23 de agosto de
            2026.
          </p>
        </header>

        <div className="privacy-content">
          <section>
            <h2>Quais dados são informados</h2>
            <p>
              A simulação solicita nome, telefone, modalidade de consórcio, forma de
              simulação e valor desejado. O envio só prossegue após sua autorização.
            </p>
          </section>

          <section>
            <h2>Para que os dados são usados</h2>
            <p>
              As informações servem exclusivamente para iniciar uma conversa sobre a
              simulação solicitada e permitir que a equipe da JIPA explique opções e
              próximos passos.
            </p>
          </section>

          <section>
            <h2>Como o envio acontece</h2>
            <p>
              A landing page monta uma mensagem e abre o WhatsApp. Nada é enviado
              silenciosamente: você revisa e confirma o envio no próprio aplicativo ou
              site do WhatsApp. A landing page não possui banco de dados, endpoint de
              captação, cookie de marketing ou armazenamento local para esses dados.
            </p>
          </section>

          <section>
            <h2>Compartilhamento e ambiente de terceiros</h2>
            <p>
              Ao continuar, os dados passam a ser tratados no WhatsApp, serviço da Meta,
              conforme os termos e políticas desse canal. Evite enviar documentos ou
              informações sensíveis antes de confirmar a identidade do atendente e a
              finalidade da solicitação.
            </p>
          </section>

          <section>
            <h2>Seus direitos</h2>
            <p>
              Você pode solicitar confirmação de tratamento, acesso, correção, exclusão
              quando aplicável, informação sobre compartilhamento e revogação do
              consentimento. Para exercer esses direitos, fale com a JIPA pelo telefone
              {` ${siteConfig.phoneDisplay}`} ou presencialmente no endereço informado no
              rodapé.
            </p>
          </section>

          <section>
            <h2>Segurança e retenção</h2>
            <p>
              Esta página reduz a coleta ao mínimo necessário e não registra os dados da
              simulação. Depois do envio, eventuais registros e prazos no WhatsApp ou nos
              processos internos da JIPA devem seguir a necessidade do atendimento e as
              obrigações legais aplicáveis.
            </p>
          </section>

          <aside className="privacy-notice">
            A identificação jurídica formal do controlador, um canal de privacidade
            dedicado e os prazos internos de retenção precisam ser confirmados pela
            empresa antes da publicação definitiva desta política.
          </aside>

          <Link className="text-link" href="/">
            <ArrowLeft aria-hidden="true" />
            Voltar para a página inicial
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

# JIPA Consórcios — landing page

Landing page em Next.js para a JIPA Consórcios, com foco em conversas qualificadas pelo WhatsApp, SEO local, acessibilidade e desempenho.

As seções abaixo do hero entram suavemente com GSAP/ScrollTrigger. A rolagem continua nativa, as animações executam uma vez e são desativadas quando o visitante prefere movimento reduzido.

## Executar localmente

Requisitos: Node.js 20.9 ou superior e npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Defina `NEXT_PUBLIC_SITE_URL` com a URL HTTPS de produção antes do build definitivo. Sem essa variável, metadata, sitemap e dados estruturados usam `http://localhost:3000` de forma intencional no ambiente local.

Validações principais:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Em sandboxes que proíbem a porta interna usada pelo processo PostCSS do Turbopack,
use `npm run build -- --webpack`. O webpack é suportado pelo Next.js e foi o bundler
usado na validação registrada deste projeto.

## Fluxo da simulação

O simulador não estima parcelas reais nem envia dados para uma API. Depois de selecionar modalidade, forma e valor, o visitante informa nome, telefone e consentimento. A página monta a mensagem, abre o WhatsApp e o visitante confirma o envio.

## Confirmações obrigatórias antes da publicação

- Confirmar o domínio canônico e preencher `NEXT_PUBLIC_SITE_URL`.
- Confirmar a identificação jurídica formal do controlador, canal de privacidade e retenção interna para finalizar a Política de Privacidade.
- Confirmar que o número de destino do simulador (`+55 69 99389-7171`) é o desejado; o contato público exibido e validado é `(69) 99307-7743`.
- Confirmar o direito de uso das marcas Disal, Yamaha e HS antes do deploy definitivo. O site exibe cópias WebP otimizadas dos logotipos fornecidos pelo cliente.
- Confirmar a licença da imagem aérea da casa e fornecer uma cópia local limpa/licenciada. O arquivo apareceu como referência com marca d’água, mas não estava disponível no filesystem do projeto e, por isso, não foi publicado.
- Confirmar que as fotos de fachada, interior e Diego podem ser publicadas. As cópias locais foram preparadas a partir dos materiais fornecidos e da ficha pública da empresa no Google Maps.
- Validar a identificação de Paula e o texto institucional com a empresa.

## Publicação e SEO local

Após o deploy:

1. Cadastre o domínio no Google Search Console.
2. Envie `/sitemap.xml` e inspecione a URL principal.
3. Valide o JSON-LD no Rich Results Test e no Schema Markup Validator.
4. Mantenha nome, endereço e telefone consistentes com o Perfil da Empresa no Google.
5. Vincule o novo domínio ao Perfil da Empresa.
6. Acompanhe consultas, indexação e Core Web Vitals reais no percentil 75.

Decisões e fontes estão registradas em [`docs/decisoes-tecnicas.md`](docs/decisoes-tecnicas.md).

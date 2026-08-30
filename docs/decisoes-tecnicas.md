# Decisões técnicas — JIPA Consórcios

Atualizado em 23 de agosto de 2026.

## Arquitetura e desempenho

- Next.js 16.3.2, React 19.2.8, App Router e Tailwind CSS 4 foram mantidos conforme o projeto existente.
- A documentação versionada em `node_modules/next/dist/docs/` foi usada para Server/Client Components, `next/image`, fontes, Metadata API, robots, sitemap, JSON-LD e headers.
- A página é um Server Component. JavaScript cliente ficou concentrado no simulador, no diálogo carregado sob demanda e nas revelações de scroll.
- O retrato usa `next/image` com dimensões e `sizes`. O Lighthouse identificou o `h1`, não a imagem, como LCP; por isso a foto não é pré-carregada e não compete com CSS e fonte no caminho crítico.
- Fotografias abaixo da dobra mantêm lazy loading padrão e proporções reservadas.
- A seção de modalidades segue a composição da referência com cabeçalho editorial em três colunas, quatro cards visíveis no desktop, `gap` real de 16 px e um card destacado 56 px mais alto. A quinta modalidade permanece no mesmo trilho horizontal com `scroll-snap`, indicação visual, foco próprio e navegação por teclado.
- O marquee usa CSS. As entradas abaixo do hero usam GSAP com ScrollTrigger, sem substituir a rolagem nativa, sem `scrub` ou pinning e com execução única.
- O comparativo é uma tabela HTML responsiva; percentuais genéricos foram evitados por não haver base comparável de mesma modalidade e período.
- O mapa usa iframe nativo, lazy loading e espaço reservado.

## Dependências

O shadcn/ui 4.19.0 foi inicializado com o estilo Base Nova para o diálogo acessível. O FAQ usa `<details>` e `<summary>` nativos, preserva teclado e HTML inicial e não envia JavaScript cliente. O processo adicionou:

- `@base-ui/react`: primitivos acessíveis do diálogo e do botão usado dentro dele;
- `class-variance-authority`, `clsx` e `tailwind-merge`: variantes e composição de classes dos componentes;
- `lucide-react`: conjunto único de ícones;
- `tw-animate-css`: transições de abertura dos componentes;
- `shadcn`: estilos do sistema gerado pela versão atual do CLI.
- `gsap`: motor das revelações suaves disparadas quando cada bloco entra na viewport;
- `@gsap/react`: hook `useGSAP` para registrar e reverter animações e ScrollTriggers corretamente no ciclo de vida do React.

Não foram adicionados React Hook Form, Zod, bibliotecas de máscara, gráficos, mapas, carrossel ou uma biblioteca que substitua o scroll nativo.

## SEO e fatos locais

- Endereço confirmado na ficha pública do Google Maps vinculada pelo cliente: Av. Mal. Rondon, 3026, Bairro Centro, Ji-Paraná — RO, CEP 76900-864.
- Coordenadas resolvidas pelo mesmo link: `-10.8686698, -61.964454`.
- O JSON-LD usa `FinancialService`, sem `aggregateRating`, `Review`, preço, horário, CNPJ, fundação ou alegações não confirmadas.
- O conteúdo do FAQ permanece no HTML inicial. `FAQPage` não foi adicionado: a elegibilidade visual desse rich result é restrita e a marcação não traria valor garantido para este caso.
- `metadataBase`, robots e sitemap usam `NEXT_PUBLIC_SITE_URL`, com fallback local explícito para não inventar domínio.
- A data do sitemap é estática e corresponde à atualização real do conteúdo; não muda a cada requisição.

Fontes de referência factual:

- Banco Central — FAQ de consórcios: <https://www.bcb.gov.br/meubc/faqs/s/consorcio>
- Banco Central — administradoras de consórcio: <https://www.bcb.gov.br/estabilidadefinanceira/administradoraconsorcio>
- Google Search Central — LocalBusiness: <https://developers.google.com/search/docs/appearance/structured-data/local-business>
- Google Search Central — review snippets: <https://developers.google.com/search/docs/appearance/structured-data/review-snippet>
- OWASP — HTTP Security Response Headers: <https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html>
- LGPD: <https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm>
- ANPD — direitos dos titulares: <https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares>

## Segurança e privacidade

- Nome e telefone são validados no navegador; o telefone é normalizado para 10 ou 11 dígitos com DDD.
- A mensagem do WhatsApp é codificada com `encodeURIComponent`.
- Dados não são enviados a backend, logs, cookies, analytics ou `localStorage`.
- O checkbox de consentimento começa desmarcado e referencia a Política de Privacidade.
- Headers aplicados: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e `Permissions-Policy`.
- HSTS não foi ativado sem garantia do ambiente HTTPS final.
- CSP não foi imposta nesta fase porque o deploy ainda precisa confirmar origens e política compatível com Next.js, o iframe do Google Maps e os estilos atuais. Deve ser testada em modo Report-Only no ambiente real antes de enforcement.

## Validação em laboratório

- `eslint`, `tsc --noEmit` e `git diff --check`: sem erros.
- Build estático: concluído para todas as nove saídas do App Router com `next build --webpack`. O Turbopack não pôde abrir a porta interna do processo PostCSS no sandbox gerenciado; `turbopack.root` foi definido para o repositório, e o build padrão pode ser usado fora dessa limitação.
- Lighthouse 13.4.1 mobile, mediana de três execuções sequenciais na build de produção: Performance 91, Accessibility 100, Best Practices 100 e SEO 100; FCP 1,39 s, LCP 2,64 s, TBT 257 ms, CLS 0 e 250 KiB transferidos. São métricas de laboratório local, não dados de campo.
- axe-core 4.13.0: zero violações na home desktop, home mobile e Política de Privacidade mobile.
- Viewports emuladas de 320 px e 390 px: largura rolável igual à viewport. A tabela mantém rolagem horizontal própria e foco por teclado.
- Modalidades validadas em 1440 px, 768 px, 390 px e 320 px: cards de 480 px, destaque desktop de 536 px, `scroll-snap` funcional, quinto card trazido à vista pelo foco e nenhuma rolagem horizontal na página. O axe-core não encontrou violações na seção em desktop ou mobile.
- Marcas parceiras validadas em 1440 px, 768 px, 390 px e 320 px: grade responsiva de 3, 2 + 1 e 1 coluna, logotipos sem corte e nenhuma rolagem horizontal. O axe-core não encontrou violações na seção.
- Smoke test: skip link, menu mobile, âncoras, movimento reduzido, validação, consentimento, Escape, retorno de foco e URL codificada do WhatsApp aprovados.
- ScrollTrigger: 51 alvos encontrados; biblioteca ausente do carregamento inicial e baixada após a primeira rolagem; estado intermediário e conclusão da animação verificados, sem erro de console ou overflow. Em movimento reduzido, nenhum alvo recebe opacidade ou transformação.

## Ativos e direitos de uso

- Fachada e interior foram localizados na ficha pública da própria JIPA no Google Maps, comparados visualmente com os anexos e convertidos para WebP local.
- O recorte transparente de Diego foi otimizado como PNG local.
- A imagem aérea da casa com marca d’água não foi publicada porque o binário não estava disponível no workspace e a licença precisa ser confirmada.
- As capturas da Seed e o simulador vermelho foram tratados apenas como referência e não são ativos públicos.
- As cinco imagens das modalidades foram geradas para este projeto com a ferramenta integrada de geração de imagens, sem texto, logotipo, marca ou fundo, e otimizadas em WebP com transparência. Os prompts e o mapeamento dos arquivos estão registrados em [`prompts-imagens-modalidades.md`](prompts-imagens-modalidades.md).
- Os logotipos Disal, Yamaha e HS fornecidos pelo cliente foram recortados sem alterar suas proporções e otimizados como WebP local; a autorização de marca permanece pendente.

## Pendências comerciais

- Domínio definitivo.
- Identificação jurídica formal e canal de privacidade.
- Licenças de imagem e marcas.
- Confirmação da divergência entre o telefone público e o destino do WhatsApp exigido no briefing.
- Confirmação de Paula, do vínculo comercial com cada marca e de qualquer claim sobre experiência ou resultados.

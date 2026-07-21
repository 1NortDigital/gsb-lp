# LP GSB Energia Solar — Foco Empresas (B2B)

Landing page de captação da **GSB Energia Solar / Grupo Solar Brasil**, focada em empresas (condomínios, comércio, indústria, supermercado, saúde, rural, usina de investimento), no Rio de Janeiro e municípios vizinhos. Rodará em **campanha de vendas na Meta**.

- **Página (roteamento n8n):** `lp-gsb`
- **Repo:** `gsb-lp`
- **Visual:** corporativo premium B2B — grafite/navy `#0B1524` + âmbar solar `#F5A623`, fontes Sora (títulos) + Inter (corpo).
- **Stack:** HTML/CSS/JS single-file, sem build. Imagens via Unsplash (stock — trocar pelas fotos reais dos projetos do GSB quando possível).

## Motor de conversão (igual FiberSun)
3 formulários (hero, calculadora, modal) → `sendWebhook()` → **planilha do cliente (no-cors)** + **webhook n8n da agência** → abre **WhatsApp** com os dados. Botão flutuante e todos os CTAs abrem o **modal**. UTM/gclid/fbclid + cookie 30d (prefixo `gsb_`) + `landing_url` + `clickup_client_id`.

## ⚠️ Pendências antes de publicar (placeholders a preencher no `index.html`)
| Constante / marcador | O que colocar |
|---|---|
| `__META_PIXEL_ID__` (2 ocorrências no `<head>`) | ID do Pixel da Meta do GSB |
| `const WHATSAPP_NUMBER` | WhatsApp comercial do GSB (`55` + DDD + número, só dígitos) |
| `const SHEET_BACKUP` | URL `/exec` do Apps Script da planilha nova do GSB |
| `const CLICKUP_CLIENT_ID` | ID do GSB no ClickUp |
| GTM (opcional) | descomentar e trocar `GTM-XXXXXXX` se for usar |

## Meta Pixel
- `PageView` dispara no carregamento (no `<head>`).
- `Lead` dispara nos 3 formulários via `fireLead()` (helper que chama `fbq('track','Lead')`).
- `_fbp` e `_fbc` são capturados e enviados no payload (`fbp`/`fbc`) pro CRM/n8n atribuir o lead ao anúncio.

## Depoimentos
São **ilustrativos por segmento** (Síndico/Gerente/Diretor + cidade RJ), já que os depoimentos do site original eram placeholder. Substituir por depoimentos reais quando o cliente enviar.

## Entrega
GitHub Pages só para aprovação. Entrega final = ZIP em `C:\Users\Scherrer\Sites Clientes\Grupo Solar Brasil\gsb-site.zip` para o usuário subir no domínio (HTTPS obrigatório).

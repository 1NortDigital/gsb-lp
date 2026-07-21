/**
 * GSB Energia Solar — Apps Script para gravar os leads da landing page na planilha.
 * Planilha: https://docs.google.com/spreadsheets/d/1GCJB0kSGkSujP9HUSSPRr7fsPpY9c50Edn7uF1HrDHk/edit
 *
 * COMO ATIVAR:
 * 1. Abra a planilha acima -> menu Extensões -> Apps Script.
 * 2. Apague o conteúdo padrão e cole TODO este arquivo.
 * 3. Salve. Clique em "Implantar" -> "Nova implantação".
 * 4. Tipo: "App da Web". Executar como: "Eu". Quem pode acessar: "Qualquer pessoa".
 * 5. Implantar -> autorize com sua conta Google (Avançado -> Acessar (não seguro) -> Permitir).
 * 6. Copie a URL que termina em /exec.
 * 7. Cole essa URL na constante SHEET_BACKUP do index.html.
 */

var SHEET_ID = '1GCJB0kSGkSujP9HUSSPRr7fsPpY9c50Edn7uF1HrDHk';
var SHEET_NAME = 'Leads'; // nome da aba; será criada automaticamente se não existir

var COLS = [
  'timestamp','form_type','pagina','nome','email','telefone',
  'tipo','modelo','sistema','cidade','valor_fatura','qualificado','ip',
  'utm_source','utm_medium','utm_campaign','utm_content','utm_term',
  'gclid','fbclid','fbp','fbc','page_url','page_referer','landing_url','clickup_client_id'
];

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // garante cabeçalho; se já existir, adiciona colunas novas no fim (auto-heal)
    if (sh.getLastRow() === 0) {
      sh.appendRow(COLS.map(function(c){ return c; }));
    } else {
      var hdr = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
      var faltam = COLS.filter(function(c){ return hdr.indexOf(c) === -1; });
      if (faltam.length) sh.getRange(1, hdr.length + 1, 1, faltam.length).setValues([faltam]);
      // relê o cabeçalho já atualizado para gravar na ordem correta da planilha
      COLS_ORDER = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    }

    var order = (typeof COLS_ORDER !== 'undefined' && COLS_ORDER.length) ? COLS_ORDER
              : sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];

    var recebido = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');
    var row = order.map(function(c){
      if (c === 'timestamp') return data.timestamp || recebido;
      return data[c] !== undefined && data[c] !== null ? data[c] : '';
    });
    row[0] = recebido; // primeira coluna = data/hora legível de recebimento
    sh.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

var COLS_ORDER;

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: 'GSB lead endpoint ativo.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// TCFC 臺中市體育總會足球委員會 — 市長盃賽程 GAS 後端
// 參照：勝利聯賽 backend/程式碼.js（293 行範本）
// 差異：TCFC 多年度 × 多組別 → 參數化（sheetId + sheetName 由前端提供，新增年度/組別免改後端）
// 部署：CI clasp push（deploy-gas.yml，push backend/** 觸發）
// 護欄：寫入 auth 存 Script Properties（AUTH_SECRET），一次設定（見 gas-backend-guide.md）

// 與前端 src/api/config/sheetConfig.ts 的 RANGE 一致（A 欄~K 欄，第 1 列為欄名）
var RANGE = 'A2:K';

// ---------- doGet：賽程讀取（D1=② 讀寫全過 GAS） ----------
function doGet(e) {
  var params = e.parameter || {};
  var action = params.action || 'schedule';

  if (action === 'schedule') return handleSchedule(params);
  return jsonResult('error', null, '未知 action: ' + action);
}

// 讀取單一工作表全量賽程，回傳原始二維陣列（前端維持既有 normalizeRowData）
function handleSchedule(params) {
  try {
    var sheetId = String(params.sheetId || '').trim();
    var sheetName = String(params.sheetName || '').trim();
    if (!sheetId || !sheetName) return jsonResult('error', null, '缺少 sheetId / sheetName');

    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
    if (!sheet) return jsonResult('error', null, '找不到工作表: ' + sheetName);

    return jsonResult('success', sheet.getRange(RANGE).getValues(), null);
  } catch (err) {
    return jsonResult('error', null, err.toString());
  }
}

// ---------- doPost：受控寫入（裁判回填，決策 D2=② 白名單護欄） ----------
function doPost(e) {
  var data = e.parameter || {};

  if (!isAuthorized(data)) {
    return jsonResult('error', null, 'unauthorized: 缺乏有效憑證');
  }

  var action = data.action;
  if (action === 'update_result') return handleUpdateResult(data);
  return jsonResult('error', null, '未知 action: ' + action);
}

// 白名單護欄：auth 參數 == Script Properties AUTH_SECRET
// 已知限制（GAS web app 無法讀取 HTTP header，token 只能走參數）：
// 公開前端 bundle 不得攜帶本 token；僅供主辦方內部/管理工具呼叫。
// 正式「裁判登入寫入」需 email 白名單 + Google 登入（後續 Issue）。
function isAuthorized(data) {
  var secret = PropertiesService.getScriptProperties().getProperty('AUTH_SECRET');
  if (!secret) return false;
  return String(data.auth || '') === secret;
}

// 回填比數：以 gameNumber（場次編號）定位列更新
// 天然冪等（重複送出相同資料結果相同），故不需冪等鍵欄位
function handleUpdateResult(data) {
  try {
    var sheetId = String(data.sheetId || '').trim();
    var sheetName = String(data.sheetName || '').trim();
    var gameNumber = String(data.gameNumber || '').trim();
    var homeScore = normalizeScore(data.homeScore);
    var awayScore = normalizeScore(data.awayScore);

    if (!sheetId || !sheetName || !gameNumber) {
      return jsonResult('error', null, '缺少 sheetId / sheetName / gameNumber');
    }
    if (homeScore === null || awayScore === null) {
      return jsonResult('error', null, '比分格式錯誤（需為非負整數或空字串）');
    }

    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
    if (!sheet) return jsonResult('error', null, '找不到工作表: ' + sheetName);

    var values = sheet.getDataRange().getValues();
    var headers = values[0];

    var gameIdx = findHeader(headers, ['場次', '編號', '序號']);
    var homeScoreIdx = findHeader(headers, ['主隊比分', '主隊得分']);
    var awayScoreIdx = findHeader(headers, ['客隊比分', '客隊得分']);
    if (gameIdx === -1) return jsonResult('error', null, '工作表缺少「場次/編號」欄位');

    var rowNum = -1;
    for (var i = 1; i < values.length; i++) {
      if (String(values[i][gameIdx] || '').trim() === gameNumber) {
        rowNum = i + 1;
        break;
      }
    }
    if (rowNum === -1) return jsonResult('error', null, '找不到場次: ' + gameNumber);

    // 寫入比分（找不到比分割欄時容錯只寫找到的欄位；「更新時間」欄自動補上）
    if (homeScoreIdx > -1) sheet.getRange(rowNum, homeScoreIdx + 1).setValue(homeScore);
    if (awayScoreIdx > -1) sheet.getRange(rowNum, awayScoreIdx + 1).setValue(awayScore);

    var updateTimeIdx = findHeader(headers, ['更新時間']);
    if (updateTimeIdx === -1) {
      updateTimeIdx = sheet.getLastColumn();
      sheet.getRange(1, updateTimeIdx + 1).setValue('更新時間').setBackground('#fce4d6').setFontWeight('bold');
    }
    sheet.getRange(rowNum, updateTimeIdx + 1).setValue(new Date());

    return jsonResult('success', { gameNumber: gameNumber, row: rowNum }, '比數已更新');
  } catch (err) {
    return jsonResult('error', null, err.toString());
  }
}

// 分數正規化：允許非負整數字串或空字串；其餘回 null（驗證失敗）
function normalizeScore(v) {
  if (v === undefined || v === null) return null;
  var s = String(v).trim();
  if (s === '') return '';
  if (/^\d+$/.test(s)) return s;
  return null;
}

// 以多個候選欄名尋找欄位 index（回傳 0-based；找不到 -1）
function findHeader(headers, candidates) {
  for (var i = 0; i < headers.length; i++) {
    var name = String(headers[i] || '').trim();
    if (candidates.indexOf(name) !== -1) return i;
  }
  return -1;
}

function jsonResult(result, data, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: result, data: data, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}
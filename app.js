(function () {
  "use strict";

  var TYPES = {
    1: {
      color: "#1d4ed8", shape: "sq",
      zh: { name: "普通城市", short: "城市" },
      en: { name: "City", short: "City" },
      ja: { name: "普通都市", short: "都市" }
    },
    2: {
      color: "#7c3aed", shape: "ci",
      zh: { name: "炮塔", short: "炮塔" },
      en: { name: "Turret", short: "Turret" },
      ja: { name: "砲塔", short: "砲塔" }
    },
    3: {
      color: "#d97706", shape: "cr",
      zh: { name: "王座", short: "王座" },
      en: { name: "Throne", short: "Throne" },
      ja: { name: "王座", short: "王座" }
    },
    4: {
      color: "#db2777", shape: "cr",
      zh: { name: "据点", short: "挖掘", legend: "据点（挖掘点）" },
      en: { name: "Stronghold", short: "Dig", legend: "Stronghold" },
      ja: { name: "拠点", short: "採掘", legend: "拠点" }
    },
    5: {
      color: "#059669", shape: "tr",
      zh: { name: "贸易占", short: "贸易" },
      en: { name: "Trading Post", short: "Trade" },
      ja: { name: "貿易所", short: "貿易" }
    }
  };
  var TYPE_ORDER = [1, 2, 3, 4, 5];
  var CENTER_ID = 3139;
  var STORAGE_KEY = "ichiyaLIRA__suppliestest-dug-v1";
  var LANG_KEY = "ichiyaLIRA__suppliestest-lang";
  var I18N = {
    zh: {
      htmlLang: "zh-CN",
      eyebrow: "S3 · 本地坐标",
      title: "物资刷新点",
      remain: "剩余",
      meta: "共 {total} · 已挖掘 {dug} · 地图上 {shown}",
      all: "全部",
      axis: "方块 城市 · 十字 挖掘点 · 中心十字是王座 · X 向右 Y 向上",
      locate: "定位",
      fit: "适应全图",
      showDug: "显示已挖掘 / 恢复",
      hint: "拖动平移，双指或滚轮缩放。点选后标记挖掘，记录保存在本机。",
      dugTitle: "已挖掘",
      restoreAll: "全部恢复",
      collapse: "收起",
      dugCount: "共 {n} 个，最近标记的在前。",
      dugEmpty: "还没有已挖掘的点。",
      filterPh: "筛选编号或坐标",
      filterAria: "筛选已挖掘",
      noMatch: "没有匹配的点。",
      more: "还有 {n} 条，输入编号或坐标继续筛选。",
      restore: "恢复",
      idLabel: "编号 {id}",
      dig: "我已经挖掘",
      close: "关闭",
      undo: "撤销",
      dugToast: "已挖掘 {name}（{x}, {y}）",
      confirmAll: "恢复全部 {n} 个已挖掘点？",
      emptyAll: "全部点已标记挖掘。打开「显示已挖掘 / 恢复」可以撤销。",
      emptyFilter: "当前筛选下没有点。点「全部」重新显示。",
      titleDoc: "剩余 {n} · 物资刷新点",
      hud: "中心 X {x} · Y {y}",
      axisHint: "X →    Y ↑",
      needXY: "请输入 X 和 Y",
      badXY: "坐标需要是数字",
      noPoint: "这个坐标没有物资点",
      filtersAria: "按类型筛选",
      mapAria: "物资点地图，可拖动缩放并点选",
      zoomIn: "放大",
      zoomOut: "缩小",
      langAria: "语言",
    },
    en: {
      htmlLang: "en",
      eyebrow: "S3 · Local coordinates",
      title: "Supply points",
      remain: "Left",
      meta: "{total} total · {dug} dug · {shown} on map",
      all: "All",
      axis: "Squares are cities · other crosses are dig sites · center cross is the throne · X right, Y up",
      locate: "Go",
      fit: "Fit all",
      showDug: "Show dug / restore",
      hint: "Drag to pan. Pinch or scroll to zoom. Mark a point after you dig it. Saved on this device.",
      dugTitle: "Dug",
      restoreAll: "Restore all",
      collapse: "Hide",
      dugCount: "{n} dug, newest first.",
      dugEmpty: "No dug points yet.",
      filterPh: "Filter by id or coordinates",
      filterAria: "Filter dug points",
      noMatch: "No matches.",
      more: "{n} more. Narrow with an id or coordinates.",
      restore: "Restore",
      idLabel: "No. {id}",
      dig: "I already dug this",
      close: "Close",
      undo: "Undo",
      dugToast: "Dug {name} ({x}, {y})",
      confirmAll: "Restore all {n} dug points?",
      emptyAll: "Every point is marked dug. Use “Show dug / restore” to undo.",
      emptyFilter: "No points in this filter. Choose All to show them again.",
      titleDoc: "{n} left · Supply points",
      hud: "Center X {x} · Y {y}",
      axisHint: "X →    Y ↑",
      needXY: "Enter X and Y",
      badXY: "Coordinates must be numbers",
      noPoint: "No supply point at this coordinate",
      filtersAria: "Filter by type",
      mapAria: "Supply map. Drag, zoom, and select a point.",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      langAria: "Language",
    },
    ja: {
      htmlLang: "ja",
      eyebrow: "S3 · ローカル座標",
      title: "物資地点",
      remain: "残り",
      meta: "全 {total} · 発掘済み {dug} · 地図上 {shown}",
      all: "すべて",
      axis: "四角は都市 · ほかの十字は採掘点 · 中央の十字は王座 · X は右、Y は上",
      locate: "移動",
      fit: "全体表示",
      showDug: "発掘済みを表示 / 戻す",
      hint: "ドラッグで移動、ピンチまたはホイールで拡大。発掘したら印を付けます。この端末に保存されます。",
      dugTitle: "発掘済み",
      restoreAll: "すべて戻す",
      collapse: "閉じる",
      dugCount: "{n} 件、新しい順。",
      dugEmpty: "発掘済みの地点はありません。",
      filterPh: "番号または座標で絞り込み",
      filterAria: "発掘済みを絞り込み",
      noMatch: "一致する地点がありません。",
      more: "ほか {n} 件。番号か座標で絞ってください。",
      restore: "戻す",
      idLabel: "番号 {id}",
      dig: "もう発掘した",
      close: "閉じる",
      undo: "取り消す",
      dugToast: "{name} を発掘済みにしました（{x}, {y}）",
      confirmAll: "発掘済み {n} 件をすべて戻しますか？",
      emptyAll: "すべての地点が発掘済みです。「発掘済みを表示 / 戻す」から取り消せます。",
      emptyFilter: "この絞り込みでは地点がありません。「すべて」で再表示します。",
      titleDoc: "残り {n} · 物資地点",
      hud: "中心 X {x} · Y {y}",
      axisHint: "X →    Y ↑",
      needXY: "X と Y を入力してください",
      badXY: "座標は数字で入力してください",
      noPoint: "この座標に物資地点はありません",
      filtersAria: "種類で絞り込み",
      mapAria: "物資地点の地図。ドラッグ、拡大、選択ができます。",
      zoomIn: "拡大",
      zoomOut: "縮小",
      langAria: "言語",
    }
  };

  var raw = window.SUPPLY_POINTS;
  if (!Array.isArray(raw) || !raw.length) {
    document.body.insertAdjacentHTML("afterbegin", "<p class='noscript'>点位数据缺失。</p>");
    return;
  }

  var POINTS = raw.map(function (row) {
    return { id: row[0], x: row[1], y: row[2], t: row[3] };
  });
  var byId = new Map();
  var byXY = new Map();
  POINTS.forEach(function (p) {
    byId.set(p.id, p);
    byXY.set(p.x + "," + p.y, p);
  });
  var SIG = POINTS.length + ":" + POINTS[0].id + ":" + POINTS[0].x + "," + POINTS[0].y + ":" + POINTS[POINTS.length - 1].id;

  var canvas = document.getElementById("map");
  var ctx = canvas.getContext("2d");
  var els = {
    remain: document.getElementById("remain-num"),
    meta: document.getElementById("meta"),
    filters: document.getElementById("filters"),
    show: document.getElementById("show-dug"),
    badge: document.getElementById("dug-badge"),
    restore: document.getElementById("restore"),
    restoreNote: document.getElementById("restore-note"),
    restoreList: document.getElementById("restore-list"),
    restoreQ: document.getElementById("restore-q"),
    restoreAll: document.getElementById("restore-all"),
    restoreClose: document.getElementById("restore-close"),
    hud: document.getElementById("hud"),
    empty: document.getElementById("empty"),
    card: document.getElementById("card"),
    swatch: document.getElementById("swatch"),
    cardName: document.getElementById("card-name"),
    cardId: document.getElementById("card-id"),
    cardCoords: document.getElementById("card-coords"),
    nearby: document.getElementById("nearby"),
    dig: document.getElementById("dig"),
    toast: document.getElementById("toast"),
    inX: document.getElementById("in-x"),
    inY: document.getElementById("in-y"),
    legend: document.getElementById("legend")
  };

  var state = {
    lang: "zh",
    dug: [],
    dugSet: new Set(),
    showDug: false,
    enabled: new Set(TYPE_ORDER),
    selectedId: null,
    nearby: [],
    hoverId: null,
    pin: null,
    cam: { cx: 500, cy: 500, scale: 1 }
  };
  var userMoved = false;
  var raf = 0;
  var toastTimer = 0;
  var labelWidths = {};
  var pointers = new Map();
  var gesture = null;

  function size() {
    return { w: canvas.clientWidth, h: canvas.clientHeight };
  }

  function clampScale(s, w, h) {
    if (!(w > 20) || !(h > 20) || !isFinite(s)) return s > 0 ? s : 1;
    var min = Math.min((w - 48) / 1000, (h - 48) / 1000) * 0.75;
    if (!(min > 0)) return s;
    return Math.max(min, Math.min(28, s));
  }

  function clampCam() {
    var box = size();
    state.cam.scale = clampScale(state.cam.scale, box.w, box.h);
    var margin = 120 / state.cam.scale;
    state.cam.cx = Math.max(-margin, Math.min(1000 + margin, state.cam.cx));
    state.cam.cy = Math.max(-margin, Math.min(1000 + margin, state.cam.cy));
  }

  function worldToScreen(x, y) {
    var box = size();
    return [
      (x - state.cam.cx) * state.cam.scale + box.w / 2,
      (state.cam.cy - y) * state.cam.scale + box.h / 2
    ];
  }

  function screenToWorld(sx, sy) {
    var box = size();
    return [
      state.cam.cx + (sx - box.w / 2) / state.cam.scale,
      state.cam.cy - (sy - box.h / 2) / state.cam.scale
    ];
  }

  function isVisible(p) {
    if (!state.enabled.has(p.t)) return false;
    if (state.dugSet.has(p.id) && !state.showDug) return false;
    return true;
  }

  function pointRadius() {
    return Math.max(2.6, Math.min(8, state.cam.scale * 0.7));
  }

  function centerRadius() {
    return Math.max(20, pointRadius() * 3);
  }

  function t(key, vars) {
    var pack = I18N[state.lang] || I18N.zh;
    var s = pack[key] != null ? pack[key] : (I18N.zh[key] || key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.split("{" + k + "}").join(String(vars[k]));
      });
    }
    return s;
  }

  function typeInfo(type) {
    return TYPES[type][state.lang] || TYPES[type].zh;
  }

  function typeName(type) {
    return typeInfo(type).name;
  }

  function typeShort(type) {
    return typeInfo(type).short;
  }

  function typeLegend(type) {
    var info = typeInfo(type);
    return info.legend || info.name;
  }

  function typeBlob(type) {
    return ["zh", "en", "ja"].map(function (lang) {
      var info = TYPES[type][lang];
      return info.name + info.short + (info.legend || "");
    }).join("");
  }

  function migrateKey(oldKey, newKey) {
    try {
      var previous = localStorage.getItem(oldKey);
      if (previous !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, previous);
      }
      localStorage.removeItem(oldKey);
    } catch (err) { /* private mode */ }
  }

  function migrateStorage() {
    migrateKey(["lw", "supplies", "refresh", "point", "s3", "dug", "v1"].join("-"), STORAGE_KEY);
    migrateKey(["lw", "supplies", "lang"].join("-"), LANG_KEY);
  }

  function loadDug() {
    try {
      var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!parsed || parsed.sig !== SIG || !Array.isArray(parsed.ids)) return;
      var seen = new Set();
      parsed.ids.forEach(function (id) {
        var n = Number(id);
        if (!byId.has(n) || seen.has(n)) return;
        seen.add(n);
        state.dug.push(n);
      });
      state.dugSet = seen;
    } catch (err) {
      state.dug = [];
      state.dugSet = new Set();
    }
  }

  function saveDug() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ sig: SIG, ids: state.dug }));
    } catch (err) { /* private mode */ }
  }

  function counts() {
    var c = { dug: 0, remain: 0, shown: 0 };
    TYPE_ORDER.forEach(function (t) { c[t] = 0; });
    POINTS.forEach(function (p) {
      if (state.dugSet.has(p.id)) c.dug += 1;
      else {
        c.remain += 1;
        c[p.t] += 1;
      }
      if (isVisible(p)) c.shown += 1;
    });
    return c;
  }

  function fit() {
    var box = size();
    if (box.w < 20 || box.h < 20) return;
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, n = 0;
    POINTS.forEach(function (p) {
      if (!isVisible(p)) return;
      n += 1;
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });
    if (!n) {
      minX = 0; maxX = 999; minY = 0; maxY = 999;
    }
    var spanX = Math.max(40, maxX - minX);
    var spanY = Math.max(40, maxY - minY);
    var pad = 52;
    state.cam.scale = Math.min((box.w - pad * 2) / spanX, (box.h - pad * 2) / spanY);
    state.cam.cx = (minX + maxX) / 2;
    state.cam.cy = (minY + maxY) / 2;
    clampCam();
  }

  function focusPoint(p) {
    var box = size();
    state.cam.cx = p.x;
    state.cam.cy = p.y;
    if (state.cam.scale < 4) state.cam.scale = 4;
    state.cam.scale = clampScale(state.cam.scale, box.w, box.h);
    clampCam();
    userMoved = true;
  }

  function requestDraw() {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      draw();
    });
  }

  function niceStep(scale) {
    var raw = 80 / Math.max(scale, 0.0001);
    var pow = Math.pow(10, Math.floor(Math.log10(raw)));
    var n = raw / pow;
    var m = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10;
    return m * pow;
  }

  function formatTick(v) {
    if (Math.abs(v) >= 100 || Math.abs(v - Math.round(v)) < 1e-6) return String(Math.round(v));
    return String(Math.round(v * 10) / 10);
  }

  function screenOf(p, w, h) {
    var s = worldToScreen(p.x, p.y);
    if (s[0] < -24 || s[1] < -24 || s[0] > w + 24 || s[1] > h + 24) return null;
    return s;
  }

  function paintFilled(type, asDug) {
    if (asDug) {
      ctx.fillStyle = "rgba(120, 108, 92, 0.22)";
      ctx.strokeStyle = "rgba(90, 72, 52, 0.9)";
      ctx.lineWidth = 1.3;
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillStyle = TYPES[type].color;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(32, 22, 12, 0.4)";
      ctx.stroke();
    }
  }

  function onScreenPoints(w, h) {
    var margin = 24;
    var a = screenToWorld(-margin, -margin);
    var b = screenToWorld(w + margin, h + margin);
    var minX = Math.min(a[0], b[0]);
    var maxX = Math.max(a[0], b[0]);
    var minY = Math.min(a[1], b[1]);
    var maxY = Math.max(a[1], b[1]);
    var list = [];
    for (var i = 0; i < POINTS.length; i++) {
      var p = POINTS[i];
      if (!isVisible(p)) continue;
      if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) continue;
      list.push(p);
    }
    return list;
  }

  function drawPoints(list, asDug, w, h) {
    var r = pointRadius();
    var i, p, s;

    ctx.beginPath();
    for (i = 0; i < list.length; i++) {
      p = list[i];
      if (p.t !== 1 || state.dugSet.has(p.id) !== asDug) continue;
      s = screenOf(p, w, h);
      if (!s) continue;
      ctx.rect(s[0] - r, s[1] - r, r * 2, r * 2);
    }
    paintFilled(1, asDug);

    ctx.beginPath();
    for (i = 0; i < list.length; i++) {
      p = list[i];
      if (p.t !== 2 || state.dugSet.has(p.id) !== asDug) continue;
      s = screenOf(p, w, h);
      if (!s) continue;
      ctx.moveTo(s[0] + r, s[1]);
      ctx.arc(s[0], s[1], r, 0, Math.PI * 2);
    }
    paintFilled(2, asDug);

    ctx.beginPath();
    for (i = 0; i < list.length; i++) {
      p = list[i];
      if (p.t !== 5 || state.dugSet.has(p.id) !== asDug) continue;
      s = screenOf(p, w, h);
      if (!s) continue;
      ctx.moveTo(s[0], s[1] - r);
      ctx.lineTo(s[0] + r * 0.92, s[1] + r * 0.78);
      ctx.lineTo(s[0] - r * 0.92, s[1] + r * 0.78);
      ctx.closePath();
    }
    paintFilled(5, asDug);

    var arm = Math.max(3.4, r * 1.45);
    ctx.beginPath();
    for (i = 0; i < list.length; i++) {
      p = list[i];
      if (p.t !== 4 || state.dugSet.has(p.id) !== asDug) continue;
      s = screenOf(p, w, h);
      if (!s) continue;
      ctx.moveTo(s[0] - arm, s[1]);
      ctx.lineTo(s[0] + arm, s[1]);
      ctx.moveTo(s[0], s[1] - arm);
      ctx.lineTo(s[0], s[1] + arm);
    }
    ctx.lineCap = "round";
    ctx.lineWidth = asDug ? 1.4 : 2;
    ctx.strokeStyle = asDug ? "rgba(90, 72, 52, 0.85)" : TYPES[4].color;
    ctx.stroke();
    ctx.lineCap = "butt";

    var tr = Math.max(7, r * 2.2);
    var bar = Math.max(1.7, tr * 0.28);
    ctx.beginPath();
    for (i = 0; i < list.length; i++) {
      p = list[i];
      if (p.t !== 3 || p.id === CENTER_ID || state.dugSet.has(p.id) !== asDug) continue;
      s = screenOf(p, w, h);
      if (!s) continue;
      ctx.rect(s[0] - bar, s[1] - tr, bar * 2, tr * 2);
      ctx.rect(s[0] - tr, s[1] - bar, tr * 2, bar * 2);
    }
    paintFilled(3, asDug);
  }

  function drawCenterThrone() {
    var p = byId.get(CENTER_ID);
    if (!p || !isVisible(p)) return;
    var s = worldToScreen(p.x, p.y);
    var r = centerRadius();
    var dug = state.dugSet.has(p.id);
    var bar = r * 0.2;
    ctx.save();
    ctx.translate(s[0], s[1]);
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.rect(-bar, -r * 1.05, bar * 2, r * 2.1);
    ctx.rect(-r * 1.05, -bar, r * 2.1, bar * 2);
    if (dug) {
      ctx.strokeStyle = "rgba(90, 72, 52, 0.95)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
    } else {
      ctx.fillStyle = TYPES[3].color;
      ctx.fill();
      ctx.strokeStyle = "#3f2910";
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.95);
    ctx.lineTo(r * 0.8, r * 0.62);
    ctx.lineTo(-r * 0.8, r * 0.62);
    ctx.closePath();
    if (dug) {
      ctx.strokeStyle = "rgba(90, 72, 52, 0.95)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
    } else {
      ctx.fillStyle = "#f6c453";
      ctx.fill();
      ctx.strokeStyle = "#3f2910";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-r * 0.46, r * 0.08);
      ctx.lineTo(r * 0.46, r * 0.08);
      ctx.moveTo(-r * 0.24, -r * 0.28);
      ctx.lineTo(r * 0.24, -r * 0.28);
      ctx.strokeStyle = "#8a5a12";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
    ctx.restore();
  }

  function textWidth(text) {
    var key = state.lang + ":" + text;
    if (labelWidths[key] == null) labelWidths[key] = ctx.measureText(text).width;
    return labelWidths[key];
  }

  function drawLabels(list, w, h) {
    var selected = [];
    var thrones = [];
    var dug = [];
    var buckets = new Map();
    list.forEach(function (p) {
      if (p.id === state.selectedId) selected.push(p);
      else if (state.dugSet.has(p.id)) dug.push(p);
      else if (p.t === 3) thrones.push(p);
      else {
        var key = ((p.x / 100) | 0) + ":" + ((p.y / 100) | 0);
        var arr = buckets.get(key);
        if (!arr) buckets.set(key, (arr = []));
        arr.push(p);
      }
    });
    var groups = Array.from(buckets.values());
    var rest = [];
    var left = 0;
    groups.forEach(function (g) { left += g.length; });
    while (left > 0) {
      for (var g = 0; g < groups.length; g++) {
        if (groups[g].length) {
          rest.push(groups[g].pop());
          left -= 1;
        }
      }
    }
    var ordered = selected.concat(thrones, rest);
    var boxes = [];
    var cap = state.cam.scale >= 6 ? 240 : 70;
    var placed = 0;
    var r = pointRadius();
    ctx.font = "12px 'WenQuanYi Micro Hei', 'Droid Sans Fallback', sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    for (var i = 0; i < ordered.length && placed < cap; i++) {
      var p = ordered[i];
      if (p.id === CENTER_ID) continue;
      if (state.dugSet.has(p.id) && p.id !== state.selectedId) continue;
      var s = worldToScreen(p.x, p.y);
      var text = typeShort(p.t);
      var tw = textWidth(text);
      var bw = tw + 8;
      var bh = 16;
      var leftEdge = s[0] + r + 3;
      var top = s[1] - bh / 2;
      if (leftEdge + bw > w - 4) leftEdge = s[0] - r - 3 - bw;
      if (leftEdge < 2 || top < 2 || top + bh > h - 2) continue;
      var box = { l: leftEdge, t: top, r: leftEdge + bw, b: top + bh };
      var hit = false;
      for (var k = 0; k < boxes.length; k++) {
        var b = boxes[k];
        if (box.l < b.r && box.r > b.l && box.t < b.b && box.b > b.t) {
          hit = true;
          break;
        }
      }
      if (hit && p.id !== state.selectedId) continue;
      boxes.push(box);
      placed += 1;
      ctx.fillStyle = "rgba(255, 250, 242, 0.92)";
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(box.l, box.t, bw, bh, 4);
      else ctx.rect(box.l, box.t, bw, bh);
      ctx.fill();
      ctx.fillStyle = TYPES[p.t].color;
      ctx.fillText(text, box.l + 4, box.t + bh / 2);
    }
  }

  function draw() {
    var box = size();
    var w = box.w;
    var h = box.h;
    if (w < 2 || h < 2) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var bw = Math.max(1, Math.round(w * dpr));
    var bh = Math.max(1, Math.round(h * dpr));
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
      labelWidths = {};
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#e4d3b4";
    ctx.fillRect(0, 0, w, h);

    var origin = worldToScreen(0, 1000);
    var far = worldToScreen(1000, 0);
    ctx.fillStyle = "#f4e6cc";
    ctx.fillRect(origin[0], origin[1], far[0] - origin[0], far[1] - origin[1]);

    var step = niceStep(state.cam.scale);
    var topLeft = screenToWorld(0, 0);
    var bottomRight = screenToWorld(w, h);
    var minX = Math.min(topLeft[0], bottomRight[0]);
    var maxX = Math.max(topLeft[0], bottomRight[0]);
    var minY = Math.min(topLeft[1], bottomRight[1]);
    var maxY = Math.max(topLeft[1], bottomRight[1]);
    ctx.font = "12px 'WenQuanYi Micro Hei', 'Droid Sans Fallback', sans-serif";
    ctx.lineWidth = 1;
    var xStart = Math.ceil(minX / step) * step;
    for (var x = xStart; x <= maxX; x += step) {
      if (x < -0.01 || x > 1000.01) continue;
      var sx = worldToScreen(x, 0)[0];
      var major = Math.abs(x / 100 - Math.round(x / 100)) < 1e-6;
      ctx.strokeStyle = major ? "rgba(90, 62, 28, 0.28)" : "rgba(90, 62, 28, 0.12)";
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, h);
      ctx.stroke();
      ctx.fillStyle = "#6a5438";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(formatTick(x), sx, 6);
    }
    var yStart = Math.ceil(minY / step) * step;
    for (var y = yStart; y <= maxY; y += step) {
      if (y < -0.01 || y > 1000.01) continue;
      var sy = worldToScreen(0, y)[1];
      var majorY = Math.abs(y / 100 - Math.round(y / 100)) < 1e-6;
      ctx.strokeStyle = majorY ? "rgba(90, 62, 28, 0.28)" : "rgba(90, 62, 28, 0.12)";
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(w, sy);
      ctx.stroke();
      ctx.fillStyle = "#6a5438";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(formatTick(y), 8, sy);
    }

    ctx.strokeStyle = "rgba(62, 42, 20, 0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(origin[0], origin[1], far[0] - origin[0], far[1] - origin[1]);
    ctx.fillStyle = "#5c4630";
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.font = "13px 'WenQuanYi Micro Hei', 'Droid Sans Fallback', sans-serif";
    ctx.fillText(t("axisHint"), w - 10, h - 8);

    var visible = onScreenPoints(w, h);
    ctx.lineJoin = "round";
    drawPoints(visible, true, w, h);
    drawPoints(visible, false, w, h);
    drawCenterThrone();
    drawLabels(visible, w, h);
    drawCenterLabel(w, h);

    [state.hoverId, state.selectedId].forEach(function (id, index) {
      if (id == null) return;
      var p = byId.get(id);
      if (!p || !isVisible(p)) return;
      var s = worldToScreen(p.x, p.y);
      var ring = p.id === CENTER_ID
        ? centerRadius() + 8
        : (p.t === 3 ? Math.max(12, pointRadius() + 6) : pointRadius() + (index === 1 ? 7 : 5));
      ctx.beginPath();
      ctx.arc(s[0], s[1], ring, 0, Math.PI * 2);
      ctx.strokeStyle = index === 1 ? "#2a2118" : "rgba(42, 33, 24, 0.45)";
      ctx.lineWidth = index === 1 ? 2.5 : 1.5;
      ctx.stroke();
    });

    if (state.pin) {
      var pin = worldToScreen(state.pin.x, state.pin.y);
      ctx.strokeStyle = "#6e2b22";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pin[0] - 9, pin[1]);
      ctx.lineTo(pin[0] + 9, pin[1]);
      ctx.moveTo(pin[0], pin[1] - 9);
      ctx.lineTo(pin[0], pin[1] + 9);
      ctx.stroke();
    }

    els.hud.textContent = t("hud", { x: Math.round(state.cam.cx), y: Math.round(state.cam.cy) });
  }

  function drawCenterLabel(w, h) {
    var p = byId.get(CENTER_ID);
    if (!p || !isVisible(p)) return;
    var s = worldToScreen(p.x, p.y);
    if (s[0] < -10 || s[1] < -10 || s[0] > w + 10 || s[1] > h + 10) return;
    var text = typeShort(3);
    ctx.font = "bold 13px 'WenQuanYi Micro Hei', 'Droid Sans Fallback', sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    var tw = ctx.measureText(text).width;
    var x = s[0] + centerRadius() + 4;
    var y = s[1] - centerRadius() * 0.15;
    if (x + tw + 8 > w - 4) x = s[0] - centerRadius() - tw - 10;
    ctx.fillStyle = "rgba(255, 248, 236, 0.95)";
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x - 4, y - 10, tw + 10, 20, 4);
    else ctx.rect(x - 4, y - 10, tw + 10, 20);
    ctx.fill();
    ctx.fillStyle = "#8a4b08";
    ctx.fillText(text, x, y);
  }

  function hideToast() {
    els.toast.hidden = true;
    els.toast.replaceChildren();
  }

  function showToast(message, undoId) {
    els.toast.replaceChildren();
    var span = document.createElement("span");
    span.textContent = message;
    els.toast.appendChild(span);
    if (undoId != null) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = t("undo");
      btn.addEventListener("click", function () {
        restore(undoId);
        hideToast();
      });
      els.toast.appendChild(btn);
    }
    els.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 3200);
  }

  function markDug(id) {
    if (!byId.has(id) || state.dugSet.has(id)) return;
    state.dug.push(id);
    state.dugSet.add(id);
    saveDug();
    var p = byId.get(id);
    if (!state.showDug) {
      state.selectedId = null;
      state.nearby = [];
    }
    render();
    showToast(t("dugToast", { name: typeName(p.t), x: p.x, y: p.y }), id);
  }

  function restore(id) {
    if (!state.dugSet.has(id)) return;
    state.dug = state.dug.filter(function (n) { return n !== id; });
    state.dugSet.delete(id);
    saveDug();
    render();
  }

  function restoreAll() {
    if (!state.dug.length) return;
    if (!window.confirm(t("confirmAll", { n: state.dug.length }))) return;
    state.dug = [];
    state.dugSet = new Set();
    saveDug();
    render();
  }

  function setShowDug(on) {
    state.showDug = on;
    if (!on && state.selectedId != null && state.dugSet.has(state.selectedId)) {
      state.selectedId = null;
      state.nearby = [];
    }
    render();
  }

  function renderRestoreList() {
    var scroll = els.restoreList.scrollTop;
    var q = els.restoreQ.value.trim().replace(/，/g, ",").replace(/\s+/g, "");
    els.restoreList.replaceChildren();
    els.restoreNote.textContent = state.dug.length
      ? t("dugCount", { n: state.dug.length })
      : t("dugEmpty");
    if (!state.dug.length) return;
    var items = state.dug.slice().reverse().filter(function (id) {
      if (!q) return true;
      var p = byId.get(id);
      if (!p) return false;
      var blob = String(id) + "," + p.x + "," + p.y + " " + p.x + " " + p.y + typeBlob(p.t);
      return blob.indexOf(q) !== -1;
    });
    var shown = items.slice(0, q ? 80 : 40);
    if (!shown.length) {
      var empty = document.createElement("p");
      empty.className = "empty-note";
      empty.textContent = t("noMatch");
      els.restoreList.appendChild(empty);
      return;
    }
    shown.forEach(function (id) {
      var p = byId.get(id);
      var row = document.createElement("div");
      row.className = "dug-row";
      var info = document.createElement("div");
      var strong = document.createElement("strong");
      strong.textContent = typeName(p.t);
      var sub = document.createElement("span");
      sub.textContent = " " + t("idLabel", { id: id }) + " · " + p.x + "," + p.y;
      info.appendChild(strong);
      info.appendChild(sub);
      var loc = document.createElement("button");
      loc.type = "button";
      loc.className = "btn tiny";
      loc.textContent = t("locate");
      loc.addEventListener("click", function () {
        state.selectedId = id;
        state.nearby = [id];
        state.pin = null;
        focusPoint(p);
        render();
      });
      var back = document.createElement("button");
      back.type = "button";
      back.className = "btn tiny restore";
      back.textContent = t("restore");
      back.addEventListener("click", function () { restore(id); });
      row.appendChild(info);
      row.appendChild(loc);
      row.appendChild(back);
      els.restoreList.appendChild(row);
    });
    if (items.length > shown.length) {
      var more = document.createElement("p");
      more.className = "empty-note";
      more.textContent = t("more", { n: items.length - shown.length });
      els.restoreList.appendChild(more);
    }
    els.restoreList.scrollTop = scroll;
  }

  function renderCard() {
    var p = state.selectedId != null ? byId.get(state.selectedId) : null;
    if (!p || !isVisible(p)) {
      els.card.hidden = true;
      return;
    }
    var dug = state.dugSet.has(p.id);
    els.card.hidden = false;
    els.swatch.className = "swatch " + TYPES[p.t].shape;
    els.swatch.style.setProperty("--c", TYPES[p.t].color);
    els.cardName.textContent = typeName(p.t);
    els.cardId.textContent = t("idLabel", { id: p.id });
    els.cardCoords.textContent = "X " + p.x + " · Y " + p.y;
    els.dig.textContent = dug ? t("restore") : t("dig");
    els.dig.classList.toggle("restore", dug);
    els.nearby.replaceChildren();
    if (state.nearby.length > 1) {
      state.nearby.forEach(function (id) {
        var np = byId.get(id);
        if (!np) return;
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = typeShort(np.t) + " " + np.x + "," + np.y;
        if (id === p.id) b.className = "on";
        b.addEventListener("click", function () {
          state.selectedId = id;
          render();
        });
        els.nearby.appendChild(b);
      });
    }
  }

  function renderChrome() {
    var c = counts();
    applyStatic();
    els.remain.textContent = String(c.remain);
    document.title = t("titleDoc", { n: c.remain });
    var allOn = TYPE_ORDER.every(function (typeId) { return state.enabled.has(typeId); });
    els.meta.textContent = t("meta", { total: POINTS.length, dug: c.dug, shown: c.shown });
    els.badge.textContent = String(c.dug);
    els.show.setAttribute("aria-pressed", String(state.showDug));
    els.show.setAttribute("aria-expanded", String(state.showDug));
    els.restore.hidden = !state.showDug;
    els.restoreAll.disabled = c.dug === 0;
    var chips = els.filters.querySelectorAll(".chip[data-type]");
    chips.forEach(function (chip) {
      var t = Number(chip.dataset.type);
      chip.textContent = typeName(t) + " " + c[t];
      chip.setAttribute("aria-pressed", String(state.enabled.has(t)));
    });
    var all = document.getElementById("filter-all");
    if (all) all.setAttribute("aria-pressed", String(allOn));
    if (state.showDug) renderRestoreList();
    renderCard();
    var none = c.shown === 0;
    els.empty.hidden = !none;
    if (none) {
      els.empty.textContent = c.remain === 0 ? t("emptyAll") : t("emptyFilter");
    }
  }

  function renderLegend() {
    els.legend.replaceChildren();
    TYPE_ORDER.forEach(function (typeId) {
      var item = document.createElement("span");
      item.className = "legend-item";
      var mark = document.createElement("i");
      mark.className = "swatch " + TYPES[typeId].shape;
      mark.style.setProperty("--c", TYPES[typeId].color);
      var label = document.createElement("span");
      label.textContent = typeLegend(typeId);
      item.appendChild(mark);
      item.appendChild(label);
      els.legend.appendChild(item);
    });
  }

  function applyStatic() {
    var pack = I18N[state.lang] || I18N.zh;
    document.documentElement.lang = pack.htmlLang;
    document.getElementById("eyebrow").textContent = t("eyebrow");
    document.getElementById("title").textContent = t("title");
    document.getElementById("remain-label").textContent = t("remain");
    document.getElementById("fit").textContent = t("fit");
    document.getElementById("show-dug-label").textContent = t("showDug");
    document.getElementById("hint").textContent = t("hint");
    document.getElementById("dug-title").textContent = t("dugTitle");
    document.getElementById("restore-all").textContent = t("restoreAll");
    document.getElementById("restore-close").textContent = t("collapse");
    document.getElementById("restore-q").placeholder = t("filterPh");
    document.getElementById("restore-q").setAttribute("aria-label", t("filterAria"));
    document.getElementById("locate-btn").textContent = t("locate");
    document.getElementById("filters").setAttribute("aria-label", t("filtersAria"));
    document.getElementById("langs").setAttribute("aria-label", t("langAria"));
    canvas.setAttribute("aria-label", t("mapAria"));
    document.getElementById("zoom-in").setAttribute("aria-label", t("zoomIn"));
    document.getElementById("zoom-out").setAttribute("aria-label", t("zoomOut"));
    document.getElementById("card-close").setAttribute("aria-label", t("close"));
    document.getElementById("dig").textContent = t("dig");
    document.querySelectorAll("#langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang));
    });
    var all = document.getElementById("filter-all");
    if (all) all.textContent = t("all");
    renderLegend();
  }

  function setLang(lang) {
    if (!I18N[lang]) lang = "zh";
    state.lang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (err) { /* ignore */ }
    labelWidths = {};
    render();
  }

  function loadLang() {
    var saved = "zh";
    try { saved = localStorage.getItem(LANG_KEY) || "zh"; } catch (err) { /* ignore */ }
    state.lang = I18N[saved] ? saved : "zh";
  }

  function render() {
    renderChrome();
    requestDraw();
  }

  function buildFilters() {
    var all = document.createElement("button");
    all.type = "button";
    all.id = "filter-all";
    all.className = "chip";
    all.textContent = "全部";
    all.addEventListener("click", function () {
      TYPE_ORDER.forEach(function (t) { state.enabled.add(t); });
      render();
    });
    els.filters.appendChild(all);
    TYPE_ORDER.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.dataset.type = String(t);
      b.style.setProperty("--c", TYPES[t].color);
      b.addEventListener("click", function () {
        if (state.enabled.has(t)) state.enabled.delete(t);
        else state.enabled.add(t);
        if (state.selectedId != null) {
          var p = byId.get(state.selectedId);
          if (p && !isVisible(p)) {
            state.selectedId = null;
            state.nearby = [];
          }
        }
        render();
      });
      els.filters.appendChild(b);
    });
  }

  function hitsAt(sx, sy) {
    var rad = Math.max(18, pointRadius() + 10);
    var rad2 = rad * rad;
    var found = [];
    for (var i = 0; i < POINTS.length; i++) {
      var p = POINTS[i];
      if (!isVisible(p)) continue;
      var s = worldToScreen(p.x, p.y);
      var dx = s[0] - sx;
      var dy = s[1] - sy;
      var d = dx * dx + dy * dy;
      var limit = rad2;
      if (p.id === CENTER_ID) limit = Math.max(rad2, (centerRadius() + 8) * (centerRadius() + 8));
      else if (p.t === 3) limit = Math.max(rad2, 18 * 18);
      if (d <= limit) found.push({ p: p, d: p.id === CENTER_ID ? d * 0.15 : d });
    }
    found.sort(function (a, b) { return a.d - b.d; });
    return found.slice(0, 6);
  }

  function selectAt(sx, sy) {
    var found = hitsAt(sx, sy);
    if (!found.length) {
      state.selectedId = null;
      state.nearby = [];
    } else {
      state.nearby = found.map(function (f) { return f.p.id; });
      state.selectedId = found[0].p.id;
      state.pin = null;
    }
    render();
  }

  function canvasPos(e) {
    var rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function zoomAt(sx, sy, factor) {
    var box = size();
    var world = screenToWorld(sx, sy);
    state.cam.scale = clampScale(state.cam.scale * factor, box.w, box.h);
    state.cam.cx = world[0] - (sx - box.w / 2) / state.cam.scale;
    state.cam.cy = world[1] + (sy - box.h / 2) / state.cam.scale;
    clampCam();
    userMoved = true;
    requestDraw();
  }

  function zoomBy(factor) {
    var box = size();
    zoomAt(box.w / 2, box.h / 2, factor);
  }

  function bind() {
    canvas.addEventListener("pointerdown", function (e) {
      if (e.button != null && e.button !== 0) return;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (err) { /* pointer already gone */ }
      var pos = canvasPos(e);
      pointers.set(e.pointerId, { x: pos.x, y: pos.y, ox: pos.x, oy: pos.y });
      if (pointers.size === 1) {
        gesture = {
          type: "drag",
          moved: false,
          cx: state.cam.cx,
          cy: state.cam.cy,
          x: pos.x,
          y: pos.y,
          id: e.pointerId
        };
      } else if (pointers.size >= 2) {
        gesture = startPinch();
      }
    });

    canvas.addEventListener("pointermove", function (e) {
      var held = pointers.get(e.pointerId);
      var pos = canvasPos(e);
      if (held) {
        held.x = pos.x;
        held.y = pos.y;
      }
      if (gesture && gesture.type === "drag" && pointers.size === 1 && held) {
        var dx = pos.x - gesture.x;
        var dy = pos.y - gesture.y;
        if (Math.hypot(pos.x - held.ox, pos.y - held.oy) > 6) gesture.moved = true;
        if (gesture.moved) {
          canvas.classList.add("dragging");
          state.cam.cx = gesture.cx - dx / state.cam.scale;
          state.cam.cy = gesture.cy + dy / state.cam.scale;
          clampCam();
          userMoved = true;
          requestDraw();
        }
      } else if (gesture && gesture.type === "pinch" && pointers.size >= 2) {
        applyPinch();
      } else if (pointers.size === 0) {
        var near = hitsAt(pos.x, pos.y);
        var next = near.length ? near[0].p.id : null;
        if (next !== state.hoverId) {
          state.hoverId = next;
          requestDraw();
        }
      }
    });

    function endPointer(e) {
      var held = pointers.get(e.pointerId);
      pointers.delete(e.pointerId);
      if (gesture && gesture.type === "drag" && gesture.id === e.pointerId && held && !gesture.moved) {
        selectAt(held.x, held.y);
      }
      canvas.classList.remove("dragging");
      if (pointers.size === 0) gesture = null;
      else if (pointers.size === 1) {
        var rest = pointers.entries().next().value;
        gesture = {
          type: "drag",
          moved: true,
          cx: state.cam.cx,
          cy: state.cam.cy,
          x: rest[1].x,
          y: rest[1].y,
          id: rest[0]
        };
      } else gesture = startPinch();
    }

    canvas.addEventListener("pointerup", endPointer);
    canvas.addEventListener("pointercancel", endPointer);
    canvas.addEventListener("pointerleave", function () {
      if (pointers.size === 0 && state.hoverId != null) {
        state.hoverId = null;
        requestDraw();
      }
    });
    canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    canvas.addEventListener("wheel", function (e) {
      e.preventDefault();
      var pos = canvasPos(e);
      var factor = Math.exp(-e.deltaY * 0.0012);
      zoomAt(pos.x, pos.y, factor);
    }, { passive: false });
    canvas.addEventListener("dblclick", function (e) {
      var pos = canvasPos(e);
      zoomAt(pos.x, pos.y, 1.8);
    });

    document.getElementById("zoom-in").addEventListener("click", function () { zoomBy(1.3); });
    document.getElementById("zoom-out").addEventListener("click", function () { zoomBy(1 / 1.3); });
    document.getElementById("fit").addEventListener("click", function () {
      state.pin = null;
      fit();
      userMoved = true;
      requestDraw();
    });
    document.getElementById("locate").addEventListener("submit", function (e) {
      e.preventDefault();
      locate();
    });
    els.show.addEventListener("click", function () { setShowDug(!state.showDug); });
    document.getElementById("langs").addEventListener("click", function (e) {
      var button = e.target.closest("button[data-lang]");
      if (!button) return;
      setLang(button.dataset.lang);
    });
    els.restoreClose.addEventListener("click", function () { setShowDug(false); });
    els.restoreAll.addEventListener("click", restoreAll);
    els.restoreQ.addEventListener("input", function () { if (state.showDug) renderRestoreList(); });
    document.getElementById("card-close").addEventListener("click", function () {
      state.selectedId = null;
      state.nearby = [];
      render();
    });
    els.dig.addEventListener("click", function () {
      if (state.selectedId == null) return;
      if (state.dugSet.has(state.selectedId)) restore(state.selectedId);
      else markDug(state.selectedId);
    });
    window.addEventListener("keydown", function (e) {
      if (e.target && e.target.matches && e.target.matches("input, textarea")) return;
      if (e.key === "Escape") {
        state.selectedId = null;
        state.nearby = [];
        if (state.showDug) setShowDug(false);
        else render();
      } else if (e.key === "+" || e.key === "=") zoomBy(1.25);
      else if (e.key === "-" || e.key === "_") zoomBy(0.8);
      else if (e.key === "0") {
        fit();
        userMoved = true;
        requestDraw();
      }
    });

    if (window.ResizeObserver) {
      var observer = new ResizeObserver(function () {
        if (!userMoved) fit();
        requestDraw();
      });
      observer.observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", function () {
        if (!userMoved) fit();
        requestDraw();
      });
    }
  }

  function startPinch() {
    var pts = Array.from(pointers.values());
    if (pts.length < 2) return null;
    var dist = Math.max(12, Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y));
    var mx = (pts[0].x + pts[1].x) / 2;
    var my = (pts[0].y + pts[1].y) / 2;
    var world = screenToWorld(mx, my);
    return { type: "pinch", dist: dist, scale: state.cam.scale, wx: world[0], wy: world[1] };
  }

  function applyPinch() {
    if (!gesture || gesture.type !== "pinch") return;
    var pts = Array.from(pointers.values());
    if (pts.length < 2) return;
    var dist = Math.max(12, Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y));
    var mx = (pts[0].x + pts[1].x) / 2;
    var my = (pts[0].y + pts[1].y) / 2;
    var box = size();
    state.cam.scale = clampScale(gesture.scale * (dist / gesture.dist), box.w, box.h);
    state.cam.cx = gesture.wx - (mx - box.w / 2) / state.cam.scale;
    state.cam.cy = gesture.wy + (my - box.h / 2) / state.cam.scale;
    clampCam();
    userMoved = true;
    canvas.classList.add("dragging");
    requestDraw();
  }

  function locate() {
    var xs = els.inX.value.trim();
    var ys = els.inY.value.trim();
    if (xs === "" || ys === "") {
      showToast(t("needXY"));
      return;
    }
    var x = Number(xs);
    var y = Number(ys);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      showToast(t("badXY"));
      return;
    }
    var p = byXY.get(Math.round(x) + "," + Math.round(y));
    state.pin = null;
    if (!p) {
      state.cam.cx = x;
      state.cam.cy = y;
      if (state.cam.scale < 4) state.cam.scale = 4;
      clampCam();
      userMoved = true;
      state.pin = { x: x, y: y };
      state.selectedId = null;
      render();
      showToast(t("noPoint"));
      return;
    }
    if (!state.enabled.has(p.t)) state.enabled.add(p.t);
    if (state.dugSet.has(p.id) && !state.showDug) setShowDug(true);
    state.selectedId = p.id;
    state.nearby = [p.id];
    focusPoint(p);
    render();
  }

  try {
    migrateStorage();
    loadLang();
    loadDug();
    buildFilters();
    bind();
    fit();
    render();
  } catch (err) {
    var pre = document.createElement("pre");
    pre.textContent = String(err && err.stack || err);
    pre.style.cssText = "position:fixed;inset:12px;overflow:auto;background:#2a1212;color:#fff;z-index:9;padding:12px;";
    document.body.appendChild(pre);
  }

})();

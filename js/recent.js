/**
 * 最近浏览记录（localStorage 持久化） + 「我的」聚合区渲染
 * ------------------------------------------------------------------
 * 最近机场（≤8）/ 最近航图（复合键 code::filename，≤12）全部 try/catch 封装，
 * 与 favorites.js 风格一致；不直接操作 DOM，状态变化由 renderMySection 反映。
 * 「我的」区含 最近机场 / 最近航图 / 收藏航图 三子区，事件委托在 events.js。
 */

// localStorage 键名
const RECENT_AIRPORT_KEY = "skychart_recent_airports";
const RECENT_CHART_KEY = "skychart_recent_charts";
const RECENT_AIRPORT_MAX = 8;
const RECENT_CHART_MAX = 12;

// 「我的」区折叠态（内存态，重渲后保留）
let mySectionCollapsed = false;

/**
 * 从 localStorage 载入最近机场到 state.recentAirports。
 */
function loadRecentAirports() {
    try {
        const raw = localStorage.getItem(RECENT_AIRPORT_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        recentAirports = Array.isArray(parsed)
            ? parsed.filter((c) => typeof c === "string")
            : [];
    } catch (err) {
        recentAirports = [];
    }
}

/** 持久化最近机场。 */
function saveRecentAirports() {
    try {
        localStorage.setItem(RECENT_AIRPORT_KEY, JSON.stringify(recentAirports));
    } catch (err) {
        // 忽略写入异常
    }
}

/**
 * 记录最近浏览机场：unshift 去重，超上限淘汰最旧，并持久化。
 * @param {string} code 机场 ICAO 代码
 */
function addRecentAirport(code) {
    if (!code) return;
    const idx = recentAirports.indexOf(code);
    if (idx >= 0) recentAirports.splice(idx, 1);
    recentAirports.unshift(code);
    if (recentAirports.length > RECENT_AIRPORT_MAX) {
        recentAirports.length = RECENT_AIRPORT_MAX;
    }
    saveRecentAirports();
}

/**
 * 从 localStorage 载入最近航图到 state.recentCharts（复合键数组）。
 */
function loadRecentCharts() {
    try {
        const raw = localStorage.getItem(RECENT_CHART_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        recentCharts = Array.isArray(parsed)
            ? parsed.filter((k) => typeof k === "string")
            : [];
    } catch (err) {
        recentCharts = [];
    }
}

/** 持久化最近航图。 */
function saveRecentCharts() {
    try {
        localStorage.setItem(RECENT_CHART_KEY, JSON.stringify(recentCharts));
    } catch (err) {
        // 忽略写入异常
    }
}

/**
 * 记录最近浏览航图（复合键 code::filename）：unshift 去重，超上限淘汰，并持久化。
 * @param {string} code 机场 ICAO 代码
 * @param {string} filename 航图文件名
 */
function addRecentChart(code, filename) {
    if (!code || !filename) return;
    const key = code + "::" + filename;
    const idx = recentCharts.indexOf(key);
    if (idx >= 0) recentCharts.splice(idx, 1);
    recentCharts.unshift(key);
    if (recentCharts.length > RECENT_CHART_MAX) {
        recentCharts.length = RECENT_CHART_MAX;
    }
    saveRecentCharts();
}

/**
 * 移除一条最近机场记录并刷新「我的」区。
 * @param {string} code
 */
function removeRecentAirport(code) {
    if (!code) return;
    recentAirports = recentAirports.filter((c) => c !== code);
    saveRecentAirports();
    renderMySection();
}

/**
 * 移除一条最近航图记录（复合键）并刷新「我的」区。
 * @param {string} key
 */
function removeRecentChart(key) {
    if (!key) return;
    recentCharts = recentCharts.filter((k) => k !== key);
    saveRecentCharts();
    renderMySection();
}

/**
 * 清空全部最近浏览（机场 + 航图）并刷新「我的」区。
 */
function clearRecents() {
    recentAirports = [];
    recentCharts = [];
    saveRecentAirports();
    saveRecentCharts();
    renderMySection();
}

/**
 * 拆分复合键为 [code, filename]。
 * @param {string} key
 * @returns {[string, string]}
 */
function splitChartKey(key) {
    const sep = key.indexOf("::");
    if (sep < 0) return [key, ""];
    return [key.slice(0, sep), key.slice(sep + 2)];
}

/**
 * 渲染「我的」聚合区：最近机场 / 最近航图 / 收藏航图 三子区。
 * 数据取自 recentAirports / recentCharts / favoriteCharts；空态友好提示。
 * 交互（点击 / 移除 / 清空）由 events.js 在 #mySection 上统一委托。
 */
function renderMySection() {
    if (!mySectionBody) return;
    const out = [];

    // ---- 子区一：最近机场 ----
    out.push('<div class="my-subsection">');
    out.push(
        '<div class="my-subsection-head">' +
        '<span class="my-subsection-title"><i class="fas fa-clock-rotate-left"></i> ' + t("my.recentAirports") + '</span>'
    );
    if (recentAirports.length) {
        out.push('<button class="my-clear clear-recents-btn" type="button" title="' + t("my.clear") + '">' + t("my.clear") + '</button>');
    }
    out.push("</div>");
    if (!recentAirports.length) {
        out.push('<div class="my-empty">' + t("my.emptyAirports") + '</div>');
    } else {
        out.push('<div class="my-list">');
        recentAirports.forEach((code) => {
            const ap = findAirportByCode(code);
            if (!ap) return;
            out.push(
                '<button class="my-item my-recent-airport" type="button" data-code="' + escapeHtml(ap.code) + '">' +
                '<span class="my-item-code">' + escapeHtml(ap.code) + "</span>" +
                '<span class="my-item-name">' + escapeHtml(ap.name) + "</span>" +
                '<span class="my-remove remove-recent-airport" data-code="' + escapeHtml(ap.code) + '" title="移除" aria-label="移除"><i class="fas fa-xmark"></i></span>' +
                "</button>"
            );
        });
        out.push("</div>");
    }
    out.push("</div>");

    // ---- 子区二：最近航图 ----
    out.push('<div class="my-subsection">');
    out.push(
        '<div class="my-subsection-head">' +
        '<span class="my-subsection-title"><i class="fas fa-clock-rotate-left"></i> ' + t("my.recentCharts") + '</span>' +
        "</div>"
    );
    if (!recentCharts.length) {
        out.push('<div class="my-empty">' + t("my.emptyCharts") + '</div>');
    } else {
        out.push('<div class="my-list">');
        recentCharts.forEach((key) => {
            const parts = splitChartKey(key);
            const code = parts[0];
            const filename = parts[1];
            const ap = findAirportByCode(code);
            const chart = ap ? (DATA.charts[code] || []).find((f) => f.filename === filename) : null;
            const label = chart ? chart.name : filename;
            out.push(
                '<button class="my-item my-chart-item" type="button" data-code="' + escapeHtml(code) + '" data-filename="' + escapeHtml(filename) + '">' +
                '<span class="my-item-code">' + escapeHtml(code) + "</span>" +
                '<span class="my-item-name">' + escapeHtml(label) + "</span>" +
                '<span class="my-remove remove-recent-chart" data-key="' + escapeHtml(key) + '" title="移除" aria-label="移除"><i class="fas fa-xmark"></i></span>' +
                "</button>"
            );
        });
        out.push("</div>");
    }
    out.push("</div>");

    // ---- 子区三：收藏航图 ----
    out.push('<div class="my-subsection">');
    out.push(
        '<div class="my-subsection-head">' +
        '<span class="my-subsection-title"><i class="fas fa-star"></i> ' + t("my.favCharts") + '</span>' +
        "</div>"
    );
    if (!favoriteCharts.length) {
        out.push('<div class="my-empty">' + t("my.emptyFavs") + '</div>');
    } else {
        out.push('<div class="my-list">');
        favoriteCharts.forEach((key) => {
            const parts = splitChartKey(key);
            const code = parts[0];
            const filename = parts[1];
            const ap = findAirportByCode(code);
            const chart = ap ? (DATA.charts[code] || []).find((f) => f.filename === filename) : null;
            const label = chart ? chart.name : filename;
            out.push(
                '<button class="my-item my-chart-item fav-chart-item" type="button" data-code="' + escapeHtml(code) + '" data-filename="' + escapeHtml(filename) + '">' +
                '<span class="my-item-star"><i class="fas fa-star"></i></span>' +
                '<span class="my-item-code">' + escapeHtml(code) + "</span>" +
                '<span class="my-item-name">' + escapeHtml(label) + "</span>" +
                '<span class="my-remove unfav-chart" data-code="' + escapeHtml(code) + '" data-filename="' + escapeHtml(filename) + '" title="取消收藏" aria-label="取消收藏"><i class="fas fa-xmark"></i></span>' +
                "</button>"
            );
        });
        out.push("</div>");
    }
    out.push("</div>");

    mySectionBody.innerHTML = out.join("");
    // 还原折叠态
    if (mySection) mySection.classList.toggle("collapsed", mySectionCollapsed);
}

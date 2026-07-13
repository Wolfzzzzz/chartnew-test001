/**
 * 国际化（i18n）模块
 * ------------------------------------------------------------------
 * 依赖：state.js（lang / LANG_KEY）、dashboard.js（renderDashboard）、
 *       recent.js（renderMySection）、drawer.js（openAirportDrawer / drawerAirportCode）
 *
 * 两层 I18N 字典（zh / en），key 统一小驼峰点分。
 * t(key) 取词，缺省回退 zh 再回退 key。
 * applyLang() 回填 [data-i18n]（textContent）与 [data-i18n-ph]（placeholder），
 *   并重渲所有动态渲染区（仪表盘 / 我的区 / 页脚 / 当前机场航图）。
 * initLang() 读 localStorage → 写 lang → applyLang()。
 */

/**
 * I18N 全量字典（覆盖一期既有 + 二期新增全部文案）。
 * key 命名：模块.具体描述，点分结构。
 */
const I18N = {
    zh: {
        /* ---- 全局导航 ---- */
        "nav.overview": "概览",
        "lang.toggle": "中 / EN",
        "header.random": "发现",
        "ui.modern": "现代",
        "ui.cockpit": "驾驶舱",
        "ui.cyber": "赛博",

        /* ---- 航图类型筛选 ---- */
        "typefilter.all": "全部航图类型",

        /* ---- 航图类型标签（用于卡片彩标 + 仪表盘图例） ---- */
        "type.approach": "进近图",
        "type.departure": "离场图",
        "type.arrival": "进场图",
        "type.taxiway": "滑行图",
        "type.airport": "机场图",
        "type.other": "其它",

        /* ---- 概览仪表盘 ---- */
        "dash.browse": "浏览机场",
        "dash.title": "概览仪表盘",
        "dash.airports": "机场总数",
        "dash.charts": "航图总数",
        "dash.edition": "EAIP 版本",
        "dash.total": "总计",
        "dash.countryDist": "国家分布",
        "dash.countryHint": "点击筛选",
        "dash.typeDist": "航图类型分布",
        "dash.typeHint": "点击筛选",

        /* ---- 控制栏 ---- */
        "control.search": "搜索机场四字代码或名称...",
        "control.countryAll": "全部国家",
        "control.sortDefault": "默认（按首字母分组）",
        "control.sortCode": "按代码 A-Z",
        "control.sortName": "按名称 A-Z",
        "stat.line": "机场 {a} · 航图 {c} · 显示 {v}",

        /* ---- 机场详情抽屉 ---- */
        "drawer.charts": "航图数",
        "drawer.group": "ICAO 分组",
        "drawer.view": "查看航图",
        "drawer.fav": "收藏机场",

        /* ---- 「我的」聚合区 ---- */
        "my.recentAirports": "最近机场",
        "my.clear": "清空",
        "my.emptyAirports": "暂无最近浏览的机场",
        "my.recentCharts": "最近航图",
        "my.emptyCharts": "暂无最近浏览的航图",
        "my.favCharts": "收藏航图",
        "my.emptyFavs": "暂无收藏的航图",

        /* ---- 空状态 / 加载态 ---- */
        "empty.noAirportCharts": "该机场暂无航图数据",
        "empty.noTypeCharts": "该类型暂无航图",
        "empty.selectAirport": "请在左侧选择机场",
        "empty.typeHint": "请尝试切换筛选条件",
        "empty.init": "请在左侧选择机场以查看航图",
        "loading": "加载中…",

        /* ---- PDF 加载失败兜底（A-03） ---- */
        "pdf.failTitle": "航图加载失败",
        "pdf.failDesc": "远程航图暂时无法打开，可在源站查看或下载全部航图包。",
        "pdf.openSource": "在源站打开",
        "pdf.downloadAll": "下载全部航图包",

        /* ---- 下载 ---- */
        "download.single": "下载",
        "download.batch": "批量下载本机场全部",
        "download.batchHint": "已依次发起下载，请允许浏览器进行多次下载。",

        /* ---- 页脚（维护者 + 数据来源） ---- */
        "footer.maintainer": "维护者",
        "footer.source": "数据来源",
        "footer.sourceMain": "主数据源 chart.wuhanqing.cn（Daniel_清寒 · WuHanqing2005）",
        "footer.sourceJepp": "部分航图由 Jeppesen JeppView 提供",
        "footer.edition": "EAIP 版本",
        "footer.downloadAll": "下载全部航图",
        "footer.visitSource": "访问源站",
        "footer.originalContact": "原作者联系：wuhanqing2005@gmail.com · 微信 Daniel_Qinghan",

        /* ---- 快捷键帮助面板 ---- */
        "shortcut.title": "键盘快捷键",
        "shortcut.updown": "↑/↓ 或 J/K  导航机场",
        "shortcut.search": "/  搜索",
        "shortcut.dash": "D  概览仪表盘",
        "shortcut.theme": "T  切换主题",
        "shortcut.help": "?  本帮助",
        "shortcut.esc": "Esc  关闭",

        /* ---- 随机发现 ---- */
        "discover": "发现"
    },

    en: {
        /* ---- Global Navigation ---- */
        "nav.overview": "Overview",
        "lang.toggle": "EN / 中",
        "header.random": "Discover",
        "ui.modern": "Modern",
        "ui.cockpit": "Cockpit",
        "ui.cyber": "Cyber",

        /* ---- Chart Type Filter ---- */
        "typefilter.all": "All Chart Types",

        /* ---- Chart Type Labels ---- */
        "type.approach": "Approach",
        "type.departure": "Departure",
        "type.arrival": "Arrival",
        "type.taxiway": "Taxiway",
        "type.airport": "Airport",
        "type.other": "Other",

        /* ---- Dashboard ---- */
        "dash.browse": "Browse Airports",
        "dash.title": "Dashboard",
        "dash.airports": "Total Airports",
        "dash.charts": "Total Charts",
        "dash.edition": "EAIP Edition",
        "dash.total": "Total",
        "dash.countryDist": "Country Distribution",
        "dash.countryHint": "Click to filter",
        "dash.typeDist": "Chart Type Distribution",
        "dash.typeHint": "Click to filter",

        /* ---- Controls ---- */
        "control.search": "Search airport code or name...",
        "control.countryAll": "All Countries",
        "control.sortDefault": "Default (by letter group)",
        "control.sortCode": "Code A-Z",
        "control.sortName": "Name A-Z",
        "stat.line": "Airports {a} · Charts {c} · Showing {v}",

        /* ---- Airport Drawer ---- */
        "drawer.charts": "Charts",
        "drawer.group": "ICAO Group",
        "drawer.view": "View Charts",
        "drawer.fav": "Favorite",

        /* ---- My Section ---- */
        "my.recentAirports": "Recent Airports",
        "my.clear": "Clear",
        "my.emptyAirports": "No recently viewed airports",
        "my.recentCharts": "Recent Charts",
        "my.emptyCharts": "No recently viewed charts",
        "my.favCharts": "Favorite Charts",
        "my.emptyFavs": "No favorited charts yet",

        /* ---- Empty / Loading States ---- */
        "empty.noAirportCharts": "No chart data for this airport",
        "empty.noTypeCharts": "No charts of this type",
        "empty.selectAirport": "Select an airport from the left",
        "empty.typeHint": "Try changing the filter",
        "empty.init": "Select an airport from the left to view charts",
        "loading": "Loading…",

        /* ---- PDF Fallback (A-03) ---- */
        "pdf.failTitle": "Chart Load Failed",
        "pdf.failDesc": "The remote chart could not be opened. Try visiting the source site or download the full package.",
        "pdf.openSource": "Open on Source Site",
        "pdf.downloadAll": "Download Full Package",

        /* ---- Download ---- */
        "download.single": "Download",
        "download.batch": "Batch Download All",
        "download.batchHint": "Downloads have been initiated sequentially. Please allow multiple downloads in your browser.",

        /* ---- Footer (Maintainer + Data Source) ---- */
        "footer.maintainer": "Maintainer",
        "footer.source": "Data Source",
        "footer.sourceMain": "Primary source: chart.wuhanqing.cn (Daniel_清寒 · WuHanqing2005)",
        "footer.sourceJepp": "Some charts courtesy of Jeppesen JeppView",
        "footer.edition": "EAIP Edition",
        "footer.downloadAll": "Download All Charts",
        "footer.visitSource": "Visit Source Site",
        "footer.originalContact": "Original author contact: wuhanqing2005@gmail.com · WeChat Daniel_Qinghan",

        /* ---- Shortcut Help ---- */
        "shortcut.title": "Keyboard Shortcuts",
        "shortcut.updown": "↑/↓ or J/K  Navigate airports",
        "shortcut.search": "/  Search",
        "shortcut.dash": "D  Dashboard",
        "shortcut.theme": "T  Toggle theme",
        "shortcut.help": "?  This help",
        "shortcut.esc": "Esc  Close",

        /* ---- Discover ---- */
        "discover": "Discover"
    }
};

/**
 * 取词函数：按当前 lang 取 key 对应文本，缺省回退 zh，再回退 key 自身。
 * @param {string} key 点分键名，如 'dash.title'
 * @returns {string}
 */
function t(key) {
    const dict = I18N[lang] || I18N.zh;
    const value = dict && dict[key];
    if (value != null) return value;
    // 回退中文
    const fallback = I18N.zh && I18N.zh[key];
    return fallback != null ? fallback : key;
}

/**
 * 回填 [data-i18n]（textContent）与 [data-i18n-ph]（placeholder），
 * 并重渲仪表盘 / 我的区 / 页脚 / 当前机场航图卡片（若打开）。
 * 不刷新页面，即时生效。
 */
function applyLang() {
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");

    // 回填 [data-i18n] 元素的 textContent
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (key) el.textContent = t(key);
    });
    // 修复：uiThemeLabel 的 textContent 被 data-i18n 覆盖为固定值，
    // 恢复为当前 UI 主题的真实名称
    if (uiThemeLabel && typeof uiTheme !== 'undefined') {
        uiThemeLabel.textContent = t('ui.' + uiTheme);
    }

    // 回填 [data-i18n-ph] 元素的 placeholder
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
        const key = el.getAttribute("data-i18n-ph");
        if (key) el.placeholder = t(key);
    });

    // 重渲动态 JS 渲染区（这些不是由 data-i18n 静态控制的）
    if (typeof renderDashboard === "function") renderDashboard();
    if (typeof renderMySection === "function") renderMySection();
    if (typeof renderFooter === "function") renderFooter();

    // 若抽屉当前打开，刷新其文本
    if (typeof drawerAirportCode !== "undefined" && drawerAirportCode && typeof openAirportDrawer === "function") {
        openAirportDrawer(drawerAirportCode);
    }

    // 若当前有机场航图加载，重渲卡片（使类型标签、下载按钮文案同步）
    if (selectedAirport && DATA.charts[selectedAirport] && typeof renderPDFFiles === "function") {
        renderPDFFiles(DATA.charts[selectedAirport], selectedAirport);
    }

    // 刷新控制栏（国家选项、统计行、搜索占位）
    if (typeof initControls === "function") initControls();
}

/**
 * 初始化语言状态：从 localStorage 读取 skychart_lang，
 * 写入 lang → applyLang()。由 main.js init() 调用。
 */
function initLang() {
    try {
        const saved = localStorage.getItem(LANG_KEY);
        lang = saved === "en" ? "en" : "zh";
    } catch (err) {
        lang = "zh";
    }
    applyLang();
}

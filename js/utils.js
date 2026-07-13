/**
 * 工具函数
 * ------------------------------------------------------------------
 * 与具体 DOM 结构无关的纯逻辑小工具。
 */

/**
 * 根据机场代码查找机场完整信息。
 * @param {string} code 机场 ICAO 代码
 * @returns {object|null} 机场信息对象或 null
 */
function findAirportByCode(code) {
    return DATA.airports.find((a) => a.code === code) || null;
}

/**
 * 远程基址与本地前缀（A-01）。
 * - 本地数据文件中的 path 形如 "航图/RJAA-东京成田/RJAA-1-xxx.pdf"。
 * - http(s) 部署下把 "航图/" 前缀替换为 REMOTE_BASE 后再分段 encodeURIComponent。
 * - file:// 协议下保持本地相对路径（离线回退）。
 */
const REMOTE_BASE = "https://chart.wuhanqing.cn/Terminal/";
const LOCAL_PREFIX = "航图/";

/**
 * 构建航图可访问 URL。
 * - 绝对 http(s) URL：仅编码 origin 之后的路径段（修复 https: 被整体 encodeURI
 *   成 https%3A 的 bug），逐段 encodeURIComponent。
 * - 本地 path：http(s) 部署下把 "航图/" 前缀替换为远程基址后，同样「只编码 origin
 *   之后的路径段」（避免把 https:// 重新编码成 https%3A// 的坏链）；
 *   file:// 协议下保持本地相对路径（离线回退）。
 * @param {string} path 形如 "航图/RJAA-东京成田/RJAA-1-Aerodrome_Chart-1.pdf" 或绝对 URL
 * @returns {string} 可访问 URL
 */
function buildChartUrl(path) {
    if (!path) return "";
    // 本地路径：file:// 下保持相对路径（离线回退），不改写前缀
    const isFile = location.protocol === "file:";
    let p = path;
    if (!isFile && p.indexOf(LOCAL_PREFIX) === 0) {
        p = REMOTE_BASE + p.slice(LOCAL_PREFIX.length);
    }
    // 统一处理：把 origin 与后续路径段拆开，仅对路径段逐段编码，
    // 这样无论是绝对 URL 还是「本地前缀替换成远程基址」的结果都正确（不破坏 https://）。
    const m = p.match(/^(https?:\/\/[^/]+)(\/.*)?$/i);
    if (m) {
        const origin = m[1];
        const rest = m[2] || "";
        if (!rest) return origin;
        return origin + rest.split("/").map((s) => encodeURIComponent(s)).join("/");
    }
    // 纯相对路径（file:// 离线）：逐段编码中文 folder/page
    return p.split("/").map((s) => encodeURIComponent(s)).join("/");
}

/**
 * 航图类型彩色标签元数据（D-02）：类型 → 颜色 + Font Awesome 图标。
 * 颜色统一走 CSS 变量，随明暗主题与强调色预设联动。
 * 文本标签经 t('type.*') 渲染，本表只管「色 + 图标」。
 */
const CHART_TYPE_META = {
    approach: { color: "var(--color-success)", icon: "fa-plane-arrival" },        // 绿
    departure: { color: "var(--color-accent-blue)", icon: "fa-plane-departure" }, // 蓝
    arrival: { color: "var(--color-accent-purple)", icon: "fa-plane-arrival" },   // 紫
    taxiway: { color: "var(--color-accent-orange)", icon: "fa-route" },           // 橙
    airport: { color: "var(--color-neutral-400)", icon: "fa-map-location-dot" },  // 灰
    other: { color: "var(--color-neutral-500)", icon: "fa-file-pdf" }             // 灰（其它）
};

/**
 * 按文件名关键词识别航图类型（启发式分类，用于主区类型筛选）。
 * 优先级：taxiway > departure > arrival > airport > approach > other。
 * @param {string} filename 航图文件名（如 "ILS RWY 34L.pdf"）
 * @returns {'approach'|'departure'|'arrival'|'taxiway'|'airport'|'other'}
 */
function getChartType(filename) {
    const f = (filename || "").toLowerCase();
    if (/(taxi|twy)/.test(f)) return "taxiway";
    if (/\b(sid|dep|depart)/.test(f)) return "departure";
    if (/\b(star|arr|arriv)/.test(f)) return "arrival";
    if (/(airport|ad chart|aerodrome|\bplan\b|reference|\bref\b|\binfo\b|minimum|\bmin\b|take\s?off|apron|parking|\bstand\b|\bgate\b|parc)/.test(f)) {
        return "airport";
    }
    if (/(ils|loc|rnav|vor|ndb|rnp|apch|approach|land|circle|miss|\bga\b|radio)/.test(f)) {
        return "approach";
    }
    return "other";
}

/**
 * 按 ICAO 首字母区域兜底返回国家（英文名），确保不出现空值。
 * 仅当数据缺失国家时使用；运行时数据已由构建脚本预填充，故通常不被触发。
 * @param {string} code 机场 ICAO 代码
 * @returns {string} 国家英文名或空字符串
 */
function regionPrefixCountry(code) {
    const p = (code && code[0] ? code[0] : "").toUpperCase();
    const map = {
        K: "United States", P: "United States", Z: "China", R: "Japan", W: "Singapore",
        V: "Hong Kong", O: "United Arab Emirates", E: "Germany", L: "France", U: "Russia",
        B: "Iceland", T: "Turkey", S: "Brazil", N: "United States", C: "Australia",
        G: "Australia", H: "Thailand", A: "United States", M: "Mexico", Y: "Australia"
    };
    return map[p] || "";
}

/**
 * 转义 HTML 特殊字符，用于把数据文本安全插入 innerHTML / 属性。
 * @param {*} str 待转义值
 * @returns {string}
 */
function escapeHtml(str) {
    return String(str == null ? "" : str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

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
 * 把相对路径按 '/' 分段后用 encodeURIComponent 编码，
 * 得到可在 file:// 与 http(s):// 下安全使用的 URL。
 * 文件名里的空格、括号、#、?、& 等字符都会被正确编码，避免坏链。
 * @param {string} path 形如 "航图/RKJB-光州务安/(2-1) AD CHART.pdf"
 * @returns {string} 编码后的相对 URL
 */
function buildChartUrl(path) {
    return path
        .split("/")
        .map((seg) => encodeURIComponent(seg))
        .join("/");
}

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

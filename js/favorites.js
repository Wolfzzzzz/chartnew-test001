/**
 * 收藏功能
 * ------------------------------------------------------------------
 * 收藏以机场 ICAO 代码数组形式持久化在 localStorage（键 skychart_favorites）。
 * 所有读写均加 try/catch，避免隐私模式 / 配额限制导致页面报错。
 * 不直接操作 DOM：收藏状态的变化由调用方通过重渲染（applyFilters）反映。
 */

// localStorage 键名
const FAV_KEY = "skychart_favorites";

/**
 * 从 localStorage 载入收藏到全局 favorites（运行时缓存）。
 * 启动时调用一次；读取失败或数据异常时回退为空数组。
 */
function loadFavorites() {
    try {
        const raw = localStorage.getItem(FAV_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        favorites = Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        favorites = [];
    }
}

/**
 * 将当前 favorites 写回 localStorage。
 * 写入失败（如隐私模式）时静默忽略。
 */
function saveFavorites() {
    try {
        localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch (err) {
        // 忽略写入异常
    }
}

/**
 * 判断某机场是否已被收藏。
 * @param {string} code 机场 ICAO 代码
 * @returns {boolean}
 */
function isFavorite(code) {
    return Array.isArray(favorites) && favorites.indexOf(code) >= 0;
}

/**
 * 切换某机场的收藏状态，并持久化。
 * 不直接操作 DOM，由调用方重渲染反映。
 * @param {string} code 机场 ICAO 代码
 */
function toggleFavorite(code) {
    if (!code) return;
    const idx = favorites.indexOf(code);
    if (idx >= 0) {
        favorites.splice(idx, 1);
    } else {
        favorites.push(code);
    }
    saveFavorites();
}

/**
 * 单图收藏（扩展自机场收藏，风格一致）
 * ------------------------------------------------------------------
 * 以复合键 code::filename 数组持久化在 localStorage（键 skychart_fav_charts）。
 * 全部读写加 try/catch，不直接操作 DOM。
 */

// 单图收藏 localStorage 键名
const FAV_CHART_KEY = "skychart_fav_charts";

/**
 * 从 localStorage 载入单图收藏到全局 favoriteCharts（复合键数组）。
 */
function loadFavoriteCharts() {
    try {
        const raw = localStorage.getItem(FAV_CHART_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        favoriteCharts = Array.isArray(parsed)
            ? parsed.filter((k) => typeof k === "string")
            : [];
    } catch (err) {
        favoriteCharts = [];
    }
}

/** 持久化单图收藏。 */
function saveFavoriteCharts() {
    try {
        localStorage.setItem(FAV_CHART_KEY, JSON.stringify(favoriteCharts));
    } catch (err) {
        // 忽略写入异常
    }
}

/**
 * 判断某航图是否已被收藏（复合键）。
 * @param {string} key code::filename
 * @returns {boolean}
 */
function isFavoriteChart(key) {
    return Array.isArray(favoriteCharts) && favoriteCharts.indexOf(key) >= 0;
}

/**
 * 切换某航图的收藏状态并持久化（复合键 code::filename）。
 * @param {string} code 机场 ICAO 代码
 * @param {string} filename 航图文件名
 */
function toggleFavoriteChart(code, filename) {
    if (!code || !filename) return;
    const key = code + "::" + filename;
    const idx = favoriteCharts.indexOf(key);
    if (idx >= 0) {
        favoriteCharts.splice(idx, 1);
    } else {
        favoriteCharts.push(key);
    }
    saveFavoriteCharts();
}

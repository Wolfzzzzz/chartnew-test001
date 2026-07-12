/**
 * 概览仪表盘（D-01 / D-02 / D-03）
 * ------------------------------------------------------------------
 * 统计卡片（机场 / 航图 / 版本）+ 国家分布横向条形（手写 SVG）+ 航图类型分布
 * 环形（手写 SVG）。分布聚合在首次 renderDashboard 时计算一次并缓存到模块级
 * 变量，切换视图不重算（Q7）。
 * 联动筛选复用 applyFilters()（国家）与 renderPDFFiles()（类型），不新增渲染管线。
 * 配色统一走 var(--color-primary-500)，随明暗主题与强调色预设联动。
 */

// 模块级缓存（首渲计算一次，后续仅重渲染 SVG）
let _countryDistCache = null;
let _typeDistCache = null;

// 航图类型中文标签
const CHART_TYPE_LABEL = {
    approach: "进近图",
    departure: "离场图",
    arrival: "进场图",
    taxiway: "滑行图",
    airport: "机场图",
    other: "其它"
};

// 类型固定顺序（保证环形图扇区稳定，偏差归「其它」）
const CHART_TYPE_ORDER = ["approach", "departure", "arrival", "taxiway", "airport", "other"];

/**
 * 聚合机场按国家计数，取 Top12 + 其它，结果缓存。
 * @returns {Array<{country:string, count:number}>}
 */
function computeCountryDistribution() {
    if (_countryDistCache) return _countryDistCache;
    const map = {};
    DATA.airports.forEach((a) => {
        const c = a.country || "未知";
        map[c] = (map[c] || 0) + 1;
    });
    const entries = Object.keys(map).map((k) => ({ country: k, count: map[k] }));
    entries.sort((x, y) => y.count - x.count);
    const top = entries.slice(0, 12);
    const rest = entries.slice(12);
    let otherCount = 0;
    rest.forEach((o) => { otherCount += o.count; });
    if (otherCount > 0) top.push({ country: "其它", count: otherCount });
    _countryDistCache = top;
    return top;
}

/**
 * 遍历所有航图经 getChartType() 聚合类型分布，偏差（未命中固定顺序）归「其它」，结果缓存。
 * @returns {Array<{type:string, count:number}>}
 */
function computeChartTypeDistribution() {
    if (_typeDistCache) return _typeDistCache;
    const map = {};
    Object.keys(DATA.charts).forEach((code) => {
        (DATA.charts[code] || []).forEach((f) => {
            const t = getChartType(f.filename);
            map[t] = (map[t] || 0) + 1;
        });
    });
    const entries = CHART_TYPE_ORDER
        .filter((t) => map[t])
        .map((t) => ({ type: t, count: map[t] }));
    // 启发式未命中的类型归并到「其它」
    let otherExtra = 0;
    Object.keys(map).forEach((t) => {
        if (CHART_TYPE_ORDER.indexOf(t) < 0) otherExtra += map[t];
    });
    if (otherExtra > 0) {
        const ex = entries.find((e) => e.type === "other");
        if (ex) ex.count += otherExtra;
        else entries.push({ type: "other", count: otherExtra });
    }
    _typeDistCache = entries;
    return entries;
}

/** 截断文本（用于条形图国家名显示）。 */
function truncateText(str, n) {
    str = String(str == null ? "" : str);
    return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

/**
 * 构建国家分布横向条形 SVG（手写，配色用 var(--color-primary-500)）。
 * 每行一个 <g class="dist-country-bar" data-country>，点击由 events.js 委托。
 * @param {Array<{country:string, count:number}>} dist
 * @returns {string} SVG 字符串
 */
function buildCountryBarSVG(dist) {
    const rowH = 26, gap = 8, labelW = 132, rightPad = 56, topPad = 6;
    const viewW = 700;
    const barAreaW = viewW - labelW - rightPad;
    const maxCount = dist.length ? dist[0].count : 1;
    const height = topPad * 2 + dist.length * (rowH + gap);
    let rows = "";
    dist.forEach((d, i) => {
        const y = topPad + i * (rowH + gap);
        const w = maxCount > 0 ? (d.count / maxCount) * barAreaW : 0;
        const clickable = d.country !== "其它";
        const gClass = "dist-country-bar" + (clickable ? "" : " dist-country-bar--static");
        const dataAttr = clickable ? ` data-country="${escapeHtml(d.country)}"` : "";
        rows += `
            <g class="${gClass}"${dataAttr} role="button" tabindex="0" aria-label="${escapeHtml(d.country)} ${d.count}">
                <text x="10" y="${y + rowH / 2 + 4}" class="dist-label">${escapeHtml(truncateText(d.country, 18))}</text>
                <rect x="${labelW}" y="${y}" width="${Math.max(w, 3)}" height="${rowH}" rx="6" class="dist-rect"></rect>
                <text x="${labelW + Math.max(w, 3) + 8}" y="${y + rowH / 2 + 4}" class="dist-value">${d.count}</text>
            </g>`;
    });
    return `<svg class="dist-bar-svg" viewBox="0 0 ${viewW} ${height}" width="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="国家分布条形图">${rows}</svg>`;
}

/**
 * 构建航图类型分布环形 SVG（手写 donut）。扇区用 var(--color-primary-500)
 * 配合不同 stroke-opacity 形成层次，随强调色预设联动。
 * @param {Array<{type:string, count:number}>} dist
 * @returns {string} HTML 字符串（donut 容器 + 图例）
 */
function buildTypeDonutSVG(dist) {
    const total = dist.reduce((s, d) => s + d.count, 0) || 1;
    const cx = 110, cy = 110, r = 78, sw = 30;
    const C = 2 * Math.PI * r;
    const opacities = [1, 0.82, 0.66, 0.5, 0.36, 0.24];
    let offset = 0;
    let sectors = "";
    dist.forEach((d, i) => {
        const frac = d.count / total;
        const len = frac * C;
        const op = opacities[i % opacities.length];
        sectors += `<circle class="donut-sector" data-type="${d.type}" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke-width="${sw}" stroke-opacity="${op}" stroke-dasharray="${len.toFixed(2)} ${(C - len).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" role="button" tabindex="0" aria-label="${CHART_TYPE_LABEL[d.type] || d.type} ${d.count}"></circle>`;
        offset += len;
    });
    const legend = dist.map((d, i) => {
        const op = opacities[i % opacities.length];
        return `<div class="donut-legend-item" data-type="${d.type}">
            <span class="donut-legend-dot" style="background:var(--color-primary-500);opacity:${op}"></span>
            <span class="donut-legend-label">${CHART_TYPE_LABEL[d.type] || d.type}</span>
            <span class="donut-legend-value">${d.count}</span>
        </div>`;
    }).join("");
    return `
        <div class="donut-wrap">
            <svg class="donut-svg" viewBox="0 0 220 220" width="200" height="200" role="img" aria-label="航图类型分布环形图" style="transform:rotate(-90deg)">
                ${sectors}
            </svg>
            <div class="donut-center">
                <span class="donut-total">${total}</span>
                <span class="donut-total-label">航图总数</span>
            </div>
        </div>
        <div class="donut-legend">${legend}</div>`;
}

/**
 * 渲染概览仪表盘（D-01 卡片 + D-02 国家条形 + D-03 类型环形）。
 * 首渲时触发分布聚合并缓存。
 */
function renderDashboard() {
    if (!dashboardView) return;
    const meta = DATA.meta || {};
    const airportCount = meta.airportCount != null ? meta.airportCount : DATA.airports.length;
    const chartCount = meta.chartCount != null ? meta.chartCount : 0;
    const edition = meta.edition || "—";

    const countryDist = computeCountryDistribution();
    const typeDist = computeChartTypeDistribution();

    dashboardView.innerHTML = `
        <div class="dashboard-header">
            <button class="dashboard-exit-btn" type="button" data-action="exit-dashboard" aria-label="返回浏览机场">
                <i class="fas fa-arrow-left"></i> 浏览机场
            </button>
            <h2 class="dashboard-heading"><i class="fas fa-gauge-high"></i> 概览仪表盘</h2>
        </div>
        <div class="dashboard-grid">
            <section class="stat-cards">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-plane"></i></div>
                    <div class="stat-meta">
                        <div class="stat-value">${airportCount}</div>
                        <div class="stat-label">机场总数</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-file-pdf"></i></div>
                    <div class="stat-meta">
                        <div class="stat-value">${chartCount}</div>
                        <div class="stat-label">航图总数</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-calendar-alt"></i></div>
                    <div class="stat-meta">
                        <div class="stat-value">${escapeHtml(String(edition))}</div>
                        <div class="stat-label">版本期次</div>
                    </div>
                </div>
            </section>
            <section class="dist-panel">
                <h2 class="dist-title"><i class="fas fa-globe"></i> 国家分布 <span class="dist-hint">（点击条形筛选）</span></h2>
                <div class="dist-bar">${buildCountryBarSVG(countryDist)}</div>
            </section>
            <section class="dist-panel">
                <h2 class="dist-title"><i class="fas fa-chart-pie"></i> 航图类型分布 <span class="dist-hint">（点击扇区筛选）</span></h2>
                <div class="donut">${buildTypeDonutSVG(typeDist)}</div>
            </section>
        </div>`;
}

/**
 * 点击国家条形：写入 filterState.country → 切到浏览视图 → applyFilters 单一管线。
 * @param {string} country 国家英文名
 */
function handleDashboardCountryClick(country) {
    if (!country) return;
    filterState.country = country;
    if (countryFilter) countryFilter.value = country;
    switchView("browse");
    applyFilters();
}

/**
 * 点击类型扇区：写入 chartTypeFilter → 切到浏览视图 → 若已选机场则重渲，否则提示。
 * @param {string} type 航图类型
 */
function handleDashboardTypeClick(type) {
    if (!type) return;
    chartTypeFilter = type;
    if (chartTypeFilterEl) chartTypeFilterEl.value = type;
    switchView("browse");
    if (selectedAirport && DATA.charts[selectedAirport]) {
        renderPDFFiles(DATA.charts[selectedAirport], selectedAirport);
    } else {
        const label = CHART_TYPE_LABEL[type] || type;
        showPDFEmptyState(`请先在左侧选择机场，再查看「${label}」航图`);
    }
}

/**
 * 切换主内容视图（'dashboard' | 'browse'），用 hidden 显隐两容器。
 * 侧栏「概览」入口高亮与 currentView 同步。
 * @param {string} view
 */
function switchView(view) {
    currentView = view;
    if (view === "dashboard") {
        if (dashboardView) dashboardView.hidden = false;
        if (browseView) browseView.hidden = true;
    } else {
        if (dashboardView) dashboardView.hidden = true;
        if (browseView) browseView.hidden = false;
    }
    if (overviewNav) overviewNav.classList.toggle("active", view === "dashboard");
}

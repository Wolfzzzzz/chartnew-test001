/**
 * 控制栏逻辑
 * ------------------------------------------------------------------
 * 负责国家 / 排序 / 航图类型筛选控件：生成选项、绑定变更、计算可见机场、
 * 驱动列表重渲染与统计更新。所有列表变化都经 applyFilters() 单一管线。
 */

/**
 * 初始化控制栏：填充国家选项、绑定 country / sort 控件、初始化类型筛选与统计。
 * 在 main.init() 中调用一次。
 */
function initControls() {
    populateCountryOptions();
    setupChartTypeFilter(); // 绑定 #chartTypeFilter 变更
    renderStats(); // 初始统计

    // 国家筛选：写入 filterState.country 后经 applyFilters 重渲染
    if (countryFilter) {
        countryFilter.addEventListener("change", () => {
            filterState.country = countryFilter.value;
            applyFilters();
        });
    }

    // 排序：写入 filterState.sort 后经 applyFilters 重渲染
    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            filterState.sort = sortSelect.value;
            applyFilters();
        });
    }
}

/**
 * 根据 filterState（country + search）计算主列表可见机场；
 * 排序（sort）在此应用。收藏置顶分组在 renderAirportList 内单独处理。
 * @returns {Array<object>} 可见机场数组
 */
function getVisibleAirports() {
    const term = filterState.search.toLowerCase().trim();

    let list = DATA.airports.filter((a) => {
        // 国家筛选
        if (filterState.country !== "all" && a.country !== filterState.country) {
            return false;
        }
        // 实时搜索（代码 / 名称 / 国家）
        if (term) {
            const hay = `${a.code} ${a.name} ${(a.country || "")}`.toLowerCase();
            if (!hay.includes(term)) return false;
        }
        return true;
    });

    // 排序：code / name 为全局 A-Z 平铺；default 保持原顺序（渲染时按 group 分组）
    if (filterState.sort === "code") {
        list = list.slice().sort((a, b) => a.code.localeCompare(b.code));
    } else if (filterState.sort === "name") {
        list = list.slice().sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN"));
    }

    return list;
}

/**
 * 单一渲染管线：计算可见机场 → 渲染列表 → 更新统计。
 */
function applyFilters() {
    const visible = getVisibleAirports();
    renderAirportList(visible);
}

/**
 * 从 DATA.airports 去重生成国家选项（localeCompare 排序），保留“全部国家”。
 */
function populateCountryOptions() {
    if (!countryFilter) return;
    const countries = Array.from(
        new Set(DATA.airports.map((a) => a.country).filter(Boolean))
    );
    countries.sort((a, b) => a.localeCompare(b, "en"));

    let html = '<option value="all">全部国家</option>';
    countries.forEach((c) => {
        html += `<option value="${c}">${c}</option>`;
    });
    countryFilter.innerHTML = html;
}

/**
 * 更新侧边栏统计：「机场 N · 航图 M · 显示 K」。
 * N / M 来自 DATA.meta；K 为当前可见机场数（按 data-code 去重，收藏分组与
 * 主列表重叠时只计一次）。
 * @param {number} [visibleCount] 可选，显式指定可见数；缺省则从 DOM 统计。
 */
function renderStats(visibleCount) {
    if (!sidebarStats) return;

    const totalAirports = DATA.meta && DATA.meta.airportCount != null
        ? DATA.meta.airportCount
        : DATA.airports.length;
    const totalCharts = DATA.meta && DATA.meta.chartCount != null
        ? DATA.meta.chartCount
        : 0;

    let visible = visibleCount;
    if (typeof visible !== "number") {
        const codes = new Set();
        if (airportList) {
            airportList.querySelectorAll(".airport-item").forEach((el) => {
                if (el.dataset.code) codes.add(el.dataset.code);
            });
        }
        visible = codes.size;
    }

    sidebarStats.textContent = `机场 ${totalAirports} · 航图 ${totalCharts} · 显示 ${visible}`;
}

/**
 * 绑定主区航图类型筛选（#chartTypeFilter）变更：写入 chartTypeFilter 并重渲当前机场。
 */
function setupChartTypeFilter() {
    if (!chartTypeFilterEl) return;
    chartTypeFilterEl.addEventListener("change", () => {
        chartTypeFilter = chartTypeFilterEl.value;
        // 已选中机场时，直接重渲其航图（受类型筛选影响）
        if (selectedAirport && DATA.charts[selectedAirport]) {
            renderPDFFiles(DATA.charts[selectedAirport], selectedAirport);
        }
    });
}

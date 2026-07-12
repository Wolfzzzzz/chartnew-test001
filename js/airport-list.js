/**
 * 渲染左侧机场列表
 * ------------------------------------------------------------------
 * 仅负责把数据渲染成 HTML。事件委托由 events.js 统一绑定（点击机场、星标），
 * 这里不绑定任何监听。所有渲染都经由 renderAirportList（可被 applyFilters 调用）。
 */

/**
 * 重置键盘导航高亮下标（每次重渲染前调用）。
 */
function resetKeyboardIndex() {
    keyboardIndex = -1;
}

/**
 * 渲染单个机场条目（含收藏星标按钮）。
 * @param {object} airport 机场对象
 * @returns {string} <li> HTML 字符串
 */
function renderAirportItem(airport) {
    const fav = isFavorite(airport.code);
    return `
        <li class="airport-item" data-code="${airport.code}">
            <div class="airport-code">${airport.code}</div>
            <div class="airport-name">${airport.name}</div>
            <div class="airport-country">${airport.country}</div>
            <div class="airport-actions">
                <button class="info-btn" data-code="${airport.code}" aria-label="机场详情 ${airport.code}" title="详情">
                    <i class="fas fa-circle-info"></i>
                </button>
                <button class="fav-btn${fav ? " active" : ""}" data-code="${airport.code}" aria-label="收藏 ${airport.code}" title="收藏">
                    <i class="${fav ? "fas" : "far"} fa-star"></i>
                </button>
            </div>
        </li>
    `;
}

/**
 * 渲染一个分组（含标题 + 子列表）。
 * @param {string} title 分组标题
 * @param {Array<object>} items 该分组的机场
 * @param {boolean} isFavorites 是否为收藏分组（使用 .favorites-group 样式）
 * @returns {string} <li> HTML 字符串
 */
function renderAirportGroup(title, items, isFavorites) {
    const icon = isFavorites ? "fa-star" : "fa-folder";
    return `
        <li class="airport-group${isFavorites ? " favorites-group" : ""}">
            <div class="group-title">
                <i class="fas ${icon}"></i> ${title}
            </div>
            <ul class="airport-sublist">
                ${items.map((a) => renderAirportItem(a)).join("")}
            </ul>
        </li>
    `;
}

/**
 * 渲染左侧机场列表。
 * - 若没有任何筛选参数（主流程初始渲染），list 缺省为 DATA.airports。
 * - 顶部渲染「★ 收藏」分组（不被国家筛选隐藏，但随搜索过滤）。
 * - sort=default 按 group 首字母分组；code/name 为全局 A-Z 平铺。
 * @param {Array<object>} [list] 主列表可见机场（已按 country+search 过滤）
 */
function renderAirportList(list) {
    const airports = list && Array.isArray(list) ? list : DATA.airports;
    airportList.innerHTML = ""; // 清空，避免重复渲染
    resetKeyboardIndex();

    const term = filterState.search.toLowerCase().trim();

    // 收藏分组：随搜索过滤，但不受国家筛选影响
    const favAirports = favorites
        .map((code) => findAirportByCode(code))
        .filter(Boolean)
        .filter((a) => {
            if (!term) return true;
            const hay = `${a.code} ${a.name} ${(a.country || "")}`.toLowerCase();
            return hay.includes(term);
        });

    if (favAirports.length > 0) {
        airportList.innerHTML += renderAirportGroup("★ 收藏", favAirports, true);
    }

    // 主列表
    if (filterState.sort === "default") {
        // 按 group 字段聚合机场（与旧版按 A-Z 分组对象等价）
        const groups = {};
        airports.forEach((airport) => {
            const group = airport.group || (airport.code[0] || "?").toUpperCase();
            if (!groups[group]) groups[group] = [];
            groups[group].push(airport);
        });

        // 按字母顺序输出分组（A-Z）
        Object.keys(groups)
            .sort()
            .forEach((letter) => {
                airportList.innerHTML += renderAirportGroup(letter, groups[letter], false);
            });
    } else {
        // code / name：全局 A-Z 平铺，无分组标题
        airports.forEach((airport) => {
            airportList.innerHTML += renderAirportItem(airport);
        });
    }

    // 更新统计（显示数 = 去重后的可见机场数）
    renderStats();
}

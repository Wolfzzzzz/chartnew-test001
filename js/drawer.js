/**
 * 机场详情抽屉（右侧滑入 + overlay + ESC，复用 .modal 模式）
 * ------------------------------------------------------------------
 * 数据取自 findAirportByCode；ICAO 分组释义见 describeIcaoGroup()。
 * 本文件只负责打开 / 关闭与字段填充，不绑定任何事件——事件统一在 events.js 委托。
 */

// 当前抽屉展示的机场代码（供 events.js 的「查看航图 / 收藏」按钮读取）
let drawerAirportCode = null;

// ICAO 首字母区域释义（启发式，仅用于展示）
const ICAO_REGION_DESC = {
    A: "美国本土（西经100°以西）",
    B: "冰岛",
    C: "加拿大",
    D: "西欧大部（法国、葡萄牙等）",
    E: "北欧 / 西欧北部（英、德、荷、北欧）",
    F: "非洲大部",
    G: "西非 / 几内亚湾一带",
    H: "东非（埃及、肯尼亚等）",
    K: "美国本土（contiguous US）",
    L: "南欧（意、西、葡、希）",
    N: "太平洋岛国（瑙鲁等）",
    O: "中东",
    P: "太平洋（夏威夷等）",
    R: "韩国 / 日本 / 台湾",
    S: "南美洲",
    T: "加勒比 / 中美",
    U: "俄罗斯 / 独联体",
    V: "南亚 / 东南亚（印度等）",
    W: "东南亚（印尼、马来、新加坡、泰国）",
    Y: "澳大利亚",
    Z: "中国 / 蒙古"
};

/**
 * 根据 ICAO 分组首字母返回区域释义。
 * @param {string} group 分组字母
 * @returns {string}
 */
function describeIcaoGroup(group) {
    const g = String(group || "").toUpperCase();
    if (ICAO_REGION_DESC[g]) return `ICAO 首字母「${g}」：${ICAO_REGION_DESC[g]}。`;
    return `ICAO 分组「${g || "?"}」（区域释义未知）。`;
}

/**
 * 打开机场详情抽屉：填充字段 → 添加 .active → 锁定页面滚动。
 * @param {string} code 机场 ICAO 代码
 */
function openAirportDrawer(code) {
    if (!airportDrawer) return;
    const airport = findAirportByCode(code);
    if (!airport) return;
    drawerAirportCode = code;

    if (drawerCode) drawerCode.textContent = airport.code;
    if (drawerName) drawerName.textContent = airport.name;
    if (drawerCountry) drawerCountry.textContent = airport.country || "—";
    if (drawerChartCount) {
        const count = airport.chartCount != null
            ? airport.chartCount
            : (DATA.charts[code] ? DATA.charts[code].length : 0);
        drawerChartCount.textContent = String(count);
    }
    const group = airport.group || (airport.code[0] || "?").toUpperCase();
    if (drawerGroup) drawerGroup.textContent = group;
    if (drawerGroupDesc) drawerGroupDesc.textContent = describeIcaoGroup(group);

    // 收藏按钮反映机场级收藏态
    if (drawerFavBtn) {
        const fav = isFavorite(code);
        drawerFavBtn.classList.toggle("active", fav);
        const icon = drawerFavBtn.querySelector("i");
        if (icon) icon.className = fav ? "fas fa-star" : "far fa-star";
        drawerFavBtn.dataset.code = code;
    }
    if (drawerViewCharts) drawerViewCharts.dataset.code = code;

    airportDrawer.classList.add("active");
    document.body.style.overflow = "hidden";
}

/**
 * 关闭机场详情抽屉：移除 .active → 恢复页面滚动。
 */
function closeAirportDrawer() {
    if (!airportDrawer) return;
    airportDrawer.classList.remove("active");
    document.body.style.overflow = "";
}

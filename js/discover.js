/**
 * 随机发现模块（D-06）
 * ------------------------------------------------------------------
 * 依赖：state.js（DATA）、charts.js（openPDFViewer）
 *
 * randomChart() 从 DATA 全量机场中随机选取一个有机图的机场，
 * 再从中随机选一张航图，调用 openPDFViewer 打开预览。
 * 可连续触发（每次均重新抽样）。
 */

/**
 * 随机发现一张航图并打开预览。
 * 从 DATA.charts 的所有机场中，随机选取一个有机图列表的机场，
 * 再从中随机选取一张航图，调用 openPDFViewer。
 * 若全量数据为空则静默返回。
 */
function randomChart() {
    // 收集有机图的机场代码
    const codes = Object.keys(DATA.charts).filter(
        (code) => DATA.charts[code] && DATA.charts[code].length > 0
    );
    if (codes.length === 0) return;

    const code = codes[Math.floor(Math.random() * codes.length)];
    const charts = DATA.charts[code];
    const chart = charts[Math.floor(Math.random() * charts.length)];
    if (!chart) return;

    // 选中后先更新选中态，再打开预览
    // 若该机场在列表中，高亮它
    const items = airportList ? airportList.querySelectorAll(".airport-item") : [];
    items.forEach((el) => {
        el.classList.remove("active");
        if (el.dataset.code === code) {
            el.classList.add("active");
        }
    });

    selectedAirport = code;
    const ap = findAirportByCode(code);
    if (ap) {
        currentAirport.textContent = ap.name + " (" + ap.code + ")";
        pdfSectionTitle.textContent = ap.name + " 航图文件";
    }

    openPDFViewer(code, chart.filename);
}

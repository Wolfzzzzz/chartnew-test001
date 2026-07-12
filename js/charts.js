/**
 * 航图加载与预览
 * ------------------------------------------------------------------
 * 负责机场航图的加载、卡片渲染（按 chartTypeFilter 过滤）、PDF 预览弹窗的
 * 打开与关闭，以及加载中 / 空状态的展示。
 */

/**
 * 加载指定机场的航图文件（含 800ms 加载状态模拟）。
 * 切换机场时重置航图类型筛选为“全部”，保证可预期。
 * @param {string} airportCode 机场代码
 */
function loadAirportCharts(airportCode) {
    // 修复 Bug1：加载机场航图即代表“进入浏览视图”。
    // 当用户身处仪表盘（dashboard）点击下方各类入口（侧栏机场项 / 最近机场 /
    // 抽屉「查看航图」）时，必须把主区切回 browse，否则 #browseView 保持隐藏、
    // 视觉上“卡死出不去”。switchView 幂等，与 handleDashboardCountryClick 一致。
    if (typeof switchView === "function") switchView("browse");

    // 记录最近浏览机场（单一入口，由加载触发，保持单一管线）
    addRecentAirport(airportCode);

    // 切换机场：重置类型筛选（控件与状态同步）
    chartTypeFilter = "all";
    if (chartTypeFilterEl) chartTypeFilterEl.value = "all";

    showPDFLoading(); // 显示加载中状态

    // 模拟接口请求延迟，提升用户感知体验
    setTimeout(() => {
        const charts = DATA.charts[airportCode];
        if (charts && charts.length > 0) {
            renderPDFFiles(charts, airportCode); // 有数据则渲染航图卡片
        } else {
            showPDFEmptyState("该机场暂无航图文件"); // 无数据则显示空状态
        }
    }, 800);
}

/**
 * 渲染航图文件卡片。
 * 先按 chartTypeFilter 过滤，再渲染。使用事件委托：在 pdfContainer 上统一
 * 绑定一次 click（见 events.js），通过 dataset.filename / dataset.airport 打开预览。
 * @param {Array} files 航图文件数组
 * @param {string} airportCode 机场代码
 */
function renderPDFFiles(files, airportCode) {
    pdfContainer.innerHTML = ""; // 清空容器，避免重复渲染
    pdfContainer.classList.remove("list-view"); // 重置为默认卡片视图

    // 按航图类型筛选
    const filtered =
        chartTypeFilter && chartTypeFilter !== "all"
            ? files.filter((f) => getChartType(f.filename) === chartTypeFilter)
            : files;

    if (filtered.length === 0) {
        pdfContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fas fa-filter"></i></div>
                <h3 class="empty-text">该类型下暂无航图</h3>
                <p>请切换其它航图类型或选择其它机场</p>
            </div>
        `;
        return;
    }

    filtered.forEach((file) => {
        const key = airportCode + "::" + file.filename;
        const fav = isFavoriteChart(key);
        const pdfHTML = `
            <div class="pdf-card" data-filename="${escapeHtml(file.filename)}" data-airport="${airportCode}">
                <button class="chart-fav-btn${fav ? " active" : ""}" data-code="${airportCode}" data-filename="${escapeHtml(file.filename)}" aria-label="收藏航图" title="收藏航图">
                    <i class="${fav ? "fas" : "far"} fa-star"></i>
                </button>
                <div class="pdf-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="pdf-info">
                    <h3 class="pdf-name">${escapeHtml(file.name)}</h3>
                    <div class="pdf-size">${escapeHtml(file.size)}</div>
                </div>
            </div>
        `;
        pdfContainer.innerHTML += pdfHTML; // 拼接卡片 HTML
    });
}

/**
 * 打开 PDF 预览模态框（内嵌 iframe 预览，不再新标签页打开）。
 * @param {string} airportCode 机场代码
 * @param {string} filename 航图文件名
 */
function openPDFViewer(airportCode, filename) {
    // 修复 Bug1：若从仪表盘（如「我的」最近/收藏航图）打开预览，
    // 先切回浏览视图，保证关闭模态框后主区为可浏览状态而非停留在仪表盘。
    if (typeof switchView === "function") switchView("browse");

    const airport = findAirportByCode(airportCode);
    const chart = DATA.charts[airportCode]?.find((f) => f.filename === filename);

    if (airport && chart) {
        // 记录最近浏览航图（复合键 code::filename）
        addRecentChart(airportCode, filename);

        // 用 chart.path 构建 URL，按段编码（空格/括号/#/?/& 等都会被正确编码），
        // 确保 file:// 与 http(s):// 下均可安全打开
        const url = buildChartUrl(chart.path);

        // 重置遮罩为 spinner 并显示（避免残留上一次的错误文案）
        modalLoading.innerHTML = '<div class="spinner"></div>';
        modalLoading.style.display = "flex";
        // 安全超时：若 load/error 始终不触发（常见于 file:// 下加载本地 PDF），
        // 最多 8s 后强制隐藏遮罩，避免永久转圈
        modalLoadTimer = setTimeout(() => {
            modalLoading.style.display = "none";
        }, 8000);

        pdfModalTitle.textContent = `${airport.name} - ${chart.name}`; // 模态框标题
        pdfViewer.src = url; // PDF 预览器内嵌加载文件（iframe 渲染）
        downloadPdf.href = url; // 下载链接指向文件
        downloadPdf.download = chart.filename; // 自定义下载文件名

        // 注意：已移除「file:// 下自动新标签页打开」的旧行为，
        // 改为统一在 iframe 内嵌预览（弹窗遮罩 8 秒内消失即露出内嵌 PDF）。

        pdfModal.classList.add("active"); // 显示模态框
        document.body.style.overflow = "hidden"; // 禁止页面滚动
    }
}

/**
 * 关闭 PDF 预览模态框，重置状态。
 */
function closePDFViewer() {
    pdfModal.classList.remove("active");
    document.body.style.overflow = "auto";
    // 清除弹窗加载安全超时并隐藏遮罩，避免关闭后仍计时或残留显示
    if (modalLoadTimer) {
        clearTimeout(modalLoadTimer);
        modalLoadTimer = null;
    }
    modalLoading.style.display = "none";
    pdfViewer.src = ""; // 清空预览器，释放资源
}

/**
 * 显示 PDF 加载状态（加载动画）。
 */
function showPDFLoading() {
    pdfContainer.innerHTML = `
        <div class="loading-indicator">
            <div class="spinner"></div>
        </div>
    `;
}

/**
 * 显示 PDF 空状态（无数据提示）。
 * @param {string} message 提示文本
 */
function showPDFEmptyState(message = "暂无航图文件") {
    pdfContainer.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">
                <i class="fas fa-inbox"></i>
            </div>
            <h3 class="empty-text">${message}</h3>
            <p>请选择其他机场或稍后再试</p>
        </div>
    `;
}

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

    // 同步「批量下载本机场全部」按钮的 code（C-02）
    if (batchDownloadBtn) batchDownloadBtn.dataset.code = airportCode;

    showPDFLoading(); // 显示加载中状态

    // 模拟接口请求延迟，提升用户感知体验
    setTimeout(() => {
        const charts = DATA.charts[airportCode];
        if (charts && charts.length > 0) {
            renderPDFFiles(charts, airportCode); // 有数据则渲染航图卡片
        } else {
            showPDFEmptyState(t("empty.noAirportCharts")); // 无数据则显示空状态
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
                <h3 class="empty-text">${t("empty.noTypeCharts")}</h3>
                <p>${t("empty.typeHint")}</p>
            </div>
        `;
        return;
    }

    filtered.forEach((file) => {
        const key = airportCode + "::" + file.filename;
        const fav = isFavoriteChart(key);
        // 类型彩标（D-02）：色 + 图标 + 文案，文案走 t('type.*')
        const type = getChartType(file.filename);
        const meta = CHART_TYPE_META[type] || CHART_TYPE_META.other;
        const pdfHTML = `
            <div class="pdf-card" data-filename="${escapeHtml(file.filename)}" data-airport="${airportCode}">
                <button class="chart-fav-btn${fav ? " active" : ""}" data-code="${airportCode}" data-filename="${escapeHtml(file.filename)}" aria-label="收藏航图" title="收藏航图">
                    <i class="${fav ? "fas" : "far"} fa-star"></i>
                </button>
                <button class="chart-download-btn" data-code="${airportCode}" data-filename="${escapeHtml(file.filename)}" aria-label="${t("download.single")}" title="${t("download.single")}">
                    <i class="fas fa-download"></i>
                </button>
                <div class="pdf-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="pdf-info">
                    <h3 class="pdf-name">${escapeHtml(file.name)}</h3>
                    <div class="pdf-card-meta">
                        <span class="chart-type-tag" style="--tag-color:${meta.color}">
                            <i class="fas ${meta.icon}"></i> ${t("type." + type)}
                        </span>
                        <span class="pdf-size">${escapeHtml(file.size)}</span>
                    </div>
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

        // 记住机场代码，供 modal.js error 事件兜底定位源站 folder
        if (typeof lastAirportCode !== "undefined") lastAirportCode = airportCode;

        // 重置遮罩为 spinner 并显示（避免残留上一次的错误文案）
        modalLoading.innerHTML = '<div class="spinner"></div>';
        modalLoading.style.display = "flex";
        // 安全超时：跨域 PDF 的 load/error 事件在部分浏览器下不可靠，
        // 若 iframe 始终不触发，5s 后调用统一兜底 UI（在新标签页打开 / 源站 / 全部包）。
        // file:// 离线场景：仅隐藏遮罩，露出本地 PDF（若有），避免误报失败。
        if (modalLoadTimer) clearTimeout(modalLoadTimer);
        modalLoadTimer = setTimeout(() => {
            if (location.protocol === "file:") {
                modalLoading.style.display = "none";
            } else if (typeof showPDFFallback === "function") {
                showPDFFallback(url, airportCode);
            }
        }, 5000);

        // iframe 失败兜底（onerror 双路，部分浏览器对 iframe 资源错误不触发 error 事件，
        // 故以 8s modalLoadTimer 超时为主要兜底，onerror 为辅）。file:// 下不误报。
        pdfViewer.onerror = () => {
            if (location.protocol === "file:") return;
            if (modalLoadTimer) { clearTimeout(modalLoadTimer); modalLoadTimer = null; }
            if (typeof showPDFFallback === "function") showPDFFallback(url, airportCode);
        };
        // 成功加载（load 触发）则清超时并隐藏遮罩
        pdfViewer.onload = () => {
            if (modalLoadTimer) { clearTimeout(modalLoadTimer); modalLoadTimer = null; }
            modalLoading.style.display = "none";
        };

        pdfModalTitle.textContent = `${airport.name} - ${chart.name}`; // 模态框标题
        pdfViewer.src = url; // PDF 预览器内嵌加载文件（iframe 渲染）
        openPdfTab.href = url; // 在新标签页打开（跨域 PDF 最可靠的查看方式）
        downloadPdf.href = url; // 下载链接指向文件
        downloadPdf.download = chart.filename; // 自定义下载文件名

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
 * 显示 PDF 加载状态（加载动画 + 文案，D-04 强化反馈，避免纯白屏）。
 */
function showPDFLoading() {
    pdfContainer.innerHTML = `
        <div class="loading-indicator">
            <div class="spinner"></div>
            <span class="loading-text">${t("loading")}</span>
        </div>
    `;
}

/**
 * 显示 PDF 空状态（无数据提示）。
 * @param {string} message 提示文本
 */
function showPDFEmptyState(message) {
    const text = message || t("empty.noAirportCharts");
    pdfContainer.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">
                <i class="fas fa-inbox"></i>
            </div>
            <h3 class="empty-text">${escapeHtml(text)}</h3>
            <p>${t("empty.selectAirport")}</p>
        </div>
    `;
}

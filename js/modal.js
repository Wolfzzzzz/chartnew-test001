/**
 * 弹窗加载状态逻辑
 * ------------------------------------------------------------------
 * 针对 file:// 下本地 PDF 的 load/error 事件可能不触发做加固：
 * 通过 modalLoadTimer（8 秒安全超时）兜底隐藏遮罩，避免永久转圈。
 * 依赖模块级引用：pdfModal / pdfViewer / modalLoading / modalLoadTimer。
 */

/**
 * 初始化模态框 PDF 预览器的加载状态监听。
 * 守卫：缺少关键 DOM 元素时直接返回，避免报错。
 */
const setupModalLoading = () => {
    if (!pdfModal || !pdfViewer || !modalLoading) return;

    // 开始加载：显示遮罩
    pdfViewer.addEventListener("loadstart", () => {
        modalLoading.style.display = "flex";
    });

    // 加载成功：先清超时再隐藏遮罩
    pdfViewer.addEventListener("load", () => {
        if (modalLoadTimer) {
            clearTimeout(modalLoadTimer);
            modalLoadTimer = null;
        }
        modalLoading.style.display = "none";
    });

    // 加载失败：先清超时 -> 调统一兜底 UI（A-03 友好提示 + 两个兜底入口）
    pdfViewer.addEventListener("error", () => {
        if (modalLoadTimer) {
            clearTimeout(modalLoadTimer);
            modalLoadTimer = null;
        }
        if (typeof showPDFFallback === "function") {
            showPDFFallback(pdfViewer.getAttribute("src") || "", lastAirportCode);
        } else {
            modalLoading.style.display = "none";
        }
    });
};

// 最近一次打开的机场代码（供 error 事件兜底时定位源站 folder）
let lastAirportCode = null;

/**
 * 远程 PDF 加载失败兜底 UI（A-03）：友好提示 + 两个兜底入口，避免永久白屏/转圈。
 * - 「在源站打开」：按 folder 定位到 chart.wuhanqing.cn 对应机场目录（新标签）。
 * - 「下载全部航图包」：跳转到 r2 整包 zip。
 * @param {string} url 失败时的远程 URL（用于展示，非必需）
 * @param {string} airportCode 机场代码（用于定位源站 folder）
 */
function showPDFFallback(url, airportCode) {
    if (!modalLoading) return;
    let sourceUrl = SOURCE_SITE;
    if (airportCode && DATA.charts[airportCode] && DATA.charts[airportCode][0]) {
        const u = buildChartUrl(DATA.charts[airportCode][0].path);
        const m = u.match(/^(https?:\/\/[^/]+)(\/.*)?$/i);
        const folder = m && m[2] ? m[2].split("/").slice(0, 2).join("/") : "";
        sourceUrl = SOURCE_SITE + "Terminal/" + folder;
    }
    modalLoading.style.display = "flex";
    modalLoading.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <h3 class="empty-text">${t("pdf.failTitle")}</h3>
            <p>${t("pdf.failDesc")}</p>
            <div class="pdf-fallback-actions">
                <a class="download-btn" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener">${t("pdf.openSource")}</a>
                <a class="download-btn" href="${R2_ZIP}" target="_blank" rel="noopener">${t("pdf.downloadAll")}</a>
            </div>
        </div>
    `;
}

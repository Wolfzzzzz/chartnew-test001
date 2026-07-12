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

    // 加载失败：先清超时 -> 先隐藏 -> 再写错误文案，
    // 避免错误态被后续 loadstart 再次 flex 显示为过期错误文案
    pdfViewer.addEventListener("error", () => {
        if (modalLoadTimer) {
            clearTimeout(modalLoadTimer);
            modalLoadTimer = null;
        }
        modalLoading.style.display = "none";
        modalLoading.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <h3 class="empty-text">加载失败</h3>
                <p>无法加载PDF文件，请稍后重试</p>
            </div>
        `;
    });
};

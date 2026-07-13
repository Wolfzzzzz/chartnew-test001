/**
 * 下载模块（单图下载 + 批量下载 + 提示）
 * ------------------------------------------------------------------
 * 依赖：state.js（DATA.charts）、utils.js（buildChartUrl / REMOTE_BASE）、
 *       i18n.js（t()）
 *
 * C-01 单图下载：优先 <a download href=远程URL>，跨域受限时浏览器忽略
 *   download 属性，退化为新标签页打开（不依赖源站 CORS）。
 * C-02 批量下载：setTimeout 依次触发（i*400ms 间隔），避免被浏览器
 *   拦截全部；显示轻提示引导用户允许多次下载。
 * 页脚 r2 整包作为"下载全部"的最终入口（R2_ZIP 常量定义于 footer.js）。
 */

/**
 * 单图下载（C-01）。
 * 创建一个临时 <a> 元素，指向 buildChartUrl(chart.path)，
 * 设置 download=chart.filename 尝试下载。
 * 跨域时 download 属性被忽略，浏览器退化为在新标签打开远程 PDF。
 * @param {string} airportCode 机场 ICAO 代码
 * @param {string} filename 航图文件名
 */
function downloadChart(airportCode, filename) {
    const charts = DATA.charts[airportCode];
    if (!charts) return;
    const chart = charts.find((f) => f.filename === filename);
    if (!chart) return;

    const url = buildChartUrl(chart.path);
    const a = document.createElement("a");
    a.href = url;
    a.download = chart.filename; // 跨域被忽略，退化为新标签导航
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

/**
 * 批量下载本机场全部航图（C-02）。
 * 对 DATA.charts[airportCode] 每项，间隔 400ms 依次调用 downloadChart，
 * 避免被浏览器拦截为大量并发下载。
 * 最后显示轻提示，引导用户允许浏览器进行多次下载。
 * @param {string} airportCode 机场 ICAO 代码
 */
function downloadAllForAirport(airportCode) {
    const charts = DATA.charts[airportCode];
    if (!charts || !charts.length) return;

    charts.forEach((f, i) => {
        setTimeout(() => {
            downloadChart(airportCode, f.filename);
        }, i * 400);
    });

    showBatchHint(t("download.batchHint"));
}

/**
 * 显示轻提示 toast（自动 4 秒后消失）。
 * @param {string} msg 提示文本
 */
function showBatchHint(msg) {
    // 移除已有 toast
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    document.body.appendChild(toast);

    // 触发显示动画（下一帧）
    requestAnimationFrame(() => {
        toast.classList.add("toast--show");
    });

    // 4 秒后隐藏并移除
    setTimeout(() => {
        toast.classList.remove("toast--show");
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 300);
    }, 4000);
}

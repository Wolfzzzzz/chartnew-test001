/**
 * 应用入口
 * ------------------------------------------------------------------
 * 在 DOMContentLoaded 时统一初始化。所有被调用的函数/变量均来自其它经典
 * <script> 文件，这些文件已在本文件之前按序引入。
 *
 * 初始化顺序（含二期增量模块）：
 * initLang → renderFooter → setupBackground → loadFavorites →
 * loadRecentAirports/Charts → loadFavoriteCharts → initAccent →
 * renderAirportList → setupEventListeners → initControls →
 * setupKeyboardShortcuts → renderMySection → renderDashboard →
 * switchView('browse') → showPDFEmptyState → 其余交互初始化。
 */
function init() {
    // 二期增量：先初始化语言（读 localStorage + 首渲动态区，含页脚/仪表盘）
    initLang();
    renderFooter(); // 维护者 + 数据来源两层页脚（t() 取词）
    setupBackground(); // 极光背景 + reduced-motion 降级

    loadFavorites(); // 先载入机场收藏（填充 state.favorites）

    // 增量：载入最近浏览与单图收藏
    loadRecentAirports();
    loadRecentCharts();
    loadFavoriteCharts();
    initAccent(); // 应用强调色预设（写 data-accent + 持久化）

    renderAirportList(); // 渲染左侧机场列表（含收藏分组）
    setupEventListeners(); // 统一绑定交互（含增量委托）
    initControls(); // 填充国家选项、绑定 country·sort·类型控件、统计
    setupKeyboardShortcuts(); // 键盘快捷键（↑/↓/Enter// · J/K · D · T · ?）

    renderMySection(); // 增量：「我的」聚合区首渲
    renderDashboard(); // 增量：概览仪表盘首渲（并缓存分布 + count-up）
    switchView("browse"); // 增量：默认进入浏览视图（两视图均已渲染）

    showPDFEmptyState(t("empty.init")); // 初始空状态提示（中英切换）

    // 各类交互/视觉效果初始化（逻辑保持不变）
    setupThemeToggle(); // 主题切换（瞬时重绘）
    setupMobileSidebar(); // 移动端侧边栏：点击外部关闭 + 窗口缩放处理
    setupModalLoading(); // 模态框加载状态（error/超时 → showPDFFallback）
    setupFooterInteractions(); // 底部交互效果
    setupLiquidGlassEffect(); // 液态玻璃鼠标追踪效果
}

// 页面加载完成后初始化应用
document.addEventListener("DOMContentLoaded", init);

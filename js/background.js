/**
 * 动态极光背景模块（D-01）
 * ------------------------------------------------------------------
 * 依赖：state.js（reducedMotion）
 *
 * setupBackground() 检测用户 prefers-reduced-motion 偏好，
 * 若开启则在 <html> 写入 data-reduced-motion="1" 属性，
 * 由 style.css 对应规则禁用所有动画（极光漂移 / 入场 / 星标等）。
 * 背景层本身已在 index.html 中作为 .aurora 元素存在，颜色均
 * 走 CSS 变量（--color-primary-500 等），随明暗主题与强调色联动，
 * 无需 JS 额外干预。
 */

/**
 * 初始化极光背景与性能降级。
 * 检测 prefers-reduced-motion：若用户偏好减少动效，
 * 在 documentElement 写 data-reduced-motion="1"，
 * CSS 将禁用全部动画（极光漂移 / fade-in / starPop 等）。
 * 由 main.js init() 在语言之后、其它渲染之前调用。
 */
function setupBackground() {
    // 检测 prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
        document.documentElement.setAttribute("data-reduced-motion", "1");
        reducedMotion = true;
    } else {
        document.documentElement.removeAttribute("data-reduced-motion");
        reducedMotion = false;
    }

    // 监听变化（用户可在系统设置中实时切换）
    mq.addEventListener("change", (e) => {
        if (e.matches) {
            document.documentElement.setAttribute("data-reduced-motion", "1");
            reducedMotion = true;
        } else {
            document.documentElement.removeAttribute("data-reduced-motion");
            reducedMotion = false;
            // 若当前仪表盘已渲染，countUp 会检查 reducedMotion
            // 此处无需额外操作
        }
    });
}

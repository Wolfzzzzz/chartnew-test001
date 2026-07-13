/**
 * 键盘快捷键
 * ------------------------------------------------------------------
 * 在 document 上统一绑定：↑/↓ 在可见 .airport-item 间移动高亮，Enter 打开
 * 当前高亮机场，/ 聚焦搜索。输入框聚焦时除方向键 / 回车外不拦截。
 * 高亮态用 .kb-active（与选定态 .active 区分）。
 */

/**
 * 在 document 上绑定键盘快捷键（仅绑定一次，main.init 调用）。
 * 支持：↑/↓ 或 J/K 导航机场、Enter 打开、/ 聚焦搜索、
 *      D 概览仪表盘、T 切换主题、? 快捷键帮助。
 * 输入框聚焦时除方向键/回车外不拦截（让用户输入正常）。
 */
function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        const target = e.target;
        const tag = (target && target.tagName ? target.tagName : "").toLowerCase();
        const isInput = tag === "input" || tag === "textarea" || (target && target.isContentEditable);

        const items = airportList ? airportList.querySelectorAll(".airport-item") : [];

        // "/" 聚焦搜索（输入框外才拦截，避免破坏输入）
        if (e.key === "/" && !isInput) {
            e.preventDefault();
            if (searchInput) searchInput.focus();
            return;
        }

        // 输入框聚焦时，除方向键 / 回车外不拦截（让用户输入正常）
        if (isInput && e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "Enter") {
            return;
        }

        // 归一化 J/K 为方向键（D-05 导航增强）
        let nav = e.key;
        if (nav === "j" || nav === "J") nav = "ArrowDown";
        else if (nav === "k" || nav === "K") nav = "ArrowUp";

        if (nav === "ArrowDown") {
            if (items.length === 0) return;
            e.preventDefault();
            keyboardIndex = (keyboardIndex + 1) % items.length;
            updateKeyboardSelection();
        } else if (nav === "ArrowUp") {
            if (items.length === 0) return;
            e.preventDefault();
            keyboardIndex = (keyboardIndex - 1 + items.length) % items.length;
            updateKeyboardSelection();
        } else if (e.key === "Enter") {
            if (keyboardIndex >= 0 && keyboardIndex < items.length) {
                e.preventDefault();
                items[keyboardIndex].click(); // 委托给 airportList 的点击事件
            }
        } else if (!isInput && (e.key === "d" || e.key === "D")) {
            // D：进入概览仪表盘
            e.preventDefault();
            if (typeof switchView === "function") switchView("dashboard");
        } else if (!isInput && (e.key === "t" || e.key === "T")) {
            // T：切换主题（复用主题按钮点击）
            e.preventDefault();
            const tt = document.getElementById("themeToggle");
            if (tt) tt.click();
        } else if (!isInput && e.key === "?") {
            // ?：打开快捷键帮助面板（D-05）
            e.preventDefault();
            if (typeof openShortcutHelp === "function") openShortcutHelp();
        }
    });
}

/**
 * 根据 keyboardIndex 高亮对应的 .airport-item 并滚动到可视区域。
 * @param {NodeList} [items] 可选的 .airport-item 集合；缺省则实时查询。
 */
function updateKeyboardSelection(items) {
    const list = items || (airportList ? airportList.querySelectorAll(".airport-item") : []);
    list.forEach((el) => el.classList.remove("kb-active"));
    if (keyboardIndex >= 0 && keyboardIndex < list.length) {
        const el = list[keyboardIndex];
        if (el) {
            el.classList.add("kb-active");
            el.scrollIntoView({ block: "nearest" });
        }
    }
}

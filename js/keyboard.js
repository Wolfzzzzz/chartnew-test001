/**
 * 键盘快捷键
 * ------------------------------------------------------------------
 * 在 document 上统一绑定：↑/↓ 在可见 .airport-item 间移动高亮，Enter 打开
 * 当前高亮机场，/ 聚焦搜索。输入框聚焦时除方向键 / 回车外不拦截。
 * 高亮态用 .kb-active（与选定态 .active 区分）。
 */

/**
 * 在 document 上绑定键盘快捷键（仅绑定一次，main.init 调用）。
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

        if (e.key === "ArrowDown") {
            if (items.length === 0) return;
            e.preventDefault();
            keyboardIndex = (keyboardIndex + 1) % items.length;
            updateKeyboardSelection();
        } else if (e.key === "ArrowUp") {
            if (items.length === 0) return;
            e.preventDefault();
            keyboardIndex = (keyboardIndex - 1 + items.length) % items.length;
            updateKeyboardSelection();
        } else if (e.key === "Enter") {
            if (keyboardIndex >= 0 && keyboardIndex < items.length) {
                e.preventDefault();
                items[keyboardIndex].click(); // 委托给 airportList 的点击事件
            }
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

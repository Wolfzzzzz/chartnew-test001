/**
 * 快捷键帮助面板（D-05）
 * ------------------------------------------------------------------
 * 依赖：state.js（shortcutHelpModal / currentView）、dom.js（shortcutHelpModal）、
 *       i18n.js（t()）
 *
 * 复用 .modal 模式：openShortcutHelp() 填充 #shortcutHelpModal 内容并
 * 添加 .active / 锁定滚动；closeShortcutHelp() 移除 .active / 恢复滚动。
 * 内容由 renderShortcutHelp() 生成静态列表。
 * Esc 关闭由 events.js 中第 15 项（ESC 统一委托）与第 17c 项（点击遮罩/关闭按钮）处理。
 */

/**
 * 渲染快捷键帮助列表 HTML。
 * @returns {string} 面板 HTML 字符串
 */
function renderShortcutHelp() {
    return (
        '<div class="modal-content shortcut-modal-content">' +
            '<div class="modal-header">' +
                '<h3 id="shortcutHelpTitle"><i class="fas fa-keyboard"></i> ' + t("shortcut.title") + '</h3>' +
                '<button class="close-btn" id="shortcutHelpClose" aria-label="' + t("shortcut.esc") + '">' +
                    '<i class="fas fa-times"></i>' +
                '</button>' +
            '</div>' +
            '<div class="shortcut-body">' +
                '<div class="shortcut-list">' +
                    '<div class="shortcut-row">' +
                        '<span class="shortcut-desc">' + t("shortcut.updown") + '</span>' +
                        '<span class="shortcut-key">↑↓ / JK</span>' +
                    '</div>' +
                    '<div class="shortcut-row">' +
                        '<span class="shortcut-desc">' + t("shortcut.search") + '</span>' +
                        '<span class="shortcut-key">/</span>' +
                    '</div>' +
                    '<div class="shortcut-row">' +
                        '<span class="shortcut-desc">' + t("shortcut.dash") + '</span>' +
                        '<span class="shortcut-key">D</span>' +
                    '</div>' +
                    '<div class="shortcut-row">' +
                        '<span class="shortcut-desc">' + t("shortcut.theme") + '</span>' +
                        '<span class="shortcut-key">T</span>' +
                    '</div>' +
                    '<div class="shortcut-row">' +
                        '<span class="shortcut-desc">' + t("shortcut.help") + '</span>' +
                        '<span class="shortcut-key">?</span>' +
                    '</div>' +
                    '<div class="shortcut-row">' +
                        '<span class="shortcut-desc">' + t("shortcut.esc") + '</span>' +
                        '<span class="shortcut-key">Esc</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'
    );
}

/**
 * 打开快捷键帮助面板。
 * 填充内容 → 添加 .active → 锁定页面滚动。
 */
function openShortcutHelp() {
    if (!shortcutHelpModal) return;
    shortcutHelpModal.innerHTML = renderShortcutHelp();
    shortcutHelpModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

/**
 * 关闭快捷键帮助面板。
 * 移除 .active → 恢复页面滚动。
 */
function closeShortcutHelp() {
    if (!shortcutHelpModal) return;
    shortcutHelpModal.classList.remove("active");
    document.body.style.overflow = "";
}

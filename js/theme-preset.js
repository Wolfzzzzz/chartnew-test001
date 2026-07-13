/**
 * 强调色主题预设（粉 / 海洋 / 森林）
 * ------------------------------------------------------------------
 * 纯 CSS 变量驱动：setAccent 仅写 documentElement[data-accent] 与 localStorage，
 * 由 style.css 的 [data-accent] 覆盖块瞬时重着色，无需 JS 重渲。
 */

// localStorage 键名
const ACCENT_KEY = "skychart_accent";
// 可选预设（粉 / 海洋 / 森林 / 日落 / 极光 / 樱花）
const ACCENTS = ["pink", "ocean", "forest", "sunset", "aurora", "sakura"];

/**
 * 初始化强调色：从 localStorage 读取并应用（默认 pink）。
 */
function initAccent() {
    let saved = "pink";
    try {
        saved = localStorage.getItem(ACCENT_KEY) || "pink";
    } catch (err) {
        saved = "pink";
    }
    if (ACCENTS.indexOf(saved) < 0) saved = "pink";
    setAccent(saved, false);
}

/**
 * 设置强调色预设。
 * @param {string} preset 'pink' | 'ocean' | 'forest'
 * @param {boolean} [persist=true] 是否写入 localStorage
 */
function setAccent(preset, persist) {
    if (ACCENTS.indexOf(preset) < 0) preset = "pink";
    accentPreset = preset;
    document.documentElement.setAttribute("data-accent", preset);
    if (persist !== false) {
        try {
            localStorage.setItem(ACCENT_KEY, preset);
        } catch (err) {
            // 忽略写入异常
        }
    }
    // 更新色板选中态
    if (accentPanel) {
        accentPanel.querySelectorAll(".accent-swatch").forEach((s) => {
            s.classList.toggle("active", s.dataset.accent === preset);
        });
    }
}

/** 打开强调色色板弹层。 */
function openPresetPanel() {
    if (accentPanel) accentPanel.classList.add("active");
}

/** 关闭强调色色板弹层。 */
function closePresetPanel() {
    if (accentPanel) accentPanel.classList.remove("active");
}

/* ===== UI 视觉主题切换（三套：modern / cockpit / cyber）=============== */
const UI_THEMES = ['modern', 'cockpit', 'cyber'];

/** 初始化 UI 主题（从 localStorage 读取）。 */
function initUiTheme() {
    let saved = 'modern';
    try { saved = localStorage.getItem(UI_KEY) || 'modern'; } catch (e) { saved = 'modern'; }
    if (UI_THEMES.indexOf(saved) < 0) saved = 'modern';
    setUiTheme(saved, false);
}

/**
 * 设置 UI 视觉主题。
 * @param {string} theme 'modern' | 'cockpit' | 'cyber'
 * @param {boolean} [persist=true]
 */
function setUiTheme(theme, persist) {
    if (UI_THEMES.indexOf(theme) < 0) theme = 'modern';
    uiTheme = theme;
    document.documentElement.setAttribute('data-ui', theme);
    // 更新标签文本
    if (uiThemeLabel) uiThemeLabel.textContent = t('ui.' + theme);
    if (persist !== false) {
        try { localStorage.setItem(UI_KEY, theme); } catch (e) { /* ignore */ }
    }
}

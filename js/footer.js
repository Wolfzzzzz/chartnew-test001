/**
 * 页脚模块（维护者 + 数据来源署名）
 * ------------------------------------------------------------------
 * 依赖：state.js（DATA.meta.edition）、dom.js（footerEl）、i18n.js（t()）
 *
 * 页脚两层信息（E-01 / E-02 / A-02）：
 *   上层（醒目）：维护者 GitHub Wolfzzzzz + 邮箱 zhang429500@icloud.com
 *   下层（次要）：数据来源署名（主源 chart.wuhanqing.cn + JeppView + 版本 + r2 包 +
 *                源站链接 + 原作者联系）
 * 旧"均来源于Jeppesen"的免责声明已重写为客观描述。
 */

/* ---- 常量：页脚链接与邮箱（单一数据源） ---- */
const R2_ZIP = "http://r2.wuhanqing.cn/chart-wuhanqing-cn/202607_Terminal.zip";
const SOURCE_SITE = "https://chart.wuhanqing.cn/";
const MAINTAINER_GITHUB = "https://github.com/Wolfzzzzz";
const MAINTAINER_EMAIL = "zhang429500@icloud.com";

/**
 * 渲染页脚：替换 #footer 内容为两层结构。
 * 维护者层（上/醒目）→ 分隔线 → 数据来源层（下/次要）。
 * 由 main.js init() 调用，语言切换时由 applyLang() 重渲。
 */
function renderFooter() {
    if (!footerEl) return;
    const ed = (DATA.meta && DATA.meta.edition) || "EAIP2026-07.V1.3_Web";

    footerEl.innerHTML =
        // 上层：维护者（醒目）
        '<div class="footer-content">' +
            '<div class="footer-maintainer">' +
                '<span class="footer-label"><i class="fas fa-tools"></i> ' + t("footer.maintainer") + '</span>' +
                '<div class="footer-maintainer-links">' +
                    '<a class="footer-link footer-link--accent" href="' + MAINTAINER_GITHUB + '" target="_blank" rel="noopener">' +
                        '<i class="fab fa-github"></i> Wolfzzzzz' +
                    '</a>' +
                    '<a class="footer-link" href="mailto:' + MAINTAINER_EMAIL + '">' +
                        '<i class="fas fa-envelope"></i> ' + MAINTAINER_EMAIL +
                    '</a>' +
                '</div>' +
            '</div>' +
            // 分隔线
            '<div class="footer-divider"></div>' +
            // 下层：数据来源（次要）
            '<div class="footer-source">' +
                '<div class="footer-source-text">' +
                    '<span>' + t("footer.source") + '：</span>' +
                    '<a class="footer-link" href="' + SOURCE_SITE + '" target="_blank" rel="noopener">chart.wuhanqing.cn</a>' +
                    '<span class="footer-dot">·</span>' +
                    '<span>' + t("footer.sourceMain") + '</span>' +
                '</div>' +
                '<div class="footer-source-text">' +
                    '<span>' + t("footer.edition") + '：' + escapeHtml(ed) + '</span>' +
                    '<span class="footer-dot">·</span>' +
                    '<span>' + t("footer.sourceJepp") + '</span>' +
                '</div>' +
                '<div class="footer-source-actions">' +
                    '<a class="footer-link" href="' + R2_ZIP + '" target="_blank" rel="noopener">' +
                        '<i class="fas fa-download"></i> ' + t("footer.downloadAll") +
                    '</a>' +
                    '<a class="footer-link" href="' + SOURCE_SITE + '" target="_blank" rel="noopener">' +
                        '<i class="fas fa-external-link-alt"></i> ' + t("footer.visitSource") +
                    '</a>' +
                '</div>' +
                '<div class="footer-original">' +
                    '<span class="footer-original-label"><i class="fas fa-user-pen"></i></span> ' +
                    t("footer.originalContact") +
                '</div>' +
            '</div>' +
        '</div>';
}

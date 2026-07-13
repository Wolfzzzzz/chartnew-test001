/**
 * 事件绑定与交互初始化
 * ------------------------------------------------------------------
 * 统一负责所有交互事件的绑定与各类交互效果初始化。
 * 侧边栏开关（mobileToggle / sidebarToggle）仅在此处绑定一次。
 *
 * 列表变化一律经由状态 + applyFilters() 单一管线，不在事件里直接显隐 DOM。
 * 所有新增交互（概览入口 / 仪表盘条形·扇区 / 信息按钮 / 单图星标 / 我的区
 * 项·移除·清空 / 强调色色板 / 抽屉）均在 setupEventListeners() 内用事件委托绑定。
 */

/**
 * 统一绑定所有交互事件。
 */
function setupEventListeners() {
    // 1. 侧边栏开关按钮（常驻，折叠态仍可见）
    sidebarToggle.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("active");
            document.body.style.overflow = "";
        } else {
            const collapsed = sidebar.classList.toggle("collapsed");
            const icon = sidebarToggle.querySelector("i");
            if (icon) icon.className = collapsed ? "fas fa-bars" : "fas fa-times";
        }
    });
    // 初始化图标以反映当前折叠态（展开显示 times，折叠显示 bars）
    const initToggleIcon = sidebarToggle.querySelector("i");
    if (initToggleIcon) {
        initToggleIcon.className = sidebar.classList.contains("collapsed")
            ? "fas fa-bars"
            : "fas fa-times";
    }

    // 2. 移动端侧边栏开关按钮：打开侧边栏并锁定滚动
    mobileToggle.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });

    // 3. 搜索（实时写入 filterState.search 后经 applyFilters 重渲染）
    searchInput.addEventListener("input", (e) => {
        filterState.search = e.target.value.toLowerCase().trim();
        applyFilters();
    });

    // 4. 视图切换按钮（卡片 / 列表视图）
    viewButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            viewButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            if (btn.dataset.view === "list") {
                pdfContainer.classList.add("list-view");
            } else {
                pdfContainer.classList.remove("list-view");
            }
        });
    });

    // 5. 关闭 PDF 模态框按钮
    closeModal.addEventListener("click", closePDFViewer);

    // 6. 点击模态框外部关闭
    pdfModal.addEventListener("click", (e) => {
        if (e.target === pdfModal) closePDFViewer();
    });

    // 7. 按 ESC 键关闭 PDF 模态框
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && pdfModal.classList.contains("active")) {
            closePDFViewer();
        }
    });

    // 8. 机场列表点击（事件委托）：信息按钮 / 收藏星标 / 选中机场并加载其航图
    airportList.addEventListener("click", (e) => {
        // 8a. 信息按钮：打开详情抽屉，不触发加载
        const infoBtn = e.target.closest(".info-btn");
        if (infoBtn) {
            e.stopPropagation();
            openAirportDrawer(infoBtn.dataset.code);
            return;
        }

        // 8b. 收藏星标按钮：切换收藏并重渲（重渲反映收藏态与收藏分组）
        const favBtn = e.target.closest(".fav-btn");
        if (favBtn) {
            e.stopPropagation();
            const code = favBtn.dataset.code;
            toggleFavorite(code);
            applyFilters(); // 由重渲染反映收藏态
            return;
        }

        // 8c. 选中机场
        const item = e.target.closest(".airport-item");
        if (!item) return;

        // 更新选中态
        document.querySelectorAll(".airport-item").forEach((el) => el.classList.remove("active"));
        item.classList.add("active");

        const airportCode = item.dataset.code;
        selectedAirport = airportCode;

        const airport = findAirportByCode(airportCode);
        if (airport) {
            currentAirport.textContent = `${airport.name} (${airportCode})`;
            pdfSectionTitle.textContent = `${airport.name} 航图文件`;
            loadAirportCharts(airportCode);
        }

        // 移动端：点击后自动关闭侧边栏
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // 9. 航图卡片点击（事件委托）：单图星标 / 单图下载 / 打开 PDF 预览
    pdfContainer.addEventListener("click", (e) => {
        // 9a. 单图收藏星标：切换收藏并仅重渲当前机场卡片 + 「我的」区
        const favBtn = e.target.closest(".chart-fav-btn");
        if (favBtn) {
            e.stopPropagation();
            const code = favBtn.dataset.code;
            const filename = favBtn.dataset.filename;
            toggleFavoriteChart(code, filename);
            if (selectedAirport && DATA.charts[selectedAirport]) {
                renderPDFFiles(DATA.charts[selectedAirport], selectedAirport);
            }
            renderMySection();
            return;
        }

        // 9b. 单图下载（C-01）：优先 <a download>，跨域退化为新标签（委托到 downloads.js）
        const dlBtn = e.target.closest(".chart-download-btn");
        if (dlBtn) {
            e.stopPropagation();
            downloadChart(dlBtn.dataset.code, dlBtn.dataset.filename);
            return;
        }

        // 9c. 打开 PDF 预览
        const card = e.target.closest(".pdf-card");
        if (!card) return;
        openPDFViewer(card.dataset.airport, card.dataset.filename);
    });

    // 10. 概览入口（侧栏）：已是仪表盘则切回浏览，否则进入仪表盘（toggle）
    //     修复 Bug1：使侧栏「概览」按钮可进可出，不再“只能进不能出”。
    if (overviewNav) {
        overviewNav.addEventListener("click", () => {
            if (currentView === "dashboard") {
                switchView("browse");
            } else {
                switchView("dashboard");
            }
        });
    }

    // 11. 仪表盘内委托：返回按钮 / 国家条形 → 筛选；类型扇区 → 筛选
    if (dashboardView) {
        dashboardView.addEventListener("click", (e) => {
            // 11a. 「浏览机场」返回按钮：显式切回浏览视图（修复 Bug1，不依赖侧栏）
            const exitBtn = e.target.closest('[data-action="exit-dashboard"]');
            if (exitBtn) {
                switchView("browse");
                return;
            }
            const bar = e.target.closest(".dist-country-bar");
            if (bar) {
                const country = bar.dataset.country;
                if (country) handleDashboardCountryClick(country);
                return;
            }
            const sector = e.target.closest(".donut-sector");
            if (sector) {
                handleDashboardTypeClick(sector.dataset.type);
                return;
            }
        });
    }

    // 12. 「我的」区委托：折叠 / 清空 / 移除 / 点击项
    if (mySection) {
        mySection.addEventListener("click", (e) => {
            // 折叠 / 展开
            if (e.target.closest(".my-section-toggle")) {
                mySectionCollapsed = !mySectionCollapsed;
                mySection.classList.toggle("collapsed", mySectionCollapsed);
                return;
            }
            // 清空最近
            if (e.target.closest(".clear-recents-btn")) {
                clearRecents();
                return;
            }
            // 移除最近机场
            const remAir = e.target.closest(".remove-recent-airport");
            if (remAir) {
                removeRecentAirport(remAir.dataset.code);
                return;
            }
            // 移除最近航图
            const remChart = e.target.closest(".remove-recent-chart");
            if (remChart) {
                removeRecentChart(remChart.dataset.key);
                return;
            }
            // 取消收藏航图
            const unfav = e.target.closest(".unfav-chart");
            if (unfav) {
                toggleFavoriteChart(unfav.dataset.code, unfav.dataset.filename);
                return;
            }
            // 点击最近机场 → 加载其航图（更新选中态，与机场列表行为一致）
            const airItem = e.target.closest(".my-recent-airport");
            if (airItem) {
                const code = airItem.dataset.code;
                const ap = findAirportByCode(code);
                if (ap) {
                    selectedAirport = code;
                    currentAirport.textContent = `${ap.name} (${ap.code})`;
                    pdfSectionTitle.textContent = `${ap.name} 航图文件`;
                }
                loadAirportCharts(code);
                return;
            }
            // 点击最近/收藏航图 → 打开预览
            const chartItem = e.target.closest(".my-chart-item");
            if (chartItem) {
                openPDFViewer(chartItem.dataset.code, chartItem.dataset.filename);
                return;
            }
        });
    }

    // 13. 机场详情抽屉委托：关闭 / 查看航图 / 收藏
    if (airportDrawer) {
        airportDrawer.addEventListener("click", (e) => {
            // 关闭（overlay 或 关闭按钮）
            if (e.target.closest(".drawer-overlay") || e.target.closest(".drawer-close")) {
                closeAirportDrawer();
                return;
            }
            // 查看航图：关闭抽屉并加载该机场（更新选中态，保证类型筛选一致）
            const viewBtn = e.target.closest("#drawerViewCharts");
            if (viewBtn) {
                const code = viewBtn.dataset.code;
                closeAirportDrawer();
                const ap = findAirportByCode(code);
                if (ap) {
                    selectedAirport = code;
                    currentAirport.textContent = `${ap.name} (${ap.code})`;
                    pdfSectionTitle.textContent = `${ap.name} 航图文件`;
                    loadAirportCharts(code);
                }
                return;
            }
            // 收藏（机场级 toggle）
            const favBtn = e.target.closest("#drawerFavBtn");
            if (favBtn) {
                const code = favBtn.dataset.code;
                toggleFavorite(code);
                const active = isFavorite(code);
                favBtn.classList.toggle("active", active);
                const icon = favBtn.querySelector("i");
                if (icon) icon.className = active ? "fas fa-star" : "far fa-star";
                applyFilters(); // 同步列表收藏态
                return;
            }
        });
    }

    // 14. 强调色：唤起 / 选择 / 点击外部关闭
    if (accentToggle) {
        accentToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            if (accentPanel.classList.contains("active")) closePresetPanel();
            else openPresetPanel();
        });
    }
    if (accentPanel) {
        accentPanel.addEventListener("click", (e) => {
            const swatch = e.target.closest(".accent-swatch");
            if (swatch) setAccent(swatch.dataset.accent);
        });
        // 点击色板与外部之外的区域关闭
        document.addEventListener("click", (e) => {
            if (
                accentPanel.classList.contains("active") &&
                !accentPanel.contains(e.target) &&
                !accentToggle.contains(e.target)
            ) {
                closePresetPanel();
            }
        });
    }

    // 15. ESC 关闭（快捷键面板 / 强调色色板 / 机场详情抽屉，优先于 PDF 模态）
    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        if (pdfModal.classList.contains("active")) return; // 已由第 7 项处理
        if (shortcutHelpModal && shortcutHelpModal.classList.contains("active")) {
            closeShortcutHelp();
            return;
        }
        if (accentPanel && accentPanel.classList.contains("active")) {
            closePresetPanel();
            return;
        }
        if (airportDrawer && airportDrawer.classList.contains("active")) {
            closeAirportDrawer();
            return;
        }
    });

    // 16. 语言切换（B-02）：🌐 按钮，zh<->en 切换并即时重渲（不刷新）
    if (langToggle) {
        langToggle.addEventListener("click", () => {
            lang = (lang === "zh") ? "en" : "zh";
            try { localStorage.setItem(LANG_KEY, lang); } catch (err) {}
            applyLang();
        });
    }

    // 17. UI 视觉主题切换：循环 modern → cockpit → cyber → modern
    if (uiToggle) {
        uiToggle.addEventListener("click", () => {
            const idx = UI_THEMES.indexOf(uiTheme);
            const next = UI_THEMES[(idx + 1) % UI_THEMES.length];
            setUiTheme(next, true);
        });
    }

    // 17. 全局委托：批量下载 / 随机发现 / 快捷键面板关闭（C-02 / D-06 / D-05）
    document.addEventListener("click", (e) => {
        // 17a. 批量下载本机场全部（section-header 或 抽屉 内按钮）
        const batchBtn = e.target.closest(".batch-download-btn");
        if (batchBtn) {
            const code = batchBtn.dataset.code;
            if (code) downloadAllForAirport(code);
            return;
        }
        // 17b. 随机发现（🎲）
        const rnd = e.target.closest(".random-btn");
        if (rnd) {
            randomChart();
            return;
        }
        // 17c. 快捷键帮助面板关闭（关闭按钮 或 点击遮罩）
        if (shortcutHelpModal && shortcutHelpModal.classList.contains("active")) {
            if (e.target.closest("#shortcutHelpClose") || e.target === shortcutHelpModal) {
                closeShortcutHelp();
                return;
            }
        }
    });
}

/**
 * 主题切换功能（瞬时同步重绘，无过渡、无半黑半白）。
 */
const setupThemeToggle = () => {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const html = document.documentElement;

    // 初始化主题
    const savedTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    html.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    // 绑定切换事件：仅修改 data-theme + 持久化 + 图标，由 CSS 瞬时重绘
    themeToggle.addEventListener("click", () => {
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme); // 单次同步重绘：瞬时、整体、无半黑半白
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });

    // 更新主题图标
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector("i");
        if (icon) {
            icon.className = theme === "light" ? "fas fa-sun" : "fas fa-moon";
            themeToggle.setAttribute(
                "aria-label",
                theme === "light" ? "切换至深色主题" : "切换至浅色主题"
            );
        }
    }
};

/**
 * 移动端侧边栏处理：仅保留“点击外部关闭”与“窗口缩放”逻辑。
 * 开关/关闭按钮的监听已并入 setupEventListeners，避免重复绑定。
 */
const setupMobileSidebar = () => {
    if (!sidebar || !mobileToggle) return;

    const closeSidebar = () => {
        sidebar.classList.remove("active");
        document.body.style.overflow = "";
    };

    // 点击侧边栏/按钮以外区域时关闭（移动端）
    document.addEventListener("click", (e) => {
        if (
            window.innerWidth <= 768 &&
            !sidebar.contains(e.target) &&
            !mobileToggle.contains(e.target) &&
            sidebar.classList.contains("active")
        ) {
            closeSidebar();
        }
    });

    // 窗口放大到桌面尺寸时强制关闭移动端侧边栏
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });
};

/**
 * 液态玻璃效果实现（保持原逻辑不变）。
 */
const setupLiquidGlassEffect = () => {
    const glassElements = document.querySelectorAll(
        ".search-box input, .theme-toggle, .accent-toggle, .lang-toggle, .random-btn, " +
        ".mobile-toggle, .view-btn, .airport-item, .pdf-card, .batch-download-btn, .chart-download-btn"
    );

    glassElements.forEach((element) => {
        element.addEventListener("mousemove", (e) => {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            element.style.setProperty("--mouse-x", `${x}%`);
            element.style.setProperty("--mouse-y", `${y}%`);
        });

        element.addEventListener("mouseleave", () => {
            element.style.removeProperty("--mouse-x");
            element.style.removeProperty("--mouse-y");
        });
    });
};

/**
 * 底部联系信息交互效果（保持原逻辑不变）。
 */
const setupFooterInteractions = () => {
    const contactItems = document.querySelectorAll(".contact-item");

    contactItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            if (e.target.tagName === "A") return; // 点击邮箱链接不触发动画

            item.style.transform = "scale(0.98)";
            setTimeout(() => {
                item.style.transform = "";
            }, 150);
        });
    });
};

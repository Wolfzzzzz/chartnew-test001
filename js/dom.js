/**
 * 全部 DOM 元素引用
 * ------------------------------------------------------------------
 * 集中声明页面元素，避免在多个文件中散落 document.querySelector。
 * 本文件只负责引用，不做任何逻辑处理。
 */

const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const mobileToggle = document.getElementById("mobileToggle");
const searchInput = document.getElementById("searchInput");
const airportList = document.getElementById("airportList");
const pdfContainer = document.getElementById("pdfContainer");
const currentAirport = document.getElementById("currentAirport");
const pdfSectionTitle = document.getElementById("pdfSectionTitle");
const pdfModal = document.getElementById("pdfModal");
const pdfModalTitle = document.getElementById("pdfModalTitle");
const pdfViewer = document.getElementById("pdfViewer");
const openPdfTab = document.getElementById("openPdfTab");
const downloadPdf = document.getElementById("downloadPdf");
const closeModal = document.getElementById("closeModal");
const viewButtons = document.querySelectorAll(".view-btn");
const modalLoading = document.querySelector(".modal-loading");

// 控制栏（T4/T5/T7/T8）：国家筛选、排序、统计、航图类型筛选
const countryFilter = document.getElementById("countryFilter");
const sortSelect = document.getElementById("sortSelect");
const sidebarStats = document.getElementById("sidebarStats");
const chartTypeFilterEl = document.getElementById("chartTypeFilter");

// 「我的」聚合区（侧边栏）与概览仪表盘（主内容）
const mySection = document.getElementById("mySection");
const mySectionBody = document.getElementById("mySectionBody");
const dashboardView = document.getElementById("dashboardView");
const browseView = document.getElementById("browseView");
const overviewNav = document.getElementById("overviewNav");

// 强调色色板（header）
const accentToggle = document.getElementById("accentToggle");
const accentPanel = document.getElementById("accentPanel");

// 机场详情抽屉（.modal 模式）
const airportDrawer = document.getElementById("airportDrawer");
const drawerTitle = document.getElementById("drawerTitle");
const drawerClose = document.getElementById("drawerClose");
const drawerCode = document.getElementById("drawerCode");
const drawerName = document.getElementById("drawerName");
const drawerCountry = document.getElementById("drawerCountry");
const drawerChartCount = document.getElementById("drawerChartCount");
const drawerGroup = document.getElementById("drawerGroup");
const drawerGroupDesc = document.getElementById("drawerGroupDesc");
const drawerViewCharts = document.getElementById("drawerViewCharts");
const drawerFavBtn = document.getElementById("drawerFavBtn");
const drawerOverlay = document.getElementById("drawerOverlay");
const drawerBatchDownload = document.getElementById("drawerBatchDownload");

// 语言切换按钮（header，B-02）
const langToggle = document.getElementById("langToggle");

// 页脚挂载点（footer.js 注入两层信息，A-02/E-01/E-02）
const footerEl = document.getElementById("footer");

// 快捷键帮助面板（shortcuts.js，D-05）
const shortcutHelpModal = document.getElementById("shortcutHelpModal");

// 随机发现按钮（header / dashboard，D-06）
const randomBtn = document.getElementById("randomBtn");

// 航图列表区「批量下载本机场全部」按钮（charts.js 写入 data-code，C-02）
const batchDownloadBtn = document.getElementById("batchDownloadBtn");

// 极光背景层（background.js 可选控制，D-01）
const auroraLayer = document.getElementById("auroraLayer");

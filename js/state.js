/**
 * 全局状态与数据来源
 * ------------------------------------------------------------------
 * 本文件只声明全局数据与可变状态，供其它脚本在经典 <script> 的
 * 共享全局词法作用域中直接引用（不重复声明同名变量）。
 */

// 数据来源：机场 / 航图数据由 charts-data.js 注入到 window.SKYCHART_DATA。
// 兜底：若 charts-data.js 未加载或加载失败，给出空数据，避免页面报错。
const DATA = window.SKYCHART_DATA || { airports: [], charts: {} };

// 当前选中的机场代码（点击机场列表时更新）
let selectedAirport = null;

// 弹窗加载安全超时句柄，用于在 load/error 触发时清除，避免永久转圈
let modalLoadTimer = null;

// 筛选 / 排序状态（控制栏驱动，单一数据源）
// 所有列表变化只改这里后调 applyFilters()，绝不在事件里直接显隐 DOM
const filterState = {
    search: '',   // 搜索关键字（小写，实时）
    country: 'all', // 'all' | 国家英文名
    sort: 'default' // 'default'(按 group 首字母分组) | 'code' | 'name'
};

// 航图类型筛选（主区 PDF 区域）
let chartTypeFilter = 'all'; // 'all'|'approach'|'departure'|'arrival'|'taxiway'|'airport'|'other'

// 收藏（localStorage 持久化，运行时缓存，由 loadFavorites() 初始化）
let favorites = []; // ['ZSPD','RJTT', ...]

// 键盘导航：当前高亮项在“可见列表”中的下标（-1 表示无高亮）
let keyboardIndex = -1;

// 当前主内容视图：'dashboard' | 'browse'
let currentView = 'browse';

// 最近浏览机场（ICAO 代码，最多 8，unshift 去重）
let recentAirports = [];

// 最近浏览航图（复合键 code::filename，最多 12，unshift 去重）
let recentCharts = [];

// 收藏航图（复合键 code::filename）
let favoriteCharts = [];

// 强调色预设：'pink' | 'ocean' | 'forest' | 'sunset' | 'aurora' | 'sakura'
let accentPreset = 'pink';

// 语言：'zh' | 'en'，localStorage 持久化（键 LANG_KEY，见 i18n.js 使用）
let lang = 'zh';
const LANG_KEY = 'skychart_lang';

// 是否降级动画（由 setupBackground 写入，prefers-reduced-motion 时为 true）
let reducedMotion = false;

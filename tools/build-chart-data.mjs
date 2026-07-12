/**
 * build-chart-data.mjs
 * ---------------------------------------------------------------------------
 * 扫描 assets/ 与 航图/ 两个目录，生成 charts-data.js。
 * 生成的文件通过 window.SKYCHART_DATA 暴露数据，避免 fetch/CORS，
 * 在 file:// 与 http 协议下均可直接使用。
 *
 * 用法：node tools/build-chart-data.mjs
 * 需要：Node 22+
 * ---------------------------------------------------------------------------
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 当前脚本所在目录（项目根目录）
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// 两个数据源的根目录
const ASSETS_DIR = path.join(PROJECT_ROOT, 'assets');
const CHARTS_DIR = path.join(PROJECT_ROOT, '航图');

/**
 * 机场名称/国家字典
 * 直接复用原 script.js 中 airports 对象的内容（code → { name, country }）。
 * 用于给已知机场补充漂亮的中文名/国家；未知机场则回退到文件夹名/空字符串。
 */
const AIRPORT_DICT = {
    // A 组
    'KLAX': { name: '洛杉矶国际机场', country: '美国' },
    'KJFK': { name: '纽约肯尼迪国际机场', country: '美国' },
    'KSFO': { name: '旧金山国际机场', country: '美国' },
    'KORD': { name: '芝加哥奥黑尔国际机场', country: '美国' },
    'KDFW': { name: '达拉斯沃斯堡国际机场', country: '美国' },
    // B 组
    'EGLL': { name: '伦敦希思罗机场', country: '英国' },
    'EHAM': { name: '阿姆斯特丹史基浦机场', country: '荷兰' },
    'EDDF': { name: '法兰克福机场', country: '德国' },
    'LFPG': { name: '巴黎戴高乐机场', country: '法国' },
    'LEMD': { name: '马德里巴拉哈斯机场', country: '西班牙' },
    // C 组
    'YSSY': { name: '悉尼金斯福德史密斯机场', country: '澳大利亚' },
    'YMML': { name: '墨尔本机场', country: '澳大利亚' },
    'NZAA': { name: '奥克兰国际机场', country: '新西兰' },
    'NZWN': { name: '惠灵顿国际机场', country: '新西兰' },
    // D 组
    'VIDP': { name: '英迪拉·甘地国际机场', country: '印度' },
    'VABB': { name: '贾特拉帕蒂·希瓦吉国际机场', country: '印度' },
    'VHHH': { name: '香港国际机场', country: '中国香港' },
    'RCTP': { name: '台湾桃园国际机场', country: '中国台湾' },
    // E 组
    'OMDB': { name: '迪拜国际机场', country: '阿联酋' },
    'OTBD': { name: '多哈国际机场', country: '卡塔尔' },
    'OEDF': { name: '法赫德国王国际机场', country: '沙特阿拉伯' },
    // F 组
    'ZSPD': { name: '上海浦东国际机场', country: '中国' },
    'ZGSZ': { name: '深圳宝安国际机场', country: '中国' },
    'ZBAA': { name: '北京首都国际机场', country: '中国' },
    'ZPPP': { name: '昆明长水国际机场', country: '中国' },
    // G 组
    'RJAA': { name: '东京成田国际机场', country: '日本' },
    'RJTT': { name: '东京羽田国际机场', country: '日本' },
    'RJBB': { name: '关西国际机场', country: '日本' },
    'RKSI': { name: '仁川国际机场', country: '韩国' },
    // H 组
    'WSSS': { name: '新加坡樟宜机场', country: '新加坡' },
    'WMKK': { name: '吉隆坡国际机场', country: '马来西亚' },
    'VTBS': { name: '曼谷素万那普机场', country: '泰国' },
    'VTSB': { name: '苏梅岛机场', country: '泰国' },
    // I 组
    'SBGR': { name: '圣保罗国际机场', country: '巴西' },
    'SBGL': { name: '里约热内卢国际机场', country: '巴西' },
    'SBRJ': { name: '里约热内卢桑托斯杜蒙特机场', country: '巴西' },
    'SBCF': { name: '贝洛奥里藏特国际机场', country: '巴西' },
    // J 组
    'SAEZ': { name: '埃塞萨皮斯塔里尼部长国际机场', country: '阿根廷' },
    'SABE': { name: '豪尔赫纽伯里机场', country: '阿根廷' },
    'SCEL': { name: '阿图罗梅里诺-贝尼特斯国际机场', country: '智利' },
    'SEQM': { name: '苏克雷元帅国际机场', country: '厄瓜多尔' },
    // K 组
    'MMMX': { name: '墨西哥城国际机场', country: '墨西哥' },
    'MMUN': { name: '坎昆国际机场', country: '墨西哥' },
    'MMGL': { name: '瓜达拉哈拉国际机场', country: '墨西哥' },
    // L 组
    'MDSD': { name: '美洲国际机场', country: '多米尼加' },
    'MDPC': { name: '蓬塔卡纳国际机场', country: '多米尼加' },
    'MKJP': { name: '诺曼曼利国际机场', country: '牙买加' },
    // M 组
    'TNCM': { name: '茱莉安娜公主国际机场', country: '圣马丁' },
    'TBPB': { name: '格兰特利·亚当斯国际机场', country: '巴巴多斯' },
    'TFFR': { name: '皮特尔角城机场', country: '瓜德罗普' },
    // N 组
    'PHNL': { name: '檀香山国际机场', country: '美国' },
    'PGUM': { name: '关岛国际机场', country: '美国' },
    'PANC': { name: '泰德·史蒂文斯安克雷奇国际机场', country: '美国' },
    // O 组
    'BIKF': { name: '凯夫拉维克国际机场', country: '冰岛' },
    'BGSF': { name: '康克鲁斯瓦格机场', country: '格陵兰' },
    'BGKK': { name: '库卢苏克机场', country: '格陵兰' },
    // P 组
    'ENGM': { name: '奥斯陆加勒穆恩机场', country: '挪威' },
    'ENBR': { name: '卑尔根机场', country: '挪威' },
    'EFHK': { name: '赫尔辛基万塔机场', country: '芬兰' },
    // Q 组
    'ULLI': { name: '圣彼得堡普尔科沃机场', country: '俄罗斯' },
    'UUEE': { name: '莫斯科谢列梅捷沃国际机场', country: '俄罗斯' },
    'UUDD': { name: '莫斯科多莫杰多沃机场', country: '俄罗斯' },
    // R 组
    'LIRF': { name: '罗马菲乌米奇诺机场', country: '意大利' },
    'LIMC': { name: '米兰马尔彭萨机场', country: '意大利' },
    'LIBD': { name: '巴里机场', country: '意大利' },
    // S 组
    'LSZH': { name: '苏黎世机场', country: '瑞士' },
    'LSGG': { name: '日内瓦国际机场', country: '瑞士' },
    'LOWW': { name: '维也纳国际机场', country: '奥地利' },
    // T 组
    'LTBA': { name: '伊斯坦布尔机场', country: '土耳其' },
    'LTAI': { name: '安塔利亚机场', country: '土耳其' },
    'LCLK': { name: '拉纳卡国际机场', country: '塞浦路斯' },
    // U 组
    'HECA': { name: '开罗国际机场', country: '埃及' },
    'HLLT': { name: '的黎波里国际机场', country: '利比亚' },
    'HAAA': { name: '亚的斯亚贝巴博莱国际机场', country: '埃塞俄比亚' },
    // V 组
    'VECC': { name: '加尔各答机场', country: '印度' },
    'VOCB': { name: '科钦国际机场', country: '印度' },
    'VOBL': { name: '班加罗尔国际机场', country: '印度' },
    // W 组
    'WMAP': { name: '槟城国际机场', country: '马来西亚' },
    'WIPP': { name: '巴淡岛杭纳迪姆机场', country: '印度尼西亚' },
    'WIDD': { name: '巴淡岛机场', country: '印度尼西亚' },
    // X 组
    'ZLXY': { name: '西安咸阳国际机场', country: '中国' },
    'ZYTX': { name: '沈阳桃仙国际机场', country: '中国' },
    'ZYTL': { name: '大连周水子国际机场', country: '中国' },
    // Y 组
    'RKSS': { name: '首尔金浦国际机场', country: '韩国' },
    'RKPC': { name: '济州国际机场', country: '韩国' }
};

/**
 * ICAO 代码 → 国家（英文名）映射
 * ---------------------------------------------------------------------------
 * 覆盖扫描出来的全部 233 个 ICAO 代码（B1 需求：全部非空）。
 * 精确映射优先于此表；冷门码缺失时由 regionPrefixCountry 兜底，确保无空值。
 * 取值采用英文国家名（与界面语言无关、便于排序与筛选），例如：
 *   KJFK → United States, RJAA → Japan, ZBAA → China,
 *   EDDF → Germany, OMDB → United Arab Emirates, EGLL → United Kingdom。
 */
const ICAO_TO_COUNTRY = {
    // E 组：欧洲（本数据集仅德国 / 英国）
    'EDDF': 'Germany',
    'EGLL': 'United Kingdom',

    // K 组：美国（本数据集仅 3 个美国机场）
    'KJFK': 'United States',
    'KLAX': 'United States',
    'KSFO': 'United States',

    // O 组：中东
    'OMDB': 'United Arab Emirates',

    // R 组：日本 / 韩国（RJ、RO 为日本；RK 为韩国）
    'RJAA': 'Japan', 'RJAF': 'Japan', 'RJAH': 'Japan', 'RJAN': 'Japan', 'RJAW': 'Japan',
    'RJAZ': 'Japan', 'RJBB': 'Japan', 'RJBD': 'Japan', 'RJBE': 'Japan', 'RJBK': 'Japan', 'RJBT': 'Japan',
    'RJCB': 'Japan', 'RJCC': 'Japan', 'RJCH': 'Japan', 'RJCJ': 'Japan', 'RJCK': 'Japan',
    'RJCM': 'Japan', 'RJCN': 'Japan', 'RJCO': 'Japan', 'RJCR': 'Japan', 'RJCT': 'Japan',
    'RJCW': 'Japan', 'RJDA': 'Japan', 'RJDB': 'Japan', 'RJDC': 'Japan', 'RJDK': 'Japan',
    'RJDM': 'Japan', 'RJDO': 'Japan', 'RJDT': 'Japan', 'RJDU': 'Japan', 'RJEB': 'Japan',
    'RJEC': 'Japan', 'RJEO': 'Japan', 'RJER': 'Japan', 'RJFA': 'Japan', 'RJFC': 'Japan',
    'RJFE': 'Japan', 'RJFF': 'Japan', 'RJFG': 'Japan', 'RJFK': 'Japan', 'RJFM': 'Japan',
    'RJFN': 'Japan', 'RJFO': 'Japan', 'RJFR': 'Japan', 'RJFS': 'Japan', 'RJFT': 'Japan',
    'RJFU': 'Japan', 'RJFY': 'Japan', 'RJFZ': 'Japan', 'RJGG': 'Japan', 'RJKA': 'Japan',
    'RJKB': 'Japan', 'RJKI': 'Japan', 'RJKN': 'Japan', 'RJNA': 'Japan', 'RJNF': 'Japan',
    'RJNG': 'Japan', 'RJNH': 'Japan', 'RJNK': 'Japan', 'RJNO': 'Japan', 'RJNS': 'Japan',
    'RJNT': 'Japan', 'RJNW': 'Japan', 'RJNY': 'Japan', 'RJOA': 'Japan', 'RJOB': 'Japan',
    'RJOC': 'Japan', 'RJOE': 'Japan', 'RJOF': 'Japan', 'RJOH': 'Japan', 'RJOI': 'Japan',
    'RJOK': 'Japan', 'RJOM': 'Japan', 'RJOO': 'Japan', 'RJOR': 'Japan', 'RJOS': 'Japan',
    'RJOT': 'Japan', 'RJOW': 'Japan', 'RJOY': 'Japan', 'RJOZ': 'Japan', 'RJSA': 'Japan',
    'RJSC': 'Japan', 'RJSD': 'Japan', 'RJSF': 'Japan', 'RJSH': 'Japan', 'RJSI': 'Japan',
    'RJSK': 'Japan', 'RJSM': 'Japan', 'RJSN': 'Japan', 'RJSO': 'Japan', 'RJSR': 'Japan',
    'RJSS': 'Japan', 'RJST': 'Japan', 'RJSY': 'Japan', 'RJTA': 'Japan', 'RJTT': 'Japan', 'RJTC': 'Japan',
    'RJTE': 'Japan', 'RJTF': 'Japan', 'RJTH': 'Japan', 'RJTJ': 'Japan', 'RJTK': 'Japan',
    'RJTL': 'Japan', 'RJTO': 'Japan', 'RJTQ': 'Japan', 'RJTU': 'Japan', 'RJTY': 'Japan',
    'RKJB': 'South Korea', 'RKJJ': 'South Korea', 'RKJK': 'South Korea', 'RKJY': 'South Korea',
    'RKNW': 'South Korea', 'RKNY': 'South Korea', 'RKPC': 'South Korea', 'RKPD': 'South Korea',
    'RKPK': 'South Korea', 'RKPS': 'South Korea', 'RKPU': 'South Korea', 'RKSI': 'South Korea',
    'RKSM': 'South Korea', 'RKSS': 'South Korea', 'RKTH': 'South Korea', 'RKTL': 'South Korea',
    'RKTN': 'South Korea', 'RKTU': 'South Korea',
    'ROAH': 'Japan', 'RODN': 'Japan', 'ROIG': 'Japan', 'ROKJ': 'Japan', 'ROKR': 'Japan',
    'ROMD': 'Japan', 'ROMY': 'Japan', 'RORA': 'Japan', 'RORE': 'Japan', 'RORH': 'Japan',
    'RORK': 'Japan', 'RORS': 'Japan', 'RORT': 'Japan', 'RORY': 'Japan', 'ROTM': 'Japan',
    'ROYN': 'Japan',

    // V 组：中国港澳
    'VHHH': 'Hong Kong',
    'VMMC': 'Macau',

    // W 组：东南亚
    'WSSS': 'Singapore',

    // Z 组：中国（全部 83 个 Z 代码均属中国）
    'ZBAA': 'China', 'ZBAD': 'China', 'ZBDS': 'China', 'ZBDT': 'China', 'ZBER': 'China',
    'ZBHH': 'China', 'ZBLA': 'China', 'ZBMZ': 'China', 'ZBOW': 'China', 'ZBSJ': 'China',
    'ZBTJ': 'China', 'ZBYC': 'China', 'ZBYN': 'China', 'ZGDY': 'China', 'ZGGG': 'China',
    'ZGHA': 'China', 'ZGKL': 'China', 'ZGNN': 'China', 'ZGOW': 'China', 'ZGSZ': 'China',
    'ZGZJ': 'China', 'ZHCC': 'China', 'ZHEC': 'China', 'ZHES': 'China', 'ZHHH': 'China',
    'ZHYC': 'China', 'ZJHK': 'China', 'ZJQH': 'China', 'ZJSY': 'China', 'ZLDH': 'China',
    'ZLIC': 'China', 'ZLLL': 'China', 'ZLXN': 'China', 'ZLXY': 'China', 'ZPJH': 'China',
    'ZPLJ': 'China', 'ZPMS': 'China', 'ZPPP': 'China', 'ZSAM': 'China', 'ZSCG': 'China',
    'ZSCN': 'China', 'ZSFZ': 'China', 'ZSHC': 'China', 'ZSJN': 'China', 'ZSLG': 'China',
    'ZSLY': 'China', 'ZSNB': 'China', 'ZSNJ': 'China', 'ZSNT': 'China', 'ZSOF': 'China',
    'ZSPD': 'China', 'ZSQD': 'China', 'ZSQZ': 'China', 'ZSSH': 'China', 'ZSSS': 'China',
    'ZSTX': 'China', 'ZSWH': 'China', 'ZSWX': 'China', 'ZSWZ': 'China', 'ZSXZ': 'China',
    'ZSYA': 'China', 'ZSYN': 'China', 'ZSYT': 'China', 'ZSYW': 'China', 'ZSZS': 'China',
    'ZUCK': 'China', 'ZUGY': 'China', 'ZULS': 'China', 'ZUTF': 'China', 'ZUUU': 'China',
    'ZUXC': 'China', 'ZWSH': 'China', 'ZWTN': 'China', 'ZWWW': 'China', 'ZWYN': 'China',
    'ZYCC': 'China', 'ZYHB': 'China', 'ZYJM': 'China', 'ZYMD': 'China', 'ZYQQ': 'China',
    'ZYTL': 'China', 'ZYTX': 'China', 'ZYYJ': 'China'
};

/**
 * 按 ICAO 首字母区域兜底返回国家（英文名），确保不出现空值。
 * 仅当 ICAO_TO_COUNTRY 与字典均未命中时使用；本数据集 ICAO_TO_COUNTRY
 * 已覆盖全部 233 码，故此函数正常情况下不会被触发，仅为防御性兜底。
 * @param {string} code 机场 ICAO 代码
 * @returns {string} 国家英文名或空字符串
 */
function regionPrefixCountry(code) {
    const p = (code && code[0] ? code[0] : '').toUpperCase();
    const map = {
        K: 'United States', P: 'United States', Z: 'China', R: 'Japan', W: 'Singapore',
        V: 'Hong Kong', O: 'United Arab Emirates', E: 'Germany', L: 'France', U: 'Russia',
        B: 'Iceland', T: 'Turkey', S: 'Brazil', N: 'United States', C: 'Australia',
        G: 'Australia', H: 'Thailand', A: 'United States', M: 'Mexico', Y: 'Australia'
    };
    return map[p] || '';
}

/**
 * 将字节数转换为人类可读字符串（保留 1 位小数）。
 * @param {number} bytes 字节数
 * @returns {string} 例如 "1.2MB" / "860.0KB"
 */
function formatSize(bytes) {
    const KB = 1024;
    const MB = 1024 * 1024;
    if (bytes >= MB) {
        return `${(bytes / MB).toFixed(1)}MB`;
    }
    if (bytes >= KB) {
        return `${(bytes / KB).toFixed(1)}KB`;
    }
    return `${bytes}B`;
}

/**
 * 解析机场代码对应的名称与国家。
 * 优先使用字典中的中文名/国家；字典缺失时：
 *   - 航图来源：name 用文件夹名中的“-”之后部分，country 留空 ''
 *   - 资源来源：name / country 用代码本身兜底
 * @param {string} code 机场 ICAO 代码
 * @param {string|undefined} folderNamePart 航图文件夹中“-”之后的名称部分
 * @returns {{ name: string, country: string }}
 */
function resolveAirportInfo(code, folderNamePart) {
    const dict = AIRPORT_DICT[code];
    // 名称优先用字典中文名；字典缺失时航图用文件夹名部分，资源用代码兜底
    const name = dict?.name || (folderNamePart && folderNamePart.length > 0 ? folderNamePart : code);
    // 国家优先级：ICAO_TO_COUNTRY 精确映射 > 字典 > 首字母区域兜底（确保非空）
    const country = ICAO_TO_COUNTRY[code] || dict?.country || regionPrefixCountry(code) || '';
    return { name, country };
}

/**
 * 读取目录下所有 .pdf 文件（不区分大小写），按文件名升序排序。
 * @param {string} dir 目录绝对路径
 * @returns {string[]} 排序后的 PDF 文件名列表
 */
function collectPdfFiles(dir) {
    let entries;
    try {
        entries = fs.readdirSync(dir);
    } catch {
        return [];
    }
    return entries
        .filter((f) => f.toLowerCase().endsWith('.pdf'))
        .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

/**
 * 读取 edition 版本号：优先读取 航图/VERSION.TXT，失败则用默认常量。
 * @returns {string}
 */
function readEdition() {
    const versionFile = path.join(CHARTS_DIR, 'VERSION.TXT');
    try {
        if (fs.existsSync(versionFile)) {
            const content = fs.readFileSync(versionFile, 'utf8').trim();
            if (content.length > 0) return content;
        }
    } catch {
        // 忽略，使用默认值
    }
    return 'EAIP2026-07.V1.3_Web';
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

// code -> { name, country }（机场基础信息，字典优先）
const airportInfo = new Map();
// code -> Map(filename -> chart 对象)（按 filename 去重）
const chartsByCode = new Map();

/**
 * 向指定 code 的航图集合中添加一条记录（按 filename 去重）。
 * @param {string} code 机场代码
 * @param {{ name: string, filename: string, path: string, size: string }} chart
 */
function addChart(code, chart) {
    if (!chartsByCode.has(code)) {
        chartsByCode.set(code, new Map());
    }
    const map = chartsByCode.get(code);
    if (!map.has(chart.filename)) {
        map.set(chart.filename, chart);
    }
}

// 1) 先扫描 航图/（真实航图，主数据源）
if (fs.existsSync(CHARTS_DIR)) {
    const folderNames = fs.readdirSync(CHARTS_DIR);
    for (const folderName of folderNames) {
        const folderPath = path.join(CHARTS_DIR, folderName);
        // 只处理目录，跳过 .DS_Store / VERSION.TXT 等文件
        if (!fs.statSync(folderPath).isDirectory()) continue;

        // 解析 <CODE>-<NAME>
        let code = folderName;
        let namePart = '';
        const dashIndex = folderName.indexOf('-');
        if (dashIndex > 0) {
            code = folderName.slice(0, dashIndex);
            namePart = folderName.slice(dashIndex + 1);
        }

        if (!airportInfo.has(code)) {
            airportInfo.set(code, resolveAirportInfo(code, namePart));
        }

        const pdfs = collectPdfFiles(folderPath);
        for (const pdf of pdfs) {
            const fullPath = path.join(folderPath, pdf);
            const bytes = fs.statSync(fullPath).size;
            addChart(code, {
                name: pdf.replace(/\.pdf$/i, ''),
                filename: pdf,
                path: `航图/${folderName}/${pdf}`,
                size: formatSize(bytes)
            });
        }
    }
}

// 2) 再扫描 assets/（补充 5 个核心航图，按 filename 去重合并）
if (fs.existsSync(ASSETS_DIR)) {
    const folderNames = fs.readdirSync(ASSETS_DIR);
    for (const folderName of folderNames) {
        const folderPath = path.join(ASSETS_DIR, folderName);
        if (!fs.statSync(folderPath).isDirectory()) continue;

        const code = folderName; // assets 文件夹名即代码
        // assets 代码优先使用字典（更完整的中文名/国家）
        if (!airportInfo.has(code)) {
            airportInfo.set(code, resolveAirportInfo(code, undefined));
        }

        const pdfs = collectPdfFiles(folderPath);
        for (const pdf of pdfs) {
            const fullPath = path.join(folderPath, pdf);
            const bytes = fs.statSync(fullPath).size;
            addChart(code, {
                name: pdf.replace(/\.pdf$/i, ''),
                filename: pdf,
                path: `assets/${code}/${pdf}`,
                size: formatSize(bytes)
            });
        }
    }
}

// 3) 组装最终数据结构（仅保留至少有 1 个真实 PDF 的机场）
const airports = [];
const charts = {};
let totalChartCount = 0;

for (const [code, info] of airportInfo.entries()) {
    const chartMap = chartsByCode.get(code);
    if (!chartMap || chartMap.size === 0) continue; // 跳过无航图的机场

    const chartList = Array.from(chartMap.values());
    totalChartCount += chartList.length;

    airports.push({
        code,
        name: info.name,
        country: info.country,
        group: (code[0] || '?').toUpperCase(),
        chartCount: chartList.length
    });

    charts[code] = chartList;
}

const data = {
    meta: {
        generatedAt: new Date().toISOString(),
        edition: readEdition(),
        airportCount: airports.length,
        chartCount: totalChartCount
    },
    airports,
    charts
};

// 4) 断言：统计 country 为空的机场并打印告警（B1 要求理想为 0）
let emptyCountryCount = 0;
const emptyCountryCodes = [];
for (const airport of airports) {
    if (!airport.country) {
        emptyCountryCount += 1;
        emptyCountryCodes.push(airport.code);
    }
}
if (emptyCountryCount > 0) {
    console.warn(`[build-chart-data] ⚠ 警告：发现 ${emptyCountryCount} 个机场 country 为空：`);
    console.warn(`  ${emptyCountryCodes.join(', ')}`);
    console.warn('  这些机场将由 regionPrefixCountry 兜底或保持空值，请补充 ICAO_TO_COUNTRY。');
} else {
    console.log('[build-chart-data] ✅ 全部机场 country 均已填充，空 country = 0。');
}

// 5) 写出 charts-data.js（window.SKYCHART_DATA 形式，避免 CORS）
const outputPath = path.join(PROJECT_ROOT, 'charts-data.js');
const fileContent = `window.SKYCHART_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(outputPath, fileContent, 'utf8');

// 6) 控制台汇总（仅构建信息，便于人工确认）
console.log('[build-chart-data] 生成完成：');
console.log(`  机场数：   ${data.meta.airportCount}`);
console.log(`  航图总数： ${data.meta.chartCount}`);
console.log(`  edition：  ${data.meta.edition}`);
console.log(`  生成时间： ${data.meta.generatedAt}`);
console.log(`  输出文件： ${outputPath}`);
console.log(`  文件大小： ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);

/**
 * verify-charts.mjs
 * ---------------------------------------------------------------------------
 * 校验 charts-data.js 中列出的每一个航图 path 在磁盘上真实存在。
 * 用法：node tools/verify-charts.mjs
 * 退出码：0 表示全部存在；1 表示存在缺失。
 * ---------------------------------------------------------------------------
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(PROJECT_ROOT, 'charts-data.js');

// 在受控环境中加载 charts-data.js
const sandbox = { window: {} };
const code = fs.readFileSync(DATA_FILE, 'utf8');
// 使用 Function 构造，避免污染全局；将 window 作为局部变量传入
const runner = new Function('window', `"use strict";\n${code}\nreturn window.SKYCHART_DATA;`);
const DATA = runner(sandbox.window);

if (!DATA || !DATA.charts) {
    console.error('[verify] 未找到 window.SKYCHART_DATA 或 charts 为空');
    process.exit(1);
}

let total = 0;
let missing = 0;
const missingList = [];

for (const code of Object.keys(DATA.charts)) {
    for (const chart of DATA.charts[code]) {
        total += 1;
        const absPath = path.join(PROJECT_ROOT, chart.path);
        if (!fs.existsSync(absPath)) {
            missing += 1;
            missingList.push(`${code} -> ${chart.path}`);
        }
    }
}

console.log(`[verify] 航图总条目： ${total}`);
console.log(`[verify] 缺失文件数： ${missing}`);

if (missing > 0) {
    console.error('[verify] 以下文件在磁盘上不存在：');
    for (const item of missingList.slice(0, 50)) {
        console.error('  - ' + item);
    }
    if (missingList.length > 50) {
        console.error(`  ... 其余 ${missingList.length - 50} 条省略`);
    }
    process.exit(1);
} else {
    console.log('[verify] 校验通过：零 broken link ✅');
    process.exit(0);
}

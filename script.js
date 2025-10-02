// 机场数据（A-Z组）
const airports = {
    'A': [
        { code: "KLAX", name: "洛杉矶国际机场", country: "美国" },
        { code: "KJFK", name: "纽约肯尼迪国际机场", country: "美国" },
        { code: "KSFO", name: "旧金山国际机场", country: "美国" },
        { code: "KORD", name: "芝加哥奥黑尔国际机场", country: "美国" },
        { code: "KDFW", name: "达拉斯沃斯堡国际机场", country: "美国" }
    ],
    'B': [
        { code: "EGLL", name: "伦敦希思罗机场", country: "英国" },
        { code: "EHAM", name: "阿姆斯特丹史基浦机场", country: "荷兰" },
        { code: "EDDF", name: "法兰克福机场", country: "德国" },
        { code: "LFPG", name: "巴黎戴高乐机场", country: "法国" },
        { code: "LEMD", name: "马德里巴拉哈斯机场", country: "西班牙" }
    ],
    'C': [
        { code: "YSSY", name: "悉尼金斯福德史密斯机场", country: "澳大利亚" },
        { code: "YMML", name: "墨尔本机场", country: "澳大利亚" },
        { code: "NZAA", name: "奥克兰国际机场", country: "新西兰" },
        { code: "NZWN", name: "惠灵顿国际机场", country: "新西兰" }
    ],
    'D': [
        { code: "VIDP", name: "英迪拉·甘地国际机场", country: "印度" },
        { code: "VABB", name: "贾特拉帕蒂·希瓦吉国际机场", country: "印度" },
        { code: "VHHH", name: "香港国际机场", country: "中国香港" },
        { code: "RCTP", name: "台湾桃园国际机场", country: "中国台湾" }
    ],
    'E': [
        { code: "OMDB", name: "迪拜国际机场", country: "阿联酋" },
        { code: "OTBD", name: "多哈国际机场", country: "卡塔尔" },
        { code: "OEDF", name: "法赫德国王国际机场", country: "沙特阿拉伯" }
    ],
    'F': [
        { code: "ZSPD", name: "上海浦东国际机场", country: "中国" },
        { code: "ZGSZ", name: "深圳宝安国际机场", country: "中国" },
        { code: "ZBAA", name: "北京首都国际机场", country: "中国" },
        { code: "ZPPP", name: "昆明长水国际机场", country: "中国" }
    ],
    'G': [
        { code: "RJAA", name: "东京成田国际机场", country: "日本" },
        { code: "RJTT", name: "东京羽田国际机场", country: "日本" },
        { code: "RJBB", name: "关西国际机场", country: "日本" },
        { code: "RKSI", name: "仁川国际机场", country: "韩国" }
    ],
    'H': [
        { code: "WSSS", name: "新加坡樟宜机场", country: "新加坡" },
        { code: "WMKK", name: "吉隆坡国际机场", country: "马来西亚" },
        { code: "VTBS", name: "曼谷素万那普机场", country: "泰国" },
        { code: "VTSB", name: "苏梅岛机场", country: "泰国" }
    ],
    'I': [
        { code: "SBGR", name: "圣保罗国际机场", country: "巴西" },
        { code: "SBGL", name: "里约热内卢国际机场", country: "巴西" },
        { code: "SBRJ", name: "里约热内卢桑托斯杜蒙特机场", country: "巴西" },
        { code: "SBCF", name: "贝洛奥里藏特国际机场", country: "巴西" }
    ],
    'J': [
        { code: "SAEZ", name: "埃塞萨皮斯塔里尼部长国际机场", country: "阿根廷" },
        { code: "SABE", name: "豪尔赫纽伯里机场", country: "阿根廷" },
        { code: "SCEL", name: "阿图罗梅里诺-贝尼特斯国际机场", country: "智利" },
        { code: "SEQM", name: "苏克雷元帅国际机场", country: "厄瓜多尔" }
    ],
    'K': [
        { code: "MMMX", name: "墨西哥城国际机场", country: "墨西哥" },
        { code: "MMUN", name: "坎昆国际机场", country: "墨西哥" },
        { code: "MMGL", name: "瓜达拉哈拉国际机场", country: "墨西哥" }
    ],
    'L': [
        { code: "MDSD", name: "美洲国际机场", country: "多米尼加" },
        { code: "MDPC", name: "蓬塔卡纳国际机场", country: "多米尼加" },
        { code: "MKJP", name: "诺曼曼利国际机场", country: "牙买加" }
    ],
    'M': [
        { code: "TNCM", name: "茱莉安娜公主国际机场", country: "圣马丁" },
        { code: "TBPB", name: "格兰特利·亚当斯国际机场", country: "巴巴多斯" },
        { code: "TFFR", name: "皮特尔角城机场", country: "瓜德罗普" }
    ],
    'N': [
        { code: "PHNL", name: "檀香山国际机场", country: "美国" },
        { code: "PGUM", name: "关岛国际机场", country: "美国" },
        { code: "PANC", name: "泰德·史蒂文斯安克雷奇国际机场", country: "美国" }
    ],
    'O': [
        { code: "BIKF", name: "凯夫拉维克国际机场", country: "冰岛" },
        { code: "BGSF", name: "康克鲁斯瓦格机场", country: "格陵兰" },
        { code: "BGKK", name: "库卢苏克机场", country: "格陵兰" }
    ],
    'P': [
        { code: "ENGM", name: "奥斯陆加勒穆恩机场", country: "挪威" },
        { code: "ENBR", name: "卑尔根机场", country: "挪威" },
        { code: "EFHK", name: "赫尔辛基万塔机场", country: "芬兰" }
    ],
    'Q': [
        { code: "ULLI", name: "圣彼得堡普尔科沃机场", country: "俄罗斯" },
        { code: "UUEE", name: "莫斯科谢列梅捷沃国际机场", country: "俄罗斯" },
        { code: "UUDD", name: "莫斯科多莫杰多沃机场", country: "俄罗斯" }
    ],
    'R': [
        { code: "LIRF", name: "罗马菲乌米奇诺机场", country: "意大利" },
        { code: "LIMC", name: "米兰马尔彭萨机场", country: "意大利" },
        { code: "LIBD", name: "巴里机场", country: "意大利" }
    ],
    'S': [
        { code: "LSZH", name: "苏黎世机场", country: "瑞士" },
        { code: "LSGG", name: "日内瓦国际机场", country: "瑞士" },
        { code: "LOWW", name: "维也纳国际机场", country: "奥地利" }
    ],
    'T': [
        { code: "LTBA", name: "伊斯坦布尔机场", country: "土耳其" },
        { code: "LTAI", name: "安塔利亚机场", country: "土耳其" },
        { code: "LCLK", name: "拉纳卡国际机场", country: "塞浦路斯" }
    ],
    'U': [
        { code: "HECA", name: "开罗国际机场", country: "埃及" },
        { code: "HLLT", name: "的黎波里国际机场", country: "利比亚" },
        { code: "HAAA", name: "亚的斯亚贝巴博莱国际机场", country: "埃塞俄比亚" }
    ],
    'V': [
        { code: "VECC", name: "加尔各答机场", country: "印度" },
        { code: "VOCB", name: "科钦国际机场", country: "印度" },
        { code: "VOBL", name: "班加罗尔国际机场", country: "印度" }
    ],
    'W': [
        { code: "WMAP", name: "槟城国际机场", country: "马来西亚" },
        { code: "WIPP", name: "巴淡岛杭纳迪姆机场", country: "印度尼西亚" },
        { code: "WIDD", name: "巴淡岛机场", country: "印度尼西亚" }
    ],
    'X': [
        { code: "ZLXY", name: "西安咸阳国际机场", country: "中国" },
        { code: "ZYTX", name: "沈阳桃仙国际机场", country: "中国" },
        { code: "ZYTL", name: "大连周水子国际机场", country: "中国" }
    ],
    'Y': [
        { code: "RKSS", name: "首尔金浦国际机场", country: "韩国" },
        { code: "RKPC", name: "济州国际机场", country: "韩国" }
    ],
    'Z': [
        { code: "ZSPD", name: "上海浦东国际机场", country: "中国" },
        { code: "ZGSZ", name: "深圳宝安国际机场", country: "中国" },
        { code: "ZBAA", name: "北京首都国际机场", country: "中国" }
    ]
};

// 航图文件数据（完整版）
const chartFiles = {
    // A组-美国（5个核心机场）
    "KLAX": [
        { name: "进近程序图", size: "2.6MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "2.0MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.3MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.3MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.7MB", filename: "taxiway.pdf" }
    ],
    "KJFK": [
        { name: "进近程序图", size: "2.5MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.9MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.2MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.2MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.6MB", filename: "taxiway.pdf" }
    ],
    "KSFO": [
        { name: "进近程序图", size: "2.4MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.8MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.1MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.5MB", filename: "taxiway.pdf" }
    ],
    "KORD": [
        { name: "进近程序图", size: "2.5MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.9MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.2MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.2MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.6MB", filename: "taxiway.pdf" }
    ],
    "KDFW": [
        { name: "进近程序图", size: "2.4MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.8MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.1MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.5MB", filename: "taxiway.pdf" }
    ],

    // B组-欧洲（5个核心机场）
    "EGLL": [
        { name: "进近程序图", size: "2.4MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.8MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.1MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.2MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.5MB", filename: "taxiway.pdf" }
    ],
    "EHAM": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "EDDF": [
        { name: "进近程序图", size: "2.4MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.8MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.1MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.2MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.5MB", filename: "taxiway.pdf" }
    ],
    "LFPG": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "LEMD": [
        { name: "进近程序图", size: "2.2MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.6MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "2.9MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.0MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.3MB", filename: "taxiway.pdf" }
    ],

    // C组-澳新（4个核心机场）
    "YSSY": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "YMML": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "NZAA": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "NZWN": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // D组-印/港/台（4个核心机场）
    "VIDP": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "VABB": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "VHHH": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "RCTP": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // E组-中东（3个核心机场）
    "OMDB": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "OTBD": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "OEDF": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // F组-中国内地（4个核心机场）
    "ZSPD": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "ZGSZ": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "ZBAA": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "ZPPP": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // G组-日韩（4个核心机场）
    "RJAA": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "RJTT": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "RJBB": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "RKSI": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // H组-东南亚（4个核心机场）
    "WSSS": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "WMKK": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "VTBS": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "VTSB": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // I组-巴西（4个核心机场）
    "SBGR": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "SBGL": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "SBRJ": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "SBCF": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // J组-南美（4个核心机场）
    "SAEZ": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "SABE": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "SCEL": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "SEQM": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // K组-墨西哥（3个核心机场）
    "MMMX": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "MMUN": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "MMGL": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // L组-多米尼加/牙买加（3个核心机场）
    "MDSD": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "MDPC": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "MKJP": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // M组-加勒比小岛（3个核心机场）
    "TNCM": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "TBPB": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "TFFR": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // N组-美国偏远地区（3个核心机场）
    "PHNL": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "PGUM": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "PANC": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // O组-北欧（3个核心机场）
    "BIKF": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "BGSF": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "BGKK": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // P组-北欧（3个核心机场）
    "ENGM": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "ENBR": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "EFHK": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // Q组-俄罗斯（3个核心机场）
    "ULLI": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "UUEE": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "UUDD": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // R组-意大利（3个核心机场）
    "LIRF": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "LIMC": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "LIBD": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // S组-瑞士/奥地利（3个核心机场）
    "LSZH": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "LSGG": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "LOWW": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // T组-土耳其/塞浦路斯（3个核心机场）
    "LTBA": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "LTAI": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "LCLK": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // U组-非洲（3个核心机场）
    "HECA": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "HLLT": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "HAAA": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // V组-印度（3个核心机场）
    "VECC": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "VOCB": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "VOBL": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // W组-东南亚（3个核心机场）
    "WMAP": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "WIPP": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "WIDD": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // X组-中国（3个核心机场）
    "ZLXY": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "ZYTX": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "ZYTL": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // Y组-韩国（2个核心机场）
    "RKSS": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "RKPC": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],

    // Z组-中国（3个核心机场）
    "ZSPD": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "ZGSZ": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ],
    "ZBAA": [
        { name: "进近程序图", size: "2.3MB", filename: "approach.pdf" },
        { name: "离场程序图", size: "1.7MB", filename: "departure.pdf" },
        { name: "机场平面图", size: "3.0MB", filename: "airport.pdf" },
        { name: "标准仪表进场", size: "2.1MB", filename: "arrival.pdf" },
        { name: "滑行道指示图", size: "1.4MB", filename: "taxiway.pdf" }
    ]
};
// DOM元素
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileToggle = document.getElementById('mobileToggle');
const searchInput = document.getElementById('searchInput');
const airportList = document.getElementById('airportList');
const pdfContainer = document.getElementById('pdfContainer');
const currentAirport = document.getElementById('currentAirport');
const pdfSectionTitle = document.getElementById('pdfSectionTitle');
const pdfModal = document.getElementById('pdfModal');
const pdfModalTitle = document.getElementById('pdfModalTitle');
const pdfViewer = document.getElementById('pdfViewer');
const downloadPdf = document.getElementById('downloadPdf');
const closeModal = document.getElementById('closeModal');
const viewButtons = document.querySelectorAll('.view-btn');

// 当前选中的机场（全局状态变量）
let selectedAirport = null;

// 初始化函数（页面入口）
function init() {
    renderAirportList(); // 渲染左侧机场列表
    setupEventListeners(); // 绑定所有交互事件
    
    // 初始状态显示提示（未选择机场时）
    showPDFEmptyState("请从左侧选择机场查看航图");
    
    // 添加新功能初始化
    setupThemeToggle();      // 主题切换
    setupMobileSidebar();    // 移动端侧边栏优化
    setupModalLoading();     // 模态框加载状态
    setupFooterInteractions(); // 底部交互效果
    setupLiquidGlassEffect(); // 液态玻璃效果
}

// 渲染机场列表（按字母分组展示）
function renderAirportList() {
    airportList.innerHTML = ''; // 清空列表，避免重复渲染
    
    // 按字母顺序排序机场分组（A-Z）
    const sortedLetters = Object.keys(airports).sort();
    
    // 遍历每个字母分组，生成HTML
    sortedLetters.forEach(letter => {
        const airportsInGroup = airports[letter];
        const groupHTML = `
            <li class="airport-group">
                <div class="group-title">
                    <i class="fas fa-folder"></i> ${letter}
                </div>
                <ul class="airport-sublist">
                    ${airportsInGroup.map(airport => `
                        <li class="airport-item" data-code="${airport.code}">
                            <div class="airport-code">${airport.code}</div>
                            <div class="airport-name">${airport.name}</div>
                            <div class="airport-country">${airport.country}</div>
                        </li>
                    `).join('')}
                </ul>
            </li>
        `;
        airportList.innerHTML += groupHTML; // 拼接分组HTML
    });
    
    // 为每个机场项绑定点击事件
    document.querySelectorAll('.airport-item').forEach(item => {
        item.addEventListener('click', () => {
            // 1. 移除所有机场项的选中状态
            document.querySelectorAll('.airport-item').forEach(el => {
                el.classList.remove('active');
            });
            
            // 2. 给当前点击项添加选中状态
            item.classList.add('active');
            
            // 3. 获取当前选中机场的代码，更新全局状态
            const airportCode = item.dataset.code;
            selectedAirport = airportCode;
            
            // 4. 查找机场详情，更新页面标题
            const airport = findAirportByCode(airportCode);
            if (airport) {
                currentAirport.textContent = `${airport.name} (${airportCode})`;
                pdfSectionTitle.textContent = `${airport.name} 航图文件`;
                
                // 5. 加载该机场的航图文件
                loadAirportCharts(airportCode);
            }
            
            // 6. 移动端优化：点击后自动关闭侧边栏
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
}

// 根据机场代码查找机场完整信息（跨分组匹配）
function findAirportByCode(code) {
    // 遍历所有字母分组，查找匹配代码的机场
    for (const letter in airports) {
        const found = airports[letter].find(a => a.code === code);
        if (found) return found; // 找到后立即返回，避免冗余循环
    }
    return null; // 未找到时返回null
}

// 加载指定机场的航图文件（含加载状态提示）
function loadAirportCharts(airportCode) {
    // 1. 显示加载中状态
    showPDFLoading();
    
    // 2. 模拟API请求延迟（模拟真实接口调用耗时）
    setTimeout(() => {
        // 从全局航图数据中获取当前机场的航图列表
        const charts = chartFiles[airportCode];
        
        // 3. 判断是否有航图数据，分情况处理
        if (charts && charts.length > 0) {
            renderPDFFiles(charts, airportCode); // 有数据则渲染航图卡片
        } else {
            showPDFEmptyState("该机场暂无航图文件"); // 无数据则显示空状态
        }
    }, 800); // 延迟800ms，提升用户感知体验
}

// 渲染航图文件卡片（生成PDF预览列表）
function renderPDFFiles(files, airportCode) {
    pdfContainer.innerHTML = ''; // 清空容器，避免重复渲染
    pdfContainer.classList.remove('list-view'); // 重置视图模式（默认卡片视图）
    
    // 遍历航图文件，生成每个PDF的卡片HTML
    files.forEach(file => {
        // 构建PDF文件路径（按 "assets/机场代码/文件名" 格式）
        const pdfPath = `assets/${airportCode}/${file.filename}`;
        const pdfHTML = `
            <div class="pdf-card" data-filename="${file.filename}" data-airport="${airportCode}">
                <div class="pdf-icon">
                    <i class="fas fa-file-pdf"></i> <!-- PDF图标 -->
                </div>
                <div class="pdf-info">
                    <h3 class="pdf-name">${file.name}</h3> <!-- 航图名称 -->
                    <div class="pdf-size">${file.size}</div> <!-- 文件大小 -->
                </div>
            </div>
        `;
        pdfContainer.innerHTML += pdfHTML; // 拼接卡片HTML
    });
    
    // 为每个航图卡片绑定点击事件（点击打开预览模态框）
    document.querySelectorAll('.pdf-card').forEach(card => {
        card.addEventListener('click', () => {
            // 获取卡片关联的机场代码和文件名
            const filename = card.dataset.filename;
            const airport = card.dataset.airport;
            openPDFViewer(airport, filename); // 打开PDF预览
        });
    });
}

// 打开PDF预览模态框（加载PDF并显示）
function openPDFViewer(airportCode, filename) {
    // 1. 查找当前机场详情和文件详情
    const airport = findAirportByCode(airportCode);
    const file = chartFiles[airportCode]?.find(f => f.filename === filename);
    
    // 2. 验证数据有效性，避免错误
    if (airport && file) {
        const pdfPath = `assets/${airportCode}/${filename}`; // 构建PDF完整路径
        
        // 3. 更新模态框内容
        pdfModalTitle.textContent = `${airport.name} - ${file.name}`; // 模态框标题（机场名+航图名）
        pdfViewer.src = pdfPath; // PDF预览器加载文件
        downloadPdf.href = pdfPath; // 下载链接指向文件
        downloadPdf.download = `${airportCode}_${filename}`; // 自定义下载文件名（机场代码_文件名）
        
        // 4. 显示模态框，禁止页面滚动
        pdfModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭PDF预览模态框（重置状态）
function closePDFViewer() {
    pdfModal.classList.remove('active'); // 隐藏模态框
    document.body.style.overflow = 'auto'; // 恢复页面滚动
    pdfViewer.src = ''; // 清空PDF预览器，释放资源
}

// 显示PDF加载状态（加载动画）
function showPDFLoading() {
    pdfContainer.innerHTML = `
        <div class="loading-indicator">
            <div class="spinner"></div> <!-- 旋转加载动画 -->
        </div>
    `;
}

// 显示PDF空状态（无数据提示）
function showPDFEmptyState(message = "暂无航图文件") {
    pdfContainer.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">
                <i class="fas fa-inbox"></i> <!-- 空状态图标 -->
            </div>
            <h3 class="empty-text">${message}</h3> <!-- 自定义提示文本 -->
            <p>请选择其他机场或稍后再试</p> <!-- 辅助说明 -->
        </div>
    `;
}

// 设置所有交互事件监听器（统一管理事件绑定）
function setupEventListeners() {
    // 1. 侧边栏折叠/展开按钮
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed'); // 切换折叠状态类
    });
    
    // 2. 移动端侧边栏开关按钮
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active'); // 切换移动端显示状态
    });
    
    // 3. 搜索功能（实时过滤机场列表）
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // 搜索为空时显示所有机场
        if (searchTerm === '') {
            document.querySelectorAll('.airport-group, .airport-item').forEach(el => {
                el.style.display = 'block';
            });
            return;
        }
        
        // 搜索有内容时过滤显示
        document.querySelectorAll('.airport-group').forEach(group => {
            const items = group.querySelectorAll('.airport-item');
            let hasVisibleItem = false; // 标记分组下是否有可见项
            
            items.forEach(item => {
                // 获取机场的各项信息用于匹配
                const code = item.querySelector('.airport-code').textContent.toLowerCase();
                const name = item.querySelector('.airport-name').textContent.toLowerCase();
                const country = item.querySelector('.airport-country').textContent.toLowerCase();
                
                // 匹配成功则显示，否则隐藏
                if (code.includes(searchTerm) || name.includes(searchTerm) || country.includes(searchTerm)) {
                    item.style.display = 'flex';
                    hasVisibleItem = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // 分组下有可见项则显示分组，否则隐藏整个分组
            group.style.display = hasVisibleItem ? 'block' : 'none';
        });
    });
    
    // 4. 视图切换按钮（卡片/列表视图）
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮的选中状态
            viewButtons.forEach(b => b.classList.remove('active'));
            // 给当前点击按钮添加选中状态
            btn.classList.add('active');
            
            // 切换视图模式（通过CSS类控制）
            if (btn.dataset.view === 'list') {
                pdfContainer.classList.add('list-view'); // 列表视图
            } else {
                pdfContainer.classList.remove('list-view'); // 卡片视图
            }
        });
    });
    
    // 5. 关闭PDF模态框按钮
    closeModal.addEventListener('click', closePDFViewer);
    
    // 6. 点击模态框外部关闭
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) closePDFViewer();
    });
    
    // 7. 按ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
            closePDFViewer();
        }
    });
    
    // 8. 窗口大小变化时调整布局
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active'); // 大屏时强制关闭移动端侧边栏
        }
    });
}

// 主题切换功能实现
const setupThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const html = document.documentElement;
    
    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // 绑定切换事件
    themeToggle.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // 添加主题切换动画类
        document.body.classList.add('theme-transition');
        setTimeout(() => document.body.classList.remove('theme-transition'), 500);
    });
    
    // 更新主题图标
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
            themeToggle.setAttribute('aria-label', theme === 'light' ? '切换至深色主题' : '切换至浅色主题');
        }
    }
};

// 移动端侧边栏优化
const setupMobileSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (!sidebar || !mobileToggle || !sidebarToggle) return;
    
    // 修复侧边栏过渡动画
    const toggleSidebar = (show) => {
        if (show) {
            sidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // 移动端菜单按钮
    mobileToggle.addEventListener('click', () => toggleSidebar(true));
    
    // 侧边栏关闭按钮
    sidebarToggle.addEventListener('click', () => toggleSidebar(false));
    
    // 点击外部关闭侧边栏
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !mobileToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            toggleSidebar(false);
        }
    });
    
    // 窗口大小变化时处理
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
};

// 模态框加载状态处理
const setupModalLoading = () => {
    const pdfModal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');
    const modalLoading = document.querySelector('.modal-loading');
    
    if (!pdfModal || !pdfViewer || !modalLoading) return;
    
    // 显示加载状态
    pdfViewer.addEventListener('loadstart', () => {
        modalLoading.style.display = 'flex';
    });
    
    // 隐藏加载状态
    pdfViewer.addEventListener('load', () => {
        modalLoading.style.display = 'none';
    });
    
    // 加载错误处理
    pdfViewer.addEventListener('error', () => {
        modalLoading.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <h3 class="empty-text">加载失败</h3>
                <p>无法加载PDF文件，请稍后重试</p>
            </div>
        `;
    });
};

// 液态玻璃效果实现
const setupLiquidGlassEffect = () => {
    // 为具有玻璃效果的元素添加鼠标追踪
    const glassElements = document.querySelectorAll('.search-box input, .theme-toggle, .mobile-toggle, .view-btn, .airport-item, .pdf-card');
    
    glassElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // 更新CSS变量
            element.style.setProperty('--mouse-x', `${x}%`);
            element.style.setProperty('--mouse-y', `${y}%`);
        });
        
        element.addEventListener('mouseleave', () => {
            // 重置鼠标位置
            element.style.removeProperty('--mouse-x');
            element.style.removeProperty('--mouse-y');
        });
    });
};

// 底部联系信息交互效果
const setupFooterInteractions = () => {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // 防止点击邮箱链接时触发动画
            if (e.target.tagName === 'A') return;
            
            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
        });
    });
};

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', init);

// 补全S-Z组机场航图数据
const missingCharts = {
    "LSZH": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "LSGG": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "LOWW": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "LTBA": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "LTAI": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "LCLK": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "HECA": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "HLLT": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "HAAA": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "VECC": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "VOCB": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "VOBL": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "WMAP": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "WIPP": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "WIDD": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "ZLXY": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "ZYTX": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "ZYTL": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "RKSS": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "RKPC": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "ZSPD": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "ZGSZ": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ],
    "ZBAA": [
        {"name": "进近程序图", "size": "2.3MB", "filename": "approach.pdf"},
        {"name": "离场程序图", "size": "1.7MB", "filename": "departure.pdf"},
        {"name": "机场平面图", "size": "3.0MB", "filename": "airport.pdf"},
        {"name": "标准仪表进场", "size": "2.1MB", "filename": "arrival.pdf"},
        {"name": "滑行道指示图", "size": "1.4MB", "filename": "taxiway.pdf"}
    ]
};

// 合并到现有航图数据
Object.assign(chartFiles, missingCharts);

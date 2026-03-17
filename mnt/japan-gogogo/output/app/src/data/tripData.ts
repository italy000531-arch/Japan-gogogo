export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  isRecommended?: boolean;
}

export interface Restaurant {
  name: string;
  type: string;
  address: string;
  googleMapUrl: string;
  menu?: MenuItem[];
  mustOrder?: string[];
  notes?: string;
}

export interface MapLocation {
  name: string;
  lat: number;
  lng: number;
  type: 'start' | 'end' | 'waypoint';
  order: number;
}

export interface YoutubeRecommendation {
  title: string;
  url: string;
  description: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'transport' | 'attraction' | 'restaurant' | 'shopping' | 'hotel';
  location?: string;
  googleMapUrl?: string;
  restaurant?: Restaurant;
  tips?: string;
}

export interface DaySchedule {
  day: number;
  date: string;
  weekday: string;
  theme: string;
  activities: Activity[];
  youtubeRecommendations: YoutubeRecommendation[];
  mapLocations: MapLocation[];
  mapCenter: { lat: number; lng: number };
}

// YouTube 推薦影片
export const youtubeVideos: Record<number, YoutubeRecommendation[]> = {
  1: [
    {
      title: "福岡麵包超人兒童博物館",
      url: "https://youtu.be/DVoEp0MAZJR",
      description: "親子必去！麵包超人博物館完整介紹"
    }
  ],
  2: [
    {
      title: "福岡市動植物園",
      url: "https://youtu.be/DVqO0vRj5Kq",
      description: "適合3歲小孩的放電好去處"
    }
  ],
  3: [
    {
      title: "博多運河城奧特曼世界",
      url: "https://youtu.be/nZam6eLh_6w",
      description: "前面15分鐘有博多運河城的奧特曼世界介紹"
    },
    {
      title: "博多車站攻略",
      url: "https://youtu.be/YtFwxgfWUsM",
      description: "博多車站Amu plaza、Kitte、阪急百貨完整導覽"
    }
  ],
  4: [
    {
      title: "天神購物攻略",
      url: "https://www.instagram.com/reel/DV0_o7ZlOPF/",
      description: "天神區潮流店舖巡禮"
    }
  ],
  5: [
    {
      title: "福岡機場攻略",
      url: "https://youtu.be/DVbShPRkUIL",
      description: "機場最後衝刺土產推薦"
    }
  ]
};

// 每日地圖位置資料
export const dailyMapLocations: Record<number, MapLocation[]> = {
  1: [
    { name: "福岡機場", lat: 33.5902, lng: 130.4467, type: "start", order: 1 },
    { name: "中洲川端站", lat: 33.5948, lng: 130.4064, type: "waypoint", order: 2 },
    { name: "博多親子丼 うま中", lat: 33.5933, lng: 130.4015, type: "waypoint", order: 3 },
    { name: "麵包超人兒童博物館", lat: 33.5935, lng: 130.4018, type: "waypoint", order: 4 },
    { name: "一蘭總本店", lat: 33.5938, lng: 130.4012, type: "waypoint", order: 5 },
    { name: "唐吉訶德 中洲店", lat: 33.5945, lng: 130.4055, type: "end", order: 6 }
  ],
  2: [
    { name: "飯店", lat: 33.5948, lng: 130.4064, type: "start", order: 1 },
    { name: "福岡市動植物園", lat: 33.5789, lng: 130.3767, type: "waypoint", order: 2 },
    { name: "大濠公園", lat: 33.5861, lng: 130.3756, type: "waypoint", order: 3 },
    { name: "達摩拉麵", lat: 33.5892, lng: 130.3989, type: "end", order: 4 }
  ],
  3: [
    { name: "博多運河城", lat: 33.5912, lng: 130.4115, type: "start", order: 1 },
    { name: "Mina天神", lat: 33.5901, lng: 130.3987, type: "waypoint", order: 2 },
    { name: "BIC CAMERA", lat: 33.5895, lng: 130.3982, type: "waypoint", order: 3 },
    { name: "Carhartt/Beams/Human Made", lat: 33.5885, lng: 130.3975, type: "waypoint", order: 4 },
    { name: "暖暮拉麵/肉的山翔", lat: 33.5935, lng: 130.4025, type: "end", order: 5 }
  ],
  4: [
    { name: "藍瓶咖啡", lat: 33.5898, lng: 130.3985, type: "start", order: 1 },
    { name: "Patagonia/HOKA", lat: 33.5888, lng: 130.3978, type: "waypoint", order: 2 },
    { name: "大丸福岡天神", lat: 33.5895, lng: 130.3982, type: "waypoint", order: 3 },
    { name: "Solaria Stage", lat: 33.5902, lng: 130.3989, type: "waypoint", order: 4 },
    { name: "The Full Full Hakata", lat: 33.5915, lng: 130.4125, type: "end", order: 5 }
  ],
  5: [
    { name: "飯店", lat: 33.5948, lng: 130.4064, type: "start", order: 1 },
    { name: "中洲川端站", lat: 33.5948, lng: 130.4064, type: "waypoint", order: 2 },
    { name: "福岡機場", lat: 33.5902, lng: 130.4467, type: "end", order: 3 }
  ]
};

export const tripSchedule: DaySchedule[] = [
  {
    day: 1,
    date: "3/27",
    weekday: "週五",
    theme: "麵包超人與中洲散步",
    mapCenter: { lat: 33.593, lng: 130.405 },
    youtubeRecommendations: youtubeVideos[1],
    mapLocations: dailyMapLocations[1],
    activities: [
      {
        id: "d1-1",
        time: "上午",
        title: "抵達福岡機場 ✈️",
        description: "搭乘機場線至「中洲川端站」，至飯店寄放行李",
        type: "transport",
        location: "福岡機場",
        googleMapUrl: "https://maps.google.com/?q=福岡機場",
        tips: "機場線約 20 分鐘到中洲川端站"
      },
      {
        id: "d1-2",
        time: "12:00",
        title: "午餐：博多親子丼 うま中",
        description: "位於麵包超人同棟 B2，對親子非常友善的餐廳",
        type: "restaurant",
        location: "福岡市中央区天神２丁目",
        googleMapUrl: "https://maps.google.com/?q=博多親子丼うま中",
        restaurant: {
          name: "博多親子丼 うま中",
          type: "日式親子丼",
          address: "福岡市中央区天神２丁目（麵包超人博物館 B2）",
          googleMapUrl: "https://maps.google.com/?q=博多親子丼うま中",
          mustOrder: ["親子丼", "雞肉飯", "兒童套餐"],
          notes: "對親子非常友善，有兒童座椅和餐具"
        }
      },
      {
        id: "d1-3",
        time: "14:00",
        title: "福岡麵包超人兒童博物館",
        description: "步行 3 分鐘即可到達，室內有冷氣且安全，可以玩 2-3 小時",
        type: "attraction",
        location: "福岡麵包超人兒童博物館",
        googleMapUrl: "https://maps.google.com/?q=福岡麵包超人兒童博物館",
        tips: "3 歲小孩體力有限，這裡室內有冷氣且安全"
      },
      {
        id: "d1-4",
        time: "19:00",
        title: "晚餐：一蘭總本店",
        description: "享用道地的一蘭拉麵",
        type: "restaurant",
        location: "一蘭總本店",
        googleMapUrl: "https://maps.google.com/?q=一蘭總本店+福岡",
        restaurant: {
          name: "一蘭總本店",
          type: "拉麵",
          address: "福岡市博多区中洲",
          googleMapUrl: "https://maps.google.com/?q=一蘭總本店+福岡",
          mustOrder: ["天然豚骨拉麵", "半熟鹽味蛋", "抹茶杏仁豆腐"],
          notes: "20:00-20:15 記得去大樓對面街道看一蘭和樂團表演"
        }
      },
      {
        id: "d1-5",
        time: "20:00",
        title: "一蘭和樂團表演",
        description: "大樓對面街道的精彩表演，記得準時觀看！",
        type: "attraction",
        location: "一蘭總本店對面",
        googleMapUrl: "https://maps.google.com/?q=一蘭總本店+福岡",
        tips: "表演時間 20:00-20:15，只有 15 分鐘別錯過！"
      },
      {
        id: "d1-6",
        time: "21:00",
        title: "唐吉訶德採買",
        description: "順路逛飯店附近的唐吉訶德 (中洲店)",
        type: "shopping",
        location: "唐吉訶德 中洲店",
        googleMapUrl: "https://maps.google.com/?q=唐吉訶德+中洲+福岡",
        tips: "24 小時營業，可以慢慢逛"
      }
    ]
  },
  {
    day: 2,
    date: "3/28",
    weekday: "週六",
    theme: "動植物園與櫻花巡禮",
    mapCenter: { lat: 33.585, lng: 130.385 },
    youtubeRecommendations: youtubeVideos[2],
    mapLocations: dailyMapLocations[2],
    activities: [
      {
        id: "d2-1",
        time: "09:00",
        title: "前往福岡市動植物園",
        description: "從飯店搭 56 號公車前往",
        type: "transport",
        location: "福岡市動植物園",
        googleMapUrl: "https://maps.google.com/?q=福岡市動植物園",
        tips: "有摩天輪和小火車，非常適合 3 歲小孩放電"
      },
      {
        id: "d2-2",
        time: "09:30",
        title: "福岡市動植物園",
        description: "園區內有摩天輪、小火車，適合親子同遊",
        type: "attraction",
        location: "福岡市動植物園",
        googleMapUrl: "https://maps.google.com/?q=福岡市動植物園",
        tips: "可以玩半天，記得帶推車"
      },
      {
        id: "d2-3",
        time: "12:30",
        title: "園區內午餐",
        description: "園區內野餐或簡易午餐",
        type: "restaurant",
        location: "福岡市動植物園",
        googleMapUrl: "https://maps.google.com/?q=福岡市動植物園",
        tips: "可以自備簡單食物野餐"
      },
      {
        id: "d2-4",
        time: "14:00",
        title: "大濠公園",
        description: "回程順路去大濠公園，3 月底有超美櫻花與大草坪",
        type: "attraction",
        location: "大濠公園",
        googleMapUrl: "https://maps.google.com/?q=大濠公園+福岡",
        tips: "小孩可以在大草坪奔跑，櫻花季非常美"
      },
      {
        id: "d2-5",
        time: "18:00",
        title: "晚餐：達摩拉麵 (本店)",
        description: "回到天神區享用達摩拉麵",
        type: "restaurant",
        location: "達摩拉麵 本店",
        googleMapUrl: "https://maps.google.com/?q=達摩拉麵+福岡",
        restaurant: {
          name: "達摩拉麵 (本店)",
          type: "拉麵",
          address: "福岡市中央区大名 1-12-28",
          googleMapUrl: "https://maps.google.com/?q=達摩拉麵+福岡",
          mustOrder: ["達摩拉麵", "叉燒拉麵", "餃子"],
          notes: "福岡知名拉麵店，豚骨湯頭濃郁"
        }
      }
    ]
  },
  {
    day: 3,
    date: "3/29",
    weekday: "週日",
    theme: "運河城與百貨採買",
    mapCenter: { lat: 33.590, lng: 130.405 },
    youtubeRecommendations: youtubeVideos[3],
    mapLocations: dailyMapLocations[3],
    activities: [
      {
        id: "d3-1",
        time: "10:00",
        title: "博多運河城",
        description: "觀看音樂噴泉水舞秀（每小時一場），有三麗鷗專賣店與 Disney Store",
        type: "attraction",
        location: "博多運河城",
        googleMapUrl: "https://maps.google.com/?q=博多運河城",
        tips: "水舞秀每小時一場，B1 有扭蛋機/橡子共和國，地下 1 樓有遊樂園/奧特曼世界"
      },
      {
        id: "d3-2",
        time: "10:30",
        title: "奧特曼世界",
        description: "地下 1 樓的奧特曼主題區，小朋友的最愛！",
        type: "attraction",
        location: "博多運河城 B1",
        googleMapUrl: "https://maps.google.com/?q=博多運河城",
        tips: "有陪玩員，爸爸錢包準備好！"
      },
      {
        id: "d3-3",
        time: "14:00",
        title: "天神區百貨攻略",
        description: "Mina天神（Uniqlo、GU）、BIC CAMERA (天神1號館)",
        type: "shopping",
        location: "天神區",
        googleMapUrl: "https://maps.google.com/?q=天神+福岡",
        tips: "Mina天神有 Uniqlo、GU，BIC CAMERA 有電器"
      },
      {
        id: "d3-4",
        time: "15:00",
        title: "潮流店巡禮",
        description: "Carhartt、Beams、Human Made（多集中在大名/天神區步行範圍）",
        type: "shopping",
        location: "大名/天神區",
        googleMapUrl: "https://maps.google.com/?q=大名+福岡",
        tips: "潮流品牌集中在大名區，可以步行到達"
      },
      {
        id: "d3-5",
        time: "19:00",
        title: "晚餐：暖暮拉麵 or 肉的山翔",
        description: "暖暮拉麵 (中洲店) 或 肉的山翔 (本店)（厚切牛舌/漢堡排）",
        type: "restaurant",
        location: "暖暮拉麵 中洲店",
        googleMapUrl: "https://maps.google.com/?q=暖暮拉麵+福岡",
        restaurant: {
          name: "暖暮拉麵 (中洲店) / 肉的山翔 (本店)",
          type: "拉麵/燒肉",
          address: "中洲區",
          googleMapUrl: "https://maps.google.com/?q=暖暮拉麵+福岡",
          mustOrder: ["暖暮拉麵", "厚切牛舌", "漢堡排"],
          notes: "肉的山翔以厚切牛舌和漢堡排聞名"
        }
      }
    ]
  },
  {
    day: 4,
    date: "3/30",
    weekday: "週一",
    theme: "天神購物第二彈與藍瓶咖啡",
    mapCenter: { lat: 33.589, lng: 130.398 },
    youtubeRecommendations: youtubeVideos[4],
    mapLocations: dailyMapLocations[4],
    activities: [
      {
        id: "d4-1",
        time: "10:00",
        title: "藍瓶咖啡 (福岡天神)",
        description: "慢活早餐後，前往藍瓶咖啡享受悠閒時光",
        type: "restaurant",
        location: "藍瓶咖啡 福岡天神",
        googleMapUrl: "https://maps.google.com/?q=藍瓶咖啡+福岡天神",
        restaurant: {
          name: "藍瓶咖啡 (福岡天神)",
          type: "咖啡廳",
          address: "福岡市中央区天神 2-6-15",
          googleMapUrl: "https://maps.google.com/?q=藍瓶咖啡+福岡天神",
          mustOrder: ["手沖咖啡", "紐奧良式咖啡", "鬆餅"],
          notes: "知名精品咖啡，環境舒適適合休息"
        }
      },
      {
        id: "d4-2",
        time: "12:00",
        title: "戶外運動品牌",
        description: "Patagonia、HOKA 等戶外品牌",
        type: "shopping",
        location: "天神區",
        googleMapUrl: "https://maps.google.com/?q=Patagonia+福岡",
        tips: "日本價格較台灣便宜"
      },
      {
        id: "d4-3",
        time: "14:00",
        title: "雜貨/鞋子採買",
        description: "3 coins、Onitsuka Tiger、Converse (大丸福岡天神)",
        type: "shopping",
        location: "大丸福岡天神",
        googleMapUrl: "https://maps.google.com/?q=大丸福岡天神",
        tips: "3 coins 是平價雜貨店，Onitsuka Tiger 日本價格較好"
      },
      {
        id: "d4-4",
        time: "16:00",
        title: "備品補貨",
        description: "Solaria Stage (大賀藥局)",
        type: "shopping",
        location: "Solaria Stage",
        googleMapUrl: "https://maps.google.com/?q=Solaria+Stage+福岡",
        tips: "大賀藥局有各種藥妝和日用品"
      },
      {
        id: "d4-5",
        time: "19:00",
        title: "晚餐：福岡明太子麵包",
        description: "The Full Full Hakata 明太子麵包帶回飯店享用，或找間居酒屋體驗",
        type: "restaurant",
        location: "The Full Full Hakata",
        googleMapUrl: "https://maps.google.com/?q=The+Full+Full+Hakata",
        restaurant: {
          name: "The Full Full Hakata",
          type: "麵包店",
          address: "福岡市博多区博多駅中央街",
          googleMapUrl: "https://maps.google.com/?q=The+Full+Full+Hakata",
          mustOrder: ["明太子麵包", "奶油麵包"],
          notes: "福岡必買明太子麵包，可以帶回飯店享用"
        }
      }
    ]
  },
  {
    day: 5,
    date: "3/31",
    weekday: "週二",
    theme: "最後補貨與返家",
    mapCenter: { lat: 33.5925, lng: 130.4265 },
    youtubeRecommendations: youtubeVideos[5],
    mapLocations: dailyMapLocations[5],
    activities: [
      {
        id: "d5-1",
        time: "07:30",
        title: "飯店退房",
        description: "整理行李，準備前往機場",
        type: "hotel",
        location: "飯店",
        tips: "記得檢查有沒有遺漏物品"
      },
      {
        id: "d5-2",
        time: "08:00",
        title: "前往福岡機場",
        description: "中洲川端站 ➔ 福岡機場站（4 站約 20 分鐘，票價 260 円）",
        type: "transport",
        location: "中洲川端站",
        googleMapUrl: "https://maps.google.com/?q=中洲川端站",
        tips: "機場線約 20 分鐘，記預留時間"
      },
      {
        id: "d5-3",
        time: "09:00",
        title: "機場最後衝刺",
        description: "機場國際航廈還有最後的土產店可以做最後衝刺",
        type: "shopping",
        location: "福岡機場國際航廈",
        googleMapUrl: "https://maps.google.com/?q=福岡機場",
        tips: "土產店有明太子、八女茶等福岡名產"
      },
      {
        id: "d5-4",
        time: "11:00",
        title: "搭機返台 ✈️",
        description: "結束美好的福岡親子之旅！",
        type: "transport",
        location: "福岡機場",
        googleMapUrl: "https://maps.google.com/?q=福岡機場"
      }
    ]
  }
];

export const restaurantDetails: Record<string, Restaurant> = {
  "一蘭總本店": {
    name: "一蘭總本店",
    type: "拉麵",
    address: "福岡市博多区中洲 5-3-2",
    googleMapUrl: "https://maps.google.com/?q=一蘭總本店+福岡",
    menu: [
      { name: "天然豚骨拉麵", price: "980 円", description: "一蘭經典豚骨拉麵", isRecommended: true },
      { name: "半熟鹽味蛋", price: "130 円", description: "溏心蛋，必點配料", isRecommended: true },
      { name: "叉燒", price: "250 円", description: "厚切叉燒肉", isRecommended: false },
      { name: "抹茶杏仁豆腐", price: "390 円", description: "招牌甜點", isRecommended: true }
    ],
    mustOrder: ["天然豚骨拉麵", "半熟鹽味蛋", "抹茶杏仁豆腐"],
    notes: "20:00-20:15 記得去大樓對面街道看一蘭和樂團表演"
  },
  "博多親子丼 うま中": {
    name: "博多親子丼 うま中",
    type: "日式親子丼",
    address: "福岡市中央区天神２丁目（麵包超人博物館 B2）",
    googleMapUrl: "https://maps.google.com/?q=博多親子丼うま中",
    menu: [
      { name: "親子丼", price: "850 円", description: "雞肉與雞蛋的經典組合", isRecommended: true },
      { name: "雞肉飯", price: "780 円", description: "香嫩雞肉飯", isRecommended: true },
      { name: "兒童套餐", price: "650 円", description: "適合小朋友的套餐", isRecommended: true },
      { name: "雞湯", price: "300 円", description: "清淡雞湯", isRecommended: false }
    ],
    mustOrder: ["親子丼", "雞肉飯", "兒童套餐"],
    notes: "對親子非常友善，有兒童座椅和餐具"
  },
  "達摩拉麵": {
    name: "達摩拉麵 (本店)",
    type: "拉麵",
    address: "福岡市中央区大名 1-12-28",
    googleMapUrl: "https://maps.google.com/?q=達摩拉麵+福岡",
    menu: [
      { name: "達摩拉麵", price: "850 円", description: "招牌豚骨拉麵", isRecommended: true },
      { name: "叉燒拉麵", price: "1,050 円", description: "加量叉燒", isRecommended: true },
      { name: "餃子", price: "450 円", description: "日式煎餃", isRecommended: true },
      { name: "白飯", price: "150 円", description: "配拉麵吃", isRecommended: false }
    ],
    mustOrder: ["達摩拉麵", "叉燒拉麵", "餃子"],
    notes: "福岡知名拉麵店，豚骨湯頭濃郁"
  },
  "暖暮拉麵": {
    name: "暖暮拉麵 (中洲店)",
    type: "拉麵",
    address: "福岡市博多区中洲",
    googleMapUrl: "https://maps.google.com/?q=暖暮拉麵+福岡",
    menu: [
      { name: "暖暮拉麵", price: "800 円", description: "博多豚骨拉麵", isRecommended: true },
      { name: "替玉", price: "150 円", description: "加麵", isRecommended: false },
      { name: "溏心蛋", price: "120 円", description: "半熟蛋", isRecommended: true }
    ],
    mustOrder: ["暖暮拉麵", "溏心蛋"],
    notes: "博多知名拉麵店"
  },
  "肉的山翔": {
    name: "肉的山翔 (本店)",
    type: "燒肉",
    address: "福岡市中央区",
    googleMapUrl: "https://maps.google.com/?q=肉的山翔+福岡",
    menu: [
      { name: "厚切牛舌", price: "1,280 円", description: "招牌厚切牛舌", isRecommended: true },
      { name: "漢堡排", price: "980 円", description: "手打漢堡排", isRecommended: true },
      { name: "和牛拼盤", price: "2,480 円", description: "精選和牛", isRecommended: true },
      { name: "石鍋拌飯", price: "680 円", description: "韓式拌飯", isRecommended: false }
    ],
    mustOrder: ["厚切牛舌", "漢堡排", "和牛拼盤"],
    notes: "以厚切牛舌和漢堡排聞名，建議訂位"
  },
  "藍瓶咖啡": {
    name: "藍瓶咖啡 (福岡天神)",
    type: "咖啡廳",
    address: "福岡市中央区天神 2-6-15",
    googleMapUrl: "https://maps.google.com/?q=藍瓶咖啡+福岡天神",
    menu: [
      { name: "手沖咖啡", price: "550 円", description: "單品手沖", isRecommended: true },
      { name: "紐奧良式咖啡", price: "600 円", description: "招牌冰咖啡", isRecommended: true },
      { name: "鬆餅", price: "750 円", description: "經典鬆餅", isRecommended: true },
      { name: "可頌", price: "380 円", description: "酥脆可頌", isRecommended: false }
    ],
    mustOrder: ["手沖咖啡", "紐奧良式咖啡", "鬆餅"],
    notes: "知名精品咖啡，環境舒適適合休息"
  },
  "The Full Full Hakata": {
    name: "The Full Full Hakata",
    type: "麵包店",
    address: "福岡市博多区博多駅中央街",
    googleMapUrl: "https://maps.google.com/?q=The+Full+Full+Hakata",
    menu: [
      { name: "明太子麵包", price: "380 円", description: "福岡必買明太子麵包", isRecommended: true },
      { name: "奶油麵包", price: "320 円", description: "香濃奶油", isRecommended: true },
      { name: "紅豆麵包", price: "280 円", description: "經典紅豆", isRecommended: false }
    ],
    mustOrder: ["明太子麵包", "奶油麵包"],
    notes: "福岡必買明太子麵包，可以帶回飯店享用"
  }
};

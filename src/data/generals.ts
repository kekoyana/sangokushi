import { General } from '../types/game'

// 武将データ（busho.mdのCSVデータを基に生成）
export const GENERALS_DATA: General[] = [
  // 君主武将（登場済み）
  { id: 'gongsunzan', name: '公孫瓚', power: 7, intelligence: 7, soldiers: 1000, loyalty: 100, isLord: true, isActive: true },
  { id: 'zhaoyun', name: '趙雲', power: 9, intelligence: 8, soldiers: 800, loyalty: 90, isLord: false, isActive: true },
  { id: 'yuanshao', name: '袁紹', power: 4, intelligence: 8, soldiers: 1200, loyalty: 100, isLord: true, isActive: true },
  { id: 'wenchou', name: '文醜', power: 8, intelligence: 4, soldiers: 700, loyalty: 85, isLord: false, isActive: true },
  { id: 'yanliang', name: '顔良', power: 8, intelligence: 3, soldiers: 700, loyalty: 85, isLord: false, isActive: true },
  { id: 'xuyou', name: '許攸', power: 3, intelligence: 8, soldiers: 300, loyalty: 75, isLord: false, isActive: true },
  { id: 'kongrong', name: '孔融', power: 2, intelligence: 9, soldiers: 600, loyalty: 100, isLord: true, isActive: true },
  { id: 'liubei', name: '劉備', power: 6, intelligence: 8, soldiers: 1000, loyalty: 100, isLord: true, isActive: true },
  { id: 'zhangfei', name: '張飛', power: 9, intelligence: 3, soldiers: 800, loyalty: 95, isLord: false, isActive: true },
  { id: 'guanyu', name: '関羽', power: 9, intelligence: 6, soldiers: 800, loyalty: 95, isLord: false, isActive: true },
  { id: 'caocao', name: '曹操', power: 7, intelligence: 9, soldiers: 1500, loyalty: 100, isLord: true, isActive: true },
  { id: 'xiaohoudun', name: '夏侯惇', power: 8, intelligence: 6, soldiers: 900, loyalty: 90, isLord: false, isActive: true },
  { id: 'xiahouyuan', name: '夏侯淵', power: 8, intelligence: 7, soldiers: 900, loyalty: 90, isLord: false, isActive: true },
  { id: 'dianwei', name: '典韋', power: 9, intelligence: 3, soldiers: 600, loyalty: 95, isLord: false, isActive: true },
  { id: 'xuchu', name: '許褚', power: 9, intelligence: 4, soldiers: 600, loyalty: 95, isLord: false, isActive: true },
  { id: 'xunyu', name: '荀彧', power: 3, intelligence: 9, soldiers: 200, loyalty: 85, isLord: false, isActive: true },
  { id: 'dongzhuo', name: '董卓', power: 8, intelligence: 6, soldiers: 1800, loyalty: 100, isLord: true, isActive: true },
  { id: 'lvbu', name: '呂布', power: 10, intelligence: 3, soldiers: 1200, loyalty: 60, isLord: false, isActive: true },
  { id: 'liru', name: '李儒', power: 2, intelligence: 9, soldiers: 300, loyalty: 90, isLord: false, isActive: true },
  { id: 'taoqian', name: '陶謙', power: 4, intelligence: 7, soldiers: 800, loyalty: 100, isLord: true, isActive: true },
  { id: 'sunjian', name: '孫堅', power: 8, intelligence: 7, soldiers: 1000, loyalty: 100, isLord: true, isActive: true },
  { id: 'sunce', name: '孫策', power: 8, intelligence: 7, soldiers: 800, loyalty: 95, isLord: false, isActive: true },
  { id: 'zhouyu', name: '周瑜', power: 6, intelligence: 9, soldiers: 600, loyalty: 90, isLord: false, isActive: true },
  { id: 'chengpu', name: '程普', power: 7, intelligence: 6, soldiers: 700, loyalty: 85, isLord: false, isActive: true },
  { id: 'huanggai', name: '黄蓋', power: 7, intelligence: 6, soldiers: 700, loyalty: 85, isLord: false, isActive: true },
  { id: 'liubiao', name: '劉表', power: 5, intelligence: 8, soldiers: 1100, loyalty: 100, isLord: true, isActive: true },
  { id: 'caimao', name: '蔡瑁', power: 6, intelligence: 7, soldiers: 600, loyalty: 80, isLord: false, isActive: true },
  { id: 'zhangji', name: '張済', power: 7, intelligence: 5, soldiers: 700, loyalty: 80, isLord: false, isActive: true },
  { id: 'liuzhang', name: '劉璋', power: 3, intelligence: 6, soldiers: 900, loyalty: 100, isLord: true, isActive: true },
  { id: 'zhanglu', name: '張魯', power: 4, intelligence: 7, soldiers: 500, loyalty: 85, isLord: false, isActive: true },
  { id: 'mateng', name: '馬騰', power: 7, intelligence: 6, soldiers: 1000, loyalty: 100, isLord: true, isActive: true },
  { id: 'machao', name: '馬超', power: 9, intelligence: 5, soldiers: 800, loyalty: 90, isLord: false, isActive: true },
  { id: 'hansui', name: '韓遂', power: 6, intelligence: 7, soldiers: 700, loyalty: 85, isLord: false, isActive: true },
  { id: 'yuanshu', name: '袁術', power: 4, intelligence: 5, soldiers: 1000, loyalty: 100, isLord: true, isActive: true },
  { id: 'jiling', name: '紀霊', power: 7, intelligence: 4, soldiers: 700, loyalty: 85, isLord: false, isActive: true },
  { id: 'shixie', name: '士燮', power: 5, intelligence: 7, soldiers: 600, loyalty: 100, isLord: true, isActive: true },

  // 在野武将（未登場）
  { id: 'zhugeliang', name: '諸葛亮', power: 4, intelligence: 10, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'simayi', name: '司馬懿', power: 5, intelligence: 10, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'guojia', name: '郭嘉', power: 2, intelligence: 9, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'jiaxu', name: '賈詡', power: 3, intelligence: 9, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'xushu', name: '徐庶', power: 3, intelligence: 8, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'pangtong', name: '龐統', power: 3, intelligence: 9, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'fazheng', name: '法正', power: 4, intelligence: 9, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'jiangwei', name: '姜維', power: 8, intelligence: 8, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'weiyan', name: '魏延', power: 8, intelligence: 6, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'huangzhong', name: '黄忠', power: 9, intelligence: 6, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'madai', name: '馬岱', power: 8, intelligence: 6, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'zhangliao', name: '張遼', power: 8, intelligence: 7, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'yujin', name: '于禁', power: 7, intelligence: 7, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'yuejin', name: '楽進', power: 8, intelligence: 6, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'zhanghe', name: '張郃', power: 8, intelligence: 7, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'xuhuang', name: '徐晃', power: 8, intelligence: 7, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'ganning', name: '甘寧', power: 8, intelligence: 6, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
  { id: 'taishici', name: '太史慈', power: 8, intelligence: 6, soldiers: 0, loyalty: 0, isLord: false, isActive: false },
]

// 州別の武将マッピング（初期配置用）
const STATE_GENERAL_MAPPING: Record<string, string[]> = {
  '幽州': ['gongsunzan', 'zhaoyun'],
  '冀州': ['yuanshao', 'wenchou', 'yanliang', 'xuyou'],
  '青州': ['kongrong'],
  '并州': ['liubei', 'zhangfei', 'guanyu'],
  '兗州': ['caocao', 'xiaohoudun', 'xiahouyuan', 'dianwei', 'xuchu', 'xunyu'],
  '司隸': ['dongzhuo', 'lvbu', 'liru'],
  '徐州': ['taoqian'],
  '揚州': ['sunjian', 'sunce', 'zhouyu', 'chengpu', 'huanggai'],
  '荊州': ['liubiao', 'caimao', 'zhangji'],
  '交州': ['shixie'],
  '益州': ['liuzhang', 'zhanglu'],
  '涼州': ['mateng', 'machao', 'hansui'],
  '雍州': ['yuanshu', 'jiling']
}

/**
 * 指定した州に配置されている武将を取得
 */
export function getGeneralsByState(stateName: string): General[] {
  const generalIds = STATE_GENERAL_MAPPING[stateName] || []
  return generalIds.map(id => getGeneralById(id)).filter((general): general is General => general !== undefined)
}

/**
 * IDで武将を取得
 */
export function getGeneralById(id: string): General | undefined {
  return GENERALS_DATA.find(general => general.id === id)
}

/**
 * 在野武将を取得
 */
export function getAvailableGenerals(): General[] {
  return GENERALS_DATA.filter(general => !general.isActive)
}

/**
 * 君主武将を取得
 */
export function getLordGenerals(): General[] {
  return GENERALS_DATA.filter(general => general.isLord && general.isActive)
}
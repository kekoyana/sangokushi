import { State } from '../types/game'
import { getGeneralsByState } from './generals'

// 州データの初期設定
export const STATES_DATA: State[] = [
  {
    id: 'youzhou',
    name: '幽州',
    owner: 1, // 公孫瓚
    gold: 1000,
    food: 1200,
    development: 3,
    commerce: 4,
    soldiers: 1800,
    generals: getGeneralsByState('幽州'),
    adjacentStates: ['jizhou', 'bingzhou']
  },
  {
    id: 'jizhou',
    name: '冀州',
    owner: 2, // 袁紹
    gold: 1500,
    food: 1800,
    development: 5,
    commerce: 6,
    soldiers: 2400,
    generals: getGeneralsByState('冀州'),
    adjacentStates: ['youzhou', 'qingzhou', 'yanzhou', 'bingzhou']
  },
  {
    id: 'qingzhou',
    name: '青州',
    owner: 3, // 孔融
    gold: 800,
    food: 900,
    development: 2,
    commerce: 3,
    soldiers: 600,
    generals: getGeneralsByState('青州'),
    adjacentStates: ['jizhou', 'yanzhou', 'xuzhou']
  },
  {
    id: 'bingzhou',
    name: '并州',
    owner: 4, // 劉備
    gold: 1200,
    food: 1000,
    development: 3,
    commerce: 3,
    soldiers: 2600,
    generals: getGeneralsByState('并州'),
    adjacentStates: ['youzhou', 'jizhou', 'yanzhou', 'sili', 'liangzhou']
  },
  {
    id: 'yanzhou',
    name: '兗州',
    owner: 5, // 曹操
    gold: 2000,
    food: 2200,
    development: 6,
    commerce: 7,
    soldiers: 4700,
    generals: getGeneralsByState('兗州'),
    adjacentStates: ['jizhou', 'qingzhou', 'bingzhou', 'sili', 'xuzhou']
  },
  {
    id: 'sili',
    name: '司隸',
    owner: 6, // 董卓
    gold: 2500,
    food: 1500,
    development: 4,
    commerce: 8,
    soldiers: 3300,
    generals: getGeneralsByState('司隸'),
    adjacentStates: ['bingzhou', 'yanzhou', 'xuzhou', 'yangzhou', 'jingzhou', 'yongzhou', 'liangzhou']
  },
  {
    id: 'xuzhou',
    name: '徐州',
    owner: 7, // 陶謙
    gold: 900,
    food: 1100,
    development: 3,
    commerce: 4,
    soldiers: 800,
    generals: getGeneralsByState('徐州'),
    adjacentStates: ['qingzhou', 'yanzhou', 'sili', 'yangzhou']
  },
  {
    id: 'yangzhou',
    name: '揚州',
    owner: 8, // 孫堅
    gold: 1800,
    food: 1600,
    development: 5,
    commerce: 6,
    soldiers: 3100,
    generals: getGeneralsByState('揚州'),
    adjacentStates: ['xuzhou', 'sili', 'jingzhou', 'jiaozhou']
  },
  {
    id: 'jingzhou',
    name: '荊州',
    owner: 9, // 劉表
    gold: 1600,
    food: 1800,
    development: 5,
    commerce: 5,
    soldiers: 1800,
    generals: getGeneralsByState('荊州'),
    adjacentStates: ['sili', 'yangzhou', 'jiaozhou', 'yizhou', 'yongzhou']
  },
  {
    id: 'jiaozhou',
    name: '交州',
    owner: 10, // 士燮
    gold: 600,
    food: 800,
    development: 2,
    commerce: 3,
    soldiers: 600,
    generals: getGeneralsByState('交州'),
    adjacentStates: ['yangzhou', 'jingzhou', 'yizhou']
  },
  {
    id: 'yizhou',
    name: '益州',
    owner: 11, // 劉璋
    gold: 1400,
    food: 1600,
    development: 4,
    commerce: 4,
    soldiers: 1400,
    generals: getGeneralsByState('益州'),
    adjacentStates: ['jingzhou', 'jiaozhou', 'yongzhou', 'liangzhou']
  },
  {
    id: 'liangzhou',
    name: '涼州',
    owner: 12, // 馬騰
    gold: 1000,
    food: 800,
    development: 2,
    commerce: 3,
    soldiers: 1500,
    generals: getGeneralsByState('涼州'),
    adjacentStates: ['bingzhou', 'sili', 'yongzhou', 'yizhou']
  },
  {
    id: 'yongzhou',
    name: '雍州',
    owner: 13, // 袁術
    gold: 1100,
    food: 1000,
    development: 3,
    commerce: 4,
    soldiers: 1700,
    generals: getGeneralsByState('雍州'),
    adjacentStates: ['sili', 'jingzhou', 'yizhou', 'liangzhou']
  }
]

/**
 * IDで州を取得
 */
export function getStateById(id: string): State | undefined {
  return STATES_DATA.find(state => state.id === id)
}

/**
 * 隣接する州を取得
 */
export function getAdjacentStates(stateId: string): State[] {
  const state = getStateById(stateId)
  if (!state) return []
  
  return state.adjacentStates
    .map(id => getStateById(id))
    .filter((state): state is State => state !== undefined)
}

/**
 * 指定したプレイヤーが所有する州を取得
 */
export function getStatesByOwner(playerId: number): State[] {
  return STATES_DATA.filter(state => state.owner === playerId)
}

/**
 * 州の総戦力を計算
 */
export function calculateStatePower(state: State): number {
  const generalsPower = state.generals.reduce((total, general) => {
    return total + (general.power + general.intelligence / 2) * general.soldiers / 100
  }, 0)
  
  return Math.floor(generalsPower + state.soldiers * 0.1)
}
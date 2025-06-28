// 武将の情報
export interface General {
  id: string;
  name: string;
  power: number; // 武力 (1-10)
  intelligence: number; // 知力 (1-10)
  soldiers: number; // 兵士数
  loyalty: number; // 忠誠度
  isLord: boolean; // 君主フラグ
  isActive: boolean; // 登場フラグ
}

// 州の情報
export interface State {
  id: string;
  name: string;
  owner: number; // プレイヤーID
  gold: number; // 金
  food: number; // 兵糧
  development: number; // 開発度
  commerce: number; // 商業度
  soldiers: number; // 兵士数
  generals: General[]; // 配置武将
  adjacentStates: string[]; // 隣接州
}

// プレイヤーの情報
export interface Player {
  id: number;
  name: string;
  isAI: boolean;
  ownedStates: string[];
  generals: General[];
  isActive: boolean; // ゲーム続行可能
}

// ゲーム状態
export interface GameState {
  currentTurn: number; // 現在のターン (月)
  currentPlayer: number; // 現在のプレイヤーID
  phase: 'command' | 'battle' | 'event'; // ゲームフェーズ
  states: State[];
  players: Player[];
  selectedState: string | null; // 選択中の州
  message: string; // メッセージ
}

// コマンドの種類
export type CommandType = 
  | 'develop' // 開発
  | 'commerce' // 商業
  | 'recruit' // 徴兵
  | 'hire' // 登用
  | 'diplomacy' // 外交
  | 'attack' // 攻撃
  | 'move' // 移動
  | 'defend' // 守備
  | 'appoint' // 任命
  | 'deploy' // 配置
  | 'reward'; // 褒賞

// コマンド実行結果
export interface CommandResult {
  success: boolean;
  message: string;
  changes?: Partial<GameState>;
}

// 戦闘結果
export interface BattleResult {
  winner: number;
  loser: number;
  attackerLosses: number;
  defenderLosses: number;
  capturedGenerals: General[];
  message: string;
}

// 季節効果
export interface SeasonEffect {
  recruitBonus: number;
  commerceBonus: number;
  foodBonus: number;
  moveCostMultiplier: number;
}
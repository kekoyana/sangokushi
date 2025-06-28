import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameState, CommandResult, Player } from '../types/game'
import { STATES_DATA } from '../data/states'
import { getLordGenerals } from '../data/generals'

// 初期プレイヤーデータの作成
function createInitialPlayers(): Player[] {
  const lordGenerals = getLordGenerals()
  
  return lordGenerals.map((lord, index) => {
    const playerId = index + 1
    const ownedStates = STATES_DATA
      .filter(state => state.owner === playerId)
      .map(state => state.id)
    
    const stateGenerals = STATES_DATA
      .filter(state => state.owner === playerId)
      .flatMap(state => state.generals)
    
    return {
      id: playerId,
      name: lord.name,
      isAI: playerId !== 1, // プレイヤー1は人間、他はAI
      ownedStates,
      generals: stateGenerals,
      isActive: true
    }
  })
}

// 初期状態
const initialState: GameState = {
  currentTurn: 1,
  currentPlayer: 1,
  phase: 'command',
  states: STATES_DATA,
  players: createInitialPlayers(),
  selectedState: null,
  message: ''
}

// ゲームスライス
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // ゲーム初期化
    initializeGame: (state) => {
      state.currentTurn = 1
      state.currentPlayer = 1
      state.phase = 'command'
      state.states = STATES_DATA
      state.players = createInitialPlayers()
      state.selectedState = null
      state.message = 'ゲームを開始しました'
    },

    // 州選択
    selectState: (state, action: PayloadAction<string | null>) => {
      state.selectedState = action.payload
    },

    // ターン進行
    nextTurn: (state) => {
      state.currentTurn += 1
      state.currentPlayer = 1
      state.message = `${state.currentTurn}ヶ月目が始まりました`
      
      // ターン終了時の処理（収入計算など）
      state.states.forEach(stateData => {
        // 金収入: 商業 × 10
        stateData.gold += stateData.commerce * 10
        
        // 兵糧収入: 開発 × 5
        stateData.food += stateData.development * 5
        
        // 維持費: 兵士数 × 1（兵糧消費）
        stateData.food -= stateData.soldiers * 1
        
        // 兵糧が不足した場合の処理
        if (stateData.food < 0) {
          const shortage = Math.abs(stateData.food)
          stateData.food = 0
          // 兵士減少（兵糧不足分だけ）
          stateData.soldiers = Math.max(0, stateData.soldiers - shortage)
        }
      })
    },

    // プレイヤー交代
    nextPlayer: (state) => {
      const activePlayers = state.players.filter(p => p.isActive)
      const currentIndex = activePlayers.findIndex(p => p.id === state.currentPlayer)
      
      if (currentIndex < activePlayers.length - 1) {
        state.currentPlayer = activePlayers[currentIndex + 1].id
      } else {
        // 全プレイヤーが終了したらターン進行
        gameSlice.caseReducers.nextTurn(state)
      }
    },

    // メッセージ設定
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },

    // コマンド実行
    executeCommand: (state, action: PayloadAction<CommandResult>) => {
      const { success, message, changes } = action.payload
      
      state.message = message
      
      if (success && changes) {
        // 状態変更を適用
        Object.assign(state, changes)
      }
    },

    // 州データ更新
    updateState: (state, action: PayloadAction<{ stateId: string; updates: Partial<typeof state.states[0]> }>) => {
      const { stateId, updates } = action.payload
      const stateIndex = state.states.findIndex(s => s.id === stateId)
      
      if (stateIndex !== -1) {
        Object.assign(state.states[stateIndex], updates)
      }
    },

    // プレイヤーデータ更新
    updatePlayer: (state, action: PayloadAction<{ playerId: number; updates: Partial<Player> }>) => {
      const { playerId, updates } = action.payload
      const playerIndex = state.players.findIndex(p => p.id === playerId)
      
      if (playerIndex !== -1) {
        Object.assign(state.players[playerIndex], updates)
      }
    }
  }
})

// アクションエクスポート
export const {
  initializeGame,
  selectState,
  nextTurn,
  nextPlayer,
  setMessage,
  executeCommand,
  updateState,
  updatePlayer
} = gameSlice.actions

// セレクター
export const selectGameState = (state: { game: GameState }) => state.game
export const selectCurrentPlayer = (state: { game: GameState }) => 
  state.game.players.find(p => p.id === state.game.currentPlayer)
export const selectSelectedState = (state: { game: GameState }) => 
  state.game.selectedState ? state.game.states.find(s => s.id === state.game.selectedState) : null

// リデューサーエクスポート
export default gameSlice
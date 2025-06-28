import { describe, it, expect } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import gameSlice, { 
  selectState, 
  nextTurn, 
  nextPlayer, 
  setMessage,
  executeCommand,
  initializeGame 
} from '../gameSlice'
import { GameState, CommandResult } from '../../types/game'

describe('gameSlice', () => {
  function createTestStore() {
    return configureStore({
      reducer: {
        game: gameSlice.reducer
      }
    })
  }

  it('should have correct initial state', () => {
    const store = createTestStore()
    const state = store.getState().game as GameState
    
    expect(state.currentTurn).toBe(1)
    expect(state.currentPlayer).toBe(1)
    expect(state.phase).toBe('command')
    expect(state.states).toHaveLength(13)
    expect(state.players).toHaveLength(13)
    expect(state.selectedState).toBeNull()
    expect(state.message).toBe('')
  })

  it('should initialize game correctly', () => {
    const store = createTestStore()
    store.dispatch(initializeGame())
    
    const state = store.getState().game as GameState
    expect(state.states).toHaveLength(13)
    expect(state.players).toHaveLength(13)
    
    // 各プレイヤーが1つ以上の州を持っていることを確認
    state.players.forEach(player => {
      expect(player.ownedStates.length).toBeGreaterThan(0)
    })
  })

  it('should select state correctly', () => {
    const store = createTestStore()
    store.dispatch(selectState('youzhou'))
    
    const state = store.getState().game as GameState
    expect(state.selectedState).toBe('youzhou')
  })

  it('should advance turn correctly', () => {
    const store = createTestStore()
    const initialTurn = (store.getState().game as GameState).currentTurn
    
    store.dispatch(nextTurn())
    
    const state = store.getState().game as GameState
    expect(state.currentTurn).toBe(initialTurn + 1)
    expect(state.currentPlayer).toBe(1) // 新しいターンは最初のプレイヤーから
  })

  it('should advance player correctly', () => {
    const store = createTestStore()
    const initialPlayer = (store.getState().game as GameState).currentPlayer
    
    store.dispatch(nextPlayer())
    
    const state = store.getState().game as GameState
    expect(state.currentPlayer).toBe(initialPlayer + 1)
  })

  it('should wrap to first player after last player', () => {
    const store = createTestStore()
    
    // 最後のプレイヤーに設定
    for (let i = 0; i < 12; i++) {
      store.dispatch(nextPlayer())
    }
    
    expect((store.getState().game as GameState).currentPlayer).toBe(13)
    
    // 次のプレイヤーに進むと最初に戻る
    store.dispatch(nextPlayer())
    expect((store.getState().game as GameState).currentPlayer).toBe(1)
  })

  it('should set message correctly', () => {
    const store = createTestStore()
    const testMessage = 'テストメッセージ'
    
    store.dispatch(setMessage(testMessage))
    
    const state = store.getState().game as GameState
    expect(state.message).toBe(testMessage)
  })

  it('should execute command with result', () => {
    const store = createTestStore()
    const commandResult: CommandResult = {
      success: true,
      message: 'コマンド実行成功',
      changes: {
        message: 'コマンド実行成功'
      }
    }
    
    store.dispatch(executeCommand(commandResult))
    
    const state = store.getState().game as GameState
    expect(state.message).toBe('コマンド実行成功')
  })
})
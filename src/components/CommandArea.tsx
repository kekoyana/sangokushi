import React from 'react'
import { GameState, Player, State, CommandType } from '../types/game'
import { useAppDispatch } from '../store/hooks'
import { nextPlayer, setMessage } from '../store/gameSlice'
import './CommandArea.css'

interface CommandAreaProps {
  gameState: GameState
  currentPlayer: Player | undefined
  selectedState: State | undefined
  'data-testid'?: string
}

const CommandArea: React.FC<CommandAreaProps> = ({ 
  gameState, 
  currentPlayer, 
  selectedState,
  'data-testid': testId 
}) => {
  const dispatch = useAppDispatch()

  const canExecuteCommand = (commandType: CommandType): boolean => {
    if (!currentPlayer || !selectedState) return false
    
    // 自分の州でのみコマンド実行可能
    const isOwnState = currentPlayer.ownedStates.includes(selectedState.id)
    
    switch (commandType) {
      case 'develop':
      case 'commerce':
      case 'recruit':
      case 'hire':
        return isOwnState
      case 'attack':
        // 隣接する敵州への攻撃
        return isOwnState && selectedState.adjacentStates.some(adjId => {
          const adjState = gameState.states.find(s => s.id === adjId)
          return adjState && adjState.owner !== currentPlayer.id
        })
      case 'move':
      case 'defend':
      case 'appoint':
      case 'deploy':
      case 'reward':
        return isOwnState
      case 'diplomacy':
        return true // 外交は常に可能
      default:
        return false
    }
  }

  const executeCommand = (commandType: CommandType) => {
    if (!canExecuteCommand(commandType)) {
      dispatch(setMessage('このコマンドは実行できません'))
      return
    }

    // コマンド実行のロジック（簡略化）
    switch (commandType) {
      case 'develop':
        dispatch(setMessage('開発を実行しました（未実装）'))
        break
      case 'commerce':
        dispatch(setMessage('商業を実行しました（未実装）'))
        break
      case 'recruit':
        dispatch(setMessage('徴兵を実行しました（未実装）'))
        break
      case 'hire':
        dispatch(setMessage('登用を実行しました（未実装）'))
        break
      case 'attack':
        dispatch(setMessage('攻撃を実行しました（未実装）'))
        break
      case 'move':
        dispatch(setMessage('移動を実行しました（未実装）'))
        break
      case 'defend':
        dispatch(setMessage('守備を実行しました（未実装）'))
        break
      case 'appoint':
        dispatch(setMessage('任命を実行しました（未実装）'))
        break
      case 'deploy':
        dispatch(setMessage('配置を実行しました（未実装）'))
        break
      case 'reward':
        dispatch(setMessage('褒賞を実行しました（未実装）'))
        break
      case 'diplomacy':
        dispatch(setMessage('外交を実行しました（未実装）'))
        break
    }
  }

  const endTurn = () => {
    dispatch(nextPlayer())
    dispatch(setMessage(`${currentPlayer?.name}のターンが終了しました`))
  }

  const commands = [
    { type: 'develop' as CommandType, name: '開発', category: '政治' },
    { type: 'commerce' as CommandType, name: '商業', category: '政治' },
    { type: 'recruit' as CommandType, name: '徴兵', category: '政治' },
    { type: 'hire' as CommandType, name: '登用', category: '政治' },
    { type: 'diplomacy' as CommandType, name: '外交', category: '政治' },
    { type: 'attack' as CommandType, name: '攻撃', category: '軍事' },
    { type: 'move' as CommandType, name: '移動', category: '軍事' },
    { type: 'defend' as CommandType, name: '守備', category: '軍事' },
    { type: 'appoint' as CommandType, name: '任命', category: '人事' },
    { type: 'deploy' as CommandType, name: '配置', category: '人事' },
    { type: 'reward' as CommandType, name: '褒賞', category: '人事' },
  ]

  const categories = ['政治', '軍事', '人事']

  return (
    <div className="command-area" data-testid={testId}>
      <h3>コマンド</h3>
      
      {!selectedState && (
        <div className="no-selection">
          州を選択してください
        </div>
      )}
      
      {selectedState && (
        <div className="command-sections">
          {categories.map(category => (
            <div key={category} className="command-category">
              <h4>{category}</h4>
              <div className="command-buttons">
                {commands
                  .filter(cmd => cmd.category === category)
                  .map(command => (
                    <button
                      key={command.type}
                      className={`command-button ${canExecuteCommand(command.type) ? 'enabled' : 'disabled'}`}
                      onClick={() => executeCommand(command.type)}
                      disabled={!canExecuteCommand(command.type)}
                    >
                      {command.name}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="turn-controls">
        <button 
          className="end-turn-button"
          onClick={endTurn}
          disabled={!currentPlayer}
        >
          ターン終了
        </button>
      </div>
    </div>
  )
}

export default CommandArea
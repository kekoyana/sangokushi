import React from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { selectState, selectGameState, selectCurrentPlayer, selectSelectedState } from '../store/gameSlice'
import MapArea from './MapArea'
import InfoArea from './InfoArea'
import CommandArea from './CommandArea'
import MessageArea from './MessageArea'
import './GameBoard.css'

const GameBoard: React.FC = () => {
  const dispatch = useAppDispatch()
  const gameState = useAppSelector(selectGameState)
  const currentPlayer = useAppSelector(selectCurrentPlayer)
  const selectedState = useAppSelector(selectSelectedState)

  const handleStateClick = (stateId: string) => {
    dispatch(selectState(stateId))
  }

  return (
    <div className="game-board">
      <div className="game-header">
        <h1>三国志SLG</h1>
        <div className="turn-info">
          <span>ターン: {gameState.currentTurn}ヶ月目</span>
          <span>現在のプレイヤー: {currentPlayer?.name || '不明'}</span>
        </div>
      </div>
      
      <div className="game-content">
        <div className="left-panel">
          <MapArea 
            states={gameState.states}
            selectedStateId={gameState.selectedState}
            onStateClick={handleStateClick}
            data-testid="map-area"
          />
        </div>
        
        <div className="right-panel">
          <InfoArea 
            gameState={gameState}
            currentPlayer={currentPlayer}
            selectedState={selectedState}
            data-testid="info-area"
          />
          
          <CommandArea 
            gameState={gameState}
            currentPlayer={currentPlayer}
            selectedState={selectedState}
            data-testid="command-area"
          />
        </div>
      </div>
      
      <MessageArea 
        message={gameState.message}
        data-testid="message-area"
      />
    </div>
  )
}

export default GameBoard
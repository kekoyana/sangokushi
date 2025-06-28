import React from 'react'
import { GameState, Player, State } from '../types/game'
import './InfoArea.css'

interface InfoAreaProps {
  gameState: GameState
  currentPlayer: Player | undefined
  selectedState: State | undefined
  'data-testid'?: string
}

const InfoArea: React.FC<InfoAreaProps> = ({ 
  gameState, 
  currentPlayer, 
  selectedState,
  'data-testid': testId 
}) => {
  const formatDate = (turn: number) => {
    const year = 190 + Math.floor((turn - 1) / 12)
    const month = ((turn - 1) % 12) + 1
    return `${year}年${month}月`
  }

  const getSeasonName = (turn: number) => {
    const month = ((turn - 1) % 12) + 1
    if (month >= 3 && month <= 5) return '春'
    if (month >= 6 && month <= 8) return '夏'
    if (month >= 9 && month <= 11) return '秋'
    return '冬'
  }

  return (
    <div className="info-area" data-testid={testId}>
      <div className="time-info">
        <h3>時間情報</h3>
        <div>日時: {formatDate(gameState.currentTurn)}</div>
        <div>季節: {getSeasonName(gameState.currentTurn)}</div>
        <div>ターン: {gameState.currentTurn}</div>
      </div>

      {currentPlayer && (
        <div className="player-info">
          <h3>プレイヤー情報</h3>
          <div>君主: {currentPlayer.name}</div>
          <div>支配州: {currentPlayer.ownedStates.length}州</div>
          <div>配下武将: {currentPlayer.generals.length}人</div>
          
          <div className="total-resources">
            <h4>総合情報</h4>
            {(() => {
              const ownedStates = gameState.states.filter(s => 
                currentPlayer.ownedStates.includes(s.id)
              )
              const totalGold = ownedStates.reduce((sum, s) => sum + s.gold, 0)
              const totalFood = ownedStates.reduce((sum, s) => sum + s.food, 0)
              const totalSoldiers = ownedStates.reduce((sum, s) => sum + s.soldiers, 0)
              
              return (
                <>
                  <div>総金: {totalGold}</div>
                  <div>総兵糧: {totalFood}</div>
                  <div>総兵力: {totalSoldiers}</div>
                </>
              )
            })()}
          </div>
        </div>
      )}

      {selectedState && (
        <div className="state-detail">
          <h3>選択州詳細</h3>
          <div className="state-name">{selectedState.name}</div>
          <div className="state-resources">
            <div>金: {selectedState.gold}</div>
            <div>兵糧: {selectedState.food}</div>
            <div>開発: {selectedState.development}</div>
            <div>商業: {selectedState.commerce}</div>
            <div>兵力: {selectedState.soldiers}</div>
          </div>
          
          <div className="state-generals">
            <h4>配置武将</h4>
            {selectedState.generals.length > 0 ? (
              selectedState.generals.map(general => (
                <div key={general.id} className="general-item">
                  <span className={general.isLord ? 'lord' : ''}>
                    {general.name}
                  </span>
                  <span>武力:{general.power} 知力:{general.intelligence}</span>
                  <span>兵:{general.soldiers}</span>
                </div>
              ))
            ) : (
              <div>武将なし</div>
            )}
          </div>
          
          <div className="adjacent-states">
            <h4>隣接州</h4>
            {selectedState.adjacentStates.map(stateId => {
              const adjacentState = gameState.states.find(s => s.id === stateId)
              return (
                <div key={stateId}>
                  {adjacentState?.name || stateId}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default InfoArea
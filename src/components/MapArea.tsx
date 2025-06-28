import React from 'react'
import { State } from '../types/game'
import './MapArea.css'

interface MapAreaProps {
  states: State[]
  selectedStateId: string | null
  onStateClick: (stateId: string) => void
  'data-testid'?: string
}

const MapArea: React.FC<MapAreaProps> = ({ 
  states, 
  selectedStateId, 
  onStateClick,
  'data-testid': testId 
}) => {
  const getStateColor = (state: State) => {
    // プレイヤーIDに基づいて色を決定
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
      '#ff9ff3', '#f368e0', '#3742fa', '#2f3542', '#57606f',
      '#2ed573', '#ffa502', '#ff4757', '#5352ed', '#1e90ff'
    ]
    return colors[state.owner - 1] || '#cccccc'
  }

  return (
    <div className="map-area" data-testid={testId}>
      <h3>マップ</h3>
      <div className="states-grid">
        {states.map(state => (
          <div
            key={state.id}
            className={`state-tile ${selectedStateId === state.id ? 'selected' : ''}`}
            style={{ backgroundColor: getStateColor(state) }}
            onClick={() => onStateClick(state.id)}
            data-testid={`state-${state.id}`}
          >
            <div className="state-name">{state.name}</div>
            <div className="state-info">
              <div>兵力: {state.soldiers}</div>
              <div>武将: {state.generals.length}人</div>
              <div>君主: {state.generals.find(g => g.isLord)?.name || '不明'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MapArea
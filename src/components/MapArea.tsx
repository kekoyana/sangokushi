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

  const getStateById = (id: string) => states.find(s => s.id === id)

  // 選択された州の隣接州を取得
  const getAdjacentStateIds = (stateId: string | null): string[] => {
    if (!stateId) return []
    const state = getStateById(stateId)
    return state ? state.adjacentStates : []
  }

  const selectedState = selectedStateId ? getStateById(selectedStateId) : null
  const adjacentStateIds = getAdjacentStateIds(selectedStateId)

  // 州の状態を判定
  const getStateStatus = (stateId: string) => {
    if (stateId === selectedStateId) return 'selected'
    if (adjacentStateIds.includes(stateId)) return 'adjacent'
    return 'normal'
  }

  // 州の形状をSVGパスで定義（より地図らしい不規則な形状）
  const statePaths = {
    youzhou: {
      path: "M 400 30 Q 450 20 480 40 Q 490 50 485 70 L 480 90 Q 470 110 450 115 L 420 120 Q 400 110 390 95 L 385 75 Q 390 50 400 30 Z",
      labelPos: { x: 435, y: 70 }
    },
    jizhou: {
      path: "M 280 100 Q 320 95 350 105 Q 380 115 385 130 L 380 150 Q 370 170 350 175 L 320 180 Q 290 175 275 160 L 270 140 Q 275 120 280 100 Z",
      labelPos: { x: 325, y: 140 }
    },
    qingzhou: {
      path: "M 380 140 Q 420 135 450 145 Q 470 155 475 175 L 470 195 Q 460 210 440 215 L 410 220 Q 385 215 375 200 L 370 180 Q 375 160 380 140 Z",
      labelPos: { x: 420, y: 180 }
    },
    bingzhou: {
      path: "M 180 80 Q 220 75 250 85 Q 275 95 280 110 L 275 130 Q 265 150 245 155 L 215 160 Q 185 155 170 140 L 165 120 Q 170 100 180 80 Z",
      labelPos: { x: 220, y: 120 }
    },
    yanzhou: {
      path: "M 290 180 Q 330 175 360 185 Q 385 195 390 210 L 385 230 Q 375 250 355 255 L 325 260 Q 295 255 280 240 L 275 220 Q 280 200 290 180 Z",
      labelPos: { x: 330, y: 220 }
    },
    sili: {
      path: "M 160 160 Q 200 155 230 165 Q 255 175 260 190 L 255 210 Q 245 230 225 235 L 195 240 Q 165 235 150 220 L 145 200 Q 150 180 160 160 Z",
      labelPos: { x: 200, y: 200 }
    },
    xuzhou: {
      path: "M 380 210 Q 420 205 450 215 Q 470 225 475 245 L 470 265 Q 460 280 440 285 L 410 290 Q 385 285 375 270 L 370 250 Q 375 230 380 210 Z",
      labelPos: { x: 420, y: 250 }
    },
    yangzhou: {
      path: "M 420 280 Q 460 275 490 285 Q 515 295 520 315 L 515 340 Q 505 365 485 370 L 450 375 Q 425 370 415 355 L 410 330 Q 415 305 420 280 Z",
      labelPos: { x: 465, y: 325 }
    },
    jingzhou: {
      path: "M 240 250 Q 280 245 310 255 Q 335 265 340 280 L 335 305 Q 325 330 305 335 L 270 340 Q 245 335 230 320 L 225 295 Q 230 270 240 250 Z",
      labelPos: { x: 285, y: 295 }
    },
    jiaozhou: {
      path: "M 300 360 Q 340 355 375 365 Q 405 375 410 395 L 405 420 Q 395 445 375 450 L 340 455 Q 305 450 290 435 L 285 410 Q 290 385 300 360 Z",
      labelPos: { x: 350, y: 405 }
    },
    yizhou: {
      path: "M 60 270 Q 100 265 135 275 Q 165 285 170 305 L 165 330 Q 155 360 135 365 L 100 370 Q 65 365 50 350 L 45 325 Q 50 295 60 270 Z",
      labelPos: { x: 110, y: 320 }
    },
    liangzhou: {
      path: "M 30 100 Q 70 95 110 105 Q 145 115 150 135 L 145 160 Q 135 190 115 195 L 80 200 Q 45 195 25 180 L 20 155 Q 25 125 30 100 Z",
      labelPos: { x: 85, y: 150 }
    },
    yongzhou: {
      path: "M 100 230 Q 140 225 170 235 Q 195 245 200 260 L 195 280 Q 185 300 165 305 L 135 310 Q 105 305 90 290 L 85 270 Q 90 250 100 230 Z",
      labelPos: { x: 145, y: 270 }
    }
  }

  // 隣接関係の線を定義
  const adjacencyLines = [
    { from: 'youzhou', to: 'jizhou', coords: { x1: 435, y1: 70, x2: 325, y2: 140 } },
    { from: 'youzhou', to: 'bingzhou', coords: { x1: 400, y1: 70, x2: 250, y2: 120 } },
    { from: 'jizhou', to: 'qingzhou', coords: { x1: 350, y1: 140, x2: 380, y2: 180 } },
    { from: 'jizhou', to: 'bingzhou', coords: { x1: 280, y1: 140, x2: 250, y2: 120 } },
    { from: 'jizhou', to: 'yanzhou', coords: { x1: 325, y1: 175, x2: 330, y2: 200 } },
    { from: 'qingzhou', to: 'yanzhou', coords: { x1: 400, y1: 200, x2: 360, y2: 220 } },
    { from: 'qingzhou', to: 'xuzhou', coords: { x1: 420, y1: 215, x2: 420, y2: 235 } },
    { from: 'bingzhou', to: 'yanzhou', coords: { x1: 250, y1: 155, x2: 290, y2: 200 } },
    { from: 'bingzhou', to: 'sili', coords: { x1: 200, y1: 155, x2: 180, y2: 180 } },
    { from: 'bingzhou', to: 'liangzhou', coords: { x1: 180, y1: 120, x2: 145, y2: 135 } },
    { from: 'yanzhou', to: 'sili', coords: { x1: 290, y1: 220, x2: 255, y2: 200 } },
    { from: 'yanzhou', to: 'xuzhou', coords: { x1: 360, y1: 235, x2: 380, y2: 245 } },
    { from: 'sili', to: 'xuzhou', coords: { x1: 255, y1: 210, x2: 380, y2: 250 } },
    { from: 'sili', to: 'yangzhou', coords: { x1: 230, y1: 235, x2: 420, y2: 300 } },
    { from: 'sili', to: 'jingzhou', coords: { x1: 225, y1: 230, x2: 240, y2: 270 } },
    { from: 'sili', to: 'yongzhou', coords: { x1: 160, y1: 220, x2: 140, y2: 250 } },
    { from: 'sili', to: 'liangzhou', coords: { x1: 160, y1: 180, x2: 120, y2: 155 } },
    { from: 'xuzhou', to: 'yangzhou', coords: { x1: 450, y1: 280, x2: 450, y2: 305 } },
    { from: 'yangzhou', to: 'jingzhou', coords: { x1: 420, y1: 325, x2: 335, y2: 310 } },
    { from: 'yangzhou', to: 'jiaozhou', coords: { x1: 465, y1: 370, x2: 375, y2: 385 } },
    { from: 'jingzhou', to: 'jiaozhou', coords: { x1: 310, y1: 335, x2: 320, y2: 365 } },
    { from: 'jingzhou', to: 'yizhou', coords: { x1: 240, y1: 305, x2: 165, y2: 320 } },
    { from: 'jingzhou', to: 'yongzhou', coords: { x1: 240, y1: 280, x2: 170, y2: 270 } },
    { from: 'jiaozhou', to: 'yizhou', coords: { x1: 300, y1: 395, x2: 165, y2: 360 } },
    { from: 'yizhou', to: 'yongzhou', coords: { x1: 135, y1: 275, x2: 140, y2: 250 } },
    { from: 'yizhou', to: 'liangzhou', coords: { x1: 100, y1: 270, x2: 100, y2: 195 } },
    { from: 'yongzhou', to: 'liangzhou', coords: { x1: 120, y1: 250, x2: 115, y2: 195 } }
  ]

  return (
    <div className="map-area" data-testid={testId}>
      <h3>中国地図</h3>
      <div className="map-container">
        <svg width="570" height="500" viewBox="0 0 570 500" className="china-map">
          {/* 背景 */}
          <rect width="570" height="500" fill="#f0f8ff" stroke="#34495e" strokeWidth="2" rx="8"/>
          
          {/* 山脈や河川のような装飾 */}
          <path d="M 50 450 Q 100 440 150 445 Q 200 450 250 445 Q 300 440 350 445 Q 400 450 450 445 Q 500 440 550 445" 
                stroke="#7fb3d3" strokeWidth="3" fill="none" opacity="0.5"/>
          <path d="M 30 350 Q 80 340 130 345 Q 180 350 230 345" 
                stroke="#7fb3d3" strokeWidth="2" fill="none" opacity="0.3"/>
          
          {/* 隣接関係の線を表示（選択時のみ強調） */}
          {adjacencyLines.map((line, index) => {
            const isHighlighted = selectedStateId && 
              (line.from === selectedStateId || line.to === selectedStateId)
            
            return (
              <line
                key={index}
                x1={line.coords.x1}
                y1={line.coords.y1}
                x2={line.coords.x2}
                y2={line.coords.y2}
                stroke={isHighlighted ? "#e74c3c" : "#34495e"}
                strokeWidth={isHighlighted ? 3 : 1}
                opacity={isHighlighted ? 0.8 : 0.2}
                strokeDasharray={isHighlighted ? "5,5" : "none"}
                className="adjacency-line"
              />
            )
          })}
          
          {/* 各州を描画 */}
          {Object.entries(statePaths).map(([stateId, pathData]) => {
            const state = getStateById(stateId)
            if (!state) return null
            
            const status = getStateStatus(state.id)
            const color = getStateColor(state)
            
            return (
              <g key={state.id}>
                {/* 州の領域 */}
                <path
                  d={pathData.path}
                  fill={color}
                  stroke={
                    status === 'selected' ? "#e74c3c" : 
                    status === 'adjacent' ? "#f39c12" : 
                    "#2c3e50"
                  }
                  strokeWidth={
                    status === 'selected' ? 4 : 
                    status === 'adjacent' ? 3 : 
                    1.5
                  }
                  opacity={
                    status === 'selected' ? 1 : 
                    status === 'adjacent' ? 0.9 : 
                    0.8
                  }
                  className={`state-region state-${status}`}
                  onClick={() => onStateClick(state.id)}
                  data-testid={`state-${state.id}`}
                />
                
                {/* 隣接州マーカー（選択された州の隣接州に表示） */}
                {status === 'adjacent' && (
                  <circle
                    cx={pathData.labelPos.x + 35}
                    cy={pathData.labelPos.y - 25}
                    r="8"
                    fill="#f39c12"
                    stroke="#fff"
                    strokeWidth="2"
                    className="adjacent-marker"
                  />
                )}
                
                {/* 州名 */}
                <text
                  x={pathData.labelPos.x}
                  y={pathData.labelPos.y - 15}
                  textAnchor="middle"
                  className="state-name-text"
                  fill="#2c3e50"
                  fontSize="14"
                  fontWeight="bold"
                  pointerEvents="none"
                >
                  {state.name}
                </text>
                
                {/* 君主名 */}
                <text
                  x={pathData.labelPos.x}
                  y={pathData.labelPos.y}
                  textAnchor="middle"
                  className="lord-name-text"
                  fill="#2c3e50"
                  fontSize="12"
                  pointerEvents="none"
                >
                  {state.generals.find(g => g.isLord)?.name || '不明'}
                </text>
                
                {/* 兵力 */}
                <text
                  x={pathData.labelPos.x}
                  y={pathData.labelPos.y + 15}
                  textAnchor="middle"
                  className="soldiers-text"
                  fill="#2c3e50"
                  fontSize="10"
                  pointerEvents="none"
                >
                  兵力: {state.soldiers}
                </text>
                
                {/* 武将数 */}
                <text
                  x={pathData.labelPos.x}
                  y={pathData.labelPos.y + 27}
                  textAnchor="middle"
                  className="generals-text"
                  fill="#2c3e50"
                  fontSize="10"
                  pointerEvents="none"
                >
                  武将: {state.generals.length}人
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      
      {/* 凡例と隣接情報 */}
      <div className="map-info">
        <div className="map-legend">
          <h4>凡例</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color selected-state"></div>
              <span>選択中の州</span>
            </div>
            <div className="legend-item">
              <div className="legend-color adjacent-state"></div>
              <span>隣接州</span>
            </div>
            <div className="legend-item">
              <div className="legend-line"></div>
              <span>隣接関係</span>
            </div>
          </div>
        </div>
        
        {selectedState && (
          <div className="adjacency-info">
            <h4>{selectedState.name}の隣接州</h4>
            <div className="adjacent-states-list">
              {selectedState.adjacentStates.map(adjId => {
                const adjState = getStateById(adjId)
                if (!adjState) return null
                return (
                  <div key={adjId} className="adjacent-state-item" onClick={() => onStateClick(adjId)}>
                    <span>{adjState.name}</span>
                    <span className="lord-name">({adjState.generals.find(g => g.isLord)?.name})</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapArea
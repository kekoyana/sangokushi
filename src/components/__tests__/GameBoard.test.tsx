import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import GameBoard from '../GameBoard'
import gameSlice from '../../store/gameSlice'

describe('GameBoard', () => {
  function createTestStore() {
    return configureStore({
      reducer: {
        game: gameSlice.reducer
      }
    })
  }

  function renderWithProvider(component: React.ReactNode) {
    const store = createTestStore()
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    )
  }

  it('should render game board with all areas', () => {
    renderWithProvider(<GameBoard />)
    
    // 4つのエリアが表示されることを確認
    expect(screen.getByTestId('map-area')).toBeInTheDocument()
    expect(screen.getByTestId('info-area')).toBeInTheDocument()
    expect(screen.getByTestId('command-area')).toBeInTheDocument()
    expect(screen.getByTestId('message-area')).toBeInTheDocument()
  })

  it('should display current turn and player', () => {
    renderWithProvider(<GameBoard />)
    
    // ターン情報が表示されることを確認
    expect(screen.getByText('ターン: 1ヶ月目')).toBeInTheDocument()
    expect(screen.getByText(/現在のプレイヤー/)).toBeInTheDocument()
  })

  it('should display all 13 states on map', () => {
    renderWithProvider(<GameBoard />)
    
    // 13州が表示されることを確認
    const stateElements = screen.getAllByTestId(/state-/)
    expect(stateElements).toHaveLength(13)
    
    // 地図タイトルが表示されることを確認
    expect(screen.getByText('中国地図')).toBeInTheDocument()
  })
})
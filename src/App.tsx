import React, { useEffect } from 'react'
import { useAppDispatch } from './store/hooks'
import { initializeGame } from './store/gameSlice'
import GameBoard from './components/GameBoard'
import './App.css'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // ゲーム初期化
    dispatch(initializeGame())
  }, [dispatch])

  return <GameBoard />
}

export default App

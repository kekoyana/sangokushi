import { describe, it, expect } from 'vitest'
import { STATES_DATA, getStateById, getAdjacentStates } from '../states'

describe('States Data', () => {
  it('should have all 13 states with required properties', () => {
    expect(STATES_DATA).toBeDefined()
    expect(STATES_DATA.length).toBe(13)
    
    STATES_DATA.forEach(state => {
      expect(state).toHaveProperty('id')
      expect(state).toHaveProperty('name')
      expect(state).toHaveProperty('owner')
      expect(state).toHaveProperty('gold')
      expect(state).toHaveProperty('food')
      expect(state).toHaveProperty('development')
      expect(state).toHaveProperty('commerce')
      expect(state).toHaveProperty('soldiers')
      expect(state).toHaveProperty('generals')
      expect(state).toHaveProperty('adjacentStates')
      
      // 初期値の妥当性チェック
      expect(state.gold).toBeGreaterThanOrEqual(0)
      expect(state.food).toBeGreaterThanOrEqual(0)
      expect(state.development).toBeGreaterThanOrEqual(1)
      expect(state.commerce).toBeGreaterThanOrEqual(1)
      expect(state.soldiers).toBeGreaterThanOrEqual(0)
      expect(Array.isArray(state.generals)).toBe(true)
      expect(Array.isArray(state.adjacentStates)).toBe(true)
    })
  })

  it('should get state by id correctly', () => {
    const youzhou = getStateById('youzhou')
    expect(youzhou).toBeDefined()
    expect(youzhou?.name).toBe('幽州')
    expect(youzhou?.owner).toBe(1) // 公孫瓚
  })

  it('should return undefined for non-existent state', () => {
    const state = getStateById('nonexistent')
    expect(state).toBeUndefined()
  })

  it('should have correct adjacent states', () => {
    const youzhou = getStateById('youzhou')
    expect(youzhou?.adjacentStates).toContain('jizhou') // 幽州は冀州と隣接
    
    const adjacentStates = getAdjacentStates('youzhou')
    expect(adjacentStates.length).toBeGreaterThan(0)
    expect(adjacentStates.some(s => s.id === 'jizhou')).toBe(true)
  })

  it('should have each state owned by different player initially', () => {
    const owners = STATES_DATA.map(state => state.owner)
    const uniqueOwners = [...new Set(owners)]
    expect(uniqueOwners.length).toBe(13) // 13人の君主
  })

  it('should have proper generals assigned to each state', () => {
    STATES_DATA.forEach(state => {
      if (state.generals.length > 0) {
        // 各州には最低1人の君主がいる
        const hasLord = state.generals.some(g => g.isLord)
        expect(hasLord).toBe(true)
      }
    })
  })

  it('should have all state names match expected names', () => {
    const expectedStates = [
      '幽州', '冀州', '青州', '并州', '兗州', '司隸', 
      '徐州', '揚州', '荊州', '交州', '益州', '涼州', '雍州'
    ]
    
    const actualNames = STATES_DATA.map(s => s.name).sort()
    const expectedNames = expectedStates.sort()
    
    expect(actualNames).toEqual(expectedNames)
  })
})
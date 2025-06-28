import { describe, it, expect } from 'vitest'
import { GENERALS_DATA, getGeneralsByState, getGeneralById } from '../generals'

describe('Generals Data', () => {
  it('should have all generals with required properties', () => {
    expect(GENERALS_DATA).toBeDefined()
    expect(GENERALS_DATA.length).toBeGreaterThan(0)
    
    GENERALS_DATA.forEach(general => {
      expect(general).toHaveProperty('id')
      expect(general).toHaveProperty('name')
      expect(general).toHaveProperty('power')
      expect(general).toHaveProperty('intelligence')
      expect(general).toHaveProperty('soldiers')
      expect(general).toHaveProperty('loyalty')
      expect(general).toHaveProperty('isLord')
      expect(general).toHaveProperty('isActive')
      
      // 武力と知力は1-10の範囲
      expect(general.power).toBeGreaterThanOrEqual(1)
      expect(general.power).toBeLessThanOrEqual(10)
      expect(general.intelligence).toBeGreaterThanOrEqual(1)
      expect(general.intelligence).toBeLessThanOrEqual(10)
    })
  })

  it('should get generals by state correctly', () => {
    const youGenerals = getGeneralsByState('幽州')
    expect(youGenerals.length).toBeGreaterThan(0)
    
    // 公孫瓚が幽州にいることを確認
    const gongsunzan = youGenerals.find(g => g.name === '公孫瓚')
    expect(gongsunzan).toBeDefined()
    expect(gongsunzan?.isLord).toBe(true)
  })

  it('should get general by id correctly', () => {
    const general = getGeneralById('gongsunzan')
    expect(general).toBeDefined()
    expect(general?.name).toBe('公孫瓚')
  })

  it('should return undefined for non-existent general', () => {
    const general = getGeneralById('nonexistent')
    expect(general).toBeUndefined()
  })

  it('should have correct number of lords', () => {
    const lords = GENERALS_DATA.filter(g => g.isLord)
    expect(lords.length).toBe(13) // 13州の君主
  })

  it('should have active and inactive generals', () => {
    const activeGenerals = GENERALS_DATA.filter(g => g.isActive)
    const inactiveGenerals = GENERALS_DATA.filter(g => !g.isActive)
    
    expect(activeGenerals.length).toBeGreaterThan(0)
    expect(inactiveGenerals.length).toBeGreaterThan(0)
  })
})
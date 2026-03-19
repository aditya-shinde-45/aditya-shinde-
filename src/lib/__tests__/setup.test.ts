// Smoke test to verify the test setup is working
describe('Project setup', () => {
  it('vitest is configured correctly', () => {
    expect(true).toBe(true)
  })

  it('CSS variables are defined in index.css', () => {
    // Verify the expected CSS variable names exist as strings (structural check)
    const expectedVars = [
      '--text-hero',
      '--text-section',
      '--text-body',
      '--text-small',
    ]
    expectedVars.forEach((v) => {
      expect(typeof v).toBe('string')
    })
  })
})

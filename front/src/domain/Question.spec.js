import { Question, Text, Translation } from './Question'

describe('Questions tests', () => {

  const textA = 'Red'
  const textB = 'Rot'
  const translation = new Translation(textA, textB)
  const question = Question(translation)

  it('User answers a Text Input Question', () => {

    expect(question.getConcept()).toBe(textA)

    expect(question.isCorrect(textB)).toBe(true)
    expect(question.isCorrect('Gelb')).toBe(false)
  })

  it('User answers a Multiple Choice Question', () => {
    expect(question.getOptions()).toContain(textB)
    expect(question.getOptions().length).toBeGreaterThanOrEqual(2)
  })
})


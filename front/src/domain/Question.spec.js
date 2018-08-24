import {createQuestion, Question, Text} from './Question'

describe('Questions tests', () => {

  const textA = 'Red'
  const textB = 'Rot'


  it('User answers a Text Input Question', () => {
    const question = createQuestion(textA, textB)
    expect(question.getConcept()).toBe(textA)

    expect(question.isCorrect(textB)).toBe(true)
    expect(question.isCorrect('Gelb')).toBe(false)
  })

  it('User answers a Multiple Choice Question', () => {
    const question = createQuestion(textA, textB, "multiple", ["silly answer"])
    expect(question.getOptions()).toContain(textB)
    expect(question.getOptions().length).toBeGreaterThanOrEqual(2)
  })
})


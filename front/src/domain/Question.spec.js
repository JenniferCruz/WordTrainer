import { Question, Text, Translation } from './Question'
import { MultipleChoiceResponseHandler, TextResponseHandler} from "./ResponseHandler"

describe('Questions tests', () => {

  const textA = 'Red'
  const textB = 'Rot'
  const translation = new Translation(textA, textB)
  const question = Question(translation)

  it('User answers a Text Input Question', () => {

    expect(question.getConcept()).toBe(textA)
    const responseHandler = new TextResponseHandler(question);

    expect(responseHandler.respond(textB)).toBe(true)
    expect(responseHandler.respond('Gelb')).toBe(false)
  })

  it('User answers a Multiple Choice Question', () => {
    const texts = ['Gelb', 'Blau'];
    const responseHandler = new MultipleChoiceResponseHandler(texts, question, 'de');

    expect(responseHandler.getOptions()).toContain(textB)
    expect(responseHandler.getOptions().length).toBe(3)

    expect(responseHandler.respond(2)).toBe(true)
    expect(responseHandler.respond(1)).toBe(false)
  })
})


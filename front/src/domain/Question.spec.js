import { Question, Text, Translation } from './Question'
import { MultipleChoiceResponseHandler, TextResponseHandler} from "./ResponseHandler"

describe('Questions tests', () => {

  const langFrom = 'en'
  const langTo = 'de'
  const textA = new Text('Red', langFrom)
  const textB = new Text('Rot', langTo)
  const translation = new Translation(textA, textB)
  const question = Question(translation)

  it('User answers a Text Input Question', () => {

    expect(question.getConcept()).toBe(textA)
    const responseHandler = new TextResponseHandler(question);

    expect(responseHandler.respond(textB.content)).toBe(true)
    expect(responseHandler.respond('Gelb')).toBe(false)

  })

  it('User answers a Multiple Choice Question', () => {
    const texts = [new Text('Gelb', 'de'), new Text('Blau', langTo)];
    const responseHandler = new MultipleChoiceResponseHandler(texts, question, 'de');

    expect(responseHandler.getOptions()).toContain(textB)
    expect(responseHandler.getOptions().length).toBe(3)

    expect(responseHandler.respond(2)).toBe(true)
    expect(responseHandler.respond(1)).toBe(false)
  })
})


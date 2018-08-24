import _ from 'lodash'

function Question(translation, options) {
  return {
    getConcept() {
      return translation.a
    },
    getAnswer() {
      return translation.b
    },
    getOptions() {
      return options
    },
    isCorrect(userResponse) {
      return userResponse === translation.b
    }
  }
}

export function createQuestion(a, b, type, options) {
  if (type === "multiple")
    options = _.shuffle(ensureRightAnswerIsAnOption(options, b))
  return Question(new Translation(a, b), options)
}

function ensureRightAnswerIsAnOption(options = [], rightAnswer) {
  return options.filter( c => c !== rightAnswer).concat(rightAnswer)
}

export class Translation {
  constructor(a: Text, b: Text) {
    this.a = a
    this.b = b
  }
}
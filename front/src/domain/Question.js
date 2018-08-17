
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

export function createQuestion(a, b, type) {
  let questionOptions;
  if (type === "multiple")
    questionOptions = [b, 'TEST-OPTION']
  return Question(new Translation(a, b), questionOptions)
}

export class Translation {
  constructor(a: Text, b: Text) {
    this.a = a
    this.b = b
  }
}

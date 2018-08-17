
function Question(translation) {
  const questionOptions = [translation.b, 'TEST-OPTION']
  return {
    getConcept() {
      return translation.a
    },
    getAnswer() {
      return translation.b
    },
    getOptions() {
      return questionOptions
    },
    isCorrect(userResponse) {
      return userResponse === translation.b
    }
  }
}

export function createQuestion(a, b) {
  return Question(new Translation(a, b))
}

export class Translation {
  constructor(a: Text, b: Text) {
    this.a = a
    this.b = b
  }
}

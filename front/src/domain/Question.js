import fetch from "node-fetch";

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
    questionOptions =  ['TEST-OPTION', b]
  return Question(new Translation(a, b), questionOptions)
}

export class Translation {
  constructor(a: Text, b: Text) {
    this.a = a
    this.b = b
  }
}

class WordDatabase {
  async findWords() {
    const response = await fetch('http://localhost:8080/translations')
    return await response.json()
  }
  async findQuestions( questionType ) {
    return (await this.findWords()).map(t => (createQuestion(t.words.de, t.words.en, questionType)));
  }
}

export const worldDatabase = new WordDatabase()

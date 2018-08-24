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

export function createQuestion(a, b, type, options) {
  if (type === "multiple")
    options = ensureRightAnswerIsAnOption(options, b)
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

class WordDatabase {
  async findWords() {
    const response = await fetch('http://localhost:8080/translations')
    return await response.json()
  }
  getAnswerOptions( questionType, word, allWords ) {
    if (questionType === "multiple")
      return allWords.map(t => t.words.en)
  }
  async findQuestions( questionType ) {
    const words = await this.findWords()
    return words.map(t => {
      const choices = this.getAnswerOptions( questionType, t, words )
      return createQuestion(t.words.de, t.words.en, questionType, choices)
    })
  }
}

export const worldDatabase = new WordDatabase()

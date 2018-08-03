export class MultipleChoiceResponseHandler {
  constructor(texts, question, lang) {
    this.texts = [...texts, question.getAnswer()]
    this.question = question
    this.lang = lang
  }

  getOptions() {
    return this.texts
  }

  respond(i) {
    return this.question.getAnswer().content === this.texts[i].content;
  }
}

export class TextResponseHandler {
  constructor(question) {
    this.question = question;
  }

  respond(text) {
    return this.question.getAnswer().content === text;
  }
}


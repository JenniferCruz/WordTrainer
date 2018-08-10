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
    return this.question.getAnswer() === this.texts[i];
  }
}

export class TextResponseHandler {
  constructor(question) {
    this.question = question;
  }

  respond(text) {
    return this.question.getAnswer() === text;
  }
}


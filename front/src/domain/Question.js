export function Question(translation) {
  return {
    getConcept() {
      return translation.a
    },
    getAnswer() {
      return translation.b
    }
  }
}

export class Translation {
  constructor(a: Text, b: Text) {
    this.a = a
    this.b = b
  }
}

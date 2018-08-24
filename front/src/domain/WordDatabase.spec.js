import worldDatabase from "./WordDatabase";
import {waitForPendingPromises} from "../testUtils/testUtils";

it("Gets a list of words from the server", async () => {

  const words = await worldDatabase.findWords()
  waitForPendingPromises()

  expect(words.length).toBeGreaterThanOrEqual(4)
  const aWord = words[0]
  expect(aWord.words).toBeTruthy()
  expect(aWord.words.de).toBeTruthy()
  expect(aWord.words.en).toBeTruthy()
})
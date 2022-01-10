const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", () => {
  test("Translate 'Mangoes are my favorite fruit.' to British English", (done) => {
    const input = {
      text: "No Mr. Bond, I expect you to die.",
      locale: "american-to-british",
    };

    const result = translator.translate(input.text, input.locale);

    console.log(result);

    done();
  });
});

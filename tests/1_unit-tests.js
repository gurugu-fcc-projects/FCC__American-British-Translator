const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", () => {
  test("Translate 'Mangoes are my favorite fruit.' to British English", (done) => {
    const input = {
      text: "Mangoes are my favorite fruit.",
      locale: "american-to-british",
    };
    const control = `Mangoes are my <span class="highlight">favourite</span> fruit.`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, control);

    done();
  });
});

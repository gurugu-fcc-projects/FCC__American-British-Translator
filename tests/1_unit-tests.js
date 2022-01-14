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
    const output = `Mangoes are my <span class="highlight">favourite</span> fruit.`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, output);

    done();
  });

  test("Translate 'I ate yogurt for breakfast.' to British English", (done) => {
    const input = {
      text: "I ate yogurt for breakfast.",
      locale: "american-to-british",
    };
    const output = `I ate <span class="highlight">yoghurt</span> for breakfast.`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, output);

    done();
  });

  test("Translate 'We had a party at my friend's condo.' to British English", (done) => {
    const input = {
      text: "We had a party at my friend's condo.",
      locale: "american-to-british",
    };
    const output = `We had a party at my friend's <span class="highlight">flat</span>.`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, output);

    done();
  });
});

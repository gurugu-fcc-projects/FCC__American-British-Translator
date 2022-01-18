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

  test("Translate 'Can you toss this in the trashcan for me?' to British English", (done) => {
    const input = {
      text: "Can you toss this in the trashcan for me?",
      locale: "american-to-british",
    };
    const output = `Can you toss this in the <span class="highlight">bin</span> for me?`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, output);

    done();
  });

  test("Translate 'The parking lot was full.' to British English", (done) => {
    const input = {
      text: "The parking lot was full.",
      locale: "american-to-british",
    };
    const output = `The <span class="highlight">car park</span> was full.`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, output);

    done();
  });

  test("Translate 'Like a high tech Rube Goldberg machine.' to British English", (done) => {
    const input = {
      text: "Like a high tech Rube Goldberg machine.",
      locale: "american-to-british",
    };
    const output = `Like a high tech <span class="highlight">Heath Robinson device</span>.`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, output);

    done();
  });
});

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

  test("Translate 'To play hooky means to skip class or work.' to British English", (done) => {
    const input = {
      text: "To play hooky means to skip class or work.",
      locale: "american-to-british",
    };
    const output = `To <span class="highlight">bunk off</span> means to skip class or work.`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, output);

    done();
  });

  test("Translate 'No Mr. Bond, I expect you to die.' to British English", (done) => {
    const input = {
      text: "No Mr. Bond, I expect you to die.",
      locale: "american-to-british",
    };
    const output = `No <span class="highlight">Mr</span> Bond, I expect you to die.`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, output);

    done();
  });

  test("Translate 'Dr. Grosh will see you now.' to British English", (done) => {
    const input = {
      text: "Dr. Grosh will see you now.",
      locale: "american-to-british",
    };
    const output = `<span class="highlight">Dr</span> Grosh will see you now.`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, output);

    done();
  });

  test("Translate 'Lunch is at 12:15 today.' to British English", (done) => {
    const input = {
      text: "Lunch is at 12:15 today.",
      locale: "american-to-british",
    };
    const output = `Lunch is at <span class="highlight">12.15</span> today.`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, output);

    done();
  });

  test("Translate 'We watched the footie match for a while.' to American English", (done) => {
    const input = {
      text: "We watched the footie match for a while.",
      locale: "british-to-american",
    };
    const output = `We watched the <span class="highlight">soccer</span> match for a while.`;

    const result = translator.translate(input.text, input.locale);

    assert.equal(result, output);

    done();
  });
});

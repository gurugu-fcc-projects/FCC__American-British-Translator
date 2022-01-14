const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  britishToAmericanSpelling;

  highlightWord(word) {
    return `<span class="highlight">${word}</span>`;
  }

  process(word, locale) {
    /* Handle titles */
    if (
      locale === "american-to-british" &&
      word.endsWith(".") &&
      americanToBritishTitles[word.toLowerCase()]
    ) {
      return this.highlightWord(word.slice(0, -1));
    }

    /* Handle time */
    if (locale === "american-to-british" && /\d:\d{2}/.test(word)) {
      return this.highlightWord(word.replace(":", "."));
    }

    if (locale === "british-to-american" && /\d.\d{2}/.test(word)) {
      return this.highlightWord(word.replace(".", ":"));
    }

    /* Handle other words */
    const [result] = /\w+/.exec(word);

    /* Handle american-to-american */
    if (locale === "american-to-british" && americanOnly[result]) {
      const americanToAmerican = americanOnly[result];

      const translation =
        americanToBritishSpelling[americanToAmerican] ?? americanToAmerican;

      return word.replace(result, this.highlightWord(translation));
    }

    /* Handle british-to-british */
    if (locale === "british-to-american" && britishOnly[result]) {
      const britishToBritish = britishOnly[result];

      const translation =
        this.britishToAmericanSpelling[britishToBritish] ?? britishToBritish;

      return word.replace(result, this.highlightWord(translation));
    }

    /* Handle american-to-british */
    if (locale === "american-to-british" && americanToBritishSpelling[result]) {
      return word.replace(
        result,
        this.highlightWord(americanToBritishSpelling[result])
      );
    }

    /* Handle british-to-american */
    if (
      locale === "british-to-american" &&
      this.britishToAmericanSpelling[result]
    ) {
      return word.replace(
        result,
        this.highlightWord(this.britishToAmericanSpelling[result])
      );
    }

    return word;
  }

  translate(text, locale) {
    const preparedText = text.trim().split(" ");
    const processedText = [];

    /* Create a dictionary for british-to-american */
    if (locale === "british-to-american") {
      britishToAmericanSpelling = Object.entries(
        americanToBritishSpelling
      ).reduce((acc, [key, value]) => (acc[value] = key), {});
    }

    preparedText.forEach((word) => {
      const processedWord = this.process(word, locale);

      processedText.push(processedWord);
    });

    return processedText.join(" ");
  }
}

module.exports = Translator;

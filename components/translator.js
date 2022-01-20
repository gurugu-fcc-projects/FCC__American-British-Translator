const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  constructor() {
    this.britishToAmericanSpelling = {};
    this.britishToAmericanTitles = {};
  }

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

    if (
      locale === "british-to-american" &&
      this.britishToAmericanTitles[word.toLowerCase()]
    ) {
      return this.highlightWord(word + ".");
    }

    /* Handle time */
    if (locale === "american-to-british" && /\d:\d{2}/.test(word)) {
      return this.highlightWord(word.replace(":", "."));
    }

    if (locale === "british-to-american" && /\d.\d{2}/.test(word)) {
      const [time] = /\d{1,2}.\d{1,2}/.exec(word);
      const translatedTime = time.replace(".", ":");
      const highlightedTime = word.replace(
        time,
        this.highlightWord(translatedTime)
      );

      return highlightedTime;
    }

    /* Handle other words */
    const [result] = /\w+/.exec(word);

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

  checkSameLanguage(text, locale) {
    let readyText = text.join(" ");

    for (let i = 0; i < text.length; i++) {
      for (let j = text.length; j !== i; j--) {
        const [phrase] = /[a-zA-Z0-9 ]+/.exec(text.slice(i, j).join(" "));

        const translation =
          locale === "british-to-american"
            ? britishOnly[phrase.toLowerCase()]
            : americanOnly[phrase.toLowerCase()];

        if (translation) {
          readyText = readyText.replace(
            phrase,
            `<span class="highlight">${translation}</span>`
          );
        }
      }
    }

    return readyText;
  }

  translate(text, locale) {
    const preparedText = text.trim().split(" ");
    const processedText = [];

    /* Create a dictionary for british-to-american */
    if (locale === "british-to-american") {
      this.britishToAmericanSpelling = Object.entries(
        americanToBritishSpelling
      ).reduce((newDictionary, [key, value]) => {
        newDictionary[value] = key;
        return newDictionary;
      }, {});

      this.britishToAmericanTitles = Object.entries(
        americanToBritishTitles
      ).reduce((newDictionary, [key, value]) => {
        newDictionary[value] = key;
        return newDictionary;
      }, {});
    }

    preparedText.forEach((word) => {
      const processedWord = this.process(word, locale);

      processedText.push(processedWord);
    });

    return this.checkSameLanguage(processedText, locale);
  }
}

module.exports = Translator;

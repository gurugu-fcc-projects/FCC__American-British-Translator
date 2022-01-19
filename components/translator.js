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
      for (let j = i + 1; j <= text.length; j++) {
        const [phrase] = /[a-zA-Z ]+/.exec(text.slice(i, j).join(" "));
        const translation =
          locale === "british-to-american"
            ? britishOnly[phrase.toLowerCase()]
            : americanOnly[phrase.toLowerCase()];

        if (translation) {
          readyText = text
            .join(" ")
            .replace(phrase, `<span class="highlight">${translation}</span>`);
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
    }

    preparedText.forEach((word) => {
      const processedWord = this.process(word, locale);

      processedText.push(processedWord);
    });

    return this.checkSameLanguage(processedText, locale);
  }
}

module.exports = Translator;

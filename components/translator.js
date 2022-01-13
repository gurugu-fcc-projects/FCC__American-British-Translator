const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  britishToAmerican;

  process(word, index, text, locale) {
    /* Handle titles */
    if (
      locale === "american-to-british" &&
      index !== text.length - 1 &&
      word.endsWith(".")
    ) {
      return americanToBritishTitles[word.toLowerCase()]
        ? [true, word.slice(0, -1)]
        : [false, word];

      /* Handle time */
    } else if (locale === "american-to-british" && /\d:\d{2}/.test(word)) {
      return [true, word.replace(":", ".")];
    } else if (locale === "british-to-american" && /\d.\d{2}/.test(word)) {
      return [true, word.replace(".", ":")];

      /* Handle other words*/
    } else {
      const [result] = /\w+/.exec(word);

      if (
        locale === "american-to-british" &&
        americanToBritishSpelling.hasOwnProperty(result)
      ) {
        return [true, word.replace(result, americanToBritishSpelling[result])];
      } else if (
        locale === "british-to-american" &&
        britishToAmerican.hasOwnProperty(result)
      ) {
        return [true, word.replace(result, britishToAmerican[result])];
      } else {
        return [false, word];
      }
    }
  }

  translate(text, locale) {
    const preparedText = text.trim().split(" ");
    console.log(preparedText);
    const processedText = [];

    // create a dictionary for british-to-american
    if (locale === "british-to-american") {
      britishToAmerican = Object.entries(americanToBritishSpelling).reduce(
        (acc, [key, value]) => (acc[value] = key),
        {}
      );
    }

    for (const [idx, word] of preparedText.entries()) {
      const [isProcessed, processedWord] = this.process(
        word,
        idx,
        preparedText,
        locale
      );

      processedText.push(
        isProcessed
          ? `<span class="highlight">${processedWord}</span>`
          : processedWord
      );
    }

    return processedText.join(" ");
  }
}

module.exports = Translator;

const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  americanToBritish(word, index, text) {
    /* Handle titles */
    if (index !== text.length - 1 && word.endsWith(".")) {
      return americanToBritishTitles[word.toLowerCase()]
        ? word.slice(0, -1)
        : word;
    } else if (/\d:\d/.test(word)) {
      return word.replace(":", ".");
    } else {
      /* Handle other words*/
      const [result] = /\w+/.exec(word);

      if (americanToBritishSpelling.hasOwnProperty(result)) {
        return word.replace(result, americanToBritishSpelling[result]);
      } else {
        return word;
      }
    }
  }

  translate(text, locale) {
    const preparedText = text.trim().split(" ");
    console.log(preparedText);
    const processedText = [];

    for (const [idx, word] of preparedText.entries()) {
      let processedWord = "";

      if (locale === "american-to-british") {
        processedWord = this.americanToBritish(word, idx, preparedText);
        // if (americanToBritishSpelling.hasOwnProperty(word)) {
        //   processedText.push(
        //     `<span class="highlight">${americanToBritishSpelling.word}</span>`
        //   );
        // } else if (americanToBritishTitles.hasOwnProperty(word)) {
        //   processedText.push(
        //     `<span class="highlight">${americanToBritishTitles.word}</span>`
        //   );
        // } else {
        //   processedText.push(word);
        // }
      } else {
      }

      processedText.push(processedWord);
    }

    return processedText.join(" ");
  }
}

module.exports = Translator;

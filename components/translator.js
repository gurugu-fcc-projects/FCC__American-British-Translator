const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  translate(text, locale) {
    const preparedText = text.trim().split(" ");
    console.log(preparedText);
    const processedText = [];

    for (const [i, word] of preparedText.entries()) {
      let processedWord = "";

      if (locale === "american-to-british") {
        /* Handle titles */
        if (i !== preparedText.length - 1 && word.endsWith(".")) {
          processedWord = americanToBritishTitles[word.toLowerCase()]
            ? word.slice(0, -1)
            : word;
        } else {
          processedWord = word;
        }
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

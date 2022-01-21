"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    if (
      !req.body.hasOwnProperty("text") ||
      !req.body.hasOwnProperty("locale")
    ) {
      return res.json({ error: "Required field(s) missing" });
    }

    if (req.body.text.length === 0) {
      return res.json({ error: "No text to translate" });
    }

    const { text, locale } = req.body;

    const translation = translator.translate(text, locale);

    res.json({ text, translation });
  });
};

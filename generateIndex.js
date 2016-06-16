"use strict"

const fs = require('fs')
const countryColors = require('./data/countryColors.js').getAll()

let parrotsSpans = countryColors.map((countryObject) => {
  let img = `<img src="/parrots/${countryObject.name.toLowerCase().replace(' ', '-')}-parrot.gif"/>`
  let span = `<span>${img}${countryObject.name.toLowerCase().replace(' ', '-')}-parrot</span>`
  return span
}).join('')

let index = fs.readFileSync(`index_template.html`, "utf8");
    index = index.replace('{{parrots}}', parrotsSpans);

fs.writeFileSync("index.html", index, "UTF-8",{'flags': 'w+'});

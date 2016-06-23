"use strict"

const fs = require('fs')
const countryColors = require('./data/countryColors.js').getAll()

let parrotsSpans = countryColors.map((countryObject) => {
  let name = countryObject.name.toLowerCase().replace(' ', '-')
  let src = `/parrots/${name}-parrot.gif`;
  let img = `<a href="/parrots/${name}-parrot.gif"><img src="${src}"/></a>`
  let span = `<span>${img}${name}-parrot</span>`
  return span
}).join('')

let index = fs.readFileSync(`index_template.html`, "utf8");
    index = index.replace('{{parrots}}', parrotsSpans);

fs.writeFileSync("index.html", index, "UTF-8",{'flags': 'w+'});

"use strict"

const fs = require('fs')
const countryColors = require('./data/countryColors.js').getAll()

const parrotsSpans = countryColors.map((countryObject) => {
  const name = countryObject.name.toLowerCase().split(' ').join('-')
  const src = `/parrots/${name}-parrot.gif`;
  const img = `<a href="/parrots/${name}-parrot.gif"><img src="${src}"/></a>`
  const span = `<span>${img}${name}-parrot</span>`
  return span
}).join('')

let index = fs.readFileSync(`index_template.html`, "utf8");
    index = index.replace('{{parrots}}', parrotsSpans);

fs.writeFileSync("index.html", index, "UTF-8",{'flags': 'w+'});


var _countryColors = require('./countryColors.json');

var countryColors = _countryColors.map(function(country){
  var filteredColors = country.colors.map(function(color){
    //filter out colors less than 3%
    if(color.percent < 3) return null;
    else return color.hex;
  })

  country.colors = filteredColors.filter(function(n){ return n != undefined });

  return country;
});

countryColors = [].concat.apply([], countryColors);
countryColors = countryColors.filter(function(n){ return n != undefined });

function getAll() {
  return countryColors;
}

function find(name) {
  return countryColors.filter(function(brand){
    return brand.name === name;
  });
}

exports.getAll = getAll;
exports.find = find;
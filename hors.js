Horseman = require('node-horseman');
var fs = require("fs")
var moment =require("moment")
var horseman = new Horseman({
  injectJquery: true,
  ignoreSSLErrors: true,
  webSecurity: false,
  loadImages: false,
});
var resp = {}
var agenda
var firstDay = "http://horaire.uclouvain.be/direct/index.jsp?displayConfName=webEtudiant&showTree=false&showOptions=false&login=etudiant&password=student&projectId=2&code=EDPH13BA&weeks=0"
var firstDate = 0
var daysPixel = []

horseman
  .viewport(3200,1800)
  .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
  .open(firstDay)
  .wait(1500)
  .screenshot("image.jpg")
  .text("#2")
  .then(function(text) {
    firstDate = text.split(" ")[1].trim()
    firstDate = moment(firstDate, "DD/MM/YYYY").unix();
    resp["firstDateInBrut"] =text
    resp["firstDateFormatted"] =firstDate
    fs.writeFile('FirstDay.json',JSON.stringify(resp), function (err) {
      if (err) throw err;
      console.log('saved to FirstDay.json');
    })
  })
  .close();
var horseman = new Horseman({
  injectJquery: true,
  ignoreSSLErrors: true,
  webSecurity: false,
  loadImages: false,
});

setTimeout(function(){
var difference = Math.floor(parseFloat(Math.abs(firstDate - moment().unix())/(60*60*24*7)));
console.log("---------------------------")
console.log("---------------------------")
console.log("---------------------------")
console.log("---------------------------")

console.log(difference)
console.log("---------------------------")
console.log("---------------------------")
console.log("---------------------------")
console.log("---------------------------")
var url = "http://horaire.uclouvain.be/direct/index.jsp?displayConfName=webEtudiant&showTree=false&showOptions=false&login=etudiant&password=student&projectId=2&code=EDPH13BA&weeks="+difference


  horseman
    .viewport(3200,1800)
    .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
    .open(url)
    .wait(3000)
    .screenshot("url.jpg")
    .evaluate(function getDivs(){
      var $divs = $(".event");
      var daysInWeek = ["lundi",'mardi',"mercredi","jeudi","vendredi","samedi","dimanche"]
      return $divs.map(function (index, $div) {
        // let el = $("#div"+index)
        $el = $("#inner"+index)
        label = $el.attr("aria-label").split("null");
        positionleft = Math.floor($el.offset().left)
        positionColumn = parseInt((positionleft / 3200 * 100) * 0.07)

        tmp = {
          id: index,
          column: positionColumn,
          jour:daysInWeek[positionColumn],
          code: label[0].trim(),
          titre: label[1].trim(),
          professeur: label[2].trim(),
          local: label[3].trim(),
          heure: label[4].trim()
        }
        return tmp
      }).get();
    })
    .then(async function (divs){
      // this uses async/await, but you can use some recursive function or some other async looping logic
      for(var div of divs) {
        // use the .open() method with the gathered href'<</s>

        console.log(div)
        console.log("----------------------------------")
      }
    })
    .close();

},3000)

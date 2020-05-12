let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let celifile = process.argv[3]
let fs = require("fs");
let cheerio = require('cheerio');
let request = require("request");
//scrapping
request("https://www.gadgetsnow.com/tech-news/10-most-followed-indians-on-twitter-in-2017/articleshow/61930978.cms", function (err, res, html) {
  if (err == null && res.statusCode === 200) {
    parseHtml(html);
  } else if (res.statusCode === 404) {
    console.log("Invalid URL...");
  } else {
    console.log(err);
    console.log(res.statusCode);
  }
});
function parseHtml(html) {
  let d = cheerio.load(html);
  let names = d(".Normal a").text();
  // fs.writeFileSync("bob.html",names)
  let celebritynames = names.split("@")
  let jsonArray = [];
  for (let i = 0; i < celebritynames.length; i++) {
    jsonArray.push({ "idx": i, "names": celebritynames[i] });
  }
  // console.log(names.split("@"))
  fs.writeFileSync("topcelebrity.js", JSON.stringify(jsonArray));
  console.log(JSON.stringify(jsonArray));
}

//  automation***********************************
(async function () {

  try {
    let data = await fs.promises.readFile(cFile);
    let celidata = await fs.promises.readFile(celifile);
    let { url, pwd, user } = JSON.parse(data);
    let celilist = JSON.parse(celidata)
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized", "--disable-notifications"]
    });
    // tab
    let tabs = await browser.pages();
    let tab = tabs[0]
    await tab.goto(url, { waitUntil: "networkidle2" });
    await tab.waitForSelector("input[type=text]");
    await tab.type("input[type=text]", user, { delay: 120 });
    await tab.waitForSelector("input[type=password]");
    await tab.type("input[type=password]", pwd, { delay: 120 });

    await Promise.all([
      tab.click(".css-18t94o4.css-1dbjc4n.r-urgr8i.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-1w2pmg.r-vlx1xi.r-zg41ew.r-1jayybb.r-17bavie.r-15bsvpr.r-o7ynqc.r-6416eg.r-lrvibr"),
      tab.waitForNavigation({
        waitUntil: "networkidle2"
      })
    ])



    for (let i = 4; i < celilist.length; i++) {
     
      console.log(celilist[i])
      await tab.waitForSelector("input[data-testid=SearchBox_Search_Input]", { visible: true })
      await tab.type("input[data-testid=SearchBox_Search_Input]", celilist[i].names, { delay: 120 })
      
      tab.keyboard.press("Enter")
      // await Promise.all([ 
       
      //   // tab.waitForNavigation({ waitUntil: "networkidle2" })
      // ])
      await tab.waitForSelector("input.r-30o5oe.r-1niwhzg")
      let elementHandle = await tab.$("input.r-30o5oe.r-1niwhzg")
      await  elementHandle.click();
      // await tab.waitForSelector(".css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wtj0ep",{visible : true})
      // await Promise.all([
      //   tab.click(".css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wtj0ep"),
      //   tab.waitForNavigation({
      //     waitUntil: "networkidle2"
      //   })
      // ])
      // tab.waitForNavigation({ waitUntil: "networkidle2" })
    //   let links=await tab.$$(".css-4rbku5.css-18t94o4.css-1dbjc4n.r-1loqt21.r-1wbh5a2.r-dnmrzs.r-1ny4l3l",{visible: true})
    // let link=await tab.evaluate(function(nextbtn){
    //   return nextbtn.getAttribute("href")
    // },links[0])
    // console.log(link)
        // await tab.goto(`https://twitter.com${link}`)
          await Promise.all([
           elementHandle.press('Control'),
         elementHandle.press('A'),
        elementHandle.press('Backspace'),
        tab.waitForNavigation({ waitUntil: "networkidle2" })
       ])

      
      //  await tab.waitForSelector(".css-901oao.r-1awozwy.r-13gxpu9.r-6koalj.r-18u37iz.r-16y2uox.r-1qd0xha.r-a023e6.r-vw2c0b.r-1777fci.r-eljoum.r-dnmrzs.r-bcqeeo.r-q4m81j.r-qvutc0");
      // let follow = await tab.$(".css-901oao.r-1awozwy.r-13gxpu9.r-6koalj.r-18u37iz.r-16y2uox.r-1qd0xha.r-a023e6.r-vw2c0b.r-1777fci.r-eljoum.r-dnmrzs.r-bcqeeo.r-q4m81j.r-qvutc0");
      // await follow.click({delay:120});
         
       
      
    }
  }
  catch (err) {
    console.log(err)
  }
})()


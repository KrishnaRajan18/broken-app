const fs = require("fs");
const process = require("process");
const axios = require("axios");

function getURLs(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`error reading ${path}: ${err}`);
      process.exit(1);
    }
    let urlList = data.toString().split("\n");
    for (let url of urlList) {
      if (url) {
        try {
          getContentsFromUrl(url);
        } catch (err) {
            console.log(err);
        }
      }
    }
  });
}

async function getContentsFromUrl(url) {
  try {
    await axios.get(url).then(function (resp) {
      fs.writeFile(resp.request.host, resp.data, "utf8", function (err) {
        if (err) {
          
          console.log(`Couldn't write ${url}`);
        } else {
            console.log(`Wrote to ${resp.request.host}`);
        }
      });
    });
  } catch (err) {
    console.log(`Couldn't download ${url}`);
  }
}


getURLs(process.argv[2]);
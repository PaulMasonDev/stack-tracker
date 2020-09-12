const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const htmlToText = require('html-to-text');

// const scraperapiClient = require('scraperapi-sdk')('2c16addec87232b6f98f8112b28160f8')

// q=Web%20Developer    THIS IS THE SEARCH TERM
// max=5 TELLS THE MAXIMUM AMOUNT OF JOBS TO LIST
// l=Lagos country=us USE TO INDENTIFY LOCATION, MAY ALSO USE A ZIP CODE
// sort=date SORT BY NEWEST

const url = "https://indreed.herokuapp.com/api/jobs?q=Web%20Developer&l=New%20York&country=us";

let testUrl;

const port = 5000;
let techStack = [
  { name: 'html',
    count: 0
  },
  { name: 'css',
    count: 0
  },
  { name: 'javascript',
    count: 0
  },
  { name: 'node',
    count: 0
  },
  { name: 'mongodb',
    count: 0
  },
  { name: 'sql',
    count: 0
  },
  { name: 'python',
    count: 0
  },
  { name: 'django',
    count: 0
  },
  { name: 'php',
    count: 0
  },
  { name: 'react',
    count: 0
  },
];

app.get('/', async (req, res) => {
  await axios.get(url)
  .then(async res => {
    for (job of res.data) {
      const response = await axios.get(job.url);
      const $ = cheerio.load(response.data);
      const textData = await htmlToText.fromString($('body').html());
      // console.log(textData);
      techStack.map(tech => {
        if (textData.toLowerCase().includes(tech.name)) {
          tech.count++
        }
      })
    }
    for ( tech of techStack) {
      console.log(tech.name, tech.count);
    }
  })  
  .catch(err => console.log(err));
  res.end();
});


app.listen(port, (req, res) => {
  console.log(`Connected on port ${port}`);
});
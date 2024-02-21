// NOTE:
//file system

// const fs = require("fs");

//Blocking code (Synchronous way)

/* const readFile = fs.readFileSync("./txt/input.txt", "utf-8"); //Blocking
console.log(readFile);

const textOut = `you know what is my name .. this is what you have to know about me ok ${readFile} in ${Date.now()}`;
console.log(textOut); */

// non_blocking code (Asynchronous way)

/* console.log("async started");
fs.readFile("./txt/start.txt", "utf-8", (err, data) => console.log(data));
console.log("async end");
 */

//  callback problem when occures use ES8 aysnc await let see

/* console.log("async started");
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    // console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      // console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n ${data3}`, "utf-8", (err) =>
        console.log("your file has been written")
      );
    });
  });
});
console.log("async end");
 */
//////////////////////////////////////////////////////////////////////////
// NOTE:
// server

/* // creating a web server
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello from server");
});

//go to browser and search 127.0.0.1:8000

server.listen(8000, "127.0.0.1", () => {
  console.log("listing to request on port 8000");
}); 


// same thing happend by this ... go to browser and search localhost:8000

// server.listen(8000, () => {
//   console.log("listing to request on port 8000");
// });

 */

/////////////////////////////////////////////////
// NOTE:
//Routing // we will use Express to handle Routing but in next lecture
// Routing simply means diffrent action on diffrent URL

/* const url = require("url");

const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url); // here i am changing ok!!! //FIXME:
  res.end("Hello from server");
});

//go to browser and search 127.0.0.1:8000 and reload so you get
// /
// /favicon.ico
//  these two line in console bcz callback function is running twice

server.listen(8000, "127.0.0.1", () => {
  console.log("listing to request on port 8000");
});

// if we search http://localhost:8000/overview
// then we get one line in console
// /overview
// /favicon.ico
 */
// now see

/* const url = require("url");

const http = require("http");
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("Hello from OVERVIEW");
  } else if (pathName === "/product") {
    res.end("Hello from PRODUCT");
  } else {
    res.writeHead(404, {         //FIXME: writting header
      "Content-type": "text/html",
      "my-own-header": "Hello world from my own header",
    });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listing to request on port 8000");
});
 */
// NOTE:
// ////////////////////////////////
// creating API
// basically API is service where we can request a data.
// or in other words:- An API, or application programming interface, is a set of rules or protocols that let software applications communicate with each other to exchange data, features and functionality.
// here i am using data.json which is in dev-data folder

/* const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("Hello from OVERVIEW");
  } else if (pathName === "/product") {
    res.end("Hello from PRODUCT");
  } else if (pathName === "/api") {


    // here i am doing changes      FIXME:


    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productionData = JSON.parse(data);
      // console.log(productionData);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    });

                                     FIXME:
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello world from my own header",
    });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listing to request on port 8000");
}); */
// NOTE:
//  i am going to write same with Sync code means blocking code but is not going to block anything because it is not in any scope it is declared outside of scope now see so it only run first time when program is starting.

/* const http = require("http");
const fs = require("fs");
// ****************************************************************
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productionData = JSON.parse(data);
// ****************************************************************

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    //Overview Page
    res.end("Hello from OVERVIEW");
  } else if (pathName === "/product") {
    //Product Page
    res.end("Hello from PRODUCT");
  } else if (pathName === "/api") {
    //Handling API
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data); // this data come from 164 line

    // Not Found page
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello world from my own header",
    });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listing to request on port 8000");
}); */

// *********************************************************
// NOTE:
// now making small project using node js
//  now using template-overview and template-product from template folder
// and we use {%_____%} this here but we can use ejs templates from npm package

/* const http = require("http");
const fs = require("fs");
// ****************************************************************
//
// step 4 :FIXME: here i am addressing path where we are going to replace all these thing

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.discription);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

//  step 1 : reading file FIXME:
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);
// ****************************************************************
NOTE:
// step 2 : creating a server with enable routing FIXME:
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    //Overview Page
    res.writeHead(200, { "Content-type": "text/html" });
NOTE:
    // step 3: replace template which is in template-overview file FIXME:
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    // console.log(cardsHtml);
    res.end(output);
  } else if (pathName === "/product") {
    //Product Page
    res.end("Hello from PRODUCT");
  } else if (pathName === "/api") {
    //Handling API
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data); // this data come from 150 line

    // Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text-html",
      "my-own-header": "Hello world from my own header",
    });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listing to request on port 8000");
}); */

// ////////////////////////////////////////////////////////////////////////
//  Passing Variable from URL (same code which is writting above page)
// NOTE:

/* const http = require("http");
const fs = require("fs");
const url = require("url");

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.discription);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);

// ????????????????????????????????????????????????????????????? FIXME:
const server = http.createServer((req, res) => {
  // console.log(req.url); // here i am going to change
  // console.log(url.parse());
  // console.log(url.parse(req.url true));
  const { query, pathname } = url.parse(req.url, true);

  // ????????????????????????????????????????????????????????????? FIXME:

  if (pathname === "/" || pathname === "/overview") {
    //Overview Page
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    // console.log(cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
        // res.end('this is product page');

    // ????????????????????????????????????????????????????????????? FIXME:
    //Product Page
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    // console.log(output);
    // console.log(query);
    res.end(output);

    // ????????????????????????????????????????????????????????????? FIXME:


    //Handling API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data); // this data come from 150 line

    // Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text-html",
      "my-own-header": "Hello world from my own header",
    });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listing to request on port 8000");
});
 */

// using our own module
// means for example we make a function and we export that and in other file we import that and use overthere same as react where we use our own HOOK
// NOTE:

//  in above code we have replaceTemplate  function.... and if we want to reuse anywhere so we need to make a module for it let see how we do that

// node js treated every single file as a module

//  i am going to make replace-template.js file and put replaceTemplate function overthere and export that and use here... i am writing same code here again

/* const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./modules/replace-template");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    //Overview Page
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    // console.log(cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    //Product Page
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    // console.log(output);
    // console.log(query);
    res.end(output);

    //Handling API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data); // this data come from 150 line

    // Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text-html",
      "my-own-header": "Hello world from my own header",
    });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listing to request on port 8000");
}); */

// NOTE:
// now we have to talk about NPM (NODE PACKAGE MANAGER)
// install npm init command for making package.json file

/*  now we see two types of packages (local download and global download)
 simple or regular dependencies
 like express is framework of node and it is a dependencies
 slugify:- we use this package for more readable URL
 npm i slugify
 npm i nodemon --save-dev
 for restart server automatically
  now we install nodemon globally so we can use it from anywhere
 npm i nodemon --global
 now before we run our file like node index.js but after nodemon ,we use nodemon index.js
 we  write   "start": "nodemon index.js" in script now we can use npm start cmd
*/
// NOTE:
// now we learn 3rd party modules from npm registry
// all the requiring on the top and then 3rd party then our own module from our local system

const http = require('http');
const fs = require('fs');
const url = require('url');
// ?????????????????????????????????????????????????????????????
// 3rd party module
const slugify = require('slugify');
// slugify is for create a slug means a last part of URL that contains a unique string that identify that resource that website is displaying

// in other words:- Slugify is a method used to create a unique string of characters that appears at the end of a URL. The slug identifies the specific resource being displayed on the website

// ?????????????????????????????????????????????????????????????

const replaceTemplate = require('./modules/replace-template');

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const dataObj = JSON.parse(data);
// ?????????????????????????????????????????????????????????????
// console.log(slugify("Fresh Avacados", { lower: true }));

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);

// ?????????????????????????????????????????????????????????????

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    //Overview Page
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    // console.log(cardsHtml);
    res.end(output);
  } else if (pathname === '/product') {
    //Product Page
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    // console.log(output);
    // console.log(query);
    res.end(output);

    //Handling API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data); // this data come from 150 line

    // Not Found
  } else {
    res.writeHead(404, {
      'Content-type': 'text-html',
      'my-own-header': 'Hello world from my own header',
    });
    res.end('<h1>Page not Found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('listing to request on port 8000');
});

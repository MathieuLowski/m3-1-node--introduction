"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { query } = require("express");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const messageArray = [
      "Don't monkey around me",
      "🐵",
      "If you pay peanuts, you get monkeys",
      "🙈",
      "I fling 💩 at you!",
      "🙉",
    ];

    const allMessage = [Math.floor(Math.random() * messageArray.length)];
    const message = { authpor: "monkdey", text: messageArray[allMessage] };
    const randomTime = Math.floor(Math.random() * 4000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  //fetch("/parrot-message?text=hello")
  .get("/parrot-message", (req, res) => {
    //console.log(req.query);
    let parrotAnsw = req.query.text;
    const message = { author: "parrot", text: parrotAnsw }; //If changing author:"parrot" to "user" message will b rendered on user side.
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    console.log(req.query.text);
    const getBotMessage = (text) => {
      const commonGreetings = ["hi", "hello", "howdy"];
      const commonGoodbyes = ["ciao", "bye", "goodbye", "peace"];
      let botMsg = "";
      if (commonGreetings.includes(text.toLowerCase())) {
        botMsg = "Hello!";
      } else if (commonGoodbyes.includes(text.toLowerCase())) {
        botMsg = "Au revoir my friend";
      } else botMsg = "Bzzt " + req.query.text;
      return botMsg;
    };

    let botAnsw = getBotMessage(req.query.text);
    const message = { author: "bot", text: botAnsw }; //If changing author:"parrot" to "user" message will b rendered on user side.
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));

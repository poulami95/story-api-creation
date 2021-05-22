var express = require("express");
const bodyParser = require("body-parser");
const url = require("url");
const querystring = require("querystring");
const { dynamicStories } = require("./views/dynamic-story");
//const Article = require("./assets").Article;

const app = express();
const port = process.env.PORT || 3000;

//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.set("Access-Control-Allow-Origin: *");
  /* if (req.method !== "POST") {
    return res.status(403).send("Forbidden!");
  } */
  res.render("slider");
  //res.render("index"); // index refers to index.ejs
});

app.get("/api/getImagesForStory", async (req, res) => {
  try {
    let urlArr = req.query.imageUrl.split(",");
    let url = req.query.imageUrl;
    console.log(urlArr);
    let webStory = await dynamicStories(urlArr);
    //res.send("Congo you are able to read query string, url entered: " + url);
    //res.write("./views/dynamic-story", { root: __dirname });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(webStory);
    res.end();
  } catch (error) {
    console.log(error);
    res.send("Error while fetching the data" + error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}..`));

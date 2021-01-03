// import required core modules
const fs = require("fs"); // file system
const http = require("http"); // networking/server
const url = require("url"); // pathing


// import our own modules... this module is used to replace
// placeholder data in our templates with data from our data.json
const replaceTemplate = require("./modules/replaceTemplate");
const pokemonReplaceTemplate = require("./modules/pokemonReplaceTemplate");

// read the overview template html file
const tempOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
// read the card template html file
const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");

const tempPoke = fs.readFileSync('./templates/template-pokemon.html', 'utf-8');
const tempPokeCard = fs.readFileSync('./templates/template-pokemon-card.html', 'utf-8');

// reads our data.json file
const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const pokeData = fs.readFileSync('./dev-data/pokemon.json', 'utf-8');

// parse our data.json into an array containing each object
const dataObject = JSON.parse(data);
const pokeObject = JSON.parse(pokeData);

// create our webserver
const server = http.createServer((req, res) => {
  // assign the query and pathname to variables
  const { query, pathname } = url.parse(req.url, true);
  console.log(query, pathname);

  // ROUTING

  // Overview Page
  if (pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    // using our replaceTemplate module, we will use our dataObject
    // to map a new array, removing the placeholders and filling in
    // the correct information. Then we join everything together
    // to generate our html. This will perform for every object inside
    // our dataObject array.
    // const cardsHtml = dataObject
    //   .map((el) => replaceTemplate(tempCard, el))
    //   .join("");

    // const output = tempOverview.replace("{%PERSON_CARDS%}", cardsHtml);

    const pokeCardsHtml = pokeObject.map(el => pokemonReplaceTemplate(tempPoke, el)).join('');
    const output = tempOverview.replace('{%POKEMON_CARDS%}', pokeCardsHtml);
    res.end(output);

    // Pokemon page
  } else if (pathname === "/pokemon") {
    res.writeHead(200, { "Content-type": "text/html" });
    const pokemon = pokeObject[query.id - 1];
    const output = pokemonReplaceTemplate(tempPokeCard, pokemon);
    res.end(output);
  }

  if (pathname.startsWith("/assets")) {
    fs.readFile(__dirname + req.url, (err, data) => {
      res.writeHead(200);
      res.end(data);
    });
  } 
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// REST Countries URL
const url = "https://restcountries.com/v3.1/all";

let data = [];
let countries = [], populous = [], regions = [];
let isPopulationDataCalculated = false;

app.get("/", async (req, res) => {
  // render pug template for the index.html file

  data = await fetch(url)
    .then(data => data.json())
    .then(data => data)
    .catch(e => {
        console.log(e);
        return [];
      }
    );

  res.render("index", {
    heading: "Countries of the World",
    main: "Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world"
  });
});

app.get("/capitals", (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array
  countries = data
    .map((country, i) => `${country.name.common}  ${country.capital && country.capital[0] ? (`- ${country.capital[0]}`) : ""}`)
    .sort()

  res.render("page", {
    heading: "Countries and Capitals",
    results: countries
  });
});

app.get("/populous", (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  if (!isPopulationDataCalculated) {
    data.forEach(country => {
      if (country.population >= 50000000) {
        populous.push(country);
      }
    });
    populous = populous
      .sort((a, b) => b.population - a.population)
      .map(country => `${country.name.common} - ${country.population.toLocaleString()}`);
    isPopulationDataCalculated = true;
  }


  res.render("page", {
    heading: "Most Populous Countries",
    results: populous
  });
});

app.get("/regions", (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array
  let regionObject = {};
  data.forEach(country => {
    if (regionObject[country.region]) {
      regionObject[country.region]++;
    } else {
      regionObject[[country.region]] = 1;
    }
  });
  for (let [key, value] of Object.entries(regionObject)) {
    regions.push(`${key} - ${value}`);
  }

  res.render("page", {
    heading: "Regions of the World",
    results: regions
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

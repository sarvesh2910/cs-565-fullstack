/* Exercise 04 - API */

const url = "https://restcountries.com/v3.1/all";

// Add your code here
const getData = () => {
  const list = document.getElementById("results");
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      list.innerHTML = "";
      const allCountries = data;
      allCountries.forEach((item, index) => {
        const node = document.createElement("p");
        const text = `${index + 1}. ${item.name.common} - ${parseInt(
          item.population,
          10
        ).toLocaleString()}`;
        node.innerText = text;
        list.appendChild(node);
      });
    })
    .catch((e) => {
      console.log("error", e);
      list.innerHTML = "Error occured";
    });
};
getData(url);

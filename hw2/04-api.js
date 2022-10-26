/* Exercise 04 - API */

const url = "https://restcountries.com/v2/all";

// Add your code here
const getData = () => {
  const list = document.getElementById("results");
  fetch(url)
    .then((data) => data.json())
    .then((allCountries) => {
      list.innerHTML = "";
      const fragment = new DocumentFragment();
      allCountries.forEach((item) => {
        const node = document.createElement("li");
        const text = `${item.name} - ${parseInt(
          item.population,
          10
        ).toLocaleString()}`;
        node.innerText = text;
        fragment.appendChild(node);
      });
      list.appendChild(fragment);
    })
    .catch((e) => {
      console.log("error", e);
      list.innerHTML = "Error occured";
    });
};
getData(url);

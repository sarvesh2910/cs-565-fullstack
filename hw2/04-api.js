/** Exercise 04 - API **/

const url = "https://restcountries.com/v3.1/all";

// Add your code here
const getData = () => {
  let list = document.getElementById("results");
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      list.innerHTML = "";
      const allCountries = data;
      console.log(data);

      allCountries.map((item, index) => {
        let node = document.createElement("p");
        let text = `${index + 1}. ${item.name.common} - ${parseInt(item.population).toLocaleString()}`;
        node.innerText = text;
        list.appendChild(node);
      });
    }).catch(e => {
    console.log("error", e);
    list.innerHTML = "error occured";
  });
};
getData(url);

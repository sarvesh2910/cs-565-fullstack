const http = require("http");
const urlParser = require("url");
const port = process.env.PORT || 5001;

const getRoutes = (routes) => {
  let result = "";
  routes.forEach(
    (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
  );
  return result;
};

const tableGenerator = (tableData) => {
  let tableRows = "";
  for (const [key, value] of Object.entries(tableData)) {
    tableRows += tableRowsGenerator(key, value);
  }
  return `<table style=' border: 1px solid black;'>${tableRows}</table>`;
};

const tableRowsGenerator = (key, value) => {
  return `<tr style = 'border: 1px solid black;'>
    <td style=' border: 1px solid black;'>${key}</td>
    <td style=' border: 1px solid black;'>${value}</td>
  </tr>`;
};

const server = http.createServer((req, res) => {
  const routes = [
    "/attributes?hello=world&lorem=ipsum",
    "/items?first=1&second=2&third=3&fourth=4",
    "/characters?spongebob=squarepants&patrick=star&sandy=cheeks",
  ];

  res.writeHead(200, { "Content-Type": "text/html" });
  if (req.url === "/") {
    const routeResults = getRoutes(routes);
    res.write(`<h1>Exercise 02</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
  } else {
    const queryObject = urlParser.parse(req.url, true).query;
    res.write(`<p><a href="/">Home</a></p>`);
    res.write(tableGenerator(queryObject));
  }
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

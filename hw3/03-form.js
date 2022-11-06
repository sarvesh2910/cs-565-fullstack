const http = require("http");
const port = process.env.PORT || 5001;
const staticServe = require("node-static");
const querystring = require("querystring");

const file = new staticServe.Server("./");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(302, { Location: "/form" });
    res.end();
  } else if (req.method === "GET" && req.url === "/form") {
    file.serveFile("03-form.html", 200, {}, req, res);
  } else if (req.method === "POST" && req.url === "/submit") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const data = querystring.parse(body);
      res.setHeader("Content-Type", "text/html");
      res.write(`<p>Name = ${data.name}</p>`);
      res.write(`<p>Email = ${data.email}</p>`);
      res.write(
        `<p>Feedback = ${
          data.feedback ? data.feedback : "No feedback was submitted."
        }</p>`
      );
      res.write(
        `<p>Newsletter = ${
          data.newsletter
            ? "Yes, I would like to receive news letters"
            : "No, thank you."
        }</p>`
      );
      res.end();
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(404);
    res.write("<h2>404 - page not found</h2>");
    res.end();
  }
});
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

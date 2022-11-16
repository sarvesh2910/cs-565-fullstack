const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5001;

// Add your code here
app.use(
  session({
    store: new session.MemoryStore(),
    secret: "abcd",
    resave: false,
    saveUninitialized: true
  })
);

app.get("/favicon.ico", (req, res) => res.status(204));

app.use((req, res, next) => {
  res.setHeader("content-type", "text/html");
  res.write(`<p>Currently on route: ${req.url}</p>`);
  if (req.session.previousUrls) {
    req.session.previousUrls.push(`${req.url}`);
    res.write(`<p>Previously Visited:</p>`);
    req.session.previousUrls.forEach(url => {
      res.write(`<p>${url}</p>`);
    });
  } else {
    req.session.previousUrls = [];
    req.session.previousUrls.push(`${req.url}`);
  }
  next();
});

app.get("/*", (req, res) => {
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

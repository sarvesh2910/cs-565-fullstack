const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static("public"));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post("/submit", (req, res) => {
  // Add your code here
  const { name, email, feedback, newsletter } = req.body;
  res.setHeader("Content-Type", "text/html");
  res.write(`
  <p>Name = ${name}</p> 
  <p>Email = ${email}</p>
  <p>Feedback = ${feedback ? feedback : "No feedback was submitted."}</p>
  <p>Newsletter = ${
      newsletter
        ? "Yes, I would like to receive news letters"
        : "No, thank you."
    }
  </p>`
  );
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

import Express from "express";


const app = Express();
const PORT = 8080;

app.use(Express.static('public'));

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.get("/about", (req, res) => {
    res.sendFile("about.html");
});

app.listen(PORT, () => console.log("listening on port " + PORT));
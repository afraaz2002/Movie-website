import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
let port = 3000;

let apiUrl = "https://api.themoviedb.org/3/";
let apiKey = "375a1409d7a01ec26b70b7d19080963a";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",async (req,res) => {
    try {
        const response1 = await axios.get(`${apiUrl}discover/movie?sort_by=popularity.desc&page=1&api_key=${apiKey}`);
        const response2 = await axios.get(`${apiUrl}discover/movie?sort_by=popularity.desc&page=3&api_key=${apiKey}`);
        
        const result =  response1.data.results.concat(response2.data.results) ;

        res.render("index.ejs", { data: result });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
})

app.post("/showMovie",async (req,res) => {
    let movieName = req.body.movieName;
    try {
        const response = await axios.get(`${apiUrl}search/movie?query=${movieName}&api_key=${apiKey}`);
        const result = response.data.results;
        res.render("index.ejs", { data: result });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
})

app.listen(port,() => {
    console.log("Server listening on port "+port);
})
const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
let db = null;
const app = express();
app.use(express.json());

let dbPath = path.join(__dirname, "moviesData.db");

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running successfully");
    });
  } catch (e) {
    console.log(`DB Error : ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

const convertDBObjectToResponseObject = (dbObject) => {
  return {
    movieId: dbObject.movie_id,
    directorId: dbObject.director_id,
    movieName: dbObject.movie_name,
    leadActor: dbObject.lead_actor,
  };
};

//get all movies
app.get("/movies/", async (request, response) => {
  try {
    const moviesQuery = `SELECT * FROM movie ORDER BY movie_id`;
    const moviesArray = await db.all(moviesQuery);
    respond.send(
      moviesArray.map((eachMovie) => convertDBObjectToResponseObject(eachMovie))
    );
  } catch (e) {
    console.log(`DB Error :${e.message}`);
    process.exit(1);
  }
});

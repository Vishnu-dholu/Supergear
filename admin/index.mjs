import express from "express";
import "dotenv/config";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { readdirSync } from "fs";

/* Initialize the Express app */
const app = express();
const port = process.env.PORT || 8000;

/* Apply middleware */
app.use(cors()); /* Enable CORS for all routes */
app.use(express.json()); /* Parse incoming JSON requests */

/* Get the current file name and directory path */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Resolve the path to the routes directory */
const routesPath = path.resolve(__dirname, "./routes");

/* Read all files in the routes directory */
const routesFiles = readdirSync(routesPath);

/* Dynamically import and use each route module */
routesFiles.map(async (file) => {
  /* Import the route module */
  const routeModule = await import(`./routes/${file}`);
  /* Use the route module in the app, expecting the route module to export default */
  app.use("/", routeModule.default);
});

/* Define a route for the root URL */
app.get("/", (req, res) => {
  /* Send the index.html file from the public directory */
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

import morgan from "morgan";
import express from "express";
import cors from "cors";
import bodyParser  from "body-parser";
import { config } from "dotenv";
config();

import db from "./db/connection.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
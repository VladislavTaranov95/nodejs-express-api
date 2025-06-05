const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotEnv = require("dotenv");
const router = require("./router/index");
const handleErrorMiddleware = require("./middlewares/error.middleware");

dotEnv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/front/dist"));

app.use("/api", router);

app.use(handleErrorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

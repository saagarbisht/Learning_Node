require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const staticRoute = require("./routes/static");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const { checkForAuthentication } = require("./middleware/authentication");

const app = express();
const port = process.env.PORT||8000;

mongoose
.connect(process.env.MONGO_URL)
.then((e) => console.log("mongodb connected..."))
.catch((e) => console.log("unable to connect..."))

app.set("views",path.resolve("views"));
app.set("view engine","ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/",staticRoute);
app.use("/user",userRouter);
app.use("/blog",blogRouter);

app.listen(port, () =>{
    console.log(`server is live at port ${port}`)
})
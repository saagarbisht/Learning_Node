const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectingToMongoDB } = require("./connection");
const staticRoute = require("./routes/static");
const urlRoute = require("./routes/shortUrl");
const userRoute = require("./routes/user");
const { checkAuth, restrictToUser } = require("./middlewares/auth");

const app = express();
const PORT =  8000;

connectingToMongoDB("mongodb://localhost:27017/URL_Shortner")
.then(() => console.log("Conecting to MongoDB..."))
.catch(() => console.log("Unable to connect..."))

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());  

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use("/", checkAuth, staticRoute);
app.use("/url", restrictToUser, urlRoute);
app.use("/user", userRoute);

app.listen(PORT,() => {
    console.log(`Server is live at Port ${PORT}`)
});

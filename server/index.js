require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const index = require("./routes/index")
const user = require("./routes/users")
const recipeOrder = require("./routes/recipeOrder")

//connect db
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));


// app.use(bodyParser());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/", index);
app.use("/user",user)
app.use("/order",recipeOrder)

app.listen(process.env.PORT || 3000, () => console.log("server started"));

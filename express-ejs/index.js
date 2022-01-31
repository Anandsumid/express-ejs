const express = require("express");
const apiRoutes = require("./routes/api")
const adminRoutes = require("./routes/admin")
const app = express();

app.use(express.json())
app.use(express.static("public"))

app.use("/api", apiRoutes)
app.use("/", adminRoutes)

const port = 3001
app.listen(port,()=>{
  console.log(`Server is running on ${port}`)
});

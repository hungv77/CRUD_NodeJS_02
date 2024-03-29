import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from 'body-parser';
import connection from "./config/connectDB";
import configCors from "./config/cors"
import cookieParser from 'cookie-parser';

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

//Config CORS
configCors(app);

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser());

//test connection db
// connection();

//init web routes
initWebRoutes(app);
initApiRoutes(app);

app.use((req,res) => {
  return res.send('404 not found')
})

app.listen(PORT, ()=> {
  console.log(">>> Backend is running on the port = ", +PORT);
})
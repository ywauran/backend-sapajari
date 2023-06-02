import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import FileUpload from "express-fileupload";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import LetterRoute from "./routes/LetterRoute.js";
import NumberRoute from "./routes/NumberRoute.js";
import CategoryLesson from "./routes/CategoryLessonRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  await db.sync();
})();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AuthRoute);
app.use(NumberRoute);
app.use(LetterRoute);
app.use(CategoryLesson);

store.sync();

app.get("/", (req, res) => res.send("<h1>Backend SapaJari</h1>"));

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});

import express from "express";
import authRouter from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(authRouter);


app.listen(8080, () => console.log(`Server is running...`));
import express from "express";
const app = express();

export default function apiInfinity() {
    require("./infinity/alias").default(app);
    return app;
}

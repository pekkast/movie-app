"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
dotenv_1.config();
const app = express_1.default();
const PORT = 8000;
const nytApiUrl = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${process.env.NYT_MOVIE_REVIEW_APIKEY}`;
const nytApiFetch = async (query) => node_fetch_1.default(`${nytApiUrl}&query=${query}`);
const omdbApiUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_APIKEY}&type=movie`;
const omdbApiFetch = async (query, page = 1) => {
    console.log(`${omdbApiUrl}&s=${query}&page=${page}`);
    return node_fetch_1.default(`${omdbApiUrl}&s=${query}&page=${page}`);
};
app.get('/api/movies/:title', async (req, res) => {
    const review = await nytApiFetch(req.params.title);
    res.json(await review.json());
});
app.get('/api/movies', async (req, res) => {
    const { s, page } = req.query;
    const details = await omdbApiFetch(s, parseInt(page || '1', 10));
    res.json(await details.json());
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map
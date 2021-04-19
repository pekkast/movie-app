import cors from 'cors'
import { config as loadEnv } from 'dotenv'
import express from 'express'
import fetch from 'node-fetch'
import path from 'path'
import utf8 from 'utf8'

loadEnv()

const nytApiUrl = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${process.env.NYT_MOVIE_REVIEW_APIKEY}`
const nytApiFetch = async (query: string) => fetch(utf8.encode(`${nytApiUrl}&query=${query}`))
const omdbApiUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_APIKEY}&type=movie`
const omdbApiSearch = async (query: string, page = 1) => fetch(utf8.encode(`${omdbApiUrl}&s=${query}&page=${page}`))
const omdbApiDetails = async (id: string) => fetch(`${omdbApiUrl}&i=${id}&plot=short`)

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_URL }))

app.get('/api/reviews', async (req, res) => {
    const review = await nytApiFetch(req.query.title as string)
    res.json(await review.json())
})

app.get('/api/movies/:id', async (req, res) => {
    const { id } = req.params
    const details = await omdbApiDetails(id)

    res.json(await details.json())
})

app.get('/api/movies', async (req, res) => {
    const { s, page } = req.query
    const details = await omdbApiSearch(s as string, parseInt(page as string || '1', 10))
    const response = await details.json()

    if ('Error' in response) {
        res.json({ items: [], totalCount: 0 })
    } else {
        res.json({ items: response.Search, totalCount: +response.totalResults })
    }
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
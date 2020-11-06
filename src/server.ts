/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()

import 'reflect-metadata'
import express from 'express'
import './database/connect'

import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3002)

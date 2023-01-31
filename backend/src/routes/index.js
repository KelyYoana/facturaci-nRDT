'user strict'
import {brandRouter} from './brand'
import express from 'express'

const app = express()

app.use('/brand',brandRouter)

export default app

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import routes from './routes/v1'
import mongoSanitize from 'express-mongo-sanitize'

const app = express()

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json({limit: '1mb'}))

// parse urlencoded request body
app.use(express.urlencoded({extended: true}))

// sanitize request data
app.use(mongoSanitize())

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// v1 api routes
app.use('/v1', routes)

export default app

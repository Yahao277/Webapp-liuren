import express from "express";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import recordRoutes from './routes/records.routes'

const app = express()

app.use(cookieParser())
app.use(compress())

// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use('/api',recordRoutes);


export default app;
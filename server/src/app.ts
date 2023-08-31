import express, { Application } from 'express';
import cors from "cors"
import fileupload from 'express-fileupload';
// import morgan from "morgan"
import bodyParser from 'body-parser';
import Default from './configs/default';

require('events').EventEmitter.prototype._maxListeners = 100;

import router from './routers';

const app: Application = express();
app.use(cors());
app.use(fileupload());

// compress all responses
import compression from "compression";
app.use(compression())


app.use('', express.static(process.cwd() + '/uploads'));
// khai thác lỗ hổng XSS hay clickjacking
// import configHelmet from "./security/helmet";
// configHelmet.config(app);

// Gửi file
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Chống DOS, DDOS hay brute-force mật khẩu 
// import rateLimit from "express-rate-limit";
// const limiter = rateLimit({
//     // 1 minutes
//     windowMs: 1 * 60 * 1000,
//     // limit each IP to 2000 requests per windowMs
//     max: 2000
// });
// app.use(limiter);


// app.use(morgan('combined'))

// Setting & Connect to the Database
import configDB from './configs/databaseMongoDB';
import mongoose from 'mongoose';
const options: any = configDB.options;
mongoose.set('strictQuery', true);
mongoose.connect(configDB.url, options); // kết nối tới database

// cấu hình tài khoản admin mặc định và các dữ liệu mặc định
// import './configs/admin';
// import './configs/brainTree';

// đọc dữ liệu from
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// ** Connect router **
// import event from 'events';
// event.EventEmitter.defaultMaxListeners = 100;

import utilsRealtime from './socket';

const port = Default._PORT;
utilsRealtime.Realtime(app, port)

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// routes
router(app);
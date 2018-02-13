import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import socketIO from 'socket.io';
import expressValidator from 'express-validator';
import cors from 'cors';
import path from 'path';
import http from 'http';
import User from './models/User';
import routes from './routes/index';
import privatechat from './socket/privateChat';
import globalroom from './socket/globalroom';
import group from './socket/group';

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 7000;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

privatechat(io);
globalroom(io);
group(io);

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE, { useMongoClient: true }, (err) => {
  if (err) {
    console.log('can not connect to the database');
  }
});


app.use(morgan('dev'));
app.use(cors());
app.use(expressValidator());

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, '/../client/public')));
// app.use(express.static(path.join(__dirname, '/../client/src')));

routes(app);


app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '/../client/public/index.html'));
  res.status(404).send({ message: 'That url does not exist on this server 🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫' });
});

export default app;

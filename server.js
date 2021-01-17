const express = require ('express');
const routes = require('./routes/image'); 
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(compression());

app.use('/uploads', express.static('./uploads'));

app.use(express.json());
app.use('/', routes);
mongoose.connect(
  'mongodb+srv://being:12345@cluster0.fp2hj.mongodb.net/abcde?retryWrites=true&w=majority',
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } },
  },
  function (err) {
      if (err) return console.log("Error: ", err);
      console.log(
        "MongoDB Connection -- Ready state is:",
        mongoose.connection.readyState
      );
  }
);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});

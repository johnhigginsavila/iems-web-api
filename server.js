const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const db = require('./app/api/models');
const apiRoutes = require('./router');
const morgan = require('morgan');
const cors = require('cors');


app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vmd.api+json"}));

apiRoutes(app);

db.sequelize.sync()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
})
.catch(function (err) {
  console.log(err);
});

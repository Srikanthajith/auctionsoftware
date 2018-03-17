const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const config = require('./server/config/database');
const api = require('./server/routes/api');


const app = express();

app.set('port', (process.env.PORT || 5000));



app.use(express.static(path.join(__dirname + '/public')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', api);

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});

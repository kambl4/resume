"use strict";

// -----------------------------------------------------------
// Variables
// -----------------------------------------------------------
const port = process.env.PORT || 3002
      ,express = require('express')
      ,app = express()

      // Logging
      ,morgan = require('morgan')
      ,bodyParser = require('body-parser')
      ,cors = require('cors')

      // Security
      ,helmet = require('helmet');

//--------------------------------------------------------------
// Functions
//--------------------------------------------------------------
 

// -----------------------------------------------------------
// Application configuration
// -----------------------------------------------------------
app.use(helmet());
app.use(morgan('dev', 
  { skip: (req, res) => { return res.statusCode < 400; }}
));  
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');

//--------------------------------------------------------------
// Routes
//--------------------------------------------------------------
app.get('/', (req, res) => {
  res.render('main');
});

// -----------------------------------------------------------
// Other routes
// -----------------------------------------------------------
app.use("*", (req,res) => {
  res.status(404).render('404');
});

// -----------------------------------------------------------
// Start app
// -----------------------------------------------------------
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
      
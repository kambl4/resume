"use strict";
require('dotenv').config(); // process.env variables in root/.env
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

  // Mail
  ,nodemailer = require('nodemailer')
  ,transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
  })

  // Security
  ,helmet = require('helmet');

//--------------------------------------------------------------
// Functions
//--------------------------------------------------------------
/**
 * Send email
 * @param {String} to reseiver email
 * @param {String} subject mail subject
 * @param {String} html mail content
 */
const sendMail = (to, subject, html) => {
  const mailOptions = { 
    from: 'no-reply@beplus.life', 
    to, subject, html
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
  });
};

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
// API
//--------------------------------------------------------------
app.post('/api/send-mail', (req, res) => {
  let html = `
    <p>From: ${req.body.name} (${req.body.email})</p>
    <p>Message: ${req.body.message}</p>
  `;

  sendMail('goo.kambl4@gmail.com', `from ${req.body.name}`, html);
  res.status(200).json({ success: true });
});

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
  res.render('404');
});

// -----------------------------------------------------------
// Start app
// -----------------------------------------------------------
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
      
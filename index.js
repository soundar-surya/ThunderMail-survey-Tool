const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(cookieSession( { 
      maxAge : 30 *  24 * 60 * 60 * 1000,
      keys : [keys.cookieKey],
      sameSite:"None",
      secure: false
} ) );

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes') (app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);


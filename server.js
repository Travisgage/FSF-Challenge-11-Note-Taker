const express = require('express');
//Import route files
const api = require('./routes/api');
const html = require('./routes/serve-html');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware to parse JSON data and parse URL encoded data
app.use(express.json());
app.use(express.urlencoded( {extended: true }));
//serve static files from public directory
app.use(express.static('public'));

//sets up route handling
app.use('/api', api);
app.use('/', html);



app.listen(PORT, () => 
    console.log(`Listening on port ${PORT}`));
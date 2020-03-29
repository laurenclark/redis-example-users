const express = require('express');
const expHB = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

const port = 2345;

const app = express();

app.engine('handlebars', expHB({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.get('/', (req, res, next) => {
    res.render('search-users');
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

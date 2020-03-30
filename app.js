const express = require('express');
const expHB = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

let client = redis.createClient();
client.on('connect', () => {
    console.log('Connected to Redis');
});

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

app.post('/user/search', (req, res, next) => {
    let id = req.body.id;
    client.hgetall(id, (err, obj) => {
        if (!obj) {
            res.render('search-users', {
                error: 'User does not exist'
            });
        } else {
            obj.id = id;
            res.render('details', {
                user: obj
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

const fs = require("fs");
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    const messagesText = fs.readFileSync("./messages.json", {encoding: "utf8"});
    const messages = JSON.parse(messagesText);
    response.render('home', {messages: messages});
});

app.post('/new', (request, response) => {
    const messages = fs.readFileSync("./messages.json", {encoding: "utf8"});
    messages.push({
        author: request.body.author,
        text: request.body.text,
        date: new Date()
    });
    response.redirect('/');
});
app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

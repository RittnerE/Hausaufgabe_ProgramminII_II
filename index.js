const path = require('path');
const fs = require("fs");
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const filePath = path.join(__dirname, "./messages.json");
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "./views"));
app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    const messagesText = fs.readFileSync(filePath, {encoding: "utf8"});
    const messages = JSON.parse(messagesText);
    response.render('home', {messages: messages});
});

app.post('/new', (request, response) => {
    const messages = fs.readFileSync(filePath, {encoding: "utf8"});
    messages.push({
        author: request.body.author,
        text: request.body.text,
        date: new Date()
    });
    response.redirect('/');
});
app.use(express.static(path.join(__dirname, "./public")));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

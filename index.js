const { log } = require('console');
const express = require('express')
const app = express()
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    {
        id: uuidv4(),
        username : 'CodeEnthusiast',
        content : 'Just pushed my latest project to GitHub!'
    },
    {
        id: uuidv4(),
        username : 'TechGuru',
        content : 'Remember to always test your code thoroughly before deployment.'
    },
    {
        id: uuidv4(),
        username : 'CodingNinja',
        content : 'Attending a hackathon this weekend. Excited!'
    },
]


app.get('/posts', (req, res) => {
    res.render('index.ejs', { posts});
});

app.get('/posts/new', (req, res) => {
    res.render('new.ejs')
});

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4(); 
    posts.push({ id, username, content });
     res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render('show.ejs', { post });
});

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect('/posts');
});

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render('edit.ejs', {post});
});

app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect('/posts');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
});
const express = require('express');
const {v4: uuidv4} = require('uuid');
const methodOverride = require('method-override')



const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.static('\public'));
app.use(methodOverride('_method'))

let data = [];



app.get('/posts', (req, res) => {
    res.render('home.ejs', {data})
});

app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/posts', (req, res) => {
    let id = uuidv4(); 
    let {userName, content} = req.body;
    data.push({id, userName, content});
    res.redirect('/posts');
});

app.get('/posts/details/:id', (req, res) => {
    let {id} = req.params;
    let post = data.find((p) => id === p.id);
    res.render('details.ejs',{post});
});

app.get('/posts/update/:id', (req, res) => {
    let {id} = req.params;
    let post = data.find((p) => id === p.id);
    console.log(id);   
    res.render('update.ejs',{post});
}); 

app.patch('/posts/edit/:id', (req, res) => {
    let {id} = req.params;
    let {content} = req.body;
    let pt = data.find((p) => id === p.id);
    pt.content = content;
    res.redirect('/posts');
});


app.delete('/posts/delete/:id', (req, res) => {
    let {id} = req.params;
    data = data.filter((p) => id !== p.id);
    res.redirect('/posts');  
});







app.listen(3000, ()=>{
    console.log('Server is running!');
    
});
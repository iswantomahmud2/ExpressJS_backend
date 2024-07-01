const express = require('express');
const app = express();
const port = 3000;

//import library CORS
const cors = require('cors');

//use cors
app.use(cors())

//import body parser
const bodyParser = require('body-parser');

//parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

//parse application/json
app.use(bodyParser.json())


//import route posts
const postRouter = require('./routes/posts');
app.use('/api/posts', postRouter); //use route posts di Express

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`App Running at http://localhost:${port}`)
})
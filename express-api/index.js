const express = require('express');
const app = express();
const port = 3000;

//import route posts
const postRouter = require('./routes/posts');
app.use('/api/posts', postRouter); //use route posts di Express

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`App Running at http://localhost:${port}`)
})
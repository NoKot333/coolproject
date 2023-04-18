import express from 'express';

const app = express();

app.get('/',(req,res) => {
    res.send('1111 Hello, World!')
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});
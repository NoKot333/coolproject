import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import mongoose, { model } from 'mongoose';
import {registerValidation,loginValidation, postCreateValidation} from './validation.js';

import CheckAuth from './Utils/CheckAuth.js'

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose.set("strictQuery", true);
mongoose
    .connect('mongodb+srv://admin:admin@cluster0.zukeyqg.mongodb.net/blog?retryWrites=true&w=majority')
    .then(()=> console.log('DB ok'))
    .catch((err)=> console.log('DB error',err));

const app = express();

const storage = multer.diskStorage( {
    destination: (_,__,cb)=> {
        cb(null,'uploads'); 
    },
    filename: (_,file,cb)=> {
        cb(null,file.originalname); 
    },
});

const upload = multer({storage});

app.use(express.json());

app.post('/auth/login', loginValidation , UserController.login);
app.post('/auth/register',registerValidation, UserController.register);

app.post('/upload',CheckAuth, upload.single('image'),(req,res)=> {
    res.json({
        url: `uploads/${req.file.originalfilename}`,
    });
});

app.get('/auth/me',CheckAuth, UserController.getMe);
app.get('/posts', CheckAuth, PostController.getAll)
app.get('/posts/:id', CheckAuth, PostController.getOne)
app.post('/posts', CheckAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id', CheckAuth, PostController.removeOne)
app.patch('/posts/:id', CheckAuth, PostController.updateOne)


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});
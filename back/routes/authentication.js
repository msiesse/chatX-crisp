import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from 'bcrypt';
import {InMemoryUserRepository} from "../authentication/userRepository.js";
import {User} from "../authentication/user.js";

export const routerAuthentication = express.Router();

const userRepository = new InMemoryUserRepository()

routerAuthentication.post('/signup', (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'Please provide a username and password'});
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    userRepository.save(new User(username, hash))

    const token = jwt.sign({username}, 'secret');

    res.json({token});
})

routerAuthentication.post('/signin', (req, res) => {
    const {username, password} = req.body;
    const user = userRepository.find({name: username, password})

    if (!user) {
        return res.status(401).json({message: 'Invalid username or password'});
    }

    const token = jwt.sign({userId: user.id}, 'secret');

    res.json({token});
});
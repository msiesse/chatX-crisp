import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from 'bcrypt';
import {User} from "../user.js";
import {getUserRepository} from "../dependencies/repositories/userRepository.js";
import {authMiddleware} from "../authMiddleware.js";

export const routerAuthentication = express.Router();

const userRepository = getUserRepository()

routerAuthentication.post('/signup', (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'Please provide a username and password'});
    }

    const user = userRepository.find({name: username})
    if (user) {
        return res.status(422).json({message: 'This username is already taken'})
    }

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        userRepository.save(new User(username, hash))

        const token = jwt.sign({username}, process.env.SECRET);

        res.json({token});
    } catch(error) {
        res.status(400).json(error)
    }
})

routerAuthentication.post('/signin', (req, res) => {
    try {
        const {username, password} = req.body;
        const user = userRepository.find({name: username, password})

        if (!user) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const token = jwt.sign({username}, process.env.SECRET);

        res.json({token});
    } catch (error) {
        res.status(400).json(error)
    }
});

routerAuthentication.post('/validate', authMiddleware, (req, res) => {
    res.json({message: 'OK'})
})
import {getUserRepository} from "./dependencies/repositories/userRepository.js";
import jwt from "jsonwebtoken";

const userRepository = getUserRepository()

export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not found' });
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        const user = userRepository.find({name: decoded.username})
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid authorization token' });
    }
};
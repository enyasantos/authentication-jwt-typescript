import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class AuthController {
    async authenticate(request: Request, response: Response) {
        const repository = getRepository(User);
        const {
            email,
            password
        } = request.body;

        const user = await repository.findOne({ where: {email}});

        if(!user) 
            return response.status(401).json({ message: 'E-mail não cadastrado.'});

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword)
        return response.status(401).json({ message: 'Senha está incorreta.'});


        const token = jwt.sign({ id: user.id }, `${process.env.SECRET_KEY}`, {expiresIn: '1d'});

        delete user.password;

        return response.status(201).json({user, token});
    }
}

export default new AuthController();
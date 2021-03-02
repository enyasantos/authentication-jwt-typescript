import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {
    async index(request: Request, response: Response) {
        const repository = getRepository(User);

        const users = repository.find();

        return response.status(200).json(users);
    }

    async store(request: Request, response: Response) {
        const repository = getRepository(User);
        const {
            email,
            password
        } = request.body;

        const userExists = await repository.findOne({ where: {email}});
        if(userExists) return response.status(409).json({ message: 'O email já está em uso.'}); //409 - conflito

        const user = repository.create({ email, password });
        await repository.save(user);

        return response.status(201).json(user);
    }
}

export default new UserController();
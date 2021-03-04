import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from 'yup';
import { UsersRepository } from "../repositories/UsersRepository";
import { AppErrors } from '../errors/AppErrors';

class UserController {

    async create(req: Request, res: Response) {

        const { name, email } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            throw new AppErrors(err);
        }

        const userRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await userRepository.findOne({ email });

        if (userAlreadyExists) throw new AppErrors('User does not exists!');

        const user = userRepository.create({
            name,
            email
        });

        await userRepository.save(user);

        return res.status(201).json(user);
    }
}

export { UserController };

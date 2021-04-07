import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { getCustomRepository } from "typeorm";
import * as yup from 'yup';
import { AppErrors } from '../errors/AppErrors';
import { UsersRepository } from "../repositories/UsersRepository";
import UserView from "../views/UserView";


const generateToken = (params = {}) => {
    return jwt.sign(params,
        process.env.JWT_KEY!,
        {
            // 24hrs
            expiresIn: 86400
            // 4hrs
            // expiresIn: 14400
            // expiresIn: 2

        });
}

class UserController {

    async create(req: Request, res: Response) {

        const { name, email, password } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            throw new AppErrors(err);
        }

        const passHash = await bcrypt.hash(password, 10);

        const userRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await userRepository.findOne({ email });

        if (userAlreadyExists) throw new AppErrors('User already exists!');

        const user = userRepository.create({
            name,
            email,
            password: passHash,
        });

        await userRepository.save(user);

        return res.status(201).json({ user: UserView.render(user), token: generateToken({ id: user.id }) });
    }

    async authenticate(request: Request, response: Response) {

        const { email, password } = request.body;

        const userRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await userRepository.findOne({ email });

        if (!userAlreadyExists) throw new AppErrors('User not exists!');

        if (!await bcrypt.compare(password, userAlreadyExists.password)) throw new AppErrors('Invalid password for the user.');

        return response.json({ user: UserView.render(userAlreadyExists), token: generateToken({ id: userAlreadyExists.id }) });
    }

    async getUser(req: Request, res: Response) {

        const { id } = req.user;

        const userRepository = getCustomRepository(UsersRepository);

        const userExists = await userRepository.findOne({ id });

        if (!userExists) throw new AppErrors('User not exists!');

        return res.json({ user: UserView.render(userExists) });
    }
}

export { UserController };

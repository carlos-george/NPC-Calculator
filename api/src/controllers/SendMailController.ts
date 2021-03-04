
import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { AppErrors } from '../errors/AppErrors';


class SendMailController {

    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body;

        const userRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await userRepository.findOne({ email });

        if (!userAlreadyExists) throw new AppErrors('User does not exists!');

        const surveyAlreadyExists = await surveyRepository.findOne({ id: survey_id });

        if (!surveyAlreadyExists) throw new AppErrors('Survey does not exists!');

        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: { user_id: userAlreadyExists.id, value: null },
            relations: ['user', 'survey']
        });

        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            id: '',
            link: `${process.env.URL_MAIL}/answers`
        }

        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, variables.title, variables, npsPath);
            return res.json(surveyUserAlreadyExists);
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id,
        });

        await surveysUsersRepository.save(surveyUser);

        variables.id = surveyUser.id;

        await SendMailService.execute(email, variables.title, variables, npsPath);

        return res.status(201).json(surveyUser);
    }
}

export { SendMailController };

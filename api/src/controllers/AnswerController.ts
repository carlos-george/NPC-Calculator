import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';
import { calculate } from '../utils/NpsCalculateUtils';
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { AppErrors } from '../errors/AppErrors';
import { SurveyCompanyAnswerRepository } from "../repositories/SurveyCompanyAnswerRepository";
import { SurveyCompanyRepository } from "../repositories/SurveyCompanyRepository";

class AnswerController {

    async execute(req: Request, res: Response) {
        const { value } = req.params;
        const { u } = req.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if (!surveyUser) throw new AppErrors('Survey User does not exists!');

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return res.json(surveyUser);
    }

    async executeCompanyAnswer(req: Request, res: Response) {
        const { survey_companys_id } = req.params;
        const { value } = req.query;

        const surveyCompanyAnswerRepo = getCustomRepository(SurveyCompanyAnswerRepository);

        const surveyAnswer = surveyCompanyAnswerRepo.create({
            survey_companys_id,
            value: Number(value)
        });

        await surveyCompanyAnswerRepo.save(surveyAnswer);

        return res.json({ message: 'Your answer was saved, thanks for the contribution!', surveyAnswer });
    }

    async showAllAnswersByCompany(req: Request, res: Response) {
        const { company_id } = req.params;

        const surveyCompanyRepository = getCustomRepository(SurveyCompanyRepository);
        const surveyCompanyRepositoryAnswerRepo = getCustomRepository(SurveyCompanyAnswerRepository);

        const surveysCompanysExists = await surveyCompanyRepository.find({
            // where: { company_id, isActive: true },
            where: { company_id },
            relations: ['survey', 'answers']
        });

        if (surveysCompanysExists.length === 0) throw new AppErrors('Does not exist none survey for Company!');

        const listSurveys = surveysCompanysExists.map(item => {
            const data = {
                surveyCompany_id: item.id,
                isActive: item.isActive,
                survey_id: item.survey.id,
                title: item.survey.title,
                description: item.survey.description,
                answers: item.answers
            }

            return data;
        });

        return res.json(listSurveys);
    }

    async showAllAnswersBySurveyCompany(req: Request, res: Response) {
        const { surveyCompany_id } = req.params;

        const surveyCompanyRepository = getCustomRepository(SurveyCompanyRepository);
        const surveyCompanyRepositoryAnswerRepo = getCustomRepository(SurveyCompanyAnswerRepository);

        const surveyCompanysExists = await surveyCompanyRepository.findOne({
            where: { id: surveyCompany_id },
            relations: ['survey']
        });

        if (!surveyCompanysExists) throw new AppErrors('Does not exist none Survey!');

        const answers = await surveyCompanyRepositoryAnswerRepo.find({
            where: { survey_companys_id: surveyCompany_id }
        });

        const totalDetractors = answers.filter(item => (item.value >= 0 && item.value <= 6)).length;

        const totalPromotors = answers.filter(item => (item.value >= 9 && item.value <= 10)).length;

        const totalPassives = answers.filter(item => (item.value >= 7 && item.value <= 8)).length;

        const totalAnswers = answers.length;

        const calculated = calculate(totalPromotors, totalDetractors, totalAnswers);

        return res.json({
            survey: surveyCompanysExists.survey,
            totalDetractors,
            totalPromotors,
            totalPassives,
            totalAnswers,
            nps: calculated
        });

    }
}

export { AnswerController }
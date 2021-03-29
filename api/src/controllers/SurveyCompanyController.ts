import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CompanysRepository } from "../repositories/CompanysRepository";
import { SurveyCompanyRepository } from "../repositories/SurveyCompanyRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { AppErrors } from '../errors/AppErrors';


class SurveyCompanyController {

    async create(req: Request, res: Response) {

        const { title, description } = req.body;
        const { company_id } = req.params;

        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveyCompanyRepository = getCustomRepository(SurveyCompanyRepository);
        const companyRepository = getCustomRepository(CompanysRepository);

        const companyExists = await companyRepository.findOne({ id: company_id });

        if (!companyExists) throw new AppErrors('Company does not exists!');

        const survey = surveyRepository.create({
            title,
            description
        });

        await surveyRepository.save(survey);

        const surveyCompany = surveyCompanyRepository.create({
            company_id,
            survey_id: survey.id,
            isActive: true
        });

        await surveyCompanyRepository.save(surveyCompany);

        const surveyCreated = {
            surveyCompany_id: surveyCompany.id,
            survey_id: survey.id,
            title: survey.title,
            description: survey.description
        };

        return res.status(201).json({ message: 'Survey was created with success!', surveyCreated });
    }

    async showAll(req: Request, res: Response) {

        const { company_id } = req.params;
        const { isActive } = req.query;

        console.log('IsActive: ', isActive);

        const surveyCompanyRepository = getCustomRepository(SurveyCompanyRepository);
        const companyRepository = getCustomRepository(CompanysRepository);

        const companyExists = await companyRepository.findOne({ id: company_id });

        if (!companyExists) throw new AppErrors('Company does not exists!');

        const active = isActive === 'true';

        const listSurveysCompany = await surveyCompanyRepository.find({
            where: { company_id, isActive: active },
            // where: { company_id },
            relations: ['survey']
        });

        const listSurveys = listSurveysCompany.map(item => {
            const data = {
                surveyCompany_id: item.id,
                isActive: item.isActive,
                survey_id: item.survey.id,
                title: item.survey.title,
                description: item.survey.description
            }

            return data;
        });

        return res.json({ company: companyExists, listSurveys });
    }

    async activate(req: Request, res: Response) {
        const { surveyCompany_id } = req.params;
        const { isActive } = req.query;

        const surveyCompanyRepository = getCustomRepository(SurveyCompanyRepository);

        const surveyCompanyExist = await surveyCompanyRepository.findOne({ id: surveyCompany_id });

        if (!surveyCompanyExist) throw new AppErrors('Survey does not exists!');

        const activate = isActive === 'true';

        surveyCompanyExist.isActive = activate;

        await surveyCompanyRepository.save(surveyCompanyExist);

        const msg = `Survey was ${activate ? 'activated' : 'desactivate'}`;

        return res.status(200).json({ message: msg });

    }
}

export { SurveyCompanyController }
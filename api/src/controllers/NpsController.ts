import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {

    async execute(req: Request, res: Response) {

        const { survey_id } = req.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        // if(!surveysUsers) return res.status(400).json({error: 'Surveys Users does not exists!'});

        const totalDetractors = surveysUsers.filter(survey => (survey.value >= 0 && survey.value <= 6)).length;

        const totalPromotors = surveysUsers.filter(survey => (survey.value >= 9 && survey.value <= 10)).length;

        const totalPassives = surveysUsers.filter(survey => (survey.value >= 7 && survey.value <= 8)).length;

        const totalAnswers = surveysUsers.length;

        const calculate = Number((((totalPromotors - totalDetractors) / totalAnswers) * 100).toFixed(2));

        return res.json({
            totalDetractors,
            totalPromotors,
            totalPassives,
            totalAnswers,
            nps: calculate

        });
    }
}

export { NpsController }
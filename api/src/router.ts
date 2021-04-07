import { Router } from 'express';

declare global {
    namespace Express {
        interface Request {
            user: UserReq
        }
    }
}

import auth, { UserReq } from './middlewares/auth';
import { AnswerController } from './controllers/AnswerController';
import { CompanyController } from './controllers/CompanyController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveyCompanyController } from './controllers/SurveyCompanyController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();
const companyController = new CompanyController();
const surveyCompanyController = new SurveyCompanyController();

//Users
router.post('/users', auth, userController.create);
router.post('/users/authenticate', userController.authenticate);
router.get('/users', auth, userController.getUser);


//Surveys
router.get('/surveys', auth, surveyController.show);
router.post('/surveys', auth, surveyController.create);

//Survey-Company
router.get('/survey-companys/:company_id', auth, surveyCompanyController.showAll);
router.post('/survey-companys/:company_id', auth, surveyCompanyController.create);
router.put('/survey-companys/:surveyCompany_id/activate', auth, surveyCompanyController.activate);

//Survey-Company-Answers
router.post('/survey-company-answers/:survey_companys_id', auth, answerController.executeCompanyAnswer);

//Companys
router.post('/companys', auth, companyController.create);
router.get('/companys', auth, companyController.showAll);

router.post('/send-mails', sendMailController.execute);

//Answers
router.get('/answers/:value', answerController.execute);
router.get('/company-answers/:company_id', auth, answerController.showAllAnswersByCompany);
router.get('/survey-company/:surveyCompany_id/answers', auth, answerController.showAllAnswersBySurveyCompany);

router.get('/nps/:survey_id', npsController.execute)



export { router }
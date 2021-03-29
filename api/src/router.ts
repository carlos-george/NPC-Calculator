import { Router } from 'express';
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
router.post('/users', userController.create);

//Surveys
router.get('/surveys', surveyController.show);
router.post('/surveys', surveyController.create);

//Survey-Company
router.get('/survey-companys/:company_id', surveyCompanyController.showAll);
router.post('/survey-companys/:company_id', surveyCompanyController.create);
router.put('/survey-companys/:surveyCompany_id/activate', surveyCompanyController.activate);

//Survey-Company-Answers
router.post('/survey-company-answers/:survey_companys_id', answerController.executeCompanyAnswer);

//Companys
router.post('/companys', companyController.create);
router.get('/companys', companyController.showAll);

router.post('/send-mails', sendMailController.execute);

//Answers
router.get('/answers/:value', answerController.execute);
router.get('/company-answers/:company_id', answerController.showAllAnswersByCompany);
router.get('/survey-company/:surveyCompany_id/answers', answerController.showAllAnswersBySurveyCompany);

router.get('/nps/:survey_id', npsController.execute)

export { router }
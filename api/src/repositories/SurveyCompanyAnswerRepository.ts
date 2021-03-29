import { EntityRepository, Repository } from "typeorm"
import { SurveyCompanyAnswers } from "../models/SurveyCompanyAnswer"


@EntityRepository(SurveyCompanyAnswers)
class SurveyCompanyAnswerRepository extends Repository<SurveyCompanyAnswers> {

}

export { SurveyCompanyAnswerRepository }
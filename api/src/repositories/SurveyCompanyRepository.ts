import { EntityRepository, Repository } from "typeorm"
import { SurveyCompany } from "../models/SurveyCompany"


@EntityRepository(SurveyCompany)
class SurveyCompanyRepository extends Repository<SurveyCompany> {

}

export { SurveyCompanyRepository }
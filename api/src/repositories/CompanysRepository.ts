import { EntityRepository, Repository } from "typeorm"
import { Company } from "../models/Company"


@EntityRepository(Company)
class CompanysRepository extends Repository<Company> {

}


export { CompanysRepository }
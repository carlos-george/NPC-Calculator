import { Request, Response } from "express";
import { getCustomRepository, Raw } from "typeorm";
import * as yup from 'yup';
import { CompanysRepository } from "../repositories/CompanysRepository";
import { AppErrors } from '../errors/AppErrors';

class CompanyController {

    async create(req: Request, res: Response) {

        const { name, cnpj } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            cnpj: yup.string().required()
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            throw new AppErrors(err);
        }

        const companyRepository = getCustomRepository(CompanysRepository);

        const companyAlreadyExists = await companyRepository.findOne({ cnpj });

        if (companyAlreadyExists) throw new AppErrors('Company already exists!');

        const company = companyRepository.create({
            name,
            cnpj
        });

        await companyRepository.save(company);

        return res.status(201).json({ message: 'Company was created with success!', company });
    }

    async showAll(req: Request, res: Response) {

        const { cnpj } = req.query;

        const companyRepository = getCustomRepository(CompanysRepository);

        const listCompanys = await companyRepository.find({
            where: {
                cnpj: Raw(alias => {

                    if (cnpj) return `${alias} LIKE '${cnpj}%'`;

                    return '';
                })
            }
        });

        return res.json(listCompanys);
    }

}

export { CompanyController }
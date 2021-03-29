import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Company } from "./Company";
import { Survey } from "./Survey";
import { SurveyCompanyAnswers } from "./SurveyCompanyAnswer";

@Entity('surveys_companys')
class SurveyCompany {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    company_id: string;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @Column()
    survey_id: string;

    @ManyToOne(() => Survey)
    @JoinColumn({ name: 'survey_id' })
    survey: Survey;

    @OneToMany(type => SurveyCompanyAnswers, answers => answers.surveyCompany)
    answers: SurveyCompanyAnswers[];

    @Column()
    isActive: boolean;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { SurveyCompany };

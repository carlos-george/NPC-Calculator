import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { SurveyCompany } from "./SurveyCompany";

@Entity('surveys_companys_answers')
class SurveyCompanyAnswers {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    survey_companys_id: string;

    @ManyToOne(() => SurveyCompany)
    @JoinColumn({ name: 'survey_companys_id' })
    surveyCompany: SurveyCompany;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { SurveyCompanyAnswers };

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysCompanysAnswers1615300304994 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'surveys_companys_answers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'survey_companys_id',
                        type: 'uuid'
                    },
                    {
                        name: 'value',
                        type: 'number',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKSurveyCompany',
                        referencedTableName: 'surveys_companys',
                        referencedColumnNames: ['id'],
                        columnNames: ['survey_companys_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('urveys_companys_answers');
    }

}

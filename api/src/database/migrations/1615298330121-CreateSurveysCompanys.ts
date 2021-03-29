import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysCompanys1615298330121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'surveys_companys',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'company_id',
                        type: 'uuid'
                    },
                    {
                        name: 'survey_id',
                        type: 'uuid'
                    },
                    {
                        name: 'isActive',
                        type: 'boolean',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKCompany',
                        referencedTableName: 'companys',
                        referencedColumnNames: ['id'],
                        columnNames: ['company_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKSurvey',
                        referencedTableName: 'surveys',
                        referencedColumnNames: ['id'],
                        columnNames: ['survey_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('surveys_companys');
    }

}

import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddPassword1617540350820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE users ADD COLUMN password VARCHAR(30)');
        await queryRunner.query('ALTER TABLE users ADD COLUMN isAdmin BOOLEAN DEFAULT FALSE');

        // await queryRunner.addColumns('users', [
        //     new TableColumn({
        //         name: 'password',
        //         type: 'varchar'
        //     }),
        //     new TableColumn({
        //         name: 'isAdmin',
        //         type: 'boolean',
        //         default: 'false'
        //     }),
        // ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'password');
        await queryRunner.dropColumn('users', 'isAdmin');
    }

}

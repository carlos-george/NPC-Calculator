import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export class CreateSeedsUsersRoles1617541103874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`insert into users(id, name, password, email, isAdmin, created_at) values ('${uuid()}','admin', '${await bcrypt.hash('123456', 10)}', 'admin@contato.com', true, date('now'))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // nothing to do
    }

}

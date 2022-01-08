import {MigrationInterface, QueryRunner} from "typeorm";

export class addAccountBalanceToUsersTable1641584477985 implements MigrationInterface {
    name = 'addAccountBalanceToUsersTable1641584477985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "account_balance" numeric(12,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "account_balance"`);
    }

}

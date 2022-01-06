import {MigrationInterface, QueryRunner} from "typeorm";

export class addCurrencyToTransactionsTable1641434514534 implements MigrationInterface {
    name = 'addCurrencyToTransactionsTable1641434514534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "currency" character varying NOT NULL DEFAULT 'NGN'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "currency"`);
    }

}

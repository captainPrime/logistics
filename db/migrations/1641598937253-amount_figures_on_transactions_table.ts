import {MigrationInterface, QueryRunner} from "typeorm";

export class amountFiguresOnTransactionsTable1641598937253 implements MigrationInterface {
    name = 'amountFiguresOnTransactionsTable1641598937253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "amount_intended" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "amount_paid" numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "native_amount" numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "native_amount"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "amount_paid"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "amount_intended"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "amount" numeric(12,2) NOT NULL`);
    }

}

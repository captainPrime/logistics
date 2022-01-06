import {MigrationInterface, QueryRunner} from "typeorm";

export class removeUniqueAmountConstraint1641488986317 implements MigrationInterface {
    name = 'removeUniqueAmountConstraint1641488986317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "UQ_6d5db1ee200c3b65d2824a077b4"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "UQ_6d5db1ee200c3b65d2824a077b4" UNIQUE ("amount")`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class createTransactionsTable1641275508603 implements MigrationInterface {
    name = 'createTransactionsTable1641275508603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "intent" character varying NOT NULL, "transaction_type" character varying NOT NULL, "amount" numeric(12,2) NOT NULL, "status" character varying NOT NULL, "provider" character varying NOT NULL, "transaction_reference" character varying NOT NULL, "raw" json, "user_id" character varying, CONSTRAINT "UQ_6d5db1ee200c3b65d2824a077b4" UNIQUE ("amount"), CONSTRAINT "UQ_e3a59e8c1581dc4201761584839" UNIQUE ("transaction_reference"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}

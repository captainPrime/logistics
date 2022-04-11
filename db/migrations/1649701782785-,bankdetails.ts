import {MigrationInterface, QueryRunner} from "typeorm";

export class createBankDetailsTable1649701782785 implements MigrationInterface {
    name = 'createBankDetailsTable1649701782785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bankdetails" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "account_number" character varying NOT NULL, "account_number_display" character varying NOT NULL, "account_name" character varying NOT NULL, "bank_name" character varying NOT NULL, "bank_code" character varying NOT NULL, "bank_id" character varying NOT NULL, "raw" json, "currency" character varying NOT NULL DEFAULT 'NGN', "user_id" character varying, CONSTRAINT "UQ_6e0d0d690c3a11118f1c12ace8f" UNIQUE ("account_number"), CONSTRAINT "UQ_f8a858590d9db6044ef8c3609bf" UNIQUE ("account_number_display"), CONSTRAINT "UQ_7119572b25043cc887876407af2" UNIQUE ("account_name"), CONSTRAINT "UQ_2f1ffa5c181bf8454c2cfaac8d5" UNIQUE ("bank_name"), CONSTRAINT "UQ_3790be901216fcefe45f28b617b" UNIQUE ("bank_code"), CONSTRAINT "UQ_b8d4ef8db792f0a8bfd067429fe" UNIQUE ("bank_id"), CONSTRAINT "PK_a2d144409c8b746dbd4dd702726" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bankdetails" ADD CONSTRAINT "FK_6e5ecb21d3647977e8aaef922d6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bankdetails" DROP CONSTRAINT "FK_6e5ecb21d3647977e8aaef922d6"`);
        await queryRunner.query(`DROP TABLE "bankdetails"`);
    }

}

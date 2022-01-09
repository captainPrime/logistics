import {MigrationInterface, QueryRunner} from "typeorm";

export class createHoppersTable1641730756131 implements MigrationInterface {
    name = 'createHoppersTable1641730756131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hoppers" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "user_id" character varying, CONSTRAINT "REL_71762cee00c26f21a8869ecc82" UNIQUE ("user_id"), CONSTRAINT "PK_7a608e5de99a62db381043c3f72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hoppers" ADD CONSTRAINT "FK_71762cee00c26f21a8869ecc82f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hoppers" DROP CONSTRAINT "FK_71762cee00c26f21a8869ecc82f"`);
        await queryRunner.query(`DROP TABLE "hoppers"`);
    }

}

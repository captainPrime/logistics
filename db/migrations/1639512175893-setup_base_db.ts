import { MigrationInterface, QueryRunner } from 'typeorm';

export class setupBaseDb1639512175893 implements MigrationInterface {
  name = 'setupBaseDb1639512175893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email_address" character varying NOT NULL, "phone_number" character varying NOT NULL, "password_hash" character varying NOT NULL, CONSTRAINT "UQ_d1a16364b1f276e14e8e4cfc47e" UNIQUE ("email_address"), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

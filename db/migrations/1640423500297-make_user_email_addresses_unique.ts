import { MigrationInterface, QueryRunner } from 'typeorm';

export class makeUserEmailAddressesUnique1640423500297
  implements MigrationInterface
{
  name = 'makeUserEmailAddressesUnique1640423500297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_d1a16364b1f276e14e8e4cfc47e" UNIQUE ("email_address")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_d1a16364b1f276e14e8e4cfc47e"`,
    );
  }
}

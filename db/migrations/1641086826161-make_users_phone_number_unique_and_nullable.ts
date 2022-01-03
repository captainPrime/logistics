import { MigrationInterface, QueryRunner } from 'typeorm';

export class makeUsersPhoneNumberUniqueAndNullable1641086826161
  implements MigrationInterface
{
  name = 'makeUsersPhoneNumberUniqueAndNullable1641086826161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone_number" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone_number" SET NOT NULL`,
    );
  }
}

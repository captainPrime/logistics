import { MigrationInterface, QueryRunner } from "typeorm";

export class addLocationToHoppersTable1642180901830 implements MigrationInterface {
  name = 'addLocationToHoppersTable1642180901830'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hoppers" ADD "location" geometry(Point,4326)`);
    await queryRunner.query(`CREATE INDEX hoppers_location_index ON hoppers USING gist("location")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS hoppers_location_index`);
    await queryRunner.query(`ALTER TABLE "hoppers" DROP COLUMN "location"`);
  }

}

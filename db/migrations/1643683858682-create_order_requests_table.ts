import {MigrationInterface, QueryRunner} from "typeorm";

export class createOrderRequestsTable1643683858682 implements MigrationInterface {
    name = 'createOrderRequestsTable1643683858682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."hoppers_location_index"`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "current_location" geometry(Point,4326) NOT NULL, "pickup_time" TIMESTAMP, "delivery_time" TIMESTAMP, "user_id" character varying, "hopper_id" character varying, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_requests" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "sender_details" json NOT NULL, "recipient_details" json NOT NULL, "order_type" character varying NOT NULL, "package_type" character varying NOT NULL, "package_fragility" character varying NOT NULL, "package_minimum_size" numeric, "package_maximum_size" numeric, "pickup_point" geometry(Point,4326) NOT NULL, "delivery_point" geometry(Point,4326) NOT NULL, "status" character varying NOT NULL, "user_id" character varying, CONSTRAINT "PK_76290aeda7d8001f22f9c002994" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_ada69a86448c4b1a717002f8e4a" FOREIGN KEY ("hopper_id") REFERENCES "hoppers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_requests" ADD CONSTRAINT "FK_27f8d8760d62b97dc63328ca4b1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_requests" DROP CONSTRAINT "FK_27f8d8760d62b97dc63328ca4b1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_ada69a86448c4b1a717002f8e4a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`DROP TABLE "order_requests"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`CREATE INDEX "hoppers_location_index" ON "hoppers" USING GiST ("location") `);
    }

}

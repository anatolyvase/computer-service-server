/*
  Warnings:

  - You are about to drop the `BasketService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BasketService" DROP CONSTRAINT "BasketService_basket_id_fkey";

-- DropForeignKey
ALTER TABLE "BasketService" DROP CONSTRAINT "BasketService_service_id_fkey";

-- DropTable
DROP TABLE "BasketService";

-- CreateTable
CREATE TABLE "basket_services" (
    "basket_id" UUID NOT NULL,
    "service_id" UUID NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "basket_services_pkey" PRIMARY KEY ("basket_id","service_id")
);

-- AddForeignKey
ALTER TABLE "basket_services" ADD CONSTRAINT "basket_services_basket_id_fkey" FOREIGN KEY ("basket_id") REFERENCES "baskets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "basket_services" ADD CONSTRAINT "basket_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

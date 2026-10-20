-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_updatedById_fkey";

-- DropIndex
DROP INDEX "Accommodation_addressId_idx";

-- DropIndex
DROP INDEX "Accommodation_title_addressId_key";

-- DropIndex
DROP INDEX "Activity_addressId_idx";

-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "addressId",
ADD COLUMN     "addressDetails" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "countryCode" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "addressId",
ADD COLUMN     "addressDetails" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "countryCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";

-- CreateIndex
CREATE INDEX "Accommodation_countryCode_idx" ON "Accommodation"("countryCode");

-- CreateIndex
CREATE INDEX "Accommodation_city_idx" ON "Accommodation"("city");

-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_title_countryCode_city_addressDetails_key" ON "Accommodation"("title", "countryCode", "city", "addressDetails");

-- CreateIndex
CREATE INDEX "Activity_countryCode_idx" ON "Activity"("countryCode");

-- CreateIndex
CREATE INDEX "Activity_city_idx" ON "Activity"("city");


-- Rename addressDetails -> fullAddress (data-preserving, column rename keeps values)
ALTER TABLE "Activity" RENAME COLUMN "addressDetails" TO "fullAddress";
ALTER TABLE "Accommodation" RENAME COLUMN "addressDetails" TO "fullAddress";

-- Rename the accommodation uniqueness constraint to match the new column name
ALTER INDEX "Accommodation_title_countryCode_city_addressDetails_key" RENAME TO "Accommodation_title_countryCode_city_fullAddress_key";

-- Default new records to active (forms no longer submit isActive)
ALTER TABLE "Currency" ALTER COLUMN "isActive" SET DEFAULT true;
ALTER TABLE "ActivityType" ALTER COLUMN "isActive" SET DEFAULT true;
ALTER TABLE "AccommodationTag" ALTER COLUMN "isActive" SET DEFAULT true;

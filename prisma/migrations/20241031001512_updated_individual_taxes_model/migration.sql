/*
  Warnings:

  - A unique constraint covering the columns `[incomeFromShareTransferListedCompanyId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[incomeFromCapitalGain2Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[incomeFromCapitalGain3Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[incomeFromCapitalGain4Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[incomeFromCapitalGain5Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[incomeFromCapitalGainsTotalId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shonchoypatraId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitFromShoychoyparta2Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitFromShoychoyparta3Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitFromShoychoyparta4Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitFromShoychoyparta5Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitFromShoychoyparta6Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitFromShoychoyparta7Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitFromShoychoyparta8Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitFromShoychoyparta9Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitFromShoychoyparta10Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitFromShoychoypartaTotalId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[interestFromSecuritiesId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitInterestFromGovtSecurities2Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitInterestFromGovtSecurities3Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitInterestFromGovtSecurities4Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitInterestFromGovtSecurities5Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitInterestFromGovtSecurities6Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitInterestFromGovtSecurities7Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitInterestFromGovtSecurities8Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitInterestFromGovtSecurities9Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitInterestFromGovtSecurities10Id]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profitInterestFromGovtSecuritiesTotalId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[expensesForFoodId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[housingExpenseId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personalTransportationExpensesId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[utilityExpenseId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[houseKeepingExpenseId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[humanitiesExpenseId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[educationExpensesId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personalExpenseForLocalForeignTravelId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[festivalExpenseId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[taxDeductedCollectedAtSourceId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[interestPaidId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[totalExpenseIndividualPersonId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `netWealthLastDate` to the `IndividualTaxes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxpayersSharePercentage` to the `IndividualTaxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IndividualTaxes" ADD COLUMN     "accommodationFacilityPrivate" TEXT,
ADD COLUMN     "addressOfBusiness" TEXT,
ADD COLUMN     "adjustedAdvanceRent" TEXT,
ADD COLUMN     "advanceArrearSalaryPrivate" TEXT,
ADD COLUMN     "advanceRentReceived" TEXT,
ADD COLUMN     "agriculturalLocationAndDescription1" TEXT,
ADD COLUMN     "agriculturalLocationAndDescription2" TEXT,
ADD COLUMN     "agriculturalLocationAndDescription3" TEXT,
ADD COLUMN     "agriculturalLocationValue1" TEXT,
ADD COLUMN     "agriculturalLocationValue2" TEXT,
ADD COLUMN     "agriculturalLocationValue3" TEXT,
ADD COLUMN     "agriculturalProperty" TEXT,
ADD COLUMN     "allowancesPrivate" TEXT,
ADD COLUMN     "amountOfTaxRebate" TEXT,
ADD COLUMN     "anyOtherFacilityProvidedByEmployerPrivate" TEXT,
ADD COLUMN     "assetOutsideBangladesh" TEXT,
ADD COLUMN     "badDebtExpense" TEXT,
ADD COLUMN     "bankBalance" TEXT,
ADD COLUMN     "basicPayPrivate" TEXT,
ADD COLUMN     "businessCapital" TEXT,
ADD COLUMN     "businessCapitalOfPartnershipFirm" TEXT,
ADD COLUMN     "capitalContributed1" TEXT,
ADD COLUMN     "capitalContributed2" TEXT,
ADD COLUMN     "capitalContributed3" TEXT,
ADD COLUMN     "cashInHand" TEXT,
ADD COLUMN     "cashInHandAtBank" TEXT,
ADD COLUMN     "closingCapital" TEXT,
ADD COLUMN     "contributionToBenevolentFund" TEXT,
ADD COLUMN     "contributionToDeposit" TEXT,
ADD COLUMN     "contributionToProvidentFund" TEXT,
ADD COLUMN     "contributionToSuperAnnuationFund" TEXT,
ADD COLUMN     "contributionToZakatFund" TEXT,
ADD COLUMN     "depositPensionScheme" TEXT,
ADD COLUMN     "directorsShareholdingCompanyName1" TEXT,
ADD COLUMN     "directorsShareholdingCompanyName2" TEXT,
ADD COLUMN     "directorsShareholdingCompanyName3" TEXT,
ADD COLUMN     "directorsShareholdingCompanyValue1" TEXT,
ADD COLUMN     "directorsShareholdingCompanyValue2" TEXT,
ADD COLUMN     "directorsShareholdingCompanyValue3" TEXT,
ADD COLUMN     "directorsShareholdingNoOfShare1" TEXT,
ADD COLUMN     "directorsShareholdingNoOfShare2" TEXT,
ADD COLUMN     "directorsShareholdingNoOfShare3" TEXT,
ADD COLUMN     "directorsShareholdingsInTheCompanies" TEXT,
ADD COLUMN     "educationExpensesId" TEXT,
ADD COLUMN     "employerContributionToProvidentFundPrivate" TEXT,
ADD COLUMN     "exemptedAmountPrivate" TEXT,
ADD COLUMN     "expenseRelatingToLifestyle" TEXT,
ADD COLUMN     "expensesForFoodId" TEXT,
ADD COLUMN     "festivalExpenseId" TEXT,
ADD COLUMN     "fixedAssets" TEXT,
ADD COLUMN     "furnitureAndElectronic" TEXT,
ADD COLUMN     "generalAdministrativeSellingExpenses" TEXT,
ADD COLUMN     "generalExpensesSellingExpenses" TEXT,
ADD COLUMN     "giftExpense" TEXT,
ADD COLUMN     "gratuityAnnuityPensionOrSimilarBenefitPrivate" TEXT,
ADD COLUMN     "grossProfitFromAgriculture" TEXT,
ADD COLUMN     "grossProfitFromBusiness" TEXT,
ADD COLUMN     "grossWealth" TEXT,
ADD COLUMN     "houseKeepingExpenseId" TEXT,
ADD COLUMN     "housingExpenseId" TEXT,
ADD COLUMN     "humanitiesExpenseId" TEXT,
ADD COLUMN     "incomeFromCapitalGain2Id" TEXT,
ADD COLUMN     "incomeFromCapitalGain3Id" TEXT,
ADD COLUMN     "incomeFromCapitalGain4Id" TEXT,
ADD COLUMN     "incomeFromCapitalGain5Id" TEXT,
ADD COLUMN     "incomeFromCapitalGainsTotalId" TEXT,
ADD COLUMN     "incomeFromEmployeeShareSchemePrivate" TEXT,
ADD COLUMN     "incomeFromShareTransferListedCompanyId" TEXT,
ADD COLUMN     "institutionalLiabilities" TEXT,
ADD COLUMN     "insurancePremiumPaid" TEXT,
ADD COLUMN     "interestFromSecuritiesId" TEXT,
ADD COLUMN     "interestMortgageCapitalCharge" TEXT,
ADD COLUMN     "interestPaidId" TEXT,
ADD COLUMN     "inventories" TEXT,
ADD COLUMN     "investmentInGovernmentSecurities" TEXT,
ADD COLUMN     "investmentInSecuritiesStock" TEXT,
ADD COLUMN     "landRevenue" TEXT,
ADD COLUMN     "lessBusinessLiabilities" TEXT,
ADD COLUMN     "liabilities" TEXT,
ADD COLUMN     "lifeInsurancePremium" TEXT,
ADD COLUMN     "loanGivenToOthersName" TEXT,
ADD COLUMN     "loanGiventoOthersNid" TEXT,
ADD COLUMN     "loansGivenToOthers" TEXT,
ADD COLUMN     "locationDescriptionOwnershipProportionOfProperty" TEXT,
ADD COLUMN     "motorValue1" TEXT,
ADD COLUMN     "motorValue2" TEXT,
ADD COLUMN     "motorVehiclesTotal" TEXT,
ADD COLUMN     "municipalOrLocalTax" TEXT,
ADD COLUMN     "nameOfBusiness" TEXT,
ADD COLUMN     "nameOfPartnershipFirm1" TEXT,
ADD COLUMN     "nameOfPartnershipFirm2" TEXT,
ADD COLUMN     "nameOfPartnershipFirm3" TEXT,
ADD COLUMN     "natureOfBusiness" TEXT,
ADD COLUMN     "netIncomeFromRent" TEXT,
ADD COLUMN     "netProfitFromAgriculture" TEXT,
ADD COLUMN     "netProfitFromBusinessBalance" TEXT,
ADD COLUMN     "netProfitFromBusinessIncome" TEXT,
ADD COLUMN     "netWealthAtTheLastDateOfThisFinancialYear" TEXT,
ADD COLUMN     "netWealthLastDate" "NetWealthLastDate" NOT NULL,
ADD COLUMN     "netWealthLastDateAmount" TEXT,
ADD COLUMN     "nonAgriculturalLocationDescription1" TEXT,
ADD COLUMN     "nonAgriculturalLocationDescription2" TEXT,
ADD COLUMN     "nonAgriculturalLocationDescription3" TEXT,
ADD COLUMN     "nonAgriculturalLocationDescription4" TEXT,
ADD COLUMN     "nonAgriculturalLocationDescription5" TEXT,
ADD COLUMN     "nonAgriculturalPropertyLandHouseProperty" TEXT,
ADD COLUMN     "nonAgriculturalValue1" TEXT,
ADD COLUMN     "nonAgriculturalValue2" TEXT,
ADD COLUMN     "nonAgriculturalValue3" TEXT,
ADD COLUMN     "nonAgriculturalValue4" TEXT,
ADD COLUMN     "nonAgriculturalValue5" TEXT,
ADD COLUMN     "nonInstitutionalLiabilities" TEXT,
ADD COLUMN     "openingCapital" TEXT,
ADD COLUMN     "ornamentsDesc" TEXT,
ADD COLUMN     "ornamentsValue" TEXT,
ADD COLUMN     "otherAllowableDeduction" TEXT,
ADD COLUMN     "otherAssets" TEXT,
ADD COLUMN     "otherFundDesc" TEXT,
ADD COLUMN     "otherFundOutsideBusiness" TEXT,
ADD COLUMN     "otherIncomePrivate" TEXT,
ADD COLUMN     "otherInvestment" TEXT,
ADD COLUMN     "otherInvestmentDesc" TEXT,
ADD COLUMN     "otherLiabilities" TEXT,
ADD COLUMN     "otherRebatableInvestmentContribution" TEXT,
ADD COLUMN     "othersAssetsDesc" TEXT,
ADD COLUMN     "othersAssetsValue" TEXT,
ADD COLUMN     "perquisitesPrivate" TEXT,
ADD COLUMN     "personalExpenseForLocalForeignTravelId" TEXT,
ADD COLUMN     "personalTransportationExpensesId" TEXT,
ADD COLUMN     "profitFromShoychoyparta10Id" TEXT,
ADD COLUMN     "profitFromShoychoyparta2Id" TEXT,
ADD COLUMN     "profitFromShoychoyparta3Id" TEXT,
ADD COLUMN     "profitFromShoychoyparta4Id" TEXT,
ADD COLUMN     "profitFromShoychoyparta5Id" TEXT,
ADD COLUMN     "profitFromShoychoyparta6Id" TEXT,
ADD COLUMN     "profitFromShoychoyparta7Id" TEXT,
ADD COLUMN     "profitFromShoychoyparta8Id" TEXT,
ADD COLUMN     "profitFromShoychoyparta9Id" TEXT,
ADD COLUMN     "profitFromShoychoypartaTotalId" TEXT,
ADD COLUMN     "profitInterestFromGovtSecurities10Id" TEXT,
ADD COLUMN     "profitInterestFromGovtSecurities2Id" TEXT,
ADD COLUMN     "profitInterestFromGovtSecurities3Id" TEXT,
ADD COLUMN     "profitInterestFromGovtSecurities4Id" TEXT,
ADD COLUMN     "profitInterestFromGovtSecurities5Id" TEXT,
ADD COLUMN     "profitInterestFromGovtSecurities6Id" TEXT,
ADD COLUMN     "profitInterestFromGovtSecurities7Id" TEXT,
ADD COLUMN     "profitInterestFromGovtSecurities8Id" TEXT,
ADD COLUMN     "profitInterestFromGovtSecurities9Id" TEXT,
ADD COLUMN     "profitInterestFromGovtSecuritiesTotalId" TEXT,
ADD COLUMN     "providentFund" TEXT,
ADD COLUMN     "purchase" TEXT,
ADD COLUMN     "receiptInLieuOfOrInAdditionToSalaryOrWagesPrivate" TEXT,
ADD COLUMN     "receiptOfGiftOtherReceipts" TEXT,
ADD COLUMN     "registrationNumber1" TEXT,
ADD COLUMN     "registrationNumber2" TEXT,
ADD COLUMN     "rentReceivedOrAnnualValue" TEXT,
ADD COLUMN     "repairCollectionAmount" TEXT,
ADD COLUMN     "repairCollectionProperty" "RepairCollection",
ADD COLUMN     "salesTurnoverReceiptAgriculture" TEXT,
ADD COLUMN     "salesTurnoverReceiptsBusiness" TEXT,
ADD COLUMN     "sanchayapatraSavingsCertificate" TEXT,
ADD COLUMN     "savingDeposit" TEXT,
ADD COLUMN     "selfAndEmployersContribution" TEXT,
ADD COLUMN     "shareDebentureUnitCertificate" TEXT,
ADD COLUMN     "shareOfProfit1" TEXT,
ADD COLUMN     "shareOfProfit2" TEXT,
ADD COLUMN     "shareOfProfit3" TEXT,
ADD COLUMN     "shonchoypatraId" TEXT,
ADD COLUMN     "sumOfSourceOfFundAndPreviousYearsNetWealth" TEXT,
ADD COLUMN     "taka1000000" TEXT,
ADD COLUMN     "taxDeductedCollectedAtSourceId" TEXT,
ADD COLUMN     "taxExemptedIncomeAndAllowance" TEXT,
ADD COLUMN     "taxpayersShareAmount" TEXT,
ADD COLUMN     "taxpayersSharePercentage" TEXT NOT NULL,
ADD COLUMN     "totalAdmissibleDeduction" TEXT,
ADD COLUMN     "totalAllowableInvestmentContribution" TEXT,
ADD COLUMN     "totalAllowableInvestmentRebateTable" TEXT,
ADD COLUMN     "totalAssets" TEXT,
ADD COLUMN     "totalAssetsInBangladeshAndOutsideBangladesh" TEXT,
ADD COLUMN     "totalAssetslocatedInBangladesh" TEXT,
ADD COLUMN     "totalCapitalsAndLiabilities" TEXT,
ADD COLUMN     "totalCashInHandsAndFundOutsideBusiness" TEXT,
ADD COLUMN     "totalExpenseIndividualPersonId" TEXT,
ADD COLUMN     "totalExpensesAndLoss" TEXT,
ADD COLUMN     "totalFinancialAssets" TEXT,
ADD COLUMN     "totalIncomeFromSalaryPrivate" TEXT,
ADD COLUMN     "totalIncomeRebateTable" TEXT,
ADD COLUMN     "totalIncomeShown" TEXT,
ADD COLUMN     "totalIncomeShownInTheReturn" TEXT,
ADD COLUMN     "totalLiabilitiesOutsideBusiness" TEXT,
ADD COLUMN     "totalRentValue" TEXT,
ADD COLUMN     "totalSalaryReceivedPrivate" TEXT,
ADD COLUMN     "totalSourceOfFund" TEXT,
ADD COLUMN     "totalTaxPaid" TEXT,
ADD COLUMN     "transportFacilityPrivate" TEXT,
ADD COLUMN     "transportFacilityPrivateCheck" BOOLEAN,
ADD COLUMN     "transportFacilityPrivateVehicleCC" "TransportCCType",
ADD COLUMN     "typeOfMotorVehicle1" TEXT,
ADD COLUMN     "typeOfMotorVehicle2" TEXT,
ADD COLUMN     "utilityExpenseId" TEXT,
ADD COLUMN     "vacancyAllowance" TEXT,
ADD COLUMN     "valueOfAnyBenefit" TEXT,
ADD COLUMN     "withdrawalsInTheIncomeYear" TEXT,
ALTER COLUMN "netWealthSurcharge" SET DATA TYPE TEXT,
ALTER COLUMN "excessPayment" SET DATA TYPE TEXT,
ALTER COLUMN "grossTaxOnTaxableIncome" SET DATA TYPE TEXT,
ALTER COLUMN "incomeFromFinancialAssets" SET DATA TYPE TEXT,
ALTER COLUMN "incomeFromOtherSources" SET DATA TYPE TEXT,
ALTER COLUMN "minimumTaxAmount" SET DATA TYPE TEXT,
ALTER COLUMN "netTaxAfterRebate" SET DATA TYPE TEXT,
ALTER COLUMN "taxDeductedOrCollected" SET DATA TYPE TEXT,
ALTER COLUMN "taxExemptedTaxFreeIncome" SET DATA TYPE TEXT,
ALTER COLUMN "taxPayable" SET DATA TYPE TEXT,
ALTER COLUMN "totalAmountPayable" SET DATA TYPE TEXT,
ALTER COLUMN "totalIncome" SET DATA TYPE TEXT,
ALTER COLUMN "totalSurcharge" SET DATA TYPE TEXT,
ALTER COLUMN "totalTaxPaidAndAdjusted" SET DATA TYPE TEXT,
ALTER COLUMN "incomeOfMinor" SET DATA TYPE TEXT,
ALTER COLUMN "shareOfIncomeFromAOP" SET DATA TYPE TEXT,
ALTER COLUMN "taxableIncomeFromAbroad" SET DATA TYPE TEXT,
ALTER COLUMN "environmentalSurcharge" SET DATA TYPE TEXT,
ALTER COLUMN "delayInterest" SET DATA TYPE TEXT,
ALTER COLUMN "advanceTaxPaid" SET DATA TYPE TEXT,
ALTER COLUMN "adjustmentOfTaxRefund" SET DATA TYPE TEXT,
ALTER COLUMN "taxPaidWithThisReturn" SET DATA TYPE TEXT,
ALTER COLUMN "incomeFromAgriculture" SET DATA TYPE TEXT,
ALTER COLUMN "incomeFromBusiness" SET DATA TYPE TEXT,
ALTER COLUMN "incomeFromCapitalGains" SET DATA TYPE TEXT,
ALTER COLUMN "incomeFromEmployment" SET DATA TYPE TEXT,
ALTER COLUMN "incomeFromRent" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "IncomeFromCapitalGains" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "capitalGain" TEXT,
    "exemptedAmount" TEXT,
    "taxableAmount" TEXT,

    CONSTRAINT "IncomeFromCapitalGains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialAssets" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "balance" TEXT,
    "interestProfit" TEXT,
    "sourceTax" TEXT,

    CONSTRAINT "FinancialAssets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalExpense" (
    "id" TEXT NOT NULL,
    "amount" TEXT,
    "comment" TEXT,

    CONSTRAINT "PersonalExpense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_incomeFromShareTransferListedCompanyId_key" ON "IndividualTaxes"("incomeFromShareTransferListedCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_incomeFromCapitalGain2Id_key" ON "IndividualTaxes"("incomeFromCapitalGain2Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_incomeFromCapitalGain3Id_key" ON "IndividualTaxes"("incomeFromCapitalGain3Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_incomeFromCapitalGain4Id_key" ON "IndividualTaxes"("incomeFromCapitalGain4Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_incomeFromCapitalGain5Id_key" ON "IndividualTaxes"("incomeFromCapitalGain5Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_incomeFromCapitalGainsTotalId_key" ON "IndividualTaxes"("incomeFromCapitalGainsTotalId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_shonchoypatraId_key" ON "IndividualTaxes"("shonchoypatraId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitFromShoychoyparta2Id_key" ON "IndividualTaxes"("profitFromShoychoyparta2Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitFromShoychoyparta3Id_key" ON "IndividualTaxes"("profitFromShoychoyparta3Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitFromShoychoyparta4Id_key" ON "IndividualTaxes"("profitFromShoychoyparta4Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitFromShoychoyparta5Id_key" ON "IndividualTaxes"("profitFromShoychoyparta5Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitFromShoychoyparta6Id_key" ON "IndividualTaxes"("profitFromShoychoyparta6Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitFromShoychoyparta7Id_key" ON "IndividualTaxes"("profitFromShoychoyparta7Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitFromShoychoyparta8Id_key" ON "IndividualTaxes"("profitFromShoychoyparta8Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitFromShoychoyparta9Id_key" ON "IndividualTaxes"("profitFromShoychoyparta9Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitFromShoychoyparta10Id_key" ON "IndividualTaxes"("profitFromShoychoyparta10Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitFromShoychoypartaTotalId_key" ON "IndividualTaxes"("profitFromShoychoypartaTotalId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_interestFromSecuritiesId_key" ON "IndividualTaxes"("interestFromSecuritiesId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitInterestFromGovtSecurities2Id_key" ON "IndividualTaxes"("profitInterestFromGovtSecurities2Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitInterestFromGovtSecurities3Id_key" ON "IndividualTaxes"("profitInterestFromGovtSecurities3Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitInterestFromGovtSecurities4Id_key" ON "IndividualTaxes"("profitInterestFromGovtSecurities4Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitInterestFromGovtSecurities5Id_key" ON "IndividualTaxes"("profitInterestFromGovtSecurities5Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitInterestFromGovtSecurities6Id_key" ON "IndividualTaxes"("profitInterestFromGovtSecurities6Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitInterestFromGovtSecurities7Id_key" ON "IndividualTaxes"("profitInterestFromGovtSecurities7Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitInterestFromGovtSecurities8Id_key" ON "IndividualTaxes"("profitInterestFromGovtSecurities8Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitInterestFromGovtSecurities9Id_key" ON "IndividualTaxes"("profitInterestFromGovtSecurities9Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitInterestFromGovtSecurities10Id_key" ON "IndividualTaxes"("profitInterestFromGovtSecurities10Id");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_profitInterestFromGovtSecuritiesTotalId_key" ON "IndividualTaxes"("profitInterestFromGovtSecuritiesTotalId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_expensesForFoodId_key" ON "IndividualTaxes"("expensesForFoodId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_housingExpenseId_key" ON "IndividualTaxes"("housingExpenseId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_personalTransportationExpensesId_key" ON "IndividualTaxes"("personalTransportationExpensesId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_utilityExpenseId_key" ON "IndividualTaxes"("utilityExpenseId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_houseKeepingExpenseId_key" ON "IndividualTaxes"("houseKeepingExpenseId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_humanitiesExpenseId_key" ON "IndividualTaxes"("humanitiesExpenseId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_educationExpensesId_key" ON "IndividualTaxes"("educationExpensesId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_personalExpenseForLocalForeignTravelId_key" ON "IndividualTaxes"("personalExpenseForLocalForeignTravelId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_festivalExpenseId_key" ON "IndividualTaxes"("festivalExpenseId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_taxDeductedCollectedAtSourceId_key" ON "IndividualTaxes"("taxDeductedCollectedAtSourceId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_interestPaidId_key" ON "IndividualTaxes"("interestPaidId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_totalExpenseIndividualPersonId_key" ON "IndividualTaxes"("totalExpenseIndividualPersonId");

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_incomeFromShareTransferListedCompanyId_fkey" FOREIGN KEY ("incomeFromShareTransferListedCompanyId") REFERENCES "IncomeFromCapitalGains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_incomeFromCapitalGain2Id_fkey" FOREIGN KEY ("incomeFromCapitalGain2Id") REFERENCES "IncomeFromCapitalGains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_incomeFromCapitalGain3Id_fkey" FOREIGN KEY ("incomeFromCapitalGain3Id") REFERENCES "IncomeFromCapitalGains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_incomeFromCapitalGain4Id_fkey" FOREIGN KEY ("incomeFromCapitalGain4Id") REFERENCES "IncomeFromCapitalGains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_incomeFromCapitalGain5Id_fkey" FOREIGN KEY ("incomeFromCapitalGain5Id") REFERENCES "IncomeFromCapitalGains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_incomeFromCapitalGainsTotalId_fkey" FOREIGN KEY ("incomeFromCapitalGainsTotalId") REFERENCES "IncomeFromCapitalGains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_shonchoypatraId_fkey" FOREIGN KEY ("shonchoypatraId") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitFromShoychoyparta2Id_fkey" FOREIGN KEY ("profitFromShoychoyparta2Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitFromShoychoyparta3Id_fkey" FOREIGN KEY ("profitFromShoychoyparta3Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitFromShoychoyparta4Id_fkey" FOREIGN KEY ("profitFromShoychoyparta4Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitFromShoychoyparta5Id_fkey" FOREIGN KEY ("profitFromShoychoyparta5Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitFromShoychoyparta6Id_fkey" FOREIGN KEY ("profitFromShoychoyparta6Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitFromShoychoyparta7Id_fkey" FOREIGN KEY ("profitFromShoychoyparta7Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitFromShoychoyparta8Id_fkey" FOREIGN KEY ("profitFromShoychoyparta8Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitFromShoychoyparta9Id_fkey" FOREIGN KEY ("profitFromShoychoyparta9Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitFromShoychoyparta10Id_fkey" FOREIGN KEY ("profitFromShoychoyparta10Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitFromShoychoypartaTotalId_fkey" FOREIGN KEY ("profitFromShoychoypartaTotalId") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_interestFromSecuritiesId_fkey" FOREIGN KEY ("interestFromSecuritiesId") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitInterestFromGovtSecurities2Id_fkey" FOREIGN KEY ("profitInterestFromGovtSecurities2Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitInterestFromGovtSecurities3Id_fkey" FOREIGN KEY ("profitInterestFromGovtSecurities3Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitInterestFromGovtSecurities4Id_fkey" FOREIGN KEY ("profitInterestFromGovtSecurities4Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitInterestFromGovtSecurities5Id_fkey" FOREIGN KEY ("profitInterestFromGovtSecurities5Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitInterestFromGovtSecurities6Id_fkey" FOREIGN KEY ("profitInterestFromGovtSecurities6Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitInterestFromGovtSecurities7Id_fkey" FOREIGN KEY ("profitInterestFromGovtSecurities7Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitInterestFromGovtSecurities8Id_fkey" FOREIGN KEY ("profitInterestFromGovtSecurities8Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitInterestFromGovtSecurities9Id_fkey" FOREIGN KEY ("profitInterestFromGovtSecurities9Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitInterestFromGovtSecurities10Id_fkey" FOREIGN KEY ("profitInterestFromGovtSecurities10Id") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_profitInterestFromGovtSecuritiesTotalId_fkey" FOREIGN KEY ("profitInterestFromGovtSecuritiesTotalId") REFERENCES "FinancialAssets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_expensesForFoodId_fkey" FOREIGN KEY ("expensesForFoodId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_housingExpenseId_fkey" FOREIGN KEY ("housingExpenseId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_personalTransportationExpensesId_fkey" FOREIGN KEY ("personalTransportationExpensesId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_utilityExpenseId_fkey" FOREIGN KEY ("utilityExpenseId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_houseKeepingExpenseId_fkey" FOREIGN KEY ("houseKeepingExpenseId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_humanitiesExpenseId_fkey" FOREIGN KEY ("humanitiesExpenseId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_educationExpensesId_fkey" FOREIGN KEY ("educationExpensesId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_personalExpenseForLocalForeignTravelId_fkey" FOREIGN KEY ("personalExpenseForLocalForeignTravelId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_festivalExpenseId_fkey" FOREIGN KEY ("festivalExpenseId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_taxDeductedCollectedAtSourceId_fkey" FOREIGN KEY ("taxDeductedCollectedAtSourceId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_interestPaidId_fkey" FOREIGN KEY ("interestPaidId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_totalExpenseIndividualPersonId_fkey" FOREIGN KEY ("totalExpenseIndividualPersonId") REFERENCES "PersonalExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

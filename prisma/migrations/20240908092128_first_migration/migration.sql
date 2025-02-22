-- CreateEnum
CREATE TYPE "ResidentialStatus" AS ENUM ('Resident', 'NonResident');

-- CreateEnum
CREATE TYPE "SpecialBenefits" AS ENUM ('None', 'GazettedWarWoundedFreedomFighter', 'Female', 'ThirdGender', 'DisabledPerson', 'Aged65OrMore');

-- CreateEnum
CREATE TYPE "MinimumTax" AS ENUM ('DhakaChattogramCityCorporationArea', 'OtherCityCorporationArea', 'OtherArea');

-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "RepairCollection" AS ENUM ('COMMERCIAL_PROPERTY', 'NON_COMMERCIAL', 'RESIDENTIAL_PROPERTY', 'MIXED_PROPERTY');

-- CreateEnum
CREATE TYPE "NetWealthLastDate" AS ENUM ('YES', 'NO_I_AM_A_NEW_TAXPAYER');

-- CreateTable
CREATE TABLE "IndividualTaxes" (
    "id" TEXT NOT NULL,
    "taxpayerName" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "tin" TEXT NOT NULL,
    "circle" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "residentialStatus" "ResidentialStatus" NOT NULL,
    "specialBenefits" "SpecialBenefits",
    "isParentOfDisabledPerson" BOOLEAN,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "spouseName" TEXT,
    "spouseTin" TEXT,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "telephone" TEXT,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "employerName" TEXT,
    "businessName" TEXT,
    "bin" TEXT,
    "partnerName" TEXT,
    "partnerTin" TEXT,
    "specialFarmingIncome" BOOLEAN NOT NULL,
    "incomeOfMinor" TEXT,
    "partnersMembersAssociation1" TEXT,
    "partnersMembersAssociation2" TEXT,
    "incomeYearEndedOn" TIMESTAMP(3),
    "incomeFishFarming" BOOLEAN,
    "incomeFishFarmingAmount" TEXT,
    "shareOfIncomeFromAOP" TEXT,
    "taxableIncomeFromAbroad" TEXT,
    "minimumTax" "MinimumTax" NOT NULL,
    "netWealthSurcharge" "YesNo" NOT NULL,
    "environmentalSurcharge" TEXT,
    "delayInterest" TEXT,
    "advanceTaxPaid" TEXT,
    "adjustmentOfTaxRefund" TEXT,
    "taxPaidWithThisReturn" TEXT NOT NULL,
    "listOfDocumentsFurnishedWithThisReturn1" TEXT,
    "listOfDocumentsFurnishedWithThisReturn2" TEXT,
    "fatherOrHusband" TEXT NOT NULL,
    "placeOfSignature" TEXT,
    "signature" TEXT,
    "dateOfSignature" TIMESTAMP(3) NOT NULL,
    "incomeFromEmployment" "YesNo" NOT NULL,
    "privateOrganization" TEXT NOT NULL,
    "government" TEXT NOT NULL,
    "taxDeductedSourceIncomeFromEmployment" TEXT NOT NULL,
    "locationDescriptionOwnershipProportionOfProperty" TEXT,
    "rentReceivedOrAnnualValue" TEXT,
    "advanceRentReceived" TEXT,
    "valueOfAnyBenefit" TEXT,
    "adjustedAdvanceRent" TEXT,
    "vacancyAllowance" TEXT,
    "repairCollection" "RepairCollection",
    "municipalOrLocalTax" TEXT,
    "landRevenue" TEXT,
    "interestMortgageCapitalCharge" TEXT,
    "insurancePremiumPaid" TEXT,
    "others" TEXT,
    "TaxpayersShare" TEXT NOT NULL,
    "taxDeductedSourceFromIncomeRent" TEXT,
    "salesTurnoverReceipt" TEXT,
    "grossProfit" TEXT,
    "generalExpensesSellingExpenses" TEXT,
    "nameOfBusiness" TEXT,
    "natureOfBusiness" TEXT,
    "addressOfBusiness" TEXT,
    "salesTurnoverReceipts" TEXT,
    "grossProfitAmount" TEXT,
    "generalAdministrativeSellingExpenses" TEXT,
    "badDebtExpense" TEXT,
    "inventories" TEXT,
    "fixedAssets" TEXT,
    "otherAssets" TEXT,
    "openingCapital" TEXT,
    "withdrawalsInTheIncomeYear" TEXT,
    "liabilities" TEXT,
    "interestProfitFromBankFIAmount" TEXT,
    "interestProfitFromBankFIDeductions" TEXT,
    "interestProfitFromBankFITax" TEXT,
    "incomeFromSavingCertificatesAmount" TEXT,
    "incomeFromSavingCertificatesDeductions" TEXT,
    "incomeFromSavingCertificatesTax" TEXT,
    "incomeFromSecuritiesDebenturesAmount" TEXT,
    "incomeFromSecuritiesDebenturesDeductions" TEXT,
    "incomeFromSecuritiesDebenturesTax" TEXT,
    "incomeFromFinancialProductSchemeAmount" TEXT,
    "incomeFromFinancialProductSchemeDeductions" TEXT,
    "incomeFromFinancialProductSchemeTax" TEXT,
    "dividendIncomeAmount" TEXT,
    "dividendIncomeDeductions" TEXT,
    "dividendIncomeTax" TEXT,
    "capitalGainFromTransferOfPropertyAmount" TEXT,
    "capitalGainFromTransferOfPropertyDeductions" TEXT,
    "capitalGainFromTransferOfPropertyTax" TEXT,
    "incomeFromBusinessAmount" TEXT,
    "incomeFromBusinessDeductions" TEXT,
    "incomeFromBusinessTax" TEXT,
    "workersParticipationFundAmount" TEXT,
    "workersParticipationFundDeductions" TEXT,
    "workersParticipationFundTax" TEXT,
    "incomeFromOtherSourcesAmount" TEXT,
    "incomeFromOtherSourcesDeductions" TEXT,
    "incomeFromOtherSourcesTax" TEXT,
    "lifeInsurancePremium" TEXT,
    "contributionToDeposit" TEXT,
    "investmentInGovernmentSecurities1" TEXT,
    "investmentInGovernmentSecurities2" TEXT,
    "investmentInSecurities" TEXT,
    "contributionToProvidentFund" TEXT,
    "SelfAndEmployersContribution" TEXT,
    "contributionToSuperAnnuationFund" TEXT,
    "contributionToBenevolentFund" TEXT,
    "contributionToZakatFund1" TEXT,
    "contributionToZakatFund2" TEXT,
    "OthersIf1" TEXT,
    "OthersIf2" TEXT,
    "expensesForFoodAmount" TEXT,
    "expensesForFoodComment" TEXT,
    "housingExpenseAmount" TEXT,
    "housingExpenseComment" TEXT,
    "personalTransportationExpensesAmount" TEXT,
    "personalTransportationExpensesAmountComment" TEXT,
    "utilityExpenseAmount" TEXT,
    "utilityExpenseComment" TEXT,
    "educationExpensesAmount" TEXT,
    "educationExpensesComment" TEXT,
    "personalExpenseAmount" TEXT,
    "personalExpenseComment" TEXT,
    "festivalExpenseAmount" TEXT,
    "festivalExpenseComment" TEXT,
    "taxDeductedAmount" TEXT,
    "taxDeductedComment" TEXT,
    "advanceTaxPaid2Amount" TEXT,
    "advanceTaxPaidComment" TEXT,
    "taxSurchargePaidAmount" TEXT,
    "taxSurchargePaidComment" TEXT,
    "interestPaidAmount" TEXT,
    "interestPaidComment" TEXT,
    "total" TEXT,
    "exemptedIncomeFromBusiness" TEXT,
    "exemptedAgriculturalIncome" TEXT,
    "incomeFromProvidentFund" TEXT,
    "foreignRemittance" TEXT,
    "typeOfReceipts1" TEXT,
    "typeOfReceipts2" TEXT,
    "typeOfReceipts3" TEXT,
    "typeOfReceiptsAmount1" TEXT,
    "typeOfReceiptsAmount2" TEXT,
    "typeOfReceiptsAmount3" TEXT,
    "netWealthLastDate" "NetWealthLastDate" NOT NULL,
    "giftExpense" TEXT,
    "institutionalLiabilities" TEXT,
    "nonInstitutionalLiabilities" TEXT,
    "otherLiabilities" TEXT,
    "totalAssetOfBusiness" TEXT,
    "lessBusinessLiabilities" TEXT,
    "companyName1" TEXT,
    "companyName2" TEXT,
    "companyName3" TEXT,
    "noOfShare1" TEXT,
    "noOfShare2" TEXT,
    "noOfShare3" TEXT,
    "value1" TEXT,
    "value2" TEXT,
    "value3" TEXT,
    "nameOfPartnershipFirm1" TEXT,
    "nameOfPartnershipFirm2" TEXT,
    "nameOfPartnershipFirm3" TEXT,
    "shareOfProfit1" TEXT,
    "shareOfProfit2" TEXT,
    "shareOfProfit3" TEXT,
    "capitalContributed1" TEXT,
    "capitalContributed2" TEXT,
    "capitalContributed3" TEXT,
    "locationDescription1" TEXT,
    "locationDescription2" TEXT,
    "locationDescription3" TEXT,
    "locationDescription4" TEXT,
    "locationDescription5" TEXT,
    "locationValue1" TEXT,
    "locationValue2" TEXT,
    "locationValue3" TEXT,
    "locationValue4" TEXT,
    "locationValue5" TEXT,
    "agriculturalLocationAndDescription1" TEXT,
    "agriculturalLocationAndDescription2" TEXT,
    "agriculturalLocationAndDescription3" TEXT,
    "agriculturalLocationValue1" TEXT,
    "agriculturalLocationValue2" TEXT,
    "agriculturalLocationValue3" TEXT,
    "shareDebentureUnitCertificate" TEXT,
    "bondsGovernment" TEXT,
    "sanchayapatraSavingsCertificate" TEXT,
    "depositPensionScheme" TEXT,
    "loansGivenToOthers" TEXT,
    "name" TEXT,
    "nid" TEXT,
    "nidValue" TEXT,
    "savingDeposit" TEXT,
    "providentFund" TEXT,
    "otherInvestment1" TEXT,
    "otherInvestment2" TEXT,
    "typeOfMotorVehicle1" TEXT,
    "typeOfMotorVehicle2" TEXT,
    "registrationNumber1" TEXT,
    "registrationNumber2" TEXT,
    "motorValue1" TEXT,
    "motorValue2" TEXT,
    "ornaments1" TEXT,
    "ornaments2" TEXT,
    "furnitureAndElectronic" TEXT,
    "othersAssets1" TEXT,
    "othersAssets2" TEXT,
    "bankBalance" TEXT,
    "cashInHand" TEXT,
    "others1" TEXT,
    "others2" TEXT,
    "assetOutsideBangladesh" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndividualTaxes_pkey" PRIMARY KEY ("id")
);

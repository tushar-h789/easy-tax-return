"use server";

import prisma from "@/lib/prisma";
import { IndividualTaxes, PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "@/app/(site)/individual-tax-return/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";

type Operation = "create" | "update";

// Helper functions to create nested relations
async function handleGovtPayScales(
  tx: Prisma.TransactionClient,
  data: IndividualTaxReturnFormInput,
  operation: Operation,
  existingTaxReturn?: IndividualTaxes
) {
  const govtPayScales = [
    { field: "basicPayGovt", idField: "basicPayGovtId" },
    { field: "arrearPayGovt", idField: "arrearPayGovtId" },
    { field: "specialAllowanceGovt", idField: "specialAllowanceGovtId" },
    { field: "houseRentAllowanceGovt", idField: "houseRentAllowanceGovtId" },
    { field: "medicalAllowanceGovt", idField: "medicalAllowanceGovtId" },
    { field: "conveyanceAllowanceGovt", idField: "conveyanceAllowanceGovtId" },
    { field: "festivalAllowanceGovt", idField: "festivalAllowanceGovtId" },
    {
      field: "allowanceForSupportStaffGovt",
      idField: "allowanceForSupportStaffGovtId",
    },
    { field: "leaveAllowanceGovt", idField: "leaveAllowanceGovtId" },
    { field: "honorariumRewardGovt", idField: "honorariumRewardGovtId" },
    { field: "overtimeAllowanceGovt", idField: "overtimeAllowanceGovtId" },
    {
      field: "banglaNoboborshoAllowancesGovt",
      idField: "banglaNoboborshoAllowancesGovtId",
    },
    {
      field: "interestAccruedProvidentFundGovt",
      idField: "interestAccruedProvidentFundGovtId",
    },
    { field: "lumpGrantGovt", idField: "lumpGrantGovtId" },
    { field: "gratuityGovt", idField: "gratuityGovtId" },
    { field: "otherAllowanceGovt", idField: "otherAllowanceGovtId" },
    { field: "totalGovt", idField: "totalGovtId" },
  ] as const;

  const results: Record<string, string> = {};

  for (const { field, idField } of govtPayScales) {
    const payScale = {
      amount: data[field]?.amount || null,
      taxExempted: data[field]?.taxExempted || null,
      taxable: data[field]?.taxable || null,
    };

    if (operation === "create") {
      const result = await tx.govtPayScale.create({
        data: payScale,
      });
      results[idField] = result.id;
    } else if (operation === "update" && existingTaxReturn) {
      await tx.govtPayScale.update({
        where: { id: existingTaxReturn[idField] ?? "" },
        data: payScale,
      });
    }
  }

  return operation === "create" ? results : undefined;
}

async function handleFinancialAssets(
  tx: Prisma.TransactionClient,
  data: IndividualTaxReturnFormInput,
  operation: Operation,
  existingTaxReturn?: IndividualTaxes
) {
  const financialAssets = [
    // Shonchoyparta entries
    { field: "shonchoyparta", idField: "shonchoypatraId" },
    {
      field: "profitFromShoychoyparta2",
      idField: "profitFromShoychoyparta2Id",
    },
    {
      field: "profitFromShoychoyparta3",
      idField: "profitFromShoychoyparta3Id",
    },
    {
      field: "profitFromShoychoyparta4",
      idField: "profitFromShoychoyparta4Id",
    },
    {
      field: "profitFromShoychoyparta5",
      idField: "profitFromShoychoyparta5Id",
    },
    {
      field: "profitFromShoychoyparta6",
      idField: "profitFromShoychoyparta6Id",
    },
    {
      field: "profitFromShoychoyparta7",
      idField: "profitFromShoychoyparta7Id",
    },
    {
      field: "profitFromShoychoyparta8",
      idField: "profitFromShoychoyparta8Id",
    },
    {
      field: "profitFromShoychoyparta9",
      idField: "profitFromShoychoyparta9Id",
    },
    {
      field: "profitFromShoychoyparta10",
      idField: "profitFromShoychoyparta10Id",
    },
    {
      field: "profitFromShoychoypartaTotal",
      idField: "profitFromShoychoypartaTotalId",
    },

    // Securities entries
    { field: "interestFromSecurities", idField: "interestFromSecuritiesId" },
    {
      field: "profitInterestFromGovtSecurities2",
      idField: "profitInterestFromGovtSecurities2Id",
    },
    {
      field: "profitInterestFromGovtSecurities3",
      idField: "profitInterestFromGovtSecurities3Id",
    },
    {
      field: "profitInterestFromGovtSecurities4",
      idField: "profitInterestFromGovtSecurities4Id",
    },
    {
      field: "profitInterestFromGovtSecurities5",
      idField: "profitInterestFromGovtSecurities5Id",
    },
    {
      field: "profitInterestFromGovtSecurities6",
      idField: "profitInterestFromGovtSecurities6Id",
    },
    {
      field: "profitInterestFromGovtSecurities7",
      idField: "profitInterestFromGovtSecurities7Id",
    },
    {
      field: "profitInterestFromGovtSecurities8",
      idField: "profitInterestFromGovtSecurities8Id",
    },
    {
      field: "profitInterestFromGovtSecurities9",
      idField: "profitInterestFromGovtSecurities9Id",
    },
    {
      field: "profitInterestFromGovtSecurities10",
      idField: "profitInterestFromGovtSecurities10Id",
    },
    {
      field: "profitInterestFromGovtSecuritiesTotal",
      idField: "profitInterestFromGovtSecuritiesTotalId",
    },
  ] as const;

  const results: Record<string, string> = {};

  for (const { field, idField } of financialAssets) {
    const assetData = {
      description: data[field]?.description || null,
      balance: data[field]?.balance || null,
      interestProfit: data[field]?.interestProfit || null,
      sourceTax: data[field]?.sourceTax || null,
    };

    if (operation === "create") {
      const result = await tx.financialAssets.create({
        data: assetData,
      });
      results[idField] = result.id;
    } else if (operation === "update" && existingTaxReturn) {
      await tx.financialAssets.update({
        where: { id: existingTaxReturn[idField] ?? "" },
        data: assetData,
      });
    }
  }

  return operation === "create" ? results : undefined;
}

async function handleCapitalGains(
  tx: Prisma.TransactionClient,
  data: IndividualTaxReturnFormInput,
  operation: Operation,
  existingTaxReturn?: IndividualTaxes
) {
  // Define all the capital gains fields and their corresponding ID fields
  const capitalGains = [
    {
      field: "incomeFromShareTransferListedCompany",
      idField: "incomeFromShareTransferListedCompanyId",
    },
    {
      field: "incomeFromCapitalGain2",
      idField: "incomeFromCapitalGain2Id",
    },
    {
      field: "incomeFromCapitalGain3",
      idField: "incomeFromCapitalGain3Id",
    },
    {
      field: "incomeFromCapitalGain4",
      idField: "incomeFromCapitalGain4Id",
    },
    {
      field: "incomeFromCapitalGain5",
      idField: "incomeFromCapitalGain5Id",
    },
    {
      field: "incomeFromCapitalGainsTotal",
      idField: "incomeFromCapitalGainsTotalId",
    },
  ] as const;

  const results: Record<string, string> = {};

  for (const { field, idField } of capitalGains) {
    const capitalGain = {
      description: data[field]?.description || null,
      capitalGain: data[field]?.capitalGain || null,
      exemptedAmount: data[field]?.exemptedAmount || null,
      taxableAmount: data[field]?.taxableAmount || null,
    };

    if (operation === "create") {
      const result = await tx.incomeFromCapitalGains.create({
        data: capitalGain,
      });
      results[idField] = result.id;
    } else if (operation === "update" && existingTaxReturn) {
      await tx.incomeFromCapitalGains.update({
        where: { id: existingTaxReturn[idField] ?? "" },
        data: capitalGain,
      });
    }
  }

  return operation === "create" ? results : undefined;
}

async function handlePersonalExpenses(
  tx: Prisma.TransactionClient,
  data: IndividualTaxReturnFormInput,
  operation: Operation,
  existingTaxReturn?: IndividualTaxes
) {
  const personalExpenses = [
    { field: "expensesForFood", idField: "expensesForFoodId" },
    { field: "housingExpense", idField: "housingExpenseId" },
    {
      field: "personalTransportationExpenses",
      idField: "personalTransportationExpensesId",
    },
    { field: "utilityExpense", idField: "utilityExpenseId" },
    { field: "houseKeepingExpense", idField: "houseKeepingExpenseId" },
    { field: "humanitiesExpense", idField: "humanitiesExpenseId" },
    { field: "educationExpenses", idField: "educationExpensesId" },
    {
      field: "personalExpenseForLocalForeignTravel",
      idField: "personalExpenseForLocalForeignTravelId",
    },
    { field: "festivalExpense", idField: "festivalExpenseId" },
    {
      field: "taxDeductedCollectedAtSource",
      idField: "taxDeductedCollectedAtSourceId",
    },
    { field: "interestPaid", idField: "interestPaidId" },
    {
      field: "totalExpenseIndividualPerson",
      idField: "totalExpenseIndividualPersonId",
    },
  ] as const;

  const results: Record<string, string> = {};

  for (const { field, idField } of personalExpenses) {
    const expenseData = {
      amount: data[field]?.amount || null,
      comment: data[field]?.comment || null,
    };

    if (operation === "create") {
      const result = await tx.personalExpense.create({
        data: expenseData,
      });
      results[idField] = result.id;
    } else if (operation === "update" && existingTaxReturn) {
      await tx.personalExpense.update({
        where: { id: existingTaxReturn[idField] ?? "" },
        data: expenseData,
      });
    }
  }

  return operation === "create" ? results : undefined;
}

async function getTaxReturnData({
  tx,
  validatedData,
  operation,
  existingTaxReturn,
}: {
  tx: Prisma.TransactionClient;
  validatedData: IndividualTaxReturnFormInput;
  operation: Operation;
  existingTaxReturn?: IndividualTaxes;
}) {
  const govtPayScales = await handleGovtPayScales(
    tx,
    validatedData,
    operation,
    existingTaxReturn
  );
  const capitalGains = await handleCapitalGains(
    tx,
    validatedData,
    operation,
    existingTaxReturn
  );
  const financialAssets = await handleFinancialAssets(
    tx,
    validatedData,
    operation,
    existingTaxReturn
  );
  const personalExpenses = await handlePersonalExpenses(
    tx,
    validatedData,
    operation,
    existingTaxReturn
  );

  return {
    // Image 1
    taxpayerName: validatedData.taxpayerName,
    nationalId: validatedData.nationalId,
    tin: validatedData.tin,
    circle: validatedData.circle,
    zone: validatedData.zone,
    assessmentYear: validatedData.assessmentYear,
    residentialStatus: validatedData.residentialStatus,
    assesseeStatus: validatedData.assesseeStatus,
    specialBenefits: validatedData.specialBenefits || null,
    isParentOfDisabledPerson: validatedData.isParentOfDisabledPerson || false,
    dateOfBirth: validatedData.dateOfBirth,
    spouseName: validatedData.spouseName || null,
    spouseTin: validatedData.spouseTin || null,
    addressLine1: validatedData.addressLine1,
    addressLine2: validatedData.addressLine2 || null,
    telephone: validatedData.telephone || null,
    mobile: validatedData.mobile,
    email: validatedData.email,
    employerName: validatedData.employerName || null,
    businessName: validatedData.businessName || null,
    bin: validatedData.bin || null,
    partnersMembersAssociation1:
      validatedData.partnersMembersAssociation1 || null,
    partnersMembersAssociation2:
      validatedData.partnersMembersAssociation2 || null,

    // Image 2
    statementOfIncomeYearEndedOn:
      validatedData.statementOfIncomeYearEndedOn || null,
    incomeFromEmployment: validatedData.incomeFromEmployment || null,
    incomeFromRent: validatedData.incomeFromRent || null,
    incomeFromAgriculture: validatedData.incomeFromAgriculture || null,
    incomeFromBusiness: validatedData.incomeFromBusiness || null,
    incomeFromCapitalGains: validatedData.incomeFromCapitalGains || null,
    incomeFromFinancialAssets: validatedData.incomeFromFinancialAssets || null,
    incomeFromOtherSources: validatedData.incomeFromOtherSources || null,
    shareOfIncomeFromAOP: validatedData.shareOfIncomeFromAOP || null,
    incomeOfMinor: validatedData.incomeOfMinor || null,
    taxableIncomeFromAbroad: validatedData.taxableIncomeFromAbroad || null,
    totalIncome: validatedData.totalIncome || null,
    totalAmountPayable: validatedData.totalAmountPayable || null,
    minimumTax: validatedData.minimumTax || null,
    netWealthSurcharge: validatedData.netWealthSurcharge || null,
    taxPayable: validatedData.taxPayable || null,
    environmentalSurcharge: validatedData.environmentalSurcharge || null,
    totalSurcharge: validatedData.totalSurcharge || null,
    delayInterest: validatedData.delayInterest || null,
    grossTaxOnTaxableIncome: validatedData.grossTaxOnTaxableIncome || null,
    netTaxAfterRebate: validatedData.netTaxAfterRebate || null,
    minimumTaxAmount: validatedData.minimumTaxAmount || null,

    // Image 3
    taxDeductedOrCollected: validatedData.taxDeductedOrCollected || null,
    advanceTaxPaid: validatedData.advanceTaxPaid || null,
    adjustmentOfTaxRefund: validatedData.adjustmentOfTaxRefund || null,
    taxPaidWithThisReturn: validatedData.taxPaidWithThisReturn || null,
    totalTaxPaidAndAdjusted: validatedData.totalTaxPaidAndAdjusted || null,
    excessPayment: validatedData.excessPayment || null,
    taxExemptedTaxFreeIncome: validatedData.taxExemptedTaxFreeIncome || null,
    listOfDocumentsFurnishedWithThisReturn1:
      validatedData.listOfDocumentsFurnishedWithThisReturn1 || null,
    listOfDocumentsFurnishedWithThisReturn2:
      validatedData.listOfDocumentsFurnishedWithThisReturn2 || null,
    fatherOrHusband: validatedData.fatherOrHusband,
    placeOfSignature: validatedData.placeOfSignature || null,
    signature: validatedData.signature || null,
    dateOfSignature: new Date(), // or from validatedData

    // Image 4
    isIncomeFromEmployment: validatedData.isIncomeFromEmployment, // or from validatedData, enum value
    typeOfEmployment: validatedData.typeOfEmployment || null,

    // Image 4 - Govt
    ...(govtPayScales || {}),

    // Image 4 - Private
    basicPayPrivate: validatedData.basicPayPrivate || null,
    allowancesPrivate: validatedData.allowancesPrivate || null,
    advanceArrearSalaryPrivate:
      validatedData.advanceArrearSalaryPrivate || null,
    gratuityAnnuityPensionOrSimilarBenefitPrivate:
      validatedData.gratuityAnnuityPensionOrSimilarBenefitPrivate || null,
    perquisitesPrivate: validatedData.perquisitesPrivate || null,
    receiptInLieuOfOrInAdditionToSalaryOrWagesPrivate:
      validatedData.receiptInLieuOfOrInAdditionToSalaryOrWagesPrivate || null,
    incomeFromEmployeeShareSchemePrivate:
      validatedData.incomeFromEmployeeShareSchemePrivate || null,
    accommodationFacilityPrivate:
      validatedData.accommodationFacilityPrivate || null,
    transportFacilityPrivate: validatedData.transportFacilityPrivate || null,
    transportFacilityPrivateCheck:
      validatedData.transportFacilityPrivateCheck || null,
    transportFacilityPrivateVehicleCC:
      validatedData.transportFacilityPrivateVehicleCC || null,
    anyOtherFacilityProvidedByEmployerPrivate:
      validatedData.anyOtherFacilityProvidedByEmployerPrivate || null,
    employerContributionToProvidentFundPrivate:
      validatedData.employerContributionToProvidentFundPrivate || null,
    otherIncomePrivate: validatedData.otherIncomePrivate || null,
    totalSalaryReceivedPrivate:
      validatedData.totalSalaryReceivedPrivate || null,
    exemptedAmountPrivate: validatedData.exemptedAmountPrivate || null,
    totalIncomeFromSalaryPrivate:
      validatedData.totalIncomeFromSalaryPrivate || null,

    // Image 5
    locationDescriptionOwnershipProportionOfProperty:
      validatedData.locationDescriptionOwnershipProportionOfProperty || null,
    rentReceivedOrAnnualValue: validatedData.rentReceivedOrAnnualValue || null,
    advanceRentReceived: validatedData.advanceRentReceived || null,
    valueOfAnyBenefit: validatedData.valueOfAnyBenefit || null,
    adjustedAdvanceRent: validatedData.adjustedAdvanceRent || null,
    vacancyAllowance: validatedData.vacancyAllowance || null,
    totalRentValue: validatedData.totalRentValue || null,
    repairCollectionProperty: validatedData.repairCollectionProperty || null,
    repairCollectionAmount: validatedData.repairCollectionAmount || null,
    municipalOrLocalTax: validatedData.municipalOrLocalTax || null,
    landRevenue: validatedData.landRevenue || null,
    interestMortgageCapitalCharge:
      validatedData.interestMortgageCapitalCharge || null,
    insurancePremiumPaid: validatedData.insurancePremiumPaid || null,
    otherAllowableDeduction: validatedData.otherAllowableDeduction || null,
    taxpayersSharePercentage: validatedData.taxpayersSharePercentage || "0",
    taxpayersShareAmount: validatedData.taxpayersShareAmount || null,
    salesTurnoverReceiptAgriculture:
      validatedData.salesTurnoverReceiptAgriculture || null,
    grossProfitFromAgriculture:
      validatedData.grossProfitFromAgriculture || null,
    generalExpensesSellingExpenses:
      validatedData.generalExpensesSellingExpenses || null,
    totalAdmissibleDeduction: validatedData.totalAdmissibleDeduction || null,
    netIncomeFromRent: validatedData.netIncomeFromRent || null,
    netProfitFromAgriculture: validatedData.netProfitFromAgriculture || null,

    // Image 6
    nameOfBusiness: validatedData.nameOfBusiness || null,
    natureOfBusiness: validatedData.natureOfBusiness || null,
    addressOfBusiness: validatedData.addressOfBusiness || null,
    // Summary of income
    salesTurnoverReceiptsBusiness:
      validatedData.salesTurnoverReceiptsBusiness || null,
    purchase: validatedData.purchase || null,
    grossProfitFromBusiness: validatedData.grossProfitFromBusiness || null,
    generalAdministrativeSellingExpenses:
      validatedData.generalAdministrativeSellingExpenses || null,
    badDebtExpense: validatedData.badDebtExpense || null,
    netProfitFromBusinessIncome:
      validatedData.netProfitFromBusinessIncome || null,
    // Balance sheet
    cashInHandAtBank: validatedData.cashInHandAtBank || null,
    inventories: validatedData.inventories || null,
    fixedAssets: validatedData.fixedAssets || null,
    otherAssets: validatedData.otherAssets || null,
    totalAssets: validatedData.totalAssets || null,
    openingCapital: validatedData.openingCapital || null,
    netProfitFromBusinessBalance:
      validatedData.netProfitFromBusinessBalance || null,
    withdrawalsInTheIncomeYear:
      validatedData.withdrawalsInTheIncomeYear || null,
    closingCapital: validatedData.closingCapital || null,
    liabilities: validatedData.liabilities || null,
    totalCapitalsAndLiabilities:
      validatedData.totalCapitalsAndLiabilities || null,

    // Capital gains relations
    ...(capitalGains || {}),

    // Image 7
    ...(financialAssets || {}),

    // Image 8
    lifeInsurancePremium: validatedData.lifeInsurancePremium || null,
    contributionToDeposit: validatedData.contributionToDeposit || null,
    investmentInGovernmentSecurities:
      validatedData.investmentInGovernmentSecurities || null,
    investmentInSecuritiesStock:
      validatedData.investmentInSecuritiesStock || null,
    contributionToProvidentFund:
      validatedData.contributionToProvidentFund || null,
    selfAndEmployersContribution:
      validatedData.selfAndEmployersContribution || null,
    contributionToSuperAnnuationFund:
      validatedData.contributionToSuperAnnuationFund || null,
    contributionToBenevolentFund:
      validatedData.contributionToBenevolentFund || null,
    contributionToZakatFund: validatedData.contributionToZakatFund || null,
    otherRebatableInvestmentContribution:
      validatedData.otherRebatableInvestmentContribution || null,
    amountOfTaxRebate: validatedData.amountOfTaxRebate || null,
    totalAllowableInvestmentContribution:
      validatedData.totalAllowableInvestmentContribution || null,
    totalIncomeRebateTable: validatedData.totalIncomeRebateTable || null,
    totalAllowableInvestmentRebateTable:
      validatedData.totalAllowableInvestmentRebateTable || null,
    taka1000000: validatedData.taka1000000 || null,

    // Image 9
    ...(personalExpenses || {}),

    // Image 10 - Net Wealth and Liabilities
    netWealthLastDate: validatedData.netWealthLastDate, // or from validatedData, enum value
    netWealthLastDateAmount: validatedData.netWealthLastDateAmount || null,
    giftExpense: validatedData.giftExpense || null,
    institutionalLiabilities: validatedData.institutionalLiabilities || null,
    nonInstitutionalLiabilities:
      validatedData.nonInstitutionalLiabilities || null,
    otherLiabilities: validatedData.otherLiabilities || null,
    lessBusinessLiabilities: validatedData.lessBusinessLiabilities || null,

    // Directors Shareholding
    directorsShareholdingCompanyName1:
      validatedData.directorsShareholdingCompanyName1 || null,
    directorsShareholdingCompanyName2:
      validatedData.directorsShareholdingCompanyName2 || null,
    directorsShareholdingCompanyName3:
      validatedData.directorsShareholdingCompanyName3 || null,
    directorsShareholdingNoOfShare1:
      validatedData.directorsShareholdingNoOfShare1 || null,
    directorsShareholdingNoOfShare2:
      validatedData.directorsShareholdingNoOfShare2 || null,
    directorsShareholdingNoOfShare3:
      validatedData.directorsShareholdingNoOfShare3 || null,
    directorsShareholdingCompanyValue1:
      validatedData.directorsShareholdingCompanyValue1 || null,
    directorsShareholdingCompanyValue2:
      validatedData.directorsShareholdingCompanyValue2 || null,
    directorsShareholdingCompanyValue3:
      validatedData.directorsShareholdingCompanyValue3 || null,

    // Partnership Firms
    nameOfPartnershipFirm1: validatedData.nameOfPartnershipFirm1 || null,
    nameOfPartnershipFirm2: validatedData.nameOfPartnershipFirm2 || null,
    nameOfPartnershipFirm3: validatedData.nameOfPartnershipFirm3 || null,
    shareOfProfit1: validatedData.shareOfProfit1 || null,
    shareOfProfit2: validatedData.shareOfProfit2 || null,
    shareOfProfit3: validatedData.shareOfProfit3 || null,
    capitalContributed1: validatedData.capitalContributed1 || null,
    capitalContributed2: validatedData.capitalContributed2 || null,
    capitalContributed3: validatedData.capitalContributed3 || null,

    // Income and Fund
    totalIncomeShownInTheReturn:
      validatedData.totalIncomeShownInTheReturn || null,
    taxExemptedIncomeAndAllowance:
      validatedData.taxExemptedIncomeAndAllowance || null,
    receiptOfGiftOtherReceipts:
      validatedData.receiptOfGiftOtherReceipts || null,
    totalSourceOfFund: validatedData.totalSourceOfFund || null,
    sumOfSourceOfFundAndPreviousYearsNetWealth:
      validatedData.sumOfSourceOfFundAndPreviousYearsNetWealth || null,
    expenseRelatingToLifestyle:
      validatedData.expenseRelatingToLifestyle || null,
    totalExpensesAndLoss: validatedData.totalExpensesAndLoss || null,
    netWealthAtTheLastDateOfThisFinancialYear:
      validatedData.netWealthAtTheLastDateOfThisFinancialYear || null,
    totalLiabilitiesOutsideBusiness:
      validatedData.totalLiabilitiesOutsideBusiness || null,
    grossWealth: validatedData.grossWealth || null,
    businessCapital: validatedData.businessCapital || null,
    directorsShareholdingsInTheCompanies:
      validatedData.directorsShareholdingsInTheCompanies || null,
    businessCapitalOfPartnershipFirm:
      validatedData.businessCapitalOfPartnershipFirm || null,

    // Image 11 - Agricultural and Non-Agricultural Properties
    nonAgriculturalPropertyLandHouseProperty:
      validatedData.nonAgriculturalPropertyLandHouseProperty || null,
    nonAgriculturalLocationDescription1:
      validatedData.nonAgriculturalLocationDescription1 || null,
    nonAgriculturalLocationDescription2:
      validatedData.nonAgriculturalLocationDescription2 || null,
    nonAgriculturalLocationDescription3:
      validatedData.nonAgriculturalLocationDescription3 || null,
    nonAgriculturalLocationDescription4:
      validatedData.nonAgriculturalLocationDescription4 || null,
    nonAgriculturalLocationDescription5:
      validatedData.nonAgriculturalLocationDescription5 || null,
    nonAgriculturalValue1: validatedData.nonAgriculturalValue1 || null,
    nonAgriculturalValue2: validatedData.nonAgriculturalValue2 || null,
    nonAgriculturalValue3: validatedData.nonAgriculturalValue3 || null,
    nonAgriculturalValue4: validatedData.nonAgriculturalValue4 || null,
    nonAgriculturalValue5: validatedData.nonAgriculturalValue5 || null,
    agriculturalLocationAndDescription1:
      validatedData.agriculturalLocationAndDescription1 || null,
    agriculturalLocationAndDescription2:
      validatedData.agriculturalLocationAndDescription2 || null,
    agriculturalLocationAndDescription3:
      validatedData.agriculturalLocationAndDescription3 || null,
    agriculturalLocationValue1:
      validatedData.agriculturalLocationValue1 || null,
    agriculturalLocationValue2:
      validatedData.agriculturalLocationValue2 || null,
    agriculturalLocationValue3:
      validatedData.agriculturalLocationValue3 || null,

    // Financial Assets
    shareDebentureUnitCertificate:
      validatedData.shareDebentureUnitCertificate || null,
    sanchayapatraSavingsCertificate:
      validatedData.sanchayapatraSavingsCertificate || null,
    depositPensionScheme: validatedData.depositPensionScheme || null,
    loanGivenToOthersName: validatedData.loanGivenToOthersName || null,
    loanGiventoOthersNid: validatedData.loanGiventoOthersNid || null,
    loansGivenToOthers: validatedData.loansGivenToOthers || null,
    savingDeposit: validatedData.savingDeposit || null,
    providentFund: validatedData.providentFund || null,
    otherInvestmentDesc: validatedData.otherInvestmentDesc || null,
    otherInvestment: validatedData.otherInvestment || null,

    // Motor Vehicles and Assets
    typeOfMotorVehicle1: validatedData.typeOfMotorVehicle1 || null,
    typeOfMotorVehicle2: validatedData.typeOfMotorVehicle2 || null,
    registrationNumber1: validatedData.registrationNumber1 || null,
    registrationNumber2: validatedData.registrationNumber2 || null,
    motorValue1: validatedData.motorValue1 || null,
    motorValue2: validatedData.motorValue2 || null,
    ornamentsDesc: validatedData.ornamentsDesc || null,
    ornamentsValue: validatedData.ornamentsValue || null,
    furnitureAndElectronic: validatedData.furnitureAndElectronic || null,
    othersAssetsDesc: validatedData.othersAssetsDesc || null,
    othersAssetsValue: validatedData.othersAssetsValue || null,
    bankBalance: validatedData.bankBalance || null,
    cashInHand: validatedData.cashInHand || null,
    otherFundDesc: validatedData.otherFundDesc || null,
    otherFundOutsideBusiness: validatedData.otherFundOutsideBusiness || null,
    assetOutsideBangladesh: validatedData.assetOutsideBangladesh || null,
    agriculturalProperty: validatedData.agriculturalProperty || null,
    totalFinancialAssets: validatedData.totalFinancialAssets || null,
    motorVehiclesTotal: validatedData.motorVehiclesTotal || null,
    totalAssetslocatedInBangladesh:
      validatedData.totalAssetslocatedInBangladesh || null,
    totalCashInHandsAndFundOutsideBusiness:
      validatedData.totalCashInHandsAndFundOutsideBusiness || null,
    totalAssetsInBangladeshAndOutsideBangladesh:
      validatedData.totalAssetsInBangladeshAndOutsideBangladesh || null,

    // Totals
    totalIncomeShown: validatedData.totalIncomeShown || null,
    totalTaxPaid: validatedData.totalTaxPaid || null,
  };
}

export async function generateInvoiceId(): Promise<string> {
  try {
    // Get the latest order
    const latestOrder = await prisma.order.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!latestOrder?.invoiceId) {
      // If no previous order exists or no invoiceId, start with INV000001A
      return "INV000001A";
    }

    const currentId = latestOrder.invoiceId;

    // Validate the current ID format
    if (!currentId.match(/^INV\d{6}[A-Z]$/)) {
      console.error("Invalid invoice ID format:", currentId);
      return "INV000001A"; // Reset to initial format if invalid
    }

    // Extract the numeric part and letter suffix
    const numericPart = parseInt(currentId.substring(3, 9));
    const letterSuffix = currentId.charAt(9);

    if (numericPart === 999999) {
      // If we've reached 999999, increment the letter and reset the number
      if (letterSuffix === "Z") {
        throw new Error("Maximum invoice ID reached");
      }
      // Get next letter in alphabet
      const nextLetter = String.fromCharCode(letterSuffix.charCodeAt(0) + 1);
      return `INV000001${nextLetter}`;
    } else {
      // Just increment the number
      const nextNumber = numericPart + 1;
      return `INV${nextNumber.toString().padStart(6, "0")}${letterSuffix}`;
    }
  } catch (error) {
    console.error("Error generating invoice ID:", error);
    throw error;
  }
}

// actions
export async function createTaxReturnAndOrder(
  input: IndividualTaxReturnFormInput,
  targetUserId: string | null
) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Check if the user is an admin
    const isAdmin = session.user.role === "ADMIN";

    // Determine and validate the effective userId
    let effectiveUserId: string;

    if (isAdmin) {
      // Admin must provide a target user
      if (!targetUserId) {
        return {
          success: false,
          error: "Admin must specify a target user",
        };
      }

      // Verify target user exists
      const targetUser = await prisma.user.findUnique({
        where: { id: targetUserId },
      });

      if (!targetUser) {
        return {
          success: false,
          error: "Target user not found",
        };
      }

      effectiveUserId = targetUserId;
    } else {
      // For regular users, use their own ID
      effectiveUserId = session.user.id;
    }

    const invoiceId = await generateInvoiceId();

    // Validate input data
    const validatedData = individualTaxReturnSchema.parse(input);

    // Use a transaction to ensure both tax return and order are created atomically
    const result = await prisma.$transaction(async (tx) => {
      const data = await getTaxReturnData({
        tx,
        validatedData,
        operation: "create",
      });

      // Create the individual tax return with all relations
      const taxReturn = await tx.individualTaxes.create({
        data,
      });

      // Create the order with the guaranteed userId
      const order = await tx.order.create({
        data: {
          userId: effectiveUserId, // Now this is guaranteed to be a string
          individualTaxesId: taxReturn.id,
          invoiceId,
          amount: 1150,
          paymentStatus: PaymentStatus.PENDING,
        },
      });

      return { taxReturn, order };
    });

    // Revalidate relevant paths
    revalidatePath("/", "layout");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error creating tax return and order:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create tax return and order",
    };
  }
}

export async function updateTaxReturnOrder(
  orderId: string,
  input: IndividualTaxReturnFormInput
) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Parse and validate the input data
    const validatedData = individualTaxReturnSchema.parse(input);

    // Fetch the existing order with user information
    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        individualTaxes: true,
      },
    });

    if (!existingOrder?.individualTaxes) {
      return {
        success: false,
        error: "Tax return not found",
      };
    }

    // Authorization check
    const isAdmin = session.user.role === "ADMIN";
    const isOwner = existingOrder.userId === session.user.id;

    // Only allow update if user is admin or the owner
    if (!isAdmin && !isOwner) {
      return {
        success: false,
        error: "You do not have permission to update this tax return",
      };
    }

    // If authorization passes, proceed with update
    const existingTaxReturn = existingOrder.individualTaxes;

    const result = await prisma.$transaction(async (tx) => {
      const data = await getTaxReturnData({
        tx,
        validatedData,
        operation: "update",
        existingTaxReturn,
      });

      const updatedTaxReturn = await tx.individualTaxes.update({
        where: { id: existingTaxReturn.id },
        data,
      });

      return { taxReturn: updatedTaxReturn };
    });

    // Revalidate paths after successful update
    revalidatePath("/", "layout");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error updating tax return:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update tax return",
    };
  }
}

export async function saveTaxReturn(
  input: IndividualTaxReturnFormInput,
  savedTaxReturnId?: string
) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Calculate completion percentage based on filled fields
    const calculateCompletionPercentage = (
      data: IndividualTaxReturnFormInput
    ) => {
      const totalFields = Object.keys(data).length;
      const filledFields = Object.entries(data).filter(([_, value]) => {
        if (value === null || value === undefined) return false;
        if (typeof value === "string") return value.trim() !== "";
        if (typeof value === "object") {
          // Handle nested objects (like govt pay scales)
          return Object.values(value).some(
            (v) => v !== null && v !== undefined && v !== ""
          );
        }
        return true;
      }).length;

      return (filledFields / totalFields) * 100;
    };

    // Find the last edited field
    const findLastEditedField = (data: IndividualTaxReturnFormInput) => {
      const filledFields = Object.entries(data)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ""
        )
        .map(([key, _]) => key);

      return filledFields[filledFields.length - 1] || null;
    };

    const completionPercent = calculateCompletionPercentage(input);
    const lastEditedField = findLastEditedField(input);

    if (savedTaxReturnId) {
      // Update existing saved tax return
      const updatedTaxReturn = await prisma.savedTaxReturns.update({
        where: {
          id: savedTaxReturnId,
          userId: session.user.id,
        },
        data: {
          taxData: input,
          completionPercent,
          lastEditedField,
          updatedAt: new Date(),
        },
      });

      revalidatePath("/", "layout");

      return {
        success: true,
        data: updatedTaxReturn,
      };
    } else {
      // Create new saved tax return
      const newTaxReturn = await prisma.savedTaxReturns.create({
        data: {
          userId: session.user.id,
          taxData: input,
          completionPercent,
          lastEditedField,
        },
      });

      revalidatePath("/");

      return {
        success: true,
        data: newTaxReturn,
      };
    }
  } catch (error) {
    console.error("Error saving tax return:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to save tax return",
    };
  }
}

// Get saved tax returns for the current user
export async function getSavedTaxReturns() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const savedTaxReturns = await prisma.savedTaxReturns.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return {
      success: true,
      data: savedTaxReturns,
    };
  } catch (error) {
    console.error("Error fetching saved tax returns:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch saved tax returns",
    };
  }
}

// Delete a saved tax return
export async function deleteSavedTaxReturn(savedTaxReturnId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    await prisma.savedTaxReturns.delete({
      where: {
        id: savedTaxReturnId,
        userId: session.user.id,
      },
    });

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting saved tax return:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete saved tax return",
    };
  }
}

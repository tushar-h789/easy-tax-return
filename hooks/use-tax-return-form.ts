// useTaxReturnForm.ts

import { useForm } from "react-hook-form";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "@/app/(site)/individual-tax-return/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormFields } from "./use-form-fields";
import { useCalculations } from "./use-calculations";

export const useTaxReturnForm = () => {
  const form = useForm<IndividualTaxReturnFormInput>({
    resolver: zodResolver(individualTaxReturnSchema),
    defaultValues: {
      // Image 1
      taxpayerName: "",
      nationalId: "",
      tin: "",
      circle: "",
      zone: "",
      assessmentYear: "2024-2025",
      isParentOfDisabledPerson: false, // boolean defaulted to false
      spouseName: "",
      spouseTin: "",
      addressLine1: "",
      addressLine2: "",
      telephone: "",
      mobile: "",
      email: "",
      employerName: "",
      businessName: "",
      bin: "",
      partnersMembersAssociation1: "",
      partnersMembersAssociation2: "",

      // Image 4
      basicPayGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      arrearPayGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      specialAllowanceGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      houseRentAllowanceGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      medicalAllowanceGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      conveyanceAllowanceGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      festivalAllowanceGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      allowanceForSupportStaffGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      leaveAllowanceGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      honorariumRewardGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      overtimeAllowanceGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      banglaNoboborshoAllowancesGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      interestAccruedProvidentFundGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      lumpGrantGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      gratuityGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      otherAllowanceGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },
      totalGovt: {
        amount: "",
        taxExempted: "",
        taxable: "",
      },

      // Image 4 - Private
      basicPayPrivate: "",
      allowancesPrivate: "",
      advanceArrearSalaryPrivate: "",
      gratuityAnnuityPensionOrSimilarBenefitPrivate: "",
      perquisitesPrivate: "",
      receiptInLieuOfOrInAdditionToSalaryOrWagesPrivate: "",
      incomeFromEmployeeShareSchemePrivate: "",
      accommodationFacilityPrivate: "",
      transportFacilityPrivate: "",
      transportFacilityPrivateCheck: false,
      transportFacilityPrivateVehicleCC: undefined,
      anyOtherFacilityProvidedByEmployerPrivate: "",
      employerContributionToProvidentFundPrivate: "",
      otherIncomePrivate: "",
      totalSalaryReceivedPrivate: "",
      exemptedAmountPrivate: "",
      totalIncomeFromSalaryPrivate: "",

      incomeFromShareTransferListedCompany: {
        description: "",
        capitalGain: "",
        exemptedAmount: "",
        taxableAmount: "",
      },
      incomeFromCapitalGain2: {
        description: "",
        capitalGain: "",
        exemptedAmount: "",
        taxableAmount: "",
      },
      incomeFromCapitalGain3: {
        description: "",
        capitalGain: "",
        exemptedAmount: "",
        taxableAmount: "",
      },
      incomeFromCapitalGain4: {
        description: "",
        capitalGain: "",
        exemptedAmount: "",
        taxableAmount: "",
      },
      incomeFromCapitalGain5: {
        description: "",
        capitalGain: "",
        exemptedAmount: "",
        taxableAmount: "",
      },
      incomeFromCapitalGainsTotal: {
        description: "",
        capitalGain: "",
        exemptedAmount: "",
        taxableAmount: "",
      },

      // Image 7
      shonchoyparta: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitFromShoychoyparta2: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitFromShoychoyparta3: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitFromShoychoyparta4: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitFromShoychoyparta5: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitFromShoychoyparta6: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitFromShoychoyparta7: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitFromShoychoyparta8: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitFromShoychoyparta9: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitFromShoychoyparta10: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitFromShoychoypartaTotal: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },

      // Securities fields
      interestFromSecurities: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitInterestFromGovtSecurities2: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitInterestFromGovtSecurities3: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitInterestFromGovtSecurities4: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitInterestFromGovtSecurities5: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitInterestFromGovtSecurities6: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitInterestFromGovtSecurities7: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitInterestFromGovtSecurities8: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitInterestFromGovtSecurities9: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitInterestFromGovtSecurities10: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },
      profitInterestFromGovtSecuritiesTotal: {
        description: "",
        balance: "",
        interestProfit: "",
        sourceTax: "",
      },

      // Image 9
      expensesForFood: {
        amount: "",
        comment: "",
      },
      housingExpense: {
        amount: "",
        comment: "",
      },
      personalTransportationExpenses: {
        amount: "",
        comment: "",
      },
      utilityExpense: {
        amount: "",
        comment: "",
      },
      houseKeepingExpense: {
        amount: "",
        comment: "",
      },
      humanitiesExpense: {
        amount: "",
        comment: "",
      },
      educationExpenses: {
        amount: "",
        comment: "",
      },
      personalExpenseForLocalForeignTravel: {
        amount: "",
        comment: "",
      },
      festivalExpense: {
        amount: "",
        comment: "",
      },
      taxDeductedCollectedAtSource: {
        amount: "",
        comment: "",
      },
      interestPaid: {
        amount: "",
        comment: "",
      },
      totalExpenseIndividualPerson: {
        amount: "",
        comment: "",
      },
    },
  });

  const { watch, setValue, getValues, setError, clearErrors } = form;

  const calculations = useCalculations(
    watch,
    setValue,
    getValues,
    setError,
    clearErrors
  );
  const formFields = useFormFields(
    watch,
    setValue,
    getValues,
    setError,
    clearErrors
  );

  return {
    form,
    formFields,
    calculations,
  };
};

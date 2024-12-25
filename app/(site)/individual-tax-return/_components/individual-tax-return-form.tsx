"use client";

import { RadioGroup } from "@/components/custom/radio";
import CustomSelect from "@/components/custom/select";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { Controller, FormProvider, SubmitHandler } from "react-hook-form";

import CustomDatePicker from "@/components/custom/date-picker";
import SignatureField from "@/components/custom/signature";
import { Button } from "@/components/ui/button";
import { debounce, isFieldRequired } from "@/lib/utils";
import "flatpickr/dist/themes/airbnb.css";
import { ArrowLeft, ArrowRight, Download, Loader2, Menu } from "lucide-react";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "../schema";

import ImageOne from "@/public/images/1.png";
import ImageTwo from "@/public/images/2.png";
import ImageThree from "@/public/images/3.png";
import ImageFour from "@/public/images/4.png";
import ImageFive from "@/public/images/5.png";
import ImageSix from "@/public/images/6.png";
import ImageSeven from "@/public/images/7.png";
import ImageEight from "@/public/images/8.png";
import ImageNine from "@/public/images/9.png";
import ImageTen from "@/public/images/10.png";
import ImageEleven from "@/public/images/11.png";
import ImageTwelve from "@/public/images/12.png";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import CustomCheckbox from "@/components/custom/checkbox";
import { NumericFormat, numericFormatter } from "react-number-format";
import { FormField } from "@/types/tax-return-form";
import { useTaxReturnForm } from "@/hooks/use-tax-return-form";
import { generatePDF } from "@/lib/pdf";
import FloatingErrorSummary from "./floating-error-summary";
import {
  createTaxReturnAndOrder,
  saveTaxReturn,
  updateTaxReturnOrder,
} from "../actions";
import { Prisma, SavedTaxReturns } from "@prisma/client";
import { useSession } from "next-auth/react";

const images = [
  ImageOne,
  ImageTwo,
  ImageThree,
  ImageFour,
  ImageFive,
  ImageSix,
  ImageSeven,
  ImageEight,
  ImageNine,
  ImageTen,
  ImageEleven,
  ImageTwelve,
];

interface Image {
  src: string;
}

type OrderWithRelation = Prisma.OrderGetPayload<{
  include: {
    individualTaxes: {
      include: {
        basicPayGovt: true;
        arrearPayGovt: true;
        specialAllowanceGovt: true;
        houseRentAllowanceGovt: true;
        medicalAllowanceGovt: true;
        conveyanceAllowanceGovt: true;
        festivalAllowanceGovt: true;
        allowanceForSupportStaffGovt: true;
        leaveAllowanceGovt: true;
        honorariumRewardGovt: true;
        overtimeAllowanceGovt: true;
        banglaNoboborshoAllowancesGovt: true;
        interestAccruedProvidentFundGovt: true;
        lumpGrantGovt: true;
        gratuityGovt: true;
        otherAllowanceGovt: true;
        totalGovt: true;
        incomeFromShareTransferListedCompany: true;
        incomeFromCapitalGain2: true;
        incomeFromCapitalGain3: true;
        incomeFromCapitalGain4: true;
        incomeFromCapitalGain5: true;
        incomeFromCapitalGainsTotal: true;

        shonchoyparta: true;
        profitFromShoychoyparta2: true;
        profitFromShoychoyparta3: true;
        profitFromShoychoyparta4: true;
        profitFromShoychoyparta5: true;
        profitFromShoychoyparta6: true;
        profitFromShoychoyparta7: true;
        profitFromShoychoyparta8: true;
        profitFromShoychoyparta9: true;
        profitFromShoychoyparta10: true;
        profitFromShoychoypartaTotal: true;

        interestFromSecurities: true;
        profitInterestFromGovtSecurities2: true;
        profitInterestFromGovtSecurities3: true;
        profitInterestFromGovtSecurities4: true;
        profitInterestFromGovtSecurities5: true;
        profitInterestFromGovtSecurities6: true;
        profitInterestFromGovtSecurities7: true;
        profitInterestFromGovtSecurities8: true;
        profitInterestFromGovtSecurities9: true;
        profitInterestFromGovtSecurities10: true;
        profitInterestFromGovtSecuritiesTotal: true;

        // Image 9
        expensesForFood: true;
        housingExpense: true;
        personalTransportationExpenses: true;
        utilityExpense: true;
        houseKeepingExpense: true;
        humanitiesExpense: true;
        educationExpenses: true;
        personalExpenseForLocalForeignTravel: true;
        festivalExpense: true;
        taxDeductedCollectedAtSource: true;
        interestPaid: true;
        totalExpenseIndividualPerson: true;
      };
    };
  };
}>;

export const createDebugOverlay = (
  images: Image[],
  formFields: FormField[],
  formData: IndividualTaxReturnFormInput
): void => {
  const container: HTMLDivElement = document.createElement("div");
  container.style.position = "relative";
  container.style.marginTop = "20px";
  document.body.appendChild(container);

  images.forEach((image: Image, i: number) => {
    const formContainer: HTMLDivElement = document.createElement("div");
    formContainer.style.position = "relative";
    formContainer.style.width = "595px";
    formContainer.style.height = "842px";
    formContainer.style.marginBottom = "20px";

    const imageContainer: HTMLDivElement = document.createElement("div");
    imageContainer.style.position = "relative";
    imageContainer.style.width = "100%";
    imageContainer.style.height = "100%";

    const img: HTMLImageElement = document.createElement("img");
    img.src = image.src;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    imageContainer.appendChild(img);

    const fieldsContainer: HTMLDivElement = document.createElement("div");
    fieldsContainer.style.position = "absolute";
    fieldsContainer.style.top = "0";
    fieldsContainer.style.left = "0";
    fieldsContainer.style.width = "100%";
    fieldsContainer.style.height = "100%";

    formFields
      .filter((field: FormField) => field.imageIndex === i && field.isVisible)
      .forEach((field: FormField) => {
        if (field.type === "radio") {
          const value =
            formData[field.name as keyof IndividualTaxReturnFormInput];
          field.options?.forEach((option) => {
            const radioContainer: HTMLDivElement =
              document.createElement("div");
            radioContainer.style.position = "absolute";
            radioContainer.style.left = `${option.x / 10}%`;
            radioContainer.style.top = `${option.y / 10}%`;
            radioContainer.style.width = `${option.width / 10}%`;
            radioContainer.style.height = `${option.height / 10}%`;
            radioContainer.style.border = "1px solid red";
            radioContainer.style.backgroundColor = "rgba(255, 0, 0, 0.1)";

            if (value === option.value) {
              const svg: SVGElement = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
              );
              svg.setAttribute("viewBox", "0 0 150 150");
              svg.style.width = "80%";
              svg.style.height = "80%";
              svg.style.position = "absolute";
              svg.style.top = "10%";
              svg.style.left = "10%";

              const path: SVGPathElement = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
              );
              path.setAttribute(
                "d",
                "M39.323,124.635c-1.979-0.026-10.5-12.115-18.951-26.871L5,70.939l3.987-3.778c2.19-2.076,8.072-3.772,13.083-3.772h9.097 l4.576,13.658l4.577,13.665l36.4-37.755c20.019-20.764,43.139-41.175,51.394-45.353L143.106,0L112.84,32.579 C96.206,50.495,73.66,78.551,62.752,94.916C51.845,111.282,41.302,124.654,39.323,124.635z"
              );
              path.setAttribute("fill", "black");

              svg.appendChild(path);
              radioContainer.appendChild(svg);
            }

            fieldsContainer.appendChild(radioContainer);
          });
        } else {
          const fieldContainer: HTMLDivElement = document.createElement("div");
          fieldContainer.style.position = "absolute";
          fieldContainer.style.left = `${field.x / 10}%`;
          fieldContainer.style.top = `${field.y / 10}%`;
          fieldContainer.style.width = `${field.width / 10}%`;
          fieldContainer.style.height = `${field.height / 10}%`;
          fieldContainer.style.border = "1px solid red";
          fieldContainer.style.backgroundColor = "rgba(255, 0, 0, 0.1)";

          const fieldElement: HTMLInputElement =
            document.createElement("input");
          fieldElement.style.position = "absolute";
          fieldElement.style.left = "0";
          fieldElement.style.top = "0";
          fieldElement.style.width = "100%";
          fieldElement.style.height = "100%";
          fieldElement.style.fontSize = "14px";
          fieldElement.style.fontFamily = "Arial, sans-serif";
          fieldElement.style.padding = "0px";
          fieldElement.style.border = "none";
          fieldElement.style.background = "transparent";
          fieldElement.style.overflow = "hidden";

          const value =
            formData[field.name as keyof IndividualTaxReturnFormInput];

          if (
            field.type === "number" &&
            value !== undefined &&
            value !== null
          ) {
            fieldElement.value = numericFormatter(value.toString(), {
              thousandSeparator: true,
              decimalScale: 2,
              fixedDecimalScale: true,
            });
          } else {
            fieldElement.value = value?.toString() || "";
          }

          fieldContainer.appendChild(fieldElement);
          fieldsContainer.appendChild(fieldContainer);
        }
      });

    imageContainer.appendChild(fieldsContainer);
    formContainer.appendChild(imageContainer);
    container.appendChild(formContainer);
  });
};

const IndividualTaxReturnForm = ({
  taxReturnOrder,
  savedTaxReturn,
}: {
  taxReturnOrder?: OrderWithRelation;
  savedTaxReturn?: SavedTaxReturns;
}) => {
  const [scale, setScale] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [targetImageIndex, setTargetImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const formContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lastScrolledIndex, setLastScrolledIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );

  const session = useSession();

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoadedImages = [...prev];
      newLoadedImages[index] = true;
      return newLoadedImages;
    });
  };

  const [isMobile, setIsMobile] = useState(false);
  const [isScrollspyOpen, setIsScrollspyOpen] = useState(false);

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const individualTaxes = taxReturnOrder?.individualTaxes;

  const { form, formFields, calculations } = useTaxReturnForm();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = form;

  const {
    calculatePrivateEmploymentTotals,
    calculateGrossTax,
    calculateTaxPayable,
  } = calculations;

  useEffect(() => {
    // This effect will run when the component mounts
    const debugMode = false; // Set this to true when you want to debug

    if (debugMode) {
      // Assuming you have access to your form data, fields, and images here
      createDebugOverlay(images, formFields, form.getValues());
    }

    // Cleanup function to remove the debug overlay when component unmounts
    return () => {
      const debugOverlay = document.querySelector(
        'div[style*="position: relative"]'
      );
      if (debugOverlay) {
        debugOverlay.remove();
      }
    };
  }, [form, formFields]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "minimumTax") {
        if (value.minimumTax === "DHAKA_CHATTOGRAM_CITY_CORPORATION_AREA") {
          setValue("minimumTaxAmount", "5000.00");
          calculateTaxPayable();
        }
        if (value.minimumTax === "OTHER_CITY_CORPORATION_AREA") {
          setValue("minimumTaxAmount", "4000.00");
          calculateTaxPayable();
        }
        if (value.minimumTax === "OTHER_AREA") {
          setValue("minimumTaxAmount", "3000.00");
          calculateTaxPayable();
        }
      }

      if (
        name === "totalIncome" ||
        name === "residentialStatus" ||
        name === "specialBenefits" ||
        name === "isParentOfDisabledPerson"
      ) {
        calculateGrossTax();
      }

      if (
        name === "transportFacilityPrivateVehicleCC" ||
        name === "transportFacilityPrivateCheck"
      ) {
        calculatePrivateEmploymentTotals();
      }

      if (name === "netWealthLastDate") {
        if (value.netWealthLastDate === "NO_I_AM_A_NEW_TAXPAYER") {
          setValue("netWealthLastDateAmount", "0.0");
        } else {
          setValue("netWealthLastDateAmount", "");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [
    watch,
    setValue,
    calculatePrivateEmploymentTotals,
    calculateGrossTax,
    calculateTaxPayable,
  ]);

  useEffect(() => {
    if (individualTaxes) {
      reset({
        // Image 1
        taxpayerName: individualTaxes.taxpayerName,
        nationalId: individualTaxes.nationalId,
        tin: individualTaxes.tin,
        circle: individualTaxes.circle,
        zone: individualTaxes.zone,
        assessmentYear: individualTaxes.assessmentYear,
        residentialStatus: individualTaxes.residentialStatus,
        assesseeStatus: individualTaxes.assesseeStatus,
        specialBenefits: individualTaxes.specialBenefits || "NONE",
        isParentOfDisabledPerson:
          individualTaxes.isParentOfDisabledPerson || false,
        dateOfBirth: new Date(individualTaxes.dateOfBirth),
        spouseName: individualTaxes.spouseName || "",
        spouseTin: individualTaxes.spouseTin || "",
        addressLine1: individualTaxes.addressLine1,
        addressLine2: individualTaxes.addressLine2 || "",
        telephone: individualTaxes.telephone || "",
        mobile: individualTaxes.mobile,
        email: individualTaxes.email,
        employerName: individualTaxes.employerName || "",
        businessName: individualTaxes.businessName || "",
        bin: individualTaxes.bin || "",
        partnersMembersAssociation1:
          individualTaxes.partnersMembersAssociation1 || "",
        partnersMembersAssociation2:
          individualTaxes.partnersMembersAssociation2 || "",

        // Image 2
        statementOfIncomeYearEndedOn: new Date(
          individualTaxes.statementOfIncomeYearEndedOn
        ),
        incomeFromEmployment: individualTaxes.incomeFromEmployment || "",
        incomeFromRent: individualTaxes.incomeFromRent || "",
        incomeFromAgriculture: individualTaxes.incomeFromAgriculture || "",
        incomeFromBusiness: individualTaxes.incomeFromBusiness || "",
        incomeFromCapitalGains: individualTaxes.incomeFromCapitalGains || "",
        incomeFromFinancialAssets:
          individualTaxes.incomeFromFinancialAssets || "",
        incomeFromOtherSources: individualTaxes.incomeFromOtherSources || "",
        shareOfIncomeFromAOP: individualTaxes.shareOfIncomeFromAOP || "",
        incomeOfMinor: individualTaxes.incomeOfMinor || "",
        taxableIncomeFromAbroad: individualTaxes.taxableIncomeFromAbroad || "",
        totalIncome: individualTaxes.totalIncome || "",
        totalAmountPayable: individualTaxes.totalAmountPayable || "",
        minimumTax: individualTaxes.minimumTax || undefined,
        netWealthSurcharge: individualTaxes.netWealthSurcharge || "",
        taxPayable: individualTaxes.taxPayable || "",
        environmentalSurcharge: individualTaxes.environmentalSurcharge || "",
        totalSurcharge: individualTaxes.totalSurcharge || "",
        delayInterest: individualTaxes.delayInterest || "",
        grossTaxOnTaxableIncome: individualTaxes.grossTaxOnTaxableIncome || "",
        netTaxAfterRebate: individualTaxes.netTaxAfterRebate || "",
        minimumTaxAmount: individualTaxes.minimumTaxAmount || "",

        // Image 3
        taxDeductedOrCollected: individualTaxes.taxDeductedOrCollected || "",
        advanceTaxPaid: individualTaxes.advanceTaxPaid || "",
        adjustmentOfTaxRefund: individualTaxes.adjustmentOfTaxRefund || "",
        taxPaidWithThisReturn: individualTaxes.taxPaidWithThisReturn || "",
        totalTaxPaidAndAdjusted: individualTaxes.totalTaxPaidAndAdjusted || "",
        excessPayment: individualTaxes.excessPayment || "",
        taxExemptedTaxFreeIncome:
          individualTaxes.taxExemptedTaxFreeIncome || "",
        listOfDocumentsFurnishedWithThisReturn1:
          individualTaxes.listOfDocumentsFurnishedWithThisReturn1 || "",
        listOfDocumentsFurnishedWithThisReturn2:
          individualTaxes.listOfDocumentsFurnishedWithThisReturn2 || "",
        fatherOrHusband: individualTaxes.fatherOrHusband || "",
        placeOfSignature: individualTaxes.placeOfSignature || "",
        signature: individualTaxes?.signature || "",
        dateOfSignature: new Date(individualTaxes.dateOfSignature),

        // Image 4 - Employment Type & Govt Employment
        isIncomeFromEmployment: individualTaxes.isIncomeFromEmployment,
        typeOfEmployment: individualTaxes.typeOfEmployment,

        // Government Pay Scales
        basicPayGovt: {
          amount: individualTaxes.basicPayGovt?.amount || "",
          taxExempted: individualTaxes.basicPayGovt?.taxExempted || "",
          taxable: individualTaxes.basicPayGovt?.taxable || "",
        },
        arrearPayGovt: {
          amount: individualTaxes.arrearPayGovt?.amount || "",
          taxExempted: individualTaxes.arrearPayGovt?.taxExempted || "",
          taxable: individualTaxes.arrearPayGovt?.taxable || "",
        },
        specialAllowanceGovt: {
          amount: individualTaxes.specialAllowanceGovt?.amount || "",
          taxExempted: individualTaxes.specialAllowanceGovt?.taxExempted || "",
          taxable: individualTaxes.specialAllowanceGovt?.taxable || "",
        },
        houseRentAllowanceGovt: {
          amount: individualTaxes.houseRentAllowanceGovt?.amount || "",
          taxExempted:
            individualTaxes.houseRentAllowanceGovt?.taxExempted || "",
          taxable: individualTaxes.houseRentAllowanceGovt?.taxable || "",
        },
        medicalAllowanceGovt: {
          amount: individualTaxes.medicalAllowanceGovt?.amount || "",
          taxExempted: individualTaxes.medicalAllowanceGovt?.taxExempted || "",
          taxable: individualTaxes.medicalAllowanceGovt?.taxable || "",
        },
        conveyanceAllowanceGovt: {
          amount: individualTaxes.conveyanceAllowanceGovt?.amount || "",
          taxExempted:
            individualTaxes.conveyanceAllowanceGovt?.taxExempted || "",
          taxable: individualTaxes.conveyanceAllowanceGovt?.taxable || "",
        },
        festivalAllowanceGovt: {
          amount: individualTaxes.festivalAllowanceGovt?.amount || "",
          taxExempted: individualTaxes.festivalAllowanceGovt?.taxExempted || "",
          taxable: individualTaxes.festivalAllowanceGovt?.taxable || "",
        },
        allowanceForSupportStaffGovt: {
          amount: individualTaxes.allowanceForSupportStaffGovt?.amount || "",
          taxExempted:
            individualTaxes.allowanceForSupportStaffGovt?.taxExempted || "",
          taxable: individualTaxes.allowanceForSupportStaffGovt?.taxable || "",
        },
        leaveAllowanceGovt: {
          amount: individualTaxes.leaveAllowanceGovt?.amount || "",
          taxExempted: individualTaxes.leaveAllowanceGovt?.taxExempted || "",
          taxable: individualTaxes.leaveAllowanceGovt?.taxable || "",
        },
        honorariumRewardGovt: {
          amount: individualTaxes.honorariumRewardGovt?.amount || "",
          taxExempted: individualTaxes.honorariumRewardGovt?.taxExempted || "",
          taxable: individualTaxes.honorariumRewardGovt?.taxable || "",
        },
        overtimeAllowanceGovt: {
          amount: individualTaxes.overtimeAllowanceGovt?.amount || "",
          taxExempted: individualTaxes.overtimeAllowanceGovt?.taxExempted || "",
          taxable: individualTaxes.overtimeAllowanceGovt?.taxable || "",
        },
        banglaNoboborshoAllowancesGovt: {
          amount: individualTaxes.banglaNoboborshoAllowancesGovt?.amount || "",
          taxExempted:
            individualTaxes.banglaNoboborshoAllowancesGovt?.taxExempted || "",
          taxable:
            individualTaxes.banglaNoboborshoAllowancesGovt?.taxable || "",
        },
        interestAccruedProvidentFundGovt: {
          amount:
            individualTaxes.interestAccruedProvidentFundGovt?.amount || "",
          taxExempted:
            individualTaxes.interestAccruedProvidentFundGovt?.taxExempted || "",
          taxable:
            individualTaxes.interestAccruedProvidentFundGovt?.taxable || "",
        },
        lumpGrantGovt: {
          amount: individualTaxes.lumpGrantGovt?.amount || "",
          taxExempted: individualTaxes.lumpGrantGovt?.taxExempted || "",
          taxable: individualTaxes.lumpGrantGovt?.taxable || "",
        },
        gratuityGovt: {
          amount: individualTaxes.gratuityGovt?.amount || "",
          taxExempted: individualTaxes.gratuityGovt?.taxExempted || "",
          taxable: individualTaxes.gratuityGovt?.taxable || "",
        },
        otherAllowanceGovt: {
          amount: individualTaxes.otherAllowanceGovt?.amount || "",
          taxExempted: individualTaxes.otherAllowanceGovt?.taxExempted || "",
          taxable: individualTaxes.otherAllowanceGovt?.taxable || "",
        },
        totalGovt: {
          amount: individualTaxes.totalGovt?.amount || "",
          taxExempted: individualTaxes.totalGovt?.taxExempted || "",
          taxable: individualTaxes.totalGovt?.taxable || "",
        },

        // Image 4 - Private Employment
        basicPayPrivate: individualTaxes.basicPayPrivate || "",
        allowancesPrivate: individualTaxes.allowancesPrivate || "",
        advanceArrearSalaryPrivate:
          individualTaxes.advanceArrearSalaryPrivate || "",
        gratuityAnnuityPensionOrSimilarBenefitPrivate:
          individualTaxes.gratuityAnnuityPensionOrSimilarBenefitPrivate || "",
        perquisitesPrivate: individualTaxes.perquisitesPrivate || "",
        receiptInLieuOfOrInAdditionToSalaryOrWagesPrivate:
          individualTaxes.receiptInLieuOfOrInAdditionToSalaryOrWagesPrivate ||
          "",
        incomeFromEmployeeShareSchemePrivate:
          individualTaxes.incomeFromEmployeeShareSchemePrivate || "",
        accommodationFacilityPrivate:
          individualTaxes.accommodationFacilityPrivate || "",
        transportFacilityPrivate:
          individualTaxes.transportFacilityPrivate || "",
        transportFacilityPrivateCheck:
          individualTaxes.transportFacilityPrivateCheck || false,
        transportFacilityPrivateVehicleCC:
          individualTaxes.transportFacilityPrivateVehicleCC ?? undefined,
        anyOtherFacilityProvidedByEmployerPrivate:
          individualTaxes.anyOtherFacilityProvidedByEmployerPrivate || "",
        employerContributionToProvidentFundPrivate:
          individualTaxes.employerContributionToProvidentFundPrivate || "",
        otherIncomePrivate: individualTaxes.otherIncomePrivate || "",
        totalSalaryReceivedPrivate:
          individualTaxes.totalSalaryReceivedPrivate || "",
        exemptedAmountPrivate: individualTaxes.exemptedAmountPrivate || "",
        totalIncomeFromSalaryPrivate:
          individualTaxes.totalIncomeFromSalaryPrivate || "",

        // Image 5
        locationDescriptionOwnershipProportionOfProperty:
          individualTaxes.locationDescriptionOwnershipProportionOfProperty ||
          "",
        rentReceivedOrAnnualValue:
          individualTaxes.rentReceivedOrAnnualValue || "",
        advanceRentReceived: individualTaxes.advanceRentReceived || "",
        valueOfAnyBenefit: individualTaxes.valueOfAnyBenefit || "",
        adjustedAdvanceRent: individualTaxes.adjustedAdvanceRent || "",
        vacancyAllowance: individualTaxes.vacancyAllowance || "",
        totalRentValue: individualTaxes.totalRentValue || "",
        repairCollectionProperty:
          individualTaxes.repairCollectionProperty ?? undefined,
        repairCollectionAmount: individualTaxes.repairCollectionAmount || "",
        municipalOrLocalTax: individualTaxes.municipalOrLocalTax || "",
        landRevenue: individualTaxes.landRevenue || "",
        interestMortgageCapitalCharge:
          individualTaxes.interestMortgageCapitalCharge || "",
        insurancePremiumPaid: individualTaxes.insurancePremiumPaid || "",
        otherAllowableDeduction: individualTaxes.otherAllowableDeduction || "",
        taxpayersSharePercentage:
          individualTaxes.taxpayersSharePercentage || "",
        taxpayersShareAmount: individualTaxes.taxpayersShareAmount || "",
        salesTurnoverReceiptAgriculture:
          individualTaxes.salesTurnoverReceiptAgriculture || "",
        grossProfitFromAgriculture:
          individualTaxes.grossProfitFromAgriculture || "",
        generalExpensesSellingExpenses:
          individualTaxes.generalExpensesSellingExpenses || "",
        totalAdmissibleDeduction:
          individualTaxes.totalAdmissibleDeduction || "",
        netIncomeFromRent: individualTaxes.netIncomeFromRent || "",
        netProfitFromAgriculture:
          individualTaxes.netProfitFromAgriculture || "",

        // Image 6
        nameOfBusiness: individualTaxes.nameOfBusiness || "",
        natureOfBusiness: individualTaxes.natureOfBusiness || "",
        addressOfBusiness: individualTaxes.addressOfBusiness || "",

        // Summary of Income
        salesTurnoverReceiptsBusiness:
          individualTaxes.salesTurnoverReceiptsBusiness || "",
        purchase: individualTaxes.purchase || "",
        grossProfitFromBusiness: individualTaxes.grossProfitFromBusiness || "",
        generalAdministrativeSellingExpenses:
          individualTaxes.generalAdministrativeSellingExpenses || "",
        badDebtExpense: individualTaxes.badDebtExpense || "",
        netProfitFromBusinessIncome:
          individualTaxes.netProfitFromBusinessIncome || "",

        // Balance Sheet
        cashInHandAtBank: individualTaxes.cashInHandAtBank || "",
        inventories: individualTaxes.inventories || "",
        fixedAssets: individualTaxes.fixedAssets || "",
        otherAssets: individualTaxes.otherAssets || "",
        totalAssets: individualTaxes.totalAssets || "",
        openingCapital: individualTaxes.openingCapital || "",
        netProfitFromBusinessBalance:
          individualTaxes.netProfitFromBusinessBalance || "",
        withdrawalsInTheIncomeYear:
          individualTaxes.withdrawalsInTheIncomeYear || "",
        closingCapital: individualTaxes.closingCapital || "",
        liabilities: individualTaxes.liabilities || "",
        totalCapitalsAndLiabilities:
          individualTaxes.totalCapitalsAndLiabilities || "",

        //  Capital Gains
        incomeFromShareTransferListedCompany: {
          description:
            individualTaxes.incomeFromShareTransferListedCompany?.description ||
            "",
          capitalGain:
            individualTaxes.incomeFromShareTransferListedCompany?.capitalGain ||
            "",
          exemptedAmount:
            individualTaxes.incomeFromShareTransferListedCompany
              ?.exemptedAmount || "",
          taxableAmount:
            individualTaxes.incomeFromShareTransferListedCompany
              ?.taxableAmount || "",
        },

        incomeFromCapitalGain2: {
          description:
            individualTaxes.incomeFromCapitalGain2?.description || "",
          capitalGain:
            individualTaxes.incomeFromCapitalGain2?.capitalGain || "",
          exemptedAmount:
            individualTaxes.incomeFromCapitalGain2?.exemptedAmount || "",
          taxableAmount:
            individualTaxes.incomeFromCapitalGain2?.taxableAmount || "",
        },

        incomeFromCapitalGain3: {
          description:
            individualTaxes.incomeFromCapitalGain3?.description || "",
          capitalGain:
            individualTaxes.incomeFromCapitalGain3?.capitalGain || "",
          exemptedAmount:
            individualTaxes.incomeFromCapitalGain3?.exemptedAmount || "",
          taxableAmount:
            individualTaxes.incomeFromCapitalGain3?.taxableAmount || "",
        },

        incomeFromCapitalGain4: {
          description:
            individualTaxes.incomeFromCapitalGain4?.description || "",
          capitalGain:
            individualTaxes.incomeFromCapitalGain4?.capitalGain || "",
          exemptedAmount:
            individualTaxes.incomeFromCapitalGain4?.exemptedAmount || "",
          taxableAmount:
            individualTaxes.incomeFromCapitalGain4?.taxableAmount || "",
        },

        incomeFromCapitalGain5: {
          description:
            individualTaxes.incomeFromCapitalGain5?.description || "",
          capitalGain:
            individualTaxes.incomeFromCapitalGain5?.capitalGain || "",
          exemptedAmount:
            individualTaxes.incomeFromCapitalGain5?.exemptedAmount || "",
          taxableAmount:
            individualTaxes.incomeFromCapitalGain5?.taxableAmount || "",
        },

        incomeFromCapitalGainsTotal: {
          description:
            individualTaxes.incomeFromCapitalGainsTotal?.description || "",
          capitalGain:
            individualTaxes.incomeFromCapitalGainsTotal?.capitalGain || "",
          exemptedAmount:
            individualTaxes.incomeFromCapitalGainsTotal?.exemptedAmount || "",
          taxableAmount:
            individualTaxes.incomeFromCapitalGainsTotal?.taxableAmount || "",
        },

        // Image 7 - Shonchoypatra
        shonchoyparta: {
          description: individualTaxes.shonchoyparta?.description || "",
          balance: individualTaxes.shonchoyparta?.balance || "",
          interestProfit: individualTaxes.shonchoyparta?.interestProfit || "",
          sourceTax: individualTaxes.shonchoyparta?.sourceTax || "",
        },
        profitFromShoychoyparta2: {
          description:
            individualTaxes.profitFromShoychoyparta2?.description || "",
          balance: individualTaxes.profitFromShoychoyparta2?.balance || "",
          interestProfit:
            individualTaxes.profitFromShoychoyparta2?.interestProfit || "",
          sourceTax: individualTaxes.profitFromShoychoyparta2?.sourceTax || "",
        },
        profitFromShoychoyparta3: {
          description:
            individualTaxes.profitFromShoychoyparta3?.description || "",
          balance: individualTaxes.profitFromShoychoyparta3?.balance || "",
          interestProfit:
            individualTaxes.profitFromShoychoyparta3?.interestProfit || "",
          sourceTax: individualTaxes.profitFromShoychoyparta3?.sourceTax || "",
        },
        profitFromShoychoyparta4: {
          description:
            individualTaxes.profitFromShoychoyparta4?.description || "",
          balance: individualTaxes.profitFromShoychoyparta4?.balance || "",
          interestProfit:
            individualTaxes.profitFromShoychoyparta4?.interestProfit || "",
          sourceTax: individualTaxes.profitFromShoychoyparta4?.sourceTax || "",
        },
        profitFromShoychoyparta5: {
          description:
            individualTaxes.profitFromShoychoyparta5?.description || "",
          balance: individualTaxes.profitFromShoychoyparta5?.balance || "",
          interestProfit:
            individualTaxes.profitFromShoychoyparta5?.interestProfit || "",
          sourceTax: individualTaxes.profitFromShoychoyparta5?.sourceTax || "",
        },
        profitFromShoychoyparta6: {
          description:
            individualTaxes.profitFromShoychoyparta6?.description || "",
          balance: individualTaxes.profitFromShoychoyparta6?.balance || "",
          interestProfit:
            individualTaxes.profitFromShoychoyparta6?.interestProfit || "",
          sourceTax: individualTaxes.profitFromShoychoyparta6?.sourceTax || "",
        },
        profitFromShoychoyparta7: {
          description:
            individualTaxes.profitFromShoychoyparta7?.description || "",
          balance: individualTaxes.profitFromShoychoyparta7?.balance || "",
          interestProfit:
            individualTaxes.profitFromShoychoyparta7?.interestProfit || "",
          sourceTax: individualTaxes.profitFromShoychoyparta7?.sourceTax || "",
        },
        profitFromShoychoyparta8: {
          description:
            individualTaxes.profitFromShoychoyparta8?.description || "",
          balance: individualTaxes.profitFromShoychoyparta8?.balance || "",
          interestProfit:
            individualTaxes.profitFromShoychoyparta8?.interestProfit || "",
          sourceTax: individualTaxes.profitFromShoychoyparta8?.sourceTax || "",
        },
        profitFromShoychoyparta9: {
          description:
            individualTaxes.profitFromShoychoyparta9?.description || "",
          balance: individualTaxes.profitFromShoychoyparta9?.balance || "",
          interestProfit:
            individualTaxes.profitFromShoychoyparta9?.interestProfit || "",
          sourceTax: individualTaxes.profitFromShoychoyparta9?.sourceTax || "",
        },
        profitFromShoychoyparta10: {
          description:
            individualTaxes.profitFromShoychoyparta10?.description || "",
          balance: individualTaxes.profitFromShoychoyparta10?.balance || "",
          interestProfit:
            individualTaxes.profitFromShoychoyparta10?.interestProfit || "",
          sourceTax: individualTaxes.profitFromShoychoyparta10?.sourceTax || "",
        },
        profitFromShoychoypartaTotal: {
          description:
            individualTaxes.profitFromShoychoypartaTotal?.description || "",
          balance: individualTaxes.profitFromShoychoypartaTotal?.balance || "",
          interestProfit:
            individualTaxes.profitFromShoychoypartaTotal?.interestProfit || "",
          sourceTax:
            individualTaxes.profitFromShoychoypartaTotal?.sourceTax || "",
        },

        // Securities
        interestFromSecurities: {
          description:
            individualTaxes.interestFromSecurities?.description || "",
          balance: individualTaxes.interestFromSecurities?.balance || "",
          interestProfit:
            individualTaxes.interestFromSecurities?.interestProfit || "",
          sourceTax: individualTaxes.interestFromSecurities?.sourceTax || "",
        },
        profitInterestFromGovtSecurities2: {
          description:
            individualTaxes.profitInterestFromGovtSecurities2?.description ||
            "",
          balance:
            individualTaxes.profitInterestFromGovtSecurities2?.balance || "",
          interestProfit:
            individualTaxes.profitInterestFromGovtSecurities2?.interestProfit ||
            "",
          sourceTax:
            individualTaxes.profitInterestFromGovtSecurities2?.sourceTax || "",
        },
        profitInterestFromGovtSecurities3: {
          description:
            individualTaxes.profitInterestFromGovtSecurities3?.description ||
            "",
          balance:
            individualTaxes.profitInterestFromGovtSecurities3?.balance || "",
          interestProfit:
            individualTaxes.profitInterestFromGovtSecurities3?.interestProfit ||
            "",
          sourceTax:
            individualTaxes.profitInterestFromGovtSecurities3?.sourceTax || "",
        },
        profitInterestFromGovtSecurities4: {
          description:
            individualTaxes.profitInterestFromGovtSecurities4?.description ||
            "",
          balance:
            individualTaxes.profitInterestFromGovtSecurities4?.balance || "",
          interestProfit:
            individualTaxes.profitInterestFromGovtSecurities4?.interestProfit ||
            "",
          sourceTax:
            individualTaxes.profitInterestFromGovtSecurities4?.sourceTax || "",
        },
        profitInterestFromGovtSecurities5: {
          description:
            individualTaxes.profitInterestFromGovtSecurities5?.description ||
            "",
          balance:
            individualTaxes.profitInterestFromGovtSecurities5?.balance || "",
          interestProfit:
            individualTaxes.profitInterestFromGovtSecurities5?.interestProfit ||
            "",
          sourceTax:
            individualTaxes.profitInterestFromGovtSecurities5?.sourceTax || "",
        },
        profitInterestFromGovtSecurities6: {
          description:
            individualTaxes.profitInterestFromGovtSecurities6?.description ||
            "",
          balance:
            individualTaxes.profitInterestFromGovtSecurities6?.balance || "",
          interestProfit:
            individualTaxes.profitInterestFromGovtSecurities6?.interestProfit ||
            "",
          sourceTax:
            individualTaxes.profitInterestFromGovtSecurities6?.sourceTax || "",
        },
        profitInterestFromGovtSecurities7: {
          description:
            individualTaxes.profitInterestFromGovtSecurities7?.description ||
            "",
          balance:
            individualTaxes.profitInterestFromGovtSecurities7?.balance || "",
          interestProfit:
            individualTaxes.profitInterestFromGovtSecurities7?.interestProfit ||
            "",
          sourceTax:
            individualTaxes.profitInterestFromGovtSecurities7?.sourceTax || "",
        },
        profitInterestFromGovtSecurities8: {
          description:
            individualTaxes.profitInterestFromGovtSecurities8?.description ||
            "",
          balance:
            individualTaxes.profitInterestFromGovtSecurities8?.balance || "",
          interestProfit:
            individualTaxes.profitInterestFromGovtSecurities8?.interestProfit ||
            "",
          sourceTax:
            individualTaxes.profitInterestFromGovtSecurities8?.sourceTax || "",
        },
        profitInterestFromGovtSecurities9: {
          description:
            individualTaxes.profitInterestFromGovtSecurities9?.description ||
            "",
          balance:
            individualTaxes.profitInterestFromGovtSecurities9?.balance || "",
          interestProfit:
            individualTaxes.profitInterestFromGovtSecurities9?.interestProfit ||
            "",
          sourceTax:
            individualTaxes.profitInterestFromGovtSecurities9?.sourceTax || "",
        },
        profitInterestFromGovtSecurities10: {
          description:
            individualTaxes.profitInterestFromGovtSecurities10?.description ||
            "",
          balance:
            individualTaxes.profitInterestFromGovtSecurities10?.balance || "",
          interestProfit:
            individualTaxes.profitInterestFromGovtSecurities10
              ?.interestProfit || "",
          sourceTax:
            individualTaxes.profitInterestFromGovtSecurities10?.sourceTax || "",
        },
        profitInterestFromGovtSecuritiesTotal: {
          description:
            individualTaxes.profitInterestFromGovtSecuritiesTotal
              ?.description || "",
          balance:
            individualTaxes.profitInterestFromGovtSecuritiesTotal?.balance ||
            "",
          interestProfit:
            individualTaxes.profitInterestFromGovtSecuritiesTotal
              ?.interestProfit || "",
          sourceTax:
            individualTaxes.profitInterestFromGovtSecuritiesTotal?.sourceTax ||
            "",
        },

        // Image 8
        lifeInsurancePremium: individualTaxes.lifeInsurancePremium || "",
        contributionToDeposit: individualTaxes.contributionToDeposit || "",
        investmentInGovernmentSecurities:
          individualTaxes.investmentInGovernmentSecurities || "",
        investmentInSecuritiesStock:
          individualTaxes.investmentInSecuritiesStock || "",
        contributionToProvidentFund:
          individualTaxes.contributionToProvidentFund || "",
        selfAndEmployersContribution:
          individualTaxes.selfAndEmployersContribution || "",
        contributionToSuperAnnuationFund:
          individualTaxes.contributionToSuperAnnuationFund || "",
        contributionToBenevolentFund:
          individualTaxes.contributionToBenevolentFund || "",
        contributionToZakatFund: individualTaxes.contributionToZakatFund || "",
        otherRebatableInvestmentContribution:
          individualTaxes.otherRebatableInvestmentContribution || "",
        amountOfTaxRebate: individualTaxes.amountOfTaxRebate || "",
        totalAllowableInvestmentContribution:
          individualTaxes.totalAllowableInvestmentContribution || "",
        totalIncomeRebateTable: individualTaxes.totalIncomeRebateTable || "",
        totalAllowableInvestmentRebateTable:
          individualTaxes.totalAllowableInvestmentRebateTable || "",
        taka1000000: individualTaxes.taka1000000 || "",

        // Image 9 - Personal Expenses
        expensesForFood: {
          amount: individualTaxes.expensesForFood?.amount || "",
          comment: individualTaxes.expensesForFood?.comment || "",
        },
        housingExpense: {
          amount: individualTaxes.housingExpense?.amount || "",
          comment: individualTaxes.housingExpense?.comment || "",
        },
        personalTransportationExpenses: {
          amount: individualTaxes.personalTransportationExpenses?.amount || "",
          comment:
            individualTaxes.personalTransportationExpenses?.comment || "",
        },
        utilityExpense: {
          amount: individualTaxes.utilityExpense?.amount || "",
          comment: individualTaxes.utilityExpense?.comment || "",
        },
        houseKeepingExpense: {
          amount: individualTaxes.houseKeepingExpense?.amount || "",
          comment: individualTaxes.houseKeepingExpense?.comment || "",
        },
        humanitiesExpense: {
          amount: individualTaxes.humanitiesExpense?.amount || "",
          comment: individualTaxes.humanitiesExpense?.comment || "",
        },
        educationExpenses: {
          amount: individualTaxes.educationExpenses?.amount || "",
          comment: individualTaxes.educationExpenses?.comment || "",
        },
        personalExpenseForLocalForeignTravel: {
          amount:
            individualTaxes.personalExpenseForLocalForeignTravel?.amount || "",
          comment:
            individualTaxes.personalExpenseForLocalForeignTravel?.comment || "",
        },
        festivalExpense: {
          amount: individualTaxes.festivalExpense?.amount || "",
          comment: individualTaxes.festivalExpense?.comment || "",
        },
        taxDeductedCollectedAtSource: {
          amount: individualTaxes.taxDeductedCollectedAtSource?.amount || "",
          comment: individualTaxes.taxDeductedCollectedAtSource?.comment || "",
        },
        interestPaid: {
          amount: individualTaxes.interestPaid?.amount || "",
          comment: individualTaxes.interestPaid?.comment || "",
        },
        totalExpenseIndividualPerson: {
          amount: individualTaxes.totalExpenseIndividualPerson?.amount || "",
          comment: individualTaxes.totalExpenseIndividualPerson?.comment || "",
        },

        // Image 10
        netWealthLastDate: individualTaxes.netWealthLastDate || undefined,
        netWealthLastDateAmount: individualTaxes.netWealthLastDateAmount || "",
        giftExpense: individualTaxes.giftExpense || "",
        institutionalLiabilities:
          individualTaxes.institutionalLiabilities || "",
        nonInstitutionalLiabilities:
          individualTaxes.nonInstitutionalLiabilities || "",
        otherLiabilities: individualTaxes.otherLiabilities || "",
        lessBusinessLiabilities: individualTaxes.lessBusinessLiabilities || "",
        directorsShareholdingCompanyName1:
          individualTaxes.directorsShareholdingCompanyName1 || "",
        directorsShareholdingCompanyName2:
          individualTaxes.directorsShareholdingCompanyName2 || "",
        directorsShareholdingCompanyName3:
          individualTaxes.directorsShareholdingCompanyName3 || "",
        directorsShareholdingNoOfShare1:
          individualTaxes.directorsShareholdingNoOfShare1 || "",
        directorsShareholdingNoOfShare2:
          individualTaxes.directorsShareholdingNoOfShare2 || "",
        directorsShareholdingNoOfShare3:
          individualTaxes.directorsShareholdingNoOfShare3 || "",
        directorsShareholdingCompanyValue1:
          individualTaxes.directorsShareholdingCompanyValue1 || "",
        directorsShareholdingCompanyValue2:
          individualTaxes.directorsShareholdingCompanyValue2 || "",
        directorsShareholdingCompanyValue3:
          individualTaxes.directorsShareholdingCompanyValue3 || "",

        nameOfPartnershipFirm1: individualTaxes.nameOfPartnershipFirm1 || "",
        nameOfPartnershipFirm2: individualTaxes.nameOfPartnershipFirm2 || "",
        nameOfPartnershipFirm3: individualTaxes.nameOfPartnershipFirm3 || "",
        shareOfProfit1: individualTaxes.shareOfProfit1 || "",
        shareOfProfit2: individualTaxes.shareOfProfit2 || "",
        shareOfProfit3: individualTaxes.shareOfProfit3 || "",
        capitalContributed1: individualTaxes.capitalContributed1 || "",
        capitalContributed2: individualTaxes.capitalContributed2 || "",
        capitalContributed3: individualTaxes.capitalContributed3 || "",
        totalIncomeShownInTheReturn:
          individualTaxes.totalIncomeShownInTheReturn || "",
        taxExemptedIncomeAndAllowance:
          individualTaxes.taxExemptedIncomeAndAllowance || "",
        receiptOfGiftOtherReceipts:
          individualTaxes.receiptOfGiftOtherReceipts || "",
        totalSourceOfFund: individualTaxes.totalSourceOfFund || "",
        sumOfSourceOfFundAndPreviousYearsNetWealth:
          individualTaxes.sumOfSourceOfFundAndPreviousYearsNetWealth || "",
        expenseRelatingToLifestyle:
          individualTaxes.expenseRelatingToLifestyle || "",
        totalExpensesAndLoss: individualTaxes.totalExpensesAndLoss || "",
        netWealthAtTheLastDateOfThisFinancialYear:
          individualTaxes.netWealthAtTheLastDateOfThisFinancialYear || "",
        totalLiabilitiesOutsideBusiness:
          individualTaxes.totalLiabilitiesOutsideBusiness || "",
        grossWealth: individualTaxes.grossWealth || "",
        businessCapital: individualTaxes.businessCapital || "",
        directorsShareholdingsInTheCompanies:
          individualTaxes.directorsShareholdingsInTheCompanies || "",
        businessCapitalOfPartnershipFirm:
          individualTaxes.businessCapitalOfPartnershipFirm || "",

        // Image 11
        nonAgriculturalPropertyLandHouseProperty:
          individualTaxes.nonAgriculturalPropertyLandHouseProperty || "",
        nonAgriculturalLocationDescription1:
          individualTaxes.nonAgriculturalLocationDescription1 || "",
        nonAgriculturalLocationDescription2:
          individualTaxes.nonAgriculturalLocationDescription2 || "",
        nonAgriculturalLocationDescription3:
          individualTaxes.nonAgriculturalLocationDescription3 || "",
        nonAgriculturalLocationDescription4:
          individualTaxes.nonAgriculturalLocationDescription4 || "",
        nonAgriculturalLocationDescription5:
          individualTaxes.nonAgriculturalLocationDescription5 || "",
        nonAgriculturalValue1: individualTaxes.nonAgriculturalValue1 || "",
        nonAgriculturalValue2: individualTaxes.nonAgriculturalValue2 || "",
        nonAgriculturalValue3: individualTaxes.nonAgriculturalValue3 || "",
        nonAgriculturalValue4: individualTaxes.nonAgriculturalValue4 || "",
        nonAgriculturalValue5: individualTaxes.nonAgriculturalValue5 || "",
        agriculturalLocationAndDescription1:
          individualTaxes.agriculturalLocationAndDescription1 || "",
        agriculturalLocationAndDescription2:
          individualTaxes.agriculturalLocationAndDescription2 || "",
        agriculturalLocationAndDescription3:
          individualTaxes.agriculturalLocationAndDescription3 || "",
        agriculturalLocationValue1:
          individualTaxes.agriculturalLocationValue1 || "",
        agriculturalLocationValue2:
          individualTaxes.agriculturalLocationValue2 || "",
        agriculturalLocationValue3:
          individualTaxes.agriculturalLocationValue3 || "",

        shareDebentureUnitCertificate:
          individualTaxes.shareDebentureUnitCertificate || "",
        sanchayapatraSavingsCertificate:
          individualTaxes.sanchayapatraSavingsCertificate || "",
        depositPensionScheme: individualTaxes.depositPensionScheme || "",

        loanGivenToOthersName: individualTaxes.loanGivenToOthersName || "",
        loanGiventoOthersNid: individualTaxes.loanGiventoOthersNid || "",
        loansGivenToOthers: individualTaxes.loansGivenToOthers || "",

        savingDeposit: individualTaxes.savingDeposit || "",
        providentFund: individualTaxes.providentFund || "",
        otherInvestmentDesc: individualTaxes.otherInvestmentDesc || "",
        otherInvestment: individualTaxes.otherInvestment || "",

        typeOfMotorVehicle1: individualTaxes.typeOfMotorVehicle1 || "",
        typeOfMotorVehicle2: individualTaxes.typeOfMotorVehicle2 || "",
        registrationNumber1: individualTaxes.registrationNumber1 || "",
        registrationNumber2: individualTaxes.registrationNumber2 || "",
        motorValue1: individualTaxes.motorValue1 || "",
        motorValue2: individualTaxes.motorValue2 || "",
        ornamentsDesc: individualTaxes.ornamentsDesc || "",
        ornamentsValue: individualTaxes.ornamentsValue || "",
        furnitureAndElectronic: individualTaxes.furnitureAndElectronic || "",
        othersAssetsDesc: individualTaxes.othersAssetsDesc || "",
        othersAssetsValue: individualTaxes.othersAssetsValue || "",
        bankBalance: individualTaxes.bankBalance || "",
        cashInHand: individualTaxes.cashInHand || "",
        otherFundDesc: individualTaxes.otherFundDesc || "",
        otherFundOutsideBusiness:
          individualTaxes.otherFundOutsideBusiness || "",
        assetOutsideBangladesh: individualTaxes.assetOutsideBangladesh || "",
        agriculturalProperty: individualTaxes.agriculturalProperty || "",
        totalFinancialAssets: individualTaxes.totalFinancialAssets || "",
        motorVehiclesTotal: individualTaxes.motorVehiclesTotal || "",
        totalAssetslocatedInBangladesh:
          individualTaxes.totalAssetslocatedInBangladesh || "",
        totalCashInHandsAndFundOutsideBusiness:
          individualTaxes.totalCashInHandsAndFundOutsideBusiness || "",
        totalAssetsInBangladeshAndOutsideBangladesh:
          individualTaxes.totalAssetsInBangladeshAndOutsideBangladesh || "",

        // Image 12
        totalIncomeShown: individualTaxes.totalIncomeShown || "",
        totalTaxPaid: individualTaxes.totalTaxPaid || "",
      });
    }
  }, [individualTaxes, reset]);

  const updateScale = useCallback(() => {
    if (containerRef.current && imageRefs.current[0]) {
      const imageWidth = imageRefs.current[0].offsetWidth;
      const newScale = imageWidth / 1000; // Assuming 1000px as base width
      setScale(newScale);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedScrollToImage = useCallback(
    debounce((index: number) => {
      imageRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    }, 500),
    [imageRefs]
  );

  const debouncedHandleScroll = useMemo(
    () =>
      debounce(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        const bufferZone = window.innerHeight * 0.1;

        imageRefs.current.forEach((ref, index) => {
          if (ref) {
            const topBoundary = ref.offsetTop + bufferZone;
            const bottomBoundary =
              ref.offsetTop + ref.offsetHeight - bufferZone;

            if (
              scrollPosition > topBoundary &&
              scrollPosition < bottomBoundary
            ) {
              setCurrentImageIndex(index);
              if (index !== lastScrolledIndex) {
                setTargetImageIndex(index);
                setLastScrolledIndex(index);
              }
            }
          }
        });
      }, 100),
    [
      lastScrolledIndex,
      setCurrentImageIndex,
      setTargetImageIndex,
      setLastScrolledIndex,
    ]
  );

  const handleScroll = useCallback(() => {
    debouncedHandleScroll();
  }, [debouncedHandleScroll]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateScale, handleScroll]);

  useEffect(() => {
    if (targetImageIndex !== lastScrolledIndex) {
      debouncedScrollToImage(targetImageIndex);
      setLastScrolledIndex(targetImageIndex);
    }
  }, [targetImageIndex, lastScrolledIndex, debouncedScrollToImage]);

  const setImageRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      imageRefs.current[index] = el;
    },
    []
  );

  const setFormContainerRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      formContainerRefs.current[index] = el;
    },
    []
  );

  const handleNavigation = useCallback(
    (direction: "prev" | "next") => {
      setTargetImageIndex((prevIndex) => {
        const newIndex =
          direction === "prev"
            ? Math.max(0, prevIndex - 1)
            : Math.min(images.length - 1, prevIndex + 1);
        if (newIndex !== prevIndex) {
          setLastScrolledIndex(newIndex);
          debouncedScrollToImage(newIndex);
        }
        return newIndex;
      });
    },
    [debouncedScrollToImage]
  );

  const onSubmit: SubmitHandler<IndividualTaxReturnFormInput> = async (
    data
  ) => {
    startTransition(async () => {
      try {
        let response;
        if (taxReturnOrder) {
          // If tax return exists, update it
          response = await updateTaxReturnOrder(taxReturnOrder.id, data);

          if (response.data?.taxReturn.id) {
            toast({
              title: "Success",
              description: "Tax return updated successfully.",
              variant: "success",
            });
          } else {
            toast({
              title: "Error",
              description: "Could not update tax return. Please try again.",
              variant: "destructive",
            });
          }
        } else {
          // If no existing tax return, create new one
          response = await createTaxReturnAndOrder(
            data,
            searchParams.get("user_id")
          );

          if (response.data?.order.id) {
            toast({
              title: "Success",
              description: "Tax return created successfully.",
              variant: "success",
            });

            if (session.data?.user.role === "ADMIN") {
              router.push(`/admin/orders/${response.data.order.id}`);
            } else {
              router.push(`/profile/submitted/${response.data.order.id}`);
            }
          } else {
            toast({
              title: "Error",
              description: "Could not create tax return. Please try again.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error("Error submitting tax return:", error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const handleSaveForLater = async () => {
    startTransition(async () => {
      try {
        const data = getValues();
        const result = await saveTaxReturn(data, savedTaxReturn?.id);

        if (result.success) {
          toast({
            title: "Success",
            description: "Tax return saved successfully.",
            variant: "success",
          });
        } else {
          toast({
            title: "Error",
            description:
              result.error || "Could not save tax return. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error saving tax return:", error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const renderField = (field: FormField, imageIndex: number) => {
    if (field.imageIndex !== imageIndex || !field.isVisible) return null;

    const fieldStyle = {
      position: "absolute" as const,
      left: `${field.x / 10}%`,
      top: `${field.y / 10}%`,
      width: `${field.width / 10}%`,
      height: `${field.height / 10}%`,
    };

    const isRequired = isFieldRequired(individualTaxReturnSchema, field.name);

    switch (field.type) {
      case "text":
      case "email":
        return (
          <>
            {field.isVisible && (
              <Controller
                name={field.name as any}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div style={fieldStyle} className="overflow-hidden">
                    <input
                      type={field.type}
                      value={value as string}
                      onChange={(e) => {
                        onChange(e.target.value);
                        if (field?.onBlur) field.onBlur(e.target.value);
                      }}
                      className={`w-full h-full absolute border px-2 font-medium ${
                        !field.disabled
                          ? (errors as any)[field.name]
                            ? "border-red-500 bg-red-300/10 focus:border-red-700 focus:ring-0 focus:outline-0 focus:bg-red-300/20 hover:border-red-700"
                            : "border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500"
                          : "bg-[#F5F5F5] font-medium text-[#948C91]"
                      }`}
                      style={{ fontSize: `${14 * scale}px` }}
                      disabled={field.disabled}
                    />
                    {renderErrorAndRequiredIndicator(field, errors, isRequired)}
                  </div>
                )}
              />
            )}
          </>
        );

      case "number":
        const NumberFieldComponent = ({
          value,
          onChange,
        }: {
          value: string;
          onChange: (value: string) => void;
        }) => {
          const debouncedChange = useMemo(
            () =>
              debounce((newValue: string) => {
                onChange(newValue);
                if (field?.onBlur) field.onBlur(newValue);
              }, 500),
            [onChange]
          );

          return (
            <div style={fieldStyle} className="relative overflow-hidden">
              <NumericFormat
                value={value as string}
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
                decimalScale={2}
                fixedDecimalScale={true}
                className={`w-full h-full absolute border px-2 font-medium ${
                  !field.disabled
                    ? (errors as any)[field.name]
                      ? "border-red-500 bg-red-300/10 focus:border-red-700 focus:ring-0 focus:outline-0 focus:bg-red-300/20 hover:border-red-700"
                      : "border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500"
                    : "bg-[#F5F5F5] font-medium text-[#948C91]"
                }`}
                style={{ fontSize: `${14 * scale}px` }}
                disabled={field.disabled}
                allowNegative={false}
                customInput={CustomInput}
                onValueChange={(values) => {
                  debouncedChange(values.value);
                }}
              />
              {renderErrorAndRequiredIndicator(field, errors, isRequired)}
            </div>
          );
        };

        return (
          <>
            {field.isVisible && (
              <Controller
                name={field.name as any}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <NumberFieldComponent value={value} onChange={onChange} />
                )}
              />
            )}
          </>
        );

      case "checkbox":
        return (
          <CustomCheckbox
            label={field.label}
            name={field.name}
            style={{
              position: "absolute",
              left: `${field.x / 10}%`,
              top: `${field.y / 10}%`,
            }}
            value={field.value as boolean}
            scale={scale}
            width={field.width}
            height={field.height}
            required={isFieldRequired(individualTaxReturnSchema, field.name)}
            onBlur={field.onBlur}
          />
        );
      case "radio":
        return (
          <RadioGroup
            name={field.name as any}
            options={field.options as any}
            scale={scale}
            disabled={field.disabled}
            resetFields={field.resetFields}
            required={isRequired}
            label={field.label}
            x={field.x}
            y={field.y}
          />
        );
      case "select":
        return (
          <div style={fieldStyle}>
            <Controller
              name={field.name as any}
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomSelect
                  options={field.options}
                  value={value as string}
                  onChange={onChange}
                  name={field.name}
                  scale={scale}
                  required={isRequired}
                  placeholder={field.placeholder}
                  onBlur={field.onBlur}
                  isVisible={field.isVisible}
                />
              )}
            />
          </div>
        );

      case "date":
        return (
          <Controller
            name={field.name as any}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker
                onChange={(date) => {
                  onChange(date);
                }}
                required={isRequired}
                disabled={field.disabled}
                value={value}
                name={field.name}
                dayPosition={field.dayPosition}
                monthPosition={field.monthPosition}
                yearPosition={field.yearPosition}
                scale={scale}
              />
            )}
          />
        );

      case "signature":
        return (
          <div style={fieldStyle}>
            <Controller
              name="signature"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SignatureField
                  onChange={(signatureData) => {
                    onChange(signatureData);
                  }}
                  disabled={field.disabled}
                  width={field.width}
                  height={field.height}
                  value={value as string}
                />
              )}
            />
          </div>
        );
      case "textarea":
        return (
          <div style={fieldStyle} className="relative overflow-hidden">
            <textarea
              {...register(field.name as any)}
              className="w-full h-full absolute border px-2 border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500"
              style={{ fontSize: `${14 * scale}px` }}
            />
            {isRequired && (
              <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-sky-300/70 rotate-45 transform origin-center transition-colors">
                <span className="absolute text-white top-[23px] left-[17px] text-lg">
                  *
                </span>
              </span>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const allImagesLoaded = loadedImages.every((loaded) => loaded);

  return (
    <>
      {taxReturnOrder && (
        <div className="flex flex-col items-center justify-center p-8 border-b">
          <Button
            size="lg"
            onClick={() => {
              startTransition(async () => {
                try {
                  await generatePDF(images, formFields, getValues());
                  toast({
                    title: "Success",
                    description:
                      "PDF has been generated and downloaded successfully.",
                    variant: "success",
                  });
                } catch (error) {
                  console.error("Error generating PDF:", error);
                  toast({
                    title: "Error",
                    description: "Failed to generate PDF. Please try again.",
                    variant: "destructive",
                  });
                }
              });
            }}
            disabled={isPending || taxReturnOrder?.paymentStatus !== "PAID"}
            className="gap-3 py-8 px-12 text-xl font-semibold shadow-lg hover:shadow-xl transform transition hover:-translate-y-1"
          >
            {isPending ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-6 w-6" />
                Download Tax Return as PDF
              </>
            )}
          </Button>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg">
        <div className="p-6">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative" ref={containerRef}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    ref={setImageRef(index)}
                    className="relative border border-gray-200 mb-8 rounded-lg"
                  >
                    <div className="relative">
                      {!loadedImages[index] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
                          <Loader2 className="w-20 h-20 animate-spin text-primary" />
                        </div>
                      )}
                      <Image
                        src={image}
                        loading="lazy"
                        placeholder="blur"
                        alt={`Form Background ${index + 1}`}
                        layout="responsive"
                        className={`rounded-lg transition-opacity duration-300 ${
                          loadedImages[index] ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={() => handleImageLoad(index)}
                      />
                    </div>
                    {loadedImages[index] && (
                      <div
                        ref={setFormContainerRef(index)}
                        className="absolute top-0 left-0 w-full h-full"
                      >
                        {formFields.map((field) => renderField(field, index))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Responsive Scrollspy */}
              {isMobile ? (
                <Button
                  onClick={() => setIsScrollspyOpen(!isScrollspyOpen)}
                  className="fixed right-10 bottom-10 z-20 bg-white shadow-lg rounded-full p-2"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              ) : null}

              <div
                className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 transition-all duration-300 ${
                  isMobile
                    ? isScrollspyOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                    : ""
                }`}
              >
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setTargetImageIndex(index);
                      if (isMobile) setIsScrollspyOpen(false);
                    }}
                    className={`block mb-2 w-8 h-8 rounded-full transition-all duration-300 ${
                      currentImageIndex === index
                        ? "bg-primary text-white scale-110"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Responsive Floating Bar */}
              <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
                <FloatingErrorSummary />
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6">
                  <div className="hidden md:flex items-center space-x-6 mb-4 md:mb-0">
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        disabled={targetImageIndex === 0}
                        title="Previous Page"
                        onClick={() => handleNavigation("prev")}
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      <span className="text-sm font-medium bg-gray-100 px-3 py-2 rounded-md">
                        Page {targetImageIndex + 1} of {images.length}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        disabled={targetImageIndex === images.length - 1}
                        title="Next Page"
                        type="button"
                        onClick={() => handleNavigation("next")}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {!taxReturnOrder && (
                      <Button
                        variant="outline"
                        type="button"
                        onClick={handleSaveForLater}
                      >
                        Save for Later
                      </Button>
                    )}

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold mb-4 font-serif text-primary">
          Need Assistance?
        </h3>
        <p className="text-gray-700 mb-4">
          Our tax experts are here to help you with any questions or concerns.
        </p>
        <Button className="px-6 py-3 bg-secondary text-primary border-2 border-primary rounded-lg font-semibold text-lg transition duration-300 hover:bg-primary hover:text-white">
          Contact Support
        </Button>
      </div>
    </>
  );
};
export default IndividualTaxReturnForm;

// Custom input component
const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { onBlur, ...rest } = props;
  return (
    <input
      {...rest}
      ref={ref}
      onBlur={(e) => {
        if (onBlur) {
          onBlur(e);
        }
      }}
    />
  );
});

CustomInput.displayName = "CustomInput";

// Helper function to render error and required indicator
const renderErrorAndRequiredIndicator = (
  field: FormField,
  errors: any,
  isRequired: boolean
) => (
  <>
    {(errors as any)[field.name] && (
      <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-red-400/70 rotate-45 transform origin-center transition-colors">
        <span className="absolute text-white top-[23px] left-[17px] text-lg">
          *
        </span>
      </span>
    )}
    {isRequired && !field.disabled && !(errors as any)[field.name] && (
      <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-sky-300/70 rotate-45 transform origin-center transition-colors">
        <span className="absolute text-white top-[23px] left-[17px] text-lg">
          *
        </span>
      </span>
    )}
  </>
);

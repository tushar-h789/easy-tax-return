import { PaymentStatus } from "@prisma/client";

export const MINIMUM_TAX_OPTIONS = [
  "DHAKA_CHATTOGRAM_CITY_CORPORATION_AREA",
  "OTHER_CITY_CORPORATION_AREA",
  "OTHER_AREA",
];

export const NET_WEALTH_SURCHARGE_OPTIONS = ["YES", "NO"];

export const REPAIR_COLLECTION_OPTIONS = [
  "COMMERCIAL_PROPERTY",
  "NON_COMMERCIAL",
  "RESIDENTIAL_PROPERTY",
  "MIXED_PROPERTY",
];

export const NET_WEALTH_LAST_DATE = ["YES", "NO_I_AM_A_NEW_TAXPAYER"];
export const CALCULATE_OPTION = ["Calculate", "ReCalculate"];

export const CONTACT_EMAIL = "info.easytax2024@gmail.com";
export const PHONE_NO = "+880 1773-870749";
export const PHONE_NO_LINK = PHONE_NO.replace(" ", "").replace("-", "");

export const PAYMENT_STATUS_OPTIONS: PaymentStatus[] = [
  "CANCELLED",
  "EXPIRED",
  "PAID",
  "PENDING",
];

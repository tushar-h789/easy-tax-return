import { Suspense } from "react";
import IndividualTaxReturnForm from "./_components/individual-tax-return-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Individual Tax Return Form | Easy Tax Return",
  description:
    "File your individual tax return online with Easy Tax Return. Our user-friendly form ensures accurate and efficient tax filing for Bangladesh residents.",
  keywords:
    "individual tax return, personal tax filing, Bangladesh tax form, online tax submission, income tax return",
  openGraph: {
    title: "Individual Tax Return Form - Easy Tax Return",
    description:
      "Simplify your personal tax filing with our easy-to-use online form. Accurate calculations, secure submission, and expert guidance throughout the process.",
    url: "https://www.etaxreturn.com.bd/individual-tax-return-form",
    type: "website",
    images: [
      {
        url: "https://www.etaxreturn.com.bd/images/individual-tax-return-og.jpg",
        width: 1200,
        height: 630,
        alt: "Easy Tax Return Individual Tax Return Form",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "File Your Individual Tax Return Online | Easy Tax Return",
    description:
      "Complete your personal tax return quickly and accurately with our online form. Expert support available throughout the process.",
    images: [
      "https://www.etaxreturn.com.bd/images/individual-tax-return-twitter.jpg",
    ],
  },
};

export default function IndividualTaxReturnPage() {
  return (
    <>
      <div className="bg-lightGray min-h-screen">
        <div className="container mx-auto py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif text-center">
            Online Tax Return Form
          </h1>
          <p className="text-gray-700 mb-8 text-center max-w-2xl mx-auto">
            Complete your tax return easily and securely. Our form is designed
            to guide you through the process step by step.
          </p>

          <Suspense>
            <IndividualTaxReturnForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}

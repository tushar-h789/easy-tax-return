import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import SectionSubtitle from "@/components/custom/section-subtitle";
import SectionTitle from "@/components/custom/section-title";

const incomeTaxServiceData = [
  {
    title: "Tax Planning and Strategy",
    description:
      "Minimize tax liabilities while ensuring compliance with laws.",
    items: [
      "Tax-efficient structuring of business operations",
      "Deductions and credits maximization",
      "Timing of income and expenses",
    ],
  },
  {
    title: "Tax Compliance",
    description: "Ensure timely and accurate filing of tax returns.",
    items: [
      "Preparation and filing of corporate tax returns, Withholding tax return and others relevant return",
      "Deductions and credits maximization",
      "Timing of income and expenses",
    ],
  },
  {
    title: "Tax Advisory",
    description: "Provide ongoing advice to adapt to changing tax laws.",
    items: [
      "Guidance on mergers, acquisitions, and other business transactions",
      "Advice on international taxation if your business operates globally",
      "Risk management related to tax matters",
    ],
  },
];

const vatServiceData = [
  {
    title: "VAT Registration",
    description: "To legally collect and remit VAT.",
    items: [
      "Assessing whether your business needs to register for VAT",
      "Completing and submitting VAT registration applications",
      "Handling registration for multiple jurisdictions, if necessary",
    ],
  },
  {
    title: "VAT Compliance",
    description:
      "To ensure that all VAT obligations are met accurately and on time.",
    items: [
      "Preparation and submission of VAT returns",
      "Ensuring correct VAT rates are applied to transactions",
      "Maintaining accurate records of VAT invoices and receipts",
      "Managing VAT payments and reclaiming VAT on expenses",
    ],
  },
  {
    title: "Tax Advisory",
    description: "Provide ongoing advice to adapt to changing tax laws.",
    items: [
      "Guidance on mergers, acquisitions, and other business transactions",
      "Advice on international taxation if your business operates globally",
      "Risk management related to tax matters",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full mt-20 py-12 bg-lightGray">
      <div className="text-center container max-w-7xl mx-auto px-4">
        <SectionSubtitle subtitle="Our Services" />

        <div id="company-income-tax">
          <SectionTitle title="Company income tax services" />
          <p className="text-gray-600 mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto text-sm md:text-base">
            If you&apos;re looking for company income tax services, here are
            some key aspects to consider
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {incomeTaxServiceData.map((service, index) => (
              <Card key={index} className="text-left shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div id="vat-related-services">
          <SectionTitle title="VAT related services" />
          <p className="text-gray-600 mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto text-sm md:text-base">
            VAT (Value Added Tax) services are crucial for businesses to ensure
            compliance, optimize tax efficiency, and avoid penalties.
            Here&apos;s a breakdown of key VAT-related services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vatServiceData.map((service, index) => (
              <Card key={index} className="text-left shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

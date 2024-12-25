import React from "react";
import Image from "next/image";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutImage from "@/public/about-us-5.jpg";
import SectionSubtitle from "@/components/custom/section-subtitle";
import SectionTitle from "@/components/custom/section-title";

const AboutUs = () => {
  return (
    <section
      className="max-w-7xl mx-auto my-12 sm:my-16 md:my-20 lg:my-24 px-4 md:px-8"
      id="about-us"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 mb-8 lg:mb-0 relative px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-t-full overflow-hidden max-w-[80%] sm:max-w-full mx-auto min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[550px]">
            <Image
              src={AboutImage}
              alt="About Us"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 bg-[#CBEBBD] text-[#222C1E] py-2 px-4 rounded-md shadow-md font-serif text-center lg:text-left">
            <p className="font-medium text-lg sm:text-xl lg:text-2xl">
              10+ Years
            </p>
            <p className="font-medium text-lg sm:text-xl lg:text-2xl">
              of Experience
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-5 flex flex-col justify-center text-center lg:text-left">
          <SectionSubtitle subtitle="About Us" />
          <SectionTitle
            title="We're not your typical CPA firm, an outsourced accounting
            service"
          />
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Tax services that are customized to enhance your financial strategy
            and minimize tax liabilities. Trust us for tax preparation,
            planning, and filing needs to thrive in today&apos;s competitive
            market.
          </p>

          <ul className="space-y-2 sm:space-y-4 mb-6 sm:mb-8">
            {[
              "We create a Comprehensive Tax Reduction Plan",
              "We clean up your Bookkeeping, Payroll, Accounting & Operations",
              "We pro-actively manage your S-Corp or LLC salary decisions & tax payments",
              "We keep your Bookkeeping up-to-date & accurate",
            ].map((item, index) => (
              <li key={index} className="flex items-start lg:items-center">
                <Check className="text-secondary mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 mt-1 lg:mt-0 flex-shrink-0" />
                <p className="text-sm sm:text-base text-left">{item}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start flex-wrap mt-4">
            <span className="text-gray-400 mr-0 sm:mr-4 mb-2 sm:mb-0 text-sm sm:text-base">
              Still not confident?
            </span>
            <Button className="inline-flex items-center px-4 transition duration-300 py-3 sm:py-5 text-sm sm:text-base">
              <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              CONTACT US
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

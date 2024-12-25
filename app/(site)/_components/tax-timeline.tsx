import React from "react";
import DocumentIconTwo from "@/public/icons/document-icon-two";
import CurvedLine from "@/public/curved-line";
import TaxFormIcon from "@/public/icons/tax-form-icon";
import SubmitIcon from "@/public/icons/submit-icon";
import ConfirmationMessageIcon from "@/public/icons/confirmation-message-icon";
import SectionTitle from "@/components/custom/section-title";
import SectionSubtitle from "@/components/custom/section-subtitle";

interface TimelineStepProps {
  text: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ text, Icon }) => (
  <div className="flex flex-col items-center">
    <div>
      <Icon height={136} width={136} />
    </div>
    <h3 className="text-center lg:text-xl mt-2 md:mt-3 lg:mt-5">{text}</h3>
  </div>
);

const TaxTimeline: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20" id="process">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <SectionSubtitle subtitle="How we work" />
        <SectionTitle title="Timeline of the tax filling process" />

        <p className="text-gray-600 mb-8 md:mb-10 lg:mb-12 max-w-lg mx-auto text-sm md:text-base">
          Tax services that are customized to enhance your financial strategy
          and minimize tax liabilities. Trust us for tax preparation, planning,
          and filing needs to thrive in today&apos;s competitive market.
        </p>
        <div className="flex flex-col md:grid md:grid-cols-7 gap-4 items-center mt-6 md:mt-8 lg:mt-10">
          <TimelineStep text="Gather income documents" Icon={DocumentIconTwo} />
          <div className="md:col-span-1 w-36 h-36 md:w-full md:h-auto transform rotate-90 md:rotate-0 flex justify-center items-center">
            <CurvedLine />
          </div>
          <TimelineStep text="Complete tax form" Icon={TaxFormIcon} />
          <div className="md:col-span-1 w-36 h-36 md:w-full md:h-auto transform rotate-90 md:rotate-0 flex justify-center items-center">
            <CurvedLine />
          </div>
          <TimelineStep text="Submit online securely" Icon={SubmitIcon} />
          <div className="md:col-span-1 w-36 h-36 md:w-full md:h-auto transform rotate-90 md:rotate-0 flex justify-center items-center">
            <CurvedLine />
          </div>
          <TimelineStep
            text="Confirmation Message"
            Icon={ConfirmationMessageIcon}
          />
        </div>
      </div>
    </section>
  );
};

export default TaxTimeline;

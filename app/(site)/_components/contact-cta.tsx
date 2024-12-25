import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, PHONE_NO, PHONE_NO_LINK } from "@/lib/constants";
import { toTitleCase } from "@/lib/utils";
import Link from "next/link";
import { LuPhone } from "react-icons/lu";

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-primary text-white py-12 md:py-16">
      <div className="container mx-auto text-center px-4 md:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] leading-tight font-semibold mb-4 font-serif">
          {toTitleCase("Need personalized tax advice?")}
          <br className="hidden sm:inline" />{" "}
          {toTitleCase("Consult with our tax expert.")}
        </h2>
        <p className="text-sm md:text-base mb-8 max-w-2xl mx-auto">
          Get personalized advice and strategies tailored to your
          business&lsquo;s unique needs. Our tax expert is here to help you
          navigate your tax situation.
        </p>
        <a href={`tel:${PHONE_NO_LINK}`} className="inline-block">
          <Button className="w-full sm:w-auto inline-flex items-center justify-center uppercase bg-white text-primary py-3 px-4 sm:py-5 sm:px-6 hover:bg-secondary hover:text-primary text-sm md:text-base">
            <LuPhone className="mr-2" />
            Call {PHONE_NO}
          </Button>
        </a>
        <p className="text-sm mt-4">
          House-37 (02nd Floor), Amin Uddin Khondokar Market, 100 Feet Road,
          Mafani Avenue, Natun Bazar, Dhaka-1212
          <br />
          Email:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}

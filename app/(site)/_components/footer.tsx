"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Logo from "@/components/logo";
import Link from "next/link";
import { FaFacebookSquare, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";

const HERO_CARD_OPTIONS = [
  {
    label: "Individual Tax Return",
    href: "/individual-tax-return",
  },
  {
    label: "Company Income Tax",
    href: "company-income-tax",
  },
  {
    label: "VAT Related Services",
    href: "vat-related-services",
  },
  {
    label: "Consult with Tax Expert",
    href: "contact",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer className="bg-lightGray text-gray-600 pt-10 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-8">
          <div className="col-span-3">
            <Logo width={200} className="mx-auto md:mx-0 mb-4" />
            <p className="text-sm text-center md:text-left">
              Tax services that are customized to enhance your financial
              strategy and minimize tax liabilities. Trust us for tax
              preparation, planning, and filing needs to thrive in today&apos;s
              competitive market.
            </p>
          </div>

          <div className="col-span-2">
            <h4 className="font-semibold text-lg mb-4 text-center md:text-left">
              Services
            </h4>
            <ul className="text-sm space-y-2">
              {HERO_CARD_OPTIONS.map((option, index) => (
                <li key={option.href} className="text-center md:text-left">
                  {index === 0 ? (
                    <Link
                      href={option.href}
                      className="hover:underline hover:text-primary"
                    >
                      {option.label}
                    </Link>
                  ) : (
                    <button
                      className="hover:underline hover:text-primary text-center md:text-left w-full"
                      onClick={() => scrollToSection(option.href)}
                    >
                      {option.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2">
            <h4 className="font-semibold text-lg mb-4 text-center md:text-left">
              Quick Links
            </h4>
            <ul className="text-sm space-y-2">
              {["Home", "Services", "Privacy Policy", "Terms & Conditions"].map(
                (item) => (
                  <li key={item} className="text-center md:text-left">
                    {item === "Services" ? (
                      <button
                        onClick={() => scrollToSection("services")}
                        className="hover:underline hover:text-primary text-left w-full"
                      >
                        {item}
                      </button>
                    ) : (
                      <Link
                        href={
                          item === "Home"
                            ? "/"
                            : `/${item
                                .toLowerCase()
                                .replace(/ & /g, "-")
                                .replace(/ /g, "-")}`
                        }
                        className="hover:underline hover:text-primary"
                      >
                        {item}
                      </Link>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="col-span-3">
            <h4 className="font-semibold text-lg mb-4 text-center md:text-left">
              Contact
            </h4>
            <div className="text-sm space-y-3">
              <Link
                href="mailto:info.easytax2024@gmail.com"
                className="hover:text-primary flex items-center justify-center md:justify-start space-x-2 group"
              >
                <Mail
                  size={18}
                  className="text-gray-400 group-hover:text-primary"
                />
                <span className="hover:underline">
                  info.easytax2024@gmail.com
                </span>
              </Link>

              <Link
                href="tel:+8801773870749"
                className="hover:text-primary flex items-center justify-center md:justify-start space-x-2 group"
              >
                <Phone
                  size={18}
                  className="text-gray-400 group-hover:text-primary"
                />
                <span className="hover:underline">+880 1773-870749</span>
              </Link>

              <div className="flex items-center md:items-start justify-center md:justify-start space-x-2">
                <MapPin
                  size={18}
                  className="text-gray-400 mt-1 flex-shrink-0"
                />
                <p className="text-center md:text-left">
                  House-37 (02nd Floor), Amin Uddin Khondokar Market, 100 Feet
                  Road, Mafani Avenue, Natun Bazar, Dhaka-1212, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-sm text-gray-500">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              Copyright ©{currentYear}{" "}
              <Link href="/" className="hover:underline">
                easytaxreturn.com.bd
              </Link>
              . All rights reserved
            </div>
            <div className="flex space-x-4">
              {[FaFacebookSquare, FaLinkedinIn, FaYoutube].map(
                (Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    aria-label={["Facebook", "LinkedIn", "YouTube"][index]}
                    className="hover:text-secondary"
                  >
                    <Icon size={24} />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

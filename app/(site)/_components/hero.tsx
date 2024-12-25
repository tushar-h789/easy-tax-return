"use client";

import Image from "next/image";
import heroImage from "@/public/hero-image-3.jpg";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import DocumentIcon from "@/public/icons/document-icon";
import CompanyIcon from "@/public/icons/company-icon";
import AvatarOne from "@/public/review-avatars/avatar-1.jpg";
import AvatarFive from "@/public/review-avatars/avatar-5.jpg";
import AvatarThree from "@/public/review-avatars/avatar-3.jpg";
import AvatarFour from "@/public/review-avatars/avatar-4.jpg";

import VatIcon from "@/public/icons/vat-icon";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const HERO_CARD_OPTIONS = [
  {
    label: "Individual Tax Return",
    Icon: DocumentIcon,
    href: "/individual-tax-return",
    color: "bg-[rgba(100,143,255,0.2)]",
    hoverColor: "bg-[rgba(100,143,255,0.4)]",
  },
  {
    label: "Company Income Tax",
    Icon: CompanyIcon,
    href: "company-income-tax",
    color: "bg-[rgba(255,159,67,0.2)]",
    hoverColor: "bg-[rgba(255,159,67,0.4)]",
  },
  {
    label: "VAT Related Services",
    Icon: VatIcon,
    href: "vat-related-services",
    color: "bg-[rgba(46,213,115,0.2)]",
    hoverColor: "bg-[rgba(46,213,115,0.4)]",
  },
  {
    label: "Consult with Tax Expert",
    Icon: CompanyIcon,
    href: "contact",
    color: "bg-[rgba(255,107,129,0.2)]",
    hoverColor: "bg-[rgba(255,107,129,0.4)]",
  },
];

export default function Hero() {
  const rating = 4.8;
  const maxRating = 5;

  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const isHomePage = pathname === "/";

      if (isHomePage) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        router.push(`/#${targetId}`);
      }
    },
    [router, pathname]
  );

  return (
    <section className="bg-white">
      <div className="container mx-auto py-8 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <div className="lg:col-span-3 text-center lg:text-left">
          <h1 className="text-[2.5rem] md:text-5xl lg:text-[4rem] leading-tight lg:leading-none font-bold text-primary mb-4 font-serif">
            Individual & Company Tax Return Prepared in Bangladesh
          </h1>
          <p className="text-gray-700 mb-6 text-sm md:text-base mx-auto lg:mx-0 max-w-2xl">
            Easy Tax Return একটি স্বয়ংক্রিয় সফটওয়্যার যার মাধ্যমে আপনি আপনার
            আয়কর রিটার্ন কম্পিউটার বা মোবাইলের মাধ্যমে নিজেই সহজে, স্বল্প খরচে
            ও নিরাপদে প্রস্তুত করতে পারবেন। আমাদের স্বয়ংক্রিয় সফটওয়্যারের
            মাধ্যমে সংশ্লিষ্ট আয় বছরের আপনার নেট কর দায় স্বয়ংক্রিয়ভাবে হিসাব
            হবে এবং অনলাইন এ-চালানের মাধ্যমে নেট কর দায় সরকারি কোষাগারে জমা
            দিতে পারবেন। আপনার আয়কর রিটার্ন জমা দেওয়ার পর আমাদের প্রতিনিধি
            সংশ্লিষ্ট আয়কর অফিসে আপনার আয়কর রিটার্ন জমা দিয়ে, Acknowledgment
            Slip আপনার Profile ID তে Upload করে দিবে এবং আপনার নথি আপনার
            Personal ID তে থাকবে যা আপনি ডাউনলোড করে নিতে পারবেন। এছাড়া আমাদের
            আয়কর ও ভ্যাট বিশেষজ্ঞের সাথে আপনি পরামর্শ করতে পারবেন।
          </p>

          <div className="flex flex-col items-center lg:items-start lg:flex-row mb-8">
            <div className="flex -space-x-4 sm:-space-x-6 mr-0 lg:mr-4 mb-4 lg:mb-0">
              {[AvatarOne, AvatarFour, AvatarFive, AvatarThree].map(
                (avatar, index) => (
                  <Image
                    key={index}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover"
                    src={avatar}
                    alt={`Client ${index}`}
                  />
                )
              )}
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-start">
                <span className="text-lg sm:text-xl font-bold mr-2">
                  {rating.toFixed(1)}
                </span>
                <div className="flex">
                  {[...Array(maxRating)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                Our clients rate us as excellent.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 mt-8 lg:mt-0">
          <div className="relative p-4 sm:p-6">
            <div className="relative w-full rounded-t-full overflow-hidden min-h-[500px]">
              <Image
                src={heroImage}
                alt="Easy tax return hero image"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            <p className="absolute top-1/4 left-0 bg-[#EBBDBD] py-1 rounded font-serif text-base sm:text-xl px-3 sm:px-5 text-[#513B3B] shadow-md transform hover:scale-105 transition-transform duration-300">
              Tax Advice
            </p>
            <div className="absolute top-1/2 right-0 bg-[#A8F1E5] text-[#324F4B] py-1 rounded font-serif text-base sm:text-xl px-3 sm:px-5 shadow-md transform hover:scale-105 transition-transform duration-300">
              Legal Advice
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#F1EFA8] py-1 rounded text-[#535237] font-serif text-base sm:text-xl px-3 sm:px-5 shadow-md transform hover:scale-105 transition-transform duration-300">
              Financial Advice
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 px-4 sm:grid-cols-2 lg:grid-cols-4 gap-1 container mx-auto">
        {HERO_CARD_OPTIONS.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className={`p-4 sm:p-5 ease-in-out duration-300 cursor-pointer group block relative overflow-hidden ${item.color}`}
            onClick={(e) =>
              item.href.startsWith("/") ? null : handleNavigation(e, item.href)
            }
          >
            <div
              className={`absolute inset-0 ${item.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
            <div className="relative z-10 flex flex-col items-center lg:items-start">
              <item.Icon height={36} width={36} className="sm:h-12 sm:w-12" />
              <h3 className="text-font font-serif text-lg sm:text-[1.35rem] mt-2 sm:mt-3 text-center lg:text-left">
                {item.label}
              </h3>
              <div className="text-xs sm:text-sm mt-2 flex items-center text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                <span className="font-medium">Discover</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

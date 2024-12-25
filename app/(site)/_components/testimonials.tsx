"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import Image from "next/image";
import TestimonialImage from "@/public/testimonials-person.jpg";
import AvatarOne from "@/public/review-avatars/avatar-1.jpg";
import AvatarTwo from "@/public/review-avatars/avatar-2.jpg";
import AvatarThree from "@/public/review-avatars/avatar-3.jpg";
import SectionSubtitle from "@/components/custom/section-subtitle";
import SectionTitle from "@/components/custom/section-title";

const testimonials = [
  {
    id: 1,
    name: "Mahmud Rahman",
    location: "Dhaka",
    rating: 5,
    text: "I have received excellent customer service at all times. It's true that there was a small issue I had to resolve manually, but overall the attention has been impeccable. I highly recommend their services.",
    avatar: AvatarOne,
  },
  {
    id: 2,
    name: "Pritom Chakraborty",
    location: "Chittagong",
    rating: 4,
    text: "The tax return process was smooth and efficient. The team was very helpful in guiding me through the complexities. I'm satisfied with the service provided.",
    avatar: AvatarTwo,
  },
  {
    id: 3,
    name: "Abdul Karim",
    location: "Sylhet",
    rating: 5,
    text: "Exceptional service! They made filing my taxes a breeze. Their expertise saved me both time and money. Highly recommended for anyone looking for professional tax assistance!",
    avatar: AvatarThree,
  },
];

const Testimonials: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20"
      id="testimonials"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <div className="lg:col-span-3 lg:pr-8">
          <div className="text-center md:text-left">
            <SectionSubtitle subtitle="Testimonials" />
            <SectionTitle
              title="Our client's reviews inspired us the most to improve our
            services"
            />
          </div>

          <div className="overflow-hidden mt-6 md:mt-10" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0">
                  <div className="flex justify-center lg:justify-start mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 md:w-5 md:h-5 fill-current ${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm md:text-base text-center lg:text-left">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center justify-center lg:justify-start mt-4">
                    <Image
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white object-cover mr-2"
                      src={testimonial.avatar}
                      alt={`Client ${testimonial.name}`}
                    />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 px-4 md:px-10 mt-8 lg:mt-0">
          <div className="relative w-full pt-[100%] md:pt-[125%] rounded-t-full overflow-hidden">
            <Image
              src={TestimonialImage}
              fill
              alt="Testimonial"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;

"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  CreditCard,
  FileCheck,
  History,
  LayoutDashboard,
  LogIn,
  LogOut,
  Save,
  User,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Logo from "@/components/logo";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    aria-label="Menu toggle"
    role="button"
  >
    <Path
      variants={{
        closed: { d: "M 2 2.5 L 20 2.5" },
        open: { d: "M 3 16.5 L 17 2.5" },
      }}
      animate={isOpen ? "open" : "closed"}
    />
    <Path
      d="M 2 9.423 L 20 9.423"
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 },
      }}
      transition={{ duration: 0.1 }}
      animate={isOpen ? "open" : "closed"}
    />
    <Path
      variants={{
        closed: { d: "M 2 16.346 L 20 16.346" },
        open: { d: "M 3 2.5 L 17 16.346" },
      }}
      animate={isOpen ? "open" : "closed"}
    />
  </svg>
);

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [targetScroll, setTargetScroll] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const lastScrollTop = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const NAV_OPTIONS = useMemo(
    () => [
      { label: "Home", link: "home" },
      {
        label: "Services",
        link: "services",
        subItems: [
          { label: "Individual Tax Return", link: "individual-tax-return" },
          { label: "Company Tax Return", link: "company-tax-return" },
          { label: "Partnership Tax Return", link: "partnership-tax-return" },
          { label: "Trust Tax Return", link: "trust-tax-return" },
        ],
      },
      { label: "About Us", link: "about-us" },
      { label: "Contact", link: "contact" },
    ],
    []
  );

  const menuItems = [
    {
      href: "/profile",
      label: "My Profile",
      icon: User,
    },
    {
      href: "/profile/submitted",
      label: "Submitted Returns",
      icon: FileCheck,
    },
    {
      href: "/profile/saved",
      label: "Saved Returns",
      icon: Save,
    },
  ];

  const handleScroll = useCallback(() => {
    const scrollY = window.pageYOffset;
    const scrollThreshold = 100; // Increased from 50 to 100
    const hysteresis = 20; // Add hysteresis

    // Clear the existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set a new timeout
    scrollTimeout.current = setTimeout(() => {
      if (scrollY > scrollThreshold + hysteresis && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollY < scrollThreshold - hysteresis && isScrolled) {
        setIsScrolled(false);
      }

      const sections = NAV_OPTIONS.map((option) =>
        document.getElementById(option.link)
      ).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY + window.innerHeight / 3) {
          setActiveSection(section.id);
          break;
        }
      }

      if (scrollY < scrollThreshold) {
        setActiveSection("home");
      }

      lastScrollTop.current = scrollY;
    }, 10); // 50ms delay
  }, [NAV_OPTIONS, isScrolled]);

  useLayoutEffect(() => {
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavigation = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, targetId: string) => {
      e.preventDefault();
      const isHomePage = pathname === "/";

      if (targetId === "home") {
        if (isHomePage) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          router.push("/");
          setTargetScroll("top");
        }
        setActiveSection("home");
      } else if (isHomePage) {
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
        setActiveSection(targetId);
      } else {
        router.push(`/#${targetId}`);
        setTargetScroll(targetId);
      }
      setIsMobileMenuOpen(false);
    },
    [router, pathname]
  );

  useEffect(() => {
    if (targetScroll) {
      if (targetScroll === "top") {
        window.scrollTo({ top: 0, behavior: "instant" });
      } else {
        const targetElement = document.getElementById(targetScroll);
        if (targetElement) {
          const offset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "instant",
          });
        }
      }
      setTargetScroll(null);
    }
  }, [targetScroll, pathname]);

  const NavLinks = ({ mobile = false }) => (
    <ul
      className={`flex ${mobile ? "flex-col space-y-4" : "items-center"}`}
      role="navigation"
    >
      {NAV_OPTIONS.map((navItem) => (
        <li
          key={navItem.label}
          className={`mx-4 text-font uppercase hover:text-secondary transition-colors
            ${
              activeSection === navItem.link && pathname === "/"
                ? "text-primary"
                : ""
            }`}
        >
          <Link href={`/#${navItem.link}`}>
            <span
              onClick={(e) => handleNavigation(e, navItem.link)}
              className={`transition-colors duration-300
                ${
                  activeSection === navItem.link && pathname === "/"
                    ? "text-secondary"
                    : ""
                }`}
              aria-current={
                activeSection === navItem.link && pathname === "/"
                  ? "page"
                  : undefined
              }
            >
              {navItem.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  const MobileNavLinks = () => {
    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

    const item = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    };

    return (
      <motion.ul
        className="flex flex-col space-y-4 mt-10"
        variants={container}
        initial="hidden"
        animate="show"
        role="navigation"
      >
        {NAV_OPTIONS.map((navItem) => (
          <motion.li
            key={navItem.label}
            variants={item}
            className={`mx-4 text-font uppercase hover:text-primary transition-colors
              ${activeSection === navItem.link ? "text-primary" : ""}`}
          >
            <Link href={`/#${navItem.link}`}>
              <span
                onClick={(e) => handleNavigation(e, navItem.link)}
                className={`transition-colors duration-300
                  ${activeSection === navItem.link ? "text-primary" : ""}`}
                aria-current={
                  activeSection === navItem.link ? "page" : undefined
                }
              >
                {navItem.label}
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    );
  };

  const UserMenu = () => {
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === "ADMIN";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center space-x-3 px-3 py-6 rounded-full transition-colors duration-200 md:ml-10 focus-visible:ring-0 bg-white"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || ""}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold leading-tight">
                {session?.user?.name}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-slate-200" />
          {isAdmin ? (
            <>
              <DropdownMenuItem>
                <Link href="/admin" className="flex items-center w-full">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              {menuItems.map(({ href, label, icon: Icon }) => (
                <DropdownMenuItem key={href} className="p-0" asChild>
                  <Link
                    href={href}
                    className="flex items-center w-full px-2 py-1.5 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </>
          )}

          <DropdownMenuSeparator className="bg-slate-200" />
          <DropdownMenuItem
            onClick={async () => await signOut()}
            className="flex items-center cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out border border-[#DBE1E7]
        ${isScrolled ? "bg-white shadow-md" : "bg-lightGray"}`}
      role="banner"
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <div
          className={`flex items-center transition-all duration-300 ${
            isScrolled ? "h-[60px] md:h-[65px]" : "h-[72px] md:h-[108px]"
          }`}
        >
          <Link
            href="/"
            className={`italic font-bold font-sans text-2xl md:text-3xl transition-colors duration-300
            ${isScrolled ? "text-primary" : "text-primary"}`}
            role="heading"
            aria-level={1}
          >
            <Logo width={200} height={100} />
          </Link>
        </div>
        <nav className="hidden md:flex items-center">
          <NavLinks />

          {session ? (
            <UserMenu />
          ) : (
            <Link href="/login" className="block md:ml-10">
              <Button className="w-full uppercase flex items-center justify-center">
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Button>
            </Link>
          )}
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 h-auto"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <MenuToggle isOpen={isMobileMenuOpen} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[250px] sm:w-[300px]"
              aria-label="Mobile menu"
            >
              <SheetHeader>
                <Logo width={150} height={40} />
              </SheetHeader>
              <MobileNavLinks />
              {session ? (
                <div className="mt-4">
                  <UserMenu />
                </div>
              ) : (
                <Link href="/login" className="mt-4 block">
                  <Button className="w-full uppercase flex items-center justify-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

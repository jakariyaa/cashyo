import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Github, Linkedin, Mail, Twitter, Wallet } from "lucide-react";
import { Link } from "react-router";

const navigation = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "GitHub",
      href: "#",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
    {
      name: "Email",
      href: "mailto:hello@cashyo.com",
      icon: Mail,
    },
  ],
};

export function Footer() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <footer ref={ref} className="bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col space-y-8 md:flex-row md:items-start md:justify-between md:space-y-0 md:space-x-12">
          <div
            className={`flex flex-col space-y-4 transition-all duration-700 ease-out ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Link to="/" className="-m-1.5 p-1.5 mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold text-sm">
                <Wallet className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Cashyo
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">
              Secure, user-friendly digital wallet for modern financial
              transactions.
            </p>
          </div>

          <div
            className={`grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-2 transition-all duration-700 ease-out delay-200 ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div>
              <h3 className="text-xs sm:text-sm font-semibold leading-6 text-foreground">
                Product
              </h3>
              <ul role="list" className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                {navigation.product.map((item, index) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`text-xs sm:text-sm leading-6 text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1 relative group ${
                        isIntersecting ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      {item.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-semibold leading-6 text-foreground">
                Company
              </h3>
              <ul role="list" className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                {navigation.company.map((item, index) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`text-xs sm:text-sm leading-6 text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1 relative group ${
                        isIntersecting ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transitionDelay: `${600 + index * 100}ms` }}
                    >
                      {item.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`transition-all duration-700 ease-out delay-400 ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex space-x-5 sm:space-x-6">
              {navigation.social.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-125 hover:-translate-y-1 ${
                      isIntersecting ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${500 + index * 100}ms` }}
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <p
            className={`text-center text-xs leading-5 text-muted-foreground transition-all duration-700 ease-out delay-600 ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            &copy; 2025 Cashyo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

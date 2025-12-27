import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Github, Facebook, Twitter, Instagram } from "lucide-react";
import { Logo } from "../common/logo";
import { Link } from "react-router";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Agents", href: "/agents" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
  social: [
    { name: "Facebook", href: "https://facebook.com", icon: Facebook },
    { name: "X", href: "https://twitter.com", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "GitHub", href: "https://github.com/jakariyaa", icon: Github },
  ],
};

export function Footer() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <footer ref={ref} className="bg-card text-card-foreground rounded-t-[3rem] -mt-8 relative z-10 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-12">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 transition-all duration-700 ease-out ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Secure, fast, and global payments for everyone. Join the revolution today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">Company</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">Resources</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links - Moved to Grid */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-foreground">Connect</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-8 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6 transition-all duration-700 ease-out delay-300 ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          <p className="text-xs text-muted-foreground">&copy; 2025 Cashyo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

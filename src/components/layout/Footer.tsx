import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

const Footer = () => {
  const serviceCategories = [
    { name: "Men's Hair", href: "/mens-hair" },
    { name: "Women's Beauty", href: "/womens-beauty" },
    { name: "Nail Studios", href: "/nail-studios" },
    { name: "Makeup Artists", href: "/makeup-artists" },
  ];

  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Help", href: "/help" },
    { name: "Privacy", href: "/privacy" },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Calendar className="w-6 h-6 text-primary" />
              <span className="text-lg font-semibold">BeautySalon</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Book trusted beauty and grooming services near you with transparent pricing and verified professionals.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Services</h3>
            <ul className="space-y-2">
              {serviceCategories.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} BeautySalon. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/cookies" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

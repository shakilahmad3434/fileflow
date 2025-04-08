import { Facebook, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const footerMenus = {
  Product: [
    { name: "Features", link: "/features" },
    { name: "Pricing", link: "/pricing" },
    { name: "Security", link: "/security" },
    { name: "Enterprise", link: "/enterprise" }
  ],
  Company: [
    { name: "About Us", link: "/about" },
    { name: "Blog", link: "/blog" },
    { name: "Careers", link: "/careers" },
    { name: "Contact", link: "/contact" }
  ],
  Legal: [
    { name: "Privacy Policy", link: "/privacy" },
    { name: "Terms of Service", link: "/terms" },
    { name: "Cookie Policy", link: "/cookies" },
    { name: "GDPR", link: "/gdpr" }
  ]
};

const Footer = () => (
  <footer className="bg-[#070528]">
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center space-x-1">
            <div className="w-8 h-8 rounded-md gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl text-white">FileFlow</span>
          </Link>
          <p className="mt-4 text-gray-300 text-sm">
          All-in-one file management platform that combines secure sharing, storage, and processing tools.
          </p>
        </div>

        {Object.entries(footerMenus).map(([title, items]) => (
          <div key={title}>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">{title}</h3>
            <ul className="mt-4 space-y-2">
              {items.map((item, i) => (
                <li key={i}>
                  <Link to={item.link} className="text-gray-300 hover:text-gray-50">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} FileFlow. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex space-x-6">
          {[Facebook, Twitter, Github].map((Icon, i) => (
            <a key={i} href="#" className="text-gray-400 hover:text-fileflow-primary">
              <span className="sr-only">{Icon.name}</span>
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
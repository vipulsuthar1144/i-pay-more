"use client";

import { Menu } from "lucide-react"; // For mobile menu icon
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import FeedbackSection from "../sections/FeedbackSection";
import Breadcrumb from "@components/static/BreadCrumb";
import { root_container } from "@/app/Providers";

const policies = [
  { id: "warranty", title: "Warranty Policy" },
  { id: "terms", title: "Terms of Use" },
  { id: "conditions", title: "Terms & Conditions" },
  { id: "cookie", title: "Cookie Policy" },
  { id: "privacy", title: "Privacy Policy" },
  { id: "gdpr", title: "GDPR Compliance" },
  { id: "indemnity", title: "Indemnity Form" },
  { id: "return", title: "Return Policy" },
  { id: "copyright", title: "Copyright Policy" },
];

const policyContent: Record<string, string> = {
  warranty: "This is the warranty policy content...",
  terms: "This is the terms of use content...",
  conditions: "These are the terms and conditions...",
  cookie: "This is the cookie policy...",
  privacy: "This is the privacy policy...",
  gdpr: "This is the GDPR compliance policy...",
  indemnity: "This is the indemnity form...",
  return: "This is the return policy...",
  copyright: "This is the refurbished content & copyright policy...",
};

const PolicyPage = () => {
  const { policyID } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={root_container}>
      <div className="space-y-3">
        <Breadcrumb />
        <FeedbackSection />
      </div>
      {/* Mobile Menu Button */}
      <div className="flex flex-col gap-5 md:flex-row min-h-screen">
        <button
          className="md:hidden bg-primary rounded-lg text-white p-3 flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="w-6 h-6" />
          <span className="ml-2">Menu</span>
        </button>

        {/* Sidebar (Collapsible on Mobile) */}
        <aside
          className={`absolute md:relative bg-white border rounded-lg border-gray-400 p-4 w-64 md:w-1/5 transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-[110%]"
          } md:translate-x-0 md:block`}
        >
          <ul className="space-y-2">
            {policies.map(({ id, title }) => (
              <li key={id}>
                <Link
                  href={`/policies/${id}`}
                  className={`block px-3 py-2 text-sm rounded-md text-gray-700  ${
                    policyID === id ? "bg-primary text-white font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 rounded-lg border border-gray-400">
          <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
            {policies.find((p) => p.id === policyID)?.title || "Policy"}
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            {policyContent[policyID as string] || "Select a policy from the menu."}
          </p>
        </main>
      </div>
    </div>
  );
};

export default PolicyPage;

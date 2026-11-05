import type { Metadata } from "next";
import ContactInquiryForm from "@/components/contact/ContactInquiryForm";
import ContactBookingPanel from "@/components/contact/ContactBookingPanel";

export const metadata: Metadata = {
  title: "Contact Us — 21Spheres",
  description: "Tell 21Spheres about your project, question, or opportunity.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#f7f7f8] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-5">
      <div className="mx-auto grid max-w-[1480px] gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
        <ContactInquiryForm />
        <ContactBookingPanel />
      </div>
    </main>
  );
}

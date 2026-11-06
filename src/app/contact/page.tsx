// Inquiry form is switched off for now. To bring it back, restore this import and the form below,
// and put back "gap-6 lg:grid-cols-2 lg:gap-8" on the grid.
// import ContactInquiryForm from "@/components/contact/ContactInquiryForm";
import ContactBookingPanel from "@/components/contact/ContactBookingPanel";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Tell 21 Spheres about your project, question or opportunity, or book a time to talk it through with the team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-[#f7f7f8] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-5">
      <div className="mx-auto grid max-w-[1480px] lg:min-h-[calc(100svh-5.5rem)] lg:items-stretch">
        {/* <ContactInquiryForm /> */}
        <ContactBookingPanel />
      </div>
    </div>
  );
}

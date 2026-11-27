/** Public company facts, as listed on 21spheres.com. */
export const COMPANY_SOCIALS = {
  linkedin: "https://www.linkedin.com/company/21spheres",
  instagram: "https://instagram.com/21_spheres",
  x: "https://x.com/21Spheres",
  facebook: "https://www.facebook.com/profile.php?id=61570321127336",
};

/** Contact details. The footer and the chat assistant both read these. */
export const COMPANY_EMAIL = "info@21spheres.com";
export const COMPANY_PHONE = {
  label: "+91 97247 80021",
  href: "tel:+919724780021",
  whatsappHref: "https://wa.me/919724780021",
};
export const COMPANY_ADDRESSES = [
  { label: "Office", value: "Ahmedabad, Gujarat" },
  // Four lines, broken at the address's own phrases so they come out about the same length.
  { label: "Registered office (R.O.)", value: "171 & 172, Shivam, Main Bazzar,\nNear Suparshav Jain Derasar,\nBhuj-Nakhatrana Road, Nakhatrana,\nKutch, Gujarat - 370615" },
] as const;
/** Shown with the addresses. */
export const COMPANY_GSTIN = "24FIFPB9060K1Z6";
/** Trademark application number, shown under the copyright line. */
export const COMPANY_TM_APPLICATION = "7352610";
/** Availability and bookings are managed in Google Calendar. This is the live schedule. */
export const COMPANY_BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ08BaXRCtnGSSZM8qLs5VTV1lhd5j9wOkiBRFFAD8_93kF6yVHFyT8qgGORaV43Mzfm6CMr5Xmo?gv=true";

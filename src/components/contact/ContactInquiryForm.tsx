"use client";

import { useState } from "react";
import { PillArrow, pillClassName } from "@/components/ui/PillLink";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-xl border border-[#c9c9cc] bg-white px-3.5 text-sm text-[#202026] outline-none transition placeholder:text-[#929297] focus:border-[#7057D9] focus:ring-2 focus:ring-[#7057D9]/15";
const labelClass = "block text-sm leading-5 text-[#626268]";

function RequiredMark() {
  return <span className="ml-1 text-[#d62f3c]" aria-hidden="true">*</span>;
}

export default function ContactInquiryForm() {
  const [goal, setGoal] = useState("");

  return (
    <div className="flex w-full flex-col rounded-[22px] bg-white px-6 py-7 shadow-[0_18px_55px_rgba(28,25,37,0.1)] sm:px-8 sm:py-8 lg:h-full lg:px-8 lg:py-8">
      <h1 className="text-[26px] font-light leading-tight tracking-[-0.025em] text-[#19191c] sm:text-[32px]">
        Tell us how we can help you
      </h1>

      <form className="mt-6 space-y-4 sm:space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label className={labelClass} htmlFor="contact-goal">Your Challenge/Goal<RequiredMark /></label>
          <textarea
            id="contact-goal"
            name="goal"
            required
            maxLength={300}
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            className="mt-1.5 block min-h-[57px] w-full resize-y rounded-xl border border-[#c9c9cc] bg-white px-3.5 py-3 text-sm text-[#202026] outline-none transition placeholder:text-[#929297] focus:border-[#7057D9] focus:ring-2 focus:ring-[#7057D9]/15"
          />
          <p className="mt-1 text-right text-xs text-[#77777d]" aria-live="polite">{goal.length}/300</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label className={labelClass} htmlFor="first-name">First Name<RequiredMark /></label>
            <input className={fieldClass} id="first-name" name="firstName" autoComplete="given-name" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="last-name">Last Name<RequiredMark /></label>
            <input className={fieldClass} id="last-name" name="lastName" autoComplete="family-name" required />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="email">E-Mail<RequiredMark /></label>
          <input className={fieldClass} id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label className={labelClass} htmlFor="company">Company</label>
            <input className={fieldClass} id="company" name="company" autoComplete="organization" />
          </div>
          <div>
            <label className={labelClass} htmlFor="country">Country<RequiredMark /></label>
            <select className={`${fieldClass} text-[#77777d]`} id="country" name="country" autoComplete="country-name" required defaultValue="">
              <option value="" disabled>Select a country</option>
              {["Australia", "Canada", "India", "United Kingdom", "United States", "Other"].map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label className={labelClass} htmlFor="job-title">Job Title</label>
            <input className={fieldClass} id="job-title" name="jobTitle" autoComplete="organization-title" />
          </div>
          <div>
            <label className={labelClass} htmlFor="company-size">Company Size</label>
            <select className={fieldClass} id="company-size" name="companySize" defaultValue="">
              <option value="">- None -</option>
              {["1–10", "11–50", "51–200", "201–1,000", "1,001+"].map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="industry">Industry<RequiredMark /></label>
          <select className={`${fieldClass} text-[#77777d]`} id="industry" name="industry" required defaultValue="">
            <option value="" disabled>Choose an industry</option>
            {["Technology", "Financial services", "Healthcare", "Retail & commerce", "Education", "Manufacturing", "Other"].map((industry) => <option key={industry} value={industry}>{industry}</option>)}
          </select>
        </div>

        <div className="space-y-3 pt-1 text-[13px] leading-5 text-[#515157] sm:text-sm">
          <label className="flex cursor-pointer items-start gap-2.5">
            <input className="mt-1 h-4 w-4 shrink-0 accent-[#7057D9]" type="checkbox" name="communicationsOptIn" />
            <span>I would like to receive 21Spheres updates, useful resources, and occasional product insights by email.</span>
          </label>
          <p>By submitting this form, you agree to our <span className="font-semibold text-[#34343a]">Privacy Policy</span>.</p>
          <p>Your information will only be used to respond to your inquiry.</p>
        </div>

        <button type="submit" className={`group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E79E8] ${pillClassName()}`}>
          Submit
          <PillArrow />
        </button>
      </form>
    </div>
  );
}

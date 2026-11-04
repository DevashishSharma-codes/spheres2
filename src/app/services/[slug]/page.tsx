import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { SERVICES_CONTENT } from "@/content/services";
import { SERVICE_DETAILS } from "@/content/serviceDetails";

export function generateStaticParams() {
  return SERVICES_CONTENT.services.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const detail = SERVICE_DETAILS[slug];
  if (!detail) return { title: "Services — 21Spheres" };
  return { title: `${detail.heroTitle} — 21Spheres`, description: detail.lead };
}

async function ServiceContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_CONTENT.services.find(({ id }) => id === slug);
  const detail = SERVICE_DETAILS[slug];
  if (!service || !detail) notFound();

  return <ServiceDetailView service={service} detail={detail} />;
}

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    // Dark placeholder so a navigation paints the page background instantly.
    <Suspense fallback={<div className="min-h-screen bg-[#0A0910]" />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

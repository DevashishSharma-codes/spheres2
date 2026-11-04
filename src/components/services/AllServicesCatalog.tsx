"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FolderTabCard } from "@/components/ui/FolderTabCard";
import { ServiceItem } from "@/types";
import { 
  Smartphone, 
  Globe, 
  Cpu, 
  Sparkles, 
  MessageSquare, 
  Workflow, 
  Layout, 
  Rocket, 
  Building2, 
  Terminal,
} from "lucide-react";

interface AllServicesCatalogProps {
  services: ServiceItem[];
}

const SERVICE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  Globe,
  Cpu,
  Sparkles,
  MessageSquareCode: MessageSquare,
  Workflow,
  Layout,
  Rocket,
  Building2,
  Terminal,
};

export function AllServicesCatalog({ services }: AllServicesCatalogProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI & Intelligence", "Web & Platforms", "Mobile & Devices", "Enterprise & Cloud"];
  const filteredServices = selectedCategory === "All"
    ? services
    : services.filter((service) => {
        if (selectedCategory === "AI & Intelligence") {
          return service.id.includes("ai") || service.id.includes("llm") || service.id.includes("chatbot");
        }
        if (selectedCategory === "Web & Platforms") {
          return service.id.includes("web") || service.id.includes("website") || service.id.includes("saas");
        }
        if (selectedCategory === "Mobile & Devices") return service.id.includes("mobile");
        if (selectedCategory === "Enterprise & Cloud") {
          return service.id.includes("enterprise") || service.id.includes("workflow") || service.id.includes("custom-software");
        }
        return true;
      });

  return (
    <section 
      id="all-services" 
      className="relative z-10 overflow-hidden bg-transparent pt-2 pb-12 text-[#24232A] sm:pb-16"
    >
      <Container wide>
        <nav aria-label="Filter services by category" className="mb-4 flex gap-6 overflow-x-auto overflow-y-hidden [scrollbar-width:none] border-b border-[#E7E5EB] sm:gap-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              className={`relative shrink-0 py-2.5 text-[12px] font-medium transition-colors sm:text-[13px] ${
                selectedCategory === category
                  ? "text-[#6248CA]"
                  : "text-[#777680] hover:text-[#302A43]"
              }`}
            >
              {category}
              {selectedCategory === category && (
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-[#7057D9]" />
              )}
            </button>
          ))}
        </nav>
        <div 
          className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4"
          onMouseLeave={() => setHoveredId(null)}
        >
          {filteredServices.map((service) => {
            const isHovered = hoveredId === service.id;

            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{
                  scale: isHovered ? 1.02 : 1,
                  y: isHovered ? -6 : 0,
                  zIndex: isHovered ? 20 : 1,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 26,
                }}
                onMouseEnter={() => setHoveredId(service.id)}
                className="relative"
              >
                <FolderTabCard
                  id={service.id}
                  number={service.number}
                  category={service.category}
                  title={service.title}
                  description={service.description || service.headline}
                  image={service.cardImage}
                  imagePosition={service.cardImagePosition}
                  icon={SERVICE_ICON_MAP[service.icon || "Cpu"] || Cpu}
                  href={`/services/${service.id}`}
                />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

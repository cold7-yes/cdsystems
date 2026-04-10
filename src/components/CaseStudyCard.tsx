"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { CaseStudy } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";

const TAG_COLORS: Record<string, string> = {
  n8n: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  make: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  zapier: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  openai: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  anthropic: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  slack: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  airtable: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  hubspot: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  shopify: "bg-green-500/10 text-green-400 border-green-500/20",
  notion: "bg-stone-500/10 text-stone-400 border-stone-500/20",
  gmail: "bg-red-500/10 text-red-400 border-red-500/20",
  quickbooks: "bg-green-500/10 text-green-400 border-green-500/20",
  outlook: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  microsoft: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  excel: "bg-green-500/10 text-green-400 border-green-500/20",
  default: "bg-neutral-800 text-neutral-300 border-neutral-700",
};

function getTagColor(tool: string): string {
  const key = tool.toLowerCase().replace(/\s+/g, "");
  for (const [k, v] of Object.entries(TAG_COLORS)) {
    if (key.includes(k)) return v;
  }
  return TAG_COLORS.default;
}

interface Props {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: Props) {
  const [hovered, setHovered] = useState(false);

  const thumb = caseStudy.thumbnail?.asset
    ? urlFor(caseStudy.thumbnail).width(1200).height(600).fit("crop").url()
    : null;

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300"
      style={{
        background: "rgba(23,23,23,0.6)",
        backdropFilter: "blur(8px)",
        borderColor: hovered ? "rgba(255,255,255,0.2)" : "rgba(38,38,38,1)",
        boxShadow: hovered ? "0 0 40px -10px rgba(255,255,255,0.05)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      {thumb && (
        <div className="relative aspect-[2/1] w-full overflow-hidden bg-neutral-900">
          <Image
            src={thumb}
            alt={caseStudy.thumbnail?.alt ?? caseStudy.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-grow flex-col p-6">
        {/* Status badge */}
        {caseStudy.status && (
          <div className="mb-3">
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                caseStudy.status === "live"
                  ? "bg-green-500/10 text-green-400"
                  : caseStudy.status === "in progress"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-blue-500/10 text-blue-400"
              }`}
            >
              {caseStudy.status}
            </span>
          </div>
        )}

        {/* Result headline */}
        <h3 className="mb-2 text-lg font-medium tracking-tight text-white">
          {caseStudy.result}
        </h3>

        {/* Industry */}
        {caseStudy.industry && (
          <p className="mb-4 text-sm text-neutral-500">{caseStudy.industry}</p>
        )}

        {/* Tool tags */}
        {caseStudy.toolsUsed && caseStudy.toolsUsed.length > 0 && (
          <div className="mt-auto border-t border-neutral-800 pt-4">
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className={`rounded-md border px-2 py-0.5 text-xs font-medium ${getTagColor(tool)}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* View link */}
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-neutral-500 transition-colors group-hover:text-white">
          View case study
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12h14m-7-7l7 7l-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

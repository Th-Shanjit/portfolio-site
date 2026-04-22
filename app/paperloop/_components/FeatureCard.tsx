'use client';

import React from 'react';

export type FeatureCardProps = {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  body: string;
  tag: string;
};

export default function FeatureCard({ icon, iconBg, title, body, tag }: FeatureCardProps) {
  return (
    <div className="pl-reveal bg-white border border-[#DDD7CB] rounded-2xl p-6 md:p-7">
      <div className={`w-11 h-11 rounded-[10px] ${iconBg} flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <h3 className="font-serif font-semibold text-[20px] text-[#0B1825] mb-2 leading-tight">
        {title}
      </h3>
      <p className="font-sans text-[14px] text-[#0B1825]/65 leading-[1.65] m-0">{body}</p>
      <span className="inline-flex items-center mt-4 font-mono text-[10px] tracking-[0.12em] uppercase text-[#0B1825]/55 bg-[#0B1825]/[0.04] rounded-full px-2.5 py-1">
        {tag}
      </span>
    </div>
  );
}

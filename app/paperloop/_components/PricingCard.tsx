'use client';

export type PricingCardProps = {
  name: string;
  tokens: string;
  unit: string;
  price: string;
  strike: string;
  perScan: string;
  save: string;
  featured?: boolean;
};

export default function PricingCard({
  name,
  tokens,
  unit,
  price,
  strike,
  perScan,
  save,
  featured = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative pl-reveal rounded-2xl p-7 md:p-8 border ${
        featured
          ? 'bg-[#0B1825] text-[#EDE8DB] border-[#0B1825] shadow-[0_20px_60px_rgba(11,24,37,0.15)]'
          : 'bg-white text-[#0B1825] border-[#DDD7CB]'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-6 bg-[#CF8610] text-white font-mono text-[9px] tracking-[0.15em] uppercase rounded-full px-3 py-1">
          Most Popular
        </span>
      )}
      <div className="flex flex-col items-center text-center">
        <span
          className={`font-mono text-[11px] tracking-[0.15em] uppercase mb-4 ${
            featured ? 'text-[#F0A535]' : 'text-[#CF8610]'
          }`}
        >
          {name}
        </span>
        <span className="font-serif font-bold text-[64px] md:text-[72px] leading-none tracking-[-0.02em] mb-1">
          {tokens}
        </span>
        <span
          className={`font-mono text-[11px] tracking-[0.14em] uppercase mb-5 ${
            featured ? 'text-[#EDE8DB]/50' : 'text-[#0B1825]/50'
          }`}
        >
          {unit}
        </span>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-serif font-bold text-[32px]">{price}</span>
          <span
            className={`font-sans text-[14px] line-through ${
              featured ? 'text-[#EDE8DB]/40' : 'text-[#0B1825]/40'
            }`}
          >
            {strike}
          </span>
        </div>
        <span
          className={`font-sans text-[12px] ${
            featured ? 'text-[#EDE8DB]/55' : 'text-[#0B1825]/55'
          }`}
        >
          {perScan}
        </span>

        <span className="inline-flex items-center mt-4 font-mono text-[10px] tracking-[0.12em] uppercase font-semibold text-[#0B7A70] bg-[#0B7A70]/10 rounded-full px-3 py-1">
          {save}
        </span>
      </div>
    </div>
  );
}

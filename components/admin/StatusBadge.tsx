type Props = {
  published?: boolean;
  label?: string;
};

export default function StatusBadge({ published, label }: Props) {
  const isLive = published === true;
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-sans text-[12px] font-medium px-2 py-0.5 rounded-full border ${
        isLive
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-[#F0EBE0] text-[#6F6A61] border-[rgba(22,22,22,0.08)]'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-[#9A9489]'}`}
        aria-hidden
      />
      {label ?? (isLive ? 'Published' : 'Draft')}
    </span>
  );
}

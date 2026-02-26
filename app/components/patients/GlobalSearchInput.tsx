type Props = {
    value: string;
    onChange: (v: string) => void;
  };
  
  export function GlobalSearchInput({ value, onChange }: Props) {
    return (
      <div className="w-full sm:max-w-md">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search name / phone / pet..."
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>
    );
  }
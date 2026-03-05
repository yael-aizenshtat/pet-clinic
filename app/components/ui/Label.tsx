export default function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  );
}
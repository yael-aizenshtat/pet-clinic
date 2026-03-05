import type { LucideIcon } from "lucide-react";
import Label from "./Label";

export default function Field({
  label,
  htmlFor,
  icon: Icon,
  children,
}: {
  label: string;
  htmlFor?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
    return (
      <div className="space-y-1.5">
        <Label htmlFor={htmlFor}>
        {Icon && <Icon className="w-4 h-4 text-gray-500" />}
        {label}
        </Label>
        {children}
      </div>
    );
  }
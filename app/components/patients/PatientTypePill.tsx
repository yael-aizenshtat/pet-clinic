import { cn } from "~/lib/utils";
import type { PetType } from "~/schemas/patient.schema";

const petConfig = {
  Dog: {
    emoji: '🐶',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200'
  },
  Cat: {
    emoji: '🐱',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200'
  },
  Parrot: {
    emoji: '🦜',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200'
  }
};

export function PatientTypePill({ type }: { type: PetType }) {
  const config = petConfig[type] || petConfig.Dog;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border font-medium text-sm px-2.5 py-1",
      config.bgColor,
      config.textColor,
      config.borderColor
    )}>
      <span className="text-base">{config.emoji}</span>
      <span>{type}</span>
    </span>
  );
}
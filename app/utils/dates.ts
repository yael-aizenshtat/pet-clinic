import { differenceInYears, differenceInMonths, parseISO } from "date-fns";

export function calcAgeFromBirthDate(birthDate: string): string {
    if (!birthDate) return 'Unknown';
    const birth = typeof birthDate === 'string' ? parseISO(birthDate) : new Date(birthDate);
    const now = new Date();
    const years = differenceInYears(now, birth);
    const months = differenceInMonths(now, birth) % 12;
    if (years === 0) return months === 1 ? '1 month' : `${months} months`;
    if (months === 0) return years === 1 ? '1 year' : `${years} years`;
    return `${years === 1 ? '1 year' : `${years} years`}, ${months === 1 ? '1 month' : `${months} months`}`;
  }
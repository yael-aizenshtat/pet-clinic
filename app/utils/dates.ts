export function calcAgeFromBirthDate(isoDate: string): number {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return 0;
  
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
    return Math.max(age, 0);
  }
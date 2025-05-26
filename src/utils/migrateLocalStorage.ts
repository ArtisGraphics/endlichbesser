import { Finanzbewegung } from "@/types/finanzbewegung";

export function migrateFinanzbewegungen(): Finanzbewegung[] | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem("finanzbewegungen");
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return null;
    
    // Migrate old format to new format
    return parsed.map((item: any) => ({
      title: item.title || "Unbekannt",
      menge: item.menge || 0,
      interval: item.interval || "monatlich",
      endDate: item.endDate ? new Date(item.endDate) : undefined,
      kuendigungsfrist: item.kuendigungsfrist || undefined,
    }));
  } catch (error) {
    console.warn("Error migrating localStorage data:", error);
    return null;
  }
}

export function clearFinanzbewegungen(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("finanzbewegungen");
  }
} 
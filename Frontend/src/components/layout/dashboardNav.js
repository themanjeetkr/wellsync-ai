import { BookOpen, CreditCard, LayoutDashboard, Settings, Sparkles, Utensils } from "lucide-react";

export const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/journals", icon: BookOpen, label: "Journals" },
  { to: "/insights", icon: Sparkles, label: "Insights" },
  { to: "/nutrition", icon: Utensils, label: "Nutrition & Meal Analyzer", shortLabel: "Nutrition" },
  { to: "/billing", icon: CreditCard, label: "Billing", shortLabel: "Billing" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

import {
  GraduationCap,
  Stethoscope,
  Landmark,
  Shield,
  Gavel,
} from "lucide-react";
import { InstitutionCategory } from "@/app/types";

export const institutionCategories: Record<
  InstitutionCategory,
  {
    label: string;
    icon: React.ComponentType<any>;
    colorClass: string;
  }
> = {
  education: {
    label: "Éducation",
    icon: GraduationCap,
    colorClass: "text-emerald-600",
  },
  sante: {
    label: "Santé",
    icon: Stethoscope,
    colorClass: "text-red-500",
  },
  administration: {
    label: "Administration",
    icon: Landmark,
    colorClass: "text-blue-500",
  },
  security: {
    label: "Sécurité",
    icon: Shield,
    colorClass: "text-yellow-500",
  },
  justice: {
    label: "Justice",
    icon: Gavel,
    colorClass: "text-purple-500",
  },
};
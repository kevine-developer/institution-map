import { AlertCircle, CheckCircle } from "lucide-react";

interface StatusCardProps {
  status?: string | undefined;
}

function StatusCard({ status }: StatusCardProps) {
  const isOpen = status === "ouvert";

  return (
    <div
      className={`h-8  gap-2 px-2 rounded-xl font-medium text-sm shadow-sm ${
        isOpen
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      <span className=" h-8 flex items-center gap-2  ">  
        <strong>Status de l'etablissement:</strong>
        {isOpen ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
        {isOpen ? "Actif" : "Inactif"}
      </span>
    </div>
  );
}
export default StatusCard;

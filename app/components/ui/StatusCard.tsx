import { AlertCircle, CheckCircle } from "lucide-react";

interface StatusCardProps {
  status?: string | undefined;
}

function StatusCard( { status }: StatusCardProps ) {
  const isOpen = status === "ouvert";

  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm shadow-sm ${
        isOpen
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      {isOpen ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {isOpen ? "Actif" : "Inactif"}
    </div>
  );
};
export default StatusCard
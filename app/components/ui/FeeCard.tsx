interface FeeProps {
  fee: {
    level: string;
    amount: number;
    currency: string;
    description?: string;
  };
}

export default function FeeCard({ fee }: FeeProps) {
  return (
     <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold text-gray-900">{fee.level}</span>
      <span className="text-lg font-bold text-blue-600">
        {new Intl.NumberFormat('fr-MG', { 
          style: 'currency', 
          currency: fee.currency 
        }).format(fee.amount)}
      </span>
    </div>
    {fee.description && (
      <p className="text-sm text-gray-600">{fee.description}</p>
    )}
  </div>
  )
}

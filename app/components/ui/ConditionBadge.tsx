import { Building2 } from 'lucide-react';

interface ConditionBadgeProps {
  condition?: string;
}
function ConditionBadge({ condition }: ConditionBadgeProps) {


  const getConditionStyle = () => {
    switch (condition?.toLowerCase()) {
      case 'bon':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'moyen':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'mauvais':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`flex items-center gap-2 px-1  rounded-xl font-medium text-sm shadow-sm border ${getConditionStyle()}`}>
      <Building2 size={16} />
      <p> État: {condition || 'Non spécifié'}</p>
    </div>
  );
};
export default ConditionBadge

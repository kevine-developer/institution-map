import React from 'react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'minimal';
  icon?: React.ReactNode;
}

function InfoCard({ title, children, variant = 'default', icon }: InfoCardProps) {
  const getCardStyles = () => {
    const baseStyles = "bg-white rounded-2xl transition-all duration-300 ease-out border";
    
    switch (variant) {
      case 'elevated':
        return `${baseStyles} shadow-lg hover:shadow-xl border-gray-100/50 backdrop-blur-sm`;
      case 'minimal':
        return `${baseStyles} border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md`;
      default:
        return `${baseStyles} border-gray-100/70 shadow-sm hover:shadow-md hover:border-gray-200/80`;
    }
  };

  const getTitleStyles = () => {
    return "text-gray-900 font-semibold text-base tracking-tight";
  };

  return (
    <section className={getCardStyles()}>
      {/* Header avec ligne décorative */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-50/80">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
              <div className="text-emerald-600">
                {icon}
              </div>
            </div>
          )}
          <h3 className={getTitleStyles()}>
            {title}
          </h3>
        </div>
        {/* Ligne décorative subtile */}
        <div className="mt-3 h-px bg-gradient-to-r from-emerald-200 via-emerald-100 to-transparent opacity-60"></div>
      </div>

      {/* Contenu */}
      <div className="px-5 py-4">
        {children}
      </div>
    </section>
  );
}

export default InfoCard;
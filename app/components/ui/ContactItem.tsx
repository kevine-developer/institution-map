import { Globe } from 'lucide-react';
import Link from 'next/link'

interface ContactItemProps {
    href: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    external?: boolean;
  

}

function ContactItem({ href, label, description, icon, external = false }: ContactItemProps) {
  return (
    <Link
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors group"
    aria-label={`${description}: ${label}`}
  >
    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
        {label}
      </div>
      <div className="text-sm text-gray-500 mt-0.5">{description}</div>
    </div>
    {external && (
      <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
        <Globe size={16} />
      </div>
    )}
  </Link>
  )
}

export default ContactItem




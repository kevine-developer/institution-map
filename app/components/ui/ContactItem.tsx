import { Globe } from 'lucide-react';
import Link from 'next/link'

interface ContactItemProps {
    href: string;
    label: string;
    description?: string;
    icon: React.ReactNode;
    external?: boolean;
  

}

function ContactItem({ href, label, description, icon, external = false }: ContactItemProps) {
  return (
    <Link
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="flex items-start gap-3 p-2 rounded-lg hover:bg-emerald-50  transition-colors group"
    aria-label={`${description}: ${label}`}
  >
    <span className="p-2 bg-blue-50 rounded-lg text-emerald-600 group-hover:bg-emerald-100 transition-colors">
      {icon}
    </span>
    <div className="flex-1 ">
      <p className="group-hover:text-emerald-600 transition-colors truncate">
        {label}
      </p>
      <div className="text-sm mt-0.5">{description}</div>
    </div>
    {external && (
      <span className=" group-hover:text-emerald-500 transition-colors">
        <Globe size={14} />
      </span>
    )}
  </Link>
  )
}

export default ContactItem




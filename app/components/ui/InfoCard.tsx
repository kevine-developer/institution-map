interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}


function InfoCard({ icon, title, children }: InfoCardProps) {
  return (
     <section className="bg-background text-foreground rounded-xl p-2 shadow-sm ">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-blue-50 rounded-lg text-emerald-600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold ">{title}</h3>
    </div>
    {children}
  </section>
  )
}

export default InfoCard


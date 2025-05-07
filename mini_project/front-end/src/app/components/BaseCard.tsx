interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function BaseCard({ children, className = "" }: CardProps) {
  return (
    <div
      className={`shadow-xl shadow-cyan-500/10 relative bg-[#1e1e1e] rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-cyan-500/10 mb-8 p-6 ${className}`}
    >
      {children}
    </div>
  );
}

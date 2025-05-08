"use client";
export interface PhindojoTextProps {
  className?: string;
}

export default function PhindojoText({ className }: PhindojoTextProps) {
  return (
    <div className={className}>
      <span className="text-green-500">
        Phin<span className="text-cyber">Dojo</span>
      </span>
    </div>
  );
}

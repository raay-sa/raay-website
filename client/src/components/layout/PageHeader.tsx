import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="py-10 text-center text-white">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {description && <p className="text-lg opacity-90 max-w-3xl mx-auto">{description}</p>}
    </div>
  );
}
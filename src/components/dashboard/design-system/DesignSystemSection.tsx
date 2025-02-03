import React from 'react';

interface DesignSystemSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const DesignSystemSection = ({
  title,
  description,
  children,
  className = ''
}: DesignSystemSectionProps) => {
  return (
    <section className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold font-bricolage">{title}</h2>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
};
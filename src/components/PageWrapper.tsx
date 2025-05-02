import React, { ReactNode } from 'react';
import SpaceCursor from './SpaceCursor'; 

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const HEADER_HEIGHT = 80; // Header height

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full ${className}`} style={{ paddingTop: `${HEADER_HEIGHT}px` }}>
      <SpaceCursor />
      {children}
    </div>
  );
};

export default PageWrapper;
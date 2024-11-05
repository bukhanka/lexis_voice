import { ReactNode } from "react";
import { SalesSidebar } from "./sales-sidebar";

interface SalesSimulatorLayoutProps {
  children: ReactNode;
  clientId?: string;
}

export function SalesSimulatorLayout({
  children,
  clientId,
}: SalesSimulatorLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-grow">
        <SalesSidebar />
        <div className="flex-grow bg-[#F8F9FE]">
          {children}
        </div>
      </div>
    </div>
  );
} 
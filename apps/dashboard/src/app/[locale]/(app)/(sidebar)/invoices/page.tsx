// import { EmptyStateInvoice } from "@/components/empty-state-invoice";
import InteractiveChart from "@/components/interactive-chart";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoices | Midday",
};

export default function Invoices() {
  return <InteractiveChart />;
}

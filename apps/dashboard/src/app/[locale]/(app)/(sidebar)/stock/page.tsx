// import { EmptyStateInvoice } from "@/components/empty-state-invoice";

import StockChart from "@/components/stock-chart";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoices | Midday",
};

export default function Invoices() {
  return <StockChart />;
}

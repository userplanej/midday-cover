// import { EmptyStateInvoice } from "@/components/empty-state-invoice";



import GelatinousCube3D from "@/components/gelatinouscube";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notion | Midday",
};

export default function Notions() {
  console.log(" Notion section -- server")
  return <GelatinousCube3D />;
}

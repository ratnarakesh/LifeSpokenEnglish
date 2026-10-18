import type { Metadata } from "next";
import { AdminClient } from "@/components/admin/AdminClient";

export const metadata: Metadata = {
  title: "Mani\u00A0Sir Control Panel | LIFE Spoken English",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}

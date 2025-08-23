import { Section } from "@/components/section";
import AdminDonationsClient from "./table";

export const metadata = { title: "Admin – Donations" };

export default function AdminDonationsPage() {
  return (
    <main>
      <Section
        eyebrow="Admin"
        title="Donations"
        subtitle="Review submissions and award points."
      >
        <AdminDonationsClient />
      </Section>
    </main>
  );
}

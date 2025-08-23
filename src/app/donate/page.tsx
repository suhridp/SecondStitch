import { Section } from "@/components/section";
import DonateClient from "./donate-client";

export const metadata = {
  title: "Donate for Upcycling – Second Stitch",
  description: "Send garments for upcycling and earn points you can redeem.",
};

export default function DonatePage() {
  return (
    <main>
      <Section
        eyebrow="Donate"
        title="Give garments a second life"
        subtitle="Tell us about your garments. We’ll estimate points now and confirm after review."
      >
        <DonateClient />
      </Section>
    </main>
  );
}

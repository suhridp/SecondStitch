import { Section } from "@/components/section";
import DonateClient from "./donate-client";

export const metadata = {
  title: "Donate for Upcycling – Second Stitch",
  description:
    "Send old clothes for upcycling and earn points you can redeem on your next purchase.",
};

export default function DonatePage() {
  return (
    <main>
      <Section
        eyebrow="Donate"
        title="Give garments a second life"
        subtitle="Send us your old clothes for upcycling. Earn points you can redeem at checkout."
      >
        <DonateClient />
      </Section>
    </main>
  );
}

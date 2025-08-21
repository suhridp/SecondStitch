import { Section } from "@/components/section";
import CommunityClient from "./community-client";

export const metadata = {
  title: "Community – Second Stitch",
  description:
    "Share looks, care tips, upcycling ideas, and swaps. Join the Second Stitch community.",
};

export default function CommunityPage() {
  return (
    <main>
      <Section
        eyebrow="Community"
        title="Share, learn, and connect"
        subtitle="Looks, care tips, upcycling ideas, and swaps. Join the conversation."
      >
        {/* Client logic lives inside this wrapper */}
        <CommunityClient />
      </Section>
    </main>
  );
}

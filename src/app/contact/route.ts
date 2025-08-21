import { NextResponse } from "next/server";


export async function POST(req: Request) {
const form = await req.formData();
console.log("Contact lead:", Object.fromEntries(form.entries()));
return NextResponse.json({ ok: true });
}


// ---------------------------------------------------------------
// FILE: src/lib/utils.ts (helper)



// ---------------------------------------------------------------
// FILE: src/app/sitemap.ts (SEO)
export default function sitemap() {
const base = "https://secondstitch.example.com";
return [
{ url: `${base}/`, lastModified: new Date() },
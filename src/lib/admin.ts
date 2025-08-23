export const ADMIN_EMAILS = ["you@brand.com", "cofounder@brand.com"];

export function isAdmin(email?: string | null) {
  return !!email && ADMIN_EMAILS.includes(email);
}

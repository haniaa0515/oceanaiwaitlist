import { z } from "zod";

/**
 * Strict email validation for waitlist signups.
 * - RFC 5322 compliant format
 * - Length limits to prevent abuse
 * - Trimmed and lowercased for consistency
 */
const EMAIL_MAX_LENGTH = 254;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(EMAIL_MAX_LENGTH, "Email is too long")
    .trim()
    .toLowerCase()
    .regex(EMAIL_REGEX, "Please enter a valid email address"),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

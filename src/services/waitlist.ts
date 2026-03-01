import type { WaitlistFormData } from "@/schemas/waitlist";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeelwzvb";

export type WaitlistResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Submits email to Formspree waitlist.
 * No redirect, no popup - user stays on page.
 */
export async function submitWaitlistEmail(
  data: WaitlistFormData
): Promise<WaitlistResult> {
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[Waitlist] Formspree error:", err);
      return {
        success: false,
        error: "Something went wrong. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[Waitlist] Unexpected error:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

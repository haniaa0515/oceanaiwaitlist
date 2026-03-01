import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { waitlistSchema, type WaitlistFormData } from "@/schemas/waitlist";
import { submitWaitlistEmail } from "@/services/waitlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export function WaitlistForm() {
  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    const result = await submitWaitlistEmail(data);

    if (result.success) {
      toast.success("You're on the list! We'll be in touch.");
      form.reset();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:items-start"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="min-w-0 flex-1 space-y-2">
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  disabled={form.formState.isSubmitting}
                  className="h-11 rounded-lg border border-input bg-secondary px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="h-11 shrink-0 rounded-lg px-6"
        >
          {form.formState.isSubmitting ? "Joining…" : "Join the Waitlist"}
        </Button>
      </form>
    </Form>
  );
}

import { motion } from "framer-motion";
import RetroCat from "@/components/RetroCat";
import { WaitlistForm } from "@/components/WaitlistForm";

const GLOW_STYLES = [
  {
    className: "animate-glow-drift",
    style: {
      width: "120%",
      height: "120%",
      top: "-10%",
      left: "-10%",
      background:
        "radial-gradient(ellipse 50% 40% at 50% 50%, hsl(195 100% 20% / 0.5), transparent 70%)",
    },
  },
  {
    className: "animate-glow-drift-2",
    style: {
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      background:
        "radial-gradient(ellipse 35% 30% at 60% 55%, hsl(180 80% 30% / 0.35), transparent 65%)",
    },
  },
  {
    className: "animate-glow-drift-3",
    style: {
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      background:
        "radial-gradient(ellipse 30% 25% at 35% 40%, hsl(200 90% 15% / 0.4), transparent 60%)",
    },
  },
] as const;

const Index = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <RetroCat />

      {GLOW_STYLES.map(({ className, style }, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute ${className}`}
          style={style}
        />
      ))}

      <motion.div
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
          <span className="font-headline">AI Agent That Actually</span>
          <br />
          <span className="font-sub italic font-normal">works for you.</span>
        </h1>

        <p className="mt-5 max-w-md font-sub text-lg italic text-muted-foreground sm:text-xl">
          Sign up now and be the first to vibe code your app screens…once it's
          ready for you.
        </p>

        <WaitlistForm />
      </motion.div>
    </div>
  );
};

export default Index;

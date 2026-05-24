import { useLang } from "@/hooks/useLang";
import { LangToggle } from "@/components/LangToggle";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { saveAuth } from "@/lib/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSettings } from "@/hooks/useSettings";

const signupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const { t } = useLang();
  const { settings } = useSettings();
  const [, setLocation] = useLocation();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    saveAuth(values.email, values.name);
    setLocation("/profiles");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-rose-950 via-black to-purple-950 opacity-50" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <header className="relative z-10 px-6 md:px-12 py-5 flex justify-between items-center">
        <Link href="/">
          <span
            className="text-3xl font-extrabold text-primary tracking-tight cursor-pointer hover:text-red-400 transition-colors"
            data-testid="link-logo-signup"
          >
            {settings.siteTitle}
          </span>
        </Link>
        <LangToggle />
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-black/80 p-10 md:p-12 rounded shadow-2xl border border-white/10 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-8">{t("auth.signup")}</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t("auth.name")}
                        className="bg-zinc-800 border border-zinc-700 text-white h-12 text-base rounded focus-visible:ring-1 focus-visible:ring-white/40 placeholder:text-zinc-400"
                        data-testid="input-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t("auth.email")}
                        className="bg-zinc-800 border border-zinc-700 text-white h-12 text-base rounded focus-visible:ring-1 focus-visible:ring-white/40 placeholder:text-zinc-400"
                        data-testid="input-email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("auth.password")}
                        className="bg-zinc-800 border border-zinc-700 text-white h-12 text-base rounded focus-visible:ring-1 focus-visible:ring-white/40 placeholder:text-zinc-400"
                        data-testid="input-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("auth.confirmPassword")}
                        className="bg-zinc-800 border border-zinc-700 text-white h-12 text-base rounded focus-visible:ring-1 focus-visible:ring-white/40 placeholder:text-zinc-400"
                        data-testid="input-confirm-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-red-700 text-white font-bold h-12 text-base rounded transition-colors cursor-pointer mt-2"
                data-testid="button-signup-submit"
              >
                {t("auth.signup")}
              </button>
            </form>
          </Form>

          <div className="mt-8 text-zinc-400 text-sm">
            {t("auth.already")}{" "}
            <Link href="/signin">
              <span className="text-white hover:underline cursor-pointer" data-testid="link-signin">
                {t("auth.signinNow")}
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

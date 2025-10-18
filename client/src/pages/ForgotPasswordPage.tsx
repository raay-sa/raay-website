import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowRight } from "lucide-react";
import { postSendOtp } from "@/lib/api/auth";
import { HttpError } from "@/lib/api/http";
import { setOtpSession } from "@/lib/otpSession";

// Schema for email validation
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

function flattenErrors(errors?: Record<string, string[] | string>): string[] {
  const out: string[] = [];
  for (const v of Object.values(errors || {})) {
    if (Array.isArray(v)) out.push(...v);
    else if (v != null) out.push(String(v));
  }
  return out;
}

export default function ForgotPasswordPage() {
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setIsSubmitting(true);
    try {
      // Send OTP for password reset
      await postSendOtp({ 
        email: values.email, 
        auth_method: "forgot_password" as any // We'll need to update the API to support this
      });

      // Store session for OTP verification
      setOtpSession({ 
        email: values.email, 
        method: "forgot_password" as any 
      });

      toast({
        title: "تحقق من بريدك",
        description: "أرسلنا رمز التحقق لإعادة تعيين كلمة المرور.",
        variant: "default",
      });

      navigate("/otp");
    } catch (err) {
      let description = "تعذر إرسال رمز التحقق";
      if (err instanceof HttpError) {
        const be = err.data;
        const emailErr = be?.errors?.email;
        if (emailErr) {
          form.setError("email", {
            message: Array.isArray(emailErr) ? emailErr[0] : String(emailErr),
          });
        }
        const list = flattenErrors(be?.errors);
        description = list[0] || be?.message || err.message || description;
      } else if (err instanceof Error && err.message) {
        description = err.message;
      }
      toast({ title: "خطأ", description, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a2665] to-[#b29567] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#2a2665] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                نسيت كلمة المرور؟
              </h1>
              <p className="text-gray-600">
                أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق لإعادة تعيين كلمة المرور
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        البريد الإلكتروني
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="أدخل بريدك الإلكتروني"
                            {...field}
                            className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665] py-6 pr-10"
                            dir="ltr"
                            style={{ direction: "ltr", textAlign: "left" }}
                          />
                        </FormControl>
                        <Mail className="absolute top-1/2 -translate-y-1/2 right-3 h-5 w-5 text-gray-400" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#b29567] hover:bg-[#b29567]/90 text-white py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "جاري الإرسال..."
                  ) : (
                    <>
                      إرسال رمز التحقق
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/auth")}
                className="text-[#2a2665] hover:underline text-sm"
              >
                العودة إلى تسجيل الدخول
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

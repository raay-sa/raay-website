import { useState, useEffect } from "react";
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
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { postForgotPassword } from "@/lib/api/auth";
import { HttpError } from "@/lib/api/http";
import { getOtpSession, clearOtpSession } from "@/lib/otpSession";

// Schema for password reset validation
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/,
        {
          message: "يجب أن تحتوي كلمة المرور على حرف كبير وصغير ورقم ورمز خاص",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function flattenErrors(errors?: Record<string, string[] | string>): string[] {
  const out: string[] = [];
  for (const v of Object.values(errors || {})) {
    if (Array.isArray(v)) out.push(...v);
    else if (v != null) out.push(String(v));
  }
  return out;
}

export default function ResetPasswordPage() {
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  // Get email from OTP session
  const session = getOtpSession();
  const email = session?.email || "";

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  // Redirect if no email in session
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // Don't render if no email
  if (!email) {
    return null;
  }

  async function onSubmit(values: ResetPasswordFormValues) {
    setIsSubmitting(true);
    try {
      await postForgotPassword({
        email: email,
        password: values.password,
        password_confirmation: values.confirmPassword,
      });

      setIsSuccess(true);
      
      // Clear OTP session after successful password reset
      clearOtpSession();
      
      toast({
        title: "تم إعادة تعيين كلمة المرور بنجاح",
        description: "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة",
        variant: "default",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch (err) {
      let description = "فشل إعادة تعيين كلمة المرور";
      if (err instanceof HttpError) {
        const be = err.data;
        const passwordErr = be?.errors?.password;
        const emailErr = be?.errors?.email;
        
        if (passwordErr) {
          form.setError("password", {
            message: Array.isArray(passwordErr) ? passwordErr[0] : String(passwordErr),
          });
        }
        if (emailErr) {
          // Email errors are handled by the backend, just show in toast
          description = Array.isArray(emailErr) ? emailErr[0] : String(emailErr);
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

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2a2665] to-[#b29567] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                تم بنجاح!
              </h1>
              <p className="text-gray-600 mb-6">
                تم إعادة تعيين كلمة المرور بنجاح. سيتم توجيهك إلى صفحة تسجيل الدخول...
              </p>
              <Button
                onClick={() => navigate("/auth")}
                className="bg-[#b29567] hover:bg-[#b29567]/90 text-white"
              >
                الذهاب إلى تسجيل الدخول
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
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
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                إعادة تعيين كلمة المرور
              </h1>
              <p className="text-gray-600">
                أدخل كلمة المرور الجديدة
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        كلمة المرور الجديدة
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="أدخل كلمة المرور الجديدة"
                            {...field}
                            className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665] py-6 pr-10 pl-10"
                          />
                        </FormControl>
                        <Lock className="absolute top-1/2 -translate-y-1/2 right-3 h-5 w-5 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 -translate-y-1/2 left-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        تأكيد كلمة المرور
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="أعد إدخال كلمة المرور"
                            {...field}
                            className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665] py-6 pr-10 pl-10"
                          />
                        </FormControl>
                        <Lock className="absolute top-1/2 -translate-y-1/2 right-3 h-5 w-5 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute top-1/2 -translate-y-1/2 left-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">
                    متطلبات كلمة المرور:
                  </h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• يجب أن تحتوي على 6 أحرف على الأقل</li>
                    <li>• يجب أن تحتوي على حرف كبير (A-Z)</li>
                    <li>• يجب أن تحتوي على حرف صغير (a-z)</li>
                    <li>• يجب أن تحتوي على رقم (0-9)</li>
                    <li>• يجب أن تحتوي على رمز خاص (!@#$%^&*)</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#b29567] hover:bg-[#b29567]/90 text-white py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "جاري الحفظ..." : "إعادة تعيين كلمة المرور"}
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

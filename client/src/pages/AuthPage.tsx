import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Lock, Mail, User } from "lucide-react";
import { PasswordStrengthIndicator } from "@/components/ui/password-strength-indicator";
import GoogleCaptcha, { GoogleCaptchaRef } from "@/components/ui/google-captcha";
import rayLogo from "@/assets/images/rayLogo.webp";

// APIs
import {
  postLogin,
  postRegister,
  postSendOtp, // <-- use OTP for login and register flows
  type BackendErrorResponse,
} from "@/lib/api/auth";
import { HttpError } from "@/lib/api/http";

// OTP session helper (for login and register flows)
import { setOtpSession } from "@/lib/otpSession";

// ----- Schemas -----
const loginSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z
    .string()
    .min(6, { message: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل" }),
});

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "يجب أن يحتوي الاسم على حرفين على الأقل" }),
    phone: z
      .string()
      .min(9, { message: "رقم الجوال يجب أن لا يقل عن 9 أرقام" })
      .regex(/^\d+$/, { message: "رقم الجوال يجب أن يكون أرقاماً فقط" }),
    email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
    password: z
      .string()
      .min(8, { message: "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل" })
      .max(128, { message: "كلمة المرور يجب أن لا تتجاوز 128 حرف" })
      .refine((password) => /[A-Z]/.test(password), {
        message: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل (A-Z)",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل (a-z)",
      })
      .refine((password) => /\d/.test(password), {
        message: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل (0-9)",
      })
      .refine((password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), {
        message: "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل (!@#$%^&*)",
      })
      .refine((password) => !/(.)\1{2,}/.test(password), {
        message: "لا يمكن أن تحتوي كلمة المرور على أكثر من حرفين متتاليين متطابقين",
      })
      .refine((password) => !/123|234|345|456|567|678|789|890/.test(password), {
        message: "لا يمكن أن تحتوي كلمة المرور على أرقام متتالية (123, 456, إلخ)",
      })
      .refine((password) => !/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password), {
        message: "لا يمكن أن تحتوي كلمة المرور على أحرف متتالية (abc, def, إلخ)",
      })
      .refine((password) => !/qwerty|asdfgh|zxcvbn/i.test(password), {
        message: "لا يمكن أن تحتوي كلمة المرور على أنماط لوحة المفاتيح الشائعة",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "يرجى تأكيد كلمة المرور" }),
    education: z.string().optional(),
    bio: z.string().optional(),
    imageFile: z.any().optional(), // File | undefined
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

// Flatten backend errors
function flattenErrors(errors?: Record<string, string[] | string>): string[] {
  if (!errors) return [];
  const out: string[] = [];
  for (const v of Object.values(errors)) {
    if (Array.isArray(v)) out.push(...v.map(String));
    else if (v != null) out.push(String(v));
  }
  return out;
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // reCAPTCHA state
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [captchaError, setCaptchaError] = useState<string>("");
  const captchaRef = useRef<GoogleCaptchaRef>(null);

  // ----- Forms -----
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      education: "",
      bio: "",
      imageFile: undefined,
    },
  });

  // reCAPTCHA handlers
  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setCaptchaError("");
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken("");
    setCaptchaError("انتهت صلاحية التحقق. يرجى المحاولة مرة أخرى.");
  };

  const handleCaptchaError = (error: any) => {
    setCaptchaToken("");
    setCaptchaError("حدث خطأ في التحقق. يرجى المحاولة مرة أخرى.");
    console.error('Captcha error:', error);
  };

  // ----- Login submit (OTP-based login flow) -----
  async function onLoginSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    try {
      // First verify email and password with backend
      await postLogin({
        email: values.email,
        password: values.password,
      });

      // If login credentials are valid, send OTP
      await postSendOtp({ 
        email: values.email, 
        auth_method: "login" 
      });

      // Store session for OTP verification
      setOtpSession({ 
        email: values.email, 
        method: "login" 
      });

      toast({
        title: "تحقق من بريدك",
        description: "أرسلنا رمز التحقق لتسجيل الدخول.",
        variant: "default",
      });

      navigate("/otp");
    } catch (err) {
      let description = "فشل تسجيل الدخول";
      if (err instanceof HttpError) {
        const be = err.data;
        // Surface field-level errors
        const emailErr = be?.errors?.email;
        const passwordErr = be?.errors?.password;
        
        if (emailErr) {
          loginForm.setError("email", {
            message: Array.isArray(emailErr) ? emailErr[0] : String(emailErr),
          });
        }
        if (passwordErr) {
          loginForm.setError("password", {
            message: Array.isArray(passwordErr) ? passwordErr[0] : String(passwordErr),
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

  // ----- Register submit (student only, then OTP like dashboard flow) -----
  async function onRegisterSubmit(values: RegisterFormValues) {
    setIsSubmitting(true);
    
    // Validate reCAPTCHA
    if (!captchaToken) {
      setCaptchaError("يجب إكمال التحقق من أنك لست روبوت.");
      toast({
        title: "خطأ",
        description: "يجب إكمال التحقق من أنك لست روبوت.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // 1) Register first (no token saved yet)
      const res = await postRegister({
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword,
        education: values.education || "",
        bio: values.bio || "",
        image: (values as any).imageFile ?? null,
      });

      // 2) Send OTP
      await postSendOtp({ email: values.email, auth_method: "register" });

      // 3) Stash minimal context for OTP page
      setOtpSession({ email: values.email, method: "register" });

      // 4) Go to OTP page
      toast({
        title: "تم إنشاء الحساب",
        description: "أرسلنا رمز التحقق إلى بريدك الإلكتروني لإتمام التسجيل.",
      });
      navigate("/otp");
    } catch (err) {
      let description = "فشل إنشاء الحساب";
      if (err instanceof HttpError) {
        const be = err.data;

        // Map backend field errors -> form fields
        const map: Record<string, keyof RegisterFormValues> = {
          name: "name",
          phone: "phone",
          email: "email",
          password: "password",
          password_confirmation: "confirmPassword",
          education: "education",
          bio: "bio",
          image: "imageFile",
          user_type: "name",
        };
        const errors = be?.errors || {};
        for (const [k, v] of Object.entries(errors)) {
          const key = map[k] as keyof RegisterFormValues | undefined;
          if (key) {
            registerForm.setError(key, {
              message: Array.isArray(v) ? v[0] : String(v),
            });
          }
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
          {/* Right: intro */}
          <div className="lg:w-1/2 bg-[#2a2665] text-white p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <img
                  src={rayLogo}
                  alt="شعار مركز راي"
                  className="h-20 mb-8 brightness-0 invert"
                />
                <h2 className="text-3xl font-bold mb-4">
                  منصة راي التدريبية والاستشارية
                </h2>
                <p className="text-lg mb-6 text-white/80">
                  المنصة الرائدة في المملكة العربية السعودية لتطوير المهارات
                  المهنية والوظيفية
                </p>
                <div className="border-t border-white/20 pt-6 mt-8">
                  <h3 className="text-xl font-bold mb-4 text-[#b29567]">
                    ما يميزنا
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#b29567] ml-3"></div>
                      <span>برامج تدريبية متخصصة</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#b29567] ml-3"></div>
                      <span>خبراء ومدربون ذوو كفاءة</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#b29567] ml-3"></div>
                      <span>شهادات معتمدة</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#b29567] ml-3"></div>
                      <span>تحليل للمهارات وتوصيات</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Left: forms */}
          <div className="lg:w-1/2 p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#2a2665] mb-2">
                  مرحباً بك في منصة راي
                </h2>
                <p className="text-gray-600">
                  قم بتسجيل الدخول أو إنشاء حساب جديد للبدء
                </p>
              </div>

              <Tabs
                defaultValue="login"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-[#2a2665] data-[state=active]:text-white"
                  >
                    تسجيل الدخول
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-[#2a2665] data-[state=active]:text-white"
                  >
                    إنشاء حساب
                  </TabsTrigger>
                </TabsList>

                {/* Login */}
                <TabsContent value="login">
                  <Card className="border-none shadow-none">
                    <CardContent className="p-0">
                      <Form {...loginForm}>
                        <form
                          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                          className="space-y-6"
                        >
                          <FormField
                            control={loginForm.control}
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
                                    />
                                  </FormControl>
                                  <Mail className="absolute top-1/2 -translate-y-1/2 right-3 h-5 w-5 text-gray-400" />
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between items-center">
                                  <button
                                    type="button"
                                    onClick={() => navigate("/forgot-password")}
                                    className="text-sm text-[#b29567] hover:underline"
                                  >
                                    نسيت كلمة المرور؟
                                  </button>
                                  <FormLabel className="text-gray-700">
                                    كلمة المرور
                                  </FormLabel>
                                </div>
                                <div className="relative">
                                  <FormControl>
                                    <Input
                                      type="password"
                                      placeholder="أدخل كلمة المرور"
                                      {...field}
                                      className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665] py-6 pr-10"
                                    />
                                  </FormControl>
                                  <Lock className="absolute top-1/2 -translate-y-1/2 right-3 h-5 w-5 text-gray-400" />
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
                            {isSubmitting
                              ? "جاري إرسال الرمز..."
                              : "إرسال رمز التحقق"}
                          </Button>
                        </form>
                      </Form>
                      <div className="mt-8 text-center text-gray-600">
                        ليس لديك حساب؟{" "}
                        <button
                          className="text-[#2a2665] hover:underline font-semibold"
                          onClick={() => setActiveTab("register")}
                        >
                          إنشاء حساب جديد
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Register (student only) */}
                <TabsContent value="register">
                  <Card className="border-none shadow-none">
                    <CardContent className="p-0">
                      <Form {...registerForm}>
                        <form
                          onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={registerForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700">
                                    الاسم
                                  </FormLabel>
                                  <div className="relative">
                                    <FormControl>
                                      <Input
                                        placeholder="أدخل اسمك الكامل"
                                        {...field}
                                        className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665] py-6 pr-10"
                                      />
                                    </FormControl>
                                    <User className="absolute top-1/2 -translate-y-1/2 right-3 h-5 w-5 text-gray-400" />
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={registerForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700">
                                    رقم الجوال
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="tel"
                                      inputMode="numeric"
                                      placeholder="مثال: 501234567"
                                      {...field}
                                      className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665] py-6"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={registerForm.control}
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
                                    />
                                  </FormControl>
                                  <Mail className="absolute top-1/2 -translate-y-1/2 right-3 h-5 w-5 text-gray-400" />
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={registerForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700">
                                    كلمة المرور
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="password"
                                      placeholder="أدخل كلمة المرور"
                                      {...field}
                                      className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665] py-6"
                                    />
                                  </FormControl>
                                  <PasswordStrengthIndicator password={field.value || ""} />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={registerForm.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700">
                                    تأكيد كلمة المرور
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="password"
                                      placeholder="أعد إدخال كلمة المرور"
                                      {...field}
                                      className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665] py-6"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={registerForm.control}
                            name="education"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">
                                  المؤهل العلمي
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="مثال: بكالوريوس علوم الحاسب"
                                    {...field}
                                    className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">
                                  نبذة
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={4}
                                    placeholder="نبذة مختصرة عنك"
                                    {...field}
                                    className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="imageFile"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">
                                  صورة شخصية
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.files?.[0] ?? undefined
                                      )
                                    }
                                    className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Google reCAPTCHA */}
                          <GoogleCaptcha
                            ref={captchaRef}
                            onVerify={handleCaptchaVerify}
                            onExpire={handleCaptchaExpire}
                            onError={handleCaptchaError}
                            error={captchaError}
                            className="flex justify-center"
                          />

                          <Button
                            type="submit"
                            className="w-full bg-[#b29567] hover:bg-[#b29567]/90 text-white py-6 text-lg"
                            disabled={isSubmitting}
                          >
                            {isSubmitting
                              ? "جاري إنشاء الحساب..."
                              : "إنشاء حساب"}
                          </Button>
                        </form>
                      </Form>

                      <div className="mt-8 text-center text-gray-600">
                        لديك حساب بالفعل؟{" "}
                        <button
                          className="text-[#2a2665] hover:underline font-semibold"
                          onClick={() => setActiveTab("login")}
                        >
                          تسجيل الدخول
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  بتسجيل الدخول أو إنشاء حساب، فإنك توافق على{" "}
                  <a
                    href="/policies#السياسات"
                    className="text-[#b29567] hover:underline"
                  >
                    سياسة الخصوصية
                  </a>{" "}
                  و{" "}
                  <a href="policies#الشروط-والاحكام" className="text-[#b29567] hover:underline">
                    شروط الاستخدام
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

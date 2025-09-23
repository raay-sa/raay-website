import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { postSendOtp, postVerifyOtp } from "@/lib/api/auth";
import { getOtpSession, clearOtpSession } from "@/lib/otpSession";
import { HttpError } from "@/lib/api/http";
import type { BackendErrorResponse } from "@/lib/api/auth";

export default function OtpPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const session = useMemo(() => getOtpSession(), []);
  const email = session?.email || "";
  const method = session?.method || "register";

  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!email) {
      navigate("/auth");
      return;
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const onChangeDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 1);
    setCode((prev) => {
      const arr = prev.split("");
      arr[i] = d;
      return arr.join("");
    });
    if (d && inputs.current[i + 1]) inputs.current[i + 1]?.focus();
  };

  const resend = async () => {
    setTimer(30);
    try {
      await postSendOtp({ email, auth_method: method });
      toast({
        title: "تم الإرسال",
        description: "تم إرسال رمز جديد إلى بريدك.",
      });
    } catch (err) {
      let description = "تعذر إرسال الرمز";
      if (err instanceof HttpError<BackendErrorResponse>) {
        description =
          err.data?.message ||
          Object.values(err.data?.errors || {})[0]?.toString() ||
          description;
      } else if (err instanceof Error && err.message) {
        description = err.message;
      }
      toast({ title: "خطأ", description, variant: "destructive" });
    }
  };

  const verify = async () => {
    if (code.length < 6) return;
    setLoading(true);
    try {
      // include auth_method in verification
      const resp = await postVerifyOtp({ email, code, auth_method: method });
      const token = resp?.data?.token ?? (resp as any)?.token ?? "";
      const user = resp?.data?.user ?? (resp as any)?.user ?? null;

      if (token && user) {
        try {
          localStorage.setItem("raay-auth", JSON.stringify({ token, user }));
        } catch {}
        clearOtpSession();
        toast({
          title: "تم التحقق بنجاح",
          description: "أهلاً بك في منصة راي.",
        });
        navigate("/");
      } else {
        toast({
          title: "تم التحقق",
          description: "لكن لم يتم استلام بيانات الدخول. يرجى المحاولة لاحقاً.",
        });
      }
    } catch (err) {
      let description = "رمز غير صالح";
      if (err instanceof HttpError<BackendErrorResponse>) {
        description =
          err.data?.message ||
          Object.values(err.data?.errors || {})[0]?.toString() ||
          description;
      } else if (err instanceof Error && err.message) {
        description = err.message;
      }
      toast({ title: "خطأ", description, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-8">
              <h1 className="text-2xl font-bold text-center mb-2">
                رمز التحقق
              </h1>
              <p className="text-center text-gray-600 mb-6">
                تم إرسال رمز مكوّن من 6 أرقام إلى{" "}
                <span className="font-semibold">{email}</span>
              </p>

              <div className="flex gap-2 justify-center mb-4" dir="ltr">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <Input
                    key={i}
                    ref={(el) => (inputs.current[i] = el)}
                    maxLength={1}
                    value={code[i] || ""}
                    onChange={(e) => onChangeDigit(i, e.target.value)}
                    className="w-12 h-12 text-center text-lg"
                  />
                ))}
              </div>

              <div className="text-center text-sm mb-6">
                {timer > 0 ? (
                  <span className="bg-gray-100 px-3 py-1 rounded">
                    00:{String(timer).padStart(2, "0")}
                  </span>
                ) : (
                  <button
                    className="text-[#2a2665] font-semibold"
                    onClick={resend}
                  >
                    إعادة الإرسال
                  </button>
                )}
              </div>

              <Button
                onClick={verify}
                disabled={loading || code.length < 6}
                className="w-full bg-[#b29567] hover:bg-[#b29567]/90 text-white py-6 text-lg"
              >
                {loading ? "جارٍ التحقق..." : "تحقق"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// src/pages/ContactPage.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import {
  SiX,
  SiLinkedin,
  SiInstagram,
  SiYoutube,
  SiWhatsapp,
} from "react-icons/si";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useI18nStore } from "@/lib/i18n";
import { useMutation } from "@tanstack/react-query";
import { postContactUs } from "@/lib/api/endpoints";
import type { BackendErrorResponse } from "@/lib/api/types";
import { HttpError } from "@/lib/api/http";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "يجب أن يحتوي الاسم على حرفين على الأقل" }),
  phone: z
    .string()
    .min(8, { message: "يجب أن يحتوي رقم الهاتف على 8 أرقام على الأقل" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  subject: z
    .string()
    .min(3, { message: "يجب أن يحتوي الموضوع على 3 أحرف على الأقل" }),
  message: z
    .string()
    .min(10, { message: "يجب أن تحتوي الرسالة على 10 أحرف على الأقل" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function flattenBackendErrors(
  errors?: Record<string, string[] | string>
): string[] {
  if (!errors) return [];
  const msgs: string[] = [];
  for (const key of Object.keys(errors)) {
    const v = errors[key];
    if (Array.isArray(v)) msgs.push(...v.map(String));
    else if (v != null) msgs.push(String(v));
  }
  return msgs;
}

export default function ContactPage() {
  const { toast } = useToast();
  const { language } = useI18nStore();

  // Read URL parameters for program information
  const [programInfo, setProgramInfo] = useState<{
    programId?: string;
    programTitle?: string;
  }>({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const programId = urlParams.get('programId');
    const programTitle = urlParams.get('programTitle');
    
    if (programId && programTitle) {
      setProgramInfo({
        programId,
        programTitle: decodeURIComponent(programTitle)
      });
    }
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: programInfo.programTitle 
        ? (language === "ar" 
            ? `استفسار عن البرنامج: ${programInfo.programTitle}` 
            : `Inquiry about Program: ${programInfo.programTitle}`)
        : "",
      message: "",
    },
  });

  // Update form when program info is loaded
  useEffect(() => {
    if (programInfo.programTitle) {
      const subjectText = language === "ar" 
        ? `استفسار عن البرنامج: ${programInfo.programTitle}` 
        : `Inquiry about Program: ${programInfo.programTitle}`;
      form.setValue("subject", subjectText);
    }
  }, [programInfo.programTitle, language, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: postContactUs,
    onSuccess: (res) => {
      toast({
        title:
          language === "ar"
            ? "تم إرسال رسالتك بنجاح"
            : "Your message was sent successfully",
        description:
          language === "ar"
            ? res?.message ?? "سنقوم بالرد عليك في أقرب وقت ممكن"
            : res?.message ?? "We will respond to you as soon as possible",
      });
      form.reset();
    },
    onError: (err: unknown) => {
      // Default message
      let toastMessage =
        language === "ar"
          ? "حدث خطأ أثناء إرسال الرسالة"
          : "An error occurred while sending your message";

      // If it's our HttpError with backend payload, surface field errors
      const httpErr = err as HttpError<BackendErrorResponse> | undefined;
      if (httpErr && httpErr.name === "HttpError") {
        const be = httpErr.data as BackendErrorResponse | undefined;

        // map field errors to react-hook-form fields (name, phone, email, subject, message)
        const fieldKeys = [
          "name",
          "phone",
          "email",
          "subject",
          "message",
        ] as const;
        for (const fk of fieldKeys) {
          const val = be?.errors?.[fk];
          if (val) {
            const message = Array.isArray(val) ? val[0] : String(val);
            form.setError(fk, { message });
          }
        }

        const messages = flattenBackendErrors(be?.errors);
        if (messages.length > 0) {
          toastMessage = messages[0]; // show first error; concise
        } else if (be?.message) {
          toastMessage = be.message;
        }
      } else if (err instanceof Error && err.message) {
        toastMessage = err.message;
      }

      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: toastMessage,
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: ContactFormValues) {
    const formData = {
      ...values,
      program_id: programInfo.programId ? parseInt(programInfo.programId, 10) : undefined
    };

    // don't await to avoid dev overlay; onError/onSuccess will handle UI
    mutate(formData);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#2a2665] mb-4"
          >
            {language === "ar" ? "تواصل معنا" : "Contact Us"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-3xl mx-auto text-lg"
          >
            {language === "ar"
              ? "نحن هنا للإجابة على استفساراتك وتقديم المزيد من المعلومات حول برامجنا التدريبية وخدماتنا الاستشارية"
              : "We are here to answer your inquiries and provide more information about our training programs and consulting services"}
          </motion.p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* معلومات الاتصال */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#2a2665] text-white p-6">
                  <h2 className="text-xl font-bold mb-2">
                    {language === "ar"
                      ? "معلومات التواصل"
                      : "Contact Information"}
                  </h2>
                  <p className="text-white/80">
                    {language === "ar"
                      ? "تواصل معنا من خلال القنوات التالية"
                      : "Contact us through these channels"}
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-[#2a2665] w-10 h-10 rounded-full flex items-center justify-center text-white">
                          <FaMapMarkerAlt />
                        </div>
                      </div>
                      <div className={`${language === "ar" ? "mr-4" : "ml-4"}`}>
                        <h4 className="font-bold text-gray-800 mb-1">
                          {language === "ar" ? "العنوان" : "Address"}
                        </h4>
                        <p className="text-gray-600">
                          {language === "ar"
                            ? "طريق الإمام عبدالله بن سعود بن عبدالعزيز الفرعي رقم المبني 2085 الدور الثالث مكتب47"
                            : "Imam Abdullah bin Saud bin Abdulaziz Branch Road, Building No. 2085, 3rd Floor, Office 47"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-[#2a2665] w-10 h-10 rounded-full flex items-center justify-center text-white">
                          <FaPhoneAlt />
                        </div>
                      </div>
                      <div className={`${language === "ar" ? "mr-4" : "ml-4"}`}>
                        <h4 className="font-bold text-gray-800 mb-1">
                          {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                        </h4>
                        <p className="text-gray-600 ltr:text-left" dir="ltr">
                          0112400807
                        </p>
                      </div>
                    </div>

                    {/* واتساب */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-[#25d366] w-10 h-10 rounded-full flex items-center justify-center text-white">
                          <FaWhatsapp />
                        </div>
                      </div>
                      <div className={`${language === "ar" ? "mr-4" : "ml-4"}`}>
                        <h4 className="font-bold text-gray-800 mb-1">
                          {language === "ar" ? "واتساب" : "WhatsApp"}
                        </h4>
                        <a
                          href="https://wa.me/966583500010"
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-600 hover:text-[#25d366] transition-colors ltr:text-left"
                          dir="ltr"
                        >
                          0583500010
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-[#2a2665] w-10 h-10 rounded-full flex items-center justify-center text-white">
                          <FaEnvelope />
                        </div>
                      </div>
                      <div className={`${language === "ar" ? "mr-4" : "ml-4"}`}>
                        <h4 className="font-bold text-gray-800 mb-1">
                          {language === "ar" ? "البريد الإلكتروني" : "Email"}
                        </h4>
                        <p className="text-gray-600">info@raay.sa</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-[#2a2665] w-10 h-10 rounded-full flex items-center justify-center text-white">
                          <FaClock />
                        </div>
                      </div>
                      <div className={`${language === "ar" ? "mr-4" : "ml-4"}`}>
                        <h4 className="font-bold text-gray-800 mb-1">
                          {language === "ar" ? "ساعات العمل" : "Working Hours"}
                        </h4>
                        <p className="text-gray-600">
                          {language === "ar"
                            ? "الأحد - الخميس: 8:00 صباحًا - 5:00 مساءً"
                            : "Sunday - Thursday: 8:00 AM - 5:00 PM"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md mt-6 p-6">
                <h3 className="text-xl font-bold text-[#2a2665] mb-6">
                  {language === "ar" ? "تابعنا" : "Follow Us"}
                </h3>
                <div
                  className="flex items-center gap-3 sm:gap-4"
                  dir={language === "ar" ? "rtl" : "ltr"}
                >
                  {/* X (Twitter) */}
                  {/* <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full grid place-items-center
                 bg-black text-white shadow-sm
                 transition-transform duration-200 hover:scale-105 focus:scale-105
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    title="X (Twitter)"
                  >
                    <SiX className="text-[18px] sm:text-[20px]" />
                  </a> */}

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/knowledge-building-company-and-ray-training-center/about/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full grid place-items-center
                 bg-[#0A66C2] text-white shadow-sm
                 transition-transform duration-200 hover:scale-105 focus:scale-105
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2]"
                    title="LinkedIn"
                  >
                    <SiLinkedin className="text-[18px] sm:text-[20px]" />
                  </a>

                  {/* Instagram */}
                  {/* <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full grid place-items-center
                 text-white shadow-sm
                 transition-transform duration-200 hover:scale-105 focus:scale-105
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
                 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"
                    title="Instagram"
                  >
                    <SiInstagram className="text-[18px] sm:text-[20px]" />
                  </a> */}

                  {/* YouTube */}
                  {/* <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full grid place-items-center
                 bg-[#FF0000] text-white shadow-sm
                 transition-transform duration-200 hover:scale-105 focus:scale-105
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000]"
                    title="YouTube"
                  >
                    <SiYoutube className="text-[18px] sm:text-[20px]" />
                  </a> */}

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/966583500010"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full grid place-items-center
                 bg-[#25D366] text-white shadow-sm
                 transition-transform duration-200 hover:scale-105 focus:scale-105
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
                    title="WhatsApp"
                  >
                    <SiWhatsapp className="text-[18px] sm:text-[20px]" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* نموذج الاتصال */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#2a2665] mb-6">
                    {language === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
                  </h2>
                  
                  {/* Program inquiry notice */}
                  {programInfo.programTitle && (
                    <div className="mb-6 p-4 bg-[#2a2665]/10 border border-[#2a2665]/20 rounded-lg">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-[#2a2665] rounded-full flex items-center justify-center text-white text-sm font-bold">
                            i
                          </div>
                        </div>
                        <div className={`${language === "ar" ? "mr-3" : "ml-3"}`}>
                          <p className="text-sm text-[#2a2665] font-medium">
                            {language === "ar" 
                              ? `أنت تستفسر عن البرنامج: ${programInfo.programTitle}`
                              : `You are inquiring about: ${programInfo.programTitle}`}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {language === "ar" 
                              ? "سيتم ربط استفسارك بالبرنامج المحدد"
                              : "Your inquiry will be linked to the specified program"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">
                                {language === "ar" ? "الاسم" : "Name"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={
                                    language === "ar"
                                      ? "الاسم الكامل"
                                      : "Full Name"
                                  }
                                  {...field}
                                  className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">
                                {language === "ar"
                                  ? "رقم الجوال"
                                  : "Mobile Number"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={
                                    language === "ar"
                                      ? "رقم الجوال"
                                      : "Mobile Number"
                                  }
                                  {...field}
                                  className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">
                              {language === "ar"
                                ? "البريد الإلكتروني"
                                : "Email"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={
                                  language === "ar"
                                    ? "البريد الإلكتروني"
                                    : "Email Address"
                                }
                                {...field}
                                className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">
                              {language === "ar" ? "الموضوع" : "Subject"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={
                                  language === "ar"
                                    ? "موضوع الرسالة"
                                    : "Message Subject"
                                }
                                {...field}
                                className="border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">
                              {language === "ar" ? "الرسالة" : "Message"}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={
                                  language === "ar"
                                    ? "اكتب رسالتك هنا..."
                                    : "Write your message here..."
                                }
                                className="min-h-[150px] border-gray-300 focus:border-[#2a2665] focus:ring-[#2a2665]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-[#b29567] hover:bg-[#b29567]/90 text-white py-6 text-lg"
                        disabled={isPending}
                      >
                        {isPending
                          ? language === "ar"
                            ? "جاري الإرسال..."
                            : "Sending..."
                          : language === "ar"
                          ? "إرسال"
                          : "Send"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* خريطة الموقع */}
        <div className="rounded-lg overflow-hidden shadow-lg h-[400px] mb-16">
          <iframe
            title={
              language === "ar" ? "موقعنا على الخريطة" : "Our Location on Map"
            }
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.1237416643894!2d46.7673085!3d24.791216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2eff0032da6973%3A0x18654579d2f18317!2z2YXYsdmD2LIg2LHYo9mKINmE2YTYqtiv2LHZitioINmI2KfZhNin2LPYqti02KfYsdin2Ko!5e0!3m2!1sen!2seg!4v1756565105561!5m2!1sen!2seg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

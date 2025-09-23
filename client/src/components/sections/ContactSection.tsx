// src/components/sections/ContactSection.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  SiX, // Twitter (X)
  SiLinkedin,
  SiInstagram,
  SiYoutube,
  SiWhatsapp,
} from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useI18nStore } from "@/lib/i18n";
import { TranslatedText } from "@/components/ui/translated-text";
import { postContactUs } from "@/lib/api/endpoints";
import type { BackendErrorResponse } from "@/lib/api/types";
import { HttpError } from "@/lib/api/http";

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

export default function ContactSection() {
  const { toast } = useToast();
  const { language } = useI18nStore();
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const handleLanguageChange = () => setForceUpdate((p) => p + 1);
    window.addEventListener(
      "languageChanged",
      handleLanguageChange as EventListener
    );
    return () =>
      window.removeEventListener(
        "languageChanged",
        handleLanguageChange as EventListener
      );
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postContactUs,
    onSuccess: (data) => {
      toast({
        title: language === "ar" ? "تم الإرسال بنجاح" : "Sent successfully",
        description:
          language === "ar"
            ? data?.message ?? "تم إرسال رسالتك بنجاح، سنتواصل معك قريباً"
            : data?.message ??
              "Your message has been sent, we'll reach out soon",
      });
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    },
    onError: (error) => {
      let description =
        language === "ar"
          ? "حدث خطأ أثناء إرسال الرسالة"
          : "An error occurred while sending the message";

      if (error instanceof HttpError<BackendErrorResponse>) {
        const be = error.data as BackendErrorResponse | undefined;
        const messages = flattenBackendErrors(be?.errors);
        if (messages.length > 0) {
          // Render a bullet list in toast description
          description = messages.map((m) => `• ${m}`).join("\n");
        } else if (be?.message) {
          description = be.message;
        }
      } else if (error instanceof Error && error.message) {
        description = error.message;
      }

      toast({
        title: language === "ar" ? "خطأ في الإرسال" : "Send failed",
        description,
        variant: "destructive",
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: language === "ar" ? "حقول مطلوبة" : "Required fields",
        description:
          language === "ar"
            ? "يرجى تعبئة جميع الحقول المطلوبة"
            : "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    mutate(formData);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2a2665] section-heading mb-4">
            <TranslatedText textKey="contact.title" defaultText="تواصل معنا" />
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            <TranslatedText
              textKey="contact.description"
              defaultText="نحن هنا للإجابة على استفساراتك وتقديم المزيد من المعلومات حول برامجنا التدريبية وخدماتنا الاستشارية"
            />
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#2a2665] mb-6">
              <TranslatedText
                textKey="contact.form.send"
                defaultText="ارسل رسالة"
              />
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    <TranslatedText
                      textKey="contact.form.name"
                      defaultText="الاسم"
                    />
                  </label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2a2665]"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    <TranslatedText
                      textKey="contact.form.phone"
                      defaultText="رقم الجوال"
                    />
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2a2665]"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  <TranslatedText
                    textKey="contact.form.email"
                    defaultText="البريد الإلكتروني"
                  />
                </label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2a2665]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  <TranslatedText
                    textKey="contact.form.subject"
                    defaultText="الموضوع"
                  />
                </label>
                <Input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2a2665]"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  <TranslatedText
                    textKey="contact.form.message"
                    defaultText="الرسالة"
                  />
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2a2665]"
                />
              </div>
              <Button
                type="submit"
                className="bg-[#2a2665] hover:bg-[#2a2665]/90 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                disabled={isPending}
              >
                <TranslatedText
                  textKey={
                    isPending ? "contact.form.sending" : "contact.form.submit"
                  }
                  defaultText={isPending ? "جاري الإرسال..." : "إرسال"}
                />
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h3 className="text-xl font-bold text-[#2a2665] mb-6">
                <TranslatedText
                  textKey="contact.info.title"
                  defaultText="معلومات التواصل"
                />
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#2a2665] w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <FaMapMarkerAlt />
                    </div>
                  </div>
                  <div className={language === "ar" ? "mr-4" : "ml-4"}>
                    <h4 className="font-bold text-gray-800 mb-1">
                      <TranslatedText
                        textKey="contact.info.address"
                        defaultText="العنوان"
                      />
                    </h4>
                    <p className="text-gray-600">
                      <TranslatedText
                        textKey="contact.info.address.text"
                        defaultText="طريق الإمام عبدالله بن سعود بن عبدالعزيز الفرعي رقم المبني 2085 الدور الثالث مكتب47"
                      />
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#2a2665] w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <FaPhoneAlt />
                    </div>
                  </div>
                  <div className={language === "ar" ? "mr-4" : "ml-4"}>
                    <h4 className="font-bold text-gray-800 mb-1">
                      <TranslatedText
                        textKey="contact.info.phone"
                        defaultText="رقم الهاتف"
                      />
                    </h4>
                    <p className="text-gray-600 ltr:text-left" dir="ltr">
                      0112400807
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#25d366] w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <FaWhatsapp />
                    </div>
                  </div>
                  <div className={language === "ar" ? "mr-4" : "ml-4"}>
                    <h4 className="font-bold text-gray-800 mb-1">
                      <TranslatedText
                        textKey="contact.info.whatsapp"
                        defaultText="واتساب"
                      />
                    </h4>
                    <a
                      href="https://wa.me/966530023285"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-600 hover:text-[#25d366] transition-colors ltr:text-left"
                      dir="ltr">
                      0530023285
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#2a2665] w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <FaEnvelope />
                    </div>
                  </div>
                  <div className={language === "ar" ? "mr-4" : "ml-4"}>
                    <h4 className="font-bold text-gray-800 mb-1">
                      <TranslatedText
                        textKey="contact.info.email"
                        defaultText="البريد الإلكتروني"
                      />
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
                  <div className={language === "ar" ? "mr-4" : "ml-4"}>
                    <h4 className="font-bold text-gray-800 mb-1">
                      <TranslatedText
                        textKey="contact.info.hours"
                        defaultText="ساعات العمل"
                      />
                    </h4>
                    <p className="text-gray-600">
                      <TranslatedText
                        textKey="contact.info.hours.text"
                        defaultText="الأحد - الخميس: 8:00 صباحًا - 5:00 مساءً"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#2a2665] mb-6">
                <TranslatedText textKey="contact.social" defaultText="تابعنا" />
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
                  href="#"
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
          </div>
        </div>
      </div>
    </section>
  );
}

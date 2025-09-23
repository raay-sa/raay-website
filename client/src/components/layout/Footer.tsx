import { Link } from "wouter";
import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { TranslatedText } from "@/components/ui/translated-text";
import { useI18nStore } from "@/lib/i18n";
import { useEffect, useState } from "react";
import rayLogo from "@/assets/images/rayLogo.webp";
import maarifaLogo from "@/assets/maarifa-logo.png";
import { SiX } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const { language } = useI18nStore();
  const [forceUpdate, setForceUpdate] = useState(0);

  // Force component to re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language change detected in Footer");
      setForceUpdate((prev) => prev + 1);
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex justify-between ">
              <img
                src={rayLogo}
                alt="Raay Center Logo"
                className="h-12 mb-4 brightness-0 invert"
              />

              <img src={maarifaLogo} className="h-14 mb-4 md:hidden" alt="" />
            </div>

            <p className="text-gray-400 text-sm">
              <TranslatedText
                textKey="footer.description"
                defaultText="شركة سعودية تستلهم الحاجة إلى مواكبة التطورات والتقنية لبناء وتطوير مهارات العنصر البشري من خلال برامج التدريب والاستشارات."
              />
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              <TranslatedText
                textKey="footer.links"
                defaultText="روابط سريعة"
              />
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="about-us"
                  className="hover:text-white transition-colors"
                >
                  <TranslatedText textKey="footer.about" defaultText="من نحن" />
                </a>
              </li>
              <li>
                <a
                  href="programs"
                  className="hover:text-white transition-colors"
                >
                  <TranslatedText
                    textKey="footer.programs"
                    defaultText="البرامج التدريبية"
                  />
                </a>
              </li>
              <li>
                <a
                  href="policies"
                  className="hover:text-white transition-colors"
                >
                  <TranslatedText
                    textKey="footer.policies"
                    defaultText="السياسات والشروط"
                  />
                </a>
              </li>
              <li>
                <a
                  href="consulting"
                  className="hover:text-white transition-colors"
                >
                  <TranslatedText
                    textKey="footer.consultations"
                    defaultText="الاستشارات"
                  />
                </a>
              </li>
              <li>
                <a
                  href="contact"
                  className="hover:text-white transition-colors"
                >
                  <TranslatedText
                    textKey="footer.contact"
                    defaultText="تواصل معنا"
                  />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              <TranslatedText textKey="footer.tracks" defaultText="المسارات" />
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#tracks"
                  className="hover:text-white transition-colors"
                >
                  <TranslatedText
                    textKey="tracks.cyber-security"
                    defaultText="الأمن السيبراني"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#tracks"
                  className="hover:text-white transition-colors"
                >
                  <TranslatedText
                    textKey="tracks.digital-transformation"
                    defaultText="التحول الرقمي"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#tracks"
                  className="hover:text-white transition-colors"
                >
                  <TranslatedText
                    textKey="tracks.artificial-intelligence"
                    defaultText="الذكاء الاصطناعي"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#tracks"
                  className="hover:text-white transition-colors"
                >
                  <TranslatedText
                    textKey="tracks.data-science"
                    defaultText="تحليل المخاطر"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#tracks"
                  className="hover:text-white transition-colors"
                >
                  <TranslatedText
                    textKey="tracks.organizational-transformation"
                    defaultText="التميز المؤسسي"
                  />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              <TranslatedText
                textKey="footer.connect"
                defaultText="تواصل معنا"
              />
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <FaMapMarkerAlt
                  className={`w-5 text-white ${
                    language === "ar" ? "ml-2" : "mr-2"
                  } mt-1`}
                />
                <span>
                  <TranslatedText
                    textKey="contact.info.address.text"
                    defaultText="طريق الإمام عبدالله بن سعود بن عبدالعزيز الفرعي رقم المبني 2085 الدور الثالث مكتب47"
                  />
                </span>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt
                  className={`w-5 text-white ${
                    language === "ar" ? "ml-2" : "mr-2"
                  } mt-1`}
                />
                <span dir="ltr" className="ltr:text-left">
                  0112400807
                </span>
              </li>
              <li className="flex items-start">
                <FaWhatsapp
                  className={`w-5 text-[#25d366] ${
                    language === "ar" ? "ml-2" : "mr-2"
                  } mt-1`}
                />
                <a
                  href="https://wa.me/966530023285"
                  target="_blank"
                  rel="noreferrer"
                  dir="ltr"
                  className="hover:text-[#25d366] transition-colors ltr:text-left"
                >
                  0530023285
                </a>
              </li>
              <li className="flex items-start">
                <FaEnvelope
                  className={`w-5 text-white ${
                    language === "ar" ? "ml-2" : "mr-2"
                  } mt-1`}
                />
                <span>info@raay.sa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <TranslatedText
                textKey="footer.rights"
                defaultText={`© ${currentYear} مركز راي للتدريب والاستشارات. جميع الحقوق محفوظة`}
              />
            </div>
            <p className="mx-2"> • </p>

            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              {language === "ar" ? (
                <>
                  تطوير شركه تقنيات الفضاء{" "}
                  <a
                    href="https://esol.sa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition-colors underline"
                  >
                    ESOL
                  </a>
                </>
              ) : (
                <>
                  RAY TRAINING & CONSULTING CENTER -{" "}
                  <a
                    href="https://esol.sa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition-colors underline"
                  >
                    ESOL
                  </a>
                </>
              )}
            </div>
          </div>

          <div
            className={`flex ${
              language === "ar" ? "space-x-4 space-x-reverse" : "space-x-4"
            }`}
          >
            {/* <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SiX />
            </a> */}
            <a
              href="https://www.linkedin.com/company/knowledge-building-company-and-ray-training-center/about/?viewAsMember=true"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedinIn />
            </a>
            {/* <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaInstagram />
            </a> */}
            {/* <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaYoutube />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

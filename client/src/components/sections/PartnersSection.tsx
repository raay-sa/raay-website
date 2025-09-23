// src/components/sections/PartnersSection.tsx
import { partners } from "@/data/partners";
import PartnerCard from "@/components/ui/partner-card";
import { TranslatedText } from "@/components/ui/translated-text";
import { useI18nStore } from "@/lib/i18n";
import { motion } from "framer-motion";
import PartnersCarousel from "@/components/ui/partners-carousel";

export default function PartnersSection() {
  const { language } = useI18nStore();
  const isRTL = language === "ar";

  const partnerList = partners.filter((p) => p.type === "partner");
  const clientsList = partners.filter((p) => p.type === "client");

  return (
    <section
      id="partners"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Partners */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#2a2665] section-heading mb-3"
          >
            <TranslatedText
              textKey="partners.title"
              defaultText="شركاؤنا الاستراتيجيون"
            />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-3xl mx-auto"
          >
            <TranslatedText
              textKey="partners.description"
              defaultText="نفخر بشراكاتنا الاستراتيجية مع مؤسسات وشركات رائدة في مختلف المجالات"
            />
          </motion.p>
        </div>

        <PartnersCarousel
          items={partnerList}
          renderItem={(item) => <PartnerCard partner={item} />}
          ariaLabel={isRTL ? "شركاؤنا" : "Partners"}
          rtl={isRTL}
        />

        {/* Clients */}
        <div className="text-center mt-20 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#2a2665] section-heading mb-3"
          >
            <TranslatedText
              textKey="partners.clientsTitle"
              defaultText="عملاء مركز راي"
            />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-3xl mx-auto"
          >
            <TranslatedText
              textKey="partners.clientsDescription"
              defaultText="شركات وجهات حكومية وخاصة وثقت بنا لتقديم التدريب والاستشارات"
            />
          </motion.p>
        </div>

        <PartnersCarousel
          items={clientsList}
          renderItem={(item) => <PartnerCard partner={item} />}
          ariaLabel={isRTL ? "عملاؤنا" : "Clients"}
          rtl={isRTL}
        />
      </div>
    </section>
  );
}

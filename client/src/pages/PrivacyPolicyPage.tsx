import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [, navigate] = useLocation();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#2a2665] mb-4"
          >
            سياسة الخصوصية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-3xl mx-auto text-lg"
          >
            تلتزم مركز راي بحماية خصوصية بياناتك الشخصية وتوضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك
          </motion.p>
        </div>

        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-[#2a2665] hover:bg-[#2a2665]/10 mb-6"
            onClick={() => navigate("/")}
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة إلى الرئيسية
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-[#2a2665] mb-4">مقدمة</h2>
            <p className="mb-6">
              شكراً لزيارتك موقع مركز راي للتدريب والاستشارات. نحن نقدر ثقتك ونلتزم بحماية خصوصيتك. تصف سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا للمعلومات التي تقدمها لنا عند استخدام موقعنا ومنصتنا التدريبية.
            </p>

            <h2 className="text-2xl font-bold text-[#2a2665] mb-4">المعلومات التي نجمعها</h2>
            <p className="mb-4">نقوم بجمع المعلومات التالية:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>المعلومات الشخصية: الاسم، العنوان، البريد الإلكتروني، رقم الهاتف.</li>
              <li>بيانات التسجيل: معلومات الحساب ومعلومات الدفع (في حالة شراء برامج تدريبية).</li>
              <li>بيانات الاستخدام: كيفية استخدامك لموقعنا ومنصتنا التدريبية.</li>
              <li>معلومات الجهاز: نوع المتصفح، نظام التشغيل، وعنوان IP.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#2a2665] mb-4">كيفية استخدام المعلومات</h2>
            <p className="mb-4">نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>توفير وتحسين خدماتنا التدريبية والاستشارية.</li>
              <li>إدارة حسابك والتواصل معك بخصوص البرامج التدريبية.</li>
              <li>إرسال معلومات عن البرامج والخدمات الجديدة (في حالة موافقتك على ذلك).</li>
              <li>تحليل كيفية استخدام موقعنا ومنصتنا لتحسين تجربة المستخدم.</li>
              <li>الالتزام بالمتطلبات القانونية والتنظيمية.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#2a2665] mb-4">حماية المعلومات</h2>
            <p className="mb-6">
              نحن نتخذ إجراءات أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف. نستخدم بروتوكولات التشفير وجدران الحماية ونظم أمنية أخرى لحماية بياناتك.
            </p>

            <h2 className="text-2xl font-bold text-[#2a2665] mb-4">مشاركة المعلومات</h2>
            <p className="mb-4">لا نبيع أو نؤجر أو نتاجر بمعلوماتك الشخصية مع أطراف ثالثة. قد نشارك معلوماتك في الحالات التالية:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>مع مقدمي الخدمات الذين يساعدوننا في تشغيل موقعنا ومنصتنا التدريبية.</li>
              <li>للامتثال للالتزامات القانونية أو الاستجابة للإجراءات القانونية.</li>
              <li>لحماية حقوقنا أو ممتلكاتنا أو سلامة مستخدمينا أو الجمهور.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#2a2665] mb-4">حقوقك</h2>
            <p className="mb-4">لديك الحقوق التالية فيما يتعلق بمعلوماتك الشخصية:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>الوصول إلى معلوماتك الشخصية وتصحيحها.</li>
              <li>طلب حذف معلوماتك الشخصية.</li>
              <li>الاعتراض على معالجة معلوماتك الشخصية.</li>
              <li>سحب موافقتك على استخدام معلوماتك الشخصية.</li>
              <li>تقديم شكوى إلى السلطات المختصة.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#2a2665] mb-4">التعديلات على سياسة الخصوصية</h2>
            <p className="mb-6">
              قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية عن طريق نشر إشعار بارز على موقعنا أو إرسال إشعار إليك عبر البريد الإلكتروني. تاريخ آخر تحديث لهذه السياسة هو 15 أبريل 2023.
            </p>

            <h2 className="text-2xl font-bold text-[#2a2665] mb-4">الاتصال بنا</h2>
            <p className="mb-6">
              إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، يرجى الاتصال بنا على البريد الإلكتروني: <a href="mailto:info@raay.sa" className="text-[#b29567] hover:underline">info@raay.sa</a> أو الاتصال بنا على الرقم: <span className="font-bold">0112400807</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
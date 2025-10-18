import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowRight, Construction, Clock, Rocket } from "lucide-react";

export default function UnderDevelopmentPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a2665] via-[#3d3a7c] to-[#b29567] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            {/* Main Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              className="w-32 h-32 bg-gradient-to-br from-[#2a2665] to-[#b29567] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
            >
              <Construction className="w-16 h-16 text-white" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              الموقع قيد التطوير
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              نحن نعمل بجد لتطوير هذه الصفحة وتقديم تجربة أفضل لك. 
              سنكون متاحين قريباً بمحتوى رائع ومفيد.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  قريباً جداً
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  نعمل على إطلاق هذه الصفحة في أقرب وقت ممكن
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  محتوى متميز
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  نعدك بمحتوى عالي الجودة ومفيد للغاية
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Construction className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  تطوير مستمر
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  نحسن من تجربتك باستمرار
                </p>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">تقدم التطوير</span>
                <span className="text-sm font-medium text-[#2a2665]">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ delay: 1.3, duration: 1.5, ease: "easeOut" }}
                  className="bg-gradient-to-r from-[#2a2665] to-[#b29567] h-3 rounded-full"
                />
              </div>
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex justify-center items-center"
            >
              <Button
                onClick={() => navigate("/")}
                className="bg-[#2a2665] hover:bg-[#2a2665]/90 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                العودة للرئيسية
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Footer Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <p className="text-gray-500 text-sm">
                شكراً لصبرك وثقتك بنا. نتطلع لخدمتك قريباً! 🚀
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

import { Helmet } from "react-helmet";
import { useI18nStore } from "@/lib/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  phone: z.string().min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
  nationalId: z.string().min(10, { message: "رقم الهوية يجب أن يكون 10 أرقام" }),
  education: z.string().min(2, { message: "يرجى إدخال المؤهل التعليمي" }),
  fieldOfInterest: z.string().min(1, { message: "يرجى اختيار مجال الاهتمام" }),
  experience: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function StudentRegistrationPage() {
  const { language } = useI18nStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      nationalId: "",
      education: "",
      fieldOfInterest: "",
      experience: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    try {
      // Here would be the API call to register the student
      console.log("Form values:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم إرسال طلب التسجيل بنجاح",
        description: "سنقوم بالتواصل معك قريبًا",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إرسال طلب التسجيل، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'التسجيل كطالب | مركز راي للتدريب والاستشارات' : 'Student Registration | Ray Training & Consulting Center'}</title>
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">التسجيل كطالب</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            انضم إلى آلاف المتدربين الذين طوروا مهاراتهم وحياتهم المهنية مع مركز راي للتدريب والاستشارات
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#2a2665] mb-6">مميزات التسجيل كطالب</h2>
              
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#2a2665] font-bold ml-2">•</span>
                  <span>الوصول إلى برامج تدريبية متخصصة في مختلف المجالات</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2a2665] font-bold ml-2">•</span>
                  <span>شهادات معتمدة معترف بها محلياً ودولياً</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2a2665] font-bold ml-2">•</span>
                  <span>فرصة التعلم على يد نخبة من المدربين والخبراء</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2a2665] font-bold ml-2">•</span>
                  <span>إمكانية الوصول إلى المحتوى التدريبي أونلاين</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2a2665] font-bold ml-2">•</span>
                  <span>فرص وظيفية من خلال شبكة شركاء مركز راي</span>
                </li>
              </ul>
              
              <div className="bg-gray-50 rounded-lg p-6 mt-8 border border-gray-200">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">تواصل معنا</h3>
                <p className="text-gray-600 mb-4">إذا كان لديك أي استفسارات حول عملية التسجيل، يرجى التواصل معنا:</p>
                <div className="text-gray-700">
                  <p>البريد الإلكتروني: info@raay.sa</p>
                  <p>الهاتف: +966 XXXXXXXXX</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-[#2a2665] mb-6 text-center">نموذج التسجيل</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="الاسم الكامل" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البريد الإلكتروني <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="example@email.com" type="email" {...field} />
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
                          <FormLabel>رقم الجوال <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="+966XXXXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="nationalId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهوية <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل رقم الهوية" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المؤهل التعليمي <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="المؤهل التعليمي" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fieldOfInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>مجال الاهتمام <span className="text-red-500">*</span></FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر مجال الاهتمام" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="artificial-intelligence">الذكاء الاصطناعي</SelectItem>
                            <SelectItem value="cyber-security">الأمن السيبراني</SelectItem>
                            <SelectItem value="digital-transformation">التحول الرقمي</SelectItem>
                            <SelectItem value="leadership">القيادة والإدارة</SelectItem>
                            <SelectItem value="project-management">إدارة المشاريع</SelectItem>
                            <SelectItem value="risk-management">إدارة المخاطر</SelectItem>
                            <SelectItem value="other">أخرى</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الخبرات السابقة</FormLabel>
                        <FormControl>
                          <Input placeholder="الخبرات السابقة (اختياري)" {...field} />
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
                        <FormLabel>ملاحظات إضافية</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="أي معلومات إضافية ترغب في إضافتها"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#2a2665] hover:bg-[#2a2665]/90 text-white py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب التسجيل'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
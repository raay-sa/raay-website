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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  phone: z.string().min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
  specialization: z.string().min(2, { message: "يرجى إدخال التخصص" }),
  expertise: z.string().min(1, { message: "يرجى اختيار مجال الخبرة" }),
  yearsOfExperience: z.string().min(1, { message: "يرجى اختيار سنوات الخبرة" }),
  cv: z.string().min(1, { message: "يرجى إرفاق السيرة الذاتية" }),
  bio: z.string().min(10, { message: "يرجى كتابة نبذة عنك (10 أحرف على الأقل)" }),
  certifications: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ExpertRegistrationPage() {
  const { language } = useI18nStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialization: "",
      expertise: "",
      yearsOfExperience: "",
      cv: "",
      bio: "",
      certifications: "",
      acceptTerms: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    try {
      // Here would be the API call to register the expert
      console.log("Form values:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم إرسال طلب التسجيل بنجاح",
        description: "سنقوم بمراجعة طلبك والتواصل معك قريبًا",
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
        <title>{language === 'ar' ? 'التسجيل كخبير | مركز راي للتدريب والاستشارات' : 'Expert Registration | Ray Training & Consulting Center'}</title>
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">التسجيل كخبير</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            انضم إلى فريق الخبراء والمدربين في مركز راي للتدريب والاستشارات وشارك خبراتك مع المتدربين
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#2a2665] mb-6">لماذا تنضم كخبير إلى مركز راي؟</h2>
              
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#2a2665] font-bold ml-2">•</span>
                  <span>فرصة للعمل مع واحد من أفضل مراكز التدريب والاستشارات في السعودية</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2a2665] font-bold ml-2">•</span>
                  <span>الوصول إلى شبكة واسعة من المؤسسات والشركات الرائدة</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2a2665] font-bold ml-2">•</span>
                  <span>فرص لتقديم برامج تدريبية متخصصة في مجال خبرتك</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2a2665] font-bold ml-2">•</span>
                  <span>تطوير مهاراتك التدريبية والاستشارية من خلال برامج مخصصة</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2a2665] font-bold ml-2">•</span>
                  <span>عوائد مالية مجزية ونظام مكافآت متميز</span>
                </li>
              </ul>
              
              <div className="bg-gray-50 rounded-lg p-6 mt-8 border border-gray-200">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">معايير اختيار الخبراء</h3>
                <p className="text-gray-600 mb-4">نحن نبحث عن خبراء متميزين يمتلكون:</p>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>خبرة عملية لا تقل عن 3 سنوات في المجال</li>
                  <li>شهادات مهنية معتمدة في التخصص</li>
                  <li>مهارات تواصل وتدريب متميزة</li>
                  <li>القدرة على تصميم وتقديم برامج تدريبية فعالة</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-[#2a2665] mb-6 text-center">نموذج طلب الانضمام كخبير</h2>
              
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
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>التخصص <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="التخصص الدقيق" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expertise"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>مجال الخبرة <span className="text-red-500">*</span></FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر مجال الخبرة" />
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
                      name="yearsOfExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>سنوات الخبرة <span className="text-red-500">*</span></FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر سنوات الخبرة" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-3">1-3 سنوات</SelectItem>
                              <SelectItem value="4-6">4-6 سنوات</SelectItem>
                              <SelectItem value="7-10">7-10 سنوات</SelectItem>
                              <SelectItem value="10+">أكثر من 10 سنوات</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="cv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>السيرة الذاتية <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              field.onChange(e.target.files[0].name);
                            }
                          }} />
                        </FormControl>
                        <p className="text-xs text-gray-500">يرجى إرفاق السيرة الذاتية بصيغة PDF أو Word</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نبذة عنك <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="اكتب نبذة مختصرة عن خبراتك ومؤهلاتك"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الشهادات والاعتمادات المهنية</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="اذكر الشهادات والاعتمادات المهنية التي حصلت عليها"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            أوافق على الشروط والأحكام وسياسة الخصوصية <span className="text-red-500">*</span>
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#2a2665] hover:bg-[#2a2665]/90 text-white py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب الانضمام'}
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
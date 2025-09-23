import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { programs } from "@/data/programs";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Award,
  Clock,
  Calendar,
  BarChart,
  CheckCircle,
  User,
  FileText,
  Bell,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function TraineeDashboardPage() {
  const [, navigate] = useLocation();
  // Simple way to parse query parameters from URL for wouter 2.10.1
  const getUrlParams = () => {
    const search = window.location.search;
    return new URLSearchParams(search);
  };
  const params = getUrlParams();
  const registerProgramId = params.get('register') ? parseInt(params.get('register') || '0') : null;
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // This is a mock of enrolled programs for the dashboard demo
  const [enrolledPrograms, setEnrolledPrograms] = useState([
    {
      id: 1,
      programId: 1,
      title: programs[0].title,
      image: programs[0].image,
      progress: 75,
      nextSession: "الثلاثاء، 10 مايو 2023",
      startDate: "15 أبريل 2023",
      endDate: "15 يوليو 2023",
      completed: false,
    },
    {
      id: 2,
      programId: 3,
      title: programs[2].title,
      image: programs[2].image,
      progress: 100,
      startDate: "10 يناير 2023",
      endDate: "10 مارس 2023",
      completed: true,
    },
  ]);

  useEffect(() => {
    // Handle registering for a program
    if (registerProgramId && !showLogin) {
      // Check if already logged in
      if (!isLoggedIn) {
        setShowLogin(true);
      } else {
        // Register for the program
        const programToRegister = programs.find(p => p.id === registerProgramId);
        if (programToRegister && !enrolledPrograms.some(ep => ep.programId === registerProgramId)) {
          const newEnrollment = {
            id: enrolledPrograms.length + 1,
            programId: registerProgramId,
            title: programToRegister.title,
            image: programToRegister.image,
            progress: 0,
            nextSession: "الاثنين، 15 مايو 2023",
            startDate: "15 مايو 2023",
            endDate: "15 أغسطس 2023",
            completed: false,
          };
          
          setEnrolledPrograms([...enrolledPrograms, newEnrollment]);
          setRegistrationSuccess(true);
          
          // Clear the URL param
          navigate("/trainee-dashboard", { replace: true });
        }
      }
    }
  }, [registerProgramId, isLoggedIn, showLogin, navigate, enrolledPrograms]);

  // This is a mock login function
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  if (showLogin) {
    return (
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-[#2a2665] text-white">
                <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a2665]" 
                    defaultValue="trainee@example.com"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                  <input 
                    type="password" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a2665]" 
                    defaultValue="password123"
                  />
                </div>
                <Button 
                  className="w-full bg-[#b29567] hover:bg-[#b29567]/90 text-white"
                  onClick={handleLogin}
                >
                  تسجيل الدخول
                </Button>
                <div className="mt-4 text-center text-sm text-gray-600">
                  ليس لديك حساب؟{" "}
                  <a href="#" className="text-[#2a2665] hover:underline">إنشاء حساب جديد</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* الشريط الجانبي */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-lg mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src="/src/assets/team-photos/saudi-person1.jpg" />
                      <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-[#2a2665]">عبدالله الأحمد</h3>
                    <p className="text-gray-600 mb-4">متدرب في مركز راي</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#2a2665] text-[#2a2665]"
                      onClick={() => navigate('/contact')}
                    >
                      تحديث الملف الشخصي
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-0">
                  <div className="py-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-6 py-4 text-right ${activeTab === 'overview' ? 'text-[#b29567] bg-[#b29567]/10' : 'text-gray-700'}`}
                      onClick={() => setActiveTab('overview')}
                    >
                      <BarChart className="ml-3 h-5 w-5" />
                      <span>نظرة عامة</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-6 py-4 text-right ${activeTab === 'programs' ? 'text-[#b29567] bg-[#b29567]/10' : 'text-gray-700'}`}
                      onClick={() => setActiveTab('programs')}
                    >
                      <BookOpen className="ml-3 h-5 w-5" />
                      <span>البرامج التدريبية</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-6 py-4 text-right ${activeTab === 'calendar' ? 'text-[#b29567] bg-[#b29567]/10' : 'text-gray-700'}`}
                      onClick={() => setActiveTab('calendar')}
                    >
                      <Calendar className="ml-3 h-5 w-5" />
                      <span>الجدول الزمني</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-6 py-4 text-right ${activeTab === 'certificates' ? 'text-[#b29567] bg-[#b29567]/10' : 'text-gray-700'}`}
                      onClick={() => setActiveTab('certificates')}
                    >
                      <Award className="ml-3 h-5 w-5" />
                      <span>الشهادات</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-6 py-4 text-right text-gray-700"
                      onClick={() => navigate('/training')}
                    >
                      <LogOut className="ml-3 h-5 w-5" />
                      <span>الخروج</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {registrationSuccess && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-green-800">تم التسجيل بنجاح</AlertTitle>
                  <AlertDescription className="text-green-700">
                    تم تسجيلك بنجاح في البرنامج التدريبي. يمكنك متابعة تقدمك من لوحة التحكم.
                  </AlertDescription>
                </Alert>
              )}

              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="hidden">
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="programs">البرامج التدريبية</TabsTrigger>
                  <TabsTrigger value="calendar">الجدول الزمني</TabsTrigger>
                  <TabsTrigger value="certificates">الشهادات</TabsTrigger>
                </TabsList>

                {/* نظرة عامة */}
                <TabsContent value="overview">
                  <Card className="border-none shadow-lg mb-6">
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#2a2665]">أهلاً بك، عبدالله</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#2a2665]/10 p-4 rounded-lg flex items-center">
                          <div className="bg-[#2a2665] rounded-full p-3 ml-3">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">البرامج المسجلة</p>
                            <p className="text-xl font-bold text-[#2a2665]">{enrolledPrograms.length}</p>
                          </div>
                        </div>
                        <div className="bg-[#b29567]/10 p-4 rounded-lg flex items-center">
                          <div className="bg-[#b29567] rounded-full p-3 ml-3">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">الشهادات</p>
                            <p className="text-xl font-bold text-[#b29567]">1</p>
                          </div>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg flex items-center">
                          <div className="bg-green-600 rounded-full p-3 ml-3">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">ساعات التعلم</p>
                            <p className="text-xl font-bold text-green-600">24</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-[#2a2665] mb-4">البرامج النشطة</h3>
                      {enrolledPrograms
                        .filter(program => !program.completed)
                        .map(program => (
                          <div key={program.id} className="mb-6 border border-gray-200 rounded-lg p-4">
                            <div className="flex flex-col md:flex-row">
                              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                                <img
                                  src={program.image}
                                  alt={program.title}
                                  className="rounded-lg w-full h-32 object-cover"
                                />
                              </div>
                              <div className="w-full md:w-3/4 md:pr-6">
                                <h4 className="text-lg font-bold text-[#2a2665] mb-2">{program.title}</h4>
                                <div className="mb-2">
                                  <p className="text-sm text-gray-600">التقدم: {program.progress}%</p>
                                  <Progress value={program.progress} className="h-2 mt-1" />
                                </div>
                                <div className="flex flex-wrap">
                                  <div className="w-full md:w-1/2 flex items-center mt-2">
                                    <Calendar className="h-4 w-4 text-[#b29567] ml-2" />
                                    <span className="text-sm text-gray-600">الجلسة القادمة: {program.nextSession}</span>
                                  </div>
                                  <div className="w-full md:w-1/2 flex items-center mt-2">
                                    <Clock className="h-4 w-4 text-[#b29567] ml-2" />
                                    <span className="text-sm text-gray-600">تاريخ الانتهاء: {program.endDate}</span>
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <Button 
                                    className="bg-[#2a2665] hover:bg-[#2a2665]/90 text-white"
                                    onClick={() => navigate(`/program/${program.programId}`)}
                                  >
                                    متابعة التعلم
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      
                      <h3 className="text-xl font-bold text-[#2a2665] mb-4">الإشعارات الأخيرة</h3>
                      <div className="space-y-3">
                        <div className="flex items-start p-3 border-b border-gray-100">
                          <Bell className="w-5 h-5 text-[#b29567] ml-3 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-800">تم إضافة جلسة جديدة</p>
                            <p className="text-gray-600 text-sm">تمت إضافة جلسة جديدة إلى برنامج {enrolledPrograms[0].title}</p>
                            <p className="text-[#b29567] text-xs mt-1">منذ يومين</p>
                          </div>
                        </div>
                        <div className="flex items-start p-3 border-b border-gray-100">
                          <FileText className="w-5 h-5 text-[#b29567] ml-3 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-800">مواد تدريبية جديدة</p>
                            <p className="text-gray-600 text-sm">تمت إضافة مواد جديدة للجلسة الرابعة</p>
                            <p className="text-[#b29567] text-xs mt-1">منذ 3 أيام</p>
                          </div>
                        </div>
                        <div className="flex items-start p-3">
                          <Award className="w-5 h-5 text-[#b29567] ml-3 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-800">شهادة جديدة</p>
                            <p className="text-gray-600 text-sm">تم إصدار شهادة إتمام {enrolledPrograms[1].title}</p>
                            <p className="text-[#b29567] text-xs mt-1">منذ أسبوع</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* البرامج التدريبية */}
                <TabsContent value="programs">
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#2a2665]">البرامج التدريبية</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-[#2a2665] mb-4">البرامج النشطة</h3>
                        {enrolledPrograms
                          .filter(program => !program.completed)
                          .map(program => (
                            <div key={program.id} className="mb-6 border border-gray-200 rounded-lg p-4">
                              <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                                  <img
                                    src={program.image}
                                    alt={program.title}
                                    className="rounded-lg w-full h-32 object-cover"
                                  />
                                </div>
                                <div className="w-full md:w-3/4 md:pr-6">
                                  <h4 className="text-lg font-bold text-[#2a2665] mb-2">{program.title}</h4>
                                  <div className="mb-2">
                                    <p className="text-sm text-gray-600">التقدم: {program.progress}%</p>
                                    <Progress value={program.progress} className="h-2 mt-1" />
                                  </div>
                                  <div className="flex flex-wrap">
                                    <div className="w-full md:w-1/2 flex items-center mt-2">
                                      <Calendar className="h-4 w-4 text-[#b29567] ml-2" />
                                      <span className="text-sm text-gray-600">تاريخ البدء: {program.startDate}</span>
                                    </div>
                                    <div className="w-full md:w-1/2 flex items-center mt-2">
                                      <Clock className="h-4 w-4 text-[#b29567] ml-2" />
                                      <span className="text-sm text-gray-600">تاريخ الانتهاء: {program.endDate}</span>
                                    </div>
                                  </div>
                                  <div className="mt-4 flex space-x-3 space-x-reverse">
                                    <Button 
                                      className="bg-[#2a2665] hover:bg-[#2a2665]/90 text-white"
                                      onClick={() => navigate(`/program/${program.programId}`)}
                                    >
                                      متابعة التعلم
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      className="border-[#2a2665] text-[#2a2665]"
                                      onClick={() => navigate(`/program/${program.programId}`)}
                                    >
                                      تفاصيل البرنامج
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#2a2665] mb-4">البرامج المكتملة</h3>
                        {enrolledPrograms
                          .filter(program => program.completed)
                          .map(program => (
                            <div key={program.id} className="mb-6 border border-gray-200 rounded-lg p-4">
                              <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                                  <img
                                    src={program.image}
                                    alt={program.title}
                                    className="rounded-lg w-full h-32 object-cover"
                                  />
                                </div>
                                <div className="w-full md:w-3/4 md:pr-6">
                                  <div className="flex justify-between items-start">
                                    <h4 className="text-lg font-bold text-[#2a2665] mb-2">{program.title}</h4>
                                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">مكتمل</span>
                                  </div>
                                  <div className="mb-2">
                                    <p className="text-sm text-gray-600">التقدم: {program.progress}%</p>
                                    <Progress value={program.progress} className="h-2 mt-1" />
                                  </div>
                                  <div className="flex flex-wrap">
                                    <div className="w-full md:w-1/2 flex items-center mt-2">
                                      <Calendar className="h-4 w-4 text-[#b29567] ml-2" />
                                      <span className="text-sm text-gray-600">تاريخ البدء: {program.startDate}</span>
                                    </div>
                                    <div className="w-full md:w-1/2 flex items-center mt-2">
                                      <Clock className="h-4 w-4 text-[#b29567] ml-2" />
                                      <span className="text-sm text-gray-600">تاريخ الانتهاء: {program.endDate}</span>
                                    </div>
                                  </div>
                                  <div className="mt-4 flex space-x-3 space-x-reverse">
                                    <Button 
                                      variant="outline" 
                                      className="border-[#2a2665] text-[#2a2665]"
                                      onClick={() => navigate(`/program/${program.programId}`)}
                                    >
                                      تفاصيل البرنامج
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      className="text-[#b29567]"
                                      onClick={() => setActiveTab('certificates')}
                                    >
                                      <Award className="ml-2 h-4 w-4" />
                                      عرض الشهادة
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="mt-8 text-center">
                        <p className="text-gray-600 mb-4">ابحث عن المزيد من البرامج التدريبية التي تناسب اهتماماتك</p>
                        <Button 
                          className="bg-[#b29567] hover:bg-[#b29567]/90 text-white px-8 py-6 text-lg"
                          onClick={() => navigate('/training')}
                        >
                          استعراض البرامج التدريبية
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* الجدول الزمني */}
                <TabsContent value="calendar">
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#2a2665]">الجدول الزمني</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-[#2a2665] mb-4">الجلسات القادمة</h3>
                        <div className="space-y-4">
                          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-bold text-[#2a2665]">{enrolledPrograms[0].title} - الجلسة 5</h4>
                                <p className="text-gray-600">التدريب العملي على تطبيق المفاهيم</p>
                              </div>
                              <div className="text-center">
                                <div className="bg-[#2a2665] text-white rounded-t-lg px-3 py-1 text-sm">مايو</div>
                                <div className="bg-gray-100 rounded-b-lg px-3 py-1 text-lg font-bold text-[#2a2665]">10</div>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-between text-sm">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-[#b29567] ml-2" />
                                <span className="text-gray-600">5:00 م - 7:00 م</span>
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-[#b29567] ml-2" />
                                <span className="text-gray-600">المدرب: محمد العمري</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-bold text-[#2a2665]">{enrolledPrograms[0].title} - الجلسة 6</h4>
                                <p className="text-gray-600">مراجعة شاملة وتطبيق متقدم</p>
                              </div>
                              <div className="text-center">
                                <div className="bg-[#2a2665] text-white rounded-t-lg px-3 py-1 text-sm">مايو</div>
                                <div className="bg-gray-100 rounded-b-lg px-3 py-1 text-lg font-bold text-[#2a2665]">17</div>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-between text-sm">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-[#b29567] ml-2" />
                                <span className="text-gray-600">5:00 م - 7:00 م</span>
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-[#b29567] ml-2" />
                                <span className="text-gray-600">المدرب: محمد العمري</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-[#2a2665] mb-4">الجلسات السابقة</h3>
                        <div className="space-y-4">
                          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-bold text-[#2a2665]">{enrolledPrograms[0].title} - الجلسة 4</h4>
                                <p className="text-gray-600">تطبيقات متقدمة في المجال</p>
                              </div>
                              <div className="text-center">
                                <div className="bg-gray-400 text-white rounded-t-lg px-3 py-1 text-sm">مايو</div>
                                <div className="bg-gray-100 rounded-b-lg px-3 py-1 text-lg font-bold text-gray-500">3</div>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-between text-sm">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-500 ml-2" />
                                <span className="text-gray-600">5:00 م - 7:00 م</span>
                              </div>
                              <div>
                                <Button variant="ghost" size="sm" className="text-[#b29567] hover:text-[#b29567]/80">
                                  مشاهدة التسجيل
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-bold text-[#2a2665]">{enrolledPrograms[0].title} - الجلسة 3</h4>
                                <p className="text-gray-600">تطبيقات عملية وتمارين</p>
                              </div>
                              <div className="text-center">
                                <div className="bg-gray-400 text-white rounded-t-lg px-3 py-1 text-sm">أبريل</div>
                                <div className="bg-gray-100 rounded-b-lg px-3 py-1 text-lg font-bold text-gray-500">26</div>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-between text-sm">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-500 ml-2" />
                                <span className="text-gray-600">5:00 م - 7:00 م</span>
                              </div>
                              <div>
                                <Button variant="ghost" size="sm" className="text-[#b29567] hover:text-[#b29567]/80">
                                  مشاهدة التسجيل
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* الشهادات */}
                <TabsContent value="certificates">
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#2a2665]">الشهادات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-[#2a2665] mb-4">الشهادات الممنوحة</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="bg-[#2a2665] text-white p-4 flex justify-between items-center">
                              <h4 className="font-bold">{enrolledPrograms[1].title}</h4>
                              <Award className="h-6 w-6" />
                            </div>
                            <div className="p-6">
                              <div className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center h-40 mb-4">
                                <img 
                                  src="/src/assets/images/rayLogo.webp" 
                                  alt="شعار مركز راي" 
                                  className="h-20"
                                />
                              </div>
                              <div className="text-center mb-4">
                                <p className="text-gray-600">تم منح هذه الشهادة إلى</p>
                                <p className="font-bold text-lg text-[#2a2665]">عبدالله الأحمد</p>
                                <p className="text-gray-600 text-sm">لإتمامه برنامج {enrolledPrograms[1].title} بنجاح</p>
                                <p className="text-gray-600 text-sm">تاريخ الإصدار: 15 مارس 2023</p>
                              </div>
                              <div className="flex justify-center space-x-3 space-x-reverse">
                                <Button 
                                  className="bg-[#b29567] hover:bg-[#b29567]/90 text-white"
                                >
                                  تحميل الشهادة
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="border-[#2a2665] text-[#2a2665]"
                                >
                                  مشاركة
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-[#2a2665] mb-4">الشهادات القادمة</h3>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:ml-6">
                              <div className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center h-32">
                                <img 
                                  src="/src/assets/images/rayLogo.webp" 
                                  alt="شعار مركز راي" 
                                  className="h-16 opacity-40"
                                />
                              </div>
                            </div>
                            <div className="w-full md:w-2/3">
                              <h4 className="font-bold text-[#2a2665] mb-2">{enrolledPrograms[0].title}</h4>
                              <p className="text-gray-600 mb-3">
                                أكمل البرنامج للحصول على الشهادة. نسبة الإكمال الحالية: {enrolledPrograms[0].progress}%
                              </p>
                              <Progress value={enrolledPrograms[0].progress} className="h-2 mb-4" />
                              <Button 
                                className="bg-[#2a2665] hover:bg-[#2a2665]/90 text-white"
                                onClick={() => navigate(`/program/${enrolledPrograms[0].programId}`)}
                              >
                                متابعة التعلم
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
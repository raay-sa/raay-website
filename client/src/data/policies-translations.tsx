// client/src/data/policies-translations.tsx
import React from "react";

export interface PolicySection {
  id: number;
  titleAr: string;
  titleEn: string;
  contentAr: JSX.Element;
  contentEn: JSX.Element;
}

export const policySections: PolicySection[] = [
  {
    id: 1,
    titleAr: "المقدمة",
    titleEn: "Introduction",
    contentAr: (
      <>
        <p className="mb-3 leading-8">
          مرحبًا بكم في منصة <b>راي</b> للتدريب والتعليم الإلكتروني. مركز راي
          هو فرع شركة بناء المعرفة لحلول الأعمال، وهو منصة تدريبية واستشارية
          معتمدة من المؤسسة العامة للتعليم الفني والمهني ويطبق شروط وسياسات
          المركز الوطني للتعليم الإلكتروني في المملكة العربية السعودية. يلتزم
          المركز بتوفير تجربة تعليمية آمنة ومتوافقة مع الأنظمة واللوائح،
          وتشكّل هذه الوثيقة اتفاقية قانونية ملزمة بينكم وبين منصة راي. يُرجى
          قراءة هذه الشروط بعناية قبل استخدام المنصة.
        </p>
      </>
    ),
    contentEn: (
      <>
        <p className="mb-3 leading-8">
          Welcome to the <b>Ray</b> e-learning and training platform. Ray Center
          is a branch of Bina Al-Ma'rifa Business Solutions Company, an accredited
          training and consulting platform approved by the General Organization for
          Technical and Vocational Training and applies the terms and policies of
          the National Center for E-Learning in the Kingdom of Saudi Arabia. The
          center is committed to providing a safe educational experience that
          complies with regulations and laws. This document constitutes a legally
          binding agreement between you and the Ray platform. Please read these
          terms carefully before using the platform.
        </p>
      </>
    ),
  },
  {
    id: 2,
    titleAr: "التعريفات",
    titleEn: "Definitions",
    contentAr: (
      <>
        <ul className="list-disc pr-6 space-y-2 leading-8">
          <li>
            <b>المنصة:</b> منصة "راي" للتعليم الإلكتروني، بما في ذلك الموقع
            الإلكتروني والتطبيقات والخدمات المرتبطة بها.
          </li>
          <li>
            <b>المستخدم:</b> أي شخص طبيعي أو اعتباري يقوم بالتسجيل في المنصة
            أو استخدام خدماتها.
          </li>
          <li>
            <b>المحتوى:</b> جميع المواد التعليمية، بما في ذلك النصوص، الصور،
            مقاطع الفيديو، التسجيلات الصوتية، البرامج التدريبية، الاختبارات،
            والمحتوى الآخر المتاح على المنصة.
          </li>
          <li>
            <b>الخدمات:</b> جميع الخدمات التي تقدمها المنصة، بما في ذلك
            الدورات التدريبية، الاستشارات، التقييمات، الاختبارات، والدعم
            الفني.
          </li>
          <li>
            <b>الطرف الثالث:</b> أي جهة خارجية تقدم خدمات أو محتوى عبر المنصة.
          </li>
          <li>
            <b>الشركة الأم:</b> شركة بناء المعرفة لحلول الأعمال، التي ينتمي
            إليها المركز.
          </li>
          <li>
            <b>خدمات الطرف الثالث:</b> أي خدمات إلكترونية أو منصات قد يتم
            الوصول إليها أو استخدامها عبر المنصة.
          </li>
        </ul>
      </>
    ),
    contentEn: (
      <>
        <ul className="list-disc pl-6 space-y-2 leading-8">
          <li>
            <b>Platform:</b> The "Ray" e-learning platform, including the website,
            applications, and associated services.
          </li>
          <li>
            <b>User:</b> Any natural or legal person who registers on the platform
            or uses its services.
          </li>
          <li>
            <b>Content:</b> All educational materials, including texts, images,
            videos, audio recordings, training programs, tests, and other content
            available on the platform.
          </li>
          <li>
            <b>Services:</b> All services provided by the platform, including
            training courses, consultations, assessments, tests, and technical
            support.
          </li>
          <li>
            <b>Third Party:</b> Any external entity that provides services or
            content through the platform.
          </li>
          <li>
            <b>Parent Company:</b> Bina Al-Ma'rifa Business Solutions Company,
            to which the center belongs.
          </li>
          <li>
            <b>Third-Party Services:</b> Any electronic services or platforms
            that may be accessed or used through the platform.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    titleAr: "نطاق التطبيق",
    titleEn: "Scope of Application",
    contentAr: (
      <>
        <p className="leading-8">
          تنطبق هذه الشروط والأحكام على جميع مستخدمي منصة "راي". يعتبر
          استخدامك للمنصة أو تسجيلك فيها أو وصولك إلى أي من خدماتها قبولاً
          صريحًا وغير مشروط لجميع البنود الواردة في هذه الوثيقة. إذا كنت لا
          توافق على أي من هذه الشروط، فيجب عليك التوقف عن استخدام المنصة
          فورًا.
        </p>
      </>
    ),
    contentEn: (
      <>
        <p className="leading-8">
          These terms and conditions apply to all users of the "Ray" platform.
          Your use of the platform, registration on it, or access to any of its
          services constitutes explicit and unconditional acceptance of all the
          provisions contained in this document. If you do not agree to any of
          these terms, you must stop using the platform immediately.
        </p>
      </>
    ),
  },
  {
    id: 4,
    titleAr: "شروط التسجيل والاستخدام",
    titleEn: "Registration and Usage Terms",
    contentAr: (
      <>
        <ol className="list-decimal pr-6 space-y-3 leading-8">
          <li>
            <b>متطلبات التسجيل:</b> يجب على المستخدمين تقديم معلومات دقيقة
            وكاملة عند التسجيل، ويقر المستخدم بأنه يبلغ من العمر 18 عامًا على
            الأقل، أو أنه حصل على موافقة ولي الأمر لاستخدام المنصة.
          </li>
          <li>
            <b>مسؤولية المستخدم:</b> يتحمل المستخدم المسؤولية الكاملة عن صحة
            المعلومات المقدمة ويلتزم بتحديثها عند الضرورة. الحساب شخصي ولا
            يجوز نقله أو مشاركته مع الآخرين.
          </li>
          <li>
            <b>سرية الحساب:</b> المستخدم مسؤول عن الحفاظ على سرية معلومات
            تسجيل الدخول الخاصة به، وهو مسؤول عن جميع الأنشطة التي تتم من خلال
            حسابه.
          </li>
          <li>
            <b>تعليق أو إلغاء الحساب:</b> تحتفظ منصة "راي" بالحق في تعليق أو
            إلغاء أي حساب يخالف هذه الشروط أو القوانين المعمول بها في المملكة
            العربية السعودية دون إشعار مسبق.
          </li>
        </ol>
      </>
    ),
    contentEn: (
      <>
        <ol className="list-decimal pl-6 space-y-3 leading-8">
          <li>
            <b>Registration Requirements:</b> Users must provide accurate and
            complete information when registering, and the user acknowledges that
            they are at least 18 years old, or have obtained parental consent to
            use the platform.
          </li>
          <li>
            <b>User Responsibility:</b> The user bears full responsibility for the
            accuracy of the information provided and commits to updating it when
            necessary. The account is personal and may not be transferred or shared
            with others.
          </li>
          <li>
            <b>Account Confidentiality:</b> The user is responsible for maintaining
            the confidentiality of their login information and is responsible for
            all activities that occur through their account.
          </li>
          <li>
            <b>Account Suspension or Cancellation:</b> The "Ray" platform reserves
            the right to suspend or cancel any account that violates these terms
            or applicable laws in the Kingdom of Saudi Arabia without prior notice.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 5,
    titleAr: "حقوق الملكية الفكرية",
    titleEn: "Intellectual Property Rights",
    contentAr: (
      <>
        <ol className="list-decimal pr-6 space-y-3 leading-8">
          <li>
            <b>ملكية المحتوى:</b> جميع الحقوق المتعلقة بالمحتوى المتاح على
            منصة "راي" ملكية حصرية للمركز أو الجهات المرخصة. يشمل ذلك النصوص
            والصور ومقاطع الفيديو والبرامج التدريبية والعروض التقديمية.
          </li>
          <li>
            <b>قيود الاستخدام:</b> يُمنع نسخ أو توزيع أو إعادة نشر أو تعديل أو
            استخدام أي جزء من المحتوى لأغراض تجارية أو غير تجارية دون الحصول
            على موافقة خطية مسبقة من المركز.
          </li>
          <li>
            <b>الإجراءات القانونية:</b> أي استخدام غير مصرح به للمحتوى يعرض
            المستخدم للمساءلة القانونية وفقًا لأنظمة حماية الملكية الفكرية في
            المملكة العربية السعودية.
          </li>
        </ol>
      </>
    ),
    contentEn: (
      <>
        <ol className="list-decimal pl-6 space-y-3 leading-8">
          <li>
            <b>Content Ownership:</b> All rights related to content available on
            the "Ray" platform are the exclusive property of the center or licensed
            entities. This includes texts, images, videos, training programs, and
            presentations.
          </li>
          <li>
            <b>Usage Restrictions:</b> It is prohibited to copy, distribute, republish,
            modify, or use any part of the content for commercial or non-commercial
            purposes without obtaining prior written consent from the center.
          </li>
          <li>
            <b>Legal Actions:</b> Any unauthorized use of content exposes the user
            to legal liability in accordance with intellectual property protection
            systems in the Kingdom of Saudi Arabia.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 6,
    titleAr: "التزامات المستخدم",
    titleEn: "User Obligations",
    contentAr: (
      <>
        <ol className="list-decimal pr-6 space-y-3 leading-8">
          <li>
            <b>الالتزام بالقوانين:</b> يلتزم المستخدم بالامتثال لجميع القوانين
            واللوائح المعمول بها في المملكة، بما في ذلك نظام مكافحة الجرائم
            المعلوماتية.
          </li>
          <li>
            <b>السلوك المقبول:</b> يلتزم المستخدم بعدم استخدام المنصة لأي نشاط
            غير قانوني أو مسيء أو تشهيري أو ينتهك حقوق الآخرين. يشمل ذلك
            الامتناع عن نشر أي محتوى ضار أو غير لائق.
          </li>
          <li>
            <b>أمن المنصة:</b> يلتزم المستخدم بعدم محاولة اختراق أو تعطيل أو
            الإضرار بالمنصة أو بأنظمتها الأمنية. أي محاولة من هذا القبيل ستؤدي
            إلى إنهاء الحساب فورًا واتخاذ الإجراءات القانونية اللازمة.
          </li>
          <li>
            <b>سياسة الحضور:</b> يلتزم المستخدم بسياسة الحضور الإلكتروني التي
            تنص على حضور ما لا يقل عن 75% من الساعات التدريبية للحصول على
            شهادة إتمام الدورة.
          </li>
        </ol>
      </>
    ),
    contentEn: (
      <>
        <ol className="list-decimal pl-6 space-y-3 leading-8">
          <li>
            <b>Compliance with Laws:</b> The user is committed to complying with all
            applicable laws and regulations in the Kingdom, including the Anti-Cyber
            Crime Law.
          </li>
          <li>
            <b>Acceptable Behavior:</b> The user is committed not to use the platform
            for any illegal, offensive, defamatory, or rights-violating activities.
            This includes refraining from publishing any harmful or inappropriate content.
          </li>
          <li>
            <b>Platform Security:</b> The user is committed not to attempt to hack,
            disable, or damage the platform or its security systems. Any such attempt
            will result in immediate account termination and necessary legal action.
          </li>
          <li>
            <b>Attendance Policy:</b> The user is committed to the electronic attendance
            policy that requires attendance of at least 75% of training hours to obtain
            a course completion certificate.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 7,
    titleAr: "سياسة الدفع والإلغاء والاسترداد",
    titleEn: "Payment, Cancellation, and Refund Policy",
    contentAr: (
      <>
        <ol className="list-decimal pr-6 space-y-3 leading-8">
          <li>
            <b>الرسوم:</b> تخضع جميع الرسوم للأسعار المعلنة على المنصة وقت
            التسجيل، ويحق للمنصة تعديل الأسعار في أي وقت.
          </li>
          <li>
            <b>الإلغاء:</b> يجوز للمستخدم طلب إلغاء التسجيل في دورة تدريبية
            قبل 10 أيام عمل على الأقل من تاريخ بدء الدورة، مع خصم نسبة 10%
            رسوم إدارية.
          </li>
          <li>
            <b>الاسترداد:</b> بعد بدء الدورة، لا يتم استرداد أي رسوم. في
            الحالات الاستثنائية، قد توافق المنصة على طلب استرداد مع خصم الرسوم
            الإدارية.
          </li>
          <li>
            <b>عدم الاسترداد:</b> لا يحق للمستخدم المطالبة بالاسترداد في
            الحالات التالية:
            <ul className="list-disc pr-6 mt-2 space-y-1">
              <li>عدم استيفاء متطلبات الحضور (أقل من 75%).</li>
              <li>انتهاك أي من شروط المنصة أو تقديم معلومات غير صحيحة.</li>
            </ul>
          </li>
          <li>
            <b>آلية الاسترداد:</b> في حال الموافقة على استرداد المبلغ، تتم
            إعادة الرسوم عبر نفس وسيلة الدفع المستخدمة خلال فترة زمنية معقولة.
          </li>
        </ol>
      </>
    ),
    contentEn: (
      <>
        <ol className="list-decimal pl-6 space-y-3 leading-8">
          <li>
            <b>Fees:</b> All fees are subject to the prices announced on the platform
            at the time of registration, and the platform has the right to modify
            prices at any time.
          </li>
          <li>
            <b>Cancellation:</b> Users may request cancellation of registration in a
            training course at least 10 working days before the course start date,
            with a 10% administrative fee deduction.
          </li>
          <li>
            <b>Refund:</b> After the course begins, no fees are refunded. In exceptional
            cases, the platform may agree to a refund request with administrative
            fee deduction.
          </li>
          <li>
            <b>No Refund:</b> The user is not entitled to claim a refund in the following
            cases:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Failure to meet attendance requirements (less than 75%).</li>
              <li>Violation of any platform terms or providing incorrect information.</li>
            </ul>
          </li>
          <li>
            <b>Refund Mechanism:</b> In case of approval for refund, fees are returned
            through the same payment method used within a reasonable time period.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 8,
    titleAr: "سياسة الخصوصية",
    titleEn: "Privacy Policy",
    contentAr: (
      <>
        <ol className="list-decimal pr-6 space-y-3 leading-8">
          <li>
            <b>جمع المعلومات:</b> نجمع البيانات المقدمة مباشرةً عند التسجيل أو
            التواصل معنا (الاسم، البريد الإلكتروني، المؤهلات، جهة العمل، أرقام
            الاتصال)، ونجمّع تلقائيًا بيانات الاستخدام وملفات تعريف الارتباط.
          </li>
          <li>
            <b>استخدام المعلومات:</b> لتقديم الخدمات وتحسينها، والتواصل معك،
            وتخصيص تجربتك التعليمية، والامتثال للمتطلبات القانونية.
          </li>
          <li>
            <b>مشاركة المعلومات:</b> لا نشارك بياناتك إلا بموافقتك الصريحة، أو
            مع مزودي الخدمات، أو امتثالًا لالتزام قانوني، أو لحماية حقوقنا أو
            سلامة المستخدمين.
          </li>
          <li>
            <b>حقوقك:</b> يحق لك الوصول إلى معلوماتك الشخصية وتصحيحها أو
            حذفها، والاعتراض على معالجتها أو طلب تقييدها عبر بريد المنصة.
          </li>
          <li>
            <b>أمن البيانات:</b> نتخذ تدابير أمنية معقولة للحماية من الوصول أو
            الاستخدام غير المصرح، مع الإقرار بأن الأنظمة الإلكترونية معرضة
            للمخاطر.
          </li>
          <li>
            <b>خصوصية القُصَّر:</b> لا نجمع بيانات لمن هم دون 18 عامًا دون
            موافقة ولي الأمر.
          </li>
          <li>
            <b>نقل المعلومات دوليًا:</b> قد تُخزَّن أو تُنقل البيانات خارج بلد
            الإقامة مع ضمان الحماية اللازمة.
          </li>
          <li>
            <b>مواقع الأطراف الثالثة:</b> الروابط الخارجية لا تخضع لسياسة
            الخصوصية هذه—يُرجى مراجعة سياساتهم.
          </li>
          <li>
            <b>التزامنا بالأمن:</b> نراقب ونحسن الإجراءات الأمنية باستمرار، مع
            عدم ضمان الحماية المطلقة عبر الإنترنت.
          </li>
        </ol>
      </>
    ),
    contentEn: (
      <>
        <ol className="list-decimal pl-6 space-y-3 leading-8">
          <li>
            <b>Information Collection:</b> We collect data provided directly during
            registration or communication with us (name, email, qualifications,
            workplace, contact numbers), and automatically collect usage data and
            cookies.
          </li>
          <li>
            <b>Information Use:</b> To provide and improve services, communicate with
            you, customize your educational experience, and comply with legal requirements.
          </li>
          <li>
            <b>Information Sharing:</b> We do not share your data except with your
            explicit consent, with service providers, to comply with legal obligations,
            or to protect our rights or user safety.
          </li>
          <li>
            <b>Your Rights:</b> You have the right to access, correct, or delete your
            personal information, and object to its processing or request its restriction
            through the platform's email.
          </li>
          <li>
            <b>Data Security:</b> We take reasonable security measures to protect against
            unauthorized access or use, while acknowledging that electronic systems are
            exposed to risks.
          </li>
          <li>
            <b>Minors' Privacy:</b> We do not collect data for those under 18 years
            without parental consent.
          </li>
          <li>
            <b>International Data Transfer:</b> Data may be stored or transferred outside
            the country of residence with necessary protection guarantees.
          </li>
          <li>
            <b>Third-Party Sites:</b> External links are not subject to this privacy
            policy—please review their policies.
          </li>
          <li>
            <b>Our Security Commitment:</b> We continuously monitor and improve security
            procedures, without guaranteeing absolute protection over the internet.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 9,
    titleAr: "اختيارات المستخدم",
    titleEn: "User Choices",
    contentAr: (
      <>
        <ol className="list-decimal pr-6 space-y-3 leading-8">
          <li>
            <b>الاتصالات الترويجية:</b> تُرسل للمستخدمين الذين اختاروا
            استلامها ويمكن إلغاء الاشتراك في أي وقت.
          </li>
          <li>
            <b>ملفات تعريف الارتباط:</b> يستخدم الموقع الكوكيز لتحسين الأداء،
            ويمكن إدارتها من إعدادات المتصفح.
          </li>
          <li>
            <b>الانسحاب من الاتصالات:</b> لإيقاف الرسائل البريدية/الهاتفية
            تواصل معنا، ويتم المعالجة خلال 7 أيام عمل.
          </li>
        </ol>
      </>
    ),
    contentEn: (
      <>
        <ol className="list-decimal pl-6 space-y-3 leading-8">
          <li>
            <b>Promotional Communications:</b> Sent to users who have chosen to receive
            them and can be unsubscribed at any time.
          </li>
          <li>
            <b>Cookies:</b> The website uses cookies to improve performance, and they
            can be managed from browser settings.
          </li>
          <li>
            <b>Opt-out from Communications:</b> To stop email/phone messages, contact
            us, and processing is done within 7 working days.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 10,
    titleAr: "سياسات التعليم الإلكتروني",
    titleEn: "E-Learning Policies",
    contentAr: (
      <>
        <ol className="list-decimal pr-6 space-y-3 leading-8">
          <li>
            <b>سياسة الحضور الإلكتروني:</b> حضور 75% على الأقل من الساعات
            التدريبية المباشرة، وتسجيل الحضور إلكترونيًا—والغياب دون عذر رسمي
            يعيق الحصول على الشهادة أو الاسترداد.
          </li>
          <li>
            <b>سياسة التقييم والامتحانات:</b> التقييم عبر الواجبات والمشاريع
            والاختبارات حسب طبيعة الدورة، مع الالتزام بالأمانة الأكاديمية ومنع
            الغش أو الانتحال.
          </li>
          <li>
            <b>سياسة إصدار الشهادات:</b> تصدر الشهادات لمن استوفى جميع
            المتطلبات الأكاديمية والحضور ومعتمدة وفق لوائح المركز الوطني
            للتعليم الإلكتروني.
          </li>
          <li>
            <b>الالتزام بمعايير المركز الوطني للتعليم الإلكتروني:</b>
            <ul className="list-disc pr-6 mt-2 space-y-1">
              <li>
                نظام إدارة تعليم إلكتروني لرصد الحضور والنشاط وتتبع الأداء.
              </li>
              <li>أدلة إرشادية ومواد مساعدة لاستخدام النظام.</li>
              <li>بنية تقنية مستقرة تتحمل الحجم وتضمن جودة الخدمة.</li>
              <li>توافق المحتوى مع المعايير والموجهات المعتمدة.</li>
            </ul>
          </li>
        </ol>
      </>
    ),
    contentEn: (
      <>
        <ol className="list-decimal pl-6 space-y-3 leading-8">
          <li>
            <b>Electronic Attendance Policy:</b> Attendance of at least 75% of direct
            training hours, with electronic attendance recording—absence without
            official excuse prevents obtaining certificates or refunds.
          </li>
          <li>
            <b>Assessment and Examination Policy:</b> Assessment through assignments,
            projects, and tests according to the nature of the course, with commitment
            to academic integrity and prevention of cheating or plagiarism.
          </li>
          <li>
            <b>Certificate Issuance Policy:</b> Certificates are issued to those who
            meet all academic and attendance requirements and are accredited according
            to the National Center for E-Learning regulations.
          </li>
          <li>
            <b>Compliance with National Center for E-Learning Standards:</b>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Electronic learning management system to monitor attendance, activity,
                and track performance.
              </li>
              <li>Guidance manuals and support materials for system use.</li>
              <li>Stable technical infrastructure that handles capacity and ensures
                service quality.</li>
              <li>Content compatibility with approved standards and guidelines.</li>
            </ul>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 11,
    titleAr: "سياسة الدعم الفني",
    titleEn: "Technical Support Policy",
    contentAr: (
      <>
        <ol className="list-decimal pr-6 space-y-3 leading-8">
          <li>
            <b>قنوات الدعم:</b> البريد الإلكتروني، واتساب، ونموذج التواصل.
          </li>
          <li>
            <b>أوقات العمل:</b> من الأحد إلى الخميس 9:00 ص حتى 5:00 م بتوقيت
            السعودية.
          </li>
          <li>
            <b>مدة الاستجابة:</b> من 24 إلى 48 ساعة عمل.
          </li>
          <li>
            <b>المستفيدون:</b> جميع مستخدمي المنصة والمتدربين المسجلين.
          </li>
          <li>
            <b>الخدمات المشمولة:</b> تسجيل الدخول، حل المشكلات التقنية، إرشاد
            الاستخدام، استقبال الشكاوى والاقتراحات.
          </li>
          <li>
            <b>قياس الرضا:</b> استبيان بعد انتهاء الدورات لقياس جودة الخدمات.
          </li>
        </ol>
      </>
    ),
    contentEn: (
      <>
        <ol className="list-decimal pl-6 space-y-3 leading-8">
          <li>
            <b>Support Channels:</b> Email, WhatsApp, and contact form.
          </li>
          <li>
            <b>Working Hours:</b> Sunday to Thursday 9:00 AM to 5:00 PM Saudi time.
          </li>
          <li>
            <b>Response Time:</b> 24 to 48 working hours.
          </li>
          <li>
            <b>Beneficiaries:</b> All platform users and registered trainees.
          </li>
          <li>
            <b>Included Services:</b> Login, technical problem solving, usage guidance,
            receiving complaints and suggestions.
          </li>
          <li>
            <b>Satisfaction Measurement:</b> Survey after course completion to measure
            service quality.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 12,
    titleAr: "الأسئلة والاستفسارات",
    titleEn: "Questions and Inquiries",
    contentAr: (
      <>
        <p className="leading-8">
          يمكن للمستخدمين إرسال الأسئلة أو الاستفسارات أو الشكاوى عبر البريد
          الإلكتروني الرسمي للمنصة أو القنوات الأخرى المعلن عنها. يلتزم المركز
          بالرد خلال فترة زمنية معقولة ومعالجة الطلبات بأعلى قدر من الشفافية.
        </p>
      </>
    ),
    contentEn: (
      <>
        <p className="leading-8">
          Users can send questions, inquiries, or complaints through the platform's
          official email or other announced channels. The center is committed to
          responding within a reasonable time period and processing requests with
          the highest level of transparency.
        </p>
      </>
    ),
  },
  {
    id: 13,
    titleAr: "حدود المسؤولية",
    titleEn: "Limitation of Liability",
    contentAr: (
      <>
        <ol className="list-decimal pr-6 space-y-3 leading-8">
          <li>
            <b>الأعطال الفنية:</b> لا تتحمل منصة راي مسؤولية الانقطاعات أو
            الأعطال الخارجة عن الإرادة مثل مشاكل الاتصال أو انقطاع الكهرباء.
          </li>
          <li>
            <b>سوء الاستخدام:</b> لا يتحمل المركز أي أضرار ناتجة عن سوء
            استخدام المحتوى أو المنصة من قِبل المستخدم.
          </li>
          <li>
            <b>الشهادات:</b> الشهادات الصادرة هي شهادات إتمام تدريب وليست
            مؤهلات أكاديمية رسمية.
          </li>
        </ol>
      </>
    ),
    contentEn: (
      <>
        <ol className="list-decimal pl-6 space-y-3 leading-8">
          <li>
            <b>Technical Failures:</b> Ray platform is not responsible for interruptions
            or failures beyond control such as connection problems or power outages.
          </li>
          <li>
            <b>Misuse:</b> The center is not liable for any damages resulting from
            misuse of content or platform by the user.
          </li>
          <li>
            <b>Certificates:</b> Issued certificates are training completion certificates
            and not official academic qualifications.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 14,
    titleAr: "حقوق المنصة",
    titleEn: "Platform Rights",
    contentAr: (
      <>
        <ol className="list-decimal pr-6 space-y-3 leading-8">
          <li>
            <b>تحديث الشروط:</b> تحتفظ المنصة بالحق في تعديل/تحديث الشروط في
            أي وقت، مع إشعار المستخدمين بالتغييرات الجوهرية.
          </li>
          <li>
            <b>رفض أو إلغاء الاشتراك:</b> يحق للمنصة رفض أو إلغاء أي حساب أو
            اشتراك يخالف الشروط.
          </li>
          <li>
            <b>إيقاف الخدمات:</b> قد يتم الإيقاف المؤقت أو الدائم لأسباب
            الصيانة أو التطوير أو غيرها.
          </li>
        </ol>
      </>
    ),
    contentEn: (
      <>
        <ol className="list-decimal pl-6 space-y-3 leading-8">
          <li>
            <b>Terms Update:</b> The platform reserves the right to modify/update
            terms at any time, with notification to users of substantial changes.
          </li>
          <li>
            <b>Refusal or Subscription Cancellation:</b> The platform has the right
            to refuse or cancel any account or subscription that violates the terms.
          </li>
          <li>
            <b>Service Suspension:</b> Temporary or permanent suspension may occur
            for maintenance, development, or other reasons.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 15,
    titleAr: "قبول الشروط",
    titleEn: "Acceptance of Terms",
    contentAr: (
      <>
        <p className="leading-8">
          إن استخدامك للمنصة أو تسجيلك فيها يشكل موافقة نهائية وملزمة على جميع
          الشروط والأحكام الواردة في هذه الوثيقة. إذا كنت لا توافق على هذه
          البنود، يُرجى التوقف فورًا عن استخدام المنصة.
        </p>
      </>
    ),
    contentEn: (
      <>
        <p className="leading-8">
          Your use of the platform or registration on it constitutes final and
          binding acceptance of all terms and conditions contained in this document.
          If you do not agree to these terms, please stop using the platform immediately.
        </p>
      </>
    ),
  },
  {
    id: 16,
    titleAr: "القانون الحاكم",
    titleEn: "Governing Law",
    contentAr: (
      <>
        <p className="leading-8">
          تخضع هذه الشروط لأنظمة المملكة العربية السعودية، وفي حال نشوء أي
          نزاع يكون الفصل فيه من اختصاص المحاكم المختصة في مدينة الرياض.
        </p>
      </>
    ),
    contentEn: (
      <>
        <p className="leading-8">
          These terms are subject to the laws of the Kingdom of Saudi Arabia, and
          in case of any dispute, the competent courts in Riyadh have jurisdiction
          over it.
        </p>
      </>
    ),
  },
];

export const policyGroups = [
  {
    id: "الشروط-والاحكام",
    titleAr: "الشروط و الاحكام",
    titleEn: "Terms and Conditions",
    range: [1, 5] as [number, number],
  },
  {
    id: "السياسات",
    titleAr: "السياسات",
    titleEn: "Policies",
    range: [6, 16] as [number, number],
  },
];

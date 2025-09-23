// src/components/ui/password-strength-indicator.tsx
import React from "react";
import { checkPasswordStrength } from "@/lib/validation/password";
import { useI18nStore } from "@/lib/i18n";

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export function PasswordStrengthIndicator({ 
  password, 
  className = "" 
}: PasswordStrengthIndicatorProps) {
  const { language } = useI18nStore();
  
  if (!password) return null;
  
  const { score, feedback, isStrong } = checkPasswordStrength(password);
  
  const getStrengthColor = (score: number) => {
    if (score < 30) return "bg-red-500";
    if (score < 50) return "bg-orange-500";
    if (score < 70) return "bg-yellow-500";
    if (score < 90) return "bg-blue-500";
    return "bg-green-500";
  };
  
  const getStrengthText = (score: number) => {
    if (score < 30) return language === "ar" ? "ضعيف جداً" : "Very Weak";
    if (score < 50) return language === "ar" ? "ضعيف" : "Weak";
    if (score < 70) return language === "ar" ? "متوسط" : "Medium";
    if (score < 90) return language === "ar" ? "قوي" : "Strong";
    return language === "ar" ? "قوي جداً" : "Very Strong";
  };
  
  const getStrengthTextColor = (score: number) => {
    if (score < 30) return "text-red-600";
    if (score < 50) return "text-orange-600";
    if (score < 70) return "text-yellow-600";
    if (score < 90) return "text-blue-600";
    return "text-green-600";
  };
  
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Strength Bar */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(score)}`}
            style={{ width: `${Math.max(score, 5)}%` }}
          />
        </div>
        <span className={`text-sm font-medium ${getStrengthTextColor(score)}`}>
          {getStrengthText(score)}
        </span>
      </div>
      
      {/* Feedback Messages */}
      {feedback.length > 0 && (
        <div className="space-y-1">
          {feedback.slice(0, 3).map((message, index) => (
            <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
              <div className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-xs text-red-600">{message}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Success Message */}
      {isStrong && (
        <div className="flex items-start space-x-2 rtl:space-x-reverse">
          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0" />
          <p className="text-xs text-green-600">
            {language === "ar" ? "كلمة مرور قوية وآمنة" : "Strong and secure password"}
          </p>
        </div>
      )}
    </div>
  );
}

// Password requirements checklist component
export function PasswordRequirementsChecklist({ 
  password, 
  className = "" 
}: PasswordStrengthIndicatorProps) {
  const { language } = useI18nStore();
  
  const requirements = [
    {
      test: (pwd: string) => pwd.length >= 8,
      text: language === "ar" ? "8 أحرف على الأقل" : "At least 8 characters"
    },
    {
      test: (pwd: string) => /[A-Z]/.test(pwd),
      text: language === "ar" ? "حرف كبير واحد (A-Z)" : "One uppercase letter (A-Z)"
    },
    {
      test: (pwd: string) => /[a-z]/.test(pwd),
      text: language === "ar" ? "حرف صغير واحد (a-z)" : "One lowercase letter (a-z)"
    },
    {
      test: (pwd: string) => /\d/.test(pwd),
      text: language === "ar" ? "رقم واحد (0-9)" : "One number (0-9)"
    },
    {
      test: (pwd: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      text: language === "ar" ? "رمز خاص (!@#$%^&*)" : "One special character (!@#$%^&*)"
    },
    {
      test: (pwd: string) => !/(.)\1{2,}/.test(pwd),
      text: language === "ar" ? "لا توجد أحرف متتالية متطابقة" : "No consecutive identical characters"
    }
  ];
  
  return (
    <div className={`space-y-2 ${className}`}>
      <h4 className="text-sm font-medium text-gray-700">
        {language === "ar" ? "متطلبات كلمة المرور:" : "Password Requirements:"}
      </h4>
      <div className="space-y-1">
        {requirements.map((requirement, index) => (
          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
              requirement.test(password) ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              {requirement.test(password) && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className={`text-xs ${
              requirement.test(password) ? 'text-green-600' : 'text-gray-500'
            }`}>
              {requirement.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// src/lib/validation/password.ts
import * as z from "zod";

// Password strength requirements
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  forbiddenPatterns: [
    /(.)\1{2,}/, // No more than 2 consecutive identical characters
    /123|234|345|456|567|678|789|890/, // No sequential numbers
    /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i, // No sequential letters
    /qwerty|asdfgh|zxcvbn/i, // No common keyboard patterns
  ],
  commonPasswords: [
    'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
    'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'password1',
    'qwerty123', 'dragon', 'master', 'hello', 'freedom', 'whatever',
    'qazwsx', 'trustno1', '654321', 'jordan23', 'harley', 'password1',
    'shadow', 'superman', 'qwertyuiop', 'michael', 'football', 'jordan',
    'hunter', 'purple', 'soccer', 'summer', 'fish', 'baseball',
    'silver', 'orange', '111111', 'princess', 'merlin', 'diamond',
    'yellow', 'bigdog', 'mustang', 'letmein', 'secret', 'asdfgh',
    'zxcvbn', 'michael', 'football', 'shadow', 'master', 'jennifer',
    'jordan', 'superman', 'harley', '1234567890', 'qwerty', '123456',
    'password', '123456789', 'abc123', 'password123', 'admin', 'letmein',
    'welcome', 'monkey', 'dragon', 'master', 'hello', 'freedom',
    'whatever', 'qazwsx', 'trustno1', '654321', 'jordan23', 'harley',
    'password1', 'shadow', 'superman', 'qwertyuiop', 'michael', 'football',
    'jordan', 'hunter', 'purple', 'soccer', 'summer', 'fish',
    'baseball', 'silver', 'orange', '111111', 'princess', 'merlin',
    'diamond', 'yellow', 'bigdog', 'mustang', 'letmein', 'secret',
    'asdfgh', 'zxcvbn', 'michael', 'football', 'shadow', 'master',
    'jennifer', 'jordan', 'superman', 'harley'
  ]
};

// Password validation messages in both languages
export const PASSWORD_MESSAGES = {
  ar: {
    minLength: `يجب أن تحتوي كلمة المرور على ${PASSWORD_REQUIREMENTS.minLength} أحرف على الأقل`,
    maxLength: `يجب أن لا تتجاوز كلمة المرور ${PASSWORD_REQUIREMENTS.maxLength} حرف`,
    requireUppercase: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل (A-Z)",
    requireLowercase: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل (a-z)",
    requireNumbers: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل (0-9)",
    requireSpecialChars: "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل (!@#$%^&*)",
    noConsecutiveChars: "لا يمكن أن تحتوي كلمة المرور على أكثر من حرفين متتاليين متطابقين",
    noSequentialNumbers: "لا يمكن أن تحتوي كلمة المرور على أرقام متتالية (123, 456, إلخ)",
    noSequentialLetters: "لا يمكن أن تحتوي كلمة المرور على أحرف متتالية (abc, def, إلخ)",
    noKeyboardPatterns: "لا يمكن أن تحتوي كلمة المرور على أنماط لوحة المفاتيح الشائعة",
    noCommonPasswords: "كلمة المرور هذه شائعة جداً وغير آمنة",
    passwordsNotMatch: "كلمتا المرور غير متطابقتين",
    confirmPassword: "يرجى تأكيد كلمة المرور"
  },
  en: {
    minLength: `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`,
    maxLength: `Password must not exceed ${PASSWORD_REQUIREMENTS.maxLength} characters`,
    requireUppercase: "Password must contain at least one uppercase letter (A-Z)",
    requireLowercase: "Password must contain at least one lowercase letter (a-z)",
    requireNumbers: "Password must contain at least one number (0-9)",
    requireSpecialChars: "Password must contain at least one special character (!@#$%^&*)",
    noConsecutiveChars: "Password cannot contain more than 2 consecutive identical characters",
    noSequentialNumbers: "Password cannot contain sequential numbers (123, 456, etc.)",
    noSequentialLetters: "Password cannot contain sequential letters (abc, def, etc.)",
    noKeyboardPatterns: "Password cannot contain common keyboard patterns",
    noCommonPasswords: "This password is too common and not secure",
    passwordsNotMatch: "Passwords do not match",
    confirmPassword: "Please confirm your password"
  }
};

// Password strength checker
export function checkPasswordStrength(password: string): {
  score: number; // 0-100
  feedback: string[];
  isStrong: boolean;
} {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= PASSWORD_REQUIREMENTS.minLength) {
    score += 20;
  } else {
    feedback.push(PASSWORD_MESSAGES.ar.minLength);
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 15;
  } else {
    feedback.push(PASSWORD_MESSAGES.ar.requireUppercase);
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 15;
  } else {
    feedback.push(PASSWORD_MESSAGES.ar.requireLowercase);
  }

  // Numbers check
  if (/\d/.test(password)) {
    score += 15;
  } else {
    feedback.push(PASSWORD_MESSAGES.ar.requireNumbers);
  }

  // Special characters check
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 15;
  } else {
    feedback.push(PASSWORD_MESSAGES.ar.requireSpecialChars);
  }

  // Length bonus
  if (password.length >= 12) {
    score += 10;
  }

  // Character variety bonus
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= 8) {
    score += 10;
  }

  // Penalties for weak patterns
  for (const pattern of PASSWORD_REQUIREMENTS.forbiddenPatterns) {
    if (pattern.test(password)) {
      score -= 20;
      if (pattern === PASSWORD_REQUIREMENTS.forbiddenPatterns[0]) {
        feedback.push(PASSWORD_MESSAGES.ar.noConsecutiveChars);
      } else if (pattern === PASSWORD_REQUIREMENTS.forbiddenPatterns[1]) {
        feedback.push(PASSWORD_MESSAGES.ar.noSequentialNumbers);
      } else if (pattern === PASSWORD_REQUIREMENTS.forbiddenPatterns[2]) {
        feedback.push(PASSWORD_MESSAGES.ar.noSequentialLetters);
      } else if (pattern === PASSWORD_REQUIREMENTS.forbiddenPatterns[3]) {
        feedback.push(PASSWORD_MESSAGES.ar.noKeyboardPatterns);
      }
    }
  }

  // Common password check
  if (PASSWORD_REQUIREMENTS.commonPasswords.includes(password.toLowerCase())) {
    score -= 30;
    feedback.push(PASSWORD_MESSAGES.ar.noCommonPasswords);
  }

  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    feedback,
    isStrong: score >= 70
  };
}

// Zod password validation schema
export function createPasswordSchema(language: 'ar' | 'en' = 'ar') {
  const messages = PASSWORD_MESSAGES[language];
  
  return z
    .string()
    .min(PASSWORD_REQUIREMENTS.minLength, { message: messages.minLength })
    .max(PASSWORD_REQUIREMENTS.maxLength, { message: messages.maxLength })
    .refine((password) => /[A-Z]/.test(password), {
      message: messages.requireUppercase,
    })
    .refine((password) => /[a-z]/.test(password), {
      message: messages.requireLowercase,
    })
    .refine((password) => /\d/.test(password), {
      message: messages.requireNumbers,
    })
    .refine((password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), {
      message: messages.requireSpecialChars,
    })
    .refine((password) => !/(.)\1{2,}/.test(password), {
      message: messages.noConsecutiveChars,
    })
    .refine((password) => !/123|234|345|456|567|678|789|890/.test(password), {
      message: messages.noSequentialNumbers,
    })
    .refine((password) => !/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password), {
      message: messages.noSequentialLetters,
    })
    .refine((password) => !/qwerty|asdfgh|zxcvbn/i.test(password), {
      message: messages.noKeyboardPatterns,
    })
    .refine((password) => !PASSWORD_REQUIREMENTS.commonPasswords.includes(password.toLowerCase()), {
      message: messages.noCommonPasswords,
    });
}

// Password confirmation schema
export function createPasswordConfirmationSchema(language: 'ar' | 'en' = 'ar') {
  const messages = PASSWORD_MESSAGES[language];
  
  return z
    .string()
    .min(1, { message: messages.confirmPassword });
}

// Combined password and confirmation schema
export function createPasswordWithConfirmationSchema(language: 'ar' | 'en' = 'ar') {
  const messages = PASSWORD_MESSAGES[language];
  
  return z
    .object({
      password: createPasswordSchema(language),
      password_confirmation: createPasswordConfirmationSchema(language),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: messages.passwordsNotMatch,
      path: ["password_confirmation"],
    });
}

// Alternative field names for different forms
export function createPasswordWithConfirmPasswordSchema(language: 'ar' | 'en' = 'ar') {
  const messages = PASSWORD_MESSAGES[language];
  
  return z
    .object({
      password: createPasswordSchema(language),
      confirmPassword: createPasswordConfirmationSchema(language),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: messages.passwordsNotMatch,
      path: ["confirmPassword"],
    });
}

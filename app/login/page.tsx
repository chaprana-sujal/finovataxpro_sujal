// 'use client'
// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // Import useRouter

// interface FormData {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// }

// interface FormErrors {
//   email?: string;
//   password?: string;
//   api?: string; }

// export default function LoginPage() {
//   const router = useRouter(); // Initialize useRouter
//   const [formData, setFormData] = useState<FormData>({
//     email: '',
//     password: '',
//     rememberMe: false
//   });

//   const [errors, setErrors] = useState<FormErrors>({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // Add loading state

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (errors[name as keyof FormErrors]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//     // Clear API error when user starts typing again
//     if (errors.api) {
//         setErrors(prev => ({ ...prev, api: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors: FormErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // --- THIS IS THE UPDATED FUNCTION ---
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//         return; // Stop if form validation fails
//     }

//     setIsLoading(true); // Start loading
//     setErrors({}); // Clear previous errors

//     try {
//       // **REPLACE WITH YOUR ACTUAL BACKEND ENDPOINT**
//       const response = await fetch('https://zestful-patience-production.up.railway.app/api/auth/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         // Handle backend errors (e.g., 401 Unauthorized, 400 Bad Request)
//         // Assumes backend returns { "message": "Error details" }
//         throw new Error(data.message || 'Invalid email or password');
//       }

//       // --- SUCCESS ---
//       // Your backend should return a token (e.g., JWT)
//       if (data.token) {
//         // Store the token securely
//         localStorage.setItem('authToken', data.token);
//         localStorage.setItem('isLoggedIn', 'true');
//       }

//       // Check for pending service redirect
//       const pendingService = localStorage.getItem('pendingService');
//       if (pendingService) {
//         // Don't use window.location.href, use router.push for client-side navigation
//         router.push('/checkout'); 
//       } else {
//         router.push('/');
//       }

//     } catch (error: any) {
//       // Handle fetch errors or errors thrown from response
//       setErrors({ api: error.message || 'An unexpected error occurred. Please try again.' });
//     } finally {
//       setIsLoading(false); // Stop loading regardless of outcome
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
//           <p className="text-gray-600">Sign in to your FinovaTaxPro account</p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8">
//           {/* Change to <form> and use onSubmit */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 disabled={isLoading} // Disable during loading
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="john@example.com"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   disabled={isLoading} // Disable during loading
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${
//                     errors.password ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 >
//                   {/* ... SVG icons ... */}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//               )}
//             </div>

//             <div className="flex items-center justify-between">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={formData.rememberMe}
//                   onChange={handleChange}
//                   disabled={isLoading} // Disable during loading
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="ml-2 text-sm text-gray-600">Remember me</span>
//               </label>
//               <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Display API errors here */}
//             {errors.api && (
//                 <p className="text-sm text-red-600 text-center">{errors.api}</p>
//             )}

//             <button
//               type="submit" // Change to type="submit"
//               disabled={isLoading} // Disable button when loading
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
//             >
//               {isLoading ? 'Signing In...' : 'Sign In'}
//             </button>
//           </form>

//           <div className="mt-6">
//             {/* ... Rest of your component (social login, sign up link) ... */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'
import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  api?: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.api) {
      setErrors(prev => ({ ...prev, api: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('https://zestful-patience-production.up.railway.app/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      // Store authentication data
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Store user information
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      
      const userName = data.name || data.username || formData.email.split('@')[0];
      localStorage.setItem('userName', userName);

      // Dispatch custom event to update header
      window.dispatchEvent(new Event('storage'));

      // Check for pending service redirect
      const pendingService = localStorage.getItem('pendingService');
      const redirectTo = localStorage.getItem('redirectAfterLogin');
      
      // Small delay to ensure localStorage is written
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Navigate to appropriate page using window.location for full page reload
      if (redirectTo) {
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectTo;
      } else if (pendingService) {
        window.location.href = '/checkout';
      } else {
        window.location.href = '/user_dashboard';
      }

    } catch (error: any) {
      setErrors({ api: error.message || 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your FinovaTaxPro account</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6" onKeyPress={handleKeyPress}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                suppressHydrationWarning
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  suppressHydrationWarning
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  suppressHydrationWarning
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                  suppressHydrationWarning
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {errors.api && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 text-center">{errors.api}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              suppressHydrationWarning
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button 
                onClick={() => {
                  // Store redirect info before OAuth
                  const pendingService = localStorage.getItem('pendingService');
                  if (pendingService) {
                    localStorage.setItem('redirectAfterLogin', '/checkout');
                  }
                  // Google OAuth login
                  window.location.href = 'https://zestful-patience-production.up.railway.app/api/auth/google/';
                }}
                disabled={isLoading}
                suppressHydrationWarning
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline font-medium">
                Sign up now
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
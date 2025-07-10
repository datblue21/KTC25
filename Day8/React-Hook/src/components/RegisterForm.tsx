// RegisterForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  newsletter?: boolean;
  terms?: boolean;
}

const schema = yup.object().shape({
  firstName: yup.string().min(2, 'Minimum 2 characters').required('First name is required'),
  lastName: yup.string().min(2, 'Minimum 2 characters').required('Last name is required'),
  phone: yup
    .string()
    .matches(/^\d{10,15}$/, 'Phone must be 10-15 digits')
    .required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Minimum 8 characters')
    .matches(/[A-Z]/, 'Must include an uppercase letter')
    .matches(/[a-z]/, 'Must include a lowercase letter')
    .matches(/\d/, 'Must include a number')
    .matches(/^\S*$/, 'No spaces allowed')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  newsletter: yup.boolean(),
  terms: yup.boolean().oneOf([true], 'You must agree to terms')
});

export const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data submitted:', data);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left panel */}
      <div className="bg-blue-600 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-bold mb-4">Lottery Display</h1>
        <p className="text-xl max-w-md text-center">
          A few clicks away from creating your Lottery Display
        </p>
        <img src="https://nhannn87dn.github.io/ui-form-antd-yup/statics/img/lottery-display.svg" alt="Display" className="mt-8 max-w-xs" />
      </div>

      {/* Right panel - form */}
      <div className="flex items-center justify-center p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl space-y-5">
          <h2 className="text-2xl font-bold">Register</h2>
          <p className="text-gray-600 text-sm">
            Manage all your lottery efficiently. Let’s get you all set up.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                {...register('firstName')}
                className="w-full p-3 border rounded"
              />
              <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                {...register('lastName')}
                className="w-full p-3 border rounded"
              />
              <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                {...register('phone')}
                className="w-full p-3 border rounded"
              />
              <p className="text-red-500 text-sm">{errors.phone?.message}</p>
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register('email')}
                className="w-full p-3 border rounded"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password')}
                className="w-full p-3 border rounded pr-12"
              />
              <button
                type="button"
                className="absolute right-1 top-1 text-sm"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Hide' : 'View'}
              </button>
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                {...register('confirmPassword')}
                className="w-full p-3 border rounded pr-12"
              />
              <button
                type="button"
                className="absolute right-1 top-1 text-sm"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? 'Hide' : 'View'}
              </button>
              <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
            </div>
          </div>

          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" {...register('newsletter')} className="mr-2" />
              <span className="text-sm text-gray-700">Yes, I want to receive Lottery Display emails.</span>
            </label>
          </div>

          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" {...register('terms')} className="mr-2" />
              <span className="text-sm text-gray-700">
                I agree to all the <a href="#" className="underline">Terms</a>,{' '}
                <a href="#" className="underline">Privacy Policy</a>, and{' '}
                <a href="#" className="underline">Fees</a>.
              </span>
            </label>
            <p className="text-red-500 text-sm">{errors.terms?.message}</p>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-blue-600 text-black py-3 rounded disabled:opacity-50"
          >
            Create Account
          </button>

          <p className="text-sm text-center">
            Already have an account? <a href="#" className="text-blue-600 underline">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};
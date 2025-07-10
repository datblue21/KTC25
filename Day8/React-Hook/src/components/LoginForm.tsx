import React from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log('Form submitted:', data);

    if (data.remember) {
      localStorage.setItem('rememberedUser', JSON.stringify(data));
    } else {
      localStorage.removeItem('rememberedUser');
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Login</h2>
      <p className="text-sm text-gray-600 mb-6">
        Login to your account<br />
        Thank you for getting back to Grovia. Let's access our best recommendation for you.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <div>
          <input
            type="text"
            placeholder="Email or Phone Number"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 5,
                message: 'Minimum 5 characters',
              },
              validate: (value) => {
                const emailPattern = /^\S+@\S+\.\S+$/;
                const phonePattern = /^[0-9]{9,15}$/;
                if (!emailPattern.test(value) && !phonePattern.test(value)) {
                  return 'Enter a valid email or phone number';
                }
                return true;
              },
            })}
            className="w-full border rounded px-4 py-2"
          />
          {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              validate: (value) => {
                if (/\s/.test(value)) return 'Password cannot contain spaces';
                if (!/[a-zA-Z]/.test(value)) return 'Password must include at least one letter';
                return true;
              },
            })}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        {/* Remember Me + Reset */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('remember')} />
            Remember me
          </label>
          <a href="#" className="text-red-500 hover:underline">
            Reset Password?
          </a>
        </div>

        {/* Sign in button */}
        <button className="w-full bg-red-500 text-black py-2 rounded font-semibold">
            SIGN IN
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Don’t have an account yet?{' '}
          <a href="#" className="text-red-600 font-medium hover:underline">
            Join Grovia Now!
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

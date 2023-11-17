import React, { useState } from 'react';

interface SignupScreenProps {}

const SignupScreen: React.FC<SignupScreenProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Add logic to handle user registration
    console.log('Signup button clicked');
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sign up</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={handleSignup}
          className="px-4 py-2 rounded bg-blue-500 text-white font-semibold cursor-pointer"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupScreen;

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-[] md:p-8 lg:p-10 dark:bg-gray-800">
        <hr className="my-6 border-white sm:mx-auto dark:border-gray-700 lg:my-8" />
  <div className="mx-auto max-w-screen-xl text-center">
      <a href="/landing" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
      <img src="litimg/litlogo4.png" className="mr-2 h-10" alt="FlowBite Logo" />
          Lit    
      </a>
      <p className="my-6 text-gray-500 dark:text-white">A virtual interactive library designed to breathe new life into the learning experience by seamlessly integrating gamified elements with literature.</p>
      
      <span className="text-sm text-gray-500 sm:text-center dark:text-white">© 2023 <a href="/landing" className="hover:underline">Lit™</a>. All Rights Reserved.</span>
  </div>
</footer>
  );
};

export default Footer;

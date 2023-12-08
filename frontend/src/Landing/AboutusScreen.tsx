import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface AboutusScreenProps {}

const AboutusScreen: React.FC<AboutusScreenProps> = () => {

  return (
    <div className="bg-bgc1 w-full relative">
            <style>
      {`
        body {
          background-color: #0C2647;
        }
      `}
    </style>
       <Header/>

        <div className=" mt-16 p-4 ml-[28rem]">
      {/* Add your headings here */}
      <h1 className="text-7xl font-bold mt-20 text-white">
          ABOUT <span style={{ color: '#f88125' }}>US.</span>
        </h1>
      </div>

    <div className="flex mt-16">
        {/* Left column */}
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-normal text-white leading-relaxed ml-28">About us.<br/>Our mission.<br/>Our team.</h2>
      </div>

        {/* Right column */}
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-normal text-white leading-relaxed -ml-[20rem] mb-16">Lit was established with a vision rooted in the belief that an 
        enriched future for <br/>education is inherently more thrilling than a stagnant one. Today, our team is<br/>passionately engaged 
        in crafting cutting-edge technologies to actualize this<br/>vision. </h2>

        <h2 className="text-2xl font-normal text-white leading-relaxed -ml-[20rem] mb-24">With the overarching objective of empowering students and educators alike, <br/>
        our ultimate aim is to create an educational landscape that not only captivates <br/> but also propels individuals toward a future of limitless possibilities.</h2>
      </div>
    </div>

    <div className="mt-8 text-center ml-28 mr-28 mb-16  ">
        <img src="litimg/together1.png" alt="Group Pix" className="w-1599 h-532"/>
    </div>

    <div className=" mt-16 p-4 ml-[28rem]">
      {/* Add your headings here */}
      <h1 className="text-7xl font-bold mt-20 text-right text-white mr-28 mb-20">
          OUR <span style={{ color: '#f88125' }}>MISSION.</span>
        </h1>
      </div>

      <h2 className="text-2xl font-normal text-white leading-relaxed text italic text-right mr-28 mb-20">Our mission is to revolutionize Filipino 
      literature education by providing an exclusive virtual library<br/>experience fostering a dynamic learning environment that 
      seamlessly integrates entertainment,<br/>technology, and education.</h2>

      <div className=" mt-16 p-4">
      {/* Add your headings here */}
      <h1 className="text-7xl font-bold mt-20 text-center text-white mb-4">
          OUR <span style={{ color: '#f88125' }}>TEAM.</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-16">
        {/* Keath */}
        <div className="flex items-start">
          <img className="w-[180px] h-[180px] rounded-full mr-10 ml-28 mb-12" alt='keath' src="litimg/keath.png" />
          <div className="text-white">
            <p className="text-3xl font-bold mb-6">Keath Ian Lavador</p>
            <p className="text-lg text italic">“Think lightly of yourself and deeply<br/>of the world.”</p>

            <div className="mt-10">
              <ul className="flex space-x-4 sm:mt-0">
                <li>
                  <a href="https://www.facebook.com/keathian.lavador" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/CurlyBoiKeath" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/keathkeather" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Rynze */}
        <div className="flex items-start">
          <img className="w-[180px] h-[180px] rounded-full mr-10 mb-12 ml-28" alt='rynze' src="litimg/rynze.png" />
          <div className="text-white">
            <p className="text-3xl font-bold mb-6">Rynze RJ Lozano</p>
            <p className="text-lg text italic">"Look up in the sky. It's a bird. It's<br/>a plane."</p>

            <div className="mt-10">
              <ul className="flex space-x-4 sm:mt-0">
                <li>
                  <a href="https://www.facebook.com/rynzerj.lozano" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/Scarararar" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Rynze-RJ" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rj */}
        <div className="flex items-start">
          <img className="w-[180px] h-[180px] rounded-full mr-10 ml-28 mb-28" alt='rj' src="litimg/rj.png" />
          <div className="text-white">
            <p className="text-3xl font-bold mb-6">Rustico John Ylaya</p>
            <p className="text-lg text italic">“Failure in life begins when you aspire<br/>to be someone who is nothing like you.”</p>

            <div className="mt-10">
              <ul className="flex space-x-4 sm:mt-0">
                <li>
                  <a href="https://www.facebook.com/rastixylaya" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/rastixylaya" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/rastixylayax" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shania */}
        <div className="flex items-start">
          <img className="w-[180px] h-[180px] rounded-full mr-10 ml-28 mb-28" alt='shania' src="litimg/shania.png" />
          <div className="text-white">
            <p className="text-3xl font-bold mb-6">Shania Canoy</p>
            <p className="text-lg text italic">"It’s only a passing thing, this shadow;<br/>even darkness must pass."</p>

            <div className="mt-10">
              <ul className="flex space-x-4 sm:mt-0">
                <li>
                  <a href="https://www.facebook.com/shania.cachin" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/shanbraytlikeme" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/shaniacc" className="text-white hover:text-f88125 dark:hover:text-gray-900">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutusScreen;

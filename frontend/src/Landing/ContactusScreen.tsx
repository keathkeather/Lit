import React, { useState} from 'react';
import Header from './Header'

interface ContactusScreenProps {}


const ContactusScreen: React.FC<ContactusScreenProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, message } = formData;

    let details = {
      name,
      email,
      message,
    };

    let response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(details),
    });

    let result = await response.json();
    alert(result.status);

    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="bg-bgc1 min-h-screen flex flex-col">
      <style>
        {`
          body {
            background-color: #0C2647;
          }
        `}
      </style>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 md:p-10 relative z-20">
        {/* Info Column */}
        <div className="p-4 md:ml-20">
          <Header/>
          <div className="ml-2 mt-20">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 mt-3 pt-5 font-inter ">Let's Talk</h2>
                    <p className="text-white">To request a quote or want to meet up for coffee, contact us <br/>
                    directly or fill out the form and we will get back to you promptly.</p>
                    {/* Location */}
                    <p className="text-white pt-10 flex items-center">
                        <img src="litimg/Location.svg" alt="Location Icon" className="w-6 h-6 inline-block mr-2" />
                        <span>7F, The Link Building, Apas, Cebu City, 6000 Cebu</span>
                    </p>

                    {/* Phone */}
                    <p className="text-white pt-5 flex items-center">
                        <img src="litimg/Phone.svg" alt="Phone Icon" className="w-6 h-6 inline-block mr-2" />
                        <span>+639123456789</span>
                    </p>

                    {/* Email */}
                    <p className="text-white pt-5 flex items-center">
                        <img src="litimg/Email.svg" alt="Mail Icon" className="w-6 h-6 inline-block mr-2" />
                        <span>lit.filico@gmail.com</span>
                    </p>
                    <svg width="200" height="100" className="pt-10">
                        <line x1="0" y1="0" x2="1500" y2="0" style={{ stroke: 'white', strokeWidth: 2 }} />
                    </svg>
                </div>
            </div>

            {/* Form Column */}
            <div className="pr-4 md:pt-20 md:p-20 mt-10" >
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-bold mb-2">
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className=" rounded-xl p-5 w-full h-14 focus:outline-none focus:border-blue-500 bg-white bg-opacity-30 text-white"
                    placeholder="Enter your name"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-bold mb-2">
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-xl p-5 w-full h-14 focus:outline-none focus:border-blue-500 bg-white bg-opacity-30 text-white"
                    placeholder="Enter your email"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block font-bold mb-2">
                    </label>
                    <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="rounded-xl p-5 w-full h-40 resize-none focus:outline-none focus:border-blue-500 bg-white bg-opacity-30 text-white"
                    placeholder="Type your message here. :)"
                    required
                    ></textarea>
                </div>
                <div className="text-center">
                <button type="submit">
                        <img src="litimg/submitbtn.svg" alt="LitLogo3" className="w-21 h-14 mb-20"/>
                    </button>
                    </div>
                </form>
            </div>
        </div>

        <img id="bottomImage" src="litimg/ContactUsBg.png" alt="City" className="fixed bottom-0 left-0 w-full z-0" />
        
    </div>
  );
};

export default ContactusScreen;
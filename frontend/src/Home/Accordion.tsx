import React, { useState } from 'react';

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleAccordion = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      style={{
        backgroundColor:  isVisible ? '#c9cfd5' : '#edeef0',
        border: '1px solid #0C2647',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '40px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          color: '#0C2647'
        }}
        onClick={toggleAccordion}
      >
        {question}
        <span
          style={{
            fontSize: '20px',
            marginLeft: '8px',
            transform: isVisible ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            color: '#0C2647'
          }}
        >
          &#9660;
        </span>
      </div>
      {isVisible && (
        <div
          style={{
            padding: '40px',
            paddingTop: '0px',
            backgroundColor: '#c9cfd5',
            fontSize: '18px',
            color: '#0C2647'
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
};

export default Accordion;

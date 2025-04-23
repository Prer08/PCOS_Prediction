import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">About OvaDetect</h1>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
        <p className="mb-4 text-gray-600">
          OvaDetect aims to provide accessible preliminary screening tools for Polycystic Ovary Syndrome (PCOS) 
          using advanced machine learning technologies. Our goal is to support early detection and encourage 
          timely medical consultation for more effective management of this common condition.
        </p>
        <p className="text-gray-600">
          We believe that by combining multiple modalities of data - clinical measurements and ultrasound 
          imagery - we can provide more reliable screening results to help women make informed decisions 
          about their reproductive health.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">About PCOS/PCOD</h2>
        <p className="mb-4 text-gray-600">
          Polycystic Ovary Syndrome (PCOS) is a hormonal disorder common among women of reproductive age. 
          Women with PCOS may have infrequent or prolonged menstrual periods or excess male hormone (androgen) levels.
        </p>
        <p className="mb-4 text-gray-600">
          The ovaries may develop numerous small collections of fluid (follicles) and fail to regularly release eggs.
          Early diagnosis and treatment of PCOS can reduce the risk of long-term complications.
        </p>
        
        <h3 className="text-xl font-medium mb-3 text-gray-700">Common symptoms include:</h3>
        <ul className="list-disc pl-6 mb-4 text-gray-600">
          <li>Irregular periods or no periods</li>
          <li>Difficulty getting pregnant (infertility)</li>
          <li>Excessive hair growth (hirsutism) – usually on the face, chest, back or buttocks</li>
          <li>Weight gain</li>
          <li>Thinning hair and hair loss from the head</li>
          <li>Oily skin or acne</li>
        </ul>
        
        <h3 className="text-xl font-medium mb-3 text-gray-700">Long-term risks include:</h3>
        <ul className="list-disc pl-6 mb-4 text-gray-600">
          <li>Type 2 diabetes</li>
          <li>High blood pressure</li>
          <li>Heart disease and stroke</li>
          <li>Depression and mood swings</li>
          <li>Sleep apnea</li>
          <li>Endometrial cancer</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Technology</h2>
        <p className="mb-4 text-gray-600">
          OvaDetect utilizes three specialized machine learning models:
        </p>
        
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-purple-800">Clinical Data Model (MLP)</h3>
            <p className="text-gray-600">
              Our Multi-Layer Perceptron analyzes clinical measurements and symptoms to identify patterns 
              associated with PCOS, providing a risk assessment based on these parameters.
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-purple-800">Ultrasound Image Model (CNN)</h3>
            <p className="text-gray-600">
              Our Convolutional Neural Network examines ultrasound images to detect polycystic ovaries,
              analyzing patterns that might be difficult for non-specialists to identify.
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-purple-800">Fusion Model</h3>
            <p className="text-gray-600">
              Our advanced model combines both clinical data and ultrasound imagery for comprehensive
              analysis, potentially offering more accurate predictions by leveraging multiple data sources.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 mb-8">
        <h2 className="text-xl font-semibold mb-3 text-purple-800">Important Disclaimer</h2>
        <p className="text-gray-700">
          OvaDetect is designed for educational and informational purposes only. It is not intended to 
          replace professional medical advice, diagnosis, or treatment. Always seek the advice of your 
          physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </div>
    </div>
  );
};

export default About; 
// import React from 'react';
// import '../styles/about.css'; // Adjust the path based on your folder structure

// const AboutPage = () => {
//   return (
//     <div className="about-container">
//       <h1>About Fruit.ai</h1>
//       <p>Fruit.ai is a health manager product...</p>
//     </div>
//   );
// };

// export default AboutPage;

// About.js
import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Fruit.AI</h1>
        <p>Empowering You with Personalized Fruit Nutrition!</p>
      </div>

      <div className="about-content">
        <p>
          Fruit.AI is your personal health assistant that provides detailed nutritional information about various fruits and offers personalized recommendations based on your dietary needs.
        </p>
        <p>
          Whether you're looking to integrate new fruits into your diet or want to understand the health benefits of your favorite fruits, Fruit.AI's AI-driven chatbot is here to assist you in your journey to healthier eating habits.
        </p>
        <p>
          Our mission is to make fruit consumption easy, fun, and informative by leveraging the power of artificial intelligence and delivering real-time insights tailored to your health goals.
        </p>
      </div>

      <div className="about-footer">
        <h3>Stay Healthy, Stay Fruitful!</h3>
      </div>
    </div>
  );
};

export default About;
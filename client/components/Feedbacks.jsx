'use client';

import { useState, useEffect } from 'react';

export default function Feedbacks() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Cardiologist',
      avatar: 'https://thumbs.dreamstime.com/b/happy-beautiful-young-latin-business-leader-woman-standing-office-happy-beautiful-young-latin-business-leader-woman-standing-372991072.jpg',
      content: 'HealthX has revolutionized how I access patient medical histories. The platform makes it incredibly easy to review comprehensive health data and provide better care recommendations.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Patient',
      avatar: 'https://media.istockphoto.com/id/1915382108/photo/smiling-friendly-confident-millennial-caucasian-lady-manager-teacher-in-formal-wear-with.jpg?s=612x612&w=0&k=20&c=TkrRP273eXURjstyDZHFH4lkrE6OFmVJ9ZCrgLoPfIw=',
      content: 'Finally, all my medical reports in one place! The insurance recommendations based on my health data saved me hundreds of dollars. HealthX is a game-changer for healthcare management.',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'General Practitioner',
      avatar: 'https://www.shutterstock.com/image-photo/portrait-handsome-caucasian-man-formal-260nw-2142820441.jpg',
      content: 'The accuracy of health data analysis on HealthX is impressive. My patients love how easy it is to share their medical history, and it helps me provide more personalized treatment plans.',
      rating: 5
    },
    {
      name: 'Jennifer Thompson',
      role: 'Healthcare Administrator',
      avatar: 'https://www.shutterstock.com/image-photo/smiling-positive-attractive-asian-young-260nw-2317594959.jpg',
      content: 'HealthX streamlined our patient data management significantly. The platform\'s integration with ABHA has made our workflow more efficient and reduced paperwork by 70%.',
      rating: 5
    },
    {
      name: 'Robert Kim',
      role: 'Health Insurance Agent',
      avatar: 'https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=',
      content: 'The detailed health analytics help me offer more accurate insurance quotes to clients. HealthX provides the comprehensive health data needed for fair and personalized insurance pricing.',
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of satisfied users who trust HealthX with their healthcare data management and insurance needs.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 rounded-full object-cover mb-6 shadow-lg"
              />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400 text-xl"></i>
                ))}
              </div>
              
              <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed max-w-2xl">
                "{testimonials[currentIndex].content}"
              </blockquote>
              
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          >
            <i className="ri-arrow-left-line text-xl text-gray-700 group-hover:text-blue-600"></i>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          >
            <i className="ri-arrow-right-line text-xl text-gray-700 group-hover:text-blue-600"></i>
          </button>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
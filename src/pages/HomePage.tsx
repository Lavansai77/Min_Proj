import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Dumbbell, 
  Target, 
  Calculator, 
  Calendar,
  TrendingUp,
  Heart,
  Zap,
  Award
} from 'lucide-react';

const motivationalQuotes = [
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "Success is what comes after you stop making excuses. - Luis Galarza",
  "Don't wish for a good body, work out for it. - Anonymous",
  "The groundwork for all happiness is good health. - Leigh Hunt",
  "Fitness is not about being better than someone else, it's about being better than you used to be.",
  "Your body can do it. It's your mind you have to convince.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Champions keep playing until they get it right. - Billie Jean King"
];

const HomePage = () => {
  const { user } = useAuth();
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const features = [
    {
      icon: Dumbbell,
      title: 'Custom Workouts',
      description: 'Personalized workout plans for every fitness goal',
      link: '/workouts',
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      icon: Target,
      title: 'Diet Plans',
      description: 'Budget-friendly nutrition plans tailored to your needs',
      link: '/workouts',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Calculator,
      title: 'Calorie Calculator',
      description: 'Calculate your daily caloric needs accurately',
      link: '/calorie-calculator',
      color: 'text-orange-600 bg-orange-100'
    },
    {
      icon: Calendar,
      title: 'Schedule Workouts',
      description: 'Plan and track your fitness journey',
      link: '/profile',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const stats = [
    { icon: TrendingUp, label: 'Workouts', value: '50+', color: 'text-emerald-600' },
    { icon: Heart, label: 'Categories', value: '10+', color: 'text-red-600' },
    { icon: Zap, label: 'Diet Plans', value: '20+', color: 'text-yellow-600' },
    { icon: Award, label: 'Levels', value: '3', color: 'text-indigo-600' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome back, <span className="text-yellow-300">{user?.name}!</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your fitness journey continues here. Transform your body, mind, and life with our comprehensive fitness management system.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-2">💪 Daily Motivation</h3>
            <p className="text-lg italic">"{currentQuote}"</p>
          </div>
          <Link
            to="/workouts"
            className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            <Dumbbell className="h-6 w-6" />
            <span>Start Your Workout</span>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, label, value, color }, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}>
                  <Icon className={`h-8 w-8 ${color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
                <div className="text-gray-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Fitness Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and resources to help you achieve your fitness goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description, link, color }, index) => (
              <Link
                key={index}
                to={link}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/workouts"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Dumbbell className="h-5 w-5 mr-2" />
              Browse Workouts
            </Link>
            <Link
              to="/calorie-calculator"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Calories
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Dumbbell className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold">FitLife</span>
          </div>
          <p className="text-gray-400 mb-4">Your complete fitness management solution</p>
          <div className="text-sm text-gray-500">
            © 2024 FitLife. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
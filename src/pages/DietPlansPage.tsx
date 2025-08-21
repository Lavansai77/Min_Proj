import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  ArrowLeft, 
  IndianRupee, 
  Clock, 
  Target, 
  Utensils,
  Coffee,
  Zap,
  Heart,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const DietPlansPage = () => {
  const { category } = useParams();
  const { dietPlans } = useData();
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);
  const [reminderSettings, setReminderSettings] = useState({
    breakfast: '08:00',
    lunch: '13:00',
    dinner: '19:00',
    preWorkout: '17:00',
    postWorkout: '18:30'
  });

  const categoryPlans = dietPlans.filter(plan => plan.category === category);
  const selectedPlan = selectedBudget ? categoryPlans.find(plan => plan.budget === selectedBudget) : null;

  const budgetOptions = [500, 1000, 1500];

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return Coffee;
      case 'lunch': return Utensils;
      case 'dinner': return Utensils;
      case 'snacks': return Heart;
      case 'preWorkout': return Zap;
      case 'postWorkout': return Target;
      default: return Utensils;
    }
  };

  const setMealReminder = (mealType: string, time: string) => {
    setReminderSettings(prev => ({
      ...prev,
      [mealType]: time
    }));
    
    // Simulate setting a notification (in a real app, you'd use the Notifications API)
    if ('Notification' in window && Notification.permission === 'granted') {
      // Schedule notification logic would go here
      console.log(`Reminder set for ${mealType} at ${time}`);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('Meal reminders enabled!', {
          body: 'You will now receive meal reminder notifications.',
          icon: '/vite.svg'
        });
      }
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/workouts"
            className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-500 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Workouts</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Diet Plans for {category}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose a budget-friendly nutrition plan tailored to your {category?.toLowerCase()} goals
            </p>
          </div>
        </div>

        {/* Budget Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Select Your Monthly Budget
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {budgetOptions.map((budget) => {
              const plan = categoryPlans.find(p => p.budget === budget);
              const isSelected = selectedBudget === budget;
              
              return (
                <div
                  key={budget}
                  onClick={() => setSelectedBudget(budget)}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IndianRupee className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ₹{budget}/month
                    </h3>
                    {plan && (
                      <>
                        <p className="text-emerald-600 font-semibold mb-2">
                          {plan.totalCalories} calories/day
                        </p>
                        <div className="text-sm text-gray-600">
                          <div>Protein: {plan.macros.protein}%</div>
                          <div>Carbs: {plan.macros.carbs}%</div>
                          <div>Fats: {plan.macros.fats}%</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Plan Details */}
        {selectedPlan && (
          <div className="space-y-8">
            {/* Plan Overview */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <IndianRupee className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">₹{selectedPlan.budget}</div>
                  <div className="text-emerald-100">Monthly Budget</div>
                </div>
                <div>
                  <Target className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPlan.totalCalories}</div>
                  <div className="text-emerald-100">Daily Calories</div>
                </div>
                <div>
                  <Zap className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPlan.macros.protein}%</div>
                  <div className="text-emerald-100">Protein</div>
                </div>
                <div>
                  <Heart className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPlan.category}</div>
                  <div className="text-emerald-100">Goal Category</div>
                </div>
              </div>
            </div>

            {/* Meal Plans */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(selectedPlan.meals).map(([mealType, foods]) => {
                const IconComponent = getMealIcon(mealType);
                
                return (
                  <div key={mealType} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-6 w-6 text-emerald-600" />
                        <h3 className="text-xl font-bold text-gray-900 capitalize">
                          {mealType.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <input
                          type="time"
                          value={reminderSettings[mealType as keyof typeof reminderSettings]}
                          onChange={(e) => setMealReminder(mealType, e.target.value)}
                          className="text-sm border rounded px-2 py-1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {foods.map((food, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span className="text-gray-700">{food}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Meal Reminders */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-6 w-6 mr-2 text-blue-600" />
                Meal Reminder Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {Object.entries(reminderSettings).map(([mealType, time]) => (
                  <div key={mealType} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize text-gray-700">
                        {mealType.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setMealReminder(mealType, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={requestNotificationPermission}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <AlertCircle className="h-5 w-5" />
                <span>Enable Meal Notifications</span>
              </button>
            </div>

            {/* Nutrition Tips */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Nutrition Tips for {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Stay hydrated - drink at least 8-10 glasses of water daily</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Eat meals at consistent times for better metabolism</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Include variety in your meals for balanced nutrition</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Plan and prep meals in advance when possible</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Listen to your body's hunger and fullness cues</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Combine proper nutrition with regular exercise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!selectedPlan && (
          <div className="text-center py-12">
            <Utensils className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Select a budget to view diet plans
            </h3>
            <p className="text-gray-600">
              Choose from our affordable monthly diet plans above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPlansPage;
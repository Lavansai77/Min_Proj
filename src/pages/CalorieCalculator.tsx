import React, { useState } from 'react';
import { Calculator, Activity, Target, TrendingUp, Info } from 'lucide-react';

const CalorieCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: ''
  });
  const [results, setResults] = useState<any>(null);

  const activityLevels = [
    { value: 1.2, label: 'Sedentary (little or no exercise)' },
    { value: 1.375, label: 'Lightly active (light exercise 1-3 days/week)' },
    { value: 1.55, label: 'Moderately active (moderate exercise 3-5 days/week)' },
    { value: 1.725, label: 'Very active (hard exercise 6-7 days/week)' },
    { value: 1.9, label: 'Extremely active (very hard exercise & physical job)' }
  ];

  const goals = [
    { value: 'maintain', label: 'Maintain Weight', adjustment: 0 },
    { value: 'lose', label: 'Lose Weight', adjustment: -500 },
    { value: 'gain', label: 'Gain Weight', adjustment: 500 },
    { value: 'cutting', label: 'Body Cutting', adjustment: -750 },
    { value: 'bulking', label: 'Muscle Building (Bulking)', adjustment: 300 }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateCalories = () => {
    const { age, gender, weight, height, activityLevel, goal } = formData;
    
    if (!age || !gender || !weight || !height || !activityLevel || !goal) {
      alert('Please fill in all fields');
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) + 5;
    } else {
      bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * parseFloat(activityLevel);
    
    // Adjust for goal
    const selectedGoal = goals.find(g => g.value === goal);
    const targetCalories = tdee + (selectedGoal?.adjustment || 0);
    
    // Calculate macros (example ratios)
    const macroRatios = {
      maintain: { protein: 25, carbs: 45, fats: 30 },
      lose: { protein: 30, carbs: 40, fats: 30 },
      gain: { protein: 25, carbs: 50, fats: 25 },
      cutting: { protein: 35, carbs: 35, fats: 30 },
      bulking: { protein: 25, carbs: 50, fats: 25 }
    };

    const macros = macroRatios[goal as keyof typeof macroRatios];
    
    const proteinCalories = (targetCalories * macros.protein) / 100;
    const carbCalories = (targetCalories * macros.carbs) / 100;
    const fatCalories = (targetCalories * macros.fats) / 100;

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      macros: {
        protein: {
          percentage: macros.protein,
          grams: Math.round(proteinCalories / 4),
          calories: Math.round(proteinCalories)
        },
        carbs: {
          percentage: macros.carbs,
          grams: Math.round(carbCalories / 4),
          calories: Math.round(carbCalories)
        },
        fats: {
          percentage: macros.fats,
          grams: Math.round(fatCalories / 9),
          calories: Math.round(fatCalories)
        }
      },
      goal: selectedGoal?.label || ''
    });
  };

  const resetCalculator = () => {
    setFormData({
      age: '',
      gender: '',
      weight: '',
      height: '',
      activityLevel: '',
      goal: ''
    });
    setResults(null);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calculator className="h-12 w-12 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">Calorie Calculator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your daily caloric needs based on your goals, activity level, and body metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="h-6 w-6 mr-2 text-emerald-600" />
              Your Information
            </h2>

            <div className="space-y-6">
              {/* Age and Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Weight and Height */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter weight"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Enter height"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select activity level</option>
                  {activityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fitness Goal
                </label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select your goal</option>
                  {goals.map((goal) => (
                    <option key={goal.value} value={goal.value}>
                      {goal.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={calculateCalories}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Calculator className="h-5 w-5" />
                  <span>Calculate</span>
                </button>
                <button
                  onClick={resetCalculator}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-emerald-600" />
              Your Results
            </h2>

            {results ? (
              <div className="space-y-6">
                {/* Main Calories */}
                <div className="text-center p-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Daily Calorie Target</h3>
                  <div className="text-4xl font-bold mb-2">{results.targetCalories}</div>
                  <div className="text-emerald-100">calories per day</div>
                  <div className="text-sm mt-2 text-emerald-100">Goal: {results.goal}</div>
                </div>

                {/* BMR and TDEE */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{results.bmr}</div>
                    <div className="text-sm text-blue-800">BMR (Base Metabolic Rate)</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">{results.tdee}</div>
                    <div className="text-sm text-purple-800">TDEE (Maintenance)</div>
                  </div>
                </div>

                {/* Macros */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommended Macronutrients</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium">Protein</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{results.macros.protein.grams}g</div>
                        <div className="text-sm text-gray-600">({results.macros.protein.percentage}%)</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium">Carbohydrates</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{results.macros.carbs.grams}g</div>
                        <div className="text-sm text-gray-600">({results.macros.carbs.percentage}%)</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">Fats</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{results.macros.fats.grams}g</div>
                        <div className="text-sm text-gray-600">({results.macros.fats.percentage}%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Fill in your details
                </h3>
                <p className="text-gray-600">
                  Enter your information on the left to calculate your daily calorie needs
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">How It Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">BMR (Basal Metabolic Rate)</h4>
              <p>The number of calories your body needs at rest to maintain basic physiological functions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">TDEE (Total Daily Energy Expenditure)</h4>
              <p>Your BMR multiplied by an activity factor to account for exercise and daily activities.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Calorie Adjustment</h4>
              <p>We adjust your TDEE based on your goal: subtract calories for weight loss, add for weight gain.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Macronutrients</h4>
              <p>Protein, carbohydrates, and fats are calculated based on optimal ratios for your specific goal.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  Dumbbell, 
  Clock, 
  Target, 
  Users, 
  Play,
  Filter,
  Search,
  ChevronRight
} from 'lucide-react';

const WorkoutsPage = () => {
  const { workouts } = useData();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'Weight Gain',
    'Body Cutting', 
    'Muscle Building',
    'Fat Loss + Cardio',
    'Strength Training',
    'Core Strength + Stability',
    'General Fitness & Maintenance',
    'Functional Fitness',
    'Flexibility & Recovery',
    'Sports-Specific Training'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredWorkouts = workouts.filter(workout => {
    const matchesCategory = !selectedCategory || workout.category === selectedCategory;
    const matchesLevel = !selectedLevel || workout.level === selectedLevel;
    const matchesSearch = !searchTerm || 
      workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Weight Gain': 'bg-blue-500',
      'Body Cutting': 'bg-red-500',
      'Muscle Building': 'bg-purple-500',
      'Fat Loss + Cardio': 'bg-orange-500',
      'Strength Training': 'bg-emerald-500',
      'Core Strength + Stability': 'bg-pink-500',
      'General Fitness & Maintenance': 'bg-indigo-500',
      'Functional Fitness': 'bg-cyan-500',
      'Flexibility & Recovery': 'bg-green-500',
      'Sports-Specific Training': 'bg-yellow-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Workout Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive collection of home-based workouts designed for every fitness goal and level
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search workouts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {/* Header */}
              <div className={`${getCategoryColor(workout.category)} p-4 text-white relative`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.level)}`}>
                    {workout.level}
                  </span>
                  <div className="flex items-center space-x-1 text-white/90">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{workout.duration} min</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{workout.name}</h3>
                <p className="text-white/90 text-sm">{workout.category}</p>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">{workout.description}</p>
                
                {/* Equipment */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                    <Dumbbell className="h-4 w-4 mr-1" />
                    Equipment
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {workout.equipment.map((item, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body Parts */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    Target Areas
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {workout.bodyParts.map((part, index) => (
                      <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                        {part}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Link
                    to={`/workout-timer/${workout.id}`}
                    className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    <span>Start Workout</span>
                  </Link>
                  <Link
                    to={`/diet-plans/${workout.category}`}
                    className="flex items-center justify-center px-3 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-12">
            <Dumbbell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No workouts found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}

        {/* Categories Overview */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Workout Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-lg text-left transition-all hover:scale-105 ${
                  selectedCategory === category
                    ? `${getCategoryColor(category)} text-white`
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <div className="font-semibold text-sm">{category}</div>
                <div className="text-xs mt-1 opacity-75">
                  {workouts.filter(w => w.category === category).length} workouts
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPage;
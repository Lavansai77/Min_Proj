import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Dumbbell, 
  Utensils,
  Users,
  BarChart3,
  Save,
  X,
  Eye
} from 'lucide-react';

const AdminPanel = () => {
  const { workouts, dietPlans, addWorkout, addDietPlan, updateWorkout, updateDietPlan, deleteWorkout, deleteDietPlan } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [showDietForm, setShowDietForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<any>(null);
  const [editingDiet, setEditingDiet] = useState<any>(null);

  const [workoutForm, setWorkoutForm] = useState({
    name: '',
    category: '',
    level: '',
    duration: '',
    equipment: '',
    bodyParts: '',
    description: '',
    instructions: ''
  });

  const [dietForm, setDietForm] = useState({
    category: '',
    budget: '',
    totalCalories: '',
    protein: '',
    carbs: '',
    fats: '',
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: '',
    preWorkout: '',
    postWorkout: ''
  });

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

  const handleWorkoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const workoutData = {
      id: editingWorkout ? editingWorkout.id : Date.now().toString(),
      name: workoutForm.name,
      category: workoutForm.category,
      level: workoutForm.level,
      duration: parseInt(workoutForm.duration),
      equipment: workoutForm.equipment.split(',').map(item => item.trim()),
      bodyParts: workoutForm.bodyParts.split(',').map(item => item.trim()),
      description: workoutForm.description,
      instructions: workoutForm.instructions.split('\n').filter(item => item.trim())
    };

    if (editingWorkout) {
      updateWorkout(editingWorkout.id, workoutData);
      setEditingWorkout(null);
    } else {
      addWorkout(workoutData);
    }

    setWorkoutForm({
      name: '',
      category: '',
      level: '',
      duration: '',
      equipment: '',
      bodyParts: '',
      description: '',
      instructions: ''
    });
    setShowWorkoutForm(false);
  };

  const handleDietSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dietData = {
      id: editingDiet ? editingDiet.id : Date.now().toString(),
      category: dietForm.category,
      budget: parseInt(dietForm.budget),
      totalCalories: parseInt(dietForm.totalCalories),
      macros: {
        protein: parseInt(dietForm.protein),
        carbs: parseInt(dietForm.carbs),
        fats: parseInt(dietForm.fats)
      },
      meals: {
        breakfast: dietForm.breakfast.split('\n').filter(item => item.trim()),
        lunch: dietForm.lunch.split('\n').filter(item => item.trim()),
        dinner: dietForm.dinner.split('\n').filter(item => item.trim()),
        snacks: dietForm.snacks.split('\n').filter(item => item.trim()),
        preWorkout: dietForm.preWorkout.split('\n').filter(item => item.trim()),
        postWorkout: dietForm.postWorkout.split('\n').filter(item => item.trim())
      }
    };

    if (editingDiet) {
      updateDietPlan(editingDiet.id, dietData);
      setEditingDiet(null);
    } else {
      addDietPlan(dietData);
    }

    setDietForm({
      category: '',
      budget: '',
      totalCalories: '',
      protein: '',
      carbs: '',
      fats: '',
      breakfast: '',
      lunch: '',
      dinner: '',
      snacks: '',
      preWorkout: '',
      postWorkout: ''
    });
    setShowDietForm(false);
  };

  const startEditWorkout = (workout: any) => {
    setEditingWorkout(workout);
    setWorkoutForm({
      name: workout.name,
      category: workout.category,
      level: workout.level,
      duration: workout.duration.toString(),
      equipment: workout.equipment.join(', '),
      bodyParts: workout.bodyParts.join(', '),
      description: workout.description,
      instructions: workout.instructions.join('\n')
    });
    setShowWorkoutForm(true);
  };

  const startEditDiet = (diet: any) => {
    setEditingDiet(diet);
    setDietForm({
      category: diet.category,
      budget: diet.budget.toString(),
      totalCalories: diet.totalCalories.toString(),
      protein: diet.macros.protein.toString(),
      carbs: diet.macros.carbs.toString(),
      fats: diet.macros.fats.toString(),
      breakfast: diet.meals.breakfast.join('\n'),
      lunch: diet.meals.lunch.join('\n'),
      dinner: diet.meals.dinner.join('\n'),
      snacks: diet.meals.snacks.join('\n'),
      preWorkout: diet.meals.preWorkout.join('\n'),
      postWorkout: diet.meals.postWorkout.join('\n')
    });
    setShowDietForm(true);
  };

  const cancelForm = () => {
    setShowWorkoutForm(false);
    setShowDietForm(false);
    setEditingWorkout(null);
    setEditingDiet(null);
    setWorkoutForm({
      name: '',
      category: '',
      level: '',
      duration: '',
      equipment: '',
      bodyParts: '',
      description: '',
      instructions: ''
    });
    setDietForm({
      category: '',
      budget: '',
      totalCalories: '',
      protein: '',
      carbs: '',
      fats: '',
      breakfast: '',
      lunch: '',
      dinner: '',
      snacks: '',
      preWorkout: '',
      postWorkout: ''
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'diets', label: 'Diet Plans', icon: Utensils },
    { id: 'users', label: 'Users', icon: Users }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Settings className="h-8 w-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-xl text-gray-600">Manage workouts, diet plans, and user data</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Dumbbell className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">{workouts.length}</div>
                <div className="text-gray-600">Total Workouts</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Utensils className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">{dietPlans.length}</div>
                <div className="text-gray-600">Diet Plans</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">
                  {JSON.parse(localStorage.getItem('fitnessUsers') || '[]').length}
                </div>
                <div className="text-gray-600">Registered Users</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">{categories.length}</div>
                <div className="text-gray-600">Categories</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowWorkoutForm(true)}
                  className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add New Workout</span>
                </button>
                <button
                  onClick={() => setShowDietForm(true)}
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add New Diet Plan</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Workouts Tab */}
        {activeTab === 'workouts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Workouts</h2>
              <button
                onClick={() => setShowWorkoutForm(true)}
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Workout</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workouts.map((workout) => (
                <div key={workout.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{workout.name}</h3>
                      <p className="text-sm text-gray-600">{workout.category} - {workout.level}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditWorkout(workout)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteWorkout(workout.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{workout.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{workout.duration} min</span>
                    <span>{workout.equipment.length} equipment</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Diet Plans Tab */}
        {activeTab === 'diets' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Diet Plans</h2>
              <button
                onClick={() => setShowDietForm(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Diet Plan</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dietPlans.map((diet) => (
                <div key={diet.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{diet.category}</h3>
                      <p className="text-sm text-gray-600">₹{diet.budget}/month</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditDiet(diet)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteDietPlan(diet.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Calories:</span>
                      <span className="font-medium">{diet.totalCalories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein:</span>
                      <span className="font-medium">{diet.macros.protein}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbs:</span>
                      <span className="font-medium">{diet.macros.carbs}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fats:</span>
                      <span className="font-medium">{diet.macros.fats}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Registered Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {JSON.parse(localStorage.getItem('fitnessUsers') || '[]').map((user: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.fitnessGoal}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-emerald-600 hover:text-emerald-900">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Workout Form Modal */}
        {showWorkoutForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingWorkout ? 'Edit Workout' : 'Add New Workout'}
                  </h3>
                  <button onClick={cancelForm} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleWorkoutSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={workoutForm.name}
                        onChange={(e) => setWorkoutForm({...workoutForm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={workoutForm.category}
                        onChange={(e) => setWorkoutForm({...workoutForm, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                      <select
                        value={workoutForm.level}
                        onChange={(e) => setWorkoutForm({...workoutForm, level: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      >
                        <option value="">Select level</option>
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                      <input
                        type="number"
                        value={workoutForm.duration}
                        onChange={(e) => setWorkoutForm({...workoutForm, duration: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Equipment (comma separated)</label>
                    <input
                      type="text"
                      value={workoutForm.equipment}
                      onChange={(e) => setWorkoutForm({...workoutForm, equipment: e.target.value})}
                      placeholder="Dumbbells, Resistance Bands, Bodyweight"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Body Parts (comma separated)</label>
                    <input
                      type="text"
                      value={workoutForm.bodyParts}
                      onChange={(e) => setWorkoutForm({...workoutForm, bodyParts: e.target.value})}
                      placeholder="Chest, Arms, Shoulders"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={workoutForm.description}
                      onChange={(e) => setWorkoutForm({...workoutForm, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructions (one per line)</label>
                    <textarea
                      value={workoutForm.instructions}
                      onChange={(e) => setWorkoutForm({...workoutForm, instructions: e.target.value})}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>{editingWorkout ? 'Update' : 'Create'} Workout</span>
                    </button>
                    <button
                      type="button"
                      onClick={cancelForm}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Diet Form Modal */}
        {showDietForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingDiet ? 'Edit Diet Plan' : 'Add New Diet Plan'}
                  </h3>
                  <button onClick={cancelForm} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleDietSubmit} className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={dietForm.category}
                        onChange={(e) => setDietForm({...dietForm, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                      <input
                        type="number"
                        value={dietForm.budget}
                        onChange={(e) => setDietForm({...dietForm, budget: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Calories</label>
                      <input
                        type="number"
                        value={dietForm.totalCalories}
                        onChange={(e) => setDietForm({...dietForm, totalCalories: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Protein (%)</label>
                      <input
                        type="number"
                        value={dietForm.protein}
                        onChange={(e) => setDietForm({...dietForm, protein: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (%)</label>
                      <input
                        type="number"
                        value={dietForm.carbs}
                        onChange={(e) => setDietForm({...dietForm, carbs: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fats (%)</label>
                      <input
                        type="number"
                        value={dietForm.fats}
                        onChange={(e) => setDietForm({...dietForm, fats: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Breakfast (one per line)</label>
                      <textarea
                        value={dietForm.breakfast}
                        onChange={(e) => setDietForm({...dietForm, breakfast: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lunch (one per line)</label>
                      <textarea
                        value={dietForm.lunch}
                        onChange={(e) => setDietForm({...dietForm, lunch: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dinner (one per line)</label>
                      <textarea
                        value={dietForm.dinner}
                        onChange={(e) => setDietForm({...dietForm, dinner: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Snacks (one per line)</label>
                      <textarea
                        value={dietForm.snacks}
                        onChange={(e) => setDietForm({...dietForm, snacks: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pre-Workout (one per line)</label>
                      <textarea
                        value={dietForm.preWorkout}
                        onChange={(e) => setDietForm({...dietForm, preWorkout: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Post-Workout (one per line)</label>
                      <textarea
                        value={dietForm.postWorkout}
                        onChange={(e) => setDietForm({...dietForm, postWorkout: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>{editingDiet ? 'Update' : 'Create'} Diet Plan</span>
                    </button>
                    <button
                      type="button"
                      onClick={cancelForm}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
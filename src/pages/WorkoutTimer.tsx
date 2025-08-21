import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  CheckCircle, 
  Clock,
  ArrowLeft,
  Target,
  Dumbbell
} from 'lucide-react';

const WorkoutTimer = () => {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const { workouts } = useData();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  
  const workout = workouts.find(w => w.id === workoutId);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Workout not found</h2>
          <Link to="/workouts" className="text-emerald-600 hover:text-emerald-500">
            Back to Workouts
          </Link>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
    setCompletedExercises([]);
  };

  const handleReset = () => {
    setTime(0);
  };

  const toggleExerciseComplete = (exerciseIndex: number) => {
    const exerciseKey = `${workout.id}-${exerciseIndex}`;
    if (completedExercises.includes(exerciseKey)) {
      setCompletedExercises(prev => prev.filter(ex => ex !== exerciseKey));
    } else {
      setCompletedExercises(prev => [...prev, exerciseKey]);
    }
  };

  const progress = (completedExercises.length / workout.instructions.length) * 100;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/workouts"
            className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-500 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Workouts</span>
          </Link>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{workout.name}</h1>
                <p className="text-gray-600">{workout.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Duration</div>
                <div className="text-2xl font-bold text-emerald-600 flex items-center">
                  <Clock className="h-6 w-6 mr-1" />
                  {workout.duration} min
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">Category</div>
                <div className="text-blue-800 font-semibold">{workout.category}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-sm text-purple-600 font-medium">Level</div>
                <div className="text-purple-800 font-semibold">{workout.level}</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-sm text-orange-600 font-medium">Equipment</div>
                <div className="text-orange-800 font-semibold">{workout.equipment.join(', ')}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-green-600 font-medium">Target</div>
                <div className="text-green-800 font-semibold">{workout.bodyParts.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Workout Timer</h2>
              
              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className="text-6xl font-mono font-bold text-emerald-600 mb-2">
                  {formatTime(time)}
                </div>
                <div className="text-gray-500">Elapsed Time</div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-semibold text-emerald-600">
                    {completedExercises.length}/{workout.instructions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="grid grid-cols-2 gap-3">
                {!isRunning ? (
                  <button
                    onClick={handleStart}
                    className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <Play className="h-5 w-5" />
                    <span>Start</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePause}
                    className="flex items-center justify-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <Pause className="h-5 w-5" />
                    <span>Pause</span>
                  </button>
                )}
                
                <button
                  onClick={handleStop}
                  className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Square className="h-5 w-5" />
                  <span>Stop</span>
                </button>
              </div>

              <button
                onClick={handleReset}
                className="w-full mt-3 flex items-center justify-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Reset</span>
              </button>

              {/* Diet Plan Link */}
              <div className="mt-6 pt-6 border-t">
                <Link
                  to={`/diet-plans/${workout.category}`}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Target className="h-5 w-5" />
                  <span>View Diet Plans</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Exercise Instructions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Dumbbell className="h-6 w-6 mr-2 text-emerald-600" />
                Exercise Instructions
              </h2>
              
              <div className="space-y-4">
                {workout.instructions.map((instruction, index) => {
                  const exerciseKey = `${workout.id}-${index}`;
                  const isCompleted = completedExercises.includes(exerciseKey);
                  
                  return (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                        isCompleted
                          ? 'border-emerald-200 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-200 hover:bg-emerald-50'
                      }`}
                      onClick={() => toggleExerciseComplete(index)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {isCompleted ? (
                            <CheckCircle className="h-6 w-6 text-emerald-600" />
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-semibold text-emerald-600">
                              Step {index + 1}
                            </span>
                          </div>
                          <p className={`text-gray-700 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                            {instruction}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {progress === 100 && (
                <div className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                  <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">
                    Congratulations! 🎉
                  </h3>
                  <p className="text-emerald-700 mb-4">
                    You've completed the workout in {formatTime(time)}!
                  </p>
                  <Link
                    to="/workouts"
                    className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <span>Back to Workouts</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTimer;
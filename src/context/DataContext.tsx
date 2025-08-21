import React, { createContext, useContext, useState, useEffect } from 'react';

interface Workout {
  id: string;
  name: string;
  category: string;
  level: string;
  duration: number;
  equipment: string[];
  bodyParts: string[];
  description: string;
  instructions: string[];
  animation?: string;
}

interface DietPlan {
  id: string;
  category: string;
  budget: number;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
    preWorkout: string[];
    postWorkout: string[];
  };
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

interface DataContextType {
  workouts: Workout[];
  dietPlans: DietPlan[];
  addWorkout: (workout: Workout) => void;
  addDietPlan: (dietPlan: DietPlan) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;
  updateDietPlan: (id: string, dietPlan: Partial<DietPlan>) => void;
  deleteWorkout: (id: string) => void;
  deleteDietPlan: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const initialWorkouts: Workout[] = [
  // Weight Gain Workouts
  {
    id: '1',
    name: 'Upper Body Strength',
    category: 'Weight Gain',
    level: 'Beginner',
    duration: 45,
    equipment: ['Dumbbells', 'Resistance Bands'],
    bodyParts: ['Chest', 'Arms', 'Shoulders'],
    description: 'Build upper body mass with compound movements',
    instructions: [
      'Warm up for 5 minutes with light cardio',
      'Perform push-ups: 3 sets of 8-12 reps',
      'Dumbbell chest press: 3 sets of 10-15 reps',
      'Resistance band rows: 3 sets of 12-15 reps',
      'Cool down with stretching'
    ]
  },
  {
    id: '2',
    name: 'Lower Body Power',
    category: 'Weight Gain',
    level: 'Intermediate',
    duration: 50,
    equipment: ['Dumbbells', 'Bodyweight'],
    bodyParts: ['Legs', 'Glutes'],
    description: 'Develop leg strength and muscle mass',
    instructions: [
      'Dynamic warm-up for 10 minutes',
      'Squats: 4 sets of 12-15 reps',
      'Lunges: 3 sets of 10 reps each leg',
      'Dumbbell deadlifts: 4 sets of 10-12 reps',
      'Calf raises: 3 sets of 15-20 reps'
    ]
  },
  // Body Cutting Workouts
  {
    id: '3',
    name: 'HIIT Fat Burner',
    category: 'Body Cutting',
    level: 'Beginner',
    duration: 30,
    equipment: ['Bodyweight'],
    bodyParts: ['Full Body'],
    description: 'High-intensity interval training for fat loss',
    instructions: [
      'Warm up with jumping jacks for 3 minutes',
      '20 seconds high knees, 10 seconds rest',
      '20 seconds burpees, 10 seconds rest',
      '20 seconds mountain climbers, 10 seconds rest',
      'Repeat circuit 5 times'
    ]
  },
  {
    id: '4',
    name: 'Cardio Blast',
    category: 'Body Cutting',
    level: 'Advanced',
    duration: 40,
    equipment: ['Bodyweight', 'Jump Rope'],
    bodyParts: ['Full Body'],
    description: 'Intense cardio workout for maximum calorie burn',
    instructions: [
      'Jump rope for 2 minutes',
      'Sprint in place: 30 seconds on, 30 seconds rest',
      'Burpees: 45 seconds on, 15 seconds rest',
      'High knees: 30 seconds on, 30 seconds rest',
      'Repeat for 6 rounds'
    ]
  },
  // Muscle Building Workouts
  {
    id: '5',
    name: 'Chest & Triceps',
    category: 'Muscle Building',
    level: 'Intermediate',
    duration: 55,
    equipment: ['Dumbbells', 'Resistance Bands'],
    bodyParts: ['Chest', 'Triceps'],
    description: 'Targeted muscle building for chest and triceps',
    instructions: [
      'Warm up with arm circles and light stretching',
      'Push-ups: 4 sets of 10-15 reps',
      'Dumbbell flyes: 3 sets of 12-15 reps',
      'Dumbbell press: 4 sets of 8-12 reps',
      'Tricep dips: 3 sets of 10-15 reps'
    ]
  },
  // Fat Loss + Cardio
  {
    id: '6',
    name: 'Metabolic Circuit',
    category: 'Fat Loss + Cardio',
    level: 'Beginner',
    duration: 35,
    equipment: ['Bodyweight'],
    bodyParts: ['Full Body'],
    description: 'Circuit training to boost metabolism',
    instructions: [
      'Jumping jacks: 45 seconds',
      'Bodyweight squats: 45 seconds',
      'Push-ups: 30 seconds',
      'Plank: 30 seconds',
      'Rest 1 minute, repeat 4 rounds'
    ]
  },
  // Strength Training
  {
    id: '7',
    name: 'Full Body Strength',
    category: 'Strength Training',
    level: 'Advanced',
    duration: 60,
    equipment: ['Dumbbells', 'Resistance Bands'],
    bodyParts: ['Full Body'],
    description: 'Comprehensive strength training workout',
    instructions: [
      'Compound movements focus',
      'Deadlifts: 4 sets of 6-8 reps',
      'Squats: 4 sets of 8-10 reps',
      'Push-ups: 3 sets of 12-15 reps',
      'Rows: 4 sets of 10-12 reps'
    ]
  },
  // Core Strength
  {
    id: '8',
    name: 'Core Blaster',
    category: 'Core Strength + Stability',
    level: 'Intermediate',
    duration: 25,
    equipment: ['Bodyweight'],
    bodyParts: ['Core', 'Abs'],
    description: 'Intense core strengthening routine',
    instructions: [
      'Plank: 3 sets of 30-60 seconds',
      'Bicycle crunches: 3 sets of 20 reps each side',
      'Russian twists: 3 sets of 30 reps',
      'Dead bug: 3 sets of 10 each side',
      'Mountain climbers: 3 sets of 30 seconds'
    ]
  }
];

const initialDietPlans: DietPlan[] = [
  {
    id: '1',
    category: 'Weight Gain',
    budget: 500,
    meals: {
      breakfast: ['Oats with banana and nuts (150g)', 'Boiled eggs (2)', 'Green tea'],
      lunch: ['Brown rice (1 cup)', 'Dal (1 cup)', 'Mixed vegetables', 'Chapati (2)'],
      dinner: ['Chicken curry (100g)', 'Rice (1 cup)', 'Yogurt', 'Salad'],
      snacks: ['Nuts and dried fruits', 'Banana with peanut butter'],
      preWorkout: ['Banana', 'Black coffee'],
      postWorkout: ['Protein shake (homemade)', 'Apple']
    },
    totalCalories: 2200,
    macros: { protein: 25, carbs: 50, fats: 25 }
  },
  {
    id: '2',
    category: 'Weight Gain',
    budget: 1000,
    meals: {
      breakfast: ['Protein smoothie with oats', 'Whole grain toast (2)', 'Avocado', 'Milk'],
      lunch: ['Chicken breast (150g)', 'Quinoa (1 cup)', 'Vegetables', 'Olive oil'],
      dinner: ['Fish curry (150g)', 'Brown rice (1.5 cups)', 'Dal', 'Salad'],
      snacks: ['Greek yogurt with nuts', 'Protein bar', 'Fresh fruits'],
      preWorkout: ['Oatmeal with honey', 'Coffee'],
      postWorkout: ['Whey protein shake', 'Banana']
    },
    totalCalories: 2800,
    macros: { protein: 30, carbs: 45, fats: 25 }
  },
  {
    id: '3',
    category: 'Body Cutting',
    budget: 500,
    meals: {
      breakfast: ['Vegetable omelet (2 eggs)', 'Green tea', 'Apple'],
      lunch: ['Grilled chicken (100g)', 'Salad', 'Brown rice (0.5 cup)'],
      dinner: ['Fish (100g)', 'Vegetables', 'Small portion quinoa'],
      snacks: ['Cucumber with hummus', 'Green tea'],
      preWorkout: ['Black coffee', 'Small banana'],
      postWorkout: ['Protein shake (low carb)', 'Almonds (10)']
    },
    totalCalories: 1500,
    macros: { protein: 35, carbs: 30, fats: 35 }
  },
  {
    id: '4',
    category: 'Muscle Building',
    budget: 1500,
    meals: {
      breakfast: ['Protein pancakes', 'Greek yogurt', 'Berries', 'Nuts'],
      lunch: ['Lean beef (150g)', 'Sweet potato', 'Broccoli', 'Olive oil'],
      dinner: ['Salmon (150g)', 'Quinoa', 'Asparagus', 'Avocado'],
      snacks: ['Protein smoothie', 'Mixed nuts', 'Cottage cheese'],
      preWorkout: ['Pre-workout supplement', 'Banana'],
      postWorkout: ['Whey protein', 'Chocolate milk', 'Dates']
    },
    totalCalories: 3200,
    macros: { protein: 35, carbs: 40, fats: 25 }
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);

  useEffect(() => {
    // Load data from localStorage or use initial data
    const storedWorkouts = localStorage.getItem('fitnessWorkouts');
    const storedDietPlans = localStorage.getItem('fitnessDietPlans');

    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts));
    } else {
      setWorkouts(initialWorkouts);
      localStorage.setItem('fitnessWorkouts', JSON.stringify(initialWorkouts));
    }

    if (storedDietPlans) {
      setDietPlans(JSON.parse(storedDietPlans));
    } else {
      setDietPlans(initialDietPlans);
      localStorage.setItem('fitnessDietPlans', JSON.stringify(initialDietPlans));
    }
  }, []);

  const addWorkout = (workout: Workout) => {
    const newWorkouts = [...workouts, workout];
    setWorkouts(newWorkouts);
    localStorage.setItem('fitnessWorkouts', JSON.stringify(newWorkouts));
  };

  const addDietPlan = (dietPlan: DietPlan) => {
    const newDietPlans = [...dietPlans, dietPlan];
    setDietPlans(newDietPlans);
    localStorage.setItem('fitnessDietPlans', JSON.stringify(newDietPlans));
  };

  const updateWorkout = (id: string, updatedWorkout: Partial<Workout>) => {
    const newWorkouts = workouts.map(w => w.id === id ? { ...w, ...updatedWorkout } : w);
    setWorkouts(newWorkouts);
    localStorage.setItem('fitnessWorkouts', JSON.stringify(newWorkouts));
  };

  const updateDietPlan = (id: string, updatedDietPlan: Partial<DietPlan>) => {
    const newDietPlans = dietPlans.map(d => d.id === id ? { ...d, ...updatedDietPlan } : d);
    setDietPlans(newDietPlans);
    localStorage.setItem('fitnessDietPlans', JSON.stringify(newDietPlans));
  };

  const deleteWorkout = (id: string) => {
    const newWorkouts = workouts.filter(w => w.id !== id);
    setWorkouts(newWorkouts);
    localStorage.setItem('fitnessWorkouts', JSON.stringify(newWorkouts));
  };

  const deleteDietPlan = (id: string) => {
    const newDietPlans = dietPlans.filter(d => d.id !== id);
    setDietPlans(newDietPlans);
    localStorage.setItem('fitnessDietPlans', JSON.stringify(newDietPlans));
  };

  const value = {
    workouts,
    dietPlans,
    addWorkout,
    addDietPlan,
    updateWorkout,
    updateDietPlan,
    deleteWorkout,
    deleteDietPlan
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
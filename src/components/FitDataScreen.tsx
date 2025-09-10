import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Activity, Heart, Footprints, Flame, Clock, ArrowLeft, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

interface FitDataScreenProps {
  onBack: () => void;
}

interface HealthData {
  steps: number;
  stepGoal: number;
  calories: number;
  heartRate: number;
  activeMinutes: number;
  workouts: Array<{
    id: string;
    name: string;
    duration: number;
    calories: number;
    type: string;
    timestamp: string;
  }>;
}

export function FitDataScreen({ onBack }: FitDataScreenProps) {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSync, setLastSync] = useState<Date>(new Date());

  useEffect(() => {
    // Simulate loading health data
    setTimeout(() => {
      setHealthData({
        steps: 8247,
        stepGoal: 10000,
        calories: 2156,
        heartRate: 72,
        activeMinutes: 45,
        workouts: [
          {
            id: '1',
            name: 'Morning Yoga Flow',
            duration: 30,
            calories: 120,
            type: 'Yoga',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            name: 'HIIT Cardio Blast',
            duration: 20,
            calories: 180,
            type: 'HIIT',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            name: 'Evening Walk',
            duration: 45,
            calories: 150,
            type: 'Walking',
            timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
          }
        ]
      });
      setIsLoading(false);
    }, 1500);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setLastSync(new Date());
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatWorkoutTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Activity className="w-8 h-8 text-green-600" />
          </div>
          <p>Loading your health data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1>Your Health Data</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>

        {/* Sync Status */}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            Last synced: {formatTime(lastSync)}
          </p>
        </div>

        {/* Daily Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Footprints className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Steps</p>
                <p className="text-xl font-medium">{healthData?.steps.toLocaleString()}</p>
              </div>
            </div>
            <Progress 
              value={(healthData?.steps || 0) / (healthData?.stepGoal || 1) * 100} 
              className="h-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {healthData?.stepGoal.toLocaleString()} goal
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="text-xl font-medium">{healthData?.calories}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Heart Rate</p>
                <p className="text-xl font-medium">{healthData?.heartRate} BPM</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-xl font-medium">{healthData?.activeMinutes}m</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Workouts */}
        <Card className="p-6">
          <h3 className="mb-4">Recent Workouts</h3>
          <div className="space-y-4">
            {healthData?.workouts.map((workout) => (
              <div key={workout.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{workout.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {workout.duration} min • {workout.calories} cal • {workout.type}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatWorkoutTime(workout.timestamp)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Connection Status */}
        <Card className="p-4 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Connected to Fam App</p>
              <p className="text-xs text-muted-foreground">
                Your workout videos are being recorded as health activities
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Activity, Heart, Footprints, Flame, Clock, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface HealthPermissionsProps {
  onBack: () => void;
  onPermissionsGranted: () => void;
}

export function HealthPermissions({ onBack, onPermissionsGranted }: HealthPermissionsProps) {
  const [permissions, setPermissions] = useState({
    steps: false,
    calories: false,
    heartRate: false,
    workouts: false,
    sleep: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [platform, setPlatform] = useState<'android' | 'ios'>('android'); // Default to Android

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleGrantPermissions = async () => {
    setIsProcessing(true);
    
    // Simulate permission granting process
    setTimeout(() => {
      onPermissionsGranted();
    }, 2000);
  };

  const allPermissionsGranted = Object.values(permissions).every(p => p);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1>Health Permissions</h1>
        </div>

        {/* Platform Selector */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={platform === 'android' ? 'default' : 'outline'}
            onClick={() => setPlatform('android')}
            className="flex-1"
          >
            Android Health Connect
          </Button>
          <Button
            variant={platform === 'ios' ? 'default' : 'outline'}
            onClick={() => setPlatform('ios')}
            className="flex-1"
          >
            Apple HealthKit
          </Button>
        </div>

        {/* Permission Request Card */}
        <Card className="p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <h2>Grant Health Access</h2>
            <p className="text-muted-foreground mt-2">
              Allow Bridge Health to access your {platform === 'android' ? 'Android Health Connect' : 'Apple HealthKit'} data
            </p>
          </div>

          {/* Permissions List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Footprints className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm">Steps</p>
                  <p className="text-xs text-muted-foreground">Daily step count and walking data</p>
                </div>
              </div>
              <Switch
                checked={permissions.steps}
                onCheckedChange={() => togglePermission('steps')}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm">Calories</p>
                  <p className="text-xs text-muted-foreground">Active and resting calories burned</p>
                </div>
              </div>
              <Switch
                checked={permissions.calories}
                onCheckedChange={() => togglePermission('calories')}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm">Heart Rate</p>
                  <p className="text-xs text-muted-foreground">Resting and active heart rate data</p>
                </div>
              </div>
              <Switch
                checked={permissions.heartRate}
                onCheckedChange={() => togglePermission('heartRate')}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm">Workouts</p>
                  <p className="text-xs text-muted-foreground">Exercise sessions and activity data</p>
                </div>
              </div>
              <Switch
                checked={permissions.workouts}
                onCheckedChange={() => togglePermission('workouts')}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm">Sleep</p>
                  <p className="text-xs text-muted-foreground">Sleep duration and quality data</p>
                </div>
              </div>
              <Switch
                checked={permissions.sleep}
                onCheckedChange={() => togglePermission('sleep')}
              />
            </div>
          </div>
        </Card>

        {/* Privacy Notice */}
        <Card className="p-4 mb-6">
          <h3 className="text-sm mb-2">Privacy & Security</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Your health data remains encrypted on your device</li>
            <li>• Data is only shared between your connected apps</li>
            <li>• You can revoke these permissions at any time</li>
            <li>• No data is sent to external servers without your consent</li>
          </ul>
        </Card>

        {/* Grant Button */}
        <Button 
          onClick={handleGrantPermissions}
          disabled={!allPermissionsGranted || isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isProcessing ? "Granting Permissions..." : "Grant Permissions"}
        </Button>

        {!allPermissionsGranted && (
          <p className="text-sm text-muted-foreground text-center mt-3">
            Please enable all permissions to continue
          </p>
        )}
      </div>
    </div>
  );
}
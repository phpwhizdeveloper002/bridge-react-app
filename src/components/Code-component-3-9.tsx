import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { User, Settings, Activity } from "lucide-react";

interface MainAppProps {
  onConnectBridge: () => void;
}

export function MainApp({ onConnectBridge }: MainAppProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1>Fam App</h1>
          <Settings className="w-6 h-6 text-gray-600" />
        </div>

        {/* Profile Section */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2>John Doe</h2>
              <p className="text-muted-foreground">Premium Member</p>
            </div>
          </div>

          {/* Profile Options */}
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <User className="w-5 h-5 mr-3" />
              Edit Profile
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Button>

            {/* Connect Bridge App Button */}
            <Button 
              onClick={onConnectBridge}
              className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
            >
              <Activity className="w-5 h-5 mr-3" />
              Connect with Bridge App
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="mb-4">Recent Videos</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-red-100 rounded flex items-center justify-center">
                <div className="w-0 h-0 border-l-4 border-l-red-600 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
              <div>
                <p>Morning Yoga Flow</p>
                <p className="text-sm text-muted-foreground">30 min • Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-red-100 rounded flex items-center justify-center">
                <div className="w-0 h-0 border-l-4 border-l-red-600 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
              <div>
                <p>HIIT Cardio Blast</p>
                <p className="text-sm text-muted-foreground">20 min • Completed</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
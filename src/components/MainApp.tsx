import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
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
            <Avatar className="w-16 h-16">
              <AvatarImage className="object-cover" src="https://randomuser.me/api/portraits/men/65.jpg" alt="Professional Person" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
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
              <div className="w-12 h-8 rounded overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=240&h=160&q=80"
                  alt="Morning Yoga Flow thumbnail"
                />
              </div>
              <div>
                <p>Morning Yoga Flow</p>
                <p className="text-sm text-muted-foreground">30 min • Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 rounded overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=240&h=160&q=80"
                  alt="HIIT Cardio Blast thumbnail"
                />
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
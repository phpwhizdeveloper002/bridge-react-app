import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Activity, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface BridgeAppEntryProps {
  expectedCode: string;
  onBack: () => void;
  onCodeVerified: () => void;
}

export function BridgeAppEntry({ expectedCode, onBack, onCodeVerified }: BridgeAppEntryProps) {
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyCode = async () => {
    if (enteredCode.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError("");

    // Simulate API verification
    setTimeout(() => {
      if (enteredCode === expectedCode) {
        onCodeVerified();
      } else {
        setError("Invalid code. Please check and try again.");
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleCodeChange = (value: string) => {
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setEnteredCode(numericValue);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-600" />
            <h1>Bridge Health</h1>
          </div>
        </div>

        {/* Welcome Card */}
        <Card className="p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-10 h-10 text-purple-600" />
            </div>
            <h2>Welcome to Bridge Health</h2>
            <p className="text-muted-foreground mt-2">
              Connect your health data with Android Health Connect and Apple HealthKit
            </p>
          </div>

          {/* Code Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Enter your 6-digit connection code</label>
              <Input
                type="text"
                placeholder="000000"
                value={enteredCode}
                onChange={(e) => handleCodeChange(e.target.value)}
                className="text-center text-2xl font-mono tracking-widest"
                maxLength={6}
              />
              {error && (
                <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
              )}
            </div>

            <Button 
              onClick={handleVerifyCode}
              disabled={enteredCode.length !== 6 || isVerifying}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </Button>
          </div>
        </Card>

        {/* Help Text */}
        <Card className="p-4">
          <h3 className="text-sm mb-2">Need help?</h3>
          <p className="text-xs text-muted-foreground">
            The 6-digit code was generated in your main Fam App. Go to Profile → Connect with Bridge App to find your code.
          </p>
        </Card>

        {/* Demo Helper */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-xs text-yellow-800">
            <strong>Demo Mode:</strong> Use code <code className="bg-white px-1 rounded">{expectedCode}</code> to continue
          </p>
        </div>
      </div>
    </div>
  );
}
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, Smartphone, Shield, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface ConnectionScreenProps {
  onBack: () => void;
  onProceedToBridge: (code: string) => void;
}

export function ConnectionScreen({ onBack, onProceedToBridge }: ConnectionScreenProps) {
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1>Connect Bridge App</h1>
        </div>

        {/* Instructions Card */}
        <Card className="p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-green-600" />
            </div>
            <h2>Setup Health Connection</h2>
            <p className="text-muted-foreground mt-2">
              Connect your health data across devices with our secure bridge application
            </p>
          </div>

          {/* Generated Code */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Your Connection Code</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-mono tracking-wider">{generatedCode}</span>
              <Button size="sm" variant="ghost" onClick={copyCode}>
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Code expires in 10 minutes</p>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm">1</span>
              </div>
              <p className="text-sm">Download and install the Bridge Health App from your device's app store</p>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm">2</span>
              </div>
              <p className="text-sm">Open the Bridge App and enter the 6-digit code shown above</p>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm">3</span>
              </div>
              <p className="text-sm">Grant health permissions when prompted to sync your workout data</p>
            </div>
          </div>
        </Card>

        {/* Security Info */}
        <Card className="p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm mb-1">What happens when you connect?</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Your workout videos will be automatically recorded as health activities</li>
                <li>• Health data (steps, calories, heart rate) will sync between apps</li>
                <li>• Data is encrypted and stored securely on your device</li>
                <li>• You can disconnect at any time from either app</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Demo Button */}
        <Button 
          onClick={() => onProceedToBridge(generatedCode)}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Continue to Bridge App Demo
        </Button>
      </div>
    </div>
  );
}
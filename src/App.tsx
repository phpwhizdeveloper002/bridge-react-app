import { useState } from "react";
import { MainApp } from "./components/MainApp";
import { ConnectionScreen } from "./components/ConnectionScreen";
import { BridgeAppEntry } from "./components/BridgeAppEntry";
import { HealthPermissions } from "./components/HealthPermissions";
import { FitDataScreen } from "./components/FitDataScreen";

type Screen = 'main' | 'connection' | 'bridge-entry' | 'permissions' | 'fit-data';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [generatedCode, setGeneratedCode] = useState<string>('');

  const navigateToConnection = () => {
    setCurrentScreen('connection');
  };

  const navigateToBridge = (code: string) => {
    setGeneratedCode(code);
    setCurrentScreen('bridge-entry');
  };

  const navigateToPermissions = () => {
    setCurrentScreen('permissions');
  };

  const navigateToFitData = () => {
    setCurrentScreen('fit-data');
  };

  const navigateBack = () => {
    switch (currentScreen) {
      case 'connection':
        setCurrentScreen('main');
        break;
      case 'bridge-entry':
        setCurrentScreen('connection');
        break;
      case 'permissions':
        setCurrentScreen('bridge-entry');
        break;
      case 'fit-data':
        setCurrentScreen('permissions');
        break;
      default:
        setCurrentScreen('main');
    }
  };

  const resetToMain = () => {
    setCurrentScreen('main');
    setGeneratedCode('');
  };

  return (
    <div className="size-full">
      {currentScreen === 'main' && (
        <MainApp onConnectBridge={navigateToConnection} />
      )}
      
      {currentScreen === 'connection' && (
        <ConnectionScreen 
          onBack={navigateBack}
          onProceedToBridge={navigateToBridge}
        />
      )}
      
      {currentScreen === 'bridge-entry' && (
        <BridgeAppEntry 
          expectedCode={generatedCode}
          onBack={navigateBack}
          onCodeVerified={navigateToPermissions}
        />
      )}
      
      {currentScreen === 'permissions' && (
        <HealthPermissions 
          onBack={navigateBack}
          onPermissionsGranted={navigateToFitData}
        />
      )}
      
      {currentScreen === 'fit-data' && (
        <FitDataScreen 
          onBack={resetToMain}
        />
      )}
    </div>
  );
}
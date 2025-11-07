import "./App.css";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import ChatPage from "./Pages/ChatPage";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebug = (msg: string) => {
    console.log(msg);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  useEffect(() => {
    addDebug("✅ App component mounted");
    addDebug(`📍 Location: ${window.location.href}`);
    addDebug(`🖥️ In Teams: ${window.parent !== window ? 'Yes' : 'No'}`);
    
    // Set ready after a short delay
    setTimeout(() => {
      addDebug("🚀 App ready to display content");
      setIsReady(true);
    }, 1000);
  }, []);

  return (
    <FluentProvider theme={webLightTheme} style={{ height: "100vh" }}>
      <div style={{ 
        padding: "20px", 
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif"
      }}>
        {isReady && (
          <div style={{ 
            backgroundColor: "#ffffff", 
            border: "1px solid #ddd",
            padding: "2px", 
            borderRadius: "8px"
          }}>
            <ChatPage />
          </div>
        )}
      </div>
    </FluentProvider>
  );
}

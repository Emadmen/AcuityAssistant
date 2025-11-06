import "./App.css";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import ChatPage from "./Pages/ChatPage";

export default function App() {

  return (
    <FluentProvider theme={webLightTheme} style={{ height: "100vh" }}>
      <ChatPage />
    </FluentProvider>
  );
}

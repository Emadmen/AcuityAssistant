import { useState } from "react";
import {
  Button, Dropdown, Option, Textarea, makeStyles, tokens,
} from "@fluentui/react-components";
import { Add24Regular, History24Regular, Send24Regular } from "@fluentui/react-icons";
import AppLayout from "../layout/AppLayout";

type Role = "user" | "assistant";
type Msg  = { id: string; role: Role; text: string };

const useStyles = makeStyles({
  header: {
    height: "56px", display: "flex", alignItems: "center",
    padding: "0 16px", borderBottom: "1px solid #e6e6e6",
  },
  title: { fontWeight: 600 },
  content: { overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center" },
  welcome: { textAlign: "center", color: "#8d8d93" },
  listWrap: { padding: "24px", width: "100%", maxWidth: "960px", margin: "0 auto", display: "grid", gap: "12px" },
  bubble: {
    background: "#fff", borderRadius: "10px", padding: "10px 14px",
    boxShadow: "0 1px 0 rgba(16,24,40,.06)",
    maxWidth: "80%", justifySelf: "start",
  },
  bubbleUser: { background: "#e8f3ff", justifySelf: "end" },
  composer: { background: "#fff", borderTop: "1px solid #e6e6e6", padding: "12px" },
  composerRow: { maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "8px" },
  bottomBar: {
    height: "44px", background: "#fff", borderTop: "1px solid #e6e6e6",
    display: "grid", gridTemplateColumns: "1fr auto auto", alignItems: "center",
    padding: "0 12px", color: tokens.colorNeutralForeground3,
  },
  leftLink: { cursor: "pointer", marginRight: "16px" },
  rightGroup: { display: "flex", gap: "12px", alignItems: "center" },
  railBrand: { fontWeight: 700, marginBottom: "8px" },
  railBtn: { justifyContent: "start" },
});

export default function ChatPage() {
  const s = useStyles();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [value, setValue] = useState("");
  const [answerMode, setAnswerMode] = useState("Fast");
  const [tone, setTone] = useState("Default");

  async function send(text: string) {
    if (!text.trim()) return;
    const user: Msg = { id: String(Date.now()), role: "user", text };
    setMessages((m) => [...m, user]);

    // TODO: replace with your /api/chat call
    const reply = `🧠 (mock) You said: ${text}`;
    setMessages((m) => [...m, { id: user.id + "-r", role: "assistant", text: reply }]);
  }

  return (
    <AppLayout
      rail={
        <>
          <div className={s.railBrand}>Acuity Assistant</div>
          <Button appearance="primary" icon={<Add24Regular />} className={s.railBtn}>New Chat</Button>
          <Button icon={<History24Regular />} className={s.railBtn}>Session History</Button>
        </>
      }
      header={
        <header className={s.header}>
          <div className={s.title}>Acuity Assistant</div>
          <div style={{ marginLeft: "auto" }}>
            <Button appearance="primary" icon={<Add24Regular />}>New Chat</Button>
          </div>
        </header>
      }
      composer={
        <div className={s.composer}>
          <form
            className={s.composerRow}
            onSubmit={(e) => {
              e.preventDefault();
              send(value);
              setValue("");
            }}
          >
            <Textarea
              resize="vertical"
              placeholder="Ask anything in this conversation"
              value={value}
              onChange={(_, d) => setValue(d.value)}
            />
            <Button type="submit" appearance="primary" icon={<Send24Regular />}>
              Send
            </Button>
          </form>
        </div>
      }
      bottomBar={
        <div className={s.bottomBar}>
          <div>
            <span className={s.leftLink}>Sources</span>
            <span className={s.leftLink}>Prompts Library</span>
          </div>
          <div className={s.rightGroup}>
            <span>Answer Mode</span>
            <Dropdown
              selectedOptions={[answerMode]}
              onOptionSelect={(_, d) => setAnswerMode(String(d.optionValue))}
              defaultValue="Fast"
            >
              <Option value="Fast">Fast</Option>
              <Option value="Balanced">Balanced</Option>
              <Option value="Detailed">Detailed</Option>
            </Dropdown>
          </div>
          <div className={s.rightGroup}>
            <span>Tone</span>
            <Dropdown
              selectedOptions={[tone]}
              onOptionSelect={(_, d) => setTone(String(d.optionValue))}
              defaultValue="Default"
            >
              <Option value="Default">Default</Option>
              <Option value="Formal">Formal</Option>
              <Option value="Casual">Casual</Option>
            </Dropdown>
          </div>
        </div>
      }
    >
      {/* Content */}
      <section className={s.content}>
        {messages.length === 0 ? (
          <div className={s.welcome}>
            <h2>Hi! What can I help you with?</h2>
          </div>
        ) : (
          <div className={s.listWrap}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${s.bubble} ${m.role === "user" ? s.bubbleUser : ""}`}
              >
                {m.text}
              </div>
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  );
}
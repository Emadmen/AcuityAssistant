import { ReactNode } from "react";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: { height: "100vh", display: "grid", gridTemplateColumns: "248px 1fr", background: "#f6f6f7" },
  rail: { background: "#fff", borderRight: "1px solid #e6e6e6", display: "grid", alignContent: "start", gap: "8px", padding: "12px" },
  main: { display: "grid", gridTemplateRows: "56px 1fr auto auto", minWidth: 0 }, // header, content, composer, bottombar
});

export default function AppLayout({
  rail,
  header,
  children,
  composer,
  bottomBar,
}: {
  rail: ReactNode;
  header: ReactNode;
  children: ReactNode;
  composer?: ReactNode;
  bottomBar?: ReactNode;
}) {
  const s = useStyles();
  return (
    <div className={s.root}>
      <aside className={s.rail}>{rail}</aside>
      <main className={s.main}>
        {header}
        {children}
        {composer}
        {bottomBar}
      </main>
    </div>
  );
}
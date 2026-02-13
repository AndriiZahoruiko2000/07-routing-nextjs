import css from "./LayoutNotes.module.css";

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const Layout = ({ children, sidebar }: LayoutProps) => {
  return (
    <div className={css["container"]}>
      <div className={css["sidebar"]}>{sidebar}</div>
      <div className={css["notesWrapper"]}>{children}</div>
    </div>
  );
};

export default Layout;

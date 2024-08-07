import { ThemeProvider } from "@/src/app/providers/theme-provider";
import { ReactNode } from "react";

const App = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};
export default App;

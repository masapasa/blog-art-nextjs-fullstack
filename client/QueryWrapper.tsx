"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

const client = new QueryClient();
export declare type Theme = "light" | "dark" | "colored";
const QueryWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme: Theme =
    theme === "system" ? systemTheme || "colored" : (theme as Theme);
  return (
    <QueryClientProvider client={client}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={currentTheme || "dark"}
      />
      {/* Same as */}
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default QueryWrapper;

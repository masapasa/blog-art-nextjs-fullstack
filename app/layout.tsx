import { NavBar } from "./auth/NavBar";
import "./globals.css";
import { Roboto } from "next/font/google";
import { ServerThemeProvider } from "next-themes";
import QueryWrapper from "@/client/QueryWrapper";
import "react-toastify/dist/ReactToastify.css";
import ProviderWrapper from "@/client/ProviderWrapper";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServerThemeProvider attribute="class">
      <html lang="en">
        <body className={`${roboto.variable}`}>
          <ProviderWrapper>
            <QueryWrapper>
              {/* @ts-expect-error Async Server Component */}
              <NavBar />
              {children}
            </QueryWrapper>
          </ProviderWrapper>
        </body>
      </html>
    </ServerThemeProvider>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "./Navbar";

export const metadata: Metadata = {
  title: "SRgroup Blog",
  description: "Get the latest in real estate from the team behind SRgroup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="  antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className=" selection:bg-black selection:text-white dark:selection:text-black  dark:selection:bg-white  mt-24 max-w-screen-xl m-auto">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

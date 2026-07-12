import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TaskFlow | Manage Tasks. Achieve More.",
  description: "A smarter way to organize your workflow, collaborate with teams, and track progress.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            
            {/* Minimalist Navigation Header */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-grow">
              {children}
            </main>
            
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

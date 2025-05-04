import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/Header";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { GehaltProvider } from "@/contexts/GehaltProvider";
import { Ads } from "@/app/components/Ads";
import { Navbar } from "@/app/components/Navbar";
import { EmpfehlungenProvider } from "@/contexts/EmpfehlungenProvider";
import { ProfileProvider } from "@/contexts/ProfileProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "endlichbesser.de",
  description: "Endlich dein Leben besser meistern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
    <Script
        src="https://app.rybbit.io/api/script.js"
        site-id="3"
        defer
    />
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-stone-800 h-screen`}
      >
        <Theme appearance={"dark"}>
          <ProfileProvider>
            <GehaltProvider>
              <EmpfehlungenProvider>
                <div className="bg min-h-screen flex flex-col">
                  <header>
                    <Header />
                  </header>
                  <div className="flex-1 flex flex-col sm:flex-row overflow-x-clip">
                    <main className="flex-1 ">{children}</main>

                    <nav className="order-first sm:w-32 ">
                      <Navbar />
                    </nav>

                    <aside className="sm:w-32 ">
                      <Ads />
                    </aside>
                  </div>

                  <footer></footer>
                </div>
              </EmpfehlungenProvider>
            </GehaltProvider>
          </ProfileProvider>
        </Theme>
      </body>
    </html>
  );
}

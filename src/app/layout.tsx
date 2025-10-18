import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "UTIS - Urban Traffic Intelligence System",
  description: "Urban Traffic Intelligence System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-century`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

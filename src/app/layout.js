import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "401(k) Allocation Guide — Vitality Wealth Advisors",
  description: "Personalized 401(k) allocation guidance based on your risk profile.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

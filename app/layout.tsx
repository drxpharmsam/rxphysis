import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RxPhysis – Your Trusted Health Partner",
  description: "Order medicines, consult doctors, and find pharmacies near you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

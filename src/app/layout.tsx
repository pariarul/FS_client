// app/layouts.tsx
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* Head is now handled in the locale layout */}
      <body>{children}</body>
    </html>
  );
}

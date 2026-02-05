import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "REST Countries API",
  description:
    "Browse and search countries worldwide. View population, region, capital, borders, and more with a responsive dark mode interface.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: ` if (localStorage.theme === 'dark') { document.documentElement.classList.add('dark'); } `,
          }}
        />
      </head>
      <body className="antialiased bg-(--gray-50) dark:bg-(--blue-950) text-(--gray-950) dark:text-(--white)">
        <div className="w-full flex flex-col">
          <Header></Header>
          {children}
        </div>
      </body>
    </html>
  );
}

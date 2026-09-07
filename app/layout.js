import "./globals.css";

export const metadata = {
  title: "RamVerse OS",
  description: "Career Acceleration Engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { Noto_Serif_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif_Display({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const nicoMoji = localFont({
  src: "../public/fonts/NicoMoji-Regular.ttf",
  variable: "--font-nico-moji",
  display: "swap",
});
export const metadata = {
  title: "Parcel Curier Service",
  description: "Parcel Curier Service App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${roboto.variable} ${nicoMoji.variable} antialiased`}
      >
        {/* place layout here like navbar*/}
        <AuthProvider>{children}</AuthProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}

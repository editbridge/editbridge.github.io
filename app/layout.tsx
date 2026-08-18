import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EditBridge | Ultra-High-Resolution Image Editing",
  description: "A faithful and efficient diffusion bridge framework for image editing at resolutions up to 4K.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "EditBridge",
    description: "Faithful and efficient ultra-high-resolution image editing at resolutions up to 4K.",
    type: "website",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "EditBridge project page" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EditBridge",
    description: "Faithful and efficient ultra-high-resolution image editing at resolutions up to 4K.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

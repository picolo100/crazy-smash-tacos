import type { Metadata, Viewport } from "next";
import { Anton, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL, business } from "@/lib/site";
import { OG_DEFAULT, restaurantSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCall } from "@/components/layout/MobileCall";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Intro } from "@/components/motion/Intro";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-anton" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-dm", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Crazy Smash & Tacos · Smash burgers & tacos halal à Bourg-en-Bresse",
    template: "%s · Crazy Smash & Tacos",
  },
  description:
    "Smash burgers écrasés minute et tacos généreux, 100 % halal, au 27 avenue de Mâcon à Bourg-en-Bresse. Menu étudiant 8 €, ouvert jusqu’à 3 h le week-end.",
  applicationName: business.name,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: business.name,
    images: [{ url: OG_DEFAULT, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#e3121b",
  width: "device-width",
  initialScale: 1,
};

/**
 * Script inline exécuté avant le premier rendu :
 * - active les états initiaux d'animation seulement si le mouvement est autorisé ;
 * - affiche l'intro uniquement à la première visite de la session ;
 * - filet de sécurité : si le JS d'animation ne démarre pas, tout redevient visible.
 */
const bootScript = `(function(){try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');if(location.pathname==='/'&&!sessionStorage.getItem('crazy-intro')){d.setAttribute('data-intro','');sessionStorage.setItem('crazy-intro','1');}setTimeout(function(){d.removeAttribute('data-intro');},3200);setTimeout(function(){if(!window.__crazyMotion)d.classList.remove('motion');},4000);}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-FR" className={`${anton.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Intro />
        <Header />
        <MotionProvider>
          <main id="contenu" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <MobileCall />
        <JsonLd data={[restaurantSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}

import "@/styles/globals.css";
import Header from "@/components/staticComponents/header";
import {Poppins} from "next/font/google";
import Footer from "@/components/staticComponents/Footer";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
})

export const metadata = {
    title: "Nail Salon",
    description: "Luxury Nail Spa - Pamper Yourself with Elegance and Style",
    icons: {
        icon: "/images/lotus_logo.png",
    },
};

export default function RootLayout({ children }) {


    return (
        <html lang="en">
        <body>
        <main className={`w-screen h-screen items-center justify-center overflow-x-hidden ${poppins.variable}`}>
            <Header/>
            {children}
            <Footer/>
        </main>
        </body>
        </html>
    );
}
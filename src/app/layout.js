import "@/styles/globals.css";
import Header from "@/components/staticComponents/header";
import {Poppins} from "next/font/google";
import Footer from "@/components/staticComponents/footer";
import {DataProvider} from "@/helper/dataProvider";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
})

export const metadata = {
    title: "Lotus Salon",
    description: "Luxury Nail Salon - Pamper Yourself with Elegance and Style",
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
            <DataProvider>
                {children}
            </DataProvider>
            <Footer/>
        </main>
        </body>
        </html>
    );
}
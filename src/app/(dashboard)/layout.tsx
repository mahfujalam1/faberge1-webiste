import Footer from "@/components/shared/Footer";
import NavigationMenuBar from "@/components/shared/NavigationMenuBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            <NavigationMenuBar />
            {children}
            <Footer />
        </div>
    );
}

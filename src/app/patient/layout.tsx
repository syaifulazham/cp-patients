import Navbar from "@/components/Navbar";

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
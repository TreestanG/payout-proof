import Link from "next/link";

export default function Header() {
    return (
        <div className="flex items-center">
            <h1 className="p-8 text-xl font-semibold">Proof Generator</h1>
            <Link href="/" className="underline font-medium">Home</Link>
        </div>
    )
}
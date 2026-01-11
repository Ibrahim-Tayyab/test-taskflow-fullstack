import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Not Found</h2>
                <p className="mb-4">Could not find requested resource</p>
                <Link href="/" className="text-indigo-400 hover:text-indigo-300">
                    Return Home
                </Link>
            </div>
        </div>
    )
}

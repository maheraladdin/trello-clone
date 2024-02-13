
export default function ClerkLayout({children}: {children: React.ReactNode}) {
    return (
        <main className={"w-screen h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-800"}>
            {children}
        </main>
    )
}
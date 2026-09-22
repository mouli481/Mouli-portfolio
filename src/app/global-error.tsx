"use client";

import "./globals.css";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-svh items-center justify-center p-6 text-center">
        <main className="flex max-w-md flex-col items-center gap-4">
          <h1 className="text-3xl font-semibold">The site hit an unexpected error</h1>
          <p className="text-muted-foreground">Please refresh the page or try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            className="bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-medium"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

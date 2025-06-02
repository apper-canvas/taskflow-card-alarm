import { Toaster } from '../ui/sonner'

export default function MainTemplate({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Toaster />
    </div>
  )
}
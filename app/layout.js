import ClientProviders from '@/components/ClientProviders'
import FirebaseAuthProvider from '@/components/FirebaseAuthProvider'
import Header from '@/components/Header'
import SubscriptionProvider from '@/components/SubscriptionProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'


export const metadata = {
  title: 'Chat with Anyone',
  description: 'Chat application with translator which can translate to 10 languages',
}

export default function RootLayout({ children }) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              >
                <Header />
                {children}
                <Toaster/>
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  )
}


import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import './globals.css'
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
// import { ClerkProvider, SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from '@clerk/nextjs'

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return <ClerkProvider>
//     <html>
//       <head>
//       </head>
//       <body>
//         {children}
//       </body>
//     </html>
//   </ClerkProvider>
// }

import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-textarea/styles.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flow-forge-iota.vercel.app"),
  title: "Flow Forge - GitHub Workflow Manager",
  description:
    "Flow Forge is a GitHub workflow manager that simplifies project management by integrating with tools like Kestra for workflow management.",
  openGraph: {
    title: "Flow Forge - GitHub Workflow Manager",
    description:
      "Streamline your GitHub workflow with FlowForge, automating issue management and PR reviews from one powerful dashboard.",
    images: ["/preview.png"],
    url: "https://flow-forge-iota.vercel.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <CopilotKit runtimeUrl="/api/copilotkit">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </CopilotKit>
        </body>
      </html>
    </AuthProvider>
  );
}

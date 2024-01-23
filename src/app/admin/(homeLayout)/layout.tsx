import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import SideBar from '@/components/SideBar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mercury CMS',
  description: 'Generated by next app',
}

export default function layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className} style={{
        overflow: 'hidden'
      }}>
        <div style={{
          width: "100%",
          zIndex: "10",
          overflow: "hidden"
        }}>
          <Navbar />
        </div>
        <div style={{
          display: "flex",
          height: "100%"
        }}>
          <div>
            <SideBar />
          </div>
          <div style={{
            flex: 1,
            backgroundColor: "#F2F2F2",
            maxWidth: "100%",
            height: "calc(100vh - 50px)",
            padding: "40px",
            overflowY: "scroll",
            overflowX: "auto"
          }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

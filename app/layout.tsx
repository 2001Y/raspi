import './globals.scss'

import styles from './page.module.css'
import Clock from "./client/Clock"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <section>
          <div className="clock">
            <Clock />
          </div>
        </section>
        {children}
      </body>
    </html>
  )
}

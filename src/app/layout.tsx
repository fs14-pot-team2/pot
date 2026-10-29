import type { Metadata } from "next";
import QueryProvider from "@/lib/react-query/QueryProvider";
import "@/styles/variables.css";
import "@/styles/reset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "POT | Plant On Trust",
  description: "방문형 식물 돌봄 매칭 서비스",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

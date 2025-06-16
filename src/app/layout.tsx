
// app/example/page.tsx
export const metadata = {
  title: 'My App',
  description: 'Next.js app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="ko">
      <body>
        <header style={{ padding: '10px', background: '#eee' }}>
          <h2>공통 헤더</h2>
        </header>
        <main>
          {children}
          </main>
      </body>
    </html>
  );
}
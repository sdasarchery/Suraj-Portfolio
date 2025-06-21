import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <nav style={{ padding: '1rem', background: '#111', color: '#fff' }}>
        <Link href="/" style={{ marginRight: 20, color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link href="/biography" style={{ marginRight: 20, color: '#fff', textDecoration: 'none' }}>Biography</Link>
        <Link href="/achievements" style={{ marginRight: 20, color: '#fff', textDecoration: 'none' }}>Achievements</Link>
        <Link href="/media" style={{ marginRight: 20, color: '#fff', textDecoration: 'none' }}>Media</Link>
        <Link href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</Link>
      </nav>
      <main style={{ padding: '2rem' }}>{children}</main>
    </>
  );
}
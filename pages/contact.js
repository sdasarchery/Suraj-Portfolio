import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout>
      <h1>Contact</h1>
      <p>Get in touch with Suraj Nalam's team or leave a message.</p>
      <form style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" name="name" placeholder="Your Name" required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
        <input type="email" name="email" placeholder="Your Email" required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
        <textarea name="message" placeholder="Your Message" rows={5} required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '0.75rem', borderRadius: 4, background: '#111', color: '#fff', border: 'none', cursor: 'pointer' }}>Send</button>
      </form>
    </Layout>
  );
}

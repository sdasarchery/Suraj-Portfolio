import Layout from '../components/Layout';
import styles from './contact.module.scss';

export default function Contact() {
  return (
    <Layout>
      <section className={styles.hero} style={{ fontFamily: "'Poppins', 'Montserrat', sans-serif" }}>
        <div className={styles.overlay} />

        <div className={styles.contentWrap}>
          <div className={styles.contentGrid}>
            <div className={styles.copyCard}>
              <h1 className={styles.title}>Q&amp;A</h1>
              <p className={styles.caption}>
                Do you have any curiosity about his career, training, or life off the court? This is the space to resolve your doubts.
              </p>
              <p className={styles.helperText}>
                Fill in the form and Suraj&apos;s team will get back to you.
              </p>
            </div>

            <form className={styles.formCard}>
              <label className={styles.fieldLabel} htmlFor="fullName">Full Name *</label>
              <input id="fullName" name="fullName" type="text" className={styles.fieldInput} placeholder="Enter your full name" required />

              <label className={styles.fieldLabel} htmlFor="email">Email Address *</label>
              <input id="email" name="email" type="email" className={styles.fieldInput} placeholder="you@example.com" required />

              <label className={styles.fieldLabel} htmlFor="topic">Question Topic *</label>
              <select id="topic" name="topic" className={styles.fieldInput} defaultValue="" required>
                <option value="" disabled>Select a topic</option>
                <option value="career">Career Journey</option>
                <option value="training">Training Routine</option>
                <option value="competition">Competitions</option>
                <option value="personal">Life Off The Court</option>
                <option value="other">Other</option>
              </select>

              <label className={styles.fieldLabel} htmlFor="question">Your Question *</label>
              <textarea id="question" name="question" className={styles.fieldTextarea} rows={5} placeholder="Write your question here..." required />

              <label className={styles.checkRow}>
                <input name="consent" type="checkbox" required />
                <span>I agree to be contacted regarding this query. *</span>
              </label>

              <button type="submit" className={styles.askButton}>Ask Suraj</button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

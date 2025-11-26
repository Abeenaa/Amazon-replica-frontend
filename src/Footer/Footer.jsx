import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={styles.footer} role="contentinfo">
      <button
        type="button"
        className={styles.top}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        Back to top
      </button>

      <div className={styles.links}>
        <div className={styles.col}>
          <h4 className={styles.title}>Get to Know Us</h4>
          <a className={styles.link} href="/">
            Careers
          </a>
          <a className={styles.link} href="/">
            About Amazon
          </a>
          <a className={styles.link} href="/">
            Investor Relations
          </a>
        </div>

        <div className={styles.col}>
          <h4 className={styles.title}>Make Money with Us</h4>
          <a className={styles.link} href="/">
            Sell on Amazon
          </a>
          <a className={styles.link} href="/">
            Sell on Marketplace
          </a>
          <a className={styles.link} href="/">
            Advertise Your Products
          </a>
        </div>

        <div className={styles.col}>
          <h4 className={styles.title}>Payment & Delivery</h4>
          <a className={styles.link} href="/">
            Payment Options
          </a>
          <a className={styles.link} href="/">
            Shipping Rates
          </a>
          <a className={styles.link} href="/">
            Returns & Replacements
          </a>
        </div>

        <div className={styles.col}>
          <h4 className={styles.title}>Let Us Help You</h4>
          <a className={styles.link} href="/">
            Your Account
          </a>
          <a className={styles.link} href="/">
            Customer Service
          </a>
          <a className={styles.link} href="/">
            Help
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.brandRow}>
          <div className={styles.logo}>amazon</div>
          <div className={styles.locale}>
            <label htmlFor="localeSelect" className="sr-only">
              Select country/region
            </label>
            <select id="localeSelect" aria-label="Select country or region">
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="de">Germany</option>
              <option value="et">Ethiopia</option>
            </select>
          </div>
        </div>

        <div className={styles.copy}>
          © {new Date().getFullYear()} Your Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

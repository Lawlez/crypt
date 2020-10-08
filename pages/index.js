import Head from "next/head";
import styles from "../styles/Home.module.css";
import react, { useState } from "react";
import MatrixEffect from "./matrix";

const encrypt = (e) => {
  e.preventDefault();
  e.persist();
};

export default function Home() {
  const [formValues, setFormValues] = useState({ value: "" });
  const [encrypted, setEncrypted] = useState("");
  const handleChange = (e) => {
    setFormValues({ value: e.target.value });
  };
  const submitForm = async () => {
    fetch("/api/enc?data=" + formValues.value).then((response) =>
      response.json().then((json) => setEncrypted(json.data))
    );
  };

  return (
    <div className={styles.container}>
      <MatrixEffect />
      <div className={styles.content}>
        <Head>
          <title>crypt.lwlx.xyz</title>

          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles.contentContainer}>
            <div id="glitchWrapper">
              <h1 id="glitch" className={styles.title}>
                crypt.lwlx.xyz
              </h1>
            </div>
          </div>
        </main>
        <form onSubmit={encrypt}>
          <textarea
            cols="77"
            rows="12"
            type="text"
            name="toEncrypt"
            label="text to encrypt"
            value={formValues.value}
            onChange={handleChange}
          />
          <input type="submit" name="submit" onClick={submitForm} />
        </form>
        <h4>Encrypted:</h4>
        <p>{encrypted}</p>
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    </div>
  );
}

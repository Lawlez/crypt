import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import MatrixEffect from "./matrix";
import ClientSideOnlyRenderer from "../func/clientSideRenderer";

export default function Home({ req }) {
  const [formValues, setFormValues] = useState({ value: "" });
  const [formValues2, setFormValues2] = useState({ value: "" });
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [isServer, setIsServer] = useState(!!req);
  const handleChange = (e) => {
    setFormValues({ value: e.target.value });
  };
  const handleChange2 = (e) => {
    setFormValues2({ value: e.target.value });
  };

  const encrypt = async (e) => {
    e.preventDefault();
    e.persist();
    if (!formValues.value) {
      return;
    }
    fetch("/api/enc?data=" + formValues.value, {
      method: "GET",
      //body: formValues.value, // body data type must match "Content-Type" header
    })
      .then((response) =>
        response.json().then((json) => setEncrypted(json.data))
      )
      .catch((err) => {
        if (!formValues.value) {
          return;
        }
        console.log(err);
      });
  };

  const decrypt = async (e) => {
    e.preventDefault();
    e.persist();
    if (!formValues2.value) {
      return;
    }
    fetch("/api/dec?data=" + formValues2.value, {
      method: "GET",
      //body: formValues.value, // body data type must match "Content-Type" header
    })
      .then((response) =>
        response.json().then((json) => setDecrypted(json.data))
      )
      .catch((err) => {
        if (!formValues2.value) {
          return;
        }
        console.log(err);
      });
  };
  const Matrix = () => <MatrixEffect />;

  return (
    <div className={styles.container}>
      <ClientSideOnlyRenderer
        initialSsrDone={!isServer}
        renderDone={Matrix}
        renderLoading={<></>}
      />

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
        <section className={styles.section}>
          <h2>encrypt strings</h2>
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
            <div className={styles.btnContainer}>
              <input
                className={styles.btn}
                type="submit"
                name="submit"
                onClick={encrypt}
              />
            </div>
          </form>

          <h4>encrypted:</h4>
          {encrypted && (
            <div className={styles.resContainer}>
              <p>{encrypted}</p>
            </div>
          )}
        </section>
        <section>
          <h2>decrypt strings</h2>
          <form onSubmit={decrypt}>
            <textarea
              cols="77"
              rows="12"
              type="text"
              name="todecrypt"
              label="text to decrypt"
              value={formValues2.value}
              onChange={handleChange2}
            />
            <div className={styles.btnContainer}>
              <input className={styles.btn} type="submit" name="submit" />
            </div>
          </form>
          <h4>decrypted:</h4>
          {decrypted && (
            <div className={styles.resContainer}>
              <p>{decrypted}</p>
            </div>
          )}
          <br></br>
        </section>

        <footer className={styles.footer}>
          <a href="https://lwlx.xyz" target="_blank" rel="noopener noreferrer">
            Powered by ⚡️
          </a>
        </footer>
      </div>
    </div>
  );
}

import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header({ isLoggedIn, logoutUserFunction }) {
  return (
    <header className={styles.headerWrapper}>
      <h1 className={styles.title}>Users & Auth</h1>
      <nav className={styles.navWrapper}>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <a href="#" onClick={logoutUserFunction}>
                  Log Out
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/create">Create User</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header({ isLoggedIn, logoutUserFunction }) {
  return (
    <div>
      <header className={styles.headerWrapper}>
        <div>
          <div>
            <h1>Users & Auth</h1>
          </div>
          <nav>
            <ul>
              {isLoggedIn && (
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
              )}

              {!isLoggedIn && (
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
        </div>
      </header>
    </div>
  );
}

/*const Header = ({ isLoggedIn, logoutUser }) => {
  return (
    <header className={styles.Header}>
      <nav className={styles.HeaderNav}>
        {isLoggedIn && (
          <>
            <Link href="/">User Profile</Link>
            <a onClick={logoutUser}>Log Out</a>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/create">Create User</Link>
          </>
        )}
      </nav>
    </header>
  );
};
*/


import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css';
// import settings from '../styles/Settings.module.css'
import Login from '../Components/Login/login';
import { Toolbar, Card, Box} from '@mui/material';
import Category from '../Components/Category/category';

import { useUser } from '@auth0/nextjs-auth0';

export default function Home() {

  const { user, error, isLoading } = useUser();

  console.log(user);


  return (
    <Box className={styles.container}>
      <Head>
        <title>inquirio</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>


        <Toolbar className={styles.toolbar}>
          <Link className={styles.linkHome} href="/">Home</Link> &nbsp;&nbsp;&nbsp;<Link className={styles.linkSettings} href="/settings">Settings</Link>
          <Login className={styles.header} />
        </Toolbar>

        <h1 className={styles.title}>Take Control of Your Career With Inquirio</h1>
        <Category />

        <p className={styles.description}>
          Start learning by clicking the {' '}
          <code className={styles.code}>Log In</code>
          . First time? Sign up to gain access!
        </p>

        <div className={styles.grid}>
          <Card className={styles.card}>
            <h2>What is Inquirio? &rarr;</h2>
            <p>A digital learning platform that gives users access to online courses, certifications etc. Click to find more!</p>
          </Card>

          <Card className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p> Grow and train to be as proficient in your career field as possible in the forseeable future</p>
          </Card>

          <Card
            className={styles.card}
          >
            <a href="/settings">
              <h2>Settings &rarr;</h2>
              <p>You can enable notifications to inform you whenever there is a new course added to the application.</p>
            </a>
          </Card>

          <Card
            className={styles.card}
          >
            <a href="/about">
              <h2>About Us &rarr;</h2>
              <p>
                Get to know the team who made it all happen. Connect with us and feel free to ask any questions!
              </p>
            </a>
          </Card>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.codefellows.org/"
          target="_blank"

        >
          Made Possible by:
          <span className={styles.logo}>
            <Image src="/Code Fellows.png" alt="Code Fellows Logo" width={30} height={30} />
          </span>
          Code Fellows
        </a>
      </footer>
    </Box >
  )
}

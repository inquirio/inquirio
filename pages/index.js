
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from '../Components/Login/login';
import { Toolbar, Card, Box } from '@mui/material';
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

        <h1 className={styles.title}>Take Control of Your Career With Inquirio</h1>

        <Toolbar className={styles.toolbar}>
          <Category />
          <Login />
        </Toolbar>

        <p className={styles.description}>
          Start learning by clicking the {' '}
          <code className={styles.code}>Log In</code>
          . First time? Sign up to gain access!
        </p>

        <div className={styles.grid}>
          <Card href="https://nextjs.org/docs" className={styles.card}>
            <h2>What is Inquirio? &rarr;</h2>
            <p>A digital learning platform that gives users access to online courses, certifications etc. Click to find more!</p>
          </Card>

          <Card href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p> Grow and train to be as proficient in your career field as possible in the forseeable future</p>
          </Card>

          <Card
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </Card>

          <Card
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>About Us &rarr;</h2>
            <p>
              Get to know the team who made it all happen. Connect with us and feel free to ask any questions!
            </p>
          </Card>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.codefellows.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made Possible by:
          <span className={styles.logo}>
            <Image src="/Code Fellows.png" alt="Code Fellows Logo" width={30} height={30} />
          </span>
          Code Fellows
        </a>
      </footer>
    </Box>
  )
}

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import Navbar from '../Components/Navbar/navbar';
import { Card, Box } from '@mui/material';
import Search from '../Components/Search/Search';
import { useUser } from '@auth0/nextjs-auth0';


export default function Home() {

  const { user, error, isLoading } = useUser();

  return (
    <Box className={styles.container}>
      <Head>
        <title>inquirio</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>

        <h1 className={styles.title}>Inquirio</h1>
        <h2 className={styles.h2}>Take Control of Your Career</h2>

        {user
          ? <p className={styles.description}>Welcome {user.name}!</p> :
          <p className={styles.description}>
            First time? Start learning by signing up to gain access!
          </p>
       
        
        <Search enrollment={false}/>


        <div className={styles.grid}>
          <Card className={styles.card}>
            <h2>What is Inquirio? &rarr;</h2>
            <p>A digital learning platform that gives users access to online courses, certifications etc. Click to find more!</p>
          </Card>

          <Card className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p> Grow and train to be as proficient in your career field as possible in the forseeable future</p>
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

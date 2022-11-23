import styles from '../styles/Home.module.css';
// import settings from '../styles/Settings.module.css'
import { Toolbar, Card, Box, TextField, FormGroup, Button } from '@mui/material';

import Category from '../Components/Category/category';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';


export default function Settings() {

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
          <Link className={styles.courses} href="/courses">Courses</Link>
          <Link className={styles.linkHome} href="/about-us">About-Us</Link> 
          
        </Toolbar>

        <h1 className={styles.setTitle}>Inquirio User Settings</h1>
        <Category />

        <Card className={styles.setArc}>
          <form className={styles.setAdd}>
            <FormGroup>
            <TextField id="filled-basic" label="Add Category" variant="filled" />
             
              <Button>Add Category</Button>
            </FormGroup>
          </form>


          <h3>Archive Inactive Courses</h3>
          <Button >Yes</Button>
          <Button >No</Button>
        </Card>




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

    </Box>
  )
}


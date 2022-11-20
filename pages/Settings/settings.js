import setStyles from '../../styles/settings.css'
import styles from '../../styles/Home.module.css';
import { Toolbar, Card, Box, Link, Button } from '@mui/material';
import Category from '../../Components/Category/category';

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
          <Login className={styles.header} />
        </Toolbar>

        <h1 className={styles.title}>Inquirio User Settings</h1>
        <Category />


        <Card>
          <form>
            <Group>
              <TextInput
                name="categories"
                placeholder="Add New Category"
              />
              <Button color="gray.8" type="submit" >Add Category</Button>
            </Group>
          </form>


          <h3>Archive Inactive Courses</h3>

          <Button color="green">Yes</Button>
          <Button color="red">No</Button>
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


import { If, Then, Else } from 'react-if';
import { Button, Group, TextInput } from '@mantine/core';
import Link from 'next/link';
// import LoginButton from './loginButton';

const Login = () => {


  return (
    <>
      <If>
        <Then>
          
        </Then>
        <Else>
          <form >
            <Group >
              <Button color="green" type="submit" >Log In</Button>
              <TextInput
                name="username"
                placeholder="Username"
              />
              <TextInput
                name="password"
                type="password"
                placeholder="Password"
              />

              <Button color="green" type="submit">
                <Link
                  href="/api/auth/login"
                  className="btn btn-primary btn-margin"
                  tabIndex={0}
                  >
                  Log in
                </Link>
              </Button>
              <Button color="red" type="submit">
                <Link href="/api/auth/logout" icon="power-off"  >Logout</Link>
              </Button>
            </Group>
          </form>
        </Else>
      </If>
    </>
  );
};

export default Login;

import { If, Then, Else } from 'react-if';
import { Button, FormGroup, } from '@mui/material';
import Link from 'next/link';


const Login = () => {


  return (
    <>
      <If>
        <Then>
          
        </Then>
        <Else>
          <form >
            <FormGroup >
              {/* <Button color="green" type="submit" >Log In</Button>
              <TextInput
                name="username"
                placeholder="Username"
              />
              <TextInput
                name="password"
                type="password"
                placeholder="Password"
              /> */}

              <Button>
                <Link
                  href="/api/auth/login"
                  className="btn btn-primary btn-margin"
                  tabIndex={0}
                  >
                  Log in
                </Link>
              </Button>
              <Button>
                <Link href="/api/auth/logout" icon="power-off"  >Logout</Link>
              </Button>
            </FormGroup>
          </form>
        </Else>
      </If>
    </>
  );
};

export default Login;

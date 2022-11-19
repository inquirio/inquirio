import { If, Then, Else } from 'react-if';
import { Button, Group, TextInput } from '@mantine/core';


const Login = () => {
 

  return (
    <>
      <If>
        <Then>
          <Button color="red" >Log Out</Button>
        </Then>
        <Else>
          <form >
            <Group >
              <TextInput
                name="username"
                placeholder="Username"
              />
              <TextInput
                name="password"
                type="password"
                placeholder="Password"
              />
              <Button color="green" type="submit" >Log In</Button>
            </Group>
          </form>
        </Else>
      </If>
    </>
  );
};

export default Login;

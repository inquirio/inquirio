import { Button, Group, TextInput } from '@mantine/core';

const Category = () => {


  return (
    <>
      <form>
        <Group>
          <TextInput
            name="categories"
            placeholder="Search Categories"
          />
          <Button color="gray.8" type="submit" >Search</Button>
        </Group>
      </form>
    </>
  )
}

export default Category;

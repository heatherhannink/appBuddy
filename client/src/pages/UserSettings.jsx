import { Image, Container, Box, Radio, RadioGroup, Stack, Button, ButtonGroup, Center } from '@chakra-ui/react';
import React from 'react';
import "../UserSettings.css"
import Navbar from '../components/Navbar'
import Auth from '../utils/auth'
import { useEffect, useState } from 'react';

function saveChanges(event) {
  event.preventDefault();
}

function UserSettings(props) {
  const [username, setUsername] = useState('')
  const [createdAt, setCreatedAt] =useState('')

  useEffect(() => {
    (async () => {
      const token = Auth.getToken()
      const id = Auth.getProfile().data._id
      const createdAt = Auth.getProfile().data.createdAt
      const result = await fetch(`http://localhost:3636/api/users/${id}`,
      
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      )
      const user = await result.json()
      setUsername(user.username)
      setCreatedAt(user.createdAt)
    })()
  }, [])




  
  return (
    <>
      <Navbar />

      {/* <Image src='./images/logo.rectangle.png' alt='logo' class='logo' /> */}

      {/* image to load for class presentation */}
      <Image src='./images/logo.png' alt='logo' class='logo' />

      <Container maxWidth="100vw" mx='-2rem' width="calc(100% + 4rem)" bg='#017354' centerContent>
        <Box padding='25' bg='#5d9363' color='black' maxW='md'>
          <Image
            borderRadius="full"
            boxSize='100px'
            src='./images/profile.png'
            alt='username photo' />
          <p>{username}</p>
          <p>Member since {createdAt}</p>
        </Box>
      </Container>

      <h2 style={{ fontSize: '1.8rem', textShadow: '2px 2px 0 #000', color: '#e4d78a' }}>Privacy Settings</h2>

      <form onSubmit={saveChanges}>
        <RadioGroup defaultValue='3'>

          <Stack>
            <Radio size='lg' name='privacySetting' value='1' colorScheme='yellow' px='2em'>
              It's ok to show my PROFILE PICTURE & USERNAME
            </Radio>
            <Radio size='lg' name='privacySetting' value='2' colorScheme='yellow' px='2em'>
              It's okay to show my USERNAME
            </Radio>
            <Radio size='lg' name='privacySetting' value='3' colorScheme='yellow' px='2em'>
              Do NOT Identify me
            </Radio>
          </Stack>

        </RadioGroup>
        <ButtonGroup variant='outline' spacing='6' padding={'10'}>
          <Button type='submit' bg='#e4d78a' color='black' borderColor='black'>Save Changes</Button>

        </ButtonGroup>
      </form>
    </>
  );
}

export default UserSettings
import { Input, Card, CardBody, Button, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useState } from 'react'
import Auth from '../utils/auth'
import "../App"

const Login = ({setStream}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const handleUsername = (event) => {
    const val = event.target.value
    setUsername(val)
  }

  const handlePassword = (event) => {
    const val = event.target.value
    setPassword(val)
  }

  const handlePassword2 = (event) => {
    const val = event.target.value
    setPassword2(val)
  }

  const handleSignup = async () => {
    if (password === password2) {
      try {

        const response = await fetch('http://localhost:3636/api/users', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        })

        const {stream, system} = (await response.json()).token
        Auth.login({stream, system})
    
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3636/api/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      const {stream, system} = (await response.json()).token
      Auth.login({stream, system})
     
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Signup</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Card>
              <CardBody>
                <Input
                  value={username}
                  placeholder='username'
                  m={3}
                  onChange={handleUsername}
                />
                <Input
                  value={password}
                  placeholder='password'
                  type='password'
                  onChange={handlePassword}
                  m={3} />
                <Button onClick={handleLogin}>Login</Button>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card>
              <CardBody>
                <Input
                  value={username}
                  placeholder='username'
                  m={3}
                  onChange={handleUsername}
                />
                <Input
                  value={password}
                  placeholder='password'
                  type='password'
                  onChange={handlePassword}
                  m={3} />
                <Input
                  value={password2}
                  placeholder='confirm password'
                  type='password'
                  onChange={handlePassword2}
                  m={3} />
                <Button isDisabled={password !== password2 || !password || !username} onClick={handleSignup}>Signup</Button>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <Card>
        <CardBody>
          <Input
            value={username}
            placeholder='username'
            m={3}
            onChange={handleUsername}
          />
          <Input
            value={password}
            placeholder='password'
            type='password'
            onChange={handlePassword}
            m={3} />
          <Button onClick={handleLogin}>Login</Button>
        </CardBody>
      </Card> */}
    </>
  )
}

export default Login
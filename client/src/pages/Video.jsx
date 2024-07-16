import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  useCall,
} from '@stream-io/video-react-sdk';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Box
} from '@chakra-ui/react'

import Login from './Login';
import Auth from '../utils/auth'
import '@stream-io/video-react-sdk/dist/css/styles.css';
import '../components/Video/styles.css'

import { useNavigate } from 'react-router-dom'

const apiKey = 'xxgwp4smg6ee'; // the API key can be found in the "Credentials" section
const callId = 'WpGxCpBldown'; // the call id can be found in the "Credentials" section

export default function Video() {
  return (
    <>
      {
        Auth.loggedIn()
          ? <Stream />
          : <Login />
      }

    </>
  )
}

const Stream = () => {
  //set up the user object
  const profile = Auth.getProfile().data
  const user = {
    id: profile._id,
    name: profile.username,
    image: `https://getstream.io/random_svg/?id=${profile.username}&name=${profile.username}}`,
  };

  const token = Auth.getStreamToken()

  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call('default', callId);
  call.join({ create: true });



  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

const MyUILayout = () => {
  const call = useCall();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate()

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <>
        <Box position='absolute' top={3} left={3} zIndex={999}>
          <Menu>
            <MenuButton as={Avatar} src='https://bit.ly/broken-link'>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate('/settings')}>Profile</MenuItem>
              <MenuItem onClick={() => { Auth.logout() }}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <StreamTheme>
          <SpeakerLayout participantsBarPosition='bottom' />
          <CallControls />
        </StreamTheme>
      </>

    </div>
  );
};
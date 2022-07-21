import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDyteClient, DyteProvider } from '@dytesdk/react-web-core';
import { useEffect, useState } from 'react';
import { useStore } from 'glassx';
import MeetingRoom from '../../components/rooms/MeetingRoom';
import { Meeting } from '@adplist/utils/src/@types/meeting';
import { User } from '@adplist/utils/src/@types/user';
import Link from 'next/link';
import { useGet, JoinMeeting } from '@adplist/utils';
import { v4 } from 'uuid';
import { withAuthenticationRequired } from '@auth0/auth0-react';

function ActiveRoom(props: any) {
  const router = useRouter();
  const { id: roomId } = router.query;

  const orgId = process.env.DYTE_ORG_ID;
  const apiKey = process.env.DYTE_API_KEY;

  const [joiningData, setJoiningData] = useStore('currentMeeting');
  const [roomStatus, setRoomStatus] = useState('LOADING');
  const [errorMessage, setErrorMessage] = useState('Could not find room');
  const [meeting, initMeeting] = useDyteClient();
  const [user] = useStore<User>('user');

  const [currentMeetingRes, loadingCurrentMeeting, currentMeetingError] =
    useGet(
      `${process.env.DYTE_API_URL}/organizations/${orgId}/meetings/${roomId}`,
      {
        authorization: apiKey,
      }
    );
  const currentMeeting: Meeting = currentMeetingRes?.data?.data?.meeting;

  useEffect(() => {
    if (!loadingCurrentMeeting && !(currentMeeting as Meeting)?.roomName) {
      setRoomStatus('ERROR');
    } else {
      setRoomStatus('SETTING-UP');
    }
  }, [currentMeeting, loadingCurrentMeeting]);

  useEffect(() => {
    if (!joiningData) {
      setJoiningData({
        organization: orgId,
        room: roomId,
        user: {
          id: v4(),
          name: user.given_name
            ? `${user.given_name} ${user.family_name}`
            : user.nickname,
          picture: user.picture,
          role: 'participant',
        },
      });
    }

    if (roomStatus === 'SETTING-UP') {
      JoinMeeting({
        apiUrl: process.env.DYTE_API_URL,
        organization: orgId,
        room: roomId,
        user: joiningData.user,
        apiKey,
      }).then((res: any) => {
        setJoiningData({
          ...joiningData,
          auth: res.data.data.authResponse,
        });

        //saving meeting details in session storage
        sessionStorage.setItem('auth', res.data.data.authResponse);
        sessionStorage.setItem('roomName', currentMeeting?.roomName);

        initDyteMeeting();
      }).catch((err: any) => {
        console.log(err, 'err')
      });
      
    }
  }, [roomStatus]);

  const initDyteMeeting = () => {
    const roomName = currentMeeting?.roomName;
    const authToken = joiningData?.auth?.authToken!;

    if (!roomName || !authToken) {
      setErrorMessage('Your meeting may have already ended.');
      setRoomStatus('ERROR');
    } else {
      initMeeting({
        roomName,
        authToken,
        defaults: {
          audio: false,
          video: false,
        },
      });

      setRoomStatus('ACTIVE');
    }
  };

  return (
    <>
      <Head>
        <title>Rooms - {roomId}</title>
        <meta name="description" content={`Room {roomId}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="room">
        {roomStatus === 'LOADING' && (
          <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
            Loading Room...
          </div>
        )}

        {roomStatus === 'SETTING-UP' && (
          <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
            Setting Up Room...
          </div>
        )}

        {roomStatus === 'ERROR' && (
          <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
            {errorMessage}. Check and try again or&nbsp;
            <Link href="/">
              <a>go back home</a>
            </Link>
          </div>
        )}

        {roomStatus === 'ACTIVE' && (
          <DyteProvider renderBeforeLoad={true} value={meeting}>
            <MeetingRoom />
          </DyteProvider>
        )}
      </main>
    </>
  );
}

export default withAuthenticationRequired(ActiveRoom);

export async function getServerSideProps({ req }: any) {
  return {
    props: {},
  };
}

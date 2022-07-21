import Head from 'next/head';
import GlassX from 'glassx';
import { useEffect } from 'react';
import { Meeting } from '@adplist/utils/src/@types/meeting';
import { useGet } from '@adplist/utils/dist';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Button } from '@adplist/core';
import UserDropdown from '../components/UserDropdown';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

// not working for some reason
// https://github.com/vercel/next.js/issues/19420
// const { DYTE_API_URL, DYTE_ORG_ID, DYTE_API_KEY } = process.env;
// problem is actually not from destructuring, it's when you try to
// access the entire process.env, so this will also not work:
// const env = process.env; const { DYTE_API_URL, DYTE_ORG_ID, DYTE_API_KEY } = env;

function Home() {
  const orgId = process.env.DYTE_ORG_ID;
  const apiKey = process.env.DYTE_API_KEY;

  const { user, isLoading } = useAuth0();

  const [roomsRes, loadingRooms, roomsErr] = useGet(
    `${process.env.DYTE_API_URL}/organizations/${orgId}/meetings`,
    { authorization: apiKey }
  );
  const rooms: Meeting[] = roomsRes?.data?.data?.meetings;

  useEffect(() => {
    if (!isLoading) {
      console.log(user);
      GlassX.set({ user });
    }
  }, [isLoading, user]);

  return (
    <>
      <Head>
        <title>All Rooms</title>
        <meta name="description" content={`Room {roomId}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="all-meetings-page container-sm">
        {!isLoading && (
          <div className="d-flex justify-content-between mt-5 mb-5">
            <div>
              <span>GOOD AFTERNOON</span>
              <h2>
                {user?.given_name || user?.nickname}
              </h2>
            </div>

            <UserDropdown />
          </div>
        )}

        {loadingRooms && (
          <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
            Loading all Rooms...
          </div>
        )}

        {rooms && (
          <div className="rooms-container">
            <div className="d-flex justify-content-between mt-5 mb-5">
              <div>
                <h5>ALL ROOMS</h5>
                <small>All your created rooms</small>
              </div>

              <div>
                <Button
                  className="btn btn-primary"
                  router={Link}
                  href="/rooms/create"
                >
                  New Room
                </Button>
              </div>
            </div>

            <div className="meeting-list row g-3 mt-1 mb-5">
              {!rooms.length && 'No rooms available'}
              {rooms.map((room) => (
                <Link key={room.id} href={`/rooms/${room.id}`}>
                  <div className="meeting col-12 col-sm-6">
                    <div
                      style={{
                        cursor: 'pointer',
                        background: '#262626',
                        borderRadius: 10,
                        padding: 15,
                      }}
                    >
                      <h4>{room.title}</h4>
                      <small>
                        Created on{' '}
                        {dayjs(room.createdAt || '').format('DD MMM YYYY')}
                      </small>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {roomsErr && <div>Could not load rooms. Refresh to try again</div>}
      </main>
    </>
  );
}

export default withAuthenticationRequired(Home);

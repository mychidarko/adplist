import Head from 'next/head';
import { Button, Form, useForm, Input } from '@adplist/core';
import { hermes } from '@adplist/utils/dist';
import GlassX from 'glassx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Meeting } from '@adplist/utils/src/@types/meeting';
import { useStore } from 'glassx';
import { User } from '@adplist/utils/src/@types/user';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { v4 } from 'uuid';

// not working for some reason
// https://github.com/vercel/next.js/issues/19420
// const { DYTE_API_URL, DYTE_ORG_ID, DYTE_API_KEY } = process.env;
// problem is actually not from destructuring, it's when you try to
// access the entire process.env, so this will also not work:
// const env = process.env; const { DYTE_API_URL, DYTE_ORG_ID, DYTE_API_KEY } = env;

function CreateRoom() {
  const orgId = process.env.DYTE_ORG_ID;
  const apiKey = process.env.DYTE_API_KEY;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user] = useStore<User>('user');

  const form = useForm({
    fields: {
      roomName: '',
    },
  });

  const { inputState, errors, onChange, onBlur } = form;

  const createRoom = () => {
    setLoading(true);

    hermes({
      url: `${process.env.DYTE_API_URL}/organizations/${orgId}/meeting`,
      authorization: apiKey,
      method: 'POST',
      data: {
        title: inputState.roomName,
        authorization: {
          waitingRoom: false,
        },
      },
    })
      .then((res) => {
        const meeting: Meeting = res.data.data.meeting;
        const meetings: Meeting[] = [...GlassX.get('meetings'), meeting];

        GlassX.set({
          meetings,
          currentMeeting: {
            organization: orgId,
            room: meeting.id,
            user: {
              id: v4(),
              name: user.given_name
                ? `${user.given_name} ${user.family_name}`
                : user.nickname,
              picture: user.picture,
              role: 'host',
            },
          },
        });

        return router.push(`/rooms/${meeting.id}`);
      })
      .catch((err) => {
        //
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Create a new room</title>
        <meta name="description" content={`Room {roomId}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="create-meeting-page vh-100 vw-100 d-flex align-items-center">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-50 d-none d-md-flex"
        />
        <Form
          style={{ minWidth: 300 }}
          className="create-meeting-form px-md-5"
          form={form}
          onSubmit={createRoom}
        >
          <h2 className="mb-4">Share meetings</h2>
          <Input
            name="roomName"
            label="Room Name"
            placeholder="Club meeting"
            className="mb-2"
            onChange={onChange}
            onBlur={onBlur}
            value={inputState.roomName}
            error={errors.roomName}
          />
          <Button loading={loading} className="w-100 mt-4" height={40}>
            Create Meeting
          </Button>
        </Form>
      </main>
    </>
  );
}

export default withAuthenticationRequired(CreateRoom);

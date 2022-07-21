import { DyteMeeting } from '@dytesdk/react-ui-kit';
import { useDyteMeeting } from '@dytesdk/react-web-core';
import { useRouter } from 'next/router';

export default function MeetingRoom() {
  const { meeting } = useDyteMeeting();
  const router = useRouter();

  return (
    <div className="vh-100 vw-100">
      <DyteMeeting
        onEnded={() => router.push('/')}
        showSetupScreen={true}
        mode="fill"
        meeting={meeting!}
      />
    </div>
  );
}

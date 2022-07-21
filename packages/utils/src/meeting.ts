import { hermes } from "./hermes";

export const JoinMeeting = async ({ apiUrl, organization, room, user, apiKey }: any) => {
  return hermes({
    authorization: apiKey,
    url: `${apiUrl}/organizations/${organization}/meetings/${room}/participant`,
    method: 'POST',
    data: {
      clientSpecificId: user.id,
      userDetails: {
        name: user.name,
        picture: user.picture,
      },
      roleName: user.role,
    },
  });
};

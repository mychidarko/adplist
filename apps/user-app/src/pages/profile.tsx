import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Button } from '@adplist/core';
import { useState } from 'react';

const Profile = () => {
  const { user, isLoading, logout } = useAuth0();
  const [loading, setLoading] = useState(false);

  return isLoading ? (
    <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
      Loading your information...
    </div>
  ) : (
    <div className="p-5 d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center mb-4">
        <img
          src={user?.picture}
          style={{
            borderRadius: '50%',
            width: 50,
            height: 50,
            marginBottom: 10,
          }}
          alt=""
        />
        <h4>
          {user?.given_name
            ? `${user.given_name} ${user.family_name}`
            : user?.nickname}
        </h4>
        <small>{user?.email}</small>
      </div>

      <Button
        loading={loading}
        className="btn btn-danger"
        onClick={() => {
          setLoading(true);
          logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default withAuthenticationRequired(Profile);

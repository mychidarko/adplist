import { Button } from '@adplist/core';
import { useAuth0 } from '@auth0/auth0-react';
import Modal, { modal } from 'react-ts-modal';
import { useStore } from 'glassx';
import { User } from '@adplist/utils/src/@types/user';
import { useState } from 'react';

const UserDropdown = () => {
  const { logout } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [user] = useStore<User>('user');

  return (
    <div className="position-relative">
      <img
        src={user?.picture}
        style={{ borderRadius: '50%', width: 50, height: 50 }}
        onClick={() => modal.show('user-profile-modal')}
        alt=""
      />

      <Modal closeButton={false} name="user-profile-modal">
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
            className="btn btn-danger w-100"
            onClick={() => {
              setLoading(true);
              logout();
            }}
          >
            Logout
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserDropdown;

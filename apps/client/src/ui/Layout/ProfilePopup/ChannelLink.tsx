import useUser from '../../../features/auth/hooks/useUser';
import { Link } from 'react-router-dom';

const ChannelLink = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="border-b-[1px] border-var-bg-tertiary dark:border-var-bg-tertiary-dark pb-4 pt-2 px-4">
      <div className="flex gap-4">
        <img
          src={user?.image}
          alt="avatar"
          className="w-10 h-10 rounded-full mt-1"
        />
        <div>
          {!user.channel && (
            <>
              <p className="text">{user.email}</p>
              <p className="text-sm text-var-text-secondary dark:text-var-text-secondary-dark">
                @user-name
              </p>
              <Link
                to="/channels/create"
                className="text-blue-500 hover:text-blue-600 duration text-sm"
              >
                Create a channel
              </Link>
            </>
          )}
          {user.channel && (
            <>
              <p className="text">{user.channel.title}</p>
              <p className="text-sm text-var-text-secondary dark:text-var-text-secondary-dark">
                {user.channel.handle}
              </p>
              <Link
                to={`/channels/${user.channel.handle}`}
                className="text-blue-500 hover:text-blue-600 duration text-sm"
              >
                View your channel
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelLink;

import { Link } from 'react-router-dom';

interface ProfilePopupLinkProps {
  className?: string;
  children: React.ReactNode;
  to: string;
  icon: string;
}

const ProfilePopupLink = (props: ProfilePopupLinkProps) => {
  const className = [
    'flex',
    'items-center',
    'gap-4',
    'px-4',
    'py-2',
    'hover:bg-var-bg-tertiary',
    'hover:dark:bg-var-bg-tertiary-dark',
    'transition'
  ];

  if (props.className) className.push(props.className);

  return (
    <Link className={className.join(' ')} to={props.to}>
      <svg className="w-6 h-6 fill-current">
        <use href={`/icons.svg#${props.icon}`} />
      </svg>
      <span>{props.children}</span>
    </Link>
  );
};

export default ProfilePopupLink;

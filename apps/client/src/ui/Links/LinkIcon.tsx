import { Link } from 'react-router-dom';

interface LinkIconProps {
  className?: string;
  to: string;
  icon: string;
}

const LinkIcon = (props: LinkIconProps) => {
  const className = [
    'w-9',
    'h-9',
    'text-inherit',
    'p-1.5',
    'rounded-full',
    'hover:bg-var-bg-tertiary',
    'dark:hover:bg-var-bg-tertiary-dark',
    'transition-colors',
    'duration'
  ];

  if (props.className) className.push(props.className);

  return (
    <Link to={props.to} className={className.join(' ')}>
      <svg className="w-full h-full fill-current">
        <use href={`/icons.svg#${props.icon}`} />
      </svg>
    </Link>
  );
};

export default LinkIcon;

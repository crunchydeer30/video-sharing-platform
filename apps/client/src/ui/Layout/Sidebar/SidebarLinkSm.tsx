import { NavLink } from 'react-router-dom';

interface SidebarLinkSmProps {
  className?: string;
  children: React.ReactNode;
  icon: string;
  to: string;
}

const SidebarLinkSm = (props: SidebarLinkSmProps) => {
  const className = [
    'text-inherit',
    'text-[10px]',
    'w-full',
    'flex',
    'flex-col',
    'gap-2',
    'px-4',
    'py-2',
    'items-center',
    'justify-center',
    'rounded-lg',
    'hover:bg-var-bg-tertiary',
    'dark:hover:bg-var-bg-tertiary-dark',
    'transition-colors',
    'duration'
  ];

  if (props.className) className.push(props.className);

  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        className.join(' ') +
        (isActive ? ' bg-var-bg-tertiary dark:bg-var-bg-tertiary-dark' : '')
      }
    >
      <svg className="w-6 h-6 fill-current">
        <use href={`/icons.svg#${props.icon}`} />
      </svg>
      <span>{props.children}</span>
    </NavLink>
  );
};

export default SidebarLinkSm;

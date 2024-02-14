import { NavLink } from 'react-router-dom';

interface SidebarLinkProps {
  className?: string;
  children: React.ReactNode;
  icon?: string;
  to: string;
}

const SidebarLink = (props: SidebarLinkProps) => {
  const className = [
    'text-inherit',
    'text-[15px]',
    'font-normal',
    'w-full',
    'flex',
    'gap-4',
    'px-4',
    'py-2',
    'rounded-lg',
    'items-center',
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
        (isActive
          ? ' bg-var-bg-tertiary dark:bg-var-bg-tertiary-dark !font-bold'
          : '')
      }
    >
      {props.icon ? (
        <>
          <svg className="w-6 h-6 fill-current">
            <use href={`/icons.svg#${props.icon}`} />
          </svg>
          <span>{props.children}</span>
        </>
      ) : (
        props.children
      )}
    </NavLink>
  );
};

export default SidebarLink;

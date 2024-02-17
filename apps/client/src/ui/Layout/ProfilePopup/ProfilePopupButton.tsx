interface ProfilePopupButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  icon: string;
}

const ProfilePopupButton = (props: ProfilePopupButtonProps) => {
  const className = [
    'flex',
    'items-center',
    'gap-4',
    'px-4',
    'py-2',
    'w-full',
    'hover:bg-var-bg-tertiary',
    'hover:dark:bg-var-bg-tertiary-dark',
    'transition'
  ];

  if (props.className) className.push(props.className);

  return (
    <button className={className.join(' ')} onClick={props.onClick}>
      <svg className="w-6 h-6 fill-current">
        <use href={`/icons.svg#${props.icon}`} />
      </svg>
      <span>{props.children}</span>
    </button>
  );
};

export default ProfilePopupButton;

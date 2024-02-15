interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
}

export const Button = (props: ButtonProps) => {
  const className = [
    'w-full',
    'p-2',
    'rounded-lg',
    'font-semibold',
    'text-var-text-primary',
    'dark:text-var-bg-primary-dark',
    'bg-var-bg-tertiary',
    'dark:bg-var-text-primary-dark',
    'hover:bg-var-bg-tertiary-dark',
    'dark:hover:bg-var-bg-tertiary',
    'transition-colors',
    'duration'
  ];

  if (props.className) className.push(props.className);

  return (
    <button className={className.join(' ')} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

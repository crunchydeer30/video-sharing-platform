import { useContext } from 'react';
import { SidebarContext } from '../../../context/SidebarContext';

interface SidebarToggleProps {
  className?: string;
}

const SidebarToggle = (props: SidebarToggleProps) => {
  const className = [
    'w-9',
    'h-9',
    'p-1.5',
    'rounded-full',
    'hover:bg-var-bg-tertiary',
    'dark:hover:bg-var-bg-tertiary-dark',
    'transition-colors',
    'duration',
    'text-var-text-primary',
    'dark:text-var-text-primary-dark'
  ];

  const { isSidebarToggled, setIsSidebarToggled } = useContext(SidebarContext);

  if (props.className) className.push(props.className);

  return (
    <button
      className={className.join(' ')}
      onClick={() => setIsSidebarToggled(!isSidebarToggled)}
    >
      <svg className="w-full h-full fill-current">
        <use href="/icons.svg#menu" />
      </svg>
    </button>
  );
};

export default SidebarToggle;

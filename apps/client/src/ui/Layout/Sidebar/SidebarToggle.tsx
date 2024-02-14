import { useContext } from 'react';
import { SidebarContext } from '../../../context/SidebarContext';
import { ActionTypes } from '../../../reducers/sidebarReducer';

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

  if (props.className) className.push(props.className);

  const { dispatch } = useContext(SidebarContext);

  return (
    <button
      className={className.join(' ')}
      onClick={() => dispatch(ActionTypes.TOGGLE)}
    >
      <svg className="w-full h-full fill-current">
        <use href="/icons.svg#menu" />
      </svg>
    </button>
  );
};

export default SidebarToggle;

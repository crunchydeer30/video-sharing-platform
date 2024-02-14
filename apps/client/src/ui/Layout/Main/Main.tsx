import { Outlet } from 'react-router-dom';

interface MainProps {
  className?: string;
}

const Main = (props: MainProps) => {
  const className = ['h-full'];

  if (props.className) className.push(props.className);

  return (
    <main className={className.join(' ')}>
      <Outlet />
    </main>
  );
};

export default Main;

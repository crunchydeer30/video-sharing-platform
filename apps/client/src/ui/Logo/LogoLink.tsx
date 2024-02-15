import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  to?: string;
}

const LogoLink = (props: LogoProps) => {
  const className = [];

  if (props.className) className.push(props.className);

  return (
    <Link to={props.to || '/'} className={className.join(' ')}>
      <img src="/logo-dark.png" alt="logo" />
    </Link>
  );
};

export default LogoLink;

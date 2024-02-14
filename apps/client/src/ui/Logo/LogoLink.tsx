import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  to?: string;
}

const LogoLink = (props: LogoProps) => {
  return (
    <Link to={props.to || '/'} className={props.className}>
      <img src="/logo-dark.png" alt="logo" />
    </Link>
  );
};

export default LogoLink;

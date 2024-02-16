import { Link } from 'react-router-dom';

const Feed = () => {
  return (
    <section className="grid grid-cols-6 gap-5 p-5">
      {Array(20)
        .fill(0)
        .map((_val, idx) => (
          <Link
            to="/video"
            key={idx}
            className="w-full aspect-video rounded-lg bg-var-bg-tertiary dark:bg-var-bg-tertiary-dark"
          ></Link>
        ))}
    </section>
  );
};

export default Feed;

const NotFound = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-5xl text-var-text-primary dark:text-var-text-primary-dark">
          404
        </p>
        <p className="text-3xl text-var-text-primary dark:text-var-text-primary-dark">
          Not Found
        </p>
      </div>
    </section>
  );
};

export default NotFound;

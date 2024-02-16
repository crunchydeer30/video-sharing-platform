import { zodResolver } from '@hookform/resolvers/zod';
import { loginBody } from '@shared/schemas';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '../../../ui/Form/Input/Input';
import { Link } from 'react-router-dom';
import { Button } from '../../../ui/Button/Button';
import useSignIn from '../hooks/useSignIn';
import { LoginBody } from '@shared/schemas';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginBody)
  });

  const { signIn } = useSignIn();

  const onSubmit = (data: FieldValues) => {
    signIn(data as LoginBody);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 text-inherit w-[400px] px-10 py-12 rounded-lg bg-var-bg-secondary \
      dark:bg-var-bg-secondary-dark border border-var-bg-tertiary dark:border-var-bg-tertiary-dark shadow-lg"
    >
      <div className="flex items-center gap-4 mr-6 mb-8 justify-center">
        <img
          src="/logo-textless.png"
          alt="log"
          className="block w-8 self-center translate-y-1"
        />
        <h1 className="text-3xl text-center font-bold">Sign In</h1>
      </div>

      <Input
        name="email"
        type="email"
        placeholder="Email"
        label="Email"
        register={register}
        error={errors.email}
      />

      <Input
        name="password"
        type="password"
        placeholder="Password"
        label="Password"
        register={register}
        error={errors.password}
      />

      <Button type="submit" className="my-6">
        Submit
      </Button>

      <section className="text-center">
        <p className="font-bold">Don't have an account?</p>
        <Link to="/register" className="underline font-bold text-red-500">
          Register
        </Link>
      </section>
    </form>
  );
};

export default LoginForm;

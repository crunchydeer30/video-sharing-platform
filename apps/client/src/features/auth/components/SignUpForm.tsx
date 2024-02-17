import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../../ui/Form/Input/Input';
import useSignUp from '../hooks/useSignUp';
import { Button } from '../../../ui/Button/Button';
import { Link } from 'react-router-dom';
import {
  AccountCreateBodyConfirmPassword,
  accountCreateBodyConfirmPassword
} from '../types';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AccountCreateBodyConfirmPassword>({
    resolver: zodResolver(accountCreateBodyConfirmPassword)
  });

  const signUp = useSignUp();

  const onSubmit = (data: AccountCreateBodyConfirmPassword) => {
    signUp(data);
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
          alt="logo"
          className="block w-8 self-center translate-y-1"
        />
        <h1 className="text-3xl text-center font-bold">Sign Up</h1>
      </div>

      <Input
        name="email"
        type="email"
        placeholder="Email"
        label="Email"
        register={register('email')}
        error={errors.email}
      />

      <Input
        name="password"
        type="password"
        placeholder="Password"
        label="Password"
        register={register('password')}
        error={errors.password}
      />

      <Input
        name="password_confirmation"
        type="password"
        placeholder="Confirm password"
        label="Confirm password"
        register={register('password_confirmation')}
        error={errors.password_confirmation}
      />

      <Button type="submit" className="my-6">
        Submit
      </Button>

      <section className="text-center">
        <p className="font-bold">Already have an account?</p>
        <Link to="/login" className="underline font-bold text-red-500">
          Sign In
        </Link>
      </section>
    </form>
  );
};

export default SignUpForm;

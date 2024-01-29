import { FormEvent, ReactNode, useState } from 'react';
import { Button } from '@/components/Button';
import { Greetings } from '@/components/Auth';
import { InputField } from '@/components/Form';
import { Navbar } from '@/components/Navigation';
import { SocialAccount } from '@/components/Auth';
import { IFormData } from '@/types';
import { Link, useNavigate } from 'react-router-dom';
import customFetch from '@/lib/customFetch';
import { Toaster, toast } from 'sonner';

function Register(): JSX.Element {
  const [registerValue, setRegisterValue] = useState<IFormData>({
    email: '',
    username: '',
    password: '',
    confirmPass: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterValue((existingVal) => {
      return { ...existingVal, [e.target.name]: e.target.value };
    });
  };

  const correctPassword: boolean =
    registerValue.password === registerValue.confirmPass;

  const navigate = useNavigate();
  const registerUser = async () => {
    try {
      const response = await customFetch('auth/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerValue.username,
          password: registerValue.password,
          email: registerValue.email,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Something bad happened. ${result.message}`);
      }
      toast.success('Register Successful!');
      return result;
    } catch (error) {
      toast.error(error as ReactNode);
      console.error(error);
      throw error;
    }
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (registerValue.password !== registerValue.confirmPass) {
      toast.error('Register failed! Invalid Data');
      return;
    }
    await registerUser();
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <>
      <div className="container lg:bg-[url('/src/assets/images/boy.png')] min-w-full lg:min-h-screen bg-no-repeat bg-bottom">
        <Navbar />
        <div className="px-[5%] lg:px-[10%] flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between lg:min-h-screen mt-16 lg:mt-0">
          <div className="w-full lg:w-1/3">
            <Greetings
              title="Join Us!"
              subTitle="Sea Wallet"
              desc="Already have an account?"
              textLink="Login here!"
            />
          </div>
          <Toaster richColors />
          <div className="flex flex-col gap-9 w-full lg:w-1/3">
            <h3 className="text-3xl">Register</h3>
            <form
              className="flex flex-col gap-7"
              name="registerForm"
              onSubmit={handleOnSubmit}
            >
              <InputField
                type="email"
                name="email"
                placeholder="Enter email"
                value={registerValue.email}
                onChange={handleOnChange}
              />
              <InputField
                type="text"
                name="username"
                placeholder="Enter username"
                value={registerValue.username!}
                onChange={handleOnChange}
              />
              <InputField
                type="password"
                name="password"
                placeholder="Enter password"
                value={registerValue.password}
                onChange={handleOnChange}
                err={`${
                  registerValue.password.length < 8 &&
                  registerValue.password.length > 0
                    ? 'Password must be 8 characters long'
                    : ''
                }`}
              />
              <InputField
                type="password"
                name="confirmPass"
                placeholder="Confirm password"
                value={registerValue.confirmPass!}
                onChange={handleOnChange}
                err={`${
                  !correctPassword && registerValue.confirmPass !== ''
                    ? 'Password not match'
                    : ''
                }`}
              />

              <Button type="submit">Register</Button>
            </form>
            <div className="flex flex-col lg:hidden">
              <p>Already have an account?</p>
              <span>
                You can{' '}
                <Link
                  to={'/login'}
                  className="cursor-pointer text-custom-purple font-semibold"
                >
                  Login here!
                </Link>
              </span>
            </div>
            <p className="text-center text-gray-400">or continue with</p>
            <SocialAccount page="register" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

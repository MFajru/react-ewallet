import { FormEvent, useState } from 'react';
import { Button } from '@/components/Button';
import { Greetings, SocialAccount } from '@/components/Auth';
import { InputField } from '@/components/Form';
import { Navbar } from '@/components/Navigation';
import { IFormData } from '@/types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores/stores';
import { fetchLogin } from '@/stores/slices/auth/loginSlice';
import { Toaster, toast } from 'sonner';

function Login(): JSX.Element {
  const [loginValue, setLoginValue] = useState<IFormData>({
    email: '',
    password: '',
  });
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => {
    return {
      response: state.login.response,
      status: state.login.status,
    };
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValue((existingData) => {
      return { ...existingData, [e.target.name]: e.target.value };
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      loginValue.email &&
      loginValue.password &&
      (user.status === 'idle' || user.status === 'failed')
    ) {
      dispatch(fetchLogin(loginValue));
      return;
    }
    toast.error('Login failed, please enter correct email and password.');
  };
  return (
    <>
      <div className="container lg:bg-[url('/src/assets/images/girl.png')] min-w-full lg:min-h-screen bg-no-repeat bg-bottom">
        <Navbar />
        <div className="px-[5%] lg:px-[10%] flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between lg:min-h-screen mt-[35%] lg:mt-0">
          <div className="w-full lg:w-1/3">
            <Greetings
              title="Sign in to"
              subTitle="Sea Wallet"
              desc="If you don't have an account register"
              textLink="Register here!"
            />
          </div>
          <div className="flex flex-col gap-9 w-full lg:w-1/3">
            <h3 className="text-3xl">Sign in</h3>
            <form className="flex flex-col gap-7" onSubmit={handleOnSubmit}>
              <InputField
                type="email"
                name="email"
                placeholder="Enter email or username"
                value={loginValue.email}
                onChange={handleOnChange}
              />
              <div className="flex flex-col">
                <InputField
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginValue.password}
                  onChange={handleOnChange}
                />
                <a href="##" className="text-end text-sm mt-3 text-gray-400">
                  Forgot password?
                </a>
              </div>
              <Button type="submit">Login</Button>
            </form>
            <Toaster richColors />
            <div className="flex flex-col lg:hidden">
              <p>If you don&apos;t have an account register</p>
              <span>
                You can{' '}
                <Link
                  to={'/register'}
                  className="cursor-pointer text-custom-purple font-semibold"
                >
                  Register here!
                </Link>
              </span>
            </div>
            <p className="text-center text-gray-400">or continue with</p>
            <SocialAccount page="login" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

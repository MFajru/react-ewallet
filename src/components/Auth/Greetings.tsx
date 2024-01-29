import { Link } from 'react-router-dom';

export type IGreetings = {
  title?: string;
  subTitle?: string;
  desc: string;
  textLink: string;
};

export function Greetings({
  title,
  subTitle,
  desc,

  textLink,
}: IGreetings): JSX.Element {
  return (
    <>
      <div className="hidden lg:block">
        <h1 className="font-bold text-5xl">{title}</h1>
        <h3 className="text-3xl mt-4">{subTitle}</h3>
      </div>
      <div className="hidden lg:block lg:mt-10">
        <p>{desc}</p>
        <span>
          You can{' '}
          <Link
            to={textLink === 'Register here!' ? '/register' : '/login'}
            className="cursor-pointer text-custom-purple font-semibold"
          >
            {textLink}
          </Link>
        </span>
      </div>
    </>
  );
}

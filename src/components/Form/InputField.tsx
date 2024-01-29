import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

type Input = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  err?: string;
};

export function InputField({
  type,
  placeholder,
  value,
  onChange,
  name,
  err,
}: Input): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const handleOnClick = () => {
    setShowPassword(!showPassword);
  };
  const innerType = showPassword ? 'text' : 'password';
  return (
    <>
      <div className="w-full relative">
        <input
          type={type === 'password' ? innerType : type}
          name={name}
          placeholder={placeholder}
          value={value}
          className="px-3 py-4 bg-custom-bright-purple rounded-md placeholder-custom-placholder-purple w-full text-base focus:outline-custom-purple"
          onChange={onChange}
          required
        />

        <button
          type="button"
          className={`absolute w-5 h-5 right-3 top-4 ${
            type !== 'password' ? 'hidden' : ''
          }`}
          onClick={handleOnClick}
        >
          {showPassword ? (
            <EyeIcon className="text-custom-placholder-purple" />
          ) : (
            <EyeSlashIcon className="text-custom-placholder-purple" />
          )}
        </button>
        <p className={`text-red-600 text-sm absolute left-0 bottom-[-20px]`}>
          {err}
        </p>
      </div>
    </>
  );
}

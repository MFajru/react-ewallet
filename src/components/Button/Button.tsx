import { ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  variants?:
    | 'primary'
    | 'secondary'
    | 'dropdownBig'
    | 'dropdownSmall'
    | 'secondaryIcon'
    | 'sidebarIcon'
    | 'sidebarIcons'
    | 'modalClose'
    | 'dropDownTopUp'
    | 'plain';
}

export function Button({
  children,
  type = 'button',
  variants = 'primary',
  ...props
}: IButton): JSX.Element {
  let style;
  switch (variants) {
    case 'primary':
      style = 'bg-custom-purple rounded-md text-white py-3 px-5';
      break;
    case 'secondary':
      style = 'bg-custom-red rounded-md text-white py-3 px-5';
      break;
    case 'dropdownBig':
      style = 'font-bold bg-gray-200 rounded-lg py-1.5 w-[147px] px-2 text-xs';
      break;
    case 'dropdownSmall':
      style = 'font-bold bg-gray-200 rounded-lg py-1.5 w-[80px] px-2 text-xs';
      break;
    case 'secondaryIcon':
      style = 'bg-gray-200 disabled:opacity-50 px-3 py-1 rounded-md';
      break;
    case 'sidebarIcon':
      style = 'w-full text-custom-gray flex justify-center lg:hidden';
      break;
    case 'sidebarIcons':
      style = 'w-full text-custom-gray flex justify-start items-center';
      break;
    case 'modalClose':
      style = 'w-fit text-custom-red';
      break;
    case 'dropDownTopUp':
      style =
        'px-3 py-4 bg-custom-bright-purple rounded-md w-full text-custom-placholder-purple text-left';
      break;
    case 'plain':
      style = 'rounded-md w-full text-left';
      break;
    default:
      break;
  }
  return (
    <button {...props} type={type} className={style}>
      {children}
    </button>
  );
}

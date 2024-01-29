import { Button } from '@/components/Button';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

type TDropdownButton = {
  buttonText: string;
  dropDownList: string[];
  dropdownVar?: 'small' | 'big' | 'topUp';
  onClick: React.Dispatch<React.SetStateAction<string[]>>;
};

export const DropdownButton = ({
  buttonText,
  dropDownList,
  dropdownVar = 'small',
  onClick,
}: TDropdownButton): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>();
  let style;
  switch (dropdownVar) {
    case 'small':
      style =
        'bg-gray-200 font-bold rounded-md text-center text-xs fixed px-4 py-1.5 mt-1';
      break;
    case 'big':
      style =
        'bg-gray-200 font-bold rounded-lg text-center text-xs fixed px-8 py-1.5 mt-1';
      break;
    case 'topUp':
      style =
        'px-3 py-4 bg-custom-bright-purple rounded-md w-[25rem] mt-2 text-custom-placholder-purple fixed z-10';
      break;
  }

  return (
    <div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variants={
          dropdownVar === 'topUp'
            ? 'dropDownTopUp'
            : dropdownVar === 'big'
              ? 'dropdownBig'
              : 'dropdownSmall'
        }
      >
        {dropdownVar === 'topUp' && (
          <div className="flex w-full justify-between">
            <p>{buttonText}</p>
            {isOpen ? (
              <ChevronUpIcon width={20} height={20} />
            ) : (
              <ChevronDownIcon height={20} width={20} />
            )}
          </div>
        )}
        {dropdownVar !== 'topUp' && buttonText}
      </Button>
      <div className={isOpen ? style : 'hidden'}>
        <ul className="flex flex-col gap-2">
          {dropDownList.map((dropDownItem, idx) => (
            <li key={idx}>
              <Button
                variants="plain"
                onClick={() => {
                  if (dropdownVar === 'big') {
                    onClick(dropDownItem.split(' - '));
                  } else if (dropdownVar === 'small') {
                    onClick([dropDownItem]);
                  } else {
                    const sourceID = (idx + 1).toString();
                    onClick([dropDownItem, sourceID]);
                    setIsOpen(!isOpen);
                  }
                }}
              >
                {dropDownItem}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

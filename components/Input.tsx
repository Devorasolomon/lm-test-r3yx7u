import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  color?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  register?: any;
}
// TODO: add missing typings
export function Input(props: InputProps) {
  const { register, value, onChange, color = 'blue', className, id, placeholder = 'Standard' } = props;

  const isGreen = color === 'green';

  const handleChange = (event: any) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="mx-auto h-8 w-64">
      <label className="relative justify-center items-center">
        <div className="">
          <input
            type="text"
            className={clsx(
              'peer placeholder-transparent outline-none absolute border border-1 border-t-0 border-r-0 border-l-0 border-b-slate-500 hover:border-b-slate-800 hover:border-b-2 focus:border-b-2',
              isGreen ? 'focus:border-b-green-500' : 'focus:border-b-blue-500'
            )}
            id={id}
            color={color}
            placeholder={placeholder}
            {...register('input', {
              required: true,
              minLength: 4,
              maxLength: 8,
              pattern: /^[A-Za-z]+$/,
            })}
            value={value}
            onChange={(e) => handleChange(e)}
          />
          <div
            className={clsx(
              'absolute cursor-text top-2 left-0 text-gray-500 text-xs transition-all -translate-y-6 peer-focus:-translate-y-6 peer-placeholder-shown:-translate-y-1/2 peer-focus:text-xs peer-placeholder-shown:text-base peer-focus:text-blue-500'
            )}
          >
            {placeholder}
          </div>
        </div>
      </label>
    </div>
  );
}

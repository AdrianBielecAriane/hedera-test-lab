import { UseFormRegisterReturn, useFormState } from 'react-hook-form';
import { prop } from 'remeda';

interface Props extends UseFormRegisterReturn {
  label?: string;
  placeholder?: string;
  type?: 'number' | 'text';
}

export const FormInput: React.FC<Props> = ({ label, type = 'text', name, placeholder, ...props }) => {
  const { errors } = useFormState<Record<string, unknown>>({ name, exact: true });
  const error = prop(errors, name);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} name={name} placeholder={placeholder} {...props} />
      {error && <p style={{ color: 'oklch(0.704 0.191 22.216)' }}>{error.message}</p>}
    </div>
  );
};

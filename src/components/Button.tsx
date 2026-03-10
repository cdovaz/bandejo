
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  fullWidth,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const baseClasses =
    'px-6 py-3 rounded-md font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-transform duration-300 hover:scale-105';
  const widthClasses = fullWidth ? 'w-full' : '';

  const colorClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
  };

  return (
    <button
      className={`${baseClasses} ${widthClasses} ${colorClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}

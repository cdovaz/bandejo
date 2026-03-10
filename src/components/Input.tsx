interface InputProps {
  id: string;
  name: string;
  type: string;
  required?: boolean;
}

export default function Input({ id, name, type, required }: InputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
    />
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      className={`p-2 rounded-md hover:ring-2 hover:ring-gray-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

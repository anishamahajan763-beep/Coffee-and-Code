import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextType | undefined>(
  undefined
);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within Select");
  }
  return context;
};

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

const Select = ({ value, onValueChange, children }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { isOpen, setIsOpen, value } = useSelectContext();

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0",
        className
      )}
      {...props}
    >
      <span>{props.children}</span>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({
  placeholder = "Select...",
}: {
  placeholder?: string;
}) => {
  const { value } = useSelectContext();
  return <span>{value || placeholder}</span>;
};

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useSelectContext();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

const SelectItem = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  const { value: selectedValue, onValueChange, setIsOpen } = useSelectContext();

  const handleSelect = () => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={cn(
        "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center",
        selectedValue === value && "bg-blue-50 text-blue-600 font-medium"
      )}
    >
      {children}
    </button>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };

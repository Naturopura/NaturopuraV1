import React, { createContext, useContext, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils'; // Assuming you have a utility for combining class names

// --- Context for ToggleGroup ---
interface ToggleGroupContextProps {
  type: 'single' | 'multiple';
  value: string | string[] | undefined;
  onValueChange: (value: string | string[]) => void;
}

const ToggleGroupContext = createContext<ToggleGroupContextProps | undefined>(undefined);

const useToggleGroup = () => {
  const context = useContext(ToggleGroupContext);
  if (context === undefined) {
    throw new Error('useToggleGroup must be used within a ToggleGroupProvider');
  }
  return context;
};

// --- ToggleGroupItem Variants ---
const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-emerald-100 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-emerald-500 data-[state=on]:text-white",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-emerald-200 bg-white hover:bg-emerald-100 hover:text-emerald-900",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
); // ✅ SEMICOLON properly ends the statement

interface ToggleGroupItemProps extends React.ComponentPropsWithoutRef<'button'>, VariantProps<typeof toggleVariants> {
  value: string;
  'aria-label'?: string;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  (props, ref) => {
    const {
      className,
      variant,
      size,
      value,
      'aria-label': ariaLabel,
      ...rest
    } = props;

    const { type, value: groupValue, onValueChange } = useToggleGroup();

    const isOn =
      type === 'single'
        ? groupValue === value
        : Array.isArray(groupValue) && groupValue.includes(value);

    const handleClick = useCallback(() => {
      if (type === 'single') {
        onValueChange(value);
      } else if (type === 'multiple') {
        const newValue = Array.isArray(groupValue)
          ? isOn
            ? groupValue.filter((item) => item !== value)
            : [...groupValue, value]
          : [value];
        onValueChange(newValue);
      }
    }, [type, value, groupValue, onValueChange, isOn]);

    return (
      <button
        ref={ref}
        className={cn(toggleVariants({ variant, size }), className)}
        data-state={isOn ? 'on' : 'off'}
        onClick={handleClick}
        aria-pressed={isOn}
        aria-label={ariaLabel}
        {...rest}
      />
    );
  }
);
ToggleGroupItem.displayName = 'ToggleGroupItem';

// --- ToggleGroup Component ---
interface ToggleGroupProps extends React.ComponentPropsWithoutRef<'div'>, VariantProps<typeof toggleVariants> {
  type: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  defaultValue?: string | string[];
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, type, value: propValue, onValueChange: propOnValueChange, defaultValue, children, ...props }, ref) => {
    const isControlled = propValue !== undefined;
    const [internalValue, setInternalValue] = useState<string | string[]>(
      defaultValue || (type === 'single' ? '' : [])
    );

    const value = isControlled ? propValue : internalValue;

    const handleValueChange = useCallback((newValue: string | string[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      propOnValueChange?.(newValue);
    }, [isControlled, propOnValueChange]);

    const contextValue = {
      type,
      value: value,
      onValueChange: handleValueChange,
    };

    return (
      <ToggleGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("flex items-center", className)}
          role="group"
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  }
);
ToggleGroup.displayName = 'ToggleGroup';

export { ToggleGroup, ToggleGroupItem };

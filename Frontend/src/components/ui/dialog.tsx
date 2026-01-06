import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogContextType {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(
  undefined
);

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const Dialog = ({ open = false, onOpenChange, children }: DialogProps) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => onOpenChange?.(false)}
          />
          <div
            role="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {children}
          </div>
        </>
      )}
    </DialogContext.Provider>
  );
};

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full max-w-lg max-h-screen mx-4 gap-4 border bg-white p-6 shadow-lg rounded-lg overflow-y-auto",
        className
      )}
      {...props}
    />
  );
});
DialogContent.displayName = "DialogContent";

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
);
DialogTitle.displayName = "DialogTitle";

interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

import { cn } from "@/lib/utils";

interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "destructive";
  className?: string;
}

export function Alert({ children, variant = "default", className }: AlertProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-lg border p-4",
        variant === "default" && "border-blue-200 bg-blue-50 text-blue-900",
        variant === "destructive" && "border-red-200 bg-red-50 text-red-900",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AlertDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("text-sm", className)}>{children}</div>;
}
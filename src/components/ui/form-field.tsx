import * as React from "react";
import { cn } from "@/lib/utils";

// Form field — label, input/textarea, helper text, error state.
// Per PHASE-6-DESIGN-SYSTEM.md: built as a real functional component from
// the start (this directly fixes the Phase 2 bug where the current site's
// contact form has no actual <input>/<textarea> elements at all).

const fieldControlClasses = cn(
  "w-full rounded-sm border border-border bg-bg-surface px-3 py-2.5 text-sm text-fg",
  "placeholder:text-fg-muted",
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus",
  "disabled:pointer-events-none disabled:opacity-disabled"
);

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, "aria-invalid": ariaInvalid, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(fieldControlClasses, ariaInvalid && "border-danger", className)}
      aria-invalid={ariaInvalid}
      {...props}
    />
  )
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, "aria-invalid": ariaInvalid, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      fieldControlClasses,
      "min-h-30 resize-y",
      ariaInvalid && "border-danger",
      className
    )}
    aria-invalid={ariaInvalid}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export interface FormFieldProps {
  /** Unique id shared between the label, control, and helper/error text. */
  id: string;
  label: string;
  /** Marks the field required and appends a visual "*" to the label. */
  required?: boolean;
  /** Neutral guidance text, hidden when `error` is set. */
  helperText?: string;
  /** Validation error message — when set, the control gets a danger border and this replaces helperText. */
  error?: string;
  /** Render a <textarea> instead of an <input>. */
  multiline?: boolean;
  className?: string;
  children?: never;
}

function FormField({
  id,
  label,
  required,
  helperText,
  error,
  multiline,
  className,
  ...controlProps
}: FormFieldProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id">) {
  const describedById = error ? `${id}-error` : helperText ? `${id}-helper` : undefined;
  const Control = multiline ? Textarea : Input;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="font-mono text-[0.625rem] tracking-[0.2em] text-fg-muted uppercase"
      >
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <Control
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedById}
        aria-required={required}
        {...(controlProps as React.InputHTMLAttributes<HTMLInputElement> &
          React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-xs text-fg-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export { Input, Textarea, FormField };

import * as React from "react"
import { cn } from "@/lib/utils"
import ArrowDown from "@/assets/icons/ArrowDown"
import EyeSlashIcon from "@/assets/icons/EyeSlashIcon"
import EyeIcon from "@/assets/icons/EyeIcon"


export interface FieldLabelProps {
  label: string
  required?: boolean
  htmlFor?: string
  className?: string
}

const FieldLabel = ({ label, required, htmlFor, className }: FieldLabelProps) => (
  <label
    htmlFor={htmlFor}
    className={cn("mb-1 block text-sm font-medium text-text-950", className)}
  >
    {label}
    {required && <span className="ml-0.5 text-danger">*</span>}
  </label>
)

const ErrorMessage = ({ message }: { message?: string }) =>
  message ? (
    <p className="mt-1 text-xs text-danger">{message}</p>
  ) : null


// ─────────────────────────────────────────────
// 1. Internal Text Input
// ─────────────────────────────────────────────
interface InternalTextInputProps extends React.ComponentProps<"input"> {
  label?: string
  required?: boolean
  error?: boolean
  errorMessage?: string
  labelClassName?: string
}

const InternalTextInput = React.forwardRef<HTMLInputElement, InternalTextInputProps>(
  ({ label, required, error: externalError, errorMessage: externalErrorMessage, labelClassName, className, id, onBlur, onChange, type, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-")
    const [internalError, setInternalError] = React.useState<string | null>(null)
    const [showPassword, setShowPassword] = React.useState(false)

    const validate = (val: string) => {
      // Required Validation
      if (required && !val.trim()) {
        setInternalError(`${label || 'This field'} is required`)
        return false
      }
      // Email Regex Validation
      if (type === "email" && val.trim().length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(val)) {
          setInternalError("Please enter a valid email address format")
          return false
        }
      }
      // Password length check basic
      if (type === "password" && val.trim().length > 0 && val.length < 6) {
        setInternalError("Password must be at least 6 characters")
        return false
      }

      setInternalError(null)
      return true
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      validate(e.target.value)
      onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (internalError) validate(e.target.value)
      onChange?.(e)
    }

    const activeError = externalError !== undefined ? externalError : !!internalError
    const activeErrorMessage = activeError ? (externalErrorMessage || internalError) : null
    const inputType = type === "password" ? (showPassword ? "text" : "password") : type

    return (
      <div className="flex flex-col">
        {label && (
          <FieldLabel label={label} required={required} htmlFor={inputId} className={labelClassName} />
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            aria-invalid={activeError ? "true" : undefined}
            data-slot="input"
            onBlur={handleBlur}
            onChange={handleChange}
            className={cn(
              "h-[42px] w-full rounded-lg bg-white px-4 py-2 outline-none transition-colors duration-150 text-sm",
              // Default
              "border border-text-200 text-text-500 placeholder:text-text-500",
              // Active / Focus
              "focus:border-primary-400 focus-visible:border-primary-400 focus:text-text-950",
              // Filled
              "not-placeholder-shown:text-text-950",
              // Disabled
              "disabled:cursor-not-allowed disabled:border-text-100 disabled:bg-text-100 disabled:text-text-500 disabled:opacity-100 disabled:placeholder:text-text-500",
              // Error
              activeError && "border-danger text-text-950 focus:border-danger focus-visible:border-danger placeholder:text-text-500",
              
              type === "password" && "pr-10",
              inputType === "password" && "font-['system-ui',sans-serif] tracking-[0.2em] text-lg font-bold",
              className
            )}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-400 hover:text-text-600 cursor-pointer focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeIcon/>
              ) : (
                <EyeSlashIcon/>
              )}
            </button>
          )}
        </div>
        <ErrorMessage message={activeErrorMessage ?? undefined} />
      </div>
    )
  }
)
InternalTextInput.displayName = "InternalTextInput"


// ─────────────────────────────────────────────
// 2. Internal OTP Input
// ─────────────────────────────────────────────
interface InternalOtpInputProps {
  length?: number
  label?: string
  required?: boolean
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  value?: string[]
  onChange?: (value: string[]) => void
  labelClassName?: string
}

const InternalOtpInput = ({
  length = 6,
  label,
  required,
  error: externalError,
  errorMessage: externalErrorMessage,
  disabled,
  value,
  onChange,
  labelClassName,
}: InternalOtpInputProps) => {
  const [internalValues, setInternalValues] = React.useState<string[]>(Array(length).fill(""))
  const [internalError, setInternalError] = React.useState<string | null>(null)
  const refs = React.useRef<(HTMLInputElement | null)[]>([])
  const values = value ?? internalValues

  const validate = (vals: string[]) => {
    if (required) {
      const isComplete = vals.every(v => v.trim() !== "")
      if (!isComplete && vals.some(v => v.trim() !== "")) {
        setInternalError(`Please fill all ${length} digits.`)
        return false
      } else if (!isComplete) {
        setInternalError(`${label || 'Verification code'} is required`)
        return false
      }
    }
    setInternalError(null)
    return true
  }

  const handleChange = (index: number, char: string) => {
    const sanitized = char.replace(/\D/g, "").slice(-1)
    const next = [...values]
    next[index] = sanitized
    onChange ? onChange(next) : setInternalValues(next)
    
    if (internalError) validate(next)
    
    if (sanitized && index < length - 1) {
      refs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
    const next = [...values]
    pasted.split("").forEach((char, i) => { next[i] = char })
    onChange ? onChange(next) : setInternalValues(next)
    if (internalError) validate(next)
    refs.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  const handleBlur = () => {
    validate(values)
  }

  const activeError = externalError !== undefined ? externalError : !!internalError
  const activeErrorMessage = activeError ? (externalErrorMessage || internalError) : null

  return (
    <div className="flex flex-col" onBlur={handleBlur}>
      {label && <FieldLabel label={label} required={required} className={labelClassName} />}
      <div className="flex gap-2">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            aria-invalid={activeError ? "true" : undefined}
            value={values[i] ?? ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={cn(
              "h-[42px] w-[42px] rounded-lg bg-white text-center text-sm font-medium outline-none transition-colors duration-150",
              "border border-text-200 text-text-500",
              "focus:border-primary-400 focus-visible:border-primary-400 focus:text-text-950",
              values[i] && "text-text-950",
              "disabled:cursor-not-allowed disabled:border-text-100 disabled:bg-text-100 disabled:text-text-500 disabled:opacity-100",
              activeError && "border-danger text-text-950 focus:border-danger focus-visible:border-danger"
            )}
          />
        ))}
      </div>
      <ErrorMessage message={activeErrorMessage ?? undefined} />
    </div>
  )
}


// ─────────────────────────────────────────────
// 3. Internal Phone Input
// ─────────────────────────────────────────────
export interface CountryCode { code: string; flag?: string }
interface InternalPhoneInputProps {
  label?: string
  required?: boolean
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  countryCodes?: CountryCode[]
  defaultCountryCode?: string
  value?: string
  onValueChange?: (phone: string, countryCode: string) => void
  placeholder?: string
  id?: string
  labelClassName?: string
  className?: string
}

const DEFAULT_CODES: CountryCode[] = [
  { code: "+91" }, { code: "+1" }, { code: "+44" }, { code: "+61" }, { code: "+971" },
]

const InternalPhoneInput = ({
  label, required, error: externalError, errorMessage: externalErrorMessage, disabled, countryCodes = DEFAULT_CODES,
  defaultCountryCode = "+91", value, onValueChange, placeholder = "98765 54152", id, labelClassName, className
}: InternalPhoneInputProps) => {
  const [selectedCode, setSelectedCode] = React.useState(defaultCountryCode)
  const [phone, setPhone] = React.useState(value ?? "")
  const [internalError, setInternalError] = React.useState<string | null>(null)
  const inputId = id ?? "phone-input"
  const [focused, setFocused] = React.useState(false)

  const validate = (val: string) => {
    if (required && !val.trim()) {
      setInternalError(`${label || 'Phone number'} is required`)
      return false
    }
    if (val.trim().length > 0) {
      const digitsOnly = val.replace(/\D/g, '')
      if (digitsOnly.length < 10) {
        setInternalError("Please enter a valid 10-digit phone number")
        return false
      }
    }
    setInternalError(null)
    return true
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setPhone(val)
    if (internalError) validate(val)
    onValueChange?.(val, selectedCode)
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCode(e.target.value)
    onValueChange?.(phone, e.target.value)
  }

  const handleBlur = () => {
    setFocused(false)
    validate(phone)
  }

  const activeError = externalError !== undefined ? externalError : !!internalError
  const activeErrorMessage = activeError ? (externalErrorMessage || internalError) : null

  return (
    <div className="flex flex-col">
      {label && <FieldLabel label={label} required={required} htmlFor={inputId} className={labelClassName} />}
      <div
        className={cn(
          "flex h-[42px] w-full overflow-hidden rounded-lg border bg-white transition-colors duration-150",
          activeError ? "border-danger text-text-950" : focused ? "border-primary-400 text-text-950" : "border-text-200 text-text-500",
          phone.length > 0 && "text-text-950",
          disabled && "border-text-100 bg-text-100 text-text-500 opacity-100",
          className
        )}
      >
        <div className="relative flex items-center border-r border-border px-2">
          <select
            disabled={disabled}
            value={selectedCode}
            onChange={handleCodeChange}
            className={cn(
              "appearance-none bg-transparent pr-4 text-sm font-medium text-text-950 outline-none cursor-pointer",
              "disabled:cursor-not-allowed disabled:text-text-400",
              activeError && "text-danger/90"
            )}
          >
            {countryCodes.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
          </select>
          <span className={cn("pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-text-500", disabled && "text-text-400")}>
            <ArrowDown></ArrowDown>
          </span>
        </div>
        <input
          id={inputId}
          type="tel"
          disabled={disabled}
          value={phone}
          placeholder={placeholder}
          onChange={handlePhoneChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          className={cn(
            "flex-1 bg-transparent px-3 text-sm placeholder:text-text-500 outline-none",
            phone.length > 0 ? "text-text-950" : "text-text-500",
            "disabled:cursor-not-allowed disabled:text-text-500 disabled:placeholder:text-text-500",
            activeError && "text-text-950"
          )}
        />
      </div>
      <ErrorMessage message={activeErrorMessage ?? undefined} />
    </div>
  )
}

// ─────────────────────────────────────────────
// Unified Input Component
// ─────────────────────────────────────────────
export interface InputProps extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {
  type?: React.HTMLInputTypeAttribute | "otp" | "phone"
  
  // Shared
  label?: string
  required?: boolean
  error?: boolean
  errorMessage?: string
  labelClassName?: string
  
  // Types
  value?: string | string[] | number | readonly string[]
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | ((val: any) => void) | any
  
  // OTP specific
  length?: number
  
  // Phone specific
  countryCodes?: CountryCode[]
  defaultCountryCode?: string
  onPhoneChange?: (phone: string, countryCode: string) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", ...props }, ref) => {
    
    if (type === "otp") {
      return (
        <InternalOtpInput
          length={props.length}
          label={props.label}
          required={props.required}
          error={props.error}
          errorMessage={props.errorMessage}
          disabled={props.disabled}
          value={props.value as string[]}
          onChange={props.onChange}
          labelClassName={props.labelClassName}
        />
      )
    }

    if (type === "phone") {
      return (
        <InternalPhoneInput
          label={props.label}
          required={props.required}
          error={props.error}
          errorMessage={props.errorMessage}
          disabled={props.disabled}
          countryCodes={props.countryCodes}
          defaultCountryCode={props.defaultCountryCode}
          value={props.value as string}
          onValueChange={props.onPhoneChange}
          placeholder={props.placeholder}
          id={props.id}
          labelClassName={props.labelClassName}
          className={props.className}
        />
      )
    }

    // Default HTML Input logic (text, password, email, number)
    return <InternalTextInput type={type} ref={ref} {...(props as any)} />
  }
)
Input.displayName = "Input"

export { Input, FieldLabel, ErrorMessage }

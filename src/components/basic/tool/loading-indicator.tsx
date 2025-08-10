import { Spinner } from "@heroui/react";

interface LoadingIndicatorProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingIndicator({
  message = "加载中...",
  size = "md",
  className = "",
}: LoadingIndicatorProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <Spinner
        size={size}
        color="primary"
        classNames={{
          base: "animate-spin",
        }}
      />
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}

// 内联加载指示器
export function InlineLoadingIndicator({
  message = "加载中",
  size = "sm",
  className = "",
}: LoadingIndicatorProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Spinner
        size={size}
        color="primary"
        classNames={{
          base: "animate-spin",
        }}
      />
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {message}
      </span>
    </div>
  );
}

import { Button } from "@heroui/react";
import { useNavigate } from "react-router";

interface ErrorPageProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  className?: string;
}

export function ErrorPage({
  title = "出错了",
  message = "",
  showHomeButton = true,
  showBackButton = true,
  className = "",
}: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-[calc(100vh-300px)] bg-white dark:bg-gray-950 flex items-center justify-center p-4 ${className}`}
    >
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
        {message ? (
          <p className="text-gray-600 dark:text-gray-400">{message}</p>
        ) : null}
        <div className="flex justify-center gap-3">
          {showHomeButton && (
            <Button color="primary" onPress={() => navigate("/")}>
              返回首页
            </Button>
          )}
          {showBackButton && (
            <Button variant="light" onPress={() => navigate(-1)}>
              返回上页
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

import { Button } from "@heroui/react";
import { IconHome, IconArrowLeft, IconRefresh } from "@tabler/icons-react";
import { useNavigate } from "react-router";

interface ErrorPageProps {
  title?: string;
  message?: string;
  code?: string | number;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  className?: string;
}

export function ErrorPage({
  title = "页面出错",
  message = "抱歉，页面加载时出现了错误。",
  code,
  showHomeButton = true,
  showBackButton = true,
  showRefreshButton = true,
  onRefresh,
  className = "",
}: ErrorPageProps) {
  const navigate = useNavigate();

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-950 ${className}`}
    >
      <div className="text-center max-w-md mx-auto px-4">
        {/* 错误代码 */}
        {code && (
          <div className="text-5xl font-bold text-gray-300 dark:text-gray-700 mb-4">
            {code}
          </div>
        )}

        {/* 标题 */}
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {title}
        </h1>

        {/* 错误信息 */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showBackButton && (
            <Button
              color="primary"
              variant="solid"
              startContent={<IconArrowLeft size={18} />}
              onPress={() => navigate(-1)}
              className="min-w-[120px]"
            >
              返回上页
            </Button>
          )}

          {showHomeButton && (
            <Button
              color="default"
              variant="bordered"
              startContent={<IconHome size={18} />}
              onPress={() => navigate("/")}
              className="min-w-[120px]"
            >
              返回首页
            </Button>
          )}

          {showRefreshButton && (
            <Button
              color="secondary"
              variant="flat"
              startContent={<IconRefresh size={18} />}
              onPress={handleRefresh}
              className="min-w-[120px]"
            >
              重新加载
            </Button>
          )}
        </div>

        {/* 时间戳 */}
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>时间: {new Date().toLocaleString("zh-CN")}</p>
        </div>
      </div>
    </div>
  );
}

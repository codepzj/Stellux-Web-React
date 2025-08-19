import { useNavigate } from "react-router";
import { Button } from "@heroui/react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            页面未找到
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            抱歉，您访问的页面不存在或已被移动。
          </p>
          <div className="flex justify-center gap-3">
            <Button color="primary" onPress={() => navigate("/")}>
              返回首页
            </Button>
            <Button variant="light" onPress={() => navigate(-1)}>
              返回上页
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

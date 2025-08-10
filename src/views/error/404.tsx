import { useNavigate } from "react-router";
import { Button } from "@heroui/react";
import {
  IconHome,
  IconArrowLeft,
  IconAlertTriangle,
} from "@tabler/icons-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          {/* 404 图标和标题 */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
              <IconAlertTriangle
                size={40}
                className="text-red-500 dark:text-red-400"
              />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              404
            </h1>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              页面未找到
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              抱歉，您访问的页面不存在或已被移动。
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              color="primary"
              variant="solid"
              startContent={<IconArrowLeft size={18} />}
              onPress={() => navigate(-1)}
              className="min-w-[120px]"
            >
              返回上页
            </Button>
            <Button
              color="default"
              variant="bordered"
              startContent={<IconHome size={18} />}
              onPress={() => navigate("/")}
              className="min-w-[120px]"
            >
              返回首页
            </Button>
          </div>

          {/* 底部信息 */}
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>错误代码: 404 | 时间: {new Date().toLocaleString("zh-CN")}</p>
          </div>
        </div>
      </div>
    </>
  );
}

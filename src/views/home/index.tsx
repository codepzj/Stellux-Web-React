import { Button } from "@heroui/react";
import { useNavigate } from "react-router";

export default function Page() {
  const navigate = useNavigate();

  return (
    <main className="h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-950 overflow-hidden">
      <section className="w-full max-w-4xl px-6 py-32 flex flex-col items-center justify-center relative">
        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            也许建站是为了<span className="text-primary">记录知识</span>吧
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            低级的欲望通过放纵就可获得；高级的欲望通过自律方可获得；顶级的欲望通过煎熬才可获得。“所谓自由，不是随心所欲，而是自我主宰。”
          </p>

          <div className="flex space-x-4 justify-center pt-4">
            <Button
              className="px-6 py-2.5"
              color="primary"
              onPress={() => navigate("/blog")}
            >
              博客
            </Button>
            <Button
              className="px-6 py-2.5 border"
              color="secondary"
              onPress={() => navigate("/document")}
            >
              文档
            </Button>
          </div>
        </div>

        {/* 波浪装饰 */}
        <div className="absolute inset-x-0 bottom-0 h-24 overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 V120 H0 Z"
              fill="currentColor"
              className="text-gray-100 dark:text-gray-900 opacity-50"
            />
            <path
              d="M0,90 C240,30 480,150 720,90 C960,30 1200,150 1440,90 V120 H0 Z"
              fill="currentColor"
              className="text-gray-200 dark:text-gray-800 opacity-30"
            />
          </svg>
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-950">
      <section className="w-full py-24 flex flex-col items-center justify-center relative">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
          也许建站是为了记录知识吧
        </h1>
        {/* 浅色波浪线装饰 */}
        <div className="w-full absolute left-0 bottom-0 pointer-events-none select-none">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 Q360,60 720,30 T1440,30 V60 H0 Z"
              fill="#e0e7ef"
              opacity="0.5"
            />
            <path
              d="M0,40 Q360,20 720,40 T1440,40 V60 H0 Z"
              fill="#cbd5e1"
              opacity="0.3"
            />
          </svg>
        </div>
      </section>
    </main>
  );
}

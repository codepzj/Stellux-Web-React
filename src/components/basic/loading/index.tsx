import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner color="primary" label="加载中..." />
    </div>
  );
}

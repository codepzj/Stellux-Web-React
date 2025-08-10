import { Button } from "@heroui/react";
import { IconArrowUp } from "@tabler/icons-react";

export function BackToTop() {
  return (
    <Button
      isIconOnly
      color="default"
      size="md"
      aria-label="回到顶部"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
      radius="full"
      onPress={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      variant="solid"
      className="fixed z-50 bottom-6 right-6 shadow-lg transition-opacity duration-300"
    >
      <IconArrowUp className="w-5 h-5" />
    </Button>
  );
}

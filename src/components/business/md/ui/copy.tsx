import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@heroui/react";

const CopyButton = ({
  copyId,
  className,
}: {
  copyId: string;
  className?: string;
}) => {
  const [copied, setCopited] = useState(false);
  const onCopy = async () => {
    try {
      setCopited(true);
      const text = document.getElementById(copyId)!.innerText;
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        setCopited(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onPress={onCopy}
      isIconOnly
      aria-label="Copy"
      variant="light"
      className={`p-0 w-8 h-8 min-w-8 min-h-8 rounded-md cursor-pointer hover:bg-default-100 dark:hover:bg-default-500/10 ${className}`}
    >
      {copied ? (
        <Check className="transition-transform duration-300" size={16} />
      ) : (
        <Copy className="transition-transform duration-300" size={16} />
      )}
    </Button>
  );
};

export default CopyButton;

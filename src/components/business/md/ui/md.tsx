import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import CopyButton from "./copy";
import "./md.css";
import { cn } from "@/lib/utils";
import { Alert, Image } from "@heroui/react";

// 引入mermaid
import mermaid from "mermaid";

// 引入katex
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// Mermaid渲染组件
const Mermaid = ({ code }: { code: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const id = "mermaid-" + Math.random().toString(36).slice(2, 11);
      ref.current.id = id;
      mermaid.initialize({ startOnLoad: false });
      ref.current.innerHTML = "";
      mermaid
        .render(id + "-svg", code)
        .then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        })
        .catch((e: any) => {
          console.error(e);
          if (ref.current) {
            ref.current.innerHTML = `<pre>${code}</pre>`;
          }
        });
    }
  }, [code]);

  return (
    <div
      ref={ref}
      className="my-4 grid grid-cols-1 place-items-center overflow-x-auto"
    />
  );
};

export default function Md({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const indexRef = React.useRef(1);
  return (
    <article className={cn("markdown-body", className)}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          h2: ({ children }) => (
            <h2
              id={`header-${indexRef.current++}`}
              className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 my-6"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              id={`header-${indexRef.current++}`}
              className="scroll-m-20 text-2xl font-semibold tracking-tight my-4"
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-2">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="mt-4 leading-7">{children}</p>,
          blockquote: ({ children }) => {
            return (
              <Alert className="blockquote" color="default" title={children} />
            );
          },

          table: ({ children }) => (
            <table className="mt-6 w-full border">{children}</table>
          ),
          tr: ({ children }) => (
            <tr className="even:bg-muted border-t">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-left align-top [&[align=center]]:text-center [&[align=right]]:text-right">
              {children}
            </td>
          ),
          ul: ({ children }) => (
            <ul className="mt-4 list-disc [&>li]:mt-2 [&>li]:ml-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-4 list-decimal [&>li]:mt-2 [&>li]:ml-0">
              {children}
            </ol>
          ),
          img: ({ src, alt }) => (
            <Image className="my-6" src={src as string} alt={alt as string} />
          ),
          a: ({ children, href }) => (
            <a href={href as string} className="text-primary">
              {children}
            </a>
          ),
          pre: ({ children }) => (
            <pre className="rounded-md bg-zinc-100 dark:bg-zinc-900 !p-0 my-4 overflow-x-auto">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className || "");
            const count =
              React.Children.toArray(children).length === 1
                ? (
                    React.Children.toArray(children)[0]
                      .toString()
                      .match(/\n/g) || []
                  ).length
                : 0;

            // 支持mermaid
            if (match && match[1] === "mermaid") {
              // 只取children的文本内容
              const code =
                typeof children === "string"
                  ? children
                  : React.Children.toArray(children)
                      .map((c) => (typeof c === "string" ? c : ""))
                      .join("");
              return <Mermaid code={code} />;
            }
            if (match?.length || count > 0) {
              const id = Math.random().toString(36).slice(2, 11);
              return (
                <div className="not-prose relative rounded-md text-sm">
                  <div
                    className="overflow-x-auto p-4 bg-zinc-100 dark:bg-zinc-900/50 rounded-b-md"
                    id={id}
                    suppressHydrationWarning
                  >
                    <CopyButton
                      className="absolute top-1.5 right-1.5"
                      copyId={id}
                    />
                    {children}
                  </div>
                </div>
              );
            }

            // 单行代码块
            return (
              <code className="rounded-md bg-muted px-2 mx-1 py-0.5 text-sm text-foreground">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

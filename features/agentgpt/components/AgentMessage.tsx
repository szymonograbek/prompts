import clsx from "clsx";
import { AgentStreamMessage } from "../constants";

interface AgentMessageProps {
  message: string;
}

export function AgentMessage({ message }: AgentMessageProps) {
  if (message.includes(AgentStreamMessage.Start)) {
    return (
      <Message className="border-indigo-100 bg-indigo-200">{message}</Message>
    );
  }

  if (message.includes(AgentStreamMessage.AgentAction)) {
    return (
      <Message className="border-amber-100 bg-amber-200">{message}</Message>
    );
  }

  if (message.includes(AgentStreamMessage.ToolEnd)) {
    return <Message className="border-sky-200 bg-sky-100">{message}</Message>;
  }

  return (
    <Message className="border-emerald-200 bg-emerald-100">{message}</Message>
  );
}

function Message({
  children,
  className,
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "border rounded mb-2 p-4 whitespace-pre-wrap leading-2",
        className
      )}
    >
      {children}
    </div>
  );
}

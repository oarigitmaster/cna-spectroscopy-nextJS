// src/components/ui/Container.tsx

import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({ className = "", children, ...props }: ContainerProps) {
  return (
    <div className={`container ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

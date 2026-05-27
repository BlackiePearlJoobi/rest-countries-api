"use client";

import { SelectHTMLAttributes, ReactNode } from "react";

interface AutoSubmitSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export default function AutoSubmitSelect({
  children,
  ...rest
}: AutoSubmitSelectProps) {
  return (
    <select {...rest} onChange={(e) => e.target.form?.submit()}>
      {children}
    </select>
  );
}

// React components receive one argument: props

/* props = {
  id: "region",
  name: "region",
  value: "Asia",
  className: "pr-4",
  children: <option> elements
}

children = props.children
rest = {
  id: "region",
  name: "region",
  value: "Asia",
  className: "pr-4"
}

*/

// You can access children in two ways:
// 1. Access via the props object: props.children
// 2. Destructure children out of props: const { children } = props
// 2 is cleaner, easier to read, and avoids repeating props

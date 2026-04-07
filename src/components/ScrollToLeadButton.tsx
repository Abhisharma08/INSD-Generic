"use client"

import { Button, type ButtonProps } from "@/components/ui/button"

type ScrollToLeadButtonProps = ButtonProps & {
  targetId?: string
}

export default function ScrollToLeadButton({
  targetId = "top-form",
  type = "button",
  onClick,
  children,
  ...props
}: ScrollToLeadButtonProps) {
  return (
    <Button
      type={type}
      onClick={(event) => {
        onClick?.(event)

        if (event.defaultPrevented) return

        const target = document.getElementById(targetId)
        if (!target) return

        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        })
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

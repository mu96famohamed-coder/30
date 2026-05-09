'use client'

// ─────────────────────────────────────────────────────────────────────────────
// ContentProtection — client-side anti-copy deterrents
//
// This is intentionally a thin layer of friction, not a security boundary.
// A determined user can still get the source via curl, view-source: prefix,
// or by disabling JavaScript. The real protection is the Edge middleware
// (rate limit + bot filter + honeypot). This component just stops the
// 95% of casual content harvesters who reach for the obvious tools.
//
// What it blocks:
//   • Right-click context menu
//   • Ctrl+U  (View Source)
//   • Ctrl+S  (Save Page)
//   • Ctrl+P  (Print)
//   • Ctrl+A  (Select All) — outside form fields
//   • F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C  (DevTools)
//   • Image drag (also covered in CSS for defense in depth)
//
// What it deliberately does NOT do:
//   • Detect DevTools and refuse to render (hostile, breaks accessibility)
//   • Disable text selection wholesale (already handled in CSS, with .selectable escape)
//   • Modify the page DOM in destructive ways
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from 'react'

export default function ContentProtection() {
  useEffect(() => {
    // Helper — is this event happening inside a form field?
    const isFormField = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) return false
      const tag = target.tagName
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        target.isContentEditable
      )
    }

    const onContextMenu = (e: MouseEvent) => {
      // Allow right-click on form fields so users can paste
      if (isFormField(e.target)) return
      e.preventDefault()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      // Always allow editing shortcuts in form fields
      if (isFormField(e.target)) return

      const key = e.key.toLowerCase()
      const ctrl = e.ctrlKey || e.metaKey // metaKey for macOS Cmd

      // F12 — DevTools
      if (e.key === 'F12') {
        e.preventDefault()
        return
      }

      // Ctrl/Cmd + U  → View Source
      // Ctrl/Cmd + S  → Save Page
      // Ctrl/Cmd + P  → Print
      // Ctrl/Cmd + A  → Select All (outside form fields)
      if (ctrl && (key === 'u' || key === 's' || key === 'p' || key === 'a')) {
        e.preventDefault()
        return
      }

      // Ctrl/Cmd + Shift + I/J/C  → DevTools / Console / Inspect
      if (
        ctrl &&
        e.shiftKey &&
        (key === 'i' || key === 'j' || key === 'c')
      ) {
        e.preventDefault()
        return
      }
    }

    const onDragStart = (e: DragEvent) => {
      // Block dragging images / SVG / videos out of the page
      const target = e.target
      if (
        target instanceof HTMLImageElement ||
        target instanceof SVGElement ||
        target instanceof HTMLVideoElement
      ) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', onContextMenu)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('dragstart', onDragStart)

    return () => {
      document.removeEventListener('contextmenu', onContextMenu)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('dragstart', onDragStart)
    }
  }, [])

  return null
}

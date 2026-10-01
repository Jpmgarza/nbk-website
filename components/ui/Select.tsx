"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type RefCallback } from "react";
import { cn } from "@/lib/cn";

type SelectProps = {
  id: string;
  /** Id of the visible label; names both the trigger and the list. */
  labelId: string;
  options: readonly string[];
  value: string | undefined;
  onChange: (value: string) => void;
  onBlur?: () => void;
  buttonRef?: RefCallback<HTMLButtonElement>;
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
  /** Classes for the trigger, so it matches the other form fields. */
  className?: string;
};

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/**
 * Select-only combobox (WAI-ARIA APG pattern) styled like the header's services menu.
 * Native option lists cannot take the brand colours in most browsers, hence the custom list.
 */
export function Select({
  id,
  labelId,
  options,
  value,
  onChange,
  onBlur,
  buttonRef,
  placeholder = "Choisir",
  invalid,
  describedBy,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", timer: 0 });

  const listId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;
  const selectedIndex = value === undefined ? -1 : options.indexOf(value);
  const last = options.length - 1;

  const openAt = (index: number) => {
    setActive(index);
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(options[index]);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open && active >= 0) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  useEffect(() => () => window.clearTimeout(typeahead.current.timer), []);

  /** Jumps to the next option starting with the letters typed within half a second. */
  const findByTyping = (key: string) => {
    const state = typeahead.current;
    window.clearTimeout(state.timer);
    state.text += normalize(key);
    state.timer = window.setTimeout(() => (state.text = ""), 500);
    const from = open ? active : selectedIndex;
    const start = state.text.length === 1 ? from + 1 : Math.max(from, 0);
    for (let step = 0; step < options.length; step++) {
      const index = (start + step) % options.length;
      if (normalize(options[index]).startsWith(state.text)) return index;
    }
    return -1;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const { key } = event;
    const typing = key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
    const extendsTyping = key === " " && typeahead.current.text !== "";

    if (typing && (key !== " " || extendsTyping)) {
      const index = findByTyping(key);
      if (index >= 0) openAt(index);
      event.preventDefault();
      return;
    }

    if (!open) {
      if (key === "ArrowDown" || key === "ArrowUp" || key === "Enter" || key === " ") {
        event.preventDefault();
        openAt(selectedIndex >= 0 ? selectedIndex : key === "ArrowUp" ? last : 0);
      } else if (key === "Home" || key === "End") {
        event.preventDefault();
        openAt(key === "Home" ? 0 : last);
      }
      return;
    }

    switch (key) {
      case "ArrowDown":
        setActive(Math.min(active + 1, last));
        break;
      case "ArrowUp":
        setActive(Math.max(active - 1, 0));
        break;
      case "Home":
        setActive(0);
        break;
      case "End":
        setActive(last);
        break;
      case "Enter":
      case " ":
        if (active >= 0) choose(active);
        else setOpen(false);
        break;
      case "Escape":
        setOpen(false);
        break;
      case "Tab":
        // APG: Tab keeps the highlighted option and lets focus move on.
        if (active >= 0) choose(active);
        else setOpen(false);
        return;
      default:
        return;
    }
    event.preventDefault();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        className={cn("flex items-center justify-between gap-3 text-left aria-expanded:border-accent", className)}
        onClick={() => (open ? setOpen(false) : openAt(selectedIndex >= 0 ? selectedIndex : 0))}
        onKeyDown={onKeyDown}
        onBlur={(event) => {
          if (rootRef.current?.contains(event.relatedTarget as Node)) return;
          setOpen(false);
          onBlur?.();
        }}
      >
        <span className="truncate">{value ?? placeholder}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className={cn("h-2 w-3 shrink-0 transition-transform duration-200", open ? "rotate-180 text-accent" : "text-ink")}
        >
          <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Mouse down on the list would blur the trigger; keeping focus there keeps the keyboard model intact. */}
      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        tabIndex={-1}
        hidden={!open}
        className="absolute inset-x-0 top-full z-20 mt-2 max-h-80 overflow-y-auto overscroll-contain rounded bg-bg p-2 shadow-menu ring-1 ring-ink/8"
        onMouseDown={(event) => event.preventDefault()}
      >
        {options.map((option, index) => {
          const selected = index === selectedIndex;
          return (
            <li
              key={option}
              id={optionId(index)}
              role="option"
              aria-selected={selected}
              className={cn(
                "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded px-3 py-2 transition-colors",
                index === active && "bg-accent/8 text-accent",
                selected && "font-semibold text-accent",
              )}
              onMouseMove={() => index !== active && setActive(index)}
              onClick={() => choose(index)}
            >
              {option}
              {selected && (
                <svg aria-hidden="true" viewBox="0 0 14 10" className="h-2.5 w-3.5 shrink-0">
                  <path d="M1 5.2 4.8 9 13 1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

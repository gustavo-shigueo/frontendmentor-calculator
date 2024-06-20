import { createEffect, createSignal, onMount } from "solid-js";

function matchMedia(value: string) {
  return window.matchMedia(value).matches;
}

function defaultTheme() {
  if (matchMedia("(prefers-color-scheme: dark)")) {
    return "1";
  }

  if (matchMedia("(prefers-color-scheme: light)")) {
    return "2";
  }

  if (matchMedia("(prefers-contrast: more)")) {
    return "3";
  }

  if (matchMedia("(prefers-color-scheme: no-preference)")) {
    return "2";
  }

  return "1";
}

export function ThemePicker() {
  const [theme, setTheme] = createSignal(
    localStorage.getItem("theme") ?? defaultTheme(),
  );

  createEffect(() => localStorage.setItem("theme", theme()));

  onMount(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setTheme(storedTheme);
      return;
    }
  });

  return (
    <form class="theme-picker">
      <h2>Theme</h2>

      <label for="theme-1">1</label>
      <label for="theme-2">2</label>
      <label for="theme-3">3</label>

      <div>
        <input
          checked={theme() === "1"}
          onChange={(e) => setTheme(e.target.value)}
          type="radio"
          value="1"
          id="theme-1"
          name="theme"
        />

        <input
          checked={theme() === "2"}
          onChange={(e) => setTheme(e.target.value)}
          type="radio"
          value="2"
          id="theme-2"
          name="theme"
        />

        <input
          checked={theme() === "3"}
          onChange={(e) => setTheme(e.target.value)}
          type="radio"
          value="3"
          id="theme-3"
          name="theme"
        />
      </div>
    </form>
  );
}

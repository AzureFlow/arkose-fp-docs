(function () {
  const STORAGE_KEY = "theme";
  /** Wrong key used by an older satellite script; read once and fix up. */
  const LEGACY_STORAGE_KEY = "theme";
  const HLJS_DARK =
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/stackoverflow-dark.min.css";
  const HLJS_LIGHT =
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/stackoverflow-light.min.css";

  function readStored() {
    try {
      let v = localStorage.getItem(STORAGE_KEY);
      if (v === "light" || v === "dark") {
        return v;
      }
      v = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (v === "light" || v === "dark") {
        localStorage.setItem(STORAGE_KEY, v);
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        return v;
      }
    } catch (e) {
      /* ignore */
    }
    return null;
  }

  function resolvedTheme() {
    const stored = readStored();
    if (stored) {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(next, persistStorage) {
    document.documentElement.setAttribute("data-theme", next);
    if (persistStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* ignore */
      }
    }

    const hljsLink = document.getElementById("hljs-theme");
    if (hljsLink) {
      hljsLink.href = next === "dark" ? HLJS_DARK : HLJS_LIGHT;
    }

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        next === "dark" ? "Switch to light mode" : "Switch to dark mode",
      );
    }

    document.dispatchEvent(
      new CustomEvent("arkose-docs-theme", { detail: { theme: next } }),
    );
  }

  const boot = resolvedTheme();
  document.documentElement.setAttribute("data-theme", boot);

  const injectHljs =
    document.currentScript &&
    document.currentScript.getAttribute("data-hljs") === "1";
  if (injectHljs) {
    const href = boot === "dark" ? HLJS_DARK : HLJS_LIGHT;
    document.write(
      '<link id="hljs-theme" rel="stylesheet" href="' +
        href +
        '" crossorigin="anonymous" referrerpolicy="no-referrer">',
    );
  }

  function onReady(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  onReady(function () {
    applyTheme(resolvedTheme(), false);
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        const cur = document.documentElement.getAttribute("data-theme");
        applyTheme(cur === "dark" ? "light" : "dark", true);
      });
    }
  });
})();

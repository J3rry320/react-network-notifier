import React, { useEffect, useState } from "react";
import {
  images as defaultImageList,
  messages as defaultMessageList,
  reconnectMessages as defaultReconnectList,
  SVGs,
} from "./config";
import "./styles.css";

type Variant = "toast" | "banner" | "fullscreen";

type Props = {
  /** Custom offline messages displayed at random. Defaults to the built-in witty message list. */
  messages?: string[];
  /** Custom reconnection messages shown when the connection is restored. */
  reconnectMessages?: string[];
  /** Custom ASCII art / image strings displayed at random while offline. */
  images?: string[];
  /** Inline styles applied to the notifier container element. */
  styles?: React.CSSProperties;
  /**
   * Display variant of the notifier.
   * - `"fullscreen"` — covers the entire viewport (default)
   * - `"banner"` — a slim strip at the top/bottom of the page
   * - `"toast"` — a small floating card in the corner
   */
  variant?: Variant;
  /**
   * Icon style used inside the notifier.
   * - `"ascii"` — fun ASCII art (default)
   * - `"svg"` — clean SVG Wi-Fi icons
   */
  iconType?: "ascii" | "svg";
  /**
   * Colour theme of the notifier.
   * - `"system"` — follows the OS preference (default)
   * - `"light"` / `"dark"` — forced light or dark mode
   */
  theme?: "light" | "dark" | "system";
  /** Whether the user can manually dismiss the notifier. Defaults to `true`. */
  closable?: boolean;
  /** Content rendered beneath the notifier (your normal app tree). */
  children?: React.ReactNode;
};

const checkInternet = () => {
  if (typeof window === "undefined") return true;
  return window.navigator.onLine;
};

const getRandomItem = (list: any[]) => {
  return list[Math.floor(Math.random() * list.length)];
};

/**
 * `NetworkNotifier` is a zero-dependency React component that detects online/offline
 * status and displays a customisable notification to the user.
 *
 * @example
 * ```tsx
 * import NetworkNotifier from 'react-network-notifier';
 *
 * export default function App() {
 *   return (
 *     <NetworkNotifier variant="toast" theme="dark">
 *       <YourApp />
 *     </NetworkNotifier>
 *   );
 * }
 * ```
 */
const NetworkNotifier = ({
  messages = defaultMessageList,
  reconnectMessages = defaultReconnectList,
  images = defaultImageList,
  styles,
  variant = "fullscreen",
  iconType = "ascii",
  theme = "system",
  closable = true,
  children,
}: Props): JSX.Element => {
  const [isOnline, setIsOnline] = useState(checkInternet());
  const [isVisible, setIsVisible] = useState(false);
  const [justReconnected, setJustReconnected] = useState(false);
  const [message, setMessage] = useState("");
  const [reconnectMessage, setReconnectMessage] = useState(getRandomItem(reconnectMessages));
  const [image, setImage] = useState("");

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      if (theme === "system") {
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      } else {
        setIsDark(theme === "dark");
      }
    };

    updateTheme();

    if (theme === "system" && typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme]);

  useEffect(() => {
    const initialOnline = checkInternet();
    setIsOnline(initialOnline);
    if (!initialOnline) {
      setMessage(getRandomItem(messages));
      setImage(getRandomItem(images));
      setIsVisible(true);
    }

    const handleOffline = () => {
      setIsOnline(false);
      setJustReconnected(false);
      setMessage(getRandomItem(messages));
      setImage(getRandomItem(images));
      setIsVisible(true);
    };

    const handleOnline = () => {
      setIsOnline(true);
      setReconnectMessage(getRandomItem(reconnectMessages));
      setJustReconnected(true);

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setJustReconnected(false), 500);
      }, 3000);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("offline", handleOffline);
      window.addEventListener("online", handleOnline);

      return () => {
        window.removeEventListener("offline", handleOffline);
        window.removeEventListener("online", handleOnline);
      };
    }
  }, []);

  const shouldRenderNotifier = !isOnline || justReconnected;

  return (
    <>
      {shouldRenderNotifier && (
        <div
          className={`rn-notifier-container rn-variant-${variant} ${isVisible ? "rn-visible" : ""}`}
          style={styles}
          data-theme={isDark ? "dark" : "light"}
          role="alert"
          aria-live="assertive"
        >
          <div className="rn-card">
            {/* ICON */}
            <div className={`rn-icon-container ${justReconnected ? "rn-icon-success" : "rn-icon-danger"}`}>
              {iconType === "svg" ? (
                <div dangerouslySetInnerHTML={{ __html: justReconnected ? SVGs.wifi : SVGs.wifiOff }} />
              ) : (
                <pre className="rn-icon-pre">
                  {justReconnected ? "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧" : image}
                </pre>
              )}
            </div>

            {/* TEXT */}
            <div className="rn-text-content">
              {justReconnected ? (
                <div className="rn-reconnected-text">
                  {reconnectMessage}
                </div>
              ) : (
                <>
                  {variant === "fullscreen" && (
                    <div className="rn-title">Connection Lost</div>
                  )}
                  <div className="rn-message-body">{message}</div>
                </>
              )}
            </div>

            {/* CLOSE BUTTON */}
            {!justReconnected && closable && (
              <button
                className="rn-close-button"
                onClick={() => setIsVisible(false)}
                aria-label="Dismiss offline notification"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default NetworkNotifier;

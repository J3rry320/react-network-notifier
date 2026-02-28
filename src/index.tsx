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
  messages?: string[];
  reconnectMessages?: string[];
  images?: string[];
  styles?: React.CSSProperties;
  variant?: Variant;
  iconType?: "ascii" | "svg";
  theme?: "light" | "dark" | "system";
  closable?: boolean;
  children?: React.ReactNode;
};

const checkInternet = () => {
  if (typeof window === "undefined") return true;
  return window.navigator.onLine;
};

const getRandomItem = (list: any[]) => {
  return list[Math.floor(Math.random() * list.length)];
};

const NetworkNotifier: React.FC<Props> = ({
  messages = defaultMessageList,
  reconnectMessages = defaultReconnectList,
  images = defaultImageList,
  styles,
  variant = "fullscreen",
  iconType = "ascii",
  theme = "system",
  closable = true,
  children,
}) => {
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

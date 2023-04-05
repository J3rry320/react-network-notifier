import React, { useState, useEffect } from "react";
import {
  messages as defaultMessageList,
  images as defaultImageList,
} from "./config";

type Props = {
  messages?: string[];
  images?: string[];
  styles?: React.CSSProperties;
  showImage?: boolean;
};

const checkInternet = () => {
  if (typeof window === "undefined") {
    return true;
  } else {
    return window.navigator.onLine;
  }
};

const getRandomItem = (list: any[]) => {
  return list[Math.floor(Math.random() * list.length)];
};

const NetworkNotifier: React.FC<Props> = ({
  messages = defaultMessageList,
  images = defaultImageList,
  styles,
  showImage = true,
}) => {
  const [isOnline, setIsOnline] = useState(checkInternet());
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const defaultStyles: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: 9999,
  };

  useEffect(() => {
    const handleOffline = () => {
      const isConnected = checkInternet();
      setIsOnline(isConnected);

      if (!isConnected) {
        setMessage(getRandomItem(messages));
        setImage(getRandomItem(images));
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  if (!isOnline) {
    return (
      <div style={{ ...defaultStyles, ...styles }}>
        {showImage && (
          <img
            src={image}
            alt="Funny Image"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        )}
        <p>{message}</p>
      </div>
    );
  }

  return null;
};

export default NetworkNotifier;

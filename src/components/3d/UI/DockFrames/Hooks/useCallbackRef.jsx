import { useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const useCallbackRef = (callback) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return useMemo(
    () =>
      (...args) =>
        callbackRef.current?.(...args),
    [],
  );
};

export { useCallbackRef };

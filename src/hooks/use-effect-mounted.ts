import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export const useEffectMounted = (effect: EffectCallback, deps?: DependencyList) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) return;

    return effect();
  }, deps);

  useEffect(() => {
    isMounted.current = true;
  }, []);
};
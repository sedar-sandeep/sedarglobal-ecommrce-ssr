import React, { useState, useEffect } from "react";

export const sizes = {
  tablet: 768,
  laptop: 992,
  desktop: 1170
};

const isMOBILE = "isMOBILE";
const isTABLET = "isTABLET";
const isLAPTOP = "isLAPTOP";
const isDESKTOP = "isDESKTOP";





export function useDevice(breakpoints = sizes) {
  const [device, setDevice] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < breakpoints.tablet
      ? isMOBILE
      : typeof window !== 'undefined' && window.innerWidth < breakpoints.laptop
        ? isTABLET
        : typeof window !== 'undefined' && window.innerWidth < breakpoints.desktop
          ? isLAPTOP
          : isDESKTOP
  );

  const onResizeDevice = () => {
    return window.innerWidth < breakpoints.tablet
      ? setDevice(isMOBILE)
      : window.innerWidth < breakpoints.laptop
        ? setDevice(isTABLET)
        : window.innerWidth < breakpoints.desktop
          ? setDevice(isLAPTOP)
          : setDevice(isDESKTOP);
  };

  React.useEffect(() => {
    typeof window !== 'undefined' && window.addEventListener("resize", onResizeDevice);
    return () => {
      typeof window !== 'undefined' && window.removeEventListener("resize", onResizeDevice);
    };
  }, []);

  if (typeof window === "undefined") {
    return {};
  }

  return {
    isMOBILE: device === isMOBILE,
    isTABLET: device === isTABLET,
    isLAPTOP: device === isLAPTOP,
    isDESKTOP: device === isDESKTOP
  };
}
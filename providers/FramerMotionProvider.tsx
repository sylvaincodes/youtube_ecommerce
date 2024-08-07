import React from "react";
import {
  MotionConfig as MotionProvider,
  domAnimation,
  LazyMotion,
} from "framer-motion";

export default function FramerMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider reducedMotion="user">
      <LazyMotion strict features={domAnimation}>
        {children}
      </LazyMotion>
    </MotionProvider>
  );
}

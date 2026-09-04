"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfileImage() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div
      className="profile-image-tooltip"
      tabIndex={0}
      aria-label="Don't touch me bro"
      onFocus={() => setIsTooltipVisible(true)}
      onBlur={() => setIsTooltipVisible(false)}
    >
      <Image
        className="profile-image"
        src="/profile.jpg"
        alt="Payas Vaishnav"
        width={1500}
        height={450}
      />
      <div
        className="profile-image-hit-area"
        aria-hidden="true"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onMouseMove={(event) => {
          const tooltipContainer = event.currentTarget.parentElement;

          if (!tooltipContainer) {
            return;
          }

          const bounds = tooltipContainer.getBoundingClientRect();
          tooltipContainer.style.setProperty("--tooltip-x", `${event.clientX - bounds.left}px`);
          tooltipContainer.style.setProperty("--tooltip-y", `${event.clientY - bounds.top}px`);
        }}
      />
      <span className="profile-image-message" data-visible={isTooltipVisible} aria-hidden="true">
        Don&apos;t touch me bro
      </span>
    </div>
  );
}

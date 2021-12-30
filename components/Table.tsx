import React, { useState, useEffect, useRef } from "react";

function Scrollable({ children }) {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderElement = useRef<HTMLDivElement | null>(null);
  const childrenScroll = useRef<HTMLDivElement | null>(null);
  let touchscreen = false;
  const shouldBeActive =
    // do not enable on touchscreen
    !touchscreen &&
    childrenScroll.current &&
    // only enable it if scroll is nessasary
    childrenScroll.current?.scrollWidth - childrenScroll.current?.clientWidth >
      0;

  useEffect(() => {
    touchscreen = "ontouchstart" in window;
  }, []);

  return (
    <div
      className={"scrollable"}
      onMouseDown={(e) => {
        setIsDown(true);
        if (sliderElement.current) {
          setStartX(e.pageX - sliderElement.current.offsetLeft);
          setScrollLeft(sliderElement.current.scrollLeft);
        }
      }}
      onMouseLeave={() => {
        setIsDown(false);
      }}
      onMouseUp={() => {
        setIsDown(false);
      }}
      onMouseMove={(e) => {
        if (!shouldBeActive) return;
        if (!isDown) return;
        e.preventDefault();
        if (sliderElement.current) {
          const x = e.pageX - sliderElement.current.offsetLeft;
          const move = x - startX;
          sliderElement.current.scrollLeft = scrollLeft - move;
        }
      }}
      ref={sliderElement}
    >
      <style>
        {`
        .scrollable {
          overflow: auto;
        }
        `}
      </style>
      <div ref={childrenScroll}>{children}</div>
    </div>
  );
}

export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <Scrollable>
      <style>
        {`
        .table {
          width: 100%;
          max-width: 100%;
        }
        .table td,
        .table th {
          padding: 0.75rem;
          vertical-align: top;
          border-top: 1px solid #dee2e6;
        }
        .table thead th, .table tfoot th  {
          text-align: left;
          vertical-align: bottom;
          border-bottom: 2px solid #dee2e6;
        }
        .table tbody + tbody {
          border-top: 2px solid #dee2e6;
        }
        .table tbody tr:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `}
      </style>
      <table className="table">{children}</table>
    </Scrollable>
  );
};

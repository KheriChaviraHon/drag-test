import { useRef, useState, useEffect } from "react";

function TestComponent() {
  const targetRefs = useRef([]);
  const [activeTargetIndex, setActiveTargetIndex] = useState(null);

  
const handleTouchMove = (e) => {
  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  const index = targetRefs.current.findIndex((ref) => {
    if (!ref) return false;
    const rect = ref.getBoundingClientRect();
    return (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    );
  });

  setActiveTargetIndex(index !== -1 ? index : null);
};


  // Create 3 target refs
  const targets = [0, 1, 2];

  return (
    <div
      onTouchMove={handleTouchMove}
      style={{ height: "100vh", background: "#f0f0f0", position: "relative" }}
    >
      {targets.map((_, index) => (
        <div
          key={index}
          ref={(el) => (targetRefs.current[index] = el)}
          style={{
            position: "absolute",
            top: 100 + index * 160,
            left: 100,
            width: 150,
            height: 150,
            background: activeTargetIndex === index ? "green" : "red",
            transition: "background 0.2s",
          }}
        >
          Target {index + 1}
        </div>
      ))}
    </div>
  );
}

export default TestComponent;
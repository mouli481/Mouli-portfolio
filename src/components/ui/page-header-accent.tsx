const NODES = [
  { x: 60, y: 30 },
  { x: 140, y: 15 },
  { x: 110, y: 70 },
  { x: 190, y: 55 },
  { x: 165, y: 105 },
  { x: 230, y: 90 },
  { x: 40, y: 90 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [2, 6],
];

export function PageHeaderAccent() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 130"
      className="pointer-events-none absolute -top-4 right-0 hidden h-auto w-64 opacity-40 sm:block lg:w-80"
    >
      {EDGES.map(([fromIndex, toIndex], index) => {
        const from = NODES[fromIndex];
        const to = NODES[toIndex];
        if (!from || !to) {
          return null;
        }
        return (
          <line
            key={index}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--border)"
            strokeWidth={1}
          />
        );
      })}
      {NODES.map((node, index) => (
        <circle
          key={index}
          cx={node.x}
          cy={node.y}
          r={index % 3 === 0 ? 3 : 2}
          fill={index % 3 === 0 ? "var(--accent)" : "var(--primary)"}
          className="animate-pulse"
          style={{ animationDuration: `${3 + (index % 3)}s`, animationDelay: `${index * 0.3}s` }}
        />
      ))}
    </svg>
  );
}

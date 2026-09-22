export interface NetworkGeometry {
  positions: Float32Array;
  colors: Float32Array;
  linePositions: Float32Array;
  nodeCount: number;
  linkCount: number;
}

interface NetworkOptions {
  nodeCount: number;
  radius: number;
  linkDistance: number;
  maxLinksPerNode: number;
  seed: number;
}

const DEFAULT_OPTIONS: NetworkOptions = {
  nodeCount: 150,
  radius: 3.4,
  linkDistance: 1.25,
  maxLinksPerNode: 3,
  seed: 7,
};

const PRIMARY_RGB: [number, number, number] = [0.231, 0.51, 0.965];
const ACCENT_RGB: [number, number, number] = [0.961, 0.62, 0.043];

function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function buildNetworkGeometry(overrides: Partial<NetworkOptions> = {}): NetworkGeometry {
  const options = { ...DEFAULT_OPTIONS, ...overrides };
  const random = createRandom(options.seed);
  const positions = new Float32Array(options.nodeCount * 3);
  const colors = new Float32Array(options.nodeCount * 3);

  for (let index = 0; index < options.nodeCount; index += 1) {
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    const distance = options.radius * Math.cbrt(random());
    positions[index * 3] = distance * Math.sin(phi) * Math.cos(theta) * 1.6;
    positions[index * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
    positions[index * 3 + 2] = distance * Math.cos(phi);
    const color = random() < 0.2 ? ACCENT_RGB : PRIMARY_RGB;
    colors.set(color, index * 3);
  }

  const lines: number[] = [];
  const linkCounts = new Array<number>(options.nodeCount).fill(0);
  for (let first = 0; first < options.nodeCount; first += 1) {
    for (let second = first + 1; second < options.nodeCount; second += 1) {
      if ((linkCounts[first] ?? 0) >= options.maxLinksPerNode) {
        break;
      }
      if ((linkCounts[second] ?? 0) >= options.maxLinksPerNode) {
        continue;
      }
      const dx = (positions[first * 3] ?? 0) - (positions[second * 3] ?? 0);
      const dy = (positions[first * 3 + 1] ?? 0) - (positions[second * 3 + 1] ?? 0);
      const dz = (positions[first * 3 + 2] ?? 0) - (positions[second * 3 + 2] ?? 0);
      if (Math.hypot(dx, dy, dz) < options.linkDistance) {
        lines.push(
          ...positions.subarray(first * 3, first * 3 + 3),
          ...positions.subarray(second * 3, second * 3 + 3)
        );
        linkCounts[first] = (linkCounts[first] ?? 0) + 1;
        linkCounts[second] = (linkCounts[second] ?? 0) + 1;
      }
    }
  }

  return {
    positions,
    colors,
    linePositions: new Float32Array(lines),
    nodeCount: options.nodeCount,
    linkCount: lines.length / 6,
  };
}

import type { ArchitectureEdge, ArchitectureNode } from "@/types/api";

export const NODE_WIDTH = 164;
export const NODE_HEIGHT = 52;

const HORIZONTAL_SPREAD = 1.4;
const PADDING = 36;

export interface PlacedNode extends ArchitectureNode {
  cx: number;
  cy: number;
}

export interface EdgeGeometry {
  id: string;
  path: string;
  labelX: number;
  labelY: number;
  label: string | null;
}

export interface DiagramGeometry {
  nodes: PlacedNode[];
  edges: EdgeGeometry[];
  viewBox: string;
}

export function buildDiagramGeometry(
  nodes: ArchitectureNode[],
  edges: ArchitectureEdge[]
): DiagramGeometry {
  const placed = nodes.map((node) => ({ ...node, cx: node.x * HORIZONTAL_SPREAD, cy: node.y }));
  const byId = new Map(placed.map((node) => [node.id, node]));
  const halfWidth = NODE_WIDTH / 2;
  const halfHeight = NODE_HEIGHT / 2;

  const edgeGeometry = edges.flatMap((edge, index) => {
    const source = byId.get(edge.source);
    const target = byId.get(edge.target);
    if (!source || !target) {
      return [];
    }
    const direction = target.cx >= source.cx ? 1 : -1;
    const startX = source.cx + halfWidth * direction;
    const endX = target.cx - halfWidth * direction;
    const midX = (startX + endX) / 2;
    return [
      {
        id: `edge-${index}-${edge.source}-${edge.target}`,
        path: `M ${startX} ${source.cy} C ${midX} ${source.cy}, ${midX} ${target.cy}, ${endX} ${target.cy}`,
        labelX: midX,
        labelY: (source.cy + target.cy) / 2 - 8,
        label: edge.label ?? null,
      },
    ];
  });

  const minX = Math.min(...placed.map((node) => node.cx - halfWidth)) - PADDING;
  const maxX = Math.max(...placed.map((node) => node.cx + halfWidth)) + PADDING;
  const minY = Math.min(...placed.map((node) => node.cy - halfHeight)) - PADDING;
  const maxY = Math.max(...placed.map((node) => node.cy + halfHeight)) + PADDING;

  return {
    nodes: placed,
    edges: edgeGeometry,
    viewBox: placed.length ? `${minX} ${minY} ${maxX - minX} ${maxY - minY}` : "0 0 800 400",
  };
}

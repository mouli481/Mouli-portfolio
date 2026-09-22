import { describe, expect, it } from "vitest";
import { buildNetworkGeometry } from "./network-geometry";

describe("buildNetworkGeometry", () => {
  it("creates three coordinates and three colour channels per node", () => {
    const geometry = buildNetworkGeometry({ nodeCount: 40 });

    expect(geometry.positions).toHaveLength(120);
    expect(geometry.colors).toHaveLength(120);
  });

  it("is deterministic for the same seed", () => {
    const first = buildNetworkGeometry({ seed: 3 });
    const second = buildNetworkGeometry({ seed: 3 });

    expect(Array.from(first.positions)).toEqual(Array.from(second.positions));
    expect(first.linkCount).toBe(second.linkCount);
  });

  it("respects the per-node link limit", () => {
    const geometry = buildNetworkGeometry({ nodeCount: 60, maxLinksPerNode: 2, linkDistance: 10 });

    expect(geometry.linkCount).toBeLessThanOrEqual(60);
    expect(geometry.linePositions).toHaveLength(geometry.linkCount * 6);
  });
});

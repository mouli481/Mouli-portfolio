interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

const MIN_CPU_CORES = 4;
const MIN_DEVICE_MEMORY_GB = 4;
const MIN_VIEWPORT_WIDTH = 768;

export function supportsWebGl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function isLowPowerDevice(): boolean {
  const extendedNavigator: ExtendedNavigator = navigator;
  const cores = extendedNavigator.hardwareConcurrency;
  const memory = extendedNavigator.deviceMemory;
  return (
    (typeof cores === "number" && cores < MIN_CPU_CORES) ||
    (typeof memory === "number" && memory < MIN_DEVICE_MEMORY_GB) ||
    extendedNavigator.connection?.saveData === true ||
    window.innerWidth < MIN_VIEWPORT_WIDTH
  );
}

export function canRenderHeroScene(): boolean {
  return supportsWebGl() && !isLowPowerDevice();
}

export const SECS: [string, string][] = [
  ["0.2", "Introduction to differential equations"],
  ["0.3", "Classification of differential equations"],
  ["1.1", "Integrals as solutions"],
  ["1.2", "Slope fields"],
  ["1.3", "Separable equations"],
  ["1.4", "Linear equations and the integrating factor"],
  ["1.5", "Substitution"],
  ["1.6", "Autonomous equations"],
  ["1.7", "Numerical methods: Euler's method"],
  ["1.8", "Exact equations"],
  ["1.9", "First-order linear PDEs"],
];

export const secOf = (id: string) => id.split(".").slice(0, 2).join(".");

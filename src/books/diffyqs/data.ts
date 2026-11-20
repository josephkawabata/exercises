import type { Card, Field, Rng, SF } from "../../engine";

// DATA-START
const r = String.raw;
const CARDS: Card[] = [];
type CardOpts = { sol?: string[]; h?: string; src?: string; p?: string; ctx?: string; bk?: string; sf?: SF[]; ssf?: SF; distinct?: number[] };
function card(id: string, q: string, f: Field[], o: CardOpts = {}): void {
  const c: Card = { id, q, f, h: o.h ?? "", src: o.src ?? "g" };
  if (o.sol) c.sol = o.sol;
  if (o.p) c.p = o.p;
  if (o.ctx) c.ctx = o.ctx;
  if (o.bk) c.bk = o.bk;
  if (o.sf) c.sf = o.sf;
  if (o.ssf) c.ssf = o.ssf;
  if (o.distinct) c.distinct = o.distinct;
  CARDS.push(c);
}
function E(a: string, v: Record<string, Rng>, l = "", c = 0): Field { return c ? { t: "expr", a, v, l, c: 1 } : { t: "expr", a, v, l }; }
function N(a: string | number, l = ""): Field { return { t: "num", a: String(a), l }; }
function NT(a: string | number, l: string, tol: number): Field { return { t: "num", a: String(a), l, tol }; }
function NB(a: string | number, l: string, abs: number): Field { return { t: "num", a: String(a), l, abs }; }
function S(a: (string | number)[], l = ""): Field { return { t: "set", a: a.map((x) => String(x)), l }; }
function MC(o: string[], a: number, l = ""): Field { return { t: "mc", o, a, l }; }
function G(f: string, d: Rng[], a: string, l = "", o: { x?: string; y?: string; pot?: number; p?: Record<string, Rng> } = {}): Field {
  const g: { t: "gen"; f: string; x: string; y: string; d: Rng[]; a: string; l: string; pot?: number; p?: Record<string, Rng> } = { t: "gen", f, x: o.x ?? "x", y: o.y ?? "y", d, a, l };
  if (o.pot) g.pot = 1;
  if (o.p) g.p = o.p;
  return g;
}
function I(a: string, x: string, y: string, pts: number[][], off: number[][], l = ""): Field { return { t: "imp", a, x, y, pts, off, l }; }
function R(rr: string, a: string, x: string, y: string, d: Rng, l = "", ic?: number[][]): Field { return ic ? { t: "res", r: rr, a, x, y, d, l, ic } : { t: "res", r: rr, a, x, y, d, l }; }
function IF(M: string, Nn: string, d: Rng[], a: string, l = "Integrating factor"): Field { return { t: "if", M, N: Nn, d, a, l }; }
const YN = ["Yes", "No"];
function classify(ode: boolean, sys: boolean, order: number, lin: boolean, hom: boolean | null, cc: boolean | null, aut: boolean | null): Field[] {
  const nal = "Doesn't apply (nonlinear)", nap = "Doesn't apply (PDE)";
  const idx = (v: boolean | null) => (v === true ? 0 : v === false ? 1 : 2);
  return [
    MC(["ODE", "PDE"], ode ? 0 : 1, "ODE or PDE?"),
    MC(["Equation", "System"], sys ? 1 : 0, "Equation or system?"),
    N(order, "Order"),
    MC(["Linear", "Nonlinear"], lin ? 0 : 1, "Linear or nonlinear?"),
    MC(["Yes", "No", nal], idx(hom), "Homogeneous?"),
    MC(["Yes", "No", nal], idx(cc), "Constant-coefficient?"),
    MC(["Yes", "No", nap], idx(aut), "Autonomous?"),
  ];
}
const NA = null;

// ---- 0.2 ----
card("0.2.1", r`Check that the $y$ given is really a solution to the equation above.`, [], {
  ctx: r`The equation above is $\frac{dy}{dx} = -ky$ (constant $k>0$), with general solution $y(x) = Ce^{-kx}$.`,
  sol: [r`Differentiate: $y' = -kCe^{-kx}$.`, r`And $-ky = -kCe^{-kx}$. Both sides match, so $y = Ce^{-kx}$ is a solution.`],
  h: r`Differentiate $Ce^{-kx}$ with the chain rule.` });
card("0.2.2", r`Check that the $y$ given is really a solution to the equation above.`, [], {
  ctx: r`The equation above is $\frac{d^2y}{dx^2} = -k^2 y$ (constant $k>0$), with general solution $y(x) = C_1\cos(kx) + C_2\sin(kx)$.`,
  sol: [r`$y' = -kC_1\sin(kx) + kC_2\cos(kx)$.`, r`$y'' = -k^2C_1\cos(kx) - k^2C_2\sin(kx) = -k^2\bigl(C_1\cos(kx)+C_2\sin(kx)\bigr) = -k^2 y$.`],
  h: r`Differentiate twice and factor out $-k^2$.` });
card("0.2.3", r`Check that both forms of the $y$ given are really solutions to the equation above.`, [], {
  ctx: r`The equation above is $\frac{d^2y}{dx^2} = k^2 y$ (constant $k>0$), with $y = C_1e^{kx} + C_2e^{-kx}$ or $y = D_1\cosh(kx) + D_2\sinh(kx)$.`,
  sol: [r`First form: $y'' = k^2C_1e^{kx} + k^2C_2e^{-kx} = k^2 y$.`, r`Second form: $(\cosh kx)' = k\sinh kx$ and $(\sinh kx)' = k\cosh kx$, so $y'' = k^2D_1\cosh(kx) + k^2D_2\sinh(kx) = k^2y$.`],
  h: r`Use $\frac{d}{dx}\cosh x = \sinh x$ and $\frac{d}{dx}\sinh x = \cosh x$.` });
card("0.2.4", r`Show that $x = e^{4t}$ is a solution to $x'''-12 x'' + 48 x' - 64 x = 0$.`, [], {
  sol: [r`$x' = 4e^{4t}$, $x'' = 16e^{4t}$, $x''' = 64e^{4t}$.`, r`$64e^{4t} - 12(16e^{4t}) + 48(4e^{4t}) - 64e^{4t} = (64-192+192-64)e^{4t} = 0$.`],
  h: r`Compute three derivatives and plug in.` });
card("0.2.5", r`Show that $x = e^{t}$ is not a solution to $x'''-12 x'' + 48 x' - 64 x = 0$.`, [], {
  sol: [r`All derivatives of $e^t$ are $e^t$, so the left side is $(1-12+48-64)e^t = -27e^t$.`, r`Since $-27e^t \neq 0$, it is not a solution.`],
  h: r`Every derivative of $e^t$ is $e^t$.` });
card("0.2.6", r`Is $y = \sin t$ a solution to $\left( \frac{dy}{dt} \right)^2 = 1 - y^2$? Justify.`, [MC(YN, 0, "Is it a solution?")], {
  sol: [r`$\frac{dy}{dt} = \cos t$, so the left side is $\cos^2 t$.`, r`The right side is $1-\sin^2 t = \cos^2 t$. They match, so yes.`],
  h: r`Use $\sin^2 t + \cos^2 t = 1$.` });
card("0.2.7", r`Let $y'' + 2y' - 8y = 0$. Now try a solution of the form $y = e^{rx}$ for some (unknown) constant $r$. Is this a solution for some $r$? If so, find all such $r$.`,
  [S([2, -4], r`All values of $r$ (separate with commas)`)], {
  sol: [r`Plug in: $r^2e^{rx} + 2re^{rx} - 8e^{rx} = (r^2+2r-8)e^{rx} = 0$.`, r`So $r^2+2r-8 = (r+4)(r-2) = 0$, giving $r = 2$ or $r = -4$.`],
  h: r`Factor out $e^{rx}$, which is never zero.` });
card("0.2.8", r`Verify that $x = C e^{-2t}$ is a solution to $x' = -2x$. Find $C$ to solve for the initial condition $x(0) = 100$.`,
  [N(100, r`$C =$`)], { sol: [r`$x' = -2Ce^{-2t} = -2x$, so it is a solution.`, r`$x(0) = C = 100$.`], h: r`Plug in $t = 0$.` });
card("0.2.9", r`Verify that $x = C_1 e^{-t} + C_2 e^{2t}$ is a solution to $x'' - x' -2 x = 0$. Find $C_1$ and $C_2$ to solve for the initial conditions $x(0) = 10$ and $x'(0) = 0$.`,
  [N("20/3", r`$C_1 =$`), N("10/3", r`$C_2 =$`)], {
  sol: [r`$x' = -C_1e^{-t} + 2C_2e^{2t}$, $x'' = C_1e^{-t} + 4C_2e^{2t}$, and $x''-x'-2x = (1+1-2)C_1e^{-t} + (4-2-2)C_2e^{2t} = 0$.`, r`$x(0) = C_1 + C_2 = 10$ and $x'(0) = -C_1 + 2C_2 = 0$.`, r`So $C_1 = 2C_2$, $3C_2 = 10$: $C_2 = \frac{10}{3}$, $C_1 = \frac{20}{3}$.`],
  h: r`Write $x(0)$ and $x'(0)$ in terms of $C_1, C_2$ and solve the 2×2 system.` });
card("0.2.10", r`Find a solution to $(x')^2 + x^2 = 4$ using your knowledge of derivatives of functions that you know from basic calculus.`,
  [R("Yp^2+Y^2-4", "2sin(t)", "t", "x", [-3, 3], r`$x(t) =$`)], {
  sol: [r`Try $x = 2\sin t$: $x' = 2\cos t$, so $(x')^2 + x^2 = 4\cos^2t + 4\sin^2t = 4$.`, r`Other answers work too, such as $x = 2\cos t$, $x = 2\sin(t+5)$, or the constant $x = 2$. Any correct one is accepted.`],
  h: r`Think of $\sin^2 + \cos^2 = 1$, scaled by 4.` });
for (const [p, eq, a, v, lab, sol] of [
  ["a", r`$\frac{dA}{dt} = -10 A, \quad A(0)=5$`, "5e^(-10t)", "t", r`$A(t) =$`, [r`$A = Ce^{-10t}$ and $A(0) = C = 5$, so $A = 5e^{-10t}$.`]],
  ["b", r`$\frac{dH}{dx} = 3 H, \quad H(0)=1$`, "e^(3x)", "x", r`$H(x) =$`, [r`$H = Ce^{3x}$ and $H(0) = C = 1$, so $H = e^{3x}$.`]],
  ["c", r`$\frac{d^2y}{dx^2} = 4 y, \quad y(0)=0, \quad y'(0)=1$`, "sinh(2x)/2", "x", r`$y(x) =$`, [r`General solution $y = D_1\cosh(2x) + D_2\sinh(2x)$.`, r`$y(0) = D_1 = 0$ and $y'(0) = 2D_2 = 1$, so $y = \frac{1}{2}\sinh(2x)$ (same as $\frac{1}{4}(e^{2x}-e^{-2x})$).`]],
  ["d", r`$\frac{d^2x}{dy^2} = -9 x, \quad x(0)=1, \quad x'(0)=0$`, "cos(3y)", "y", r`$x(y) =$`, [r`General solution $x = C_1\cos(3y) + C_2\sin(3y)$.`, r`$x(0) = C_1 = 1$ and $x'(0) = 3C_2 = 0$, so $x = \cos(3y)$.`]],
] as [string, string, string, string, string, string[]][]) {
  card("0.2.11", "Solve: " + eq, [E(a, { [v]: [-1.5, 1.5] }, lab)], { sol, p, h: "Use one of the four fundamental equations, then fit the initial conditions." });
}
card("0.2.12", r`Is there a solution to $y' = y$, such that $y(0) = y(1)$?`,
  [MC(["No", r`Yes, but only $y = 0$`, r`Yes, every $y = Ce^x$ works`], 1, "Answer")], {
  sol: [r`Every solution is $y = Ce^x$. Then $y(0) = C$ and $y(1) = Ce$.`, r`$C = Ce$ forces $C = 0$. So yes: the zero solution $y = 0$, and only that one.`],
  h: r`Write $y(0)$ and $y(1)$ for $y = Ce^x$.` });
card("0.2.13", r`The population of city X was 100 thousand 20 years ago, and it was 120 thousand 10 years ago. Assuming a constant growth rate, you can use the exponential population model (like for the bacteria). What do you estimate the population is now?`,
  [N(144, "Population now (in thousands)")], {
  sol: [r`Let $t$ be years since 20 years ago: $P = 100e^{kt}$ (thousands).`, r`$P(10) = 120$ gives $e^{10k} = 1.2$.`, r`Now is $t = 20$: $P(20) = 100(e^{10k})^2 = 100(1.44) = 144$ thousand.`],
  h: r`You don't need $k$ itself: find $e^{10k}$ and square it.` });
card("0.2.14", r`Suppose that a football coach gets a salary of one million dollars now, and a raise of $10\%$ every year (so exponential model, like population of bacteria). Let $s$ be the salary in millions of dollars, and $t$ the time in years. What are $s(0)$ and $s(1)$?`,
  [N(1, r`$s(0) =$`), N(1.1, r`$s(1) =$`)], {
  p: "a", sol: [r`$s(0) = 1$ (million). After one 10% raise, $s(1) = 1.1$.`, r`The model is $s = e^{kt}$ with $e^k = 1.1$, so $s = 1.1^t = e^{t\ln 1.1}$.`], h: "A 10% raise multiplies by 1.1." });
for (const [p, m] of [["b", 10], ["c", 20], ["d", 30]] as [string, number][]) {
  card("0.2.14", r`(Football coach salary, $s = 1.1^t$ million.) Approximately how many years will it take for the salary to be ` + m + " million?",
    [NB("ln(" + m + ")/ln(1.1)", "Years", 0.6)], {
    p, sol: [r`Solve $1.1^t = ` + m + r`$: $t = \frac{\ln ` + m + r`}{\ln 1.1}$.`, r`$t \approx ` + (Math.log(m) / Math.log(1.1)).toFixed(2) + "$ years."],
    h: r`Take $\ln$ of both sides of $1.1^t = $ target.` });
}
card("0.2.101", r`Show that $x = e^{-2t}$ is a solution to $x'' + 4x' + 4x = 0$.`, [], { src: "b",
  bk: r`Compute $x' = -2e^{-2t}$ and $x'' = 4e^{-2t}$. Then $(4e^{-2t}) + 4 (-2e^{-2t}) + 4 (e^{-2t}) = 0$.`, h: "Compute two derivatives and plug in." });
card("0.2.102", r`Is $y = x^2$ a solution to $x^2y'' - 2y = 0$? Justify.`, [MC(YN, 0, "Is it a solution?")], { src: "b",
  bk: r`Yes, since $y''= 2$, we have $x^2y''-2y=x^2(2)-2(x^2)=0$.`, h: r`Compute $y''$.` });
card("0.2.103", r`Let $xy'' - y' = 0$. Try a solution of the form $y = x^r$. Is this a solution for some $r$? If so, find all such $r$.`,
  [S([0, 2], r`All values of $r$ (separate with commas)`)], { src: "b", bk: r`$y=x^r$ is a solution for $r=0$ and $r=2$.`,
  sol: [r`$y' = rx^{r-1}$, $y'' = r(r-1)x^{r-2}$, so $xy''-y' = (r(r-1) - r)x^{r-1} = r(r-2)x^{r-1}$.`], h: r`Factor out $x^{r-1}$.` });
card("0.2.104", r`Verify that $x=C_1e^t+C_2$ is a solution to $x''-x' = 0$. Find $C_1$ and $C_2$ so that $x$ satisfies $x(0) = 10$ and $x'(0) = 100$.`,
  [N(100, r`$C_1 =$`), N(-90, r`$C_2 =$`)], { src: "b", bk: r`$C_1 = 100$, $C_2 = -90$`,
  sol: [r`$x' = x'' = C_1e^t$, so $x''-x'=0$. Then $x'(0) = C_1 = 100$ and $x(0) = C_1 + C_2 = 10$.`], h: r`Use $x'(0)$ first.` });
card("0.2.105", r`Solve $\frac{d\varphi}{ds} = 8 \varphi$ and $\varphi(0) = -9$.`, [E("-9e^(8s)", { s: [-1, 1] }, r`$\varphi(s) =$`)], { src: "b", bk: r`$\varphi = -9 e^{8s}$`, h: r`This is $y' = ky$ with $k = 8$.` });
for (const [p, eq, a, v, lab, b] of [
  ["a", r`$\frac{dx}{dt} = -4x, \quad x(0)=9$`, "9e^(-4t)", "t", r`$x(t) =$`, r`$x=9e^{-4t}$`],
  ["b", r`$\frac{d^2x}{dt^2} = -4x, \quad x(0)=1, \quad x'(0)=2$`, "cos(2t)+sin(2t)", "t", r`$x(t) =$`, r`$x=\cos(2t)+\sin(2t)$`],
  ["c", r`$\frac{dp}{dq} = 3 p, \quad p(0)=4$`, "4e^(3q)", "q", r`$p(q) =$`, r`$p=4e^{3q}$`],
  ["d", r`$\frac{d^2T}{dx^2} = 4 T, \quad T(0)=0, \quad T'(0)=6$`, "3sinh(2x)", "x", r`$T(x) =$`, r`$T=3\sinh(2x)$`],
] as [string, string, string, string, string, string][]) {
  card("0.2.106", "Solve: " + eq, [E(a, { [v]: [-1.5, 1.5] }, lab)], { p, src: "b", bk: b, h: "Use one of the four fundamental equations, then fit the initial conditions." });
}

// ---- 0.3 ----
const Q031 = "Classify the following equation. Is it an ODE or PDE? Is it an equation or a system? What is the order? Is it linear or nonlinear, and if it is linear, is it homogeneous, constant-coefficient? If it is an ODE, is it autonomous?";
type Cl = [boolean, boolean, number, boolean, boolean | null, boolean | null, boolean | null];
const CLH = "Order = highest derivative. Linear = the unknown and its derivatives appear only to the first power, not multiplied together.";
for (const [p, eq, cl, why] of [
  ["a", r`$\sin(t) \frac{d^2 x}{dt^2} + \cos(t) x = t^2$`, [true, false, 2, true, false, false, false], r`ODE, equation, 2nd order, linear, nonhomogeneous ($t^2$ has no $x$), not constant-coefficient ($\sin t$, $\cos t$), not autonomous ($t$ appears).`],
  ["b", r`$\frac{\partial u}{\partial x} + 3 \frac{\partial u}{\partial y} = xy$`, [false, false, 1, true, false, true, NA], r`PDE, equation, 1st order, linear, nonhomogeneous ($xy$ has no $u$), constant-coefficient (the coefficients of $u_x$, $u_y$ are 1 and 3).`],
  ["c", r`$y''+3y+5x=0, \quad x''+x-y=0$`, [true, true, 2, true, true, true, true], r`ODE, system ($x$ and $y$ are both unknowns), 2nd order, linear, homogeneous (every term has $x$ or $y$), constant-coefficient, autonomous.`],
  ["d", r`$\frac{\partial^2 u}{\partial t^2} + u\frac{\partial^2 u}{\partial s^2} = 0$`, [false, false, 2, false, NA, NA, NA], r`PDE, equation, 2nd order, nonlinear ($u$ multiplies $u_{ss}$).`],
  ["e", r`$x''+tx^2=t$`, [true, false, 2, false, NA, NA, false], r`ODE, equation, 2nd order, nonlinear ($x^2$), not autonomous ($t$ appears).`],
  ["f", r`$\frac{d^4 x}{dt^4} = 0$`, [true, false, 4, true, true, true, true], r`ODE, equation, 4th order, linear, homogeneous, constant-coefficient, autonomous.`],
] as [string, string, Cl, string][]) {
  card("0.3.1", Q031 + " " + eq, classify(...cl), { p, sol: [why], h: CLH });
}
card("0.3.2", r`If $\vec{u} = (u_1,u_2,u_3)$ is a vector, we have the divergence $\nabla \cdot \vec{u} = \frac{\partial u_1}{\partial x} + \frac{\partial u_2}{\partial y} + \frac{\partial u_3}{\partial z}$ and the curl $\nabla \times \vec{u} = \Bigl( \frac{\partial u_3}{\partial y} - \frac{\partial u_2}{\partial z} , \frac{\partial u_1}{\partial z} - \frac{\partial u_3}{\partial x} , \frac{\partial u_2}{\partial x} - \frac{\partial u_1}{\partial y} \Bigr)$. Notice that the curl of a vector is still a vector. Write out Maxwell's equations in terms of partial derivatives and classify the system. Note that $\rho$ and $\vec{J}$ are given functions, the dependent variables are $\vec{E}$, $\vec{B}$, $\vec{D}$, and $\vec{H}$.`, [], {
  ctx: r`Maxwell's equations: $\nabla \cdot \vec{D} = \rho$, $\nabla \cdot \vec{B} = 0$, $\nabla \times \vec{E} = - \frac{\partial \vec{B}}{\partial t}$, $\nabla \times \vec{H} = \vec{J} + \frac{\partial \vec{D}}{\partial t}$.`,
  sol: [r`Divergence equations: $\frac{\partial D_1}{\partial x} + \frac{\partial D_2}{\partial y} + \frac{\partial D_3}{\partial z} = \rho$ and $\frac{\partial B_1}{\partial x} + \frac{\partial B_2}{\partial y} + \frac{\partial B_3}{\partial z} = 0$.`,
    r`Curl of $\vec E$: $\frac{\partial E_3}{\partial y} - \frac{\partial E_2}{\partial z} = -\frac{\partial B_1}{\partial t}$, $\frac{\partial E_1}{\partial z} - \frac{\partial E_3}{\partial x} = -\frac{\partial B_2}{\partial t}$, $\frac{\partial E_2}{\partial x} - \frac{\partial E_1}{\partial y} = -\frac{\partial B_3}{\partial t}$.`,
    r`Curl of $\vec H$: $\frac{\partial H_3}{\partial y} - \frac{\partial H_2}{\partial z} = J_1 + \frac{\partial D_1}{\partial t}$, and similarly for the 2nd and 3rd components.`,
    r`Classification: a system of 8 PDEs in 12 unknown functions, first order, linear, nonhomogeneous (because of $\rho$ and $\vec J$), constant-coefficient.`],
  h: "Write each vector equation one component at a time." });
card("0.3.3", r`Suppose $F$ is a linear function of two variables, that is, $F(x,y) = ax+by$ for constants $a$ and $b$. Suppose $a \neq 0$. Classify equations of the form $F(y',y) = 0$.`,
  classify(true, false, 1, true, true, true, true), { sol: [r`$F(y',y) = ay' + by = 0$. Since $a \neq 0$, $y'$ really appears.`, r`So it is a first-order, linear, homogeneous, constant-coefficient, autonomous ODE (a single equation).`], h: r`Write out $F(y',y)$.` });
card("0.3.4", r`Write down an explicit example of a third-order, linear, variable-coefficient (i.e. not constant-coefficient), nonautonomous, nonhomogeneous system of two ODEs such that every derivative that could appear, does appear.`, [], {
  sol: [r`One example, with unknowns $x(t)$ and $y(t)$:`, r`$$x''' + t\,x'' + x' + x + y''' + y'' + y' + y = t$$`, r`$$y''' + y'' + y' + y + x''' + x'' + x' + t\,x = 1$$`, r`Every derivative of $x$ and $y$ up to order 3 appears, the coefficients $t$ make it variable-coefficient and nonautonomous, and the right-hand sides make it nonhomogeneous. Many other answers are fine.`],
  h: r`Put every derivative of both unknowns in each equation, and use a coefficient like $t$ somewhere.` });
for (const [p, eq, cl, b] of [
  ["a", r`$\frac{\partial^2 v}{\partial x^2} + 3 \frac{\partial^2 v}{\partial y^2} = \sin(x)$`, [false, false, 2, true, false, true, NA], r`PDE, equation, $2^{\text{nd}}$-order, linear, nonhomogeneous, constant-coefficient.`],
  ["b", r`$\frac{d x}{dt} + \cos(t) x = t^2+t+1$`, [true, false, 1, true, false, false, false], r`ODE, equation, $1^{\text{st}}$-order, linear, nonhomogeneous, not constant-coefficient, not autonomous.`],
  ["c", r`$\frac{d^7 F}{dx^7} = 3F(x)$`, [true, false, 7, true, true, true, true], r`ODE, equation, $7^{\text{th}}$-order, linear, homogeneous, constant-coefficient, autonomous.`],
  ["d", r`$y''+8y'=1$`, [true, false, 2, true, false, true, true], r`ODE, equation, $2^{\text{nd}}$-order, linear, nonhomogeneous, constant-coefficient, autonomous.`],
  ["e", r`$x''+tyx'=0, \quad y''+txy = 0$`, [true, true, 2, false, NA, NA, false], r`ODE, system, $2^{\text{nd}}$-order, nonlinear, not autonomous.`],
  ["f", r`$\frac{\partial u}{\partial t} = \frac{\partial^2 u}{\partial s^2} + u^2$`, [false, false, 2, false, NA, NA, NA], r`PDE, equation, $2^{\text{nd}}$-order, nonlinear.`],
] as [string, string, Cl, string][]) {
  card("0.3.101", Q031 + " " + eq, classify(...cl), { p, src: "b", bk: b, h: CLH });
}
card("0.3.102", r`Write down the general zeroth-order linear ordinary differential equation. Write down the general solution.`, [], { src: "b", bk: r`equation: $a(x) y = b(x)$, solution: $y = \frac{b(x)}{a(x)}$.`, h: r`Zeroth order means no derivatives of $y$ appear at all.` });
card("0.3.103", r`For which $k$ is $\frac{dx}{dt}+x^k = t^{k+2}$ linear? Hint: There are two answers.`, [S([0, 1], r`Values of $k$ (separate with commas)`)], { src: "b", bk: r`$k=0$ or $k=1$`, sol: [r`$x^k$ is linear in $x$ only for $k = 1$ ($x$) or $k = 0$ (the constant 1).`], h: r`When is $x^k$ either a constant or $x$ itself?` });

// ---- 1.1 ----
card("1.1.1", r`Solve for $v$, then solve for $x$. Find $x(10)$ to answer the question.`,
  [E("t^3/3+10", { t: [0, 5] }, r`$v(t) =$`), E("t^4/12+10t+1", { t: [0, 5] }, r`$x(t) =$`), N("2803/3", r`$x(10) =$ (meters)`)], {
  ctx: r`The car accelerates at $t^2$ m/s². At $t=0$ it is at the 1-meter mark traveling at 10 m/s: $x'' = t^2$, $x(0) = 1$, $x'(0) = 10$. With $v = x'$: $v' = t^2$, $v(0) = 10$.`,
  sol: [r`$v = \frac{t^3}{3} + C$ and $v(0) = 10$, so $v = \frac{t^3}{3} + 10$.`, r`$x = \frac{t^4}{12} + 10t + D$ and $x(0) = 1$, so $x = \frac{t^4}{12} + 10t + 1$.`, r`$x(10) = \frac{10000}{12} + 100 + 1 = \frac{2803}{3} \approx 934.33$ meters.`],
  h: r`Integrate once for $v$, use $v(0)=10$; integrate again for $x$, use $x(0)=1$.` });
for (const [id, q, a, dom, lab, sol, h] of [
  ["1.1.2", r`Solve $\frac{dy}{dx} = x^2+x$ for $y(1)=3$.`, "x^3/3+x^2/2+13/6", [-2, 2], r`$y(x) =$`, [r`$y = \frac{x^3}{3} + \frac{x^2}{2} + C$.`, r`$y(1) = \frac13 + \frac12 + C = 3$, so $C = \frac{13}{6}$.`], r`Integrate, then use $y(1)=3$.`],
  ["1.1.3", r`Solve $\frac{dy}{dx} = \sin (5x)$ for $y(0)=2$.`, "-cos(5x)/5+11/5", [-2, 2], r`$y(x) =$`, [r`$y = -\frac{\cos(5x)}{5} + C$.`, r`$y(0) = -\frac15 + C = 2$, so $C = \frac{11}{5}$.`], r`Integrate, then use $y(0)=2$.`],
  ["1.1.4", r`Solve $\frac{dy}{dx} = \frac{1}{x^2-1}$ for $y(0)=0$.`, "ln((1-x)/(1+x))/2", [-0.9, 0.9], r`$y(x) =$`, [r`Partial fractions: $\frac{1}{x^2-1} = \frac12\left(\frac{1}{x-1} - \frac{1}{x+1}\right)$.`, r`$y = \frac12\ln\lvert x-1\rvert - \frac12\ln\lvert x+1\rvert + C$ and $y(0) = 0$ gives $C = 0$.`, r`On $-1<x<1$: $y = \frac12\ln\left(\frac{1-x}{1+x}\right)$.`], "Use partial fractions."],
  ["1.1.5", r`Solve $y' = y^3$ for $y(0)=1$.`, "1/sqrt(1-2x)", [-1, 0.4], r`$y(x) =$`, [r`Here $\frac{dx}{dy} = y^{-3}$, so $x = -\frac{1}{2y^2} + C$.`, r`$y(0)=1$: $0 = -\frac12 + C$, so $C = \frac12$ and $y^2 = \frac{1}{1-2x}$.`, r`$y(0) = 1 > 0$, so take the positive root: $y = \frac{1}{\sqrt{1-2x}}$ (for $x < \frac12$).`], r`Flip it: solve $\frac{dx}{dy} = \frac{1}{y^3}$.`],
  ["1.1.6", r`[little harder] Solve $y' = (y-1)(y+1)$ for $y(0)=3$.`, "(2+e^(2x))/(2-e^(2x))", [-1, 0.3], r`$y(x) =$`, [r`$\frac{dx}{dy} = \frac{1}{(y-1)(y+1)}$, so $x = \frac12\ln\left\lvert\frac{y-1}{y+1}\right\rvert + C$.`, r`$y(0)=3$: $C = -\frac12\ln\frac12$, so $\frac{y-1}{y+1} = \frac12e^{2x}$.`, r`Solve for $y$: $y = \frac{2+e^{2x}}{2-e^{2x}}$ (valid for $x < \frac{\ln 2}{2}$).`], r`Flip to $\frac{dx}{dy}$ and use partial fractions.`],
  ["1.1.7", r`Solve $\frac{dy}{dx} = \frac{1}{y+1}$ for $y(0)=0$.`, "-1+sqrt(1+2x)", [-0.4, 2], r`$y(x) =$`, [r`$\frac{dx}{dy} = y+1$, so $x = \frac{y^2}{2} + y + C$, and $y(0)=0$ gives $C=0$.`, r`$y^2 + 2y - 2x = 0$, so $y = -1 \pm \sqrt{1+2x}$; $y(0)=0$ picks $+$.`], r`Flip to $\frac{dx}{dy} = y+1$.`],
  ["1.1.8", r`[harder] Solve $y'' = \sin x$ for $y(0)=0$, $y'(0) = 2$.`, "3x-sin(x)", [-3, 3], r`$y(x) =$`, [r`$y' = -\cos x + C_1$ and $y'(0) = -1 + C_1 = 2$, so $C_1 = 3$.`, r`$y = -\sin x + 3x + C_2$ and $y(0)=0$ gives $C_2 = 0$.`], "Integrate twice, fitting a constant each time."],
] as [string, string, string, number[], string, string[], string][]) {
  card(id, q, [E(a, { x: dom }, lab)], { sol, h });
}
card("1.1.9", r`A spaceship is traveling at the speed $2t^2+1$ km/s ($t$ is time in seconds). It is pointing directly away from earth and at time $t=0$ it is 1000 kilometers from earth. How far from earth is it at one minute from time $t=0$?`,
  [N(145060, "Distance (km)")], { sol: [r`$x' = 2t^2+1$, $x(0) = 1000$, so $x = \frac{2t^3}{3} + t + 1000$.`, r`$x(60) = \frac{2(216000)}{3} + 60 + 1000 = 145060$ km.`], h: r`One minute is $t = 60$ seconds.` });
card("1.1.10", r`Solve $\frac{dx}{dt} = \sin(t^2)+t$, $x(0)=20$. It is OK to leave your answer as a definite integral.`, [], {
  sol: [r`Integrate from 0 to $t$: $$x(t) = \int_0^t \bigl(\sin(s^2) + s\bigr)\,ds + 20 = \frac{t^2}{2} + 20 + \int_0^t \sin(s^2)\,ds.$$`], h: r`$\sin(t^2)$ has no elementary antiderivative; use $\int_0^t$.` });
card("1.1.11", r`A dropped ball accelerates downwards at a constant rate $9.8$ meters per second squared. Set up the differential equation for the height above ground $h$ in meters. Then supposing $h(0) = 100$ meters, how long does it take for the ball to hit the ground?`,
  [NT("sqrt(100/4.9)", "Time to hit the ground (seconds)", 0.003)], {
  sol: [r`$h'' = -9.8$, with $h(0) = 100$ and $h'(0) = 0$ (it is dropped).`, r`$h = 100 - 4.9t^2$. Setting $h = 0$: $t = \sqrt{100/4.9} \approx 4.52$ seconds.`], h: "Dropped means initial velocity 0." });
card("1.1.12", r`Find the general solution of $y' = e^x$, and then $y' = e^y$.`,
  [G("e^x", [[-2, 2], [-2, 2]], "y=e^x+C", r`For $y'=e^x$:`), G("e^y", [[-2, 2], [-2, 2]], "y=-ln(C-x)", r`For $y'=e^y$:`)], {
  sol: [r`$y' = e^x$: $y = e^x + C$.`, r`$y' = e^y$: $e^{-y}\,dy = dx$, so $-e^{-y} = x - C$, giving $y = -\ln(C - x)$.`], h: r`For the second one, flip to $\frac{dx}{dy} = e^{-y}$.` });
card("1.1.101", r`Solve $\frac{dy}{dx} = e^x + x$ and $y(0) = 10$.`, [E("e^x+x^2/2+9", { x: [-2, 2] }, r`$y(x) =$`)], { src: "b", bk: r`$y = e^x + \frac{x^2}{2} + 9$`, h: r`Integrate, then use $y(0)=10$.` });
card("1.1.102", r`Solve $x' = \frac{1}{x^2}$, $x(1)=1$.`, [E("(3t-2)^(1/3)", { t: [0.8, 3] }, r`$x(t) =$`)], { src: "b", bk: r`$x = (3t-2)^{1/3}$`, h: r`Flip: $\frac{dt}{dx} = x^2$.` });
card("1.1.103", r`Solve $x' = \frac{1}{\cos(x)}$, $x(0)=\frac{\pi}{4}$.`, [E("arcsin(t+1/sqrt(2))", { t: [-1.5, 0.25] }, r`$x(t) =$`)], { src: "b", bk: r`$x = \sin^{-1} \bigl(t+\frac{1}{\sqrt{2}}\bigr)$`, h: r`Flip: $\frac{dt}{dx} = \cos x$. Type $\sin^{-1}$ as arcsin( ).` });
card("1.1.104", r`Sid is in a car traveling at speed $10t+70$ miles per hour away from Las Vegas, where $t$ is in hours. At $t=0$, Sid is 10 miles away from Vegas. How far from Vegas is Sid 2 hours later?`, [N(170, "Distance (miles)")], { src: "b", bk: "170", sol: [r`$x = 5t^2 + 70t + 10$, so $x(2) = 20 + 140 + 10 = 170$.`], h: "Integrate the speed and add the starting distance." });
card("1.1.105", r`Solve $y' = y^n$, $y(0) = 1$, where $n$ is a positive integer. Hint: You have to consider different cases.`,
  [E("((1-n)x+1)^(1/(1-n))", { x: [-1, 0.2], n: [2, 5] }, r`If $n \neq 1$: $y =$`), E("e^x", { x: [-1, 1] }, r`If $n = 1$: $y =$`)], { src: "b",
  bk: r`If $n \neq 1$, then $y=\bigl((1-n)x+1\bigr)^{1/(1-n)}$. If $n=1$, then $y = e^x$.`, h: r`For $n \neq 1$: $\frac{dx}{dy} = y^{-n}$ integrates to $\frac{y^{1-n}}{1-n}$.` });
card("1.1.106", r`The rate of change of the volume of a snowball that is melting is proportional to the surface area of the snowball. Suppose the snowball is perfectly spherical. The volume (in centimeters cubed) of a ball of radius $r$ centimeters is $\frac{4}{3} \pi r^3$. The surface area is $4 \pi r^2$. Set up the differential equation for how the radius $r$ is changing. Then, suppose that at time $t=0$ minutes, the radius is 10 centimeters. After 5 minutes, the radius is 8 centimeters. At what time $t$ will the snowball be completely melted?`,
  [N(25, "Time fully melted (minutes)")], { src: "b", bk: r`The equation is $r' = -C$ for some constant $C$. The snowball will be completely melted in 25 minutes from time $t=0$.`,
  sol: [r`$V' = 4\pi r^2 r' = -k\,4\pi r^2$, so $r' = -k$: the radius shrinks linearly. It loses 2 cm in 5 minutes, so 10 cm takes 25 minutes.`], h: r`$\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}$.` });
card("1.1.107", r`Find the general solution to $y''''= 0$. How many distinct constants do you need?`, [N(4, "Number of constants")], { src: "b", bk: r`$y = Ax^3 + Bx^2 + Cx + D$, so 4 constants.`, h: "Integrate four times." });

// ---- 1.2 ----
const UNQ = ["Yes, and the solution is unique", "Yes, but it may not be unique", "No"];
const UNQ2 = ["Yes, and the solution is unique", "Yes, but it is not unique", "No"];
const ABC = ["(a)", "(b)", "(c)"];
card("1.2.1", r`Sketch the slope field for $y'=e^{x-y}$. How do the solutions behave as $x$ grows? Can you guess a particular solution by looking at the slope field?`,
  [R("Yp-e^(x-Y)", "x", "x", "y", [-2, 2], r`A particular solution: $y =$`)], { ssf: { f: "e^(x-y)" },
  sol: [r`Along the line $y = x$ the slope is $e^0 = 1$, which is exactly the slope of that line, so $y = x$ is a solution.`, r`Solving: $e^y dy = e^x dx$ gives $y = \ln(e^x + C)$. As $x$ grows, every solution approaches the line $y = x$ (and $y - x \to 0$).`, "The checker accepts any exact solution."],
  h: "Look for a straight line whose slope matches the slope field along it." });
card("1.2.2", r`Sketch the slope field for $y'=x^2$.`, [], { ssf: { f: "x^2" }, sol: [r`Slopes depend only on $x$: zero along the $y$-axis, positive everywhere else and steeper as $|x|$ grows. Solutions are the cubics $y = \frac{x^3}{3} + C$.`], h: r`The slope doesn't depend on $y$.` });
card("1.2.3", r`Sketch the slope field for $y'=y^2$.`, [], { ssf: { f: "y^2" }, sol: [r`Slopes depend only on $y$: zero along the $x$-axis, positive elsewhere, steeper as $|y|$ grows. $y = 0$ is a solution; others are $y = \frac{1}{C - x}$, which blow up.`], h: r`The slope doesn't depend on $x$.` });
card("1.2.4", r`Is it possible to solve the equation $y' = \frac{xy}{\cos x}$ for $y(0) = 1$? Justify.`, [MC(UNQ, 0, "Answer")], {
  sol: [r`$f(x,y) = \frac{xy}{\cos x}$ is continuous near $(0,1)$ since $\cos 0 = 1 \neq 0$.`, r`$\frac{\partial f}{\partial y} = \frac{x}{\cos x}$ is also continuous there, so Picard's theorem gives a unique solution near $x=0$.`], h: r`Check Picard's theorem: is $f$ and $\partial f/\partial y$ continuous near $(0,1)$?` });
card("1.2.5", r`Is it possible to solve the equation $y' = y\sqrt{\lvert x\rvert}$ for $y(0) = 0$? Is the solution unique? Justify.`, [MC(UNQ2, 0, "Answer")], {
  sol: [r`$f(x,y) = y\sqrt{|x|}$ is continuous everywhere, and $\frac{\partial f}{\partial y} = \sqrt{|x|}$ is continuous everywhere.`, r`By Picard, a unique solution exists. It is $y = 0$.`], h: r`Compute $\partial f/\partial y$.` });
card("1.2.6", r`Match equations $y'=1-x$, $y'=x-2y$, $y' = x(1-y)$ to slope fields. Justify.`,
  [MC(ABC, 1, r`$y'=1-x$ is`), MC(ABC, 2, r`$y'=x-2y$ is`), MC(ABC, 0, r`$y'=x(1-y)$ is`)], {
  sf: [{ f: "x*(1-y)", lab: "(a)" }, { f: "1-x", lab: "(b)" }, { f: "x-2*y", lab: "(c)" }],
  sol: [r`$y'=1-x$ doesn't depend on $y$: slopes are the same in each vertical column, positive for $x<1$. That's (b).`, r`$y'=x(1-y)$ is zero on the $y$-axis ($x=0$) and on $y=1$. That's (a).`, r`$y'=x-2y$ is zero along the line $y = x/2$, negative above it and positive below. That's (c).`],
  h: "Find where each slope is zero." });
card("1.2.7", r`[challenging] Take $y' = f(x,y)$, $y(0) = 0$, where $f(x,y) > 1$ for all $x$ and $y$. If the solution exists for all $x$, can you say what happens to $y(x)$ as $x$ goes to positive infinity? Explain.`,
  [MC([r`$y(x) \to \infty$`, r`$y(x) \to 0$`, r`$y(x)$ approaches some finite limit`, "Can't tell"], 0, r`As $x \to \infty$`)], {
  sol: [r`Since $y' > 1$, $y(x) = \int_0^x f\bigl(s,y(s)\bigr)\,ds > x$ for $x > 0$.`, r`So $y(x) > x \to \infty$.`], h: r`Compare $y(x)$ with the line $y = x$.` });
card("1.2.8", r`[challenging] Take $(y-x)y' = 0$, $y(0) = 0$. Find two distinct solutions.`,
  [R("(Y-x)*Yp", "x", "x", "y", [-2, 2], r`First solution: $y =$`, [[0, 0, 0]]), R("(Y-x)*Yp", "0", "x", "y", [-2, 2], r`Second solution: $y =$`, [[0, 0, 0]])], { p: "a", distinct: [0, 1],
  sol: [r`$(y-x)y' = 0$ holds if $y' = 0$ or $y = x$.`, r`$y = 0$ and $y = x$ both satisfy $y(0) = 0$.`], h: "A product is zero when either factor is zero." });
card("1.2.8", r`[challenging] Take $(y-x)y' = 0$, $y(0) = 0$. Explain why this does not violate Picard's theorem.`, [], { p: "b",
  sol: [r`To use Picard we must write the equation as $y' = f(x,y)$. Here that means $y' = \frac{0}{y-x}$, which is not defined at the initial point $(0,0)$ where $y = x$.`, r`So Picard's hypotheses don't hold, and it says nothing about uniqueness here.`], h: r`Can you write it as $y' = f(x,y)$ with $f$ continuous near $(0,0)$?` });
card("1.2.9", r`Suppose $y' = f(x,y)$. What will the slope field look like, explain and sketch an example, if you know the following about $f(x,y)$: (a) $f$ does not depend on $y$. (b) $f$ does not depend on $x$. (c) $f(t,t) = 0$ for any number $t$. (d) $f(x,0) = 0$ and $f(x,1) = 1$ for all $x$.`, [], {
  sol: [r`(a) Slopes are the same along every vertical line; solutions are vertical shifts of one another. Example: $y' = x$.`, r`(b) Slopes are the same along every horizontal line; solutions are horizontal shifts of one another. Example: $y' = y$.`, r`(c) Slopes are zero along the diagonal $y = x$. Example: $y' = x - y$.`, r`(d) Slopes are zero along $y = 0$ (so $y = 0$ is a solution) and equal to 1 along $y = 1$. Example: $y' = y$.`],
  h: "Think about which lines in the plane have the same slope everywhere on them." });
card("1.2.10", r`Find a solution to $y' = \lvert y \rvert$, $y(0) = 0$. Does Picard's theorem apply?`,
  [R("Yp-abs(Y)", "0", "x", "y", [-2, 2], r`A solution: $y =$`, [[0, 0, 0]]), MC(YN, 1, "Does Picard's theorem apply?")], {
  sol: [r`$y = 0$ works: $y' = 0 = |0|$ and $y(0) = 0$.`, r`$f(x,y) = |y|$ is continuous, but $\frac{\partial f}{\partial y}$ does not exist at $y = 0$, so Picard's theorem (as stated in the book) does not apply.`], h: r`Try a constant. Then check whether $\partial f/\partial y$ is continuous at $y=0$.` });
card("1.2.11", r`Take an equation $y' = (y-2x) g(x,y) + 2$ for some function $g(x,y)$. Can you solve the problem for the initial condition $y(0) = 0$, and if so what is the solution?`,
  [E("2x", { x: [-2, 2] }, r`$y =$`)], { sol: [r`Try $y = 2x$: then $y - 2x = 0$ and $y' = 2 = 0\cdot g + 2$. It works and $y(0)=0$.`], h: r`Make the factor $(y - 2x)$ vanish.` });
card("1.2.12", r`[challenging] Suppose $y' = f(x,y)$ is such that $f(x,1) = 0$ for every $x$, $f$ is continuous and $\frac{\partial f}{\partial y}$ exists and is continuous for every $x$ and $y$. Guess a solution given the initial condition $y(0) = 1$.`,
  [E("1", { x: [-2, 2] }, r`$y =$`)], { p: "a", sol: [r`$y = 1$: then $y' = 0 = f(x,1)$.`], h: "Try a constant." });
card("1.2.12", r`[challenging] (Same $f$: $f(x,1)=0$, with $f$ and $\frac{\partial f}{\partial y}$ continuous.) Can graphs of two solutions of the equation for different initial conditions (two different values of $y(0)$) ever intersect?`,
  [MC(YN, 1, "Can they intersect?")], { p: "b", sol: [r`No. If they met at a point, Picard's theorem says there is only one solution through that point, so the two would be the same solution, contradicting different $y(0)$.`], h: "Use uniqueness from Picard's theorem." });
card("1.2.12", r`[challenging] (Same $f$.) Given $y(0) = 0$, what can you say about the solution? In particular, can $y(x) > 1$ for any $x$? Can $y(x) = 1$ for any $x$? Why or why not?`,
  [MC([r`$y(x) < 1$ for every $x$`, r`$y(x) = 1$ for some $x$`, r`$y(x) > 1$ for some $x$`], 0, "Which is true?")], { p: "c",
  sol: [r`$y = 1$ is a solution. If our solution ever reached $y = 1$, its graph would meet the graph of $y = 1$, which part (b) rules out.`, r`By continuity it can't jump past 1 without hitting it, so $y(x) < 1$ for all $x$.`], h: r`Use part (b) with the solution $y = 1$.` });
card("1.2.101", r`Sketch the slope field of $y'=y^3$. Can you visually find the solution that satisfies $y(0)=0$?`, [E("0", { x: [-2, 2] }, r`$y =$`)], { src: "b", ssf: { f: "y^3" },
  bk: r`The slopes are positive above the $x$-axis and negative below, getting steeper further from the axis; they are zero on the $x$-axis and don't depend on $x$. $y=0$ is a solution such that $y(0)=0$.`, h: "Where are the slopes zero?" });
card("1.2.102", r`Is it possible to solve $y' = xy$ for $y(0) = 0$? Is the solution unique?`, [MC(UNQ2, 0, "Answer")], { src: "b",
  bk: r`Yes a solution exists. The equation is $y' = f(x,y)$ where $f(x,y) = xy$. The function $f(x,y)$ is continuous and $\frac{\partial f}{\partial y} = x$, which is also continuous near $(0,0)$. So a solution exists and is unique. (In fact, $y=0$ is the solution.)`, h: "Check Picard's theorem." });
card("1.2.103", r`Is it possible to solve $y' = \frac{x}{x^2-1}$ for $y(1) = 0$?`, [MC(YN, 1, "Possible?")], { src: "b", bk: r`No, the equation is not defined at $(x,y) = (1,0)$.`, h: r`Is $f$ defined at the initial point?` });
card("1.2.104", r`Match equations $y'=\sin x$, $y'=\cos y$, $y' = y\cos(x)$ to slope fields. Justify.`,
  [MC(ABC, 2, r`$y'=\sin x$ is`), MC(ABC, 0, r`$y'=\cos y$ is`), MC(ABC, 1, r`$y'=y\cos(x)$ is`)], { src: "b",
  sf: [{ f: "cos(y)", lab: "(a)" }, { f: "y*cos(x)", lab: "(b)" }, { f: "sin(x)", lab: "(c)" }],
  bk: r`a) $y'=\cos y$, b) $y' = y\cos(x)$, c) $y'=\sin x$. Justification left to reader.`,
  sol: [r`(a) depends only on $y$: $\cos y$. (b) is zero on the $x$-axis, like $y\cos x$. (c) depends only on $x$ and is zero on the $y$-axis, like $\sin x$.`], h: "Which fields change only left-to-right, and which only up-and-down?" });
card("1.2.105", r`[tricky] Suppose $f(y) = 0$ if $y > 0$, and $f(y) = 1$ if $y \leq 0$. Does $y' = f(y)$, $y(0) = 0$ have a differentiable solution? Does Picard apply? Why, or why not?`,
  [MC(YN, 1, "Is there a differentiable solution?"), MC(YN, 1, "Does Picard apply?")], { src: "b",
  bk: r`Picard does not apply as $f$ is not continuous at $y=0$. The equation does not have a differentiable solution. Suppose it did. Notice that $y'(0) = 1$. As the derivative is positive at $0$, $y(x) > 0$ for small positive $x$. But then for those $x$, we have $y'(x) = f\bigl(y(x)\bigr) = 0$. So $y$ is constant for $x > 0$, that makes it constant up to $x=0$ and $y(0)=0$. So $y(x)=0$ for small positive $x$, but we just said that $y(x) > 0$ for small positive $x$.`, h: r`What would $y'(0)$ be? What happens right after?` });
card("1.2.106", r`Consider an equation of the form $y' = f(x)$ for some continuous function $f$, and an initial condition $y(x_0) = y_0$. Does a solution exist for all $x$? Why or why not?`, [MC(YN, 0, r`Exists for all $x$?`)], { src: "b",
  bk: r`The solution is $y(x) = \int_{x_0}^x f(s) \,ds + y_0$, and this does indeed exist for every $x$.`, h: "Write the solution as a definite integral." });

// ---- 1.3 ----
const P138 = [[-1.5, -0.9789465991273747], [-0.8, 0.3485516853873878], [-0.3, 0.8322106736873441], [0, 1.0], [0.4, 1.1912190021507267], [0.9, 1.4532585309692296], [1.3, 1.7071754112491322], [1.8, 2.079567364581389]];
const O138 = [[-1.6574, -1.5791], [1.2051, 0.493], [-1.6235, -0.4012], [-0.0838, -2.0416], [0.9383, -2.318], [-0.4351, 0.1004], [-0.2775, 0.5208], [0.9514, 2.7376]];
const P1103 = [[-4.928, -1.2], [-2.625, -0.5], [-2, 0], [-1.375, 0.5], [0, 1], [2.1439999999999992, 1.4], [8, 2]];
const O1103 = [[-1.2948, 0.5942], [1.1773, -0.8291], [-2.9911, 1.8938], [-1.2096, -0.7441], [2.3503, 0.3407], [-0.1721, 1.0931], [-2.8179, 0.8279], [-0.7545, -1.6366]];
card("1.3.1", r`Solve $y' = \frac{x}{y}$.`, [G("x/y", [[-2, 2], [0.5, 3]], "y^2-x^2=C", "General solution:")], {
  sol: [r`Separate: $y\,dy = x\,dx$.`, r`Integrate: $\frac{y^2}{2} = \frac{x^2}{2} + C$, i.e. $y^2 - x^2 = C$, or $y = \pm\sqrt{x^2 + C}$.`], h: r`Multiply both sides by $y$ and integrate.` });
card("1.3.2", r`Solve $y' = x^2y$.`, [G("x^2*y", [[-1.5, 1.5], [0.2, 3]], "y=Ce^(x^3/3)", r`General solution: $y =$`)], {
  sol: [r`$\frac{dy}{y} = x^2\,dx$, so $\ln|y| = \frac{x^3}{3} + C$.`, r`$y = Ce^{x^3/3}$ (with $C = 0$ giving the solution $y = 0$).`], h: r`Divide by $y$ and integrate.` });
card("1.3.3", r`Solve $\frac{dx}{dt} = (x^2-1)\,t$, for $x(0) = 0$.`, [E("(1-e^(t^2))/(1+e^(t^2))", { t: [-1.5, 1.5] }, r`$x(t) =$`)], {
  sol: [r`$\frac{dx}{x^2-1} = t\,dt$, and partial fractions give $\frac12\ln\left\lvert\frac{x-1}{x+1}\right\rvert = \frac{t^2}{2} + C$.`, r`$x(0)=0$: $\ln 1 = 0$, so $C = 0$ and $\left\lvert\frac{x-1}{x+1}\right\rvert = e^{t^2}$. At $t=0$ the ratio is $-1$, so $\frac{x-1}{x+1} = -e^{t^2}$.`, r`Solve: $x = \frac{1-e^{t^2}}{1+e^{t^2}}$ (same as $-\tanh(t^2/2)$).`], h: r`Separate and use partial fractions on $\frac{1}{x^2-1}$.` });
card("1.3.4", r`Solve $\frac{dx}{dt} = x\,\sin(t)$, for $x(0) = 1$.`, [E("e^(1-cos(t))", { t: [-3, 3] }, r`$x(t) =$`)], {
  sol: [r`$\frac{dx}{x} = \sin t\,dt$, so $\ln x = -\cos t + C$.`, r`$x(0)=1$: $0 = -1 + C$, so $C = 1$ and $x = e^{1-\cos t}$.`], h: "Separate and integrate." });
card("1.3.5", r`Solve $\frac{dy}{dx} = xy+x+y+1$. Hint: Factor the right-hand side.`, [G("x*y+x+y+1", [[-1.5, 1.5], [-0.5, 3]], "y=Ce^(x^2/2+x)-1", r`General solution: $y =$`)], {
  sol: [r`$xy + x + y + 1 = (x+1)(y+1)$.`, r`$\frac{dy}{y+1} = (x+1)\,dx$, so $\ln|y+1| = \frac{x^2}{2} + x + C$.`, r`$y = Ce^{x^2/2 + x} - 1$.`], h: "$xy+x+y+1 = (x+1)(y+1)$." });
card("1.3.6", r`Solve $xy' = y + 2x^2 y$, where $y(1) = 1$.`, [E("x*e^(x^2-1)", { x: [0.2, 2] }, r`$y(x) =$`)], {
  sol: [r`$\frac{dy}{y} = \left(\frac1x + 2x\right)dx$, so $\ln y = \ln x + x^2 + C$.`, r`$y(1) = 1$: $0 = 0 + 1 + C$, so $C = -1$ and $y = xe^{x^2-1}$.`], h: r`Factor the right side as $y(1 + 2x^2)$.` });
card("1.3.7", r`Solve $\frac{dy}{dx} = \frac{y^2+1}{x^2+1}$, for $y(0) = 1$.`, [E("(1+x)/(1-x)", { x: [-0.9, 0.9] }, r`$y(x) =$`)], {
  sol: [r`$\frac{dy}{y^2+1} = \frac{dx}{x^2+1}$, so $\arctan y = \arctan x + C$.`, r`$y(0) = 1$: $C = \frac{\pi}{4}$, so $y = \tan\left(\arctan x + \frac{\pi}{4}\right)$.`, r`By the tangent addition formula this simplifies to $y = \frac{1+x}{1-x}$.`], h: "Both sides integrate to arctangents." });
card("1.3.8", r`Find an implicit solution for $\frac{dy}{dx} = \frac{x^2+1}{y^2+1}$, for $y(0) = 1$.`, [I("y^3/3+y=x^3/3+x+4/3", "x", "y", P138, O138, r`Implicit solution (an equation in $x$ and $y$):`)], {
  sol: [r`$(y^2+1)\,dy = (x^2+1)\,dx$, so $\frac{y^3}{3} + y = \frac{x^3}{3} + x + C$.`, r`$y(0) = 1$: $C = \frac13 + 1 = \frac43$.`, r`Answer: $\frac{y^3}{3} + y = \frac{x^3}{3} + x + \frac43$ (or $y^3 + 3y = x^3 + 3x + 4$).`], h: r`Separate, integrate, then plug in $(0,1)$.` });
card("1.3.9", r`Find an explicit solution for $y' = xe^{-y}$, $y(0)=1$.`, [E("ln(x^2/2+e)", { x: [-2, 2] }, r`$y(x) =$`)], {
  sol: [r`$e^y\,dy = x\,dx$, so $e^y = \frac{x^2}{2} + C$.`, r`$y(0) = 1$: $C = e$. So $y = \ln\left(\frac{x^2}{2} + e\right)$.`], h: r`Multiply by $e^y$.` });
card("1.3.10", r`Find an explicit solution for $xy' = e^{-y}$, for $y(1)=1$.`, [E("ln(ln(x)+e)", { x: [0.2, 3] }, r`$y(x) =$`)], {
  sol: [r`$e^y\,dy = \frac{dx}{x}$, so $e^y = \ln|x| + C$.`, r`$y(1) = 1$: $C = e$. So $y = \ln(\ln x + e)$ (for $x > 0$).`], h: r`Multiply by $e^y$ and divide by $x$.` });
card("1.3.11", r`Find an explicit solution for $y' = ye^{-x^2}$, $y(0)=1$. It is alright to leave a definite integral in your answer.`, [], {
  sol: [r`$\frac{dy}{y} = e^{-x^2}dx$. Integrate from 0: $\ln y = \int_0^x e^{-s^2}\,ds$ (using $y(0) = 1$).`, r`$$y = e^{\int_0^x e^{-s^2}\,ds}$$`], h: r`$e^{-x^2}$ has no elementary antiderivative; use $\int_0^x$.` });
card("1.3.12", r`Suppose a cup of coffee is at 100 degrees Celsius at time $t=0$, it is at 70 degrees at $t=10$ minutes, and it is at 50 degrees at $t=20$ minutes. Compute the ambient temperature.`,
  [N(10, "Ambient temperature (°C)")], {
  sol: [r`Newton's law of cooling: $T = A + (100 - A)r^{t/10}$ where $r = e^{-10k}$.`, r`$70 = A + (100-A)r$ and $50 = A + (100-A)r^2$.`, r`So $r = \frac{70-A}{100-A}$ and $r^2 = \frac{50-A}{100-A}$, giving $(70-A)^2 = (50-A)(100-A)$.`, r`$4900 - 140A = 5000 - 150A$, so $A = 10$ °C.`], h: r`Eliminate the rate: the ratio $\frac{T - A}{100 - A}$ squares from 10 to 20 minutes.` });
card("1.3.101", r`Solve $y'=2xy$.`, [G("2*x*y", [[-1.5, 1.5], [0.2, 3]], "y=Ce^(x^2)", r`General solution: $y =$`)], { src: "b", bk: r`$y = Ce^{x^2}$`, h: r`Separate: $dy/y = 2x\,dx$.` });
card("1.3.102", r`Solve $x'=3xt^2-3t^2$, $x(0)=2$.`, [E("e^(t^3)+1", { t: [-1.2, 1.2] }, r`$x(t) =$`)], { src: "b", bk: r`$x = e^{t^3}+1$`, h: r`Factor: $3t^2(x-1)$.` });
card("1.3.103", r`Find an implicit solution for $x'=\frac{1}{3x^2+1}$, $x(0)=1$.`, [I("x^3+x=t+2", "t", "x", P1103, O1103, r`Implicit solution (an equation in $t$ and $x$):`)], { src: "b", bk: r`$x^3+x=t+2$`, h: r`Separate: $(3x^2+1)\,dx = dt$.` });
card("1.3.104", r`Find an explicit solution to $x y' = y^2$, $y(1) = 1$.`, [E("1/(1-ln(x))", { x: [0.3, 2.5] }, r`$y(x) =$`)], { src: "b", bk: r`$y = \frac{1}{1-\ln x}$`, h: r`Separate: $dy/y^2 = dx/x$.` });
card("1.3.105", r`Find an implicit solution to $y' = \frac{\sin(x)}{\cos(y)}$.`, [G("sin(x)/cos(y)", [[-3, 3], [-1.2, 1.2]], "sin(y)=-cos(x)+C", "Implicit general solution:")], { src: "b", bk: r`$\sin(y) = -\cos(x) + C$`, h: r`Separate: $\cos y\,dy = \sin x\,dx$.` });
card("1.3.106", r`Take the coffee example from the text with the same numbers: 89 degrees at $t=0$, 85 degrees at $t=1$, and ambient temperature of 22 degrees. Suppose these temperatures were measured with a precision of $\pm 0.5$ degrees. Given this imprecision, the time it takes the coffee to cool to (exactly) 60 degrees is also only known in a certain range. Find this range. Hint: Think about what kind of error makes the cooling time longer and what shorter.`,
  [NB(7.45, "Shortest time (minutes)", 0.03), NB(12.15, "Longest time (minutes)", 0.03)], { src: "b", bk: "The range is approximately 7.45 to 12.15 minutes.",
  sol: [r`$T = A + (T_0 - A)e^{-kt}$ with $e^{-k} = \frac{T_1 - A}{T_0 - A}$, so $t = \frac{\ln\frac{60-A}{T_0-A}}{\ln\frac{T_1-A}{T_0-A}}$.`, r`Try the extremes $T_0 = 89 \pm 0.5$, $T_1 = 85 \pm 0.5$, $A = 22 \pm 0.5$. The smallest $t$ is about 7.45 and the largest about 12.15 minutes.`], h: r`Write $t$ in terms of $T_0$, $T_1$, $A$ and try the 8 combinations of ±0.5.` });
card("1.3.107", r`A population $x$ of rabbits on an island is modeled by $x' = x- \frac{1}{1000} x^2$, where the independent variable $t$ is time in months. At time $t=0$, there are 40 rabbits on the island. Find the solution to the equation with the initial condition.`,
  [E("1000e^t/(e^t+24)", { t: [0, 8] }, r`$x(t) =$`)], { p: "a", src: "b", bk: r`$x = \frac{1000e^t}{e^t+24}$`, h: r`Separate and use partial fractions: $\frac{1}{x(1 - x/1000)} = \frac1x + \frac{1}{1000-x}$.` });
card("1.3.107", r`(Rabbits: $x = \frac{1000e^t}{e^t+24}$.) How many rabbits are on the island in 1 month, 5 months, 10 months, 15 months (round to the nearest integer)?`,
  [NB(102, "1 month", 0.5), NB(861, "5 months", 0.5), NB(999, "10 months", 0.5), NB(1000, "15 months", 0.5)], { p: "b", src: "b", bk: "102 rabbits after one month, 861 after 5 months, 999 after 10 months, 1000 after 15 months.", h: "Plug into the formula from part (a)." });

// ---- 1.4 ----
card("1.4.1", r`Try it! Add a constant of integration to the integral in the integrating factor and show that the solution you get in the end is the same as what we got above.`, [], {
  ctx: r`Above, the book solved $y' + 2xy = e^{x-x^2}$, $y(0) = -1$ with integrating factor $e^{x^2}$ and got $y = e^{x-x^2} - 2e^{-x^2}$.`,
  sol: [r`Use $r(x) = e^{x^2 + D} = e^De^{x^2}$. Then $\frac{d}{dx}\bigl[e^De^{x^2}y\bigr] = e^De^x$.`, r`Integrate: $e^De^{x^2}y = e^De^x + C$, so $y = e^{x-x^2} + Ce^{-D}e^{-x^2}$.`, r`$y(0) = -1$ gives $1 + Ce^{-D} = -1$, so $Ce^{-D} = -2$ and $y = e^{x-x^2} - 2e^{-x^2}$, the same answer. The factor $e^D$ cancels.`], h: r`The extra constant becomes a factor $e^D$ on both sides.` });
card("1.4.2", r`Check that $y(x_0) = y_0$ in the formula $y(x) = e^{-\int_{x_0}^x p(s)\, ds} \left( \int_{x_0}^x e^{\int_{x_0}^t p(s)\, ds} f(t) \,dt + y_0 \right)$.`, [], {
  sol: [r`At $x = x_0$ every integral $\int_{x_0}^{x_0}$ is 0.`, r`So $y(x_0) = e^0(0 + y_0) = y_0$.`], h: r`What is $\int_{x_0}^{x_0}$ of anything?` });
card("1.4.3", r`Write the solution of the following problem as a definite integral, but try to simplify as far as you can. You will not be able to find the solution in closed form. $$y' + y = e^{x^2-x}, \qquad y(0) = 10 .$$`, [], {
  sol: [r`Integrating factor $e^x$: $\frac{d}{dx}\bigl[e^xy\bigr] = e^{x^2}$.`, r`Integrate from 0 to $x$: $e^xy - 10 = \int_0^x e^{s^2}\,ds$.`, r`$$y = e^{-x}\left(\int_0^x e^{s^2}\,ds + 10\right)$$`], h: r`Multiply by $e^x$; notice $e^x e^{x^2 - x} = e^{x^2}$.` });
card("1.4.4", r`Solve $y' + xy = x$.`, [G("x-x*y", [[-2, 2], [-2, 3]], "y=1+Ce^(-x^2/2)", r`General solution: $y =$`)], {
  sol: [r`Integrating factor $e^{x^2/2}$: $\frac{d}{dx}\bigl[e^{x^2/2}y\bigr] = xe^{x^2/2}$.`, r`$e^{x^2/2}y = e^{x^2/2} + C$, so $y = 1 + Ce^{-x^2/2}$.`], h: r`Integrating factor $e^{\int x\,dx}$.` });
card("1.4.5", r`Solve $y' + 6y = e^x$.`, [G("e^x-6*y", [[-1, 1], [-2, 3]], "y=e^x/7+Ce^(-6x)", r`General solution: $y =$`)], {
  sol: [r`Integrating factor $e^{6x}$: $\frac{d}{dx}\bigl[e^{6x}y\bigr] = e^{7x}$.`, r`$e^{6x}y = \frac{e^{7x}}{7} + C$, so $y = \frac{e^x}{7} + Ce^{-6x}$.`], h: r`Integrating factor $e^{6x}$.` });
card("1.4.6", r`Solve $y' + 3x^2y = \sin(x) \, e^{-x^3}$, with $y(0) = 1$.`, [E("(2-cos(x))e^(-x^3)", { x: [-1.2, 1.5] }, r`$y(x) =$`)], {
  sol: [r`Integrating factor $e^{x^3}$: $\frac{d}{dx}\bigl[e^{x^3}y\bigr] = \sin x$.`, r`$e^{x^3}y = -\cos x + C$; $y(0) = 1$ gives $C = 2$.`, r`$y = (2 - \cos x)e^{-x^3}$.`], h: r`Integrating factor $e^{x^3}$.` });
card("1.4.7", r`Solve $y' + \cos (x) y = \cos(x)$.`, [G("cos(x)-cos(x)*y", [[-3, 3], [-2, 3]], "y=1+Ce^(-sin(x))", r`General solution: $y =$`)], {
  sol: [r`Integrating factor $e^{\sin x}$: $\frac{d}{dx}\bigl[e^{\sin x}y\bigr] = \cos x\,e^{\sin x}$.`, r`$e^{\sin x}y = e^{\sin x} + C$, so $y = 1 + Ce^{-\sin x}$.`], h: r`Integrating factor $e^{\sin x}$.` });
card("1.4.8", r`Solve $\frac{1}{x^2+1} \, y' + x y = 3$, with $y(0) = 0$.`, [], {
  sol: [r`Multiply by $x^2+1$: $y' + x(x^2+1)y = 3(x^2+1)$.`, r`Integrating factor $e^{x^4/4 + x^2/2}$: $\frac{d}{dx}\bigl[e^{x^4/4+x^2/2}y\bigr] = 3(x^2+1)e^{x^4/4+x^2/2}$.`, r`The right side has no elementary antiderivative, so with $y(0)=0$: $$y = 3e^{-x^4/4 - x^2/2}\int_0^x (s^2+1)\,e^{s^4/4 + s^2/2}\,ds$$`], h: r`First put it in the form $y' + p(x)y = f(x)$.` });
card("1.4.9", r`Suppose there are two lakes located on a stream. Clean water flows into the first lake, then the water from the first lake flows into the second lake, and then water from the second lake flows further downstream. The in and out flow from each lake is 500 liters per hour. The first lake contains 100 thousand liters of water and the second lake contains 200 thousand liters of water. A truck with 500 kg of toxic substance crashes into the first lake. Assume that the water is being continually mixed perfectly by the stream. Find the concentration of toxic substance as a function of time in both lakes.`,
  [E("0.005e^(-t/200)", { t: [0, 800] }, r`Lake 1 concentration (kg/L), $c_1(t) =$`), E("0.005(e^(-t/400)-e^(-t/200))", { t: [1, 800] }, r`Lake 2 concentration (kg/L), $c_2(t) =$`)], { p: "a",
  sol: [r`Lake 1 (amount $x_1$ kg): $x_1' = -\frac{500}{100000}x_1 = -\frac{x_1}{200}$, $x_1(0) = 500$, so $x_1 = 500e^{-t/200}$ and $c_1 = \frac{x_1}{100000} = 0.005e^{-t/200}$.`, r`Lake 2: $x_2' = \frac{x_1}{200} - \frac{x_2}{400} = 2.5e^{-t/200} - \frac{x_2}{400}$, $x_2(0) = 0$.`, r`Integrating factor $e^{t/400}$: $x_2 = 1000\left(e^{-t/400} - e^{-t/200}\right)$, so $c_2 = \frac{x_2}{200000} = 0.005\left(e^{-t/400} - e^{-t/200}\right)$.`], h: "Work with the amount in each lake first; the outflow of lake 1 is the inflow of lake 2." });
card("1.4.9", r`(Two lakes, $c_1 = 0.005e^{-t/200}$ kg/L.) When will the concentration in the first lake be below 0.001 kg per liter?`, [N("200ln(5)", "Time (hours)")], { p: "b",
  sol: [r`$0.005e^{-t/200} < 0.001 \iff e^{-t/200} < 0.2 \iff t > 200\ln 5 \approx 321.9$ hours.`], h: r`Solve $0.005e^{-t/200} = 0.001$.` });
card("1.4.9", r`(Two lakes, $c_2 = 0.005\left(e^{-t/400} - e^{-t/200}\right)$ kg/L.) When will the concentration in the second lake be maximal?`, [N("400ln(2)", "Time (hours)")], { p: "c",
  sol: [r`$c_2' = 0.005\left(-\frac{1}{400}e^{-t/400} + \frac{1}{200}e^{-t/200}\right) = 0$ gives $e^{t/400} = 2$.`, r`$t = 400\ln 2 \approx 277.3$ hours.`], h: r`Set $c_2'(t) = 0$.` });
card("1.4.10", r`Newton's law of cooling states that $\frac{dx}{dt} = -k(x-A)$ where $x$ is the temperature, $t$ is time, $A$ is the ambient temperature, and $k > 0$ is a constant. Suppose that $A = A_0 \cos (\omega t)$ for some constants $A_0$ and $\omega$. That is, the ambient temperature oscillates (for example night and day temperatures). Find the general solution.`,
  [G("-k*(x-A_0*cos(omega*t))", [[-3, 3], [-3, 3]], "x=Ce^(-k t)+(k^2 A_0 cos(omega t)+k omega A_0 sin(omega t))/(k^2+omega^2)", r`General solution $x(t) =$ (type $A_0$ as A_0 and $\omega$ as w)`, { x: "t", y: "x", p: { k: [0.5, 2], A_0: [1, 3], omega: [0.5, 2] } })], { p: "a",
  sol: [r`$x' + kx = kA_0\cos(\omega t)$, integrating factor $e^{kt}$.`, r`Using $\int e^{kt}\cos(\omega t)\,dt = \frac{e^{kt}\bigl(k\cos\omega t + \omega\sin\omega t\bigr)}{k^2+\omega^2}$:`, r`$$x = Ce^{-kt} + \frac{k^2A_0\cos(\omega t) + k\omega A_0\sin(\omega t)}{k^2+\omega^2}$$`], h: r`It's linear: $x' + kx = kA_0\cos(\omega t)$.` });
card("1.4.10", r`(Newton's law of cooling with oscillating ambient temperature.) In the long term, will the initial conditions make much of a difference? Why or why not?`, [MC(YN, 1, "Do initial conditions matter in the long term?")], { p: "b",
  sol: [r`No. The initial condition only affects $C$, and the term $Ce^{-kt} \to 0$ as $t \to \infty$ because $k > 0$. Every solution approaches the same oscillation.`], h: r`Which part of the general solution contains $C$?` });
card("1.4.11", r`Initially 5 grams of salt are dissolved in 20 liters of water. Brine with a salt concentration of 2 grams per liter is added at a rate of 3 liters a minute. The tank is mixed well and is drained at 3 liters a minute. How long does the process have to continue until there are 20 grams of salt in the tank?`,
  [N("(20/3)ln(1.75)", "Time (minutes)")], {
  sol: [r`Volume stays 20 L. $x' = 2(3) - \frac{3}{20}x = 6 - \frac{3x}{20}$, $x(0) = 5$.`, r`$x = 40 - 35e^{-3t/20}$.`, r`$x = 20$: $e^{-3t/20} = \frac{4}{7}$, so $t = \frac{20}{3}\ln\frac74 \approx 3.73$ minutes.`], h: "Rate in minus rate out; the volume stays 20 L." });
card("1.4.12", r`Initially a tank contains 10 liters of pure water. Brine of unknown (but constant) concentration of salt is flowing in at 1 liter per minute. The water is mixed well and drained at 1 liter per minute. In 20 minutes there are 15 grams of salt in the tank. What is the concentration of salt in the incoming brine?`,
  [N("1.5/(1-e^(-2))", "Concentration (grams per liter)")], {
  sol: [r`Let $c$ be the concentration. $x' = c - \frac{x}{10}$, $x(0) = 0$, so $x = 10c\left(1 - e^{-t/10}\right)$.`, r`$x(20) = 10c(1 - e^{-2}) = 15$ gives $c = \frac{1.5}{1-e^{-2}} \approx 1.735$ g/L.`], h: "Call the concentration $c$ and solve the mixing problem with it." });
card("1.4.101", r`Solve $y'+3 x^2 y = x^2$.`, [G("x^2-3*x^2*y", [[-1.2, 1.2], [-2, 3]], "y=Ce^(-x^3)+1/3", r`General solution: $y =$`)], { src: "b", bk: r`$y = C e^{-x^3} + \frac{1}{3}$`, h: r`Integrating factor $e^{x^3}$.` });
card("1.4.102", r`Solve $y'+ 2\sin(2x) y = 2\sin(2x)$, $y(\frac{\pi}{2}) = 3$.`, [E("2e^(cos(2x)+1)+1", { x: [-2, 2] }, r`$y(x) =$`)], { src: "b", bk: r`$y = 2 e^{\cos(2x)+1} + 1$`, h: r`Integrating factor $e^{-\cos(2x)}$.` });
card("1.4.103", r`Suppose a water tank is being pumped out at 3 L/min. The water tank starts at 10 L of clean water. Water with a toxic substance is flowing into the tank at 2 L/min, with concentration $20t$ g/L at time $t$. When the tank is half empty, how many grams of toxic substance are in the tank (assuming perfect mixing)?`, [N(250, "Amount (grams)")], { src: "b", bk: r`$250$ grams`,
  sol: [r`Volume $V = 10 - t$; half empty at $t = 5$. $x' = 40t - \frac{3x}{10-t}$, $x(0)=0$.`, r`Integrating factor $(10-t)^{-3}$; with $u = 10-t$ this gives $x = 200u - 40u^2 + 2u^3$ (using $x(0)=0$).`, r`At $t = 5$, $u = 5$: $x = 1000 - 1000 + 250 = 250$ grams.`], h: r`The volume is $10 - t$ liters, so the outflow concentration is $x/(10-t)$.` });
card("1.4.104", r`There are bacteria on a plate and a toxic substance is being added that slows down the rate of growth of the bacteria. That is, suppose that $\frac{dP}{dt} = (2-0.1\,t)P$. If $P(0) = 1000$, find the population at $t=5$.`, [NT("1000e^(8.75)", r`$P(5) =$`, 0.005)], { src: "b", bk: r`$P(5) = 1000 e^{2 \times 5 - 0.05 \times 5^2} = 1000 e^{8.75} \approx 6.31 \times 10^6$`, h: r`Separate: $dP/P = (2 - 0.1t)\,dt$.` });
card("1.4.105", r`A cylindrical water tank has water flowing in at $I$ cubic meters per second. Let $A$ be the area of the cross section of the tank in square meters. Suppose water is flowing out from the bottom of the tank at a rate proportional to the height of the water level. Set up the differential equation for $h$, the height of the water, introducing and naming constants that you need. You should also give the units for your constants.`,
  [MC([r`$Ah' = I - kh$`, r`$h' = I - kh$`, r`$Ah' = I + kh$`, r`$h' = AI - kh$`], 0, "Which equation?")], { src: "b", bk: r`$Ah' = I - kh$, where $k$ is a constant with units $\frac{m^2}{s}$.`, h: r`Volume is $Ah$, so $V' = Ah'$.` });

// ---- 1.5 ----
card("1.5.1", r`Solve $y'+ y(x^2-1)+xy^6 = 0$, with $y(1)=1$.`, [], { h: r`Bernoulli: substitute $v = y^{1-n}$ with $n = 6$.`,
  sol: [r`Bernoulli with $n = 6$: $y' + (x^2-1)y = -xy^6$. Let $v = y^{-5}$, so $v' = -5y^{-6}y'$.`, r`Multiply the equation by $-5y^{-6}$: $v' - 5(x^2-1)v = 5x$, with $v(1) = 1$.`, r`Integrating factor $e^{-5x^3/3 + 5x}$ (equal to $e^{10/3}$ at $x=1$): $$e^{5x - 5x^3/3}\,v = e^{10/3} + \int_1^x 5s\,e^{5s - 5s^3/3}\,ds$$`, r`The integral has no closed form, so $y = v^{-1/5}$ with $v$ as above.`] });
card("1.5.2", r`Solve $2yy' + 1 = y^2 + x$, with $y(0)=1$.`, [E("sqrt(e^x-x)", { x: [-1.5, 2] }, r`$y(x) =$`)], { h: r`Try $v = y^2$.`,
  sol: [r`Let $v = y^2$, so $v' = 2yy'$: $v' + 1 = v + x$, i.e. $v' - v = x - 1$.`, r`Integrating factor $e^{-x}$: $\frac{d}{dx}\bigl[e^{-x}v\bigr] = (x-1)e^{-x}$, which integrates to $-xe^{-x}$.`, r`$v = -x + Ce^x$, and $v(0) = 1$ gives $C = 1$. So $y = \sqrt{e^x - x}$.`] });
card("1.5.3", r`Solve $y' + xy = y^4$, with $y(0)=1$.`, [], { h: r`Bernoulli: $v = y^{1-4}$.`,
  sol: [r`Bernoulli with $n = 4$: let $v = y^{-3}$, $v' = -3y^{-4}y'$.`, r`Multiply by $-3y^{-4}$: $v' - 3xv = -3$, $v(0) = 1$.`, r`Integrating factor $e^{-3x^2/2}$: $$v = e^{3x^2/2}\left(1 - 3\int_0^x e^{-3s^2/2}\,ds\right), \qquad y = v^{-1/3}.$$`] });
card("1.5.4", r`Solve $yy' + x = \sqrt{x^2 + y^2}$.`, [G("(sqrt(x^2+y^2)-x)/y", [[-2, 2], [0.3, 3]], "x^2+y^2=(x+C)^2", "General solution:")], { h: r`Try $v = x^2 + y^2$.`,
  sol: [r`Let $v = x^2 + y^2$, so $v' = 2x + 2yy'$ and the left side is $\frac{v'}{2}$.`, r`$\frac{v'}{2} = \sqrt{v}$, so $\frac{dv}{2\sqrt v} = dx$ and $\sqrt v = x + C$.`, r`$\sqrt{x^2+y^2} = x + C$, or $y^2 = 2Cx + C^2$.`] });
card("1.5.5", r`Solve $y' = (x+y-1)^2$.`, [G("(x+y-1)^2", [[-1, 1], [-1, 2]], "y=tan(x+C)+1-x", r`General solution: $y =$`)], { h: r`Try $v = x + y - 1$.`,
  sol: [r`Let $v = x + y - 1$, so $v' = 1 + y' = 1 + v^2$.`, r`$\frac{dv}{1+v^2} = dx$, so $\arctan v = x + C$ and $v = \tan(x + C)$.`, r`$y = \tan(x+C) + 1 - x$.`] });
card("1.5.6", r`Solve $y' = \frac{x^2-y^2}{x y}$, with $y(1) = 2$.`, [E("sqrt((x^4+7)/(2x^2))", { x: [0.3, 3] }, r`$y(x) =$`)], { h: r`Divide top and bottom by $x^2$ and set $v = y/x$.`,
  sol: [r`Homogeneous: $y' = \frac{1 - (y/x)^2}{y/x}$. Let $v = y/x$, $y' = v + xv'$.`, r`$xv' = \frac{1-v^2}{v} - v = \frac{1-2v^2}{v}$, so $\frac{v\,dv}{1-2v^2} = \frac{dx}{x}$ and $-\frac14\ln|1 - 2v^2| = \ln x + C$.`, r`So $2v^2 - 1 = Kx^{-4}$; at $x=1$, $v = 2$: $K = 7$.`, r`$y^2 = \frac{x^2 + 7x^{-2}}{2}$, so $y = \sqrt{\frac{x^4+7}{2x^2}}$.`] });
card("1.5.101", r`Solve $xy'+y+y^2 = 0$, $y(1)=2$.`, [E("2/(3x-2)", { x: [0.8, 3] }, r`$y(x) =$`)], { src: "b", bk: r`$y = \frac{2}{3x-2}$`, h: r`Bernoulli with $n=2$, or notice $xy' + y = (xy)'$.` });
card("1.5.102", r`Solve $xy'+y +x = 0$, $y(1)=1$.`, [E("(3-x^2)/(2x)", { x: [0.3, 3] }, r`$y(x) =$`)], { src: "b", bk: r`$y = \frac{3-x^2}{2 x}$`, h: r`$xy' + y = (xy)'$.` });
card("1.5.103", r`Solve $y^2y' = y^3-3x$, $y(0)=2$.`, [E("(7e^(3x)+3x+1)^(1/3)", { x: [0, 1.5] }, r`$y(x) =$`)], { src: "b", bk: r`$y = \bigl(7 e^{3x} + 3x + 1 \bigr)^{1/3}$`, h: r`Let $v = y^3$.` });
card("1.5.104", r`Solve $2yy' = e^{y^2-x^2} + 2x$.`, [G("(e^(y^2-x^2)+2*x)/(2*y)", [[-1, 1], [0.3, 1.5]], "y=sqrt(x^2-ln(C-x))", "General solution:")], { src: "b", bk: r`$y = \pm\sqrt{x^2-\ln(C-x)}$`, h: r`Let $v = y^2 - x^2$.` });

// ---- 1.6 ----
card("1.6.1", r`Try sketching a few solutions simply from looking at the phase diagram. Check with the preceding graphs if you are getting the same type of curves.`, [], { h: r`Arrows show whether $x$ increases or decreases; curves level off at stable points.`,
  sol: [r`Solutions starting between 0 and $M$ rise in an S-shape towards $M$. Solutions above $M$ decrease towards $M$. Solutions below 0 decrease away from 0. The constants $x = 0$ and $x = M$ are solutions.`],
  ctx: r`The phase diagram in the text is for the logistic equation $x' = kx(M-x)$: critical points $x = 0$ (unstable) and $x = M$ (stable), arrows pointing up between them and down above $M$.` });
card("1.6.2", r`Sketch a phase diagram for different possibilities. Note that these possibilities are $A > B$, or $A=B$, or $A$ and $B$ both complex (i.e. no real solutions). Hint: Fix some simple $k$ and $M$ and then vary $h$.`, [], { h: r`Try $k = 1$, $M = 4$ and $h = 3$, $4$, $5$.`,
  sol: [r`$A > B$ (small $h$): $B$ is unstable and $A$ is stable. Arrows point down below $B$, up between $B$ and $A$, down above $A$.`, r`$A = B$ ($h = kM^2/4$): one semistable critical point; arrows point down on both sides.`, r`Complex (large $h$): no critical points; $x' < 0$ everywhere, so arrows always point down and the population dies out.`],
  ctx: r`The equation is the logistic equation with harvesting, $\frac{dx}{dt} = kx(M-x) - h$, with critical points $A = \frac{kM + \sqrt{(kM)^2 - 4hk}}{2k}$ and $B = \frac{kM - \sqrt{(kM)^2 - 4hk}}{2k}$.` });
card("1.6.3", r`Consider $x' = x^2$. Draw the phase diagram, find the critical points, and mark them stable or unstable.`, [S(["0"], "Critical points"), MC(["Stable", "Unstable (semistable)"], 1, "The critical point is")], { p: "a", h: r`Where is $x^2 = 0$? What sign is $x^2$ on each side?`,
  sol: [r`$x^2 = 0$ only at $x = 0$. $x' > 0$ on both sides, so arrows point up on both sides: below 0 solutions move toward 0, above 0 they move away. It is semistable, which counts as unstable.`] });
card("1.6.3", r`Consider $x' = x^2$. Sketch typical solutions of the equation.`, [], { p: "b", h: "Use the phase diagram from part (a).",
  sol: [r`Above 0: solutions increase and blow up in finite time ($x = \frac{1}{C - t}$). Below 0: solutions increase towards 0. $x = 0$ is a constant solution.`] });
card("1.6.3", r`Consider $x' = x^2$. Find $\displaystyle \lim_{t\to \infty} x(t)$ for the solution with the initial condition $x(0) = -1$.`, [N("0", "Limit")], { p: "c", h: "Start below the critical point and follow the arrow.",
  sol: [r`$x = -\frac{1}{t+1}$, which tends to 0. (Or: below 0 the arrows point up toward 0.)`] });
card("1.6.4", r`Consider $x' = \sin x$. Draw the phase diagram for $-4\pi \leq x \leq 4\pi$. On this interval mark the critical points stable or unstable.`, [S(["-3pi", "-pi", "pi", "3pi"], "Stable critical points (e.g. pi, -3pi)"), S(["-4pi", "-2pi", "0", "2pi", "4pi"], "Unstable critical points")], { p: "a", h: r`Check the sign of $\sin x$ just left and right of each $k\pi$.`,
  sol: [r`Critical points: $x = k\pi$ for $k = -4, \ldots, 4$.`, r`At odd multiples of $\pi$, $\sin x$ goes from positive to negative, so arrows point in: stable ($\pm\pi$, $\pm3\pi$).`, r`At even multiples ($0$, $\pm2\pi$, $\pm4\pi$), $\sin x$ goes from negative to positive: unstable.`] });
card("1.6.4", r`Consider $x' = \sin x$. Sketch typical solutions of the equation.`, [], { p: "b", h: "Use the phase diagram from part (a).",
  sol: [r`Horizontal lines $x = k\pi$ are solutions. Between $2k\pi$ and $(2k+1)\pi$ solutions rise toward $(2k+1)\pi$; between $(2k-1)\pi$ and $2k\pi$ they fall toward $(2k-1)\pi$.`] });
card("1.6.4", r`Consider $x' = \sin x$. Find $\displaystyle \lim_{t\to \infty} x(t)$ for the solution with the initial condition $x(0) = 1$.`, [N("pi", "Limit")], { p: "c", h: r`Which stable point is the arrow at $x = 1$ heading to?`,
  sol: [r`$0 < 1 < \pi$ and $\sin x > 0$ there, so $x$ increases toward the stable point $\pi$.`] });
const SU = ["Stable", "Unstable"];
card("1.6.5", r`Suppose $f(x)$ is positive for $0 < x < 1$, it is zero when $x=0$ and $x=1$, and it is negative for all other $x$. Draw the phase diagram for $x' = f(x)$, find the critical points, and mark them stable or unstable.`, [S(["0", "1"], "Critical points"), MC(SU, 1, r`$x = 0$ is`), MC(SU, 0, r`$x = 1$ is`)], { p: "a", h: r`Draw arrows from the sign of $f$ on each interval.`,
  sol: [r`Critical points 0 and 1. Below 0: $f<0$, arrow down (away from 0). Between: $f>0$, arrow up. Above 1: $f<0$, arrow down.`, "So 0 is unstable and 1 is stable."] });
card("1.6.5", r`(Same $f$.) Sketch typical solutions of the equation.`, [], { p: "b", h: "Use the phase diagram.",
  sol: [r`Solutions between 0 and 1 rise toward 1; above 1 they fall toward 1; below 0 they keep decreasing. $x = 0$ and $x = 1$ are constant solutions.`] });
card("1.6.5", r`(Same $f$.) Find $\displaystyle \lim_{t\to \infty} x(t)$ for the solution with the initial condition $x(0) = 0.5$.`, [N("1", "Limit")], { p: "c", h: "Follow the arrow from 0.5.",
  sol: [r`$0.5$ is between 0 and 1, where $x$ increases toward the stable point 1.`] });
card("1.6.6", r`Start with the logistic equation $\frac{dx}{dt} = kx(M-x)$. Suppose we modify our harvesting. We will only harvest an amount proportional to the current population. In other words, we harvest $hx$ per unit of time for some $h > 0$ (similar to earlier example with $h$ replaced with $hx$). Construct the differential equation.`, [E("k*x*(M-x)-h*x", { x: [0, 3], k: [0.5, 2], M: [1, 4], h: [0.1, 2] }, r`$\frac{dx}{dt} =$`)], { p: "a", h: "Subtract the harvest rate from the logistic rate.",
  sol: [r`$\frac{dx}{dt} = kx(M-x) - hx$.`] });
card("1.6.6", r`(Logistic with harvesting $hx$.) Show that if $kM > h$, then the equation is still logistic.`, [], { p: "b", h: r`Factor out $kx$.`,
  sol: [r`$kx(M-x) - hx = kx\left(M - \frac{h}{k} - x\right) = kx(M_1 - x)$ with $M_1 = M - \frac hk$.`, r`If $kM > h$, then $M_1 > 0$, so it is a logistic equation with the smaller limiting population $M_1$.`] });
card("1.6.6", r`(Logistic with harvesting $hx$.) What happens when $kM < h$?`, [MC([r`The population dies out ($x \to 0$)`, r`It approaches $M$`, "It grows without bound"], 0, "Long-term behavior")], { p: "c", h: r`Look at the sign of $M_1 = M - h/k$.`,
  sol: [r`Then $M_1 = M - \frac hk < 0$. For $x > 0$, $x' = kx(M_1 - x) < 0$, and the only nonnegative critical point is 0, which is stable. The population dies out.`] });
card("1.6.7", r`A disease is spreading through the country. Let $x$ be the number of people infected. Let the constant $S$ be the number of people susceptible to infection. The infection rate $\frac{dx}{dt}$ is proportional to the product of already infected people, $x$, and the number of susceptible but uninfected people, $S-x$. Write down the differential equation.`, [E("k*x*(S-x)", { x: [0, 3], k: [0.5, 2], S: [1, 5] }, r`$\frac{dx}{dt} =$ (use $k$ for the constant)`)], { p: "a", h: r`Proportional to a product: constant times $x(S-x)$.`,
  sol: [r`$\frac{dx}{dt} = kx(S-x)$ for some constant $k > 0$.`] });
card("1.6.7", r`(Disease model $x' = kx(S-x)$.) Supposing $x(0) > 0$, that is, some people are infected at time $t=0$, what is $\displaystyle \lim_{t\to\infty} x(t)$?`, [E("S", { S: [1, 5] }, "Limit")], { p: "b", h: "It's a logistic equation.",
  sol: [r`It is logistic with stable critical point $S$ (and unstable point 0). Any $x(0) > 0$ tends to $S$.`] });
card("1.6.7", r`(Disease model.) Does the solution to part b) agree with your intuition? Why or why not?`, [], { p: "c", h: "What does the model leave out?",
  sol: ["It says everyone susceptible eventually gets infected. That fits a simple model with no recovery, immunity, or deaths. In reality people recover or the disease dies out, so the model is too simple."] });
const SUS = ["Stable", "Unstable (semistable)", "Unstable"];
card("1.6.101", r`Let $x'=(x-1)(x-2)x^2$. Sketch the phase diagram and find critical points, and classify them.`, [S(["0", "1", "2"], "Critical points"), MC(SUS, 1, r`$x = 0$ is`), MC(SUS, 0, r`$x = 1$ is`), MC(SUS, 2, r`$x = 2$ is`)], { src: "b", p: "a,b", h: r`Check the sign of $(x-1)(x-2)x^2$ on each interval.`,
  bk: r`a) 0, 1, 2 are critical points. b) $x=0$ is unstable (semistable), $x=1$ is stable, and $x=2$ is unstable.` });
card("1.6.101", r`Let $x'=(x-1)(x-2)x^2$. If $x(0)=0.5$, then find $\displaystyle \lim_{t\to\infty} x(t)$.`, [N("1", "Limit")], { src: "b", p: "c", h: "Between 0 and 1 the right side is positive.", bk: "1" });
card("1.6.102", r`Let $x'=e^{-x}$. Find and classify all critical points. Find $\displaystyle \lim_{t\to\infty} x(t)$ given any initial condition.`, [MC(["There are no critical points", r`$x = 0$, stable`, r`$x = 0$, unstable`], 0, "Critical points"), MC([r`$\infty$`, "0", "1"], 0, "Limit")], { src: "b", h: r`$e^{-x}$ is never zero.`, bk: r`a) There are no critical points. b) $\infty$` });
card("1.6.103", r`Assume that a population of fish in a lake satisfies $\frac{dx}{dt} = kx(M-x)$. Now suppose that fish are continually added at $A$ fish per unit of time. Find the differential equation for $x$. What is the new limiting population?`, [E("k*x*(M-x)+A", { x: [0, 3], k: [0.5, 2], M: [1, 4], A: [0.1, 2] }, r`$\frac{dx}{dt} =$`), E("(k*M+sqrt((k*M)^2+4*A*k))/(2*k)", { k: [0.5, 2], M: [1, 4], A: [0.1, 2] }, "Limiting population")], { src: "b", h: r`Set $kx(M-x) + A = 0$ and take the positive root.`,
  bk: r`a) $\frac{dx}{dt} = kx(M-x)+A$ b) $\frac{kM + \sqrt{(kM)^2 + 4Ak}}{2k}$` });
card("1.6.104", r`Suppose $\frac{dx}{dt} = (x-\alpha)(x-\beta)$ for two numbers $\alpha < \beta$. Find the critical points, and classify them. Then find $\displaystyle \lim_{t\to\infty} x(t)$ based on the phase diagram for: b) $x(0) < \alpha$, c) $\alpha < x(0) < \beta$, d) $\beta < x(0)$.`,
  [MC([r`$\alpha$ stable, $\beta$ unstable`, r`$\alpha$ unstable, $\beta$ stable`, "both stable"], 0, "(a) Classification"), MC([r`$\alpha$`, r`$\beta$`, r`$\infty$`], 0, r`(b) $x(0) < \alpha$`), MC([r`$\alpha$`, r`$\beta$`, r`$\infty$`], 0, r`(c) $\alpha < x(0) < \beta$`), MC([r`$\alpha$`, r`$\beta$`, r`$\infty$ (or DNE)`], 2, r`(d) $\beta < x(0)$`)],
  { src: "b", h: r`The right side is positive outside $[\alpha,\beta]$ and negative inside.`, bk: r`a) $\alpha$ is a stable critical point, $\beta$ is an unstable one. b) $\alpha$, c) $\alpha$, d) $\infty$ or DNE.` });

// ---- 1.7 ----
card("1.7.1", r`Solve the problem $y' = \frac{y^2}{3}$, $y(0)=1$ exactly and show that $y(2) = 3$.`, [E("3/(3-x)", { x: [-1, 2.5] }, r`$y(x) =$`)], { h: "Separate.",
  sol: [r`$\frac{dy}{y^2} = \frac{dx}{3}$, so $-\frac1y = \frac x3 + C$; $y(0)=1$ gives $C = -1$.`, r`$y = \frac{3}{3-x}$, and $y(2) = \frac{3}{1} = 3$.`] });
card("1.7.2", r`In the table above, suppose you do not know the error. Take the approximate values of the function in the last two lines, assume that the error halves. Can you estimate the error in the last line from this information? Does it (approximately) agree with the table? Now do it for the first two rows. Does this agree with the table? Feel free to assume that the real value of $y(2)$ is bigger than any of the approximate values, but you are not allowed to know the real value.`,
  [NT("0.02437", "Estimated error in the last line", 0.01), NT("0.28268", "Estimated error in row 2 (from rows 1–2)", 0.01)], { h: "If error halves, the last error equals the difference of the last two approximations.",
  sol: [r`If the error halves, $y(2) = a_1 + E = a_2 + \frac E2$, so the last error $\frac E2 = a_2 - a_1$.`, r`Last two lines: $2.97472 - 2.95035 = 0.02437$, close to the table's 0.02528.`, r`First two rows: $2.20861 - 1.92593 = 0.28268$, far from the actual 0.79139. Halving doesn't hold yet for large $h$.`],
  ctx: r`Table (Euler for $y'=y^2/3$, $y(0)=1$): $h=1$: 1.92593; $h=0.5$: 2.20861 (actual error 0.79139); ... $h=0.015625$: 2.95035; $h=0.0078125$: 2.97472 (actual error 0.02528).` });
card("1.7.3", r`Consider $\frac{dx}{dt} = (2t-x)^2$, $x(0)=2$. Use Euler's method with step size $h=0.5$ to approximate $x(1)$.`, [N("8.5", r`$x(1) \approx$`)], { h: r`Two steps of $x_{i+1} = x_i + h\,f(t_i,x_i)$.`,
  sol: [r`Step 1: slope $(0-2)^2 = 4$, $x_1 = 2 + 0.5(4) = 4$ at $t = 0.5$.`, r`Step 2: slope $(1-4)^2 = 9$, $x_2 = 4 + 0.5(9) = 8.5$ at $t = 1$.`] });
card("1.7.4", r`Consider $\frac{dx}{dt} = t-x$, $x(0)=1$. Use Euler's method with step sizes $h = 1, \frac{1}{2}, \frac{1}{4}, \frac{1}{8}$ to approximate $x(1)$.`,
  [NB("0", r`$h=1$`, 0.0005), NB("0.5", r`$h=1/2$`, 0.0005), NB("0.6328125", r`$h=1/4$`, 0.0005), NB("0.6872178", r`$h=1/8$`, 0.0005)], { p: "a", h: r`Repeat $x_{i+1} = x_i + h(t_i - x_i)$.`,
  sol: [r`$h=1$: $x_1 = 1 + (0-1) = 0$.`, r`$h=\frac12$: $0.5$, then $0.5 + 0.5(0.5-0.5) = 0.5$.`, r`$h=\frac14$: $0.75, 0.625, 0.625, 0.6328$. $h = \frac18$ gives about $0.6872$.`] });
card("1.7.4", r`Consider $\frac{dx}{dt} = t-x$, $x(0)=1$. Solve the equation exactly.`, [E("t-1+2e^(-t)", { t: [0, 3] }, r`$x(t) =$`)], { p: "b", h: "It's linear.",
  sol: [r`$x' + x = t$, integrating factor $e^t$: $e^tx = (t-1)e^t + C$.`, r`$x(0) = 1$: $C = 2$, so $x = t - 1 + 2e^{-t}$ and $x(1) = \frac2e \approx 0.7358$.`] });
card("1.7.4", r`Consider $\frac{dx}{dt} = t-x$, $x(0)=1$. Describe what happens to the errors for each $h$ you used. That is, find the factor by which the error changed each time you halved the step size.`, [], { p: "c", h: "Divide each error by the previous one.",
  sol: [r`Exact $x(1) \approx 0.7358$. Errors: $0.7358$, $0.2358$, $0.1029$, $0.0485$.`, r`Factors: about $0.32$, $0.44$, $0.47$, approaching $\frac12$ as expected for a first-order method.`] });
card("1.7.5", r`Approximate the value of $e$ by looking at the initial value problem $y'=y$ with $y(0)=1$ and approximating $y(1)$ using Euler's method with a step size of $0.2$.`, [NB("2.48832", r`$e \approx$`, 0.0005)], { h: r`Each Euler step multiplies $y$ by $(1+h)$.`,
  sol: [r`Each step multiplies by $1 + 0.2 = 1.2$. Five steps: $1.2^5 = 2.48832$.`] });
card("1.7.6", r`Example of numerical instability: Take $y' = -5y$, $y(0) = 1$. We know that the solution should decay to zero as $x$ grows. Using Euler's method, start with $h=1$ and compute $y_1, y_2, y_3, y_4$ to try to approximate $y(4)$. What happened? Now halve the step size. Keep halving the step size and approximating $y(4)$ until the numbers you are getting start to stabilize (that is, until they start going towards zero). Note: You might want to use a calculator.`,
  [N("-4", r`$y_1$`), N("16", r`$y_2$`), N("-64", r`$y_3$`), N("256", r`$y_4$`)], { h: r`Each step multiplies by $(1 - 5h)$.`,
  sol: [r`Each step multiplies by $1 - 5h$. With $h = 1$: $-4, 16, -64, 256$, which oscillate and blow up.`, r`$h = 0.5$: factor $-1.5$, so $y(4) \approx (-1.5)^8 \approx 25.6$, still growing.`, r`$h = 0.25$: factor $-0.25$, $y(4) \approx 0.25^{16} \approx 2.3 \times 10^{-10}$, now heading to 0. From here on it stays stable.`] });
card("1.7.7", r`Consider $\frac{dy}{dx} = yx^2$, $y(0)=1$. Approximate $y(1)$ using Runge–Kutta (see above) with step sizes $h=1$ and $h=\frac{1}{2}$.`,
  [NB("1.390625", r`Runge–Kutta, $h=1$`, 0.0005), NB("1.3953456", r`Runge–Kutta, $h=1/2$`, 0.0005)], { p: "a", h: "Apply the four-slope formula carefully.",
  sol: [r`$h = 1$: $k_1 = 0$, $k_2 = 0.25$, $k_3 = 0.28125$, $k_4 = 1.28125$, so $y_1 = 1 + \frac{0 + 0.5 + 0.5625 + 1.28125}{6} = 1.390625$.`, r`$h = \frac12$ (two steps): $y(1) \approx 1.39535$.`],
  ctx: r`Runge–Kutta: $k_1 = f(x_i,y_i)$, $k_2 = f(x_i + \frac h2, y_i + k_1\frac h2)$, $k_3 = f(x_i + \frac h2, y_i + k_2\frac h2)$, $k_4 = f(x_i+h, y_i + k_3h)$, $y_{i+1} = y_i + \frac{k_1+2k_2+2k_3+k_4}{6}h$.` });
card("1.7.7", r`Consider $\frac{dy}{dx} = yx^2$, $y(0)=1$. Approximate $y(1)$ using Euler's method with $h=1$ and $h=\frac{1}{2}$.`, [NB("1", r`Euler, $h=1$`, 0.0005), NB("1.125", r`Euler, $h=1/2$`, 0.0005)], { p: "b", h: r`Slope at $x = 0$ is 0.`,
  sol: [r`$h=1$: $y_1 = 1 + 1(1\cdot0) = 1$.`, r`$h=\frac12$: $y_1 = 1$, $y_2 = 1 + 0.5(1 \cdot 0.25) = 1.125$.`] });
card("1.7.7", r`Consider $\frac{dy}{dx} = yx^2$, $y(0)=1$. Solve exactly, find the exact value of $y(1)$, and compare with the approximations.`, [E("e^(x^3/3)", { x: [-1.5, 1.5] }, r`$y(x) =$`), N("e^(1/3)", r`$y(1) =$`)], { p: "c", h: "Separate.",
  sol: [r`$\frac{dy}{y} = x^2dx$: $y = e^{x^3/3}$ and $y(1) = e^{1/3} \approx 1.39561$.`, r`Runge–Kutta is off by about 0.005 ($h=1$) and 0.00027 ($h = \frac12$); Euler is off by 0.40 and 0.27.`] });
card("1.7.101", r`Let $x' = \sin(xt)$, and $x(0)=1$. Approximate $x(1)$ using Euler's method with step sizes 1, 0.5, 0.25. Use a calculator and compute up to 4 decimal digits.`, [NB("1.0", r`$h = 1$`, 0.0002), NB("1.2397", r`$h = 0.5$`, 0.0002), NB("1.3829", r`$h = 0.25$`, 0.0002)], { src: "b", h: "Use radians.", bk: "Approximately: 1.0000, 1.2397, 1.3829" });
card("1.7.102", r`Let $x' = 2t$, and $x(0)=0$. Approximate $x(4)$ using Euler's method with step sizes 4, 2, and 1.`, [N("0", r`$h=4$`), N("8", r`$h=2$`), N("12", r`$h=1$`)], { src: "b", p: "a", h: r`The slope only depends on $t$.`, bk: "a) 0, 8, 12" });
card("1.7.102", r`Let $x' = 2t$, and $x(0)=0$. Solve exactly, and compute the errors. Then compute the factor by which the errors changed.`, [N("16", r`Exact $x(4)$`), S(["16", "8", "4"], r`Errors for $h = 4, 2, 1$`), S(["0.5", "0.5"], "Factors")], { src: "b", p: "b,c", h: r`$x = t^2$.`, bk: r`b) $x(4) = 16$, so errors are: 16, 8, 4. c) Factors are 0.5 and 0.5.` });
card("1.7.103", r`Let $x' = x e^{xt+1}$, and $x(0)=0$. Approximate $x(4)$ using Euler's method with step sizes 4, 2, and 1. Guess an exact solution based on part a) and compute the errors.`, [N("0", r`$h=4$`), N("0", r`$h=2$`), N("0", r`$h=1$`), E("0", { t: [0, 4] }, r`Exact solution $x(t) =$`)], { src: "b", h: r`What is the slope when $x = 0$?`, bk: r`a) 0, 0, 0 b) $x=0$ is a solution so errors are: 0, 0, 0.` });
card("1.7.104", r`Consider $\frac{dy}{dx} = x+y$, $y(0)=1$. Approximate $y(1)$ using the improved Euler's method with step sizes $h=\frac{1}{4}$ and $h=\frac{1}{8}$; then using Euler's method with $h=\frac{1}{4}$ and $h=\frac{1}{8}$. Solve exactly, find the exact value of $y(1)$. Compute the errors, and the factors by which the errors changed.`,
  [NB("3.3897", r`Improved Euler, $h=1/4$`, 0.0002), NB("3.4237", r`Improved Euler, $h=1/8$`, 0.0002), NB("2.8828", r`Euler, $h=1/4$`, 0.0002), NB("3.1316", r`Euler, $h=1/8$`, 0.0002), E("2e^x-x-1", { x: [-1, 2] }, r`Exact $y(x) =$`)], { src: "b", h: r`Make a table of $x_i$, $y_i$, $k_1$, $k_2$.`,
  ctx: r`Improved Euler: $k_1 = f(x_i,y_i)$, $k_2 = f(x_i + h, y_i + k_1h)$, $y_{i+1} = y_i + \frac{k_1+k_2}{2}h$.`,
  bk: r`a) Improved Euler: $y(1) \approx 3.3897$ for $h=\frac{1}{4}$, $y(1) \approx 3.4237$ for $h=\frac{1}{8}$. b) Standard Euler: $y(1) \approx 2.8828$ for $h=\frac{1}{4}$, $y(1) \approx 3.1316$ for $h=\frac{1}{8}$. c) $y = 2e^x-x-1$, so $y(1)$ is approximately $3.4366$. d) Approximate errors for improved Euler: $0.046852$ for $h=\frac{1}{4}$ and $0.012881$ for $h=\frac{1}{8}$. For standard Euler: $0.55375$ for $h=\frac{1}{4}$ and $0.30499$ for $h=\frac{1}{8}$. Factor is approximately $0.27$ for improved Euler and $0.55$ for standard Euler.` });

// ---- 1.8 ----
card("1.8.1", r`Why did we not need to add a constant of integration when integrating $A'(y) = 2y$? Add a constant of integration, say $3$, and see what $F$ you get. What is the difference from what we got above, and why does it not matter?`, [], { h: r`What does adding 3 do to the level curves $F = C$?`,
  sol: [r`With the constant: $A(y) = y^2 + 3$ and $F = x^2 + y^2 + 3$.`, r`The solutions are $F = C$, i.e. $x^2 + y^2 = C - 3$. Since $C$ is arbitrary anyway, $C - 3$ is just another arbitrary constant. Any potential works; adding a constant doesn't change the level curves.`],
  ctx: r`In the example, $2x + 2y\frac{dy}{dx} = 0$ led to $F(x,y) = x^2 + A(y)$ with $A'(y) = 2y$, giving $F = x^2 + y^2$.` });
const EXQ = "Solve the following exact equation, implicit general solutions will suffice: ";
const EXL = r`Implicit general solution (an equation with $C$, or just $F(x,y)$):`;
const EXH = r`Find $F$ with $F_x = M$ and $F_y = N$; the answer is $F(x,y) = C$.`;
card("1.8.2", EXQ + r`$(2 xy + x^2) \, dx + (x^2+y^2+1) \, dy = 0$`, [G("-(2*x*y+x^2)/(x^2+y^2+1)", [[-2, 2], [-2, 2]], "x^2 y+x^3/3+y^3/3+y=C", EXL, { pot: 1 })], { p: "a", h: EXH,
  sol: [r`$M_y = 2x = N_x$. $F = \int M\,dx = x^2y + \frac{x^3}{3} + A(y)$.`, r`$F_y = x^2 + A'(y) = x^2 + y^2 + 1$, so $A = \frac{y^3}{3} + y$.`, r`$x^2y + \frac{x^3}{3} + \frac{y^3}{3} + y = C$.`] });
card("1.8.2", EXQ + r`$x^5 + y^5 \frac{dy}{dx} = 0$`, [G("-(x^5)/(y^5)", [[-2, 2], [0.3, 2]], "x^6/6+y^6/6=C", EXL, { pot: 1 })], { p: "b", h: EXH,
  sol: [r`$M = x^5$, $N = y^5$, $M_y = 0 = N_x$.`, r`$\frac{x^6}{6} + \frac{y^6}{6} = C$ (or $x^6 + y^6 = C$).`] });
card("1.8.2", EXQ + r`$e^x+y^3 + 3xy^2 \frac{dy}{dx} = 0$`, [G("-(e^x+y^3)/(3*x*y^2)", [[0.3, 2], [0.3, 2]], "e^x+x y^3=C", EXL, { pot: 1 })], { p: "c", h: EXH,
  sol: [r`$M_y = 3y^2 = N_x$. $F = \int N\,dy = xy^3 + B(x)$.`, r`$F_x = y^3 + B'(x) = e^x + y^3$, so $B = e^x$: $e^x + xy^3 = C$.`] });
card("1.8.2", EXQ + r`$(x+y)\cos(x)+\sin(x) + \sin(x)y' = 0$`, [G("-((x+y)*cos(x)+sin(x))/(sin(x))", [[0.3, 2.8], [-2, 2]], "(x+y)sin(x)=C", EXL, { pot: 1 })], { p: "d", h: EXH,
  sol: [r`$M_y = \cos x = N_x$. $F = \int N\,dy = y\sin x + B(x)$.`, r`$F_x = y\cos x + B'(x)$ must equal $x\cos x + y\cos x + \sin x$, so $B' = x\cos x + \sin x$ and $B = x\sin x$.`, r`$(x+y)\sin x = C$.`] });
const IFQ = "Find the integrating factor for the following equation making it into an exact equation: ";
const IFH = r`Try a simple factor like $x$, $y$, $y^2$, or something that cancels a common factor.`;
card("1.8.3", IFQ + r`$e^{xy} \, dx + \frac{y}{x} e^{xy} \, dy = 0$`, [IF("e^(x*y)", "(y/x)*e^(x*y)", [[0.3, 2], [0.3, 2]], "x e^(-x y)")], { p: "a", h: IFH,
  sol: [r`Multiply by $xe^{-xy}$: $x\,dx + y\,dy = 0$, which is exact. Other factors that work are also accepted.`] });
card("1.8.3", IFQ + r`$\frac{e^x+y^3}{y^2} \, dx + 3x \, dy = 0$`, [IF("(e^x+y^3)/y^2", "3*x", [[0.3, 2], [0.3, 2]], "y^2")], { p: "b", h: IFH,
  sol: [r`Multiply by $y^2$: $(e^x + y^3)\,dx + 3xy^2\,dy = 0$, exact since $M_y = 3y^2 = N_x$.`] });
card("1.8.3", IFQ + r`$4(y^2+x) \, dx + \frac{2x+2y^2}{y} \, dy = 0$`, [IF("4*(y^2+x)", "(2*x+2*y^2)/y", [[0.3, 2], [0.3, 2]], "1/(x+y^2)")], { p: "c", h: IFH,
  sol: [r`Both terms share the factor $x + y^2$. Multiply by $\frac{1}{x+y^2}$: $4\,dx + \frac2y\,dy = 0$, which is exact.`] });
card("1.8.3", IFQ + r`$2\sin(y) \, dx + x\cos(y)\, dy = 0$`, [IF("2*sin(y)", "x*cos(y)", [[0.3, 2], [0.3, 2.5]], "x")], { p: "d", h: IFH,
  sol: [r`Multiply by $x$: $2x\sin y\,dx + x^2\cos y\,dy = 0$, exact since $M_y = 2x\cos y = N_x$.`] });
card("1.8.4", r`Suppose you have an equation of the form: $f(x) + g(y) \frac{dy}{dx} = 0$. Show it is exact. Find the form of the potential function in terms of $f$ and $g$.`, [], { h: r`What are $M_y$ and $N_x$?`,
  sol: [r`$M = f(x)$ and $N = g(y)$, so $M_y = 0 = N_x$: exact.`, r`$F(x,y) = \int f(x)\,dx + \int g(y)\,dy$, i.e. $F = \int_{x_0}^x f(s)\,ds + \int_{y_0}^y g(s)\,ds$.`] });
card("1.8.5", r`Suppose that we have the equation $f(x) \, dx - dy = 0$. Is this equation exact? Find the general solution using a definite integral.`, [MC(YN, 0, "Is it exact?")], { h: r`Compare $M_y$ and $N_x$.`,
  sol: [r`$M = f(x)$, $N = -1$: $M_y = 0 = N_x$, so yes.`, r`$F = \int_{x_0}^x f(s)\,ds - y$, so the general solution is $y = \int_{x_0}^x f(s)\,ds + C$.`] });
card("1.8.6", r`Find the potential function $F(x,y)$ of the exact equation $\frac{1+xy}{x}\, dx + \left(\frac{1}{y} + x \right) \, dy = 0$ in two different ways: (a) Integrate $M$ in terms of $x$ and then differentiate in $y$ and set to $N$. (b) Integrate $N$ in terms of $y$ and then differentiate in $x$ and set to $M$.`,
  [E("ln(x)+x y+ln(y)", { x: [0.3, 3], y: [0.3, 3] }, r`$F(x,y) =$ (any added constant is fine)`, 1)], { h: r`$\frac{1+xy}{x} = \frac1x + y$.`,
  sol: [r`(a) $M = \frac1x + y$, so $F = \ln|x| + xy + A(y)$; $F_y = x + A'(y) = \frac1y + x$ gives $A = \ln|y|$.`, r`(b) $F = \ln|y| + xy + B(x)$; $F_x = y + B'(x) = \frac1x + y$ gives $B = \ln|x|$.`, r`Both give $F = \ln|x| + xy + \ln|y|$.`] });
card("1.8.7", r`A function $u(x,y)$ is said to be a harmonic function if $u_{xx} + u_{yy} = 0$. Show that if $u$ is harmonic, $-u_y \, dx + u_x \, dy = 0$ is an exact equation. So there exists (at least locally) the so-called harmonic conjugate function $v(x,y)$ such that $v_x = -u_y$ and $v_y = u_x$.`, [], { p: "a", h: r`Compute $M_y$ and $N_x$.`,
  sol: [r`$M = -u_y$, $N = u_x$. $M_y = -u_{yy}$ and $N_x = u_{xx}$. These are equal exactly when $u_{xx} + u_{yy} = 0$.`] });
const HCL = r`$v(x,y) =$ (any constant is fine)`;
const HCH = r`Integrate $v_y = u_x$ in $y$, then match $v_x = -u_y$.`;
const XY2 = { x: [-2, 2], y: [-2, 2] };
card("1.8.7", r`Verify that $u = 2xy$ is harmonic and find the corresponding harmonic conjugate $v$ (with $v_x = -u_y$, $v_y = u_x$).`, [E("y^2-x^2", XY2, HCL, 1)], { p: "b", h: HCH,
  sol: [r`$u_{xx} = 0 = u_{yy}$. $v_x = -u_y = -2x$ and $v_y = u_x = 2y$, so $v = y^2 - x^2$ (plus any constant).`] });
card("1.8.7", r`Verify that $u = e^x \cos y$ is harmonic and find the corresponding harmonic conjugate $v$ (with $v_x = -u_y$, $v_y = u_x$).`, [E("e^x sin(y)", XY2, HCL, 1)], { p: "c", h: HCH,
  sol: [r`$u_{xx} = e^x\cos y$, $u_{yy} = -e^x\cos y$, sum 0. $v_x = e^x\sin y$, $v_y = e^x\cos y$, so $v = e^x\sin y$.`] });
card("1.8.7", r`Verify that $u = x^3-3xy^2$ is harmonic and find the corresponding harmonic conjugate $v$ (with $v_x = -u_y$, $v_y = u_x$).`, [E("3x^2 y-y^3", XY2, HCL, 1)], { p: "d", h: HCH,
  sol: [r`$u_{xx} = 6x$, $u_{yy} = -6x$. $v_x = -u_y = 6xy$, $v_y = u_x = 3x^2 - 3y^2$, so $v = 3x^2y - y^3$.`] });
const EXHB = r`Find $F$ with $F_x = M$ and $F_y = N$.`;
card("1.8.101", EXQ + r`$\cos(x)+ye^{xy} + xe^{xy} y' = 0$`, [G("-(cos(x)+y*e^(x*y))/(x*e^(x*y))", [[0.3, 1.5], [0.3, 1.5]], "e^(x y)+sin(x)=C", EXL, { pot: 1 })], { src: "b", p: "a", h: EXHB, bk: r`$e^{xy}+\sin(x)=C$` });
card("1.8.101", EXQ + r`$(2x+y)\, dx + (x-4y) \, dy = 0$`, [G("-(2*x+y)/(x-4*y)", [[1, 2], [-2, 0]], "x^2+x y-2y^2=C", EXL, { pot: 1 })], { src: "b", p: "b", h: EXHB, bk: r`$x^2+xy-2y^2=C$` });
card("1.8.101", EXQ + r`$e^x + e^y \frac{dy}{dx} = 0$`, [G("-(e^x)/(e^y)", [[-2, 2], [-2, 2]], "e^x+e^y=C", EXL, { pot: 1 })], { src: "b", p: "c", h: EXHB, bk: r`$e^x+e^y=C$` });
card("1.8.101", EXQ + r`$(3x^2+3y)\,dx + (3y^2+3x)\, dy = 0$`, [G("-(3*x^2+3*y)/(3*y^2+3*x)", [[0.3, 2], [0.3, 2]], "x^3+3x y+y^3=C", EXL, { pot: 1 })], { src: "b", p: "d", h: EXHB, bk: r`$x^3 + 3xy+ y^3 = C$` });
const IFHB = r`Try a simple factor like $x$, $y$, $y^2$ or $e^x$.`;
card("1.8.102", IFQ + r`$\frac{1}{y}\, dx + 3y \, dy = 0$`, [IF("1/y", "3*y", [[-2, 2], [0.3, 2]], "y")], { src: "b", p: "a", h: IFHB, bk: r`Integrating factor is $y$, equation becomes $dx + 3y^2\,dy = 0$.` });
card("1.8.102", IFQ + r`$dx - e^{-x-y} \, dy = 0$`, [IF("1", "-e^(-x-y)", [[-1, 1], [-1, 1]], "e^x")], { src: "b", p: "b", h: IFHB, bk: r`Integrating factor is $e^x$, equation becomes $e^x \, dx - e^{-y}\,dy = 0$.` });
card("1.8.102", IFQ + r`$\left( \frac{\cos(x)}{y^2} + \frac{1}{y} \right) \, dx + \frac{x}{y^2} \, dy = 0$`, [IF("cos(x)/y^2+1/y", "x/y^2", [[0.3, 2], [0.3, 2]], "y^2")], { src: "b", p: "c", h: IFHB, bk: r`Integrating factor is $y^2$, equation becomes $(\cos(x)+y)\, dx + x\,dy = 0$.` });
card("1.8.102", IFQ + r`$\left( 2y + \frac{y^2}{x} \right) \, dx + ( 2y+x )\, dy = 0$`, [IF("2*y+y^2/x", "2*y+x", [[0.3, 2], [0.3, 2]], "x")], { src: "b", p: "d", h: IFHB, bk: r`Integrating factor is $x$, equation becomes $( 2xy+y^2 )\, dx + (x^2+2xy)\,dy = 0$.` });
card("1.8.103", r`(a) Show that every separable equation $y' = f(x)g(y)$ can be written as an exact equation, and verify that it is indeed exact. (b) Rewrite $y' = xy$ as an exact equation, solve it, and verify that the solution is the same as it was in the example in the text.`, [], { src: "b", h: r`Divide by $g(y)$.`,
  bk: r`a) The equation is $ - f(x) \, dx + \frac{1}{g(y)} \, dy = 0$, and this is exact because $M = -f(x)$, $N = \frac{1}{g(y)}$, so $M_y = 0 = N_x$. b) $-x \, dx + \frac{1}{y} \, dy = 0$, leads to potential function $F(x,y) = -\frac{x^2}{2} + \ln \lvert y \rvert$, solving $F(x,y) = C$ leads to the same solution as the example.` });

// ---- 1.9 ----
const XT = { x: [-3, 3], t: [0, 2] };
const UL = r`$u(x,t) =$`;
const TRH = r`For $\alpha u_x + u_t = 0$ the solution is $u = f(x - \alpha t)$.`;
card("1.9.1", r`Solve $9u_x + u_t = 0$, $u(x,0) = \sin(x)$`, [E("sin(x-9t)", XT, UL)], { p: "a", h: TRH, sol: [r`Transport with $\alpha = 9$: $u = f(x - 9t) = \sin(x - 9t)$.`] });
card("1.9.1", r`Solve $-8u_x + u_t = 0$, $u(x,0) = \sin(x)$`, [E("sin(x+8t)", XT, UL)], { p: "b", h: TRH, sol: [r`$\alpha = -8$: $u = \sin(x + 8t)$.`] });
card("1.9.1", r`Solve $\pi u_x + u_t = 0$, $u(x,0) = \sin(x)$`, [E("sin(x-pi t)", XT, UL)], { p: "c", h: TRH, sol: [r`$\alpha = \pi$: $u = \sin(x - \pi t)$.`] });
card("1.9.1", r`Solve $\pi u_x + u_t + u = 0$, $u(x,0) = \sin(x)$`, [E("e^(-t)sin(x-pi t)", XT, UL)], { p: "d", h: TRH,
  sol: [r`Characteristic coordinates $ξ = x - \pi t$, $s = t$: $\frac{du}{ds} + u = 0$, so $u = \sin(ξ)e^{-s}$.`, r`$u = e^{-t}\sin(x - \pi t)$.`] });
card("1.9.2", r`Solve $3u_x + u_t = 1$, $u(x,0) = x^2$.`, [E("(x-3t)^2+t", XT, UL)], { h: r`Along characteristics $x - 3t = $ constant, $u$ grows at rate 1.`,
  sol: [r`$ξ = x - 3t$, $s = t$: $\frac{du}{ds} = 1$, so $u = ξ^2 + s$.`, r`$u = (x - 3t)^2 + t$.`] });
card("1.9.3", r`Solve $3u_x + u_t = x$, $u(x,0) = e^x$.`, [E("e^(x-3t)+x t-3t^2/2", { x: [-2, 2], t: [0, 2] }, UL)], { h: r`Write $x$ in terms of $ξ$ and $s$ before integrating.`,
  sol: [r`$ξ = x - 3t$, $s = t$, so $x = ξ + 3s$ and $\frac{du}{ds} = ξ + 3s$.`, r`$u = e^ξ + ξ s + \frac{3s^2}{2}$. Back-substitute: $u = e^{x-3t} + (x-3t)t + \frac{3t^2}{2} = e^{x-3t} + xt - \frac{3t^2}{2}$.`] });
card("1.9.4", r`Solve $u_x+u_t+xu = 0$, $u(x,0) = \cos(x)$.`, [E("cos(x-t)e^(t^2/2-x t)", { x: [-2, 2], t: [0, 1.5] }, UL)], { h: r`The coefficient $x$ becomes $ξ + s$.`,
  sol: [r`$ξ = x - t$, $s = t$, $x = ξ + s$: $\frac{du}{ds} + (ξ + s)u = 0$.`, r`$u = \cos(ξ)e^{-ξ s - s^2/2}$. With $ξ = x - t$: $u = \cos(x-t)e^{t^2/2 - xt}$.`] });
card("1.9.5", r`Find the characteristic coordinates for the following equations: 1) $u_x+u_t + u = 1$, $u(x,0) = \cos(x)$, 2) $2u_x+2u_t +2u = 2$, $u(x,0) = \cos(x)$. Solve the two equations using the coordinates. Explain why you got the same solution, although the characteristic coordinates you found were different.`,
  [E("1+(cos(x-t)-1)e^(-t)", XT, r`Solution (both equations): $u(x,t) =$`)], { h: r`Characteristics: $dx/ds = a$, $dt/ds = b$.`,
  sol: [r`Characteristics satisfy $\frac{dx}{ds} = a$, $\frac{dt}{ds} = b$. For 1): $ξ = x - t$, $s = t$. For 2): $ξ = x - t$, $s = \frac t2$.`, r`1): $\frac{du}{ds} + u = 1$, so $u = 1 + (\cosξ - 1)e^{-s} = 1 + (\cos(x-t) - 1)e^{-t}$.`, r`2): $\frac{du}{ds} + 2u = 2$, so $u = 1 + (\cosξ - 1)e^{-2s}$, and $2s = t$ gives the same answer.`, r`Equation 2) is just 2 times equation 1), so it has the same solutions; only the speed of the parametrization $s$ changed.`] });
card("1.9.6", r`Solve $x^2 u_x + (1+x^2) u_t + e^x u = 0$, $u(x,0) = 0$. Hint: Think a little out of the box.`, [E("0", { x: [-2, 2], t: [0, 2] }, UL)], { h: "Is there an obvious solution?",
  sol: [r`$u = 0$ satisfies the equation and the initial condition. Along each characteristic the ODE is linear homogeneous in $u$ with zero starting value, so $u = 0$ everywhere.`] });
card("1.9.101", r`Solve $-5u_x + u_t = 0$, $u(x,0) = \frac{1}{1+x^2}$.`, [E("1/(1+(x+5t)^2)", XT, UL)], { src: "b", p: "a", h: r`$u = f(x - \alpha t)$ with $\alpha = -5$.`, bk: r`$u = \frac{1}{1+(x+5t)^2}$` });
card("1.9.101", r`Solve $2u_x + u_t = 0$, $u(x,0) = \cos(x)$.`, [E("cos(x-2t)", XT, UL)], { src: "b", p: "b", h: r`$u = f(x - \alpha t)$.`, bk: r`$u = \cos(x-2t)$` });
card("1.9.102", r`Solve $u_x+u_t+tu = 0$, $u(x,0) = \cos(x)$.`, [E("cos(x-t)e^(-t^2/2)", XT, UL)], { src: "b", h: r`Along characteristics, $\frac{du}{ds} + su = 0$.`, bk: r`$u = \cos(x-t)e^{-t^2/2}$` });
card("1.9.103", r`Solve $u_x+u_t = 5$, $u(x,0) = x$.`, [E("x+4t", XT, UL)], { src: "b", h: r`Along characteristics $x - t = ξ$, $u$ grows at rate 5.`, bk: r`$u = x + 4t$` });

// DATA-END

export { CARDS };

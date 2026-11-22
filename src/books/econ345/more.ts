import type { Card, Field } from "../../engine";
const r = String.raw;
const EXTRA: Card[] = [];
function push(id: string, ctx: string, q: string, f: Field[] = [], bk?: string, sol?: string[], figs?: { src: string; cap: string }[]): void {
  const c: Card = { id, q, f, h: "", src: bk ? "b" : "n", ctx };
  if (bk) c.bk = bk;
  if (sol) c.sol = sol;
  if (figs) c.figs = figs;
  EXTRA.push(c);
}
push("1.6", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 2.2–2.3. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`2.2.1 Discrete and continuous random variables

Random variables can be separated into two categories, discrete and continuous. A discrete random variable takes on a countable number of values, e.g. {0, 1, 2, ...}. The result of the dice roll is a discrete random variable. A continuous random variable takes on a continuum of possible values (an infinite number of possibilities).

Even when the random variable has lower and upper bounds, there are still infinite possibilities. The temperature tomorrow is a continuous random variable. It may be bound between -50° C and 50° C, but there are still infinite possibilities. What is the probability that it is 20° C? What about 20.1° C? What about 20.0001° C? We could keep adding 0s after the decimal. In fact, the probability of the temperature taking on any one value approaches 0. Instead, we must talk about the probability of a range of numbers. For example, the probability that the temperature is between 19° C and 21° C.

The continuum of possibilities makes it more difficult to discuss continuous random variables than it does discrete random variables. We will use discrete random variables for examples and try to extend the logic to continuous random variables.

2.2.2 Realization of a random variable

Finally, note the difference between a random variable and the realization of a random variable. Before I roll the die, the outcome is random. After I roll the die and get a 4 (for example), the 4 is just a number - a realization of a random variable.

2.2.3 Key points

• A random variable can take on different values (or ranges of values), with different probabilities
• There are discrete and continuous random variables
• Continuous random variables can take on an infinite number of possible values, so we can only assign probabilities to ranges of values
• We can assign probabilities to all possible values for a discrete random variable
• The realization of a random variable is just a number, it used to be random, but now we’ve seen the outcome

2.3 Probability function

A probability function is also called a probability distribution, or a probability distribution function (PDF). Sometimes a distinction is made: probability mass function (PMF) for discrete variables instead of PDF for continuous variables. I will use probability function for both.

A probability function is an equation (it can also be a graph or table), which contains information about a random variable. The nature and properties of the randomness determines what type of equation is appropriate. A different equation would be used for a dice roll than would be used for the wage of a worker. The probability function is very important. The probability function accomplishes two things: (i) it lists all possible numerical values that the random variable can take, and (ii) assigns probability to values. Note that the probabilities of all outcomes must sum to 1 (something must happen). The probability function contains all possible knowledge that we can have about the random variable (before we observe its realization).

Example 2.1 — Probability function for a die roll. Let $Y$ = the result of a die roll. The probability function for $Y$ is:

$$Pr(Y = 1) = \frac{1}{6},\ Pr(Y = 2) = \frac{1}{6},\ \ldots,\ Pr(Y = 6) = \frac{1}{6} \qquad (2.1)$$

Note how the function lists all possible numerical outcomes and assigns a probability to each. A more compact way of expressing (2.1) is:

$$Pr(Y = y) = \frac{1}{6};\ y = 1, \ldots, 6 \qquad (2.2)$$

The probability function in (2.2) may also be expressed in a graph (see Figure 2.1).`, [], undefined, undefined, [{ src: "econ345/p-019.png", cap: "Figure 2.1: Probability function for the result of a die roll." }]);
push("1.7", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 2.5.3. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`2.5.3 The central limit theorem

So why do we care so much about the normal distribution? There are hundreds of probability functions, that are appropriate in various situations. The heights of waves might be described by the Nakagami distribution. The probability of successfully drawing a certain number of red balls out of a hat of red and blue balls is described by the binomial distribution. The number of customers that visit a store in an hour might be described by the Poisson distribution. The result of a die roll is uniformly distributed. So why should we pay so much attention to the normal distribution?

The answer is the central limit theorem (CLT). Loosely speaking, the CLT says that if we add up enough random variables, the resulting sum tends to be normal. It doesn’t matter if some are Poisson and some are uniform. It only matters that we add up enough. If the random outcomes that we seek to model using probability theory are the results of many random factors all added together, then the central limit theorem applies. This turns out to be plausible for the types of economic models we are going to consider. This has been a very casual explanation of the CLT; you should be aware that there are several conditions required for it to hold, and several versions.`, [], undefined, undefined, [{ src: "econ345/p-025.png", cap: "Figure 2.4: Probability function for the sums of dice, with Normal density functions superimposed. As the number of random variables that we sum increases, the distribution of the sum becomes Normal. This is due to the central limit theorem (CLT)." }]);
push("5.1", r`Source: Alessio Gaggero, Econometrics I, section 3.3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`3.3 Matrix notation

For a sample of $n$ observations it is far cleaner to stack the model into matrix form. Define $$ \mathbf{y} = \begin{pmatrix} y_1 \\ y_2 \\ \vdots \\ y_n \end{pmatrix}_{n\times 1}, \quad \mathbf{X} = \begin{pmatrix} 1 & x_{11} & x_{12} & \cdots & x_{1k} \\ 1 & x_{21} & x_{22} & \cdots & x_{2k} \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ 1 & x_{n1} & x_{n2} & \cdots & x_{nk} \end{pmatrix}_{n\times (k+1)}, \quad \beta = \begin{pmatrix} \beta_0 \\ \beta_1 \\ \vdots \\ \beta_k \end{pmatrix}_{(k+1)\times 1}, \quad \mathbf{u} = \begin{pmatrix} u_1 \\ u_2 \\ \vdots \\ u_n \end{pmatrix}_{n\times 1}. $$

The MLR model for the entire sample is then $$ \mathbf{y} \;=\; \mathbf{X}\beta + \mathbf{u}. $$

The first column of $\mathbf{X}$ is a column of ones, which absorbs the intercept $\beta_0$. From now on we will write proofs in matrix form; this is the standard notation in (Wooldridge 2020) and pays dividends from Chapter 4 onwards.`);
push("5.2", r`Source: Alessio Gaggero, Econometrics I, section 3.4. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`3.4 OLS in matrix form

The ordinary least squares (OLS) estimator chooses $\hat{\beta}$ to minimise the sum of squared residuals $$ \mathrm{SSR}(\beta) \;=\; (\mathbf{y}-\mathbf{X}\beta)'(\mathbf{y}-\mathbf{X}\beta) \;=\; \mathbf{y}'\mathbf{y} - 2\beta'\mathbf{X}'\mathbf{y} + \beta'\mathbf{X}'\mathbf{X}\beta. $$

Differentiating with respect to $\beta$ and setting the result to zero gives the normal equations $$ \mathbf{X}'\mathbf{X}\,\hat{\beta} \;=\; \mathbf{X}'\mathbf{y}. $$

If $\mathbf{X}'\mathbf{X}$ is invertible — which is exactly Assumption MLR.3 below — the unique solution is

$$ \boxed{\;\hat{\beta} \;=\; (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\mathbf{y}.\;} $$

The fitted values are $\hat{\mathbf{y}} = \mathbf{X}\hat{\beta}$ and the residuals are $\hat{\mathbf{u}} = \mathbf{y} - \hat{\mathbf{y}}$. By construction the normal equations imply $\mathbf{X}'\hat{\mathbf{u}} = \mathbf{0}$: residuals are orthogonal to every regressor, including the constant. In particular the sample mean of $\hat{\mathbf{u}}$ is zero whenever the model contains an intercept.

 Warning Common mistake: confusing $u$ with $\hat u$

As in Chapter 1, $u$ is a population, unobservable object. The residual $\hat u_i = y_i - \hat y_i$ is the sample counterpart, produced after estimation. We will use $\hat{\mathbf{u}}$ to compute variance estimates and $R^2$, but we will never observe $\mathbf{u}$ itself.`);
push("5.3", r`Source: Alessio Gaggero, Econometrics I, section 3.5. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`3.5 Gauss–Markov assumptions for MLR

We now collect the assumptions under which OLS has its classical properties. They generalise the simple-regression assumptions of Chapter 2.

 Note MLR.1 — Linearity in parameters

The population model is $$ y = \beta_0 + \beta_1 x_1 + \cdots + \beta_k x_k + u. $$ Linearity is required in the parameters $\beta_j$, not in the regressors: $x_j^2$ or $\ln(x_j)$ are perfectly fine.

 Note MLR.2 — Random sampling

We observe an i.i.d. random sample $\{(y_i, x_{i1}, \ldots, x_{ik}) : i = 1, \ldots, n\}$ drawn from the population described by MLR.1.

 Note MLR.3 — No perfect collinearity

In the sample (and in the population), no regressor is constant, and there is no exact linear relationship among the regressors. Equivalently, $\mathbf{X}'\mathbf{X}$ is invertible.

 Note MLR.4 — Zero conditional mean

The error has mean zero given any value of the regressors: $$ \mathbb{E}[u \mid x_1, \ldots, x_k] = 0, \qquad \text{or, in matrix form,}\qquad \mathbb{E}[\mathbf{u}\mid\mathbf{X}] = \mathbf{0}. $$ This is the assumption that delivers unbiasedness of OLS. It fails whenever a relevant variable is omitted (§3.9), the wrong functional form is used, or there is measurement error or simultaneity.

 Note MLR.5 — Homoskedasticity

The conditional variance of $u$ does not depend on $\mathbf{X}$: $$ \operatorname{Var}(u\mid x_1,\ldots,x_k) = \sigma^2, \qquad \operatorname{Var}(\mathbf{u}\mid\mathbf{X}) = \sigma^2\mathbf{I}_n. $$

Assumptions MLR.1–MLR.4 deliver unbiasedness (next section); add MLR.5 and OLS becomes the best linear unbiased estimator (BLUE) — the Gauss–Markov theorem.

 Warning Common mistake: confusing “perfect” with “high” collinearity

MLR.3 only rules out exact linear dependence among the regressors. Two highly correlated — but not perfectly correlated — variables (say \`educ\` and \`IQ\`) still satisfy MLR.3. They will inflate the variance of OLS estimates (the $R_j^2$ in the variance formula will be close to 1), but they do not bias them and they do not break the model.`);
push("5.4", r`Source: Alessio Gaggero, Econometrics I, section 3.6. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`3.6 Unbiasedness of OLS (matrix form)

 Note Theorem: unbiasedness of OLS

Under MLR.1–MLR.4, $$ \mathbb{E}[\hat{\beta}\mid\mathbf{X}] = \beta. $$

Proof sketch. Starting from the OLS solution, $$ \hat{\beta} = (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\mathbf{y} = (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'(\mathbf{X}\beta + \mathbf{u}) = \beta + (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\mathbf{u}. $$ Taking conditional expectations and using MLR.4 ($\mathbb{E}[\mathbf{u}\mid\mathbf{X}] = \mathbf{0}$), $$ \mathbb{E}[\hat{\beta}\mid\mathbf{X}] = \beta + (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}' \mathbb{E}[\mathbf{u}\mid\mathbf{X}] = \beta. $$ By the law of iterated expectations, $\mathbb{E}[\hat{\beta}] = \beta$ unconditionally as well. $\quad\square$

The proof makes the role of MLR.4 transparent: any correlation between $\mathbf{X}$ and $\mathbf{u}$ enters the bias term $(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}' \mathbb{E}[\mathbf{u}\mid\mathbf{X}]$. This is the matrix-form home of the omitted-variable bias formula we derive in §3.9.`);
push("5.5", r`Source: Alessio Gaggero, Econometrics I, section 3.7. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`3.7 Variance of OLS estimators (matrix form)

 Note Theorem: variance of OLS

Under MLR.1–MLR.5, $$ \operatorname{Var}(\hat{\beta}\mid\mathbf{X}) = \sigma^2 (\mathbf{X}'\mathbf{X})^{-1}. $$

Proof sketch. From the proof of unbiasedness, $\hat{\beta} - \beta = (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\mathbf{u}$. Hence $$ \operatorname{Var}(\hat{\beta}\mid\mathbf{X}) = (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\, \operatorname{Var}(\mathbf{u}\mid\mathbf{X})\, \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1} = (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\,(\sigma^2\mathbf{I}_n)\,\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1} = \sigma^2 (\mathbf{X}'\mathbf{X})^{-1}. $$ The diagonal entries give the variances of the individual coefficients; the off-diagonal entries give their covariances. $\quad\square$

The variance of an individual slope $\hat\beta_j$ admits a useful univariate decomposition, $$ \operatorname{Var}(\hat\beta_j\mid\mathbf{X}) \;=\; \frac{\sigma^2}{\mathrm{SST}_j\,(1 - R_j^2)}, $$ where $\mathrm{SST}_j = \sum_{i=1}^n (x_{ij} - \bar x_j)^2$ and $R_j^2$ is the $R^2$ from the auxiliary regression of $x_j$ on all the other regressors. Three intuitions follow:

- More error variance ($\sigma^2$ large) $\Rightarrow$ less precise estimates.
- More sample variation in $x_j$ ($\mathrm{SST}_j$ large) $\Rightarrow$ more precise estimates.
- More collinearity between $x_j$ and the other regressors ($R_j^2$ close to 1) $\Rightarrow$ less precise estimates. The factor $1/(1-R_j^2)$ is the variance inflation factor (VIF).

Since $\sigma^2$ is unknown, we estimate it with the residual variance, $$ \hat\sigma^2 \;=\; \frac{\mathrm{SSR}}{n - k - 1} \;=\; \frac{\hat{\mathbf{u}}'\hat{\mathbf{u}}}{n - k - 1}, $$ which is unbiased under MLR.1–MLR.5. The denominator $n - k - 1$ is the degrees of freedom: sample size minus number of estimated coefficients (including the intercept).`);
push("5.6", r`Source: Alessio Gaggero, Econometrics I, section 3.8. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`3.8 $R^2$ and adjusted $R^2$

As in simple regression, total variation in $y$ decomposes into explained and residual variation, $$ \mathrm{SST} \;=\; \mathrm{SSE} + \mathrm{SSR}, \qquad R^2 \;=\; 1 - \frac{\mathrm{SSR}}{\mathrm{SST}} \;\in\; [0,1]. $$

There is, however, a subtlety unique to MLR: $R^2$ never decreases when a regressor is added to the model, even if that regressor is purely noise. Each new variable provides at least as much fit as no variable at all, because OLS could always set the new coefficient to zero. As a result, $R^2$ alone cannot adjudicate between nested specifications.

The adjusted $R^2$ penalises model complexity: $$ \bar R^2 \;=\; 1 - \frac{\mathrm{SSR}/(n-k-1)}{\mathrm{SST}/(n-1)} \;=\; 1 - \frac{n-1}{n-k-1}\,(1-R^2). $$ Unlike $R^2$, $\bar R^2$ can fall when an irrelevant variable is added — the cost of the extra parameter exceeds the gain in fit. It is therefore a more honest summary when comparing models that differ in the number of regressors.

 Warning Common mistake: chasing $R^2$

A high $R^2$ does not mean the model is causal, nor that it predicts well out of sample. A regression of \`educ\` on \`educ_squared\` and \`educ_cubed\` will have an $R^2$ of essentially 1 and no economic content. Treat $R^2$ as a goodness-of-fit summary, not as a model-selection criterion. The AIC and BIC, introduced in Chapter 5, are better suited for the latter task.`);
push("5.7", r`Source: Alessio Gaggero, Econometrics I, section 3.9. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`3.9 Omitted variable bias

Omitted variable bias (OVB) is the formal name for the problem motivated in §3.1. Suppose the true population model is $$ y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + u, \qquad \mathbb{E}[u\mid x_1, x_2] = 0, $$ but we estimate the short model $$ y = \tilde\beta_0 + \tilde\beta_1 x_1 + \tilde u $$ by OLS, omitting $x_2$. What does $\tilde\beta_1$ estimate?

 Note Theorem: omitted variable bias

Under the true model above and an OLS regression of $y$ on $x_1$ alone, $$ \mathbb{E}[\tilde\beta_1\mid\mathbf{x}_1] \;=\; \beta_1 + \beta_2\,\tilde\delta_1, $$ where $\tilde\delta_1$ is the slope coefficient from the auxiliary regression of the omitted variable $x_2$ on the included variable $x_1$: $$ x_2 = \tilde\delta_0 + \tilde\delta_1 x_1 + v. $$

Proof sketch. From the simple-regression formula, $$ \tilde\beta_1 = \frac{\sum_{i}(x_{1i}-\bar x_1)\,y_i}{\sum_i (x_{1i}-\bar x_1)^2}. $$ Plugging in the true model $y_i = \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + u_i$ and using $\sum_i (x_{1i}-\bar x_1) = 0$, $$ \tilde\beta_1 \;=\; \beta_1 + \beta_2\,\underbrace{\frac{\sum_i (x_{1i}-\bar x_1)x_{2i}}{\sum_i (x_{1i}-\bar x_1)^2}}_{=\,\tilde\delta_1} + \frac{\sum_i (x_{1i}-\bar x_1)u_i}{\sum_i (x_{1i}-\bar x_1)^2}. $$ The last term has conditional expectation zero by MLR.4 of the true model, leaving $\mathbb{E}[\tilde\beta_1\mid\mathbf{x}_1] = \beta_1 + \beta_2\tilde\delta_1$. $\quad\square$

The bias is the product $\beta_2\tilde\delta_1$. It is zero in either of two cases:

- $\beta_2 = 0$ — the omitted variable does not affect $y$ in the true model; or
- $\tilde\delta_1 = 0$ — the omitted variable is uncorrelated with the included regressor.

In every other case, dropping a relevant correlated variable contaminates $\tilde\beta_1$.

3.9.1 Sign of the bias: the 2 $\times$ 2 table

The sign of the bias is determined by the signs of $\beta_2$ and $\tilde\delta_1$:

$\tilde\delta_1 > 0$ · $\tilde\delta_1 < 0$
$\beta_2 > 0$ · Positive bias · Negative bias
$\beta_2 < 0$ · Negative bias · Positive bias

 Note Example: omitting ability from a wage equation

Suppose the true wage equation is $\text{wage} = \beta_0 + \beta_1\,\text{educ} + \beta_2\,\text{ability} + u$.

- More able workers earn more, holding education fixed: $\beta_2 > 0$.
- More able workers acquire more education: $\tilde\delta_1 > 0$.
- The bias $\beta_2\tilde\delta_1 > 0$: a simple regression of wage on education overestimates the causal return to schooling.

This is the canonical “ability bias” of the labour-economics literature. A naive OLS slope of, say, 0.60 dollars per year of schooling can perfectly well coexist with a true return of 0.40 once unobserved ability is netted out.

 Warning Including an irrelevant variable is not free

Adding a variable whose true coefficient is zero does not create bias (the OVB formula gives bias $= 0 \cdot \tilde\delta_1 = 0$). But it inflates the variance of every other slope through the $R_j^2$ term in §3.7. The empirical rule of thumb is: include controls justified by theory or by your identification strategy, not regressors that happen to “look significant”.`);
push("5.19", r`Source: Alessio Gaggero, Econometrics I, section 4.1. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`4.1 From estimation to inference

E very point estimate in Chapters 2 and 3 was computed from a single sample, and is therefore random: draw another sample from the same population and the arithmetic returns a different number. This is the heart of the matter. The population coefficient $\beta_j$ is a fixed, unknown feature of the world; the estimator $\hat{\beta}_j$ is a random quantity that varies from sample to sample. Inference is the study of that sample-to-sample variation.

Imagine — as a thought experiment — drawing many independent samples and estimating the same regression in each. The estimates do not all coincide; they scatter. Collected together they form the sampling distribution of $\hat{\beta}_j$: under MLR.1–MLR.4 it is centred on the true $\beta_j$ (OLS is unbiased), and its spread measures how much $\hat{\beta}_j$ typically moves when the sample changes. That spread has a name.

 Note Definition: the standard error

The standard error $\operatorname{se}(\hat{\beta}_j)$ is the estimated standard deviation of the sampling distribution of $\hat{\beta}_j$ — a measure of how much the estimate would vary from one random sample to the next. A wider sampling distribution means a larger standard error and a less precise estimate.

The figure below makes the thought experiment concrete. Each of two thousand simulated samples produces its own slope estimate; the estimates pile up into a bell-shaped distribution centred on the true slope.

Code

set.seed(4)
beta1_true <- -0.139
n   <- 200
reps <- 2000
bhat <- numeric(reps)
for (r in 1:reps) {
  x <- rnorm(n, mean = 12, sd = 3)      # e.g. years of schooling
  u <- rnorm(n, mean = 0,  sd = 2)      # unobserved factors
  y <- 4.51 + beta1_true * x + u
  bhat[r] <- coef(lm(y ~ x))[2]
}
hist(bhat, breaks = 40, freq = FALSE,
     col = "lightblue", border = "white",
     main = "Sampling distribution of the OLS slope",
     xlab = expression(hat(beta)[1]))
curve(dnorm(x, mean = mean(bhat), sd = sd(bhat)),
      add = TRUE, col = "navy", lwd = 2)
abline(v = beta1_true, col = "firebrick", lwd = 2)

Copy to Clipboard

Two thousand OLS slope estimates, each from an independently simulated sample (illustrative, n = 200) of a fertility-style regression with true slope -0.139 (red line). The estimates pile up into a bell-shaped sampling distribution; its spread is what the standard error measures.

Knowing the centre and spread of the sampling distribution is not yet enough: to compute probabilities — “how likely is an estimate this far from zero if the truth were zero?” — we need its shape. Once we have it, statistical inference offers two complementary tools (Wooldridge 2020), both built from the same two ingredients, $\hat{\beta}_j$ and $\operatorname{se}(\hat{\beta}_j)$:

1. Confidence intervals. A range of plausible values for the unknown $\beta_j$, with a calibrated long-run coverage probability.
2. Hypothesis tests ($t$-tests and $F$-tests). A formal procedure for deciding whether a specific claim about $\beta_j$ is compatible with the data.

The next assumption supplies the missing shape.`);
push("5.20", r`Source: Alessio Gaggero, Econometrics I, section 4.2. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`4.2 The Classical Linear Model (CLM) assumptions

Gauss–Markov gave us unbiasedness, a closed-form variance and the BLUE property of OLS. For exact (finite-sample) inference we need one more assumption.

 Note Definition: MLR.6 (Normality of the error term)

The population error $u$ is independent of the regressors $\mathbf{X}$ and normally distributed with mean zero and constant variance:

$$ u \mid \mathbf{X} \;\sim\; \mathcal{N}(0,\,\sigma^2). $$

The full set MLR.1–MLR.6 is called the Classical Linear Model (CLM) assumptions.

Why normality, and where does it come from? In many applied settings $u$ is a sum of a large number of small, independent omitted factors, and a central-limit heuristic suggests its distribution should be roughly bell-shaped. The assumption is strong: it can fail badly for skewed outcomes such as wages or counts. We will see in Chapter 6 that taking $\log$ of the dependent variable often does a lot to make the residuals look symmetric.

The pay-off is large. Under MLR.1–MLR.6 the OLS estimator inherits the normality of $u$:

$$ \hat{\beta}_j \mid \mathbf{X} \;\sim\; \mathcal{N}\!\left(\beta_j,\,\operatorname{Var}(\hat{\beta}_j)\right). $$

This is an exact statement that holds in any sample size, not just asymptotically. With $n$ large, the central limit theorem delivers approximately the same conclusion even without MLR.6, but only the CLM gives us exact small-sample inference.

 Warning Common mistake: confusing the normality of $u$ with the normality of $y$

MLR.6 is a statement about the error $u$, conditional on the regressors. It is not the claim that the marginal distribution of $y$ is normal. Wages, for example, are right-skewed; that does not by itself contradict MLR.6, because the systematic component $\beta_0 + \beta_1 x_1 + \cdots$ can absorb the skewness.`);
push("5.21", r`Source: Alessio Gaggero, Econometrics I, section 4.3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`4.3 The $t$-distribution

If $\sigma^2$ were known we could standardise $\hat{\beta}_j$ directly:

$$ Z \;=\; \frac{\hat{\beta}_j - \beta_j}{\sqrt{\operatorname{Var}(\hat{\beta}_j)}} \;\sim\; \mathcal{N}(0,1). $$

In practice $\sigma^2$ is unknown and is replaced by the OLS estimator $\hat{\sigma}^2 = \mathrm{SSR}/(n-k-1)$. Plugging $\hat{\sigma}^2$ into the standard error introduces an extra source of variability, and the standardised statistic is no longer standard normal: it is $t$-distributed with $n-k-1$ degrees of freedom,

$$ t \;=\; \frac{\hat{\beta}_j - \beta_j}{\operatorname{se}(\hat{\beta}_j)} \;\sim\; t_{\,n-k-1}. $$

Here $k$ is the number of regressors excluding the intercept, so $k+1$ coefficients are estimated and $n-k-1$ observations’ worth of information is left over. The $t$-distribution is symmetric, bell-shaped and centred at zero, but it has heavier tails than $\mathcal{N}(0,1)$ — a reflection of the extra uncertainty from estimating $\sigma^2$. As the degrees of freedom grow, the tails thin out and $t_{n-k-1}$ converges to $\mathcal{N}(0,1)$: for $n-k-1 \geq 120$ the two are virtually indistinguishable, while for small samples the $t$ is noticeably wider.

Code

x <- seq(-4, 4, length.out = 400)
plot(x, dnorm(x), type = "l", lwd = 2, col = "navy",
     xlab = "t", ylab = "Density",
     main = "Standard normal vs. Student t")
lines(x, dt(x, df = 3), lwd = 2, lty = 2, col = "firebrick")
legend("topright", bty = "n", lwd = 2, lty = c(1, 2),
       col = c("navy", "firebrick"),
       legend = c("N(0, 1)", expression(t[3])))

Copy to Clipboard

Standard normal against Student t with 3 degrees of freedom. The two share the same bell shape, but the t puts more probability in the tails; as the degrees of freedom grow the curves become indistinguishable.

It is because of these heavier tails that a 95% interval uses a $t$ critical value — $2.014$ for $df = 45$, say — rather than the familiar $1.96$ from the normal table, with the gap shrinking as the sample grows.`);
push("5.22", r`Source: Alessio Gaggero, Econometrics I, section 4.4. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`4.4 Confidence intervals

A point estimate reports a single number but hides its uncertainty. A confidence interval repairs this by reporting a range of plausible values for $\beta_j$. The idea is the same one that underlies every interval estimate:

$$ \text{estimate} \;\pm\; \text{margin of error}. $$

The estimate sits at the centre; the margin of error is built from the standard error, so a wider sampling distribution gives a wider interval. Making this precise gives the formula below.

 Note Definition: confidence interval for $\beta_j$

A $(1-\alpha)\times 100\%$ confidence interval for $\beta_j$ is

$$ \hat{\beta}_j \;\pm\; t_c\,\cdot\,\operatorname{se}(\hat{\beta}_j), \qquad t_c = t_{\alpha/2,\,n-k-1}, $$

where $\alpha$ is the significance level and $t_c$ is the critical value of the $t$-distribution that leaves probability $\alpha/2$ in each tail.

For the canonical 95% interval, $\alpha = 0.05$ and the critical value is $t_{0.025,\,n-k-1}$. With moderately large samples this is close to $1.96$, but in small samples it can be appreciably larger. Finding $t_c$ is a short, mechanical procedure.

 Note How to find the critical value $t_c$

The critical value depends on three things: the significance level $\alpha$, the number of tails, and the degrees of freedom.

1. Choose the significance level$\alpha = 1 - \text{confidence level}$. For a 95% interval, $\alpha = 1 - 0.95 = 0.05$.
2. Decide one- or two-sided. A two-sided interval or test splits $\alpha$ between the two tails, so use $\alpha/2$; a one-sided test uses $\alpha$. For a 5% two-sided interval, $\alpha/2 = 0.025$.
3. Compute the degrees of freedom$df = n-k-1$.
4. Read the $t$-table. Find the row for $df$ and the column for the tail probability ($\alpha$ one-sided, $\alpha/2$ two-sided). The table of $t$ critical values is in Appendix C.

 Warning Common mistake: misreading the “95%”

A 95% confidence interval is a statement about the procedure, not about the one realised interval. If we drew many independent samples and built one interval from each, about 95% of those intervals would contain the true $\beta_j$. It is not correct to say that there is a 95% probability that the particular interval $[L, U]$ we computed from our one sample contains $\beta_j$: once computed, $\beta_j$ is a fixed (if unknown) number, and this interval either covers it or it does not. The 95% is a property of the method, not of any single interval.

 Note Example: a 95% interval for the fertility slope

A simple model relates completed fertility to schooling, $\text{children} = \beta_0 + \beta_1\,\text{educ} + u$. One sample gives (standard errors underneath):

$$ \widehat{\text{children}} \;=\; \underset{(0.23)}{4.51} \;-\; \underset{(0.018)}{0.139}\,\text{educ}, \qquad n = 1129. $$

For a two-sided 95% interval, $\alpha/2 = 0.025$ and $df = n-k-1 = 1129-1-1 = 1127$, so $t_c \approx 1.96$. The interval for $\beta_1$ is

$$ -0.139 \;\pm\; 1.96 \times 0.018 \;=\; -0.139 \pm 0.0353 \;=\; [\,-0.174,\ -0.104\,]. $$

With 95% confidence, this procedure brackets $\beta_1$ in a range of entirely negative values. The interval excludes $0$, a fact we return to below.`);
push("5.23", r`Source: Alessio Gaggero, Econometrics I, section 4.5. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`4.5 Hypothesis testing in four steps

A confidence interval summarises all the values of $\beta_j$ the data find plausible. Often, though, we want to evaluate one specific claim — most commonly, that a coefficient equals zero (the variable “does not matter”), or more generally that $\beta_j = c$ for some value $c$ fixed by theory. A hypothesis test asks a single pointed question:

> If this claim were true, would our sample estimate be surprising?

To answer it we compare $\hat{\beta}_j$ with the claimed value $c$, measured in standard-error units. That distance is the $t$-statistic,

$$ t \;=\; \frac{\hat{\beta}_j - c}{\operatorname{se}(\hat{\beta}_j)}. $$

A large $|t|$ means that an estimate as far from $c$ as the one we obtained would be unusual if $\beta_j = c$ were really true — evidence against the claim. We make this operational in four steps.

Step 1. State $H_0$ and $H_1$. The null hypothesis fixes a value, always as an equality, and the test is conducted assuming $H_0$ is true:

$$ H_0:\ \beta_j = c. $$

The alternative hypothesis is the complementary inequality, in one of three forms:

- Two-sided:$H_1: \beta_j \neq c$.
- Right one-sided:$H_1: \beta_j > c$.
- Left one-sided:$H_1: \beta_j < c$.

The choice between one- and two-sided is driven by economic theory, not by the data: if theory tells us a priori that $\beta_j$ cannot be positive, a left-sided test is appropriate. The conclusion is only ever reject $H_0$ or fail to reject $H_0$ — we never “accept” $H_1$.

Step 2. Find the critical value. Pick $\alpha$ (default $0.05$) and read $t_c$ from the $t$-table with $n-k-1$ degrees of freedom, using the tail probability for the case at hand: $\alpha/2$ for a two-sided test, $\alpha$ for a one-sided test (see Appendix C).

Step 3. Compute the $t$-statistic.

$$ t \;=\; \frac{\hat{\beta}_j - c}{\operatorname{se}(\hat{\beta}_j)}. $$

For the default $c = 0$ this reduces to $t = \hat{\beta}_j / \operatorname{se}(\hat{\beta}_j)$, which is exactly the number R reports in the third column of \`summary(lm(...))\`.

Step 4. Compare and conclude. Apply the rejection rule for the chosen $H_1$:

case · $H_1$ · reject $H_0$ if
Right-tailed · $\beta_j > c$ · $t > t_c$, with $t_c = t_{\alpha,\,n-k-1}$
Left-tailed · $\beta_j < c$ · $t < -t_c$, with $t_c = t_{\alpha,\,n-k-1}$
Two-tailed · $\beta_j \neq c$ · $\lvert t\rvert > t_c$, with $t_c = t_{\alpha/2,\,n-k-1}$

Code

x <- seq(-4, 4, length.out = 400)
plot(x, dnorm(x), type = "l", lwd = 2, col = "navy",
     xlab = "t statistic", ylab = "Density",
     main = "Two-sided 5% rejection region")
tc <- 1.96
xl <- seq(-4, -tc, length.out = 120)
polygon(c(xl, rev(xl)), c(dnorm(xl), rep(0, length(xl))),
        col = rgb(0.70, 0.10, 0.10, 0.45), border = NA)
xr <- seq(tc, 4, length.out = 120)
polygon(c(xr, rev(xr)), c(dnorm(xr), rep(0, length(xr))),
        col = rgb(0.70, 0.10, 0.10, 0.45), border = NA)
abline(v = c(-tc, tc), col = "firebrick", lwd = 1.5, lty = 2)
text(c(-tc, tc), 0.03, labels = c("-1.96", "1.96"),
     pos = c(2, 4), cex = 0.9)

Copy to Clipboard

The two-sided 5% rejection region. A statistic landing in either shaded tail rejects the null; with large degrees of freedom the critical values are the standard-normal values +/-1.96 shown here.

If $H_0$ is rejected we say the coefficient is statistically significant at level $\alpha$. If we fail to reject we say the data are consistent with $H_0$ — never that we have “proved” it.

 Note Example: is the fertility slope below zero?

Take the same fertility estimates. Theory suggests schooling does not raise fertility, so we test against a negative alternative — a left-tailed test:

$$ H_0:\ \beta_1 = 0 \qquad\text{vs.}\qquad H_1:\ \beta_1 < 0. $$

- Step 2.$df = 1129-1-1 = 1127$ and $\alpha = 0.05$ in one tail, so from the $t$-table $t_c \approx 1.645$.
- Step 3.$\displaystyle t = \frac{-0.139 - 0}{0.018} = -7.72.$
- Step 4 (left-tailed, reject if $t < -t_c$).$-7.72 < -1.645$, so we reject $H_0$.

At the 5% level $\hat{\beta}_1$ is statistically significant: the data are hard to reconcile with $\beta_1 = 0$.

What does rejecting $H_0$ here actually buy us? It says that, given the sampling uncertainty, $\beta_1 = 0$ is implausible — the estimated negative association between schooling and fertility is distinguishable from zero. It does not say that schooling causes lower fertility (there is no causal identification in a single regression of this kind), that the result automatically carries over to other populations, or anything about the size of the effect. Those are separate questions, taken up below and in later chapters.

 Warning Common mistake: “fail to reject” is not “prove $H_0$”

When $|t|$ is small we fail to reject $H_0$. The correct reading is “the data do not provide enough evidence against $H_0$”, not “we have proved $H_0$ is true”. A small $|t|$ can arise simply because the sample is too small or too noisy to detect a departure from $c$ — absence of evidence is not evidence of absence.`);
push("5.24", r`Source: Alessio Gaggero, Econometrics I, section 4.6. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`4.6 Confidence intervals and two-sided tests

Confidence intervals and two-sided tests are not two separate procedures; they are two views of the same comparison.

 Note Equivalence

For a two-sided test of $H_0:\beta_j = c$ at level $\alpha$,

$$ \text{reject } H_0 \quad\Longleftrightarrow\quad c \text{ lies outside the } (1-\alpha) \text{ confidence interval.} $$

The 95% fertility interval was $[-0.174,\ -0.104]$. Does it contain $0$? No — so the two-sided test of $H_0:\beta_1 = 0$ rejects at the 5% level, with no extra arithmetic.

 Warning Careful: which test is this?

Our worked test of $H_0:\beta_1 = 0$ above was one-tailed ($H_1:\beta_1 < 0$, $t_c = 1.645$). The equivalence just stated is for the two-sided test ($H_1:\beta_1 \neq 0$, $t_c = 1.96$). Both reject here, but they are different tests — only the two-sided one lines up with the 95% confidence interval.`);
push("5.25", r`Source: Alessio Gaggero, Econometrics I, section 4.7. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`4.7 The $p$-value

The four-step procedure forces us to fix $\alpha$ in advance. A more informative alternative is to report the $p$-value.

 Note Definition: $p$-value

The $p$-value is the probability, computed under $H_0$, of observing a test statistic at least as extreme as the one we got. Equivalently, it is the smallest significance level $\alpha$ at which we would reject $H_0$.

For a two-sided test of $H_0:\beta_j = 0$ with computed statistic $t$,

$$ p \;=\; 2 \cdot \Pr\!\left(T_{n-k-1} > |t|\right), $$

and for a one-sided test the $p$-value is half of this (when the sign of $\hat{\beta}_j$ agrees with the alternative). The decision rule is simply

$$ p < \alpha \;\Rightarrow\; \text{reject}, \qquad p \geq \alpha \;\Rightarrow\; \text{fail to reject}. $$

Conventional rules of thumb (Wooldridge 2020): $p < 0.01$ is strong evidence against $H_0$; $p < 0.05$ is evidence against it; $p < 0.10$ is weak evidence; $p \geq 0.10$ is insufficient to reject. R reports two-sided $p$-values by default in the \`Pr(>|t|)\` column of \`summary(lm(...))\`, with significance stars (\`***\` for $p < 0.001$, \`**\` for $p < 0.01$, \`*\` for $p < 0.05$, \`.\` for $p < 0.10$).

 Warning Common mistake: the $p$-value is not the probability that $H_0$ is true

A $p$-value of $0.024$ does not mean “there is a 2.4% probability that $H_0$ is true”. The $p$-value is computed assuming $H_0$ is true; it is a statement about the data under the null, not a probability assigned to the null itself. Nor does a small $p$-value certify causation: it tells us $\hat{\beta}_j$ is unlikely to have arisen by sampling noise if the truth were zero, but says nothing about whether $x_j$ causes $y$. Causal interpretation still requires the population assumption $\mathbb{E}[u \mid \mathbf{X}] = 0$ (MLR.4) — no $p$-value, however small, can rescue a regression contaminated by omitted-variable bias or reverse causation.`);
push("5.26", r`Source: Alessio Gaggero, Econometrics I, section 4.8. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`4.8 Statistical versus economic significance

Statistical significance and economic (practical) significance are different questions, and a good empirical analysis always asks both.

- Statistical significance asks: can we distinguish the coefficient from zero? This is driven by the standard error, hence by the $p$-value.
- Economic significance asks: is the size of the coefficient large enough to matter for the decision at hand?

The two can come apart because a very large sample shrinks $\operatorname{se}(\hat{\beta}_j)$, so even a tiny coefficient can be statistically significant. A precisely estimated $\hat{\beta} = 0.0004$ may be “significantly different from zero” and yet economically negligible.

 Warning Common mistake: reading significance as importance

A coefficient can be statistically significant (small $p$-value) but economically trivial, and a coefficient can be economically large but statistically insignificant in a small sample. Always report both: the magnitude of $\hat{\beta}_j$ in the units of the problem, and the precision with which it is estimated. A 1% and a 10% return to a year of schooling may both be “significant” in a large sample, but only one of them is policy-relevant.`);
push("5.27", r`Source: Alessio Gaggero, Econometrics I, section 4.9. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`4.9 The $F$-test for joint significance

Single-coefficient $t$-tests are the right tool when we have one parameter in mind. Often, though, the question is about several coefficients at once. For

$$ y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 x_3 + u, $$

we might want to test

$$ H_0:\ \beta_2 = 0 \ \text{ and }\ \beta_3 = 0 $$

against the alternative that at least one of them is non-zero. This is not the same as two separate $t$-tests: running $q$ separate tests inflates the overall error rate, and two regressors can be jointly informative even when each is individually borderline. We ask whether $x_2$ and $x_3$ matter together.

4.9.1 Restricted versus unrestricted models

The logic is a comparison of fit. The unrestricted model keeps all the regressors; the restricted model imposes $H_0$ by dropping the ones set to zero. Dropping variables can never improve the fit, so the restricted sum of squared residuals is at least as large as the unrestricted one,

$$ \mathrm{SSR}_R \;\geq\; \mathrm{SSR}_U. $$

The question is whether imposing $H_0$ costs us much fit. If the restriction raises the SSR only slightly, the data are comfortable with $H_0$; if it raises the SSR a lot, the restriction is hard to reconcile with the data. The $F$-statistic scales “how much worse” into a number we can test.

 Note Definition: the $F$-statistic

Under $H_0$ and MLR.1–MLR.6, with $q$ restrictions,

$$ F \;=\; \frac{(\mathrm{SSR}_R - \mathrm{SSR}_U)/q}{\mathrm{SSR}_U/(n-k-1)} \;\sim\; F_{q,\,n-k-1}. $$

Here $q$ is the numerator degrees of freedom (the number of restrictions) and $n-k-1$ is the denominator degrees of freedom. Reject $H_0$ at level $\alpha$ if $F > F_c$, the upper-$\alpha$ critical value of $F_{q,\,n-k-1}$ (see Appendix C).

The test follows the same four steps as before: state $H_0$ (the restrictions) and $H_1$ (not $H_0$); find $F_c$; compute $F$; compare, rejecting when $F > F_c$. An equivalent formula uses the $R^2$ of each model,

$$ F \;=\; \frac{(R^2_U - R^2_R)/q}{(1 - R^2_U)/(n-k-1)}. $$

The two formulas are algebraically identical whenever the dependent variable is the same in both regressions. They diverge if the restricted model changes the left-hand side (for instance an $F$ comparing a model in $\log y$ with one in $y$), which the $R^2$ form does not cover.

 Note Example: a joint test on pension plans

A firm’s pension-plan participation rate, prate, is regressed on the employer’s match rate mrate, the plan’s age, and firm size totemp:

$$ prate = \beta_0 + \beta_1\,mrate + \beta_2\,age + \beta_3\,totemp + u, \qquad n = 1534. $$

Do age and totemp matter jointly, given mrate? Test $H_0:\ \beta_2 = \beta_3 = 0$ against $H_1:$ not $H_0$, so $q = 2$.

- Step 2. $n-k-1 = 1534-3-1 = 1530$ and $\alpha = 0.05$, so $F_c = F_{2,1530} \approx 3$.
- The two models (fits and sums of squared residuals):

$$
\begin{aligned}
\text{Unrestricted:}\quad \widehat{prate} &= 80.29 + 5.44\,mrate + 0.26\,age - 0.0001\,totemp, & \mathrm{SSR}_U &= 385719, \\
\text{Restricted:}\quad \widehat{prate} &= 87.36 + 5.82\,mrate, & \mathrm{SSR}_R &= 428385.5.
\end{aligned}
$$

- Step 3.
$$ F = \frac{(\mathrm{SSR}_R - \mathrm{SSR}_U)/q}{\mathrm{SSR}_U/(n-k-1)} = \frac{(428385.5 - 385719)/2}{385719/1530} = \frac{21333.25}{252.10} = 84.62. $$
- Step 4. $84.62 > 3$, so we reject $H_0$: the data provide strong evidence that age and totemp are jointly relevant for prate, conditional on mrate.

A test result is not an automatic “keep” or “drop” rule for variables. Which regressors belong in a model is guided by theory, by identification and by the research question — the $F$-test tells us only whether the data can distinguish the restricted model from the unrestricted one.

4.9.2 The overall $F$-test

A special case tests that every slope is zero,

$$ H_0:\ \beta_1 = \beta_2 = \cdots = \beta_k = 0, $$

against the alternative that at least one slope is non-zero. The restricted model is then the regression on a constant alone, so $R^2_R = 0$ and the statistic collapses to

$$ F \;=\; \frac{R^2/k}{(1-R^2)/(n-k-1)}. $$

This asks whether the regressors are jointly informative relative to an intercept-only model; it is exactly the number R prints on the bottom “F-statistic” line of \`summary(lm(...))\`, together with its $p$-value.

 Warning Common mistake: over-reading a significant overall $F$

Rejecting the overall null means the regressors jointly explain $y$ better than the mean alone. It does not establish:

- causality,
- correct specification,
- good out-of-sample prediction,
- economic importance,
- or that every individual coefficient is significant.

A significant overall $F$ is a starting point for analysis, not a certificate of a “good” model.

4.9.3 $F$ versus $t$: a useful identity

For a single restriction ($q = 1$), the $F$-statistic equals the square of the corresponding $t$-statistic:

$$ F \;=\; t^2, \qquad F_{1,\,n-k-1} \;=\; \bigl(t_{n-k-1}\bigr)^2. $$

The $t$- and $F$-tests then deliver identical conclusions; the $F$ machinery is only strictly necessary when $q \geq 2$.`);
push("6.1", r`Source: Alessio Gaggero, Econometrics I, section 7.1. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`7.1 Introduction

In Chapter 4 we listed the multiple linear regression assumptions MLR.1–MLR.6 that justify OLS. The homoskedasticity assumption MLR.5 states that the error variance is the same for every value of the regressors:

$$ \operatorname{Var}(u_i \mid \mathbf{x}_i) \;=\; \sigma^2, \qquad i = 1, \dots, n. $$

When MLR.5 fails, the conditional variance depends on $\mathbf{x}_i$:

$$ \operatorname{Var}(u_i \mid \mathbf{x}_i) \;=\; \sigma_i^2, $$

and the error is said to be heteroskedastic. The Greek root is helpful: homo-skedastic means “same spread”; hetero-skedastic means “different spread”.

 Note Example: wage variability and education

Workers with only primary education in a typical European labour market earn between roughly 15,000 and 25,000 euros per year — a narrow range. University graduates earn anywhere from 20,000 to 200,000 euros — a much wider range. The conditional variance of wages clearly increases with education. The error term in a wage equation $\text{wage}_i = \beta_0 + \beta_1\,\text{educ}_i + u_i$ therefore exhibits heteroskedasticity: $\operatorname{Var}(u_i \mid \text{educ}_i)$ grows with \`educ\`.

Heteroskedasticity is not a problem of identification. As long as $\mathbb{E}[u_i \mid \mathbf{x}_i] = 0$ (assumption MLR.4) holds, the meaning of $\beta_j$ as a ceteris paribus effect survives. What heteroskedasticity breaks is inference — the machinery that turns a point estimate $\hat\beta_j$ into a confidence interval or a hypothesis test.

 Warning Common mistake: confusing heteroskedasticity with omitted variable bias

Heteroskedasticity is about $\operatorname{Var}(u_i \mid \mathbf{x}_i)$; omitted variable bias is about $\mathbb{E}[u_i \mid \mathbf{x}_i]$. The first leaves $\hat\beta_j$ unbiased and only damages the standard errors. The second biases $\hat\beta_j$ itself. The two problems require different tools, and the same dataset can suffer from one, the other, both, or neither.

 Note Where heteroskedasticity typically appears

Heteroskedasticity is the rule rather than the exception in cross-sectional microeconomic data, for at least three reasons:

- Scale effects. Larger units have more room to vary. Spending by large firms varies more in absolute terms than spending by small firms.
- Discrete and bounded outcomes. A binary dependent variable mechanically has $\operatorname{Var}(y \mid \mathbf{x}) = p(\mathbf{x})\bigl[1 - p(\mathbf{x})\bigr]$, which is not constant.
- Aggregation. Means computed over groups of different sizes have variances proportional to $1/n_g$, generating heteroskedasticity by construction.

These are precisely the data structures applied economists work with, which is why robust standard errors have become the default in modern practice.`);
push("6.2", r`Source: Alessio Gaggero, Econometrics I, section 7.2. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`7.2 Consequences of heteroskedasticity

Assume MLR.1–MLR.4 hold and only MLR.5 fails. Three statements summarise the consequences:

1. OLS is still unbiased and consistent. Unbiasedness of $\hat\beta_j$ requires only MLR.1–MLR.4. Heteroskedasticity does not enter the proof.
2. OLS is no longer BLUE. The Gauss–Markov theorem requires homoskedasticity. Under heteroskedasticity, other linear unbiased estimators can have a smaller variance than OLS. We will see one such estimator, WLS, in §7.4.
3. The usual OLS standard errors are wrong. The textbook formula $\widehat{\operatorname{Var}}(\hat\beta_j) = \hat\sigma^2 (\mathbf{X}'\mathbf{X})^{-1}_{jj}$ assumes the error variance-covariance matrix is $\sigma^2 \mathbf{I}_n$. When it is not, this formula is biased — typically downward, so OLS standard errors are too small and $t$-statistics too large. Confidence intervals are therefore too narrow and $p$-values are too small: we reject the null hypothesis more often than we should.

 Note The correct (sandwich) variance under heteroskedasticity

If we collect the conditional variances on the diagonal of a matrix $\Omega = \operatorname{diag}(\sigma_1^2, \dots, \sigma_n^2)$, the correct conditional variance of the OLS estimator is

$$ \operatorname{Var}(\hat{\beta} \mid \mathbf{X}) \;=\; (\mathbf{X}'\mathbf{X})^{-1}\,\mathbf{X}'\Omega\mathbf{X}\,(\mathbf{X}'\mathbf{X})^{-1}. $$

The “bread” $(\mathbf{X}'\mathbf{X})^{-1}$ surrounds the “meat” $\mathbf{X}'\Omega\mathbf{X}$ — which is why this form is universally called a sandwich estimator. The usual OLS formula simply replaces $\Omega$ by $\sigma^2 \mathbf{I}_n$ and collapses the sandwich to a single slice. The White / HC1 estimator we use in §7.4 estimates $\Omega$ by $\operatorname{diag}(\hat u_1^2, \dots, \hat u_n^2)$, with a small-sample degrees-of-freedom correction.

In short: heteroskedasticity is a standard-error problem, not a coefficient problem. The fix is to repair the inferential machinery (robust SEs) or, if we can afford the extra modelling, to use an estimator that exploits the variance structure (WLS).`);
push("6.3", r`Source: Alessio Gaggero, Econometrics I, section 7.3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`7.3 Detection of heteroskedasticity

We describe one informal diagnostic and two formal tests. The informal plot is cheap and should be the first thing you look at; the formal tests give a structured decision rule.

7.3.1 Informal detection: residual plots

After estimating the OLS model, compute the residuals $\hat u_i = y_i - \hat y_i$ and plot them against either the fitted values $\hat y_i$ or against each regressor $x_j$. The visual fingerprint of heteroskedasticity is a fan or wedge shape: the vertical spread of the residual cloud widens (or narrows) as you move along the horizontal axis. Squared residuals $\hat u_i^2$ against $x_j$ make the pattern even more obvious because the sign of the residual no longer matters.

If the cloud looks like a horizontal band of roughly constant thickness, homoskedasticity is plausible. If it spreads out — as it typically does when $x_j$ is income, firm size, or any other “scale” variable — heteroskedasticity is the natural suspect.

7.3.2 The Goldfeld–Quandt test

The Goldfeld–Quandt (GQ) test is appropriate when you suspect heteroskedasticity is driven by one specific regressor. The idea is simple: split the sample into a low-$x$ group and a high-$x$ group and compare the residual variances of the two subsamples.

Steps.

1. Order the observations by the suspected variable $x$.
2. Optionally drop the middle $m$ observations (often $m \approx n/3$) to accentuate the contrast.
3. Estimate the model separately on the low group (subsample 1) and on the high group (subsample 2). Obtain the sums of squared residuals $\operatorname{SSR}_1$ and $\operatorname{SSR}_2$, with degrees of freedom $\operatorname{df}_1$ and $\operatorname{df}_2$.
4. Compute

$$ F \;=\; \frac{\operatorname{SSR}_2 \,/\, \operatorname{df}_2}{\operatorname{SSR}_1 \,/\, \operatorname{df}_1}\;\sim\;F_{\operatorname{df}_2,\,\operatorname{df}_1} \quad \text{under } H_0. $$

Hypotheses. $H_0$: homoskedasticity. $H_1$: $\operatorname{Var}(u)$ increases with $x$ (the most common alternative). Reject $H_0$ when $F$ exceeds the upper-tail critical value of the $F$ distribution.

The GQ test was historically popular in small samples and is intuitive, but it requires the analyst to commit to a single sorting variable and to a sample-splitting rule. The Breusch–Pagan test, introduced next, drops both of these commitments.

7.3.3 The Breusch–Pagan test

The Breusch–Pagan (BP) test detects heteroskedasticity related to any of the regressors. It is the workhorse formal test in modern applied work.

Steps.

1. Estimate the original model by OLS and store the residuals $\hat u_i$.
2. Run the auxiliary regression of the squared residuals on all the original regressors:

$$ \hat u_i^2 \;=\; \gamma_0 + \gamma_1 x_{1i} + \gamma_2 x_{2i} + \dots + \gamma_k x_{ki} + v_i. $$

3. Compute the BP statistic

$$ \operatorname{BP} \;=\; n \cdot R^2_{\text{aux}} \;\sim\;\chi^2_{k}\quad\text{under } H_0, $$

where $R^2_{\text{aux}}$ is the coefficient of determination of the auxiliary regression and $k$ is the number of slope coefficients in it.

Hypotheses. $H_0: \gamma_1 = \gamma_2 = \dots = \gamma_k = 0$ (homoskedasticity). Reject when $\operatorname{BP} > \chi^2_{k,\alpha}$.

The intuition is direct: if the squared residual is systematically explained by the regressors, then $\operatorname{Var}(u \mid \mathbf{x})$ varies with $\mathbf{x}$, which is the definition of heteroskedasticity. A close cousin — the White test — adds squares and cross-products of the regressors to the auxiliary regression and so detects more general forms of heteroskedasticity, at the cost of degrees of freedom.

 Warning Common mistake: chaining tests until one rejects

Do not run GQ, then BP, then White, and report whichever rejects “first”. This is a form of $p$-hacking. Pick one test based on what you suspect before looking at the residuals, or — following modern practice — skip the testing step altogether and report robust standard errors by default.`);
push("6.4", r`Source: Alessio Gaggero, Econometrics I, section 7.4. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`7.4 Remedies

There are two main remedies, suited to two different states of knowledge.

7.4.1 Weighted Least Squares (WLS)

Suppose we know (or are willing to model) the form of the conditional variance:

$$ \operatorname{Var}(u_i \mid \mathbf{x}_i) \;=\; \sigma^2 \, h(\mathbf{x}_i), $$

where $h(\mathbf{x}_i) > 0$ is a known function of the regressors. A typical example is $h(\mathbf{x}_i) = x_i$ when the variance is proportional to a scale variable such as income.

Divide every term in the regression by $\sqrt{h(\mathbf{x}_i)}$:

$$ \frac{y_i}{\sqrt{h(\mathbf{x}_i)}} \;=\; \beta_0 \frac{1}{\sqrt{h(\mathbf{x}_i)}} + \beta_1 \frac{x_{i}}{\sqrt{h(\mathbf{x}_i)}} + \frac{u_i}{\sqrt{h(\mathbf{x}_i)}}. $$

The new error $u_i^\ast = u_i / \sqrt{h(\mathbf{x}_i)}$ has constant variance:

$$ \operatorname{Var}(u_i^\ast) \;=\; \frac{\sigma^2 h(\mathbf{x}_i)}{h(\mathbf{x}_i)} \;=\; \sigma^2. $$

OLS on the transformed model is equivalent to weighted least squares: minimise

$$ \sum_{i=1}^{n} \frac{1}{h(\mathbf{x}_i)} \bigl(y_i - \beta_0 - \beta_1 x_{i} - \dots\bigr)^2. $$

Each observation receives weight $w_i = 1 / h(\mathbf{x}_i)$. Observations with high variance receive less weight; observations with low variance receive more. When the weights are correctly specified, WLS is BLUE: it has lower variance than OLS while remaining unbiased.

 Warning Common mistake: forcing WLS when you don’t know $h(\mathbf{x})$

WLS is only BLUE under correctly specified weights. With wrong weights it can be less efficient than OLS, and its standard errors are again incorrect. If you have only a vague idea of the variance structure, prefer robust standard errors.

7.4.2 Heteroskedasticity-robust standard errors

When the form of $h(\mathbf{x})$ is unknown, the safer remedy is to keep OLS for the point estimates and to compute heteroskedasticity-consistent (HC) standard errors, also called robust or White standard errors after (White 1980).

In the simple regression case with $\hat u_i$ denoting the OLS residual,

$$ \operatorname{se}_{\text{robust}}(\hat\beta_1) \;=\; \sqrt{\,\dfrac{\displaystyle\sum_{i=1}^{n} (x_i - \bar x)^2 \,\hat u_i^2}{\Bigl[\displaystyle\sum_{i=1}^{n} (x_i - \bar x)^2\Bigr]^2}\,}. $$

The general matrix expression is the sandwich estimator of §7.2 with $\Omega$ replaced by $\operatorname{diag}(\hat u_1^2, \dots, \hat u_n^2)$. Several variants exist (HC0, HC1, HC2, HC3) that differ in their finite-sample degrees-of-freedom correction; HC1 is the default reported by Stata’s \`, robust\` option and is the standard in published applied work.

Robust SEs leave the point estimates $\hat\beta_j$ unchanged. Only the variance — and therefore the $t$-statistics, $p$-values, and confidence intervals — is corrected.

 Note When to use what

- Variance structure known and trustworthy$\Rightarrow$ WLS (BLUE, smaller SEs).
- Variance structure unknown$\Rightarrow$ OLS with robust SEs (unbiased coefficients, valid inference, larger SEs).
- In doubt$\Rightarrow$ report robust SEs. In modern applied econometrics, robust SEs have become the default rather than a backup. Many journals expect them by construction.`);
push("7.1", r`Source: Alessio Gaggero, Econometrics I, section 8.1. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`8.1 From cross-section to time series

In Chapters 1–7 every observation was a unit (a worker, a firm, a household) sampled at a single point in time. We indexed observations by $i = 1,\dots,n$. Time series are different: there is one unit — a country, a firm, a household, a market — and we observe it repeatedly across discrete periods. We replace the index $i$ with $t = 1,\dots,n$, and the population model becomes

$$ y_t = \beta_0 + \beta_1 x_{1t} + \beta_2 x_{2t} + \cdots + \beta_k x_{kt} + u_t. $$

In matrix form, $\mathbf{y} = \mathbf{X}\beta + \mathbf{u}$, exactly as before — only the index has changed. A typical example is monthly company-level data:

Month · Sales $y_t$ · Advertising $x_t$
Jan 2020 · 120 · 15
Feb 2020 · 135 · 18
Mar 2020 · 128 · 10
$\vdots$ · $\vdots$ · $\vdots$
Nov 2020 · 175 · 24
Dec 2020 · 190 · 30

Mechanically, almost everything from Chapters 2–6 carries over: OLS still solves $\min_{\beta} \sum_t (y_t - \mathbf{x}_t'\beta)^2$; the partialling-out interpretation is unchanged; nonlinear and qualitative regressors behave as before. What changes is the error structure. Two errors $u_t$ and $u_s$ refer to the same economic unit observed at different points in time, and there is no reason in general for them to be uncorrelated.

 Note Recap of MLR.2 (random sampling) in time-series context

Assumption MLR.2 in cross-sections required the sample to consist of $n$ independent draws — for any pair $i\neq j$, $\mathbb{E}[u_i u_j]=0$. The mechanism that delivered MLR.2 was random sampling from a fixed population: knowing $u_i$ told you nothing about $u_j$.

In a time series there is no random sampling across units. Successive errors $u_t$ and $u_{t+1}$ are generated by the same process unfolding over time, and the natural default is that they are related. Whenever $\mathbb{E}[u_t u_s] \neq 0$ for some $t \neq s$, we say the errors are autocorrelated (or serially correlated). Will January’s unobserved demand shock influence February’s? Almost certainly yes — that is the working definition of autocorrelation.

The contrast with Chapter 7 is useful. Heteroskedasticity is a cross-sectional pathology in which $\operatorname{Var}(u_i)$ varies with the regressors but errors across units are independent. Autocorrelation is its time-series cousin: the off-diagonal elements of the error variance–covariance matrix are nonzero, while the diagonal may or may not stay constant. Both leave OLS unbiased but invalidate its standard errors.`);
push("7.2", r`Source: Alessio Gaggero, Econometrics I, section 8.2. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`8.2 Definition, AR(1) structure, and consequences

8.2.1 Definition

 Note Definition (Autocorrelation)

The errors $u_t$ exhibit autocorrelation (or serial correlation) when

$$ \operatorname{Cov}(u_t, u_s) \neq 0 \quad \text{for some } t \neq s. $$

The variance–covariance matrix of $\mathbf{u} = (u_1,\dots,u_n)'$ is

$$ \operatorname{Var}(\mathbf{u}) = \begin{pmatrix} \sigma^2 & \gamma_1 & \gamma_2 & \cdots & \gamma_{n-1} \\ \gamma_1 & \sigma^2 & \gamma_1 & \cdots & \gamma_{n-2} \\ \gamma_2 & \gamma_1 & \sigma^2 & \cdots & \gamma_{n-3} \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ \gamma_{n-1} & \gamma_{n-2} & \gamma_{n-3} & \cdots & \sigma^2 \end{pmatrix}, $$

with at least one off-diagonal element $\gamma_k = \operatorname{Cov}(u_t, u_{t-k}) \neq 0$.

Under the classical cross-sectional assumptions, the off-diagonal entries are all zero and $\operatorname{Var}(\mathbf{u}) = \sigma^2 \mathbf{I}_n$. Autocorrelation drops that simplification.

8.2.2 The AR(1) workhorse

Almost all of the chapter — and the vast majority of applied undergraduate work — uses one specific model for serial dependence: the first-order autoregressive process, or AR(1):

$$ u_t = \rho\,u_{t-1} + \varepsilon_t, \qquad |\rho| < 1, \tag{AR(1)} $$

where $\varepsilon_t$ is white noise: $\mathbb{E}[\varepsilon_t]=0$, $\operatorname{Var}(\varepsilon_t) = \sigma_\varepsilon^2$ constant, $\operatorname{Cov}(\varepsilon_t,\varepsilon_s)=0$ for $t \neq s$, and (often) $\varepsilon_t \sim \mathcal{N}(0,\sigma_\varepsilon^2)$.

The single parameter $\rho$ summarises the entire dependence structure. Under stationarity ($|\rho|<1$) one can show:

$$ \mathbb{E}[u_t] = 0, \qquad \operatorname{Var}(u_t) = \frac{\sigma_\varepsilon^2}{1-\rho^2}, \qquad \operatorname{Cov}(u_t, u_{t-k}) = \rho^k \cdot \frac{\sigma_\varepsilon^2}{1-\rho^2}. $$

So $\gamma_k = \rho^k \sigma^2$ with $\sigma^2 = \sigma_\varepsilon^2/(1-\rho^2)$ — the autocovariances decay geometrically in the lag $k$. The sign of $\rho$ classifies the pattern:

- $\rho > 0$ (positive autocorrelation). Errors of the same sign cluster. A positive shock today persists, decaying smoothly: long runs of positive residuals, then long runs of negative residuals. This is by far the most common case in macroeconomic and business data.
- $\rho < 0$ (negative autocorrelation). Errors alternate in sign: each positive shock is followed disproportionately by a negative one. Less common, but it does appear in inventory series and in models where adjustment overshoots.
- $\rho = 0$ (no autocorrelation).$u_t = \varepsilon_t$ and the errors are white noise: the cross-sectional default is restored.

Higher-order processes (AR(2), AR($p$), ARMA, …) exist and are studied in Econometrics II; for our purposes AR(1) is enough to fix ideas and to motivate the diagnostics and corrections that follow.

8.2.3 Consequences for OLS

What does autocorrelation do to the OLS estimator $\hat{\beta}$?

1. OLS is still unbiased and consistent — provided the conditional mean is correctly specified, i.e. $\mathbb{E}[u_t \mid \mathbf{x}_t] = 0$. Autocorrelation is a property of the off-diagonal elements of $\operatorname{Var}(\mathbf{u})$ and does not push the average estimate away from $\beta$. The point estimates are not the problem.
2. OLS is no longer BLUE. It is no longer the minimum-variance linear unbiased estimator; an alternative estimator (Generalised Least Squares, see §8.4) is more efficient.
3. The conventional OLS standard errors are wrong. The textbook formula $\operatorname{Var}(\hat{\beta}) = \sigma^2 (\mathbf{X}'\mathbf{X})^{-1}$ presupposes $\operatorname{Var}(\mathbf{u}) = \sigma^2 \mathbf{I}_n$, which fails. With positive autocorrelation the OLS-reported standard errors typically understate the true sampling variability, $t$-statistics are too large, $p$-values too small, and confidence intervals too narrow. The “optimistic $t$-statistics” of the motivating question are exactly this artefact.

 Warning Causality vs efficiency: the lagged-dependent-variable trap

There is one case in which autocorrelation does more than just inflate $t$-statistics: it destroys identification. If the regression includes a lagged dependent variable $y_{t-1}$ and the errors are AR(1),

$$ y_t = \alpha\,y_{t-1} + \beta_0 + \beta_1 x_t + u_t, \qquad u_t = \rho\,u_{t-1} + \varepsilon_t, $$

then $y_{t-1}$ depends on $u_{t-1}$, and $u_{t-1}$ is correlated with $u_t$ through $\rho$. The regressor is correlated with the error, $\mathbb{E}[u_t \mid y_{t-1}] \neq 0$, and OLS is no longer just inefficient — it becomes biased and inconsistent. The causal coefficient $\beta_1$ is no longer identified. This is the time-series cousin of the omitted-variable bias from Chapter 3.

The intuition for why positive autocorrelation makes OLS standard errors too small is worth dwelling on: if successive errors carry information about one another, then $n$ correlated observations contain less independent information than $n$ uncorrelated ones. The effective sample size is smaller than the nominal $n$, but the OLS formula treats every observation as a fresh draw. The reported precision is therefore exaggerated.`);
push("7.3", r`Source: Alessio Gaggero, Econometrics I, section 8.3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`8.3 Detection

We have two complementary toolkits: graphical (quick, intuitive) and analytical (formal hypothesis tests). The recommended workflow is to look first and test second.

8.3.1 Graphical methods

Time plot of residuals. Plot $\hat u_t$ against $t$. If the errors are uncorrelated, the residuals should scatter randomly around zero — no visible pattern, no clustering, no obvious cycles. If you see long runs of same-sign residuals (many consecutive positives, then many consecutive negatives), that is the visual signature of $\rho>0$. If residuals alternate in a sawtooth pattern, that is $\rho<0$.

Lag plot of residuals. Plot $\hat u_t$ on the vertical axis against $\hat u_{t-1}$ on the horizontal axis. Under $\rho=0$ the cloud has no slope; under $\rho>0$ it tilts up-right (positive linear association); under $\rho<0$ it tilts down. Mechanically this is the picture of the OLS regression $\hat u_t = \rho\,\hat u_{t-1} + \text{(noise)}$, whose slope is exactly the estimate of $\rho$ that we will use below.

The three benchmark shapes are: a featureless cloud ($\rho\approx 0$), an upward-sloping line ($\rho>0$), and a downward-sloping line ($\rho<0$). In the lab below you will see all three.

8.3.2 The Durbin–Watson test

The Durbin–Watson (DW) statistic is the workhorse formal test for first-order autocorrelation.

 Note Definition (Durbin–Watson statistic)

$$ DW = \frac{\sum_{t=2}^{n} (\hat u_t - \hat u_{t-1})^2}{\sum_{t=1}^{n} \hat u_t^2}. $$

The test is of $H_0: \rho = 0$ (no autocorrelation) against $H_1: \rho \neq 0$ (or a one-sided alternative).

Why $DW \approx 2(1-\hat\rho)$. Expand the numerator:

$$ \sum_{t=2}^{n}(\hat u_t - \hat u_{t-1})^2 = \sum_{t=2}^{n} \hat u_t^2 \;-\; 2\sum_{t=2}^{n}\hat u_t \hat u_{t-1} \;+\; \sum_{t=2}^{n} \hat u_{t-1}^2. $$

For large $n$ the two outer sums are each approximately $\sum_{t=1}^n \hat u_t^2$ (they differ by a single observation). Dividing through gives

$$ DW \;\approx\; \frac{2\sum_{t=2}^{n}\hat u_t^2 - 2\sum_{t=2}^{n} \hat u_t \hat u_{t-1}}{\sum_{t=1}^{n}\hat u_t^2} \;=\; 2\left(1 - \frac{\sum_{t=2}^{n} \hat u_t \hat u_{t-1}}{\sum_{t=1}^{n}\hat u_t^2}\right) \;=\; 2(1 - \hat\rho), $$

where $\hat\rho = \sum_{t=2}^n \hat u_t \hat u_{t-1} \big/ \sum_{t=1}^n \hat u_t^2$ is the sample first-order autocorrelation of the residuals. Since $\rho\in[-1,1]$, the statistic lives in $[0,4]$:

- $DW \approx 0 \;\Leftrightarrow\; \hat\rho \approx +1$ (strong positive autocorrelation).
- $DW \approx 2 \;\Leftrightarrow\; \hat\rho \approx 0$ (no autocorrelation).
- $DW \approx 4 \;\Leftrightarrow\; \hat\rho \approx -1$ (strong negative autocorrelation).

Bounds and decision rule. The exact distribution of $DW$ depends on the design matrix $\mathbf{X}$, so Durbin and Watson tabulated a lower bound $d_L$ and an upper bound $d_U$ (functions of $n$, the number of regressors $k$, and the significance level). The decision rule, for the one-sided test $H_1:\rho>0$, is:

Region · Conclusion
$0 < DW < d_L$ · Reject $H_0$: positive autocorrelation.
$d_L < DW < d_U$ · Inconclusive.
$d_U < DW < 4 - d_U$ · Do not reject $H_0$: no autocorrelation.
$4 - d_U < DW < 4 - d_L$ · Inconclusive.
$4 - d_L < DW < 4$ · Reject $H_0$: negative autocorrelation.

The two inconclusive regions are an unavoidable feature of the test — a price one pays for not having to assume a particular design matrix. In modern software (e.g. \`lmtest::dwtest()\` in R) the test reports an exact $p$-value computed for the actual $\mathbf{X}$, sidestepping the table-bound mechanics. We use the bounds for hand exercises; we read the $p$-value in the lab.

 Tip Worked example (small-sample DW)

A regression of small road-accident counts $Y$ on registered cars $X$ over 10 years yields $\hat Y_t = 2.5676 + 0.04937\,X_t$ with $R^2 = 0.942$. From the table of residuals one computes $$\sum_{t=2}^{n}(\hat u_t - \hat u_{t-1})^2 = 18.796,\quad \sum_{t=1}^{n}\hat u_t^2 = 22.844,$$ so $$DW = \frac{18.796}{22.844} \approx 0.823.$$

For $n=10$ and $k=1$ regressors, the 5 % bounds are $d_L = 0.879$, $d_U = 1.320$. Since $DW < d_L$, we reject $H_0$ and conclude that the residuals exhibit positive first-order autocorrelation. (We will use this same example to illustrate Cochrane–Orcutt in §8.4.)

8.3.3 When DW fails: Durbin’s $h$-test

The DW test rests on two assumptions that often go unstated: the error process is AR(1), and the regression does not include a lagged dependent variable. The lagged-dependent-variable case — discussed in the warning box of §8.2.3 — is precisely the case in which OLS becomes inconsistent, and where DW itself becomes badly biased toward 2 (toward the null of no autocorrelation), which is the worst possible behaviour for a diagnostic test.

For models of the form

$$ y_t = \alpha\,y_{t-1} + \beta_0 + \beta_1 x_{1t} + \cdots + \beta_k x_{kt} + u_t, \qquad u_t = \rho\,u_{t-1} + \varepsilon_t, $$

Durbin proposed the $h$ statistic

$$ h \;=\; \hat\rho \,\sqrt{\frac{n}{1 - n\,\widehat{\operatorname{Var}}(\hat\alpha)}} \;\sim\; \mathcal{N}(0,1) \quad \text{under } H_0:\rho=0, $$

where $\hat\alpha$ is the OLS coefficient on $y_{t-1}$ and $\widehat{\operatorname{Var}}(\hat\alpha)$ is the usual (incorrect) OLS variance estimate. One often plugs in $\hat\rho \approx 1 - DW/2$. Reject $H_0$ at level $\alpha$ if $|h| > z_{1-\alpha/2}$.

 Tip Worked example (Durbin’s $h$)

Consider an OLS fit on $n=21$ observations: $$\widehat Y_t = 1.3 + 0.97\,Y_{t-1} + 2.31\,X_t, \qquad \mathrm{se}(\hat\alpha) = 0.07, \qquad DW = 1.21.$$ Then $\hat\rho \approx 1 - 1.21/2 = 0.395$, $\widehat{\operatorname{Var}}(\hat\alpha) = 0.07^2 = 0.0049$, and $$h = 0.395 \cdot \sqrt{\frac{21}{1 - 21 \cdot 0.0049}} = 0.395 \cdot 4.838 \approx 1.91.$$ At the 5 % level the critical value is $z_{0.975}=1.96$. Since $|h|=1.91 < 1.96$, we do not reject $H_0$: there is no statistically significant evidence of first-order autocorrelation. (A naive DW reading of $1.21$ might have suggested otherwise, but DW is biased here.)

Other tests exist — the Breusch–Godfrey LM test, which handles higher-order processes; the Ljung–Box portmanteau test on residual autocorrelations — and are covered in Econometrics II. For this course, DW (or Durbin’s $h$ when needed) is the standard tool.`);
push("7.4", r`Source: Alessio Gaggero, Econometrics I, section 8.4. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`8.4 Correction: from GLS to Cochrane–Orcutt

If OLS is inefficient under AR(1), what should we do? The answer is Generalised Least Squares (GLS): transform the model so that the transformed errors are white noise, then run OLS on the transformed model.

8.4.1 The GLS quasi-difference

Start from the model and its $\rho$-multiplied lag:

$$ y_t = \beta_0 + \beta_1 x_t + u_t, \qquad \rho\,y_{t-1} = \rho\beta_0 + \rho\beta_1 x_{t-1} + \rho\,u_{t-1}. $$

Subtract the second from the first:

$$ y_t - \rho\,y_{t-1} = \beta_0(1-\rho) + \beta_1(x_t - \rho\,x_{t-1}) + (u_t - \rho\,u_{t-1}). $$

By the AR(1) assumption $u_t - \rho\,u_{t-1} = \varepsilon_t$, which is white noise. Define the quasi-differenced variables

$$ y_t^* \;=\; y_t - \rho\,y_{t-1}, \qquad x_t^* \;=\; x_t - \rho\,x_{t-1}, \qquad \beta_0^{*} \;=\; \beta_0(1-\rho). $$

The transformed regression

$$ y_t^* = \beta_0^* + \beta_1\,x_t^* + \varepsilon_t $$

has homoskedastic, uncorrelated errors — the classical regression assumptions are restored, and OLS on the transformed model is the GLS estimator, which is BLUE.

The first observation. The transformation as written loses observation $t=1$. To keep it, the Prais–Winsten modification rescales it differently:

$$ y_1^* = \sqrt{1-\rho^2}\,y_1, \qquad x_1^* = \sqrt{1-\rho^2}\,x_1, \qquad \text{constant}_1^* = \sqrt{1-\rho^2}. $$

The factor $\sqrt{1-\rho^2}$ is exactly what makes $\operatorname{Var}(u_1^*) = \sigma_\varepsilon^2$, matching the other observations. In samples where $n$ is small, this matters; in large samples, dropping observation 1 (the “two-step Cochrane–Orcutt”) is essentially equivalent.

In matrix form, the GLS transformation can be written compactly as

$$ \mathbf{Y}^* \;=\; \begin{pmatrix} \sqrt{1-\rho^2}\,y_1 \\ y_2 - \rho\,y_1 \\ \vdots \\ y_n - \rho\,y_{n-1} \end{pmatrix}, \qquad \mathbf{X}^* \;=\; \begin{pmatrix} \sqrt{1-\rho^2} & \sqrt{1-\rho^2}\,x_{21} & \cdots & \sqrt{1-\rho^2}\,x_{k1} \\ 1-\rho & x_{22} - \rho\,x_{21} & \cdots & x_{k2} - \rho\,x_{k1} \\ \vdots & \vdots & \ddots & \vdots \\ 1-\rho & x_{2n} - \rho\,x_{2,n-1} & \cdots & x_{kn} - \rho\,x_{k,n-1} \end{pmatrix}. $$

Running OLS on $(\mathbf{Y}^*, \mathbf{X}^*)$ delivers $\hat{\beta}_{\text{GLS}}$.

8.4.2 The Cochrane–Orcutt iterative procedure

The catch: $\rho$ is unknown. We need to estimate it. The Cochrane–Orcutt (CO) procedure is the simplest feasible-GLS algorithm: alternate between estimating $\rho$ from residuals and re-estimating $\beta$ on the quasi-differenced data, until $\rho$ stabilises.

 Note Algorithm: Cochrane–Orcutt iterative procedure

1. Estimate the original model $y_t = \beta_0 + \beta_1 x_t + \cdots + u_t$ by OLS; collect residuals $\hat u_t$.
2. Estimate $\rho$ by regressing $\hat u_t$ on $\hat u_{t-1}$ (no intercept): $$\hat\rho = \frac{\sum_{t=2}^{n}\hat u_t\,\hat u_{t-1}}{\sum_{t=2}^{n}\hat u_{t-1}^2}.$$
3. Form the quasi-differenced variables $y_t^* = y_t - \hat\rho\,y_{t-1}$, $x_t^* = x_t - \hat\rho\,x_{t-1}$ (and, if Prais–Winsten, the rescaled first observation).
4. Run OLS on $(y_t^, x_t^)$ to get new $\hat{\beta}^{(2)}$; compute new residuals $\hat u_t^{(2)}$.
5. Plug $\hat u_t^{(2)}$ back into step 2 to update $\hat\rho$.
6. Iterate until $\hat\rho$ converges (changes negligibly between iterations).

The final coefficient vector is the Cochrane–Orcutt FGLS estimate; reported standard errors are the OLS standard errors from the transformed regression, which are valid under AR(1).

There are alternatives — the two-step CO method (one iteration only), the Hildreth–Lu grid search over $\rho$, Durbin’s two-step method, Prais–Winsten with restricted least squares — but they all share the same underlying idea: estimate $\rho$, quasi-difference, and apply OLS to recover an efficient estimator.

 Tip Worked example (Cochrane–Orcutt on the accidents data)

Returning to the accidents-vs-cars example from §8.3.2: with $DW = 0.823$ and a small $n=10$, we apply the Prais–Winsten variant.

Step 1 (OLS): $\hat Y_t = 2.568 + 0.0494\,X_t$.

Step 2 ($\hat\rho$ from residuals): regressing $\hat u_t$ on $\hat u_{t-1}$ yields $\hat\rho = 0.4226$.

Step 3 (transform): for $t > 1$, $Y_t^* = Y_t - 0.4226\,Y_{t-1}$ and $X_t^* = X_t - 0.4226\,X_{t-1}$; for $t=1$, multiply by $\sqrt{1 - 0.4226^2} \approx 0.906$.

Step 4 (OLS on transformed): $\hat Y_t^* = 2.111 + 0.0498\,X_t^*$.

The slope barely moves — OLS was unbiased to start with — but the new DW computed on the transformed residuals is $1.52$, comfortably inside the no-autocorrelation region. The standard errors that come out of step 4 are the ones to report.

The takeaway: in the AR(1) world, OLS gives you the right point estimates (on average) but the wrong uncertainty; Cochrane–Orcutt fixes the uncertainty without much changing the point.`);
push("5.8", r`Source: Alessio Gaggero, Econometrics I, section 3. Self-check Q1. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q1. Interpretation of an MLR slope

In the model $y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + u$, the coefficient $\beta_1$ measures:`, [{ t: "mc", a: 1, o: [r`The total change in $y$ when $x_1$ goes up by one unit, including any indirect effect through $x_2$.`, r`The expected change in $y$ for a one-unit increase in $x_1$, holding $x_2$ fixed.`, r`The correlation between $y$ and $x_1$.`, r`The change in $y$ when both $x_1$ and $x_2$ rise by one unit.`] }], r`Answer: B. Every MLR slope is a partial effect: it isolates the variation in $y$ associated with $x_1$ once we hold the other regressors in the model constant.`);
push("5.9", r`Source: Alessio Gaggero, Econometrics I, section 3. Self-check Q2. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q2. The zero-conditional-mean assumption

MLR.4 requires:`, [{ t: "mc", a: 2, o: [r`$\operatorname{Cov}(x_1, u) = 0$ only.`, r`$\operatorname{Var}(u\mid\mathbf{X}) = \sigma^2$.`, r`$\mathbb{E}[u \mid x_1, x_2, \ldots, x_k] = 0$.`, r`$u$ to be normally distributed.`] }], r`Answer: C. MLR.4 is the conditional-mean-zero condition on all regressors simultaneously. It is what delivers unbiasedness of OLS.`);
push("5.10", r`Source: Alessio Gaggero, Econometrics I, section 3. Self-check Q3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q3. Sign of OVB

In a wage regression we omit innate ability. Assume (i) more able workers earn more, holding education fixed, and (ii) more able workers acquire more education. The OLS coefficient on \`educ\` will be:`, [{ t: "mc", a: 2, o: [r`Biased downward.`, r`Unbiased — OLS is always unbiased.`, r`Biased upward (overestimating the return to education).`, r`Of indeterminate sign.`] }], r`Answer: C. With $\beta_{\text{ability}} > 0$ and $\tilde\delta_{\text{educ}} > 0$, the bias $\beta_2\tilde\delta_1$ is positive: the short regression overstates the return to schooling.`);
push("5.11", r`Source: Alessio Gaggero, Econometrics I, section 3. Self-check Q4. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q4. Which assumption rules out perfect collinearity?`, [{ t: "mc", a: 1, o: [r`MLR.1 (linearity in parameters).`, r`MLR.3 (no exact linear relationship among the regressors).`, r`MLR.4 (zero conditional mean).`, r`MLR.5 (homoskedasticity).`] }], r`Answer: B. MLR.3 is the assumption that $\mathbf{X}'\mathbf{X}$ is invertible. Violating it makes the OLS formula undefined; R will drop one of the offending variables and report \`NA\`.`);
push("5.12", r`Source: Alessio Gaggero, Econometrics I, section 3. Self-check Q5. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q5. $R^2$ versus adjusted $R^2$

Which statement is true when an irrelevant regressor is added to a model?`, [{ t: "mc", a: 1, o: [r`Both $R^2$ and adjusted $R^2$ always rise.`, r`$R^2$ always rises (weakly), but adjusted $R^2$ may fall.`, r`$R^2$ may fall, but adjusted $R^2$ always rises.`, r`Both always fall.`] }], r`Answer: B. $R^2$ cannot decrease because OLS could always set the new coefficient to zero. Adjusted $R^2$ subtracts a penalty for parameters; if the new variable does not improve fit enough, the penalty wins.`);
push("5.13", r`Source: Alessio Gaggero, Econometrics I, section 3. Self-check Q6. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q6. When is OVB zero?

OVB on the slope of $x_1$ is exactly zero when:`, [{ t: "mc", a: 2, o: [r`The sample size is large.`, r`$R^2$ exceeds 0.5.`, r`Either the omitted variable does not affect $y$, or it is uncorrelated with $x_1$.`, r`The errors are normal.`] }], r`Answer: C. The OVB formula $\beta_2\tilde\delta_1$ is zero whenever one of the two factors is zero. Large samples or high $R^2$ do not fix omitted-variable bias.`);
push("5.28", r`Source: Alessio Gaggero, Econometrics I, section 4. Self-check Q1. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q1. What MLR.6 buys us

Adding MLR.6 (normality of $u$) to the Gauss–Markov assumptions allows us to:`, [{ t: "mc", a: 2, o: [r`Prove that OLS is unbiased.`, r`Prove that OLS has the smallest variance among linear unbiased estimators.`, r`Derive the exact finite-sample distribution of $\hat{\beta}_j$ and run $t$- and $F$-tests in any sample size.`, r`Estimate $\sigma^2$.`] }], r`Answer: C. Unbiasedness (A) follows from MLR.1–MLR.4; BLUE (B) from MLR.1–MLR.5; the estimator $\hat{\sigma}^2$ (D) is defined regardless of MLR.6. Only MLR.6 gives us exact normality of $\hat{\beta}_j$, and therefore exact $t$ and $F$ inference in finite samples.`);
push("5.29", r`Source: Alessio Gaggero, Econometrics I, section 4. Self-check Q2. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q2. Why $t$ and not $z$?

Under MLR.1–MLR.6 we use $t_{n-k-1}$ rather than $\mathcal{N}(0,1)$ for inference on a single coefficient because:`, [{ t: "mc", a: 1, o: [r`OLS is biased in finite samples.`, r`The standard error uses an estimated $\hat{\sigma}^2$, and the resulting standardised statistic has heavier tails than the standard normal.`, r`The error term is heteroskedastic.`, r`The regressors are non-stochastic.`] }], r`Answer: B. Replacing the unknown $\sigma$ in the standard error with $\hat{\sigma}$ introduces extra variability that the $t$-distribution accounts for with its heavier tails. As $n - k - 1 \to \infty$, the $t$ converges to the standard normal.`);
push("5.30", r`Source: Alessio Gaggero, Econometrics I, section 4. Self-check Q3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q3. What "95% confidence" means

The 95% interval for the fertility slope is $[-0.174,\ -0.104]$. The correct interpretation is:`, [{ t: "mc", a: 1, o: [r`There is a 95% probability that the true $\beta_1$ lies between $-0.174$ and $-0.104$.`, r`If we repeatedly sampled and built intervals this way, about 95% of them would contain the true $\beta_1$.`, r`95% of women in the sample have the response predicted by the model.`, r`The estimate $-0.139$ is correct 95% of the time.`] }], r`Answer: B. The 95% is a property of the procedure, not of this one realised interval. Once computed, $\beta_1$ is a fixed number that the interval either covers or does not — so A is the classic misreading.`);
push("5.31", r`Source: Alessio Gaggero, Econometrics I, section 4. Self-check Q4. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q4. A confidence interval and a two-sided test

The 95% interval for $\beta_{looks}$ in the \`beauty\` regression is about $[0.054,\ 0.772]$, which excludes zero. This implies:`, [{ t: "mc", a: 0, o: [r`The two-sided $t$-test of $H_0:\beta_{looks} = 0$ rejects at the 5% level.`, r`The true $\beta_{looks}$ is definitely positive.`, r`The coefficient on looks is economically large.`, r`Looks cause higher wages.`] }], r`Answer: A. A CI and the matching two-sided test are equivalent: the interval excludes the null value if and only if the test rejects. The interval says nothing about magnitude (C), about causation (D), or about certainty for a single sample (B).`);
push("5.32", r`Source: Alessio Gaggero, Econometrics I, section 4. Self-check Q5. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q5. Reading a $p$-value

The coefficient on \`looks\` has a two-sided $p$-value of $0.02433$. Which statement is correct?`, [{ t: "mc", a: 0, o: [r`It is statistically significant at the 5% level but not at the 1% level.`, r`It is significant at every conventional level.`, r`It is not significant at the 5% level.`, r`There is a 2.433% probability that $H_0$ is true.`] }], r`Answer: A. The $p$-value is the smallest $\alpha$ at which we reject, and $0.01 < 0.02433 < 0.05$ places significance between the 1% and 5% levels. The $p$-value is computed assuming $H_0$, so it is not a probability that $H_0$ is true (D).`);
push("5.33", r`Source: Alessio Gaggero, Econometrics I, section 4. Self-check Q6. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q6. The joint $F$-test

To test whether age and totemp are jointly zero in the pension-plan regression ($q = 2$ restrictions, $n = 1534$), we use:`, [{ t: "mc", a: 1, o: [r`Two separate $t$-tests, one for each coefficient.`, r`$F = \dfrac{(\mathrm{SSR}_R - \mathrm{SSR}_U)/q}{\mathrm{SSR}_U/(n-k-1)}$, distributed $F_{q,\,n-k-1}$ under $H_0$.`, r`A $\chi^2$-test on $\hat{\beta}_{age} + \hat{\beta}_{totemp}$.`, r`A $z$-test comparing the sum of the estimates with $1.96$.`] }], r`Answer: B. Separate $t$-tests (A) do not control the size of the joint procedure and can miss the case in which two regressors are individually weak but jointly informative. The restricted model drops age and totemp; dropping them can only raise the SSR, and the $F$-statistic scales that loss of fit.`);
push("5.34", r`Source: Alessio Gaggero, Econometrics I, section 4. Self-check Q7. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q7. One-sided versus two-sided

For the fertility slope we ran a one-tailed test ($H_1:\beta_1 < 0$, $t_c = 1.645$) and also built a 95% confidence interval. Which test does the interval correspond to?`, [{ t: "mc", a: 1, o: [r`The one-tailed test, because both reject $H_0$.`, r`The two-sided test ($H_1:\beta_1 \neq 0$, $t_c = 1.96$).`, r`Neither — intervals and tests are unrelated.`, r`Both tests equally.`] }], r`Answer: B. A $(1-\alpha)$ confidence interval matches the two-sided test at level $\alpha$. The one-tailed test uses a different critical value ($1.645$ rather than $1.96$); both happen to reject here, but only the two-sided test lines up with the interval.`);
push("5.35", r`Source: Alessio Gaggero, Econometrics I, section 4. Self-check Q8. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q8. Significance versus causation

The coefficient on \`looks\` is significant at the 5% level. Which of the following is true?`, [{ t: "mc", a: 3, o: [r`A small $p$-value rules out omitted-variable bias.`, r`Statistical significance proves that better looks cause higher wages.`, r`Statistical significance and causal identification are the same thing.`, r`The test tells us $\hat{\beta}_{looks}$ is unlikely to be zero by sampling chance, but says nothing about whether looks cause higher wages — causal identification still requires $\mathbb{E}[u \mid \mathbf{X}] = 0$.`] }], r`Answer: D. Inference is about ruling out sampling noise, not confounding. A significant coefficient in an observational wage regression is a conditional association; reading it causally needs the exogeneity assumption MLR.4, which no $p$-value can supply.`);
push("6.5", r`Source: Alessio Gaggero, Econometrics I, section 7. Self-check Q1. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q1. Definition

Heteroskedasticity in a linear regression model means:`, [{ t: "mc", a: 1, o: [r`$\mathbb{E}[u \mid x] \neq 0$.`, r`$\operatorname{Var}(u \mid x)$ depends on $x$ — it is not constant.`, r`The error $u$ is correlated across observations.`, r`$x$ is collinear with another regressor.`] }], r`Answer: B. Heteroskedasticity is, by definition, a failure of MLR.5: the conditional variance of $u$ varies with the regressors. The other options describe MLR.4, autocorrelation, and multicollinearity respectively.`);
push("6.6", r`Source: Alessio Gaggero, Econometrics I, section 7. Self-check Q2. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q2. Consequences

Under heteroskedasticity (with MLR.1–MLR.4 still holding), OLS is:`, [{ t: "mc", a: 2, o: [r`Biased in finite samples.`, r`Inconsistent.`, r`Still unbiased and consistent, but no longer BLUE, and the usual standard errors are wrong.`, r`Still BLUE.`] }], r`Answer: C. Unbiasedness and consistency of $\hat\beta_j$ do not require MLR.5. Efficiency (BLUE) and the validity of the textbook standard error formula do.`);
push("6.7", r`Source: Alessio Gaggero, Econometrics I, section 7. Self-check Q3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q3. Identification versus inference

Why do we say heteroskedasticity is an inference problem, not an identification problem?`, [{ t: "mc", a: 2, o: [r`Because heteroskedasticity biases $\hat\beta_j$ but leaves the standard errors intact.`, r`Because $\hat\beta_j$ is no longer consistent for the population slope.`, r`Because, if MLR.4 still holds, $\hat\beta_j$ still estimates the ceteris paribus effect; only the standard errors are wrong.`, r`Because heteroskedasticity is the same thing as omitted variable bias.`] }], r`Answer: C. The causal interpretation of $\hat\beta_j$ survives heteroskedasticity. What fails is the machinery that turns the estimate into a $t$-test or a confidence interval.`);
push("6.8", r`Source: Alessio Gaggero, Econometrics I, section 7. Self-check Q4. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q4. Breusch–Pagan

The Breusch–Pagan test runs an auxiliary regression of:`, [{ t: "mc", a: 1, o: [r`$\hat u$ on the regressors and uses the resulting $F$ statistic.`, r`$\hat u^2$ on the regressors and uses $n \cdot R^2$ as a $\chi^2$ statistic.`, r`$y$ on $\hat u^2$ and uses a $t$ statistic.`, r`$x$ on $\hat u$ and uses the slope as a test statistic.`] }], r`Answer: B. The BP test regresses the squared residuals on the regressors; under $H_0$ of homoskedasticity, $n R^2_{\text{aux}}$ is asymptotically $\chi^2_k$.`);
push("6.9", r`Source: Alessio Gaggero, Econometrics I, section 7. Self-check Q5. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q5. Goldfeld–Quandt

The Goldfeld–Quandt test compares:`, [{ t: "mc", a: 1, o: [r`The two estimated slopes.`, r`The residual variances of two subsamples (typically low vs high values of a regressor).`, r`The $R^2$ of two models.`, r`Two intercepts.`] }], r`Answer: B. GQ splits the sample by the suspected variable, fits the regression on each half, and uses the ratio of mean squared residuals as an $F$ statistic.`);
push("6.10", r`Source: Alessio Gaggero, Econometrics I, section 7. Self-check Q6. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q6. WLS versus robust SEs

When should you prefer Weighted Least Squares to OLS with robust standard errors?`, [{ t: "mc", a: 0, o: [r`When the form of $\operatorname{Var}(u \mid \mathbf{x})$ is correctly known and you want efficiency gains.`, r`Whenever the Breusch–Pagan test rejects, regardless of what you know.`, r`When the sample is small and you cannot compute robust SEs.`, r`Never — robust SEs always dominate WLS.`] }], r`Answer: A. WLS is BLUE only under correctly specified weights. With unknown variance structure, OLS plus robust SEs is the safer default; with a credible model for $h(\mathbf{x})$, WLS buys efficiency.`);
push("7.5", r`Source: Alessio Gaggero, Econometrics I, section 8. Self-check Q1. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q1. What autocorrelation is

Autocorrelation (serial correlation) means:`, [{ t: "mc", a: 1, o: [r`$\operatorname{Var}(u_t)$ depends on the regressors $x_t$.`, r`$\operatorname{Cov}(u_t, u_s) \neq 0$ for some $t \neq s$ — the errors are correlated across time periods.`, r`$x_t$ is correlated with $u_t$.`, r`$\mathbb{E}[u_t] \neq 0$.`] }], r`Answer: B. Autocorrelation is a property of the off-diagonal elements of the error variance–covariance matrix. (A) is heteroskedasticity, (C) is endogeneity, (D) is a violation of zero-mean errors.`);
push("7.6", r`Source: Alessio Gaggero, Econometrics I, section 8. Self-check Q2. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q2. Consequences for OLS

Under AR(1) errors but with $\mathbb{E}[u_t \mid x_t] = 0$, OLS is:`, [{ t: "mc", a: 2, o: [r`Always biased.`, r`Always inconsistent.`, r`Still unbiased and consistent, but no longer BLUE, and the usual standard errors are wrong.`, r`Still BLUE.`] }], r`Answer: C. OLS keeps its point-estimate properties but loses efficiency and produces invalid standard errors. (B) becomes correct only in the special case of a lagged dependent variable.`);
push("7.7", r`Source: Alessio Gaggero, Econometrics I, section 8. Self-check Q3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q3. The AR(1) process

In the model $u_t = \rho u_{t-1} + \varepsilon_t$ with $|\rho|<1$ and $\varepsilon_t$ white noise, autocorrelation is:`, [{ t: "mc", a: 0, o: [r`Positive when $\rho > 0$, negative when $\rho<0$; the autocovariances decay geometrically.`, r`Always positive.`, r`Independent of $\rho$.`, r`Equivalent to heteroskedasticity.`] }], r`Answer: A. The sign of $\rho$ pins down the pattern, and $\operatorname{Cov}(u_t, u_{t-k}) = \rho^k \sigma^2$ decays geometrically with the lag.`);
push("7.8", r`Source: Alessio Gaggero, Econometrics I, section 8. Self-check Q4. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q4. Reading the residual time plot

A plot of OLS residuals against time shows long runs of positive residuals followed by long runs of negative residuals. This suggests:`, [{ t: "mc", a: 0, o: [r`Positive autocorrelation.`, r`Negative autocorrelation.`, r`Heteroskedasticity.`, r`No systematic pattern.`] }], r`Answer: A. Persistent same-sign runs are the visual signature of $\rho>0$. Sawtooth patterns (alternating signs) suggest $\rho<0$.`);
push("7.9", r`Source: Alessio Gaggero, Econometrics I, section 8. Self-check Q5. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q5. The DW statistic

The Durbin–Watson statistic satisfies, for large $n$:`, [{ t: "mc", a: 2, o: [r`$DW = \hat\rho$.`, r`$DW = 1 + \hat\rho$.`, r`$DW \approx 2(1 - \hat\rho)$.`, r`$DW = 2\hat\rho$.`] }], r`Answer: C. Expanding the squared differences in the numerator and using $\sum \hat u_t^2 \approx \sum \hat u_{t-1}^2$ for large $n$ gives $DW \approx 2(1-\hat\rho)$.`);
push("7.10", r`Source: Alessio Gaggero, Econometrics I, section 8. Self-check Q6. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q6. When DW is not valid

The Durbin–Watson test is not valid when:`, [{ t: "mc", a: 3, o: [r`The errors are normally distributed.`, r`The sample size is large.`, r`There are many regressors.`, r`The model includes a lagged dependent variable.`] }], r`Answer: D. A lagged dependent variable creates correlation between regressor and error, biases DW toward 2, and ruins the test. Use Durbin's $h$ instead.`);
push("7.11", r`Source: Alessio Gaggero, Econometrics I, section 8. Self-check Q7. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Q7. After Cochrane–Orcutt

After a successful Cochrane–Orcutt correction, the DW statistic computed on the transformed regression should:`, [{ t: "mc", a: 3, o: [r`Be close to 0.`, r`Be close to 4.`, r`Equal $\hat\rho$.`, r`Be close to 2.`] }], r`Answer: D. A successful AR(1) correction whitens the residuals, so $\hat\rho^*$ on the transformed model is close to 0 and $DW^* \approx 2(1-0) = 2$. If DW after correction is still far from 2, the AR(1) assumption is wrong.

The fuller interactive set (twelve items including simulation exercises) lives in \`LEARNR/08_autocorrelation.Rmd\`.`);
push("5.14", r`Source: Alessio Gaggero, Econometrics I, section 3. Exercise 3.1. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Interpreting a fitted MLR. A researcher reports
$$
\widehat{\text{wage}} = -2.87 + 0.599\,\text{educ} + 0.022\,\text{exper} + 0.169\,\text{tenure}
$$
estimated on \`wage1\`. (a) Interpret each slope coefficient in plain English. (b) Predict the hourly wage of a worker with 16 years of education, 5 years of experience, and 3 years of tenure. (c) Why should you not read $\hat\beta_1 = 0.599$ as the causal return to schooling?`, [{ t: "num", a: "7.32", abs: 0.05, l: "(b)" }], r`(a) Each slope is a partial effect: one additional year of education is associated with USD 0.60 more per hour, holding experience and tenure fixed; analogously for \`exper\` and \`tenure\`. (b) $\widehat{\text{wage}} = -2.87 + 0.599\cdot 16 + 0.022\cdot 5 + 0.169\cdot 3 \approx 7.32$ USD/hour. (c) Because MLR.4 is unlikely to hold here — ability, family background, and school quality remain in $u$ and are correlated with \`educ\`. The slope is the best within-model linear summary, not a causal coefficient.`);
push("5.15", r`Source: Alessio Gaggero, Econometrics I, section 3. Exercise 3.2. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Spotting perfect collinearity. For each of the following regressor sets, decide whether MLR.3 is violated. If so, identify the exact linear dependence.

(a) \`{const, age, age_squared}\`.
(b) \`{const, female, male}\`, where \`male = 1 - female\`.
(c) \`{const, exper, tenure, exper + tenure}\`.
(d) \`{const, educ, log(educ)}\` — assume \`educ > 0\`.`, [], r`(a) No violation: $\text{age}^2$ is not a linear function of \`age\`. (b) Violation: \`female + male = 1\`, the constant column. (c) Violation: the fourth regressor is the sum of the second and third. (d) No violation: $\log$ is nonlinear, so MLR.3 holds (though high collinearity may inflate variances).`);
push("5.16", r`Source: Alessio Gaggero, Econometrics I, section 3. Exercise 3.3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Sign of OVB from theory. You want to estimate the effect of class attendance on final grades but you omit student effort. Suppose effort raises grades and is positively correlated with attendance. Predict the sign of the bias on the coefficient of attendance in a short regression that omits effort, and explain in one sentence.`, [], r`With $\beta_{\text{effort}} > 0$ and $\tilde\delta_{\text{att}} > 0$, the bias $\beta_2\tilde\delta_1$ is positive: the short regression overstates the return to attendance because part of the apparent effect is in fact the effect of the (unobserved) effort that correlates with attendance.`);
push("5.17", r`Source: Alessio Gaggero, Econometrics I, section 3. Exercise 3.4. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Adjusted $R^2$ falling. Construct a small numerical example (or argue analytically) showing that adding an irrelevant regressor can leave $R^2$ essentially unchanged while making adjusted $R^2$ smaller. Use the identity $\bar R^2 = 1 - (n-1)(1-R^2)/(n-k-1)$ to explain why.`, [], r`With $n = 100$, suppose $R^2 = 0.30$ with $k = 3$ regressors: $\bar R^2 = 1 - 99\cdot 0.70/96 \approx 0.278$. Add an irrelevant 4th regressor that lifts $R^2$ to $0.301$: $\bar R^2 = 1 - 99\cdot 0.699/95 \approx 0.272$. $R^2$ went up by 0.001 but $\bar R^2$ fell by 0.006 because $(n-1)/(n-k-1)$ grew faster than $1-R^2$ shrank. This is the formal sense in which $\bar R^2$ penalises complexity.`);
push("5.18", r`Source: Alessio Gaggero, Econometrics I, section 3. Exercise 3.6. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Frisch–Waugh–Lovell partialling out. Let $\tilde x_1$ denote the residuals from regressing $x_1$ on the remaining regressors $(x_2,\ldots,x_k)$ and the constant. Show, using the OLS normal equations, that the multiple-regression coefficient on $x_1$ equals the slope from a simple regression of $y$ on $\tilde x_1$.`);
push("5.36", r`Source: Alessio Gaggero, Econometrics I, section 4. Exercise 4.3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`A non-zero null. Still in the \`beauty\` model, test $H_0:\beta_{exper} = 0.10$ against $H_1:\beta_{exper} \neq 0.10$ at the 5% level, using $\hat{\beta}_{exper} = 0.11374$ and $\operatorname{se} = 0.01055$. (a) Compute the $t$-statistic with the correct value of $c$. (b) Reject or fail to reject, using $t_c = 1.96$? (c) Explain why the $t$-statistic printed by \`summary()\` does not answer this question.`, [{ t: "num", a: "1.30", abs: 0.02, l: "(a) t" }], r`(a) $t = (0.11374 - 0.10)/0.01055 = 0.01374/0.01055 \approx 1.30$. (b) $|1.30| < 1.96$, so we fail to reject $H_0$: the data are consistent with a per-year return of $0.10$ at the 5% level (which does not prove it equals $0.10$). (c) The \`summary()\` $t$-statistic, $0.11374/0.01055 \approx 10.8$, tests $H_0:\beta_{exper} = 0$, a different null. Any non-zero $c$ must be subtracted in the numerator: $t = (\hat{\beta} - c)/\operatorname{se}$.`);
push("5.37", r`Source: Alessio Gaggero, Econometrics I, section 4. Exercise 4.5. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`The pension-plan $F$ by hand. Using the pension-plan models from the chapter — $\mathrm{SSR}_U = 385719$, $\mathrm{SSR}_R = 428385.5$, $n = 1534$, $k = 3$ regressors, and $q = 2$ restrictions ($\beta_{age} = \beta_{totemp} = 0$) — (a) compute the $F$-statistic, (b) compare it with $F_c = F_{2,1530} \approx 3$, (c) state the conclusion in words, and (d) explain why rejecting $H_0$ does not by itself prove that \`age\` and \`totemp\` belong in the model.`, [{ t: "num", a: "84.62", abs: 0.05, l: "(a) F" }], r`(a) $n - k - 1 = 1534 - 3 - 1 = 1530$, so

$$
F = \frac{(428385.5 - 385719)/2}{385719/1530} = \frac{21333.25}{252.10} = 84.62.
$$

(b) $84.62 > 3$. (c) We reject $H_0$: \`age\` and \`totemp\` are jointly relevant for the participation rate, conditional on \`mrate\`. (d) The $F$-test only shows that dropping the two variables costs a statistically detectable amount of fit; it does not establish causality, correct specification or economic importance, and whether the variables belong in the model is ultimately a question of theory and the research design, not of a single test.`);
push("5.38", r`Source: Alessio Gaggero, Econometrics I, section 4. Exercise 4.6. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`$F$ from $R^2$. Show, starting from the SSR-based formula, that whenever the unrestricted and restricted models share the same dependent variable, the $F$-statistic can be written as

$$
F \;=\; \frac{(R^2_U - R^2_R)/q}{(1 - R^2_U)/(n-k-1)}.
$$

Then verify the identity numerically for the overall $F$-test of the \`beauty\` model, by plugging $R^2_U = 0.1265$, $R^2_R = 0$, $q = 3$, $n = 1260$ and $k = 3$ into the formula and checking that it reproduces the $60.62$ reported by R. Finally, explain why the formula fails if the restricted model is run on $\log(wage)$ rather than $wage$.`, [], undefined, [r`Worked solution, not from the book.

$\mathrm{SST}$ is the same in both regressions, so $\mathrm{SSR} = \mathrm{SST}(1-R^2)$. Then

$$F = \frac{(\mathrm{SSR}_R - \mathrm{SSR}_U)/q}{\mathrm{SSR}_U/(n-k-1)} = \frac{\mathrm{SST}[(1-R^2_R)-(1-R^2_U)]/q}{\mathrm{SST}(1-R^2_U)/(n-k-1)} = \frac{(R^2_U - R^2_R)/q}{(1-R^2_U)/(n-k-1)}.$$

With $R^2_R = 0$, $F = (0.1265/3) / (0.8735/1256) \approx 60.62$. The identity uses one $\mathrm{SST}$. It does not apply if the restricted model is fit to $\log(\mathrm{wage})$ instead of $\mathrm{wage}$, because the two regressions no longer share a dependent variable.`]);
push("6.11", r`Source: Alessio Gaggero, Econometrics I, section 7. Exercise 7.1. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Spotting heteroskedasticity. For each of the following regressions, predict whether the error term is likely to be heteroskedastic and explain why in one sentence.

(a) Annual food expenditure regressed on household income across a sample of 4,000 households.
(b) Number of children regressed on mother's age, in a sample restricted to women aged 30–35.
(c) Firm-level R&D spending regressed on firm sales in a sample mixing small startups and Fortune 500 companies.
(d) A linear-probability model where the dependent variable is a $0/1$ indicator for employment.`, [], r`(a) Yes — richer households have more discretionary spending and therefore wider absolute variation in food spending. (b) Probably not strongly — the sample is narrow in age, so scale effects are small. (c) Yes, severely — firm size spans several orders of magnitude. (d) Yes, by construction — $\operatorname{Var}(y \mid \mathbf{x}) = p(\mathbf{x})\bigl[1-p(\mathbf{x})\bigr]$ depends on $\mathbf{x}$ whenever $p(\mathbf{x})$ does.`);
push("6.12", r`Source: Alessio Gaggero, Econometrics I, section 7. Exercise 7.2. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Reading a BP output. A student runs \`bptest(lm(consumption ~ income, data = het_data))\` and obtains a test statistic of about $9.8$ on $1$ degree of freedom, with $p$-value $\approx 0.002$.

(a) State the null and alternative hypotheses of the test.
(b) What is the conclusion at the $5\%$ level?
(c) Should the student now (i) keep OLS standard errors, (ii) switch to robust standard errors, or (iii) re-estimate by WLS? Justify briefly.`, [], r`(a) $H_0$: homoskedasticity ($\gamma_1 = 0$ in the auxiliary regression of $\hat u^2$ on income); $H_1$: $\operatorname{Var}(u \mid \text{income})$ depends on income. (b) Reject $H_0$ at the $5\%$ level: the $p$-value is well below $0.05$. (c) At minimum, switch to robust SEs (option ii). WLS (option iii) is an option if the student is confident the variance is proportional to income; otherwise the robust route is safer.`);
push("6.13", r`Source: Alessio Gaggero, Econometrics I, section 7. Exercise 7.3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Goldfeld–Quandt by hand. Suppose for a regression of consumption on income you obtain $\operatorname{SSR}_{\text{low}} = 120$ on $\operatorname{df}_{\text{low}} = 28$ observations in the low-income subsample, and $\operatorname{SSR}_{\text{high}} = 540$ on $\operatorname{df}_{\text{high}} = 28$ in the high-income subsample. The $5\%$ critical value of $F_{28,28}$ is approximately $1.88$.

(a) Compute the Goldfeld–Quandt $F$ statistic.
(b) State your conclusion at the $5\%$ level.
(c) What economic story would explain a result of this kind?`, [], undefined, [r`Worked solution, not from the book.

(a) $F = (540/28) / (120/28) = 4.5$.

(b) $4.5 > 1.88$, so reject homoskedasticity at the 5% level.

(c) In this sample, consumption varies more, in absolute terms, among higher-income households than among lower-income households.`]);
push("6.14", r`Source: Alessio Gaggero, Econometrics I, section 7. Exercise 7.4. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Why the sandwich. Show that under homoskedasticity ($\Omega = \sigma^2 \mathbf{I}_n$), the sandwich variance

$$
(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\Omega\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}
$$

reduces to the usual OLS variance $\sigma^2(\mathbf{X}'\mathbf{X})^{-1}$. Use this to argue, in one paragraph, that the robust standard error is never worse asymptotically than the OLS standard error.`, [], undefined, [r`Worked solution, not from the book.

Under homoskedasticity, $\Omega = \sigma^2 \mathbf{I}_n$. Substitute that matrix into the sandwich:

$$(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'(\sigma^2 \mathbf{I}_n)\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1} = \sigma^2 (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1} = \sigma^2 (\mathbf{X}'\mathbf{X})^{-1}.$$

That is the usual OLS variance. The robust formula is valid when the variance is constant and when it is not, so asymptotically it is not worse than the OLS standard error, which is valid only under homoskedasticity.`]);
push("6.15", r`Source: Alessio Gaggero, Econometrics I, section 7. Exercise 7.5. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`WLS as transformed OLS. Take the SLR model $y_i = \beta_0 + \beta_1 x_i + u_i$ with $\operatorname{Var}(u_i \mid x_i) = \sigma^2 x_i$ (so $x_i > 0$).

(a) Write the transformed model after dividing by $\sqrt{x_i}$.
(b) Show that the error of the transformed model has constant variance equal to $\sigma^2$.
(c) Conclude that OLS on the transformed model is BLUE for $(\beta_0, \beta_1)$, and write down the equivalent WLS criterion in terms of weights $w_i$.`, [], undefined, [r`Worked solution, not from the book.

(a) Divide the model by $\sqrt{x_i}$:

$$\frac{y_i}{\sqrt{x_i}} = \beta_0 \frac{1}{\sqrt{x_i}} + \beta_1 \frac{x_i}{\sqrt{x_i}} + \frac{u_i}{\sqrt{x_i}}.$$

(b) $\operatorname{Var}(u_i/\sqrt{x_i} \mid x_i) = \operatorname{Var}(u_i \mid x_i)/x_i = (\sigma^2 x_i)/x_i = \sigma^2$.

(c) The transformed error is homoskedastic, so OLS on the transformed model is BLUE. The same estimator minimises $\sum_i (1/x_i)(y_i - \beta_0 - \beta_1 x_i)^2$, which is WLS with weights $w_i = 1/x_i$.`]);
push("7.12", r`Source: Alessio Gaggero, Econometrics I, section 8. Exercise 8.1. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Reading a Durbin–Watson statistic. A regression of quarterly retail sales on advertising spending and a time trend uses $n=80$ quarters and $k=2$ regressors. The OLS output reports $DW = 0.94$. The relevant 5 % bounds are $d_L = 1.59$, $d_U = 1.69$. State your conclusion and explain what it implies for the OLS $t$-statistics in the regression.`, [], r`Since $0 < DW < d_L$ (i.e. $0.94 < 1.59$), we reject $H_0:\rho=0$ in favour of $H_1:\rho>0$: there is positive first-order autocorrelation. The implied $\hat\rho \approx 1 - DW/2 = 0.53$. The OLS standard errors are therefore too small, the $t$-statistics inflated, and any "significant" coefficients should be re-tested using Cochrane–Orcutt or a Newey–West HAC variance estimator.`);
push("7.13", r`Source: Alessio Gaggero, Econometrics I, section 8. Exercise 8.2. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Sign of autocorrelation from a lag plot. A scatter of $\hat u_t$ against $\hat u_{t-1}$ shows a clear downward-sloping cloud, with most points in the upper-left and lower-right quadrants. What is the approximate sign of $\rho$? What would the DW statistic be approximately?`, [], r`Downward slope $\Rightarrow \hat\rho < 0$: negative autocorrelation. With (say) $\hat\rho \approx -0.5$ we have $DW \approx 2(1 - (-0.5)) = 3$, comfortably above 2.`);
push("7.14", r`Source: Alessio Gaggero, Econometrics I, section 8. Exercise 8.3. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`DW from a residual table. Using the small-sample example of §8.3.2, $\sum_{t=2}^{n}(\hat u_t - \hat u_{t-1})^2 = 18.796$ and $\sum_{t=1}^{n}\hat u_t^2 = 22.844$.

(a) Compute the DW statistic and the implied $\hat\rho$.
(b) For $n=10$, $k=1$, the 5 % bounds are $d_L = 0.879$, $d_U = 1.320$. What do you conclude?
(c) Briefly explain why the bounds depend on $n$ and $k$.`, [{ t: "num", a: "0.823", abs: 0.01, l: "(a) DW" }, { t: "num", a: "0.589", abs: 0.01, l: "(a) rho" }], r`(a) $DW = 18.796/22.844 \approx 0.823$, so $\hat\rho \approx 1 - DW/2 \approx 0.589$. (b) Since $DW < d_L$, reject $H_0$: positive autocorrelation. (c) The exact distribution of $DW$ depends on $\mathbf{X}'\mathbf{X}$; Durbin and Watson bracketed it with two bounds that depend only on $(n,k)$, leaving an inconclusive region.`);
push("7.15", r`Source: Alessio Gaggero, Econometrics I, section 8. Exercise 8.4. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Durbin's $h$. An OLS regression with $n=21$ produces
$$\widehat Y_t = 1.3 + 0.97\,Y_{t-1} + 2.31\,X_t, \qquad \mathrm{se}(\hat\alpha)=0.07,\qquad DW = 1.21.$$
Compute Durbin's $h$ statistic and decide whether the residuals are autocorrelated at the 5 % level. Why is $DW$ alone misleading here?`, [{ t: "num", a: "1.91", abs: 0.03, l: "h" }], r`$\hat\rho \approx 1 - 1.21/2 = 0.395$; $\widehat{\operatorname{Var}}(\hat\alpha) = 0.07^2 = 0.0049$;
$$h = 0.395 \sqrt{21/(1 - 21\cdot 0.0049)} \approx 1.91.$$
Critical value $z_{0.975}=1.96$; $|h|<1.96$, do not reject $H_0$. The plain DW reading of 1.21 is biased toward 2 (the null) because the regression contains $Y_{t-1}$; trusting DW would have falsely flagged autocorrelation.`);
push("7.16", r`Source: Alessio Gaggero, Econometrics I, section 8. Exercise 8.5. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`Why positive autocorrelation deflates OLS standard errors (sketch). In one short paragraph, explain — using the idea of effective sample size — why positive serial correlation makes the conventional OLS standard error of $\hat\beta_1$ in $y_t = \beta_0 + \beta_1 x_t + u_t$ too small. You do not need to derive a formula; an intuition based on the information content of $n$ correlated observations is enough.`, [], undefined, [r`Worked solution, not from the book.

Positive serial correlation means neighbouring errors move together, so $n$ observations carry less independent information than $n$ independent draws. The usual OLS standard error is built for independent errors and therefore treats the sample as more informative than it is. The reported standard error of $\hat\beta_1$ is too small.`]);
push("7.17", r`Source: Alessio Gaggero, Econometrics I, section 8. Exercise 8.6. CC BY 4.0. https://agaggero.github.io/econometrics-i/`, r`One-step Cochrane–Orcutt by hand. A small dataset has $\hat\rho = 0.4226$ obtained from the OLS residuals of $Y_t = \beta_0 + \beta_1 X_t + u_t$ on $n=10$ observations.

(a) Write down the formulas for the quasi-differenced variables $Y_t^*$, $X_t^*$ and the transformed constant term, including the Prais–Winsten treatment of $t=1$.
(b) Explain why the standard error of $\hat\beta_1$ computed on $(Y_t^, X_t^)$ is the one to report, while the OLS standard error from the original regression is not.
(c) After running OLS on $(Y_t^, X_t^)$ the new $DW$ statistic is $1.52$. With $n=9$, $k=1$, $d_L=0.824$, $d_U=1.320$, would you iterate again or stop?

A full answer is given in the Instructor Edition.`);
push("8.1", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 5.2.1. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`5.2.1 The variance of $b_1$

In chapter 3, we derived the variance of the estimator, $\bar y$. Similarly, $b_1$ is a random variable, since it is obtained from a formula involving the random sample $\{Y_i, X_i\}$, and it is common to consider the variance of a random variable. However, deriving the variance of the OLS estimator is too difficult for this course, and we simply write the result:

$$\operatorname{Var}[b_1] = \frac{\sigma_\epsilon^2}{\sum X_i^2 - \frac{(\sum X_i)^2}{n}}, \qquad (5.7)$$

where $\sigma_\epsilon^2$ is the variance of the error term $\epsilon$, $n$ is the sample size, and in the denominator we see something that looks like the sample variance of $X_i$. From equation 5.7, it can be seen that:

• $\operatorname{Var}[b_1]$ decreases as $n$ increases.
• $\operatorname{Var}[b_1]$ decreases as the sample variation in $X$ increases.
• $\operatorname{Var}[b_1]$ decreases as variation in $\epsilon$ decreases.

We want our estimator to have as low a variance as possible! A lower variance means that, on average, we have a higher probability of being close to the “rights answer” (provided the estimator is unbiased). These factors that lead to a lower $\operatorname{Var}[b_1]$ make sense:

• If we have more information (larger $n$), it should be “easier” to pick the right regression line.`);
push("8.2", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 5.5. Exercise 5.5, question 3. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`3. Using equation 5.7, explain why having a larger sample is better.`, [], r`Using equation 5.7, we just need to see that as $n$ increases, the variance of the OLS estimator decreases.`);
push("8.3", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 5.5. Exercise 5.5, question 4. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`4. Explain what $s.e.[b_1]$ is.`, [], r`In order to perform hypothesis testing, an estimate for the variance of the OLS estimator is required. If equation 5.7 is to be used in practice, we must replace the unknown $\sigma_\epsilon^2$ with the estimator $s_\epsilon^2 = \sum e_i^2 /(n - 2)$. When we take the square-root of this quantity, it is called the standard error of $b_1$ (or $s.e.[b_1]$ for short). That is,

$$s.e.[b_1] = \sqrt{\frac{s_\epsilon^2}{\sum X_i^2 - \frac{(\sum X_i)^2}{n}}}.$$`);
push("8.4", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 5.5. Exercise 5.5, question 2. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`2. Using diagrams, explain why $0 \le R^2 \le 1$.`, [], r`This question is answered by considering two extreme cases: (i) the $X$ variable has no explanatory power, and (ii) the $X$ variable can perfectly explain $Y$. (i) is a situation of “no fit”, drawn in figure 5.3, and would occur if $b_1 = 0$. In this situation, each OLS predicted value will be equal to $\bar Y$, so $ESS$ will equal 0, and so $R^2$ will also equal 0. (ii) is a situation of “perfect fit”, drawn in figure 5.4. All data points are on the estimated regression line. $ESS = TSS$, $RSS = 0$, and so $R^2 = 1$.`, undefined, [{ src: "econ345/p-056.png", cap: "Figure 5.3: The estimated regression line is essentially flat: b1 = 0. Observed changes in X are not at all helpful in predicting changes in Y. There is “no fit”, and R2 = 0.00." }, { src: "econ345/p-057.png", cap: "Figure 5.4: The estimated regression line exactly passes through each data point. Observed changes in X perfectly predict changes in Y. There is “perfect fit”, and R2 = 1." }]);
push("8.5", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 4.7. Exercise 4.7, question 1(a). CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`1. Let the sample data be $Y = \{5, 2, 2, 3\}$ and $X = \{5, 3, 5, 3\}$.

a) Write down the population model.`, [], r`The assumed population model is $Y_i = \beta_0 + \beta_1 X_i + \epsilon_i$. It is assumed that the $X$ variable “causes” the $Y$ variable. The $Y$ and $X$ data has been given to us. $\beta_0$ and $\beta_1$ are unknown parameters to be estimated. $\epsilon$ represents all the other factors (or variables) that cause $Y$ but that are unobserved.`);
push("8.6", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 4.7. Exercise 4.7, question 1(c). CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`1. Let the sample data be $Y = \{5, 2, 2, 3\}$ and $X = \{5, 3, 5, 3\}$.

c) Interpret these estimates.`, [], r`$b_1$ is the estimated slope, or marginal effect. Numerically, the values $b_1 = 0.5$ means that it is estimated that when $X$ increases by 1, $Y$ will increase by 0.5. $b_0$ is the estimated intercept. Numerically, when $X$ is 0, it is estimated that $Y$ is 1.`);
push("8.7", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 4.7. Exercise 4.7, question 3. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`3. Explain why, even if assumption A.6 does not hold, the OLS estimator may still be normally distributed.`, [], r`If assumption A.6 holds, then the OLS estimators will be Normally distributed. This is because, by the population model (equation 4.4), $Y$ is a linear function of $\epsilon$, hence $Y$ is also Normally distributed. Furthermore, because $b_1$ and $b_0$ are linear functions of $Y$, they are also Normally distributed.

However, even without A.6, the OLS estimator may still be Normally distributed. This is again due to the central limit theorem. Look again at the formula for the OLS estimator (equation 4.10) and note the summation sign. Since the OLS estimator involves summing the random variable $Y$, as long as the sample size is large enough, the resulting sum should be Normally distributed.`);
push("8.8", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 6.6. Exercise 6.6, question 1. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`1. Explain why the estimated value for $\beta_1$ changes so much between the equations:

$$Price = \beta_0 + \beta_1 Fireplaces + \epsilon$$

and

$$Price = \beta_0 + \beta_1 Fireplaces + \beta_2 Living.Area + \epsilon$$`, [], r`The estimated value changes so much due to omitted variable bias. Living.Area is an important determination of house price, and is correlated with Fireplaces (larger houses have more fireplaces). The effect of house size is “channeling” through the number of fireplaces. The omission of Living.Area is causing the OLS estimator in the first equation to be biased (and inconsistent).`);
push("8.9", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 6.6. Exercise 6.6, question 3. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`3. Explain how the OLS estimators, $b_0, b_1, \ldots, b_k$, are derived in the multiple regression model. (Explain how the equations for $b_0, b_1, \ldots, b_k$ are obtained.)`, [], r`The OLS estimators in the multiple regression model are derived similarly to how they were in chapter 4. $b_0, b_1, \ldots, b_k$ are chosen so as to minimize the sum of squared residuals. Solving for $b_0, b_1, \ldots, b_k$ involves solving a calculus minimization problem.`);
push("8.10", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 6.6. Exercise 6.6, question 7. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`7. Explain what imperfect multicollinearity is, and how it poses a problem for OLS estimation.`, [], r`Imperfect multicollinearity is when two (or more) variables are highly correlated. In this situation, OLS can be imprecise (have high variance) because it is difficult to tell which of the two correlated variables is causing the change in $Y$. The problem of imperfect multicollinearity shows up in large standard errors and confidence intervals, and large swings in the estimated $\beta$s as the affected variables are added to and dropped from the model.`);
push("8.11", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 6.6. Exercise 6.6, question 8. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`8. Why does $R^2$ always increase when a variable is added to the model?`, [], r`The $b$s in OLS are chosen so as to minimize the sum of squared residuals. When a variable is added to the model, a $b$ is added to the minimization problem, giving one more way to minimize $RSS$. So, $RSS$ must decrease (or possibly stay the same) when another $b$ is added. By the formula for $R^2$, it can easily be seen that $R^2$ must increase.`);
push("8.12", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 6.6. Exercise 6.6, question 9. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`9. Explain where the $(n - k - 1)$ and $(n - 1)$ terms in $\bar R^2$ come from.`, [], r`The justification for the $(n - k - 1)$ and $(n - 1)$ terms are due to degrees-of-freedom. The amount of information in the $RSS$ statistic is $(n - k - 1)$ since $k + 1$ $\beta$s must first be estimated by OLS. In the $TSS$ statistic, one thing must be estimated first ($\bar Y$), so the amount of information left over is $(n - 1)$.`);
push("8.13", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 6.6. Exercise 6.6, question 10. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`10. An estimated model with two $X$ variables, and from a sample size of $n = 27$, yields $R^2 = 0.5882$. Calculate $\bar R^2$.`, [{ t: "num", a: "0.5539", abs: 0.001, l: "adjusted R2" }], r`$$R^2 = 1 - \frac{RSS}{TSS} = 0.5882$$

$$\frac{RSS}{TSS} = 1 - R^2 = 1 - 0.5882 = 0.4118$$

$$\bar R^2 = 1 - \frac{RSS/(n-k-1)}{TSS/(n-1)} = 1 - 0.4118\left(\frac{n-1}{n-k-1}\right) = 1 - 0.4118\left(\frac{26}{24}\right) = 0.5539$$`);
push("8.14", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 10.3. Exercise 10.3, question 2. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`2. Provide an example of heteroskedasticity using data from another chapter.`, [], r`There are many examples throughout the book (heteroskedasticity is quite common). You could use White’s test on any of the models that we have estimated, or you can point out how the data in a scatterplot seems to be differently dispersed depending on the value of the x-axis.`);
push("8.15", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 10.3. Exercise 10.3, question 5. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`5. Explain the basic idea behind testing for heteroskedasticity. What are the null and alternative hypotheses?`, [], r`The null hypothesis is homoskedasticity, and the alternative is heteroskedasticity. The strategy is to estimate the model as usual. Get the residuals. Then do an auxiliary (extra) regression, using the squared residuals as the y variables, and all the x variables, their squares, and their cross products, as regressors. If the $R^2$ from this extra regression is high enough, that means that the size of the residuals can be explained using $x$, and the null is rejected.`);
push("8.16", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 11.6. Exercise 11.6, question 4. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`4. What is two-stage-least-squares (2SLS)?`, [], r`2SLS is another name for “instrumental variables estimation”. It is the procedure for using an instrumental variable to get a consistent estimators for the $\beta$ in our models.`);
push("8.17", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 11.6. Exercise 11.6, question 5. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`5. What is the 2SLS procedure?`, [], r`In the first stage, the “problem” $X$ variable is regressed on the instrument and other $X$ variables, and the LS predicted values from this regression are obtained (the $\hat X$). In the second stage, the $\hat X$ are used in place of $X$ in the population model.`);
push("8.18", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 11.6. Exercise 11.6, question 6. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`6. Why does IV estimation work?`, [], r`IV estimation works because the instrument, which is uncorrelated to the missing variable, is used to predict the “problem” $X$ variables. Those predicted values, $\hat X$, are now uncorrelated with the missing variable. Using $\hat X$ instead of $X$ gives an estimator that is consistent.`);
push("9.1", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 12.1–12.2. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`12.1 The problem

Hopefully by now you are learning the nature of the beast. Correlations in (observational) economics data are almost never causal effects. The variables in our data set are endogenous; chosen by people who are trying their best. If we had the right control variable ($x$) we could solve the problem by including it in our model, but the right $x$ is often missing.

The consequence of missing an important control variable leads the LS estimator of the effect of $x$ on $y$ to be biased an inconsistent. That means that we can’t call the estimated $\beta$ the true causal effect of $x$ on $y$. Economists must carefully tease out the causal effects from correlations using tricks and cleverness.

This chapter introduces just such another trick for dealing with the missing variable problem.

In panel data and fixed effects estimation, we usually rephrase the missing variable problem, calling it instead unobserved heterogeneity.

Unobserved heterogeneity means that people are different, and that some of these differences are unobserved. These differences could be things like ability - the missing variable that determines both wages and education, and that we dealt with using the distance from college instrument in the IV chapter. Unobserved heterogeneity can also apply to countries, firms, and other observational units.

If we can observe the same units of observations (e.g. individuals or countries) repeatedly over time, then we can solve this unobserved heterogeneity problem, using the panel data and the fixed effects estimator (also called the within estimator).

12.2 What is panel data?

“Panel data” is a data set where we observe the same observational units (individuals, countries) repeatedly over time. Each “panel” represents a moment in time, a snapshot of all the individuals in the sample. Then, this panel of information is repeated over time, with some or all of the values of the variables changing in each panel.

A panel data set can be arranged by horizontally “stacking” another set of observations for a new time period (think of adding another set of $n$ observations at the bottom of the data set for each time period, but the units of observation in each stack are the same). See Figure 12.1. A more common way of arranging panel data, however, is to stack all years of data for an individual together, before moving on to the next observation. See Figure 12.2.

In a panel data set we have $n \times T$ observations. $n$ are the number of individuals, and $T$ are the number of time periods over which these individuals are observed.`, [], undefined, undefined, [{ src: "econ345/p-135.png", cap: "Figure 12.1: Exports (y variable) from Manitoba to other provinces and territories. The higher the GDP (x variable) in the destination, the higher the trade. The greater the distance (another x variable), the lower the trade. Each i is a different trading partner, and each t is a different year." }, { src: "econ345/p-136.png", cap: "Figure 12.2: A more common way of arranging panel data." }]);
push("9.2", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 12.3. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`12.3 The population model, over time

We need to bring back the subscripts in our notation of the population model, and add a $t$:

$$y_{it} = \beta_0 + \beta_1 x_{1,it} + \beta_2 x_{2,i} + m_i + \epsilon_{it},$$

• $m_i$ is the effect the missing variable has on $y_{it}$.
• $m_i$ has an $i$ subscript, but no $t$ subscript. This means that it varies by individual, but not over time.
• $m_i$ is called unobserved heterogeneity because it accounts for differences in each person.
• Notice that $y_{it}$ and $x_{1,it}$ evolve over time, but $m_i$ and $x_{2,i}$ do not. $x_{2,i}$ will end up being useless to us when we do fixed effects estimation.

If the missing variable $m_i$ does not vary over time, but if the $y_{it}$ and $x_{it}$ variables do vary over time, then we can use a trick to solve the missing variable (unobserved heterogeneity) problem. $y_{it}$ could be an individuals wages, for example, and $x_{it}$ could be some economic policy or some choice that people are making, that changes over time.

Some examples of $m_i$ (unobserved heterogeneity) that we will be able to deal with, are:

• gender
• race
• ability

These are things that are specific to each individual, but that (usually) do not vary over time. If these things are unobserved, we can solve the problem using the fixed effects estimator!`);
push("9.3", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 12.3.2. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`12.3.2 Marriage and wages

As another example, let’s looking at the long standing observation that married individuals make higher wages than single individuals. That is, we observe a positive correlation between marriage and wages. Does marriage cause wages? What could be some possible explanations for this association?

$$wage_{it} = \beta_0 + \beta_1 marriage_{it} + \beta_2 x_{it} + \beta_3 x_i + ability_i + \epsilon_{it},$$

• $wage_{it}$ and $marriage_{it}$ are the workers’ wages and marital status over time.
• We also have some time-varying controls ($x_{it}$ - things like the amount of time worked that year) and some time invariant controls ($x_i$ - like gender or race). It turns out that the $x_i$ variable can’t be used; it will disappear when we make the missing $ability_i$ variable cancel out.
• $ability_i$ is a missing variable that determines wage.
• We can’t estimate $\beta_1$ and call it the causal effect of marriage on wage. Why?

Individuals with higher ability are more likely to get married, and to have higher wages. Marriage just might be an indicator for a higher ability person, which is the true cause for higher wages (much like how fireplaces indicated a bigger house). Without some trick, we can’t get an unbiased and consistent estimator for the effect of marriage on wages using LS.`);
push("9.4", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 12.4–12.4.1. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`12.4 The within estimator

We can use panel data to solve the missing variable problem (and other problems of endogeneity), by using the within, also called the fixed effects, estimator. Let’s rewrite a simple population model with the missing variable:

$$y_{it} = \beta_0 + \beta_1 x_{it} + m_i + \epsilon_{it}, \qquad (12.1)$$

• What happens if something doesn’t change over time, and you take it’s average over time?
• How can we get rid of (subtract) the missing variable (the individual heterogeneity)?

The trick to fixed effects estimation involves taking the averages of the variables over time. That is, we’re going to take each person’s wage, and average it over the time in which they are observed. Let’s define these time-averages:

$$\bar y_i \equiv \frac{1}{T}\sum_{t=1}^{T} y_{it}; \qquad \bar x_i \equiv \frac{1}{T}\sum_{t=1}^{T} x_{it}$$

• If we could see the missing variable (we can’t), what would be it’s average over time? Does it change?
• What about $\beta_0$ and $\beta_1$?
• What about the error term?

$$\frac{1}{T}\sum_{t=1}^{T} m_i = m_i; \qquad \frac{1}{T}\sum_{t=1}^{T} \beta_0 = \beta_0; \qquad \frac{1}{T}\sum_{t=1}^{T} \beta_1 = \beta_1; \qquad \frac{1}{T}\sum_{t=1}^{T} \epsilon_{it} = \bar\epsilon_i$$

So anything that is constant over time, is the same as it’s average over time. Let’s instead write the population model (equation 12.1) in terms of the over-time-averages (note that the $\beta$ are the same in both equations):

$$\bar y_i = \beta_0 + \beta_1 \bar x_i + m_i + \bar\epsilon_i \qquad (12.2)$$

Can you see a way to delete the missing variable? Subtract (12.2) from (12.1)!

$$(y_{it} - \bar y_i) = (\beta_0 - \beta_0) + (\beta_1 x_{it} - \beta_1 \bar x_i) + (m_i - m_i) + (\epsilon_{it} - \bar\epsilon_i)$$

$$(y_{it} - \bar y_i) = (\beta_1 x_{it} - \beta_1 \bar x_i) + (\epsilon_{it} - \bar\epsilon_i)$$

$$\ddot y_{it} = \beta_1 \ddot x_{it} + \ddot\epsilon_{it}$$

The $\ddot y_{it}$ and $\ddot x_{it}$ are called time demeaned variables. They only use variation within each individual. Estimating the model using time demeaned variables solves the unobserved heterogeneity problem.

12.4.1 Time-demeaning deletes the unobserved heterogeneity

• When we subtract the time-averages (time demeaned variables) from both sides of the equation, we are deleting the unobserved heterogeneity (missing variable).
• Note that any individual characteristics that are time invariant, such as race, gender, etc., will also be deleted from the regression (as is the intercept $\beta_0$). That is why $x_i$ can’t be used as a control, only $x_{it}$.`);
push("9.5", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 12.6. Exercise 12.6, question 1. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`1. What is panel data?`);
push("9.6", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 12.6. Exercise 12.6, question 2. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`2. What is unobserved heterogeneity?`);
push("9.7", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 12.6. Exercise 12.6, question 3. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`3. What kind of problem does the fixed effects estimator solve?`);
push("9.8", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 12.6. Exercise 12.6, question 4. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`4. How is a variable time demeaned?`);
push("9.9", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 12.6. Exercise 12.6, question 5. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`5. Using the “regular” population model with a missing variable, and the time demeaned population model, show how to “delete” the missing variable and solve the unobserved heterogeneity problem.`);
push("9.10", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 12.6. Exercise 12.6, question 6. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`6. What is the “within estimator”?`);
push("9.11", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 12.6. Exercise 12.6, question 7. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`7. Write down a population model with individual fixed effects. Explain what the fixed effects are.`);
push("10.1", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 2.6. Exercise 2.6, question 4. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`4. Can the mean of a random variable be a value that is not in the sample space?`, [], r`Yes. For example, the expected value of a die roll is 3.5, while the sample space is {1, 2, 3, 4, 5, 6}.`);
push("10.2", r`Source: Ryan T. Godwin, Introduction to Econometrics, section 2.6. Exercise 2.6, question 8. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf`, r`8. Suppose that $Z$ is a standard Normal random variable.

(a) What is the distribution for $Y$, where $Y = 2 \times Z + 1$?
(b) What is the distribution for $Z^2$?`, [], r`(a) Multiplying by a constant, or adding a constant, does not change the Normality of a variable. So, $Y$ will be Normally distributed (with mean of 1, and variance of 4).

(b) If a Normal variable is squared, it becomes Chi-square distributed. So, $Z^2 \sim \chi^2$.`);
export { EXTRA };

import type { Card, Field } from "../../engine";

const r = String.raw;
const ADDED: Card[] = [];

function push(id: string, ctx: string, q: string, f: Field[] = [], bk?: string, sol?: string[], figs?: { src: string; cap: string }[]): void {
  const c: Card = { id, q, f, h: "", src: bk || f.length > 0 ? "b" : "n", ctx };
  if (bk) c.bk = bk;
  if (sol) c.sol = sol;
  if (figs) c.figs = figs;
  ADDED.push(c);
}

const G = "Source: Alessio Gaggero, Econometrics I. CC BY 4.0. https://agaggero.github.io/econometrics-i/";
const E1 = "Source: Ryan T. Godwin, Econometrics I. CC BY-NC-SA 4.0. https://rtgodwin.com/econometrics1.pdf";
const GI = "Source: Ryan T. Godwin, Introduction to Econometrics. CC BY-NC-SA 4.0. https://rtgodwin.com/introeconometrics.pdf";
const H = "Source: Christoph Hanck, Martin Arnold, Alexander Gerber, and Martin Schmelzer, Introduction to Econometrics with R. CC BY-NC-SA 4.0. https://www.econometrics-with-r.org/";
const KI = "Source: David M. Kaplan, Introductory Econometrics. CC BY-NC-SA 4.0. https://kaplandm.github.io/Kaplan_Intro_Econometrics_text.pdf";
const KQ = "Source: David M. Kaplan, Econometrics, Distributional and Nonparametric. CC BY-NC-SA 4.0. https://kaplandm.github.io/Kaplan_dist_np_text.pdf";
const RD = "Source: Wessel N. van Wieringen, Lecture notes on ridge regression. CC BY-NC-SA 4.0. https://arxiv.org/pdf/1509.09169";

push("g1q3", G + " Chapter 1, self-check Q3.", r`Q3. Correlation and causation

A positive correlation between ice-cream sales and sunburn cases means that:

A. Ice cream causes sunburn.
B. Sunburn causes ice-cream sales.
C. The two move together, but the association may be driven by a third factor such as hot weather.
D. There is a mistake in the data.`, [{ t: "mc", a: 2, o: [r`Ice cream causes sunburn.`, r`Sunburn causes ice-cream sales.`, r`The two move together, but the association may be driven by a third factor such as hot weather.`, r`There is a mistake in the data.`] }], r`Answer: C. The two variables move together because a lurking third factor --- summer heat --- drives both. Correlation alone says nothing about causation.`);

push("g21", G + " Exercise 2.1.", r`Exercise 2.1. Reading a fitted equation. A regression on 1,000 workers gives the fitted line $\widehat{\text{Wage}} = 800 + 15 \times \text{Education}$, where wage is in euros per month and education is in years.

(a) Interpret $\hat\beta_0$ and $\hat\beta_1$ in words.
(b) What is the predicted wage of a worker with 12 years of schooling?
(c) Two workers differ by 4 years of schooling. By how much do their predicted wages differ?
(d) Why should you be wary of the prediction at educ = 0?`, [{ t: "num", a: "980", l: "(b) predicted wage" }, { t: "num", a: "60", l: "(c) difference" }], r`(a) $\hat\beta_0 = 800$ is the predicted wage at educ = 0 (800 €/month). $\hat\beta_1 = 15$ is the predicted increase in monthly wage per extra year of schooling.
(b) $800 + 15 \times 12 = 980$ €/month.
(c) $4 \times 15 = 60$ €/month.
(d) Because educ = 0 is far below the lowest value in any realistic schooling sample --- the prediction is an extrapolation and may be unreliable.`);

push("fitread", GI + " Section 4.4, pp. 46–48.", r`4.4 The estimated model

Our primary goal is to estimate $\beta_1$ (the marginal effect of $X$ on $Y$), but to do so we’ll also have to estimate $\beta_0$. This estimated intercept and slope will define a straight line. These estimates will be denoted $b_0$ and $b_1$, the OLS intercept and slope.

Let’s start with a very simple example using data that I made up: $Y = \{1, 4, 5, 4\}$, $X = \{2, 4, 6, 8\}$. The data, and estimated OLS line, are shown in figure 4.4. The OLS estimated intercept is $b_0 = 1$, and the estimated slope is $b_1 = 0.5$.

4.4.1 OLS predicted values ($\hat Y_i$)

The OLS predicted (or fitted) values, are the values for $Y$ that we get when we “plug” the $X$ values back into the estimated OLS line. These predicted $Y$ values are denoted by $\hat Y$. We can find each predicted value, $\hat Y_i$, by plugging each $X_i$ into the estimated equation.

In general, the estimated equation (or line) is written as:

$$\hat Y_i = b_0 + b_1 X_i. \qquad (4.5)$$

4.4.2 OLS residuals ($e_i$)

An OLS predicted value tells us what the estimated model predicts for $Y$ when given a particular value of $X$. The differences between the two are the OLS residuals. The OLS residuals are like prediction errors, and are determined by:

$$e_i = Y_i - \hat Y_i \qquad (4.6)$$`, [], undefined, undefined, [
  { src: "econ345/p-046.png", cap: "Figure 4.4: A simple data set with the estimated OLS line in blue. b0 is the OLS intercept, and b1 is the OLS slope." },
  { src: "econ345/p-047.png", cap: "Figure 4.5: The OLS predicted values shown by ×." },
  { src: "econ345/p-048.png", cap: "Figure 4.6: The OLS residuals (ei) are the vertical distances between the actual data points (circles) and the OLS predicted values (×)." },
]);

push("fitex", GI + " Section 4.4.", r`For our simple example, equation 4.5 becomes $\hat Y_i = 1 + 0.5 X_i$, and each OLS predicted value is found from $Y = \{1, 4, 5, 4\}$ and $X = \{2, 4, 6, 8\}$.

Using equation 4.6, each OLS residual is $e_i = Y_i - \hat Y_i$.`, [{ t: "num", a: "2", l: r`$\hat Y_1$` }, { t: "num", a: "-1", l: r`$e_1$` }], r`$\hat Y_1 = 1 + 0.5(2) = 2$

$\hat Y_2 = 1 + 0.5(4) = 3$

$\hat Y_3 = 1 + 0.5(6) = 4$

$\hat Y_4 = 1 + 0.5(8) = 5$

$e_1 = 1 - 2 = -1$

$e_2 = 4 - 3 = 1$

$e_3 = 5 - 4 = 1$

$e_4 = 4 - 5 = -1$`);

push("derivread", GI + " Section 4.5.", r`To solve this minimization problem, we take the partial derivatives of $\sum_{i=1}^{n} e_i^2$ with respect to $b_0$ and $b_1$, set those derivatives equal to zero, and solve for $b_0$ and $b_1$. We leave the derivation for an exercise, and only write the solution here:

$$b_1 = \frac{\sum_{i=1}^{n} (Y_i - \bar Y)(X_i - \bar X)}{\sum_{i=1}^{n} (X_i - \bar X)^2} \qquad (4.10)$$

$$b_0 = \bar Y - b_1 \bar X$$`);

push("ce", GI + " Section 2.4.7, p. 23.", r`What is $E[Y]$? It is 0.77. This means there is a 77% chance you will have a midterm. $E[Y]$ is an unconditional expectation; it is the mean of $Y$ before you look out the window in the morning and see if there is a blizzard. The conditional expectations, however, are $E[Y \mid X = 1] = 0.20$ and $E[Y \mid X = 0] = 0.96$. This means there is only a 20% chance of a midterm if you see a blizzard in the morning, but a 96% chance with no blizzard.

Table 2.1: Joint distribution for snow and a canceled midterm.

[table]
 | Midterm (Y = 1) | No midterm (Y = 0)
Blizzard (X = 1) | 0.05 | 0.20
No blizzard (X = 0) | 0.72 | 0.03
[/table]`);

push("covq", GI + " Section 2.6, question 2, and section 2.7.", r`2. The joint probability function for $X$ and $Y$ is:

$X = 1$: probability 0.25 at $Y = -1$, 0 at $Y = 0$, and 0.25 at $Y = 1$.
$X = -1$: probability 0 at $Y = -1$, 0.5 at $Y = 0$, and 0 at $Y = 1$.

(a) What is the $\operatorname{Cov}(X, Y)$?
(b) Are $X$ and $Y$ independent?`, [{ t: "num", a: "0", l: "(a) covariance" }], r`(a) $\operatorname{Cov}(X, Y) = E[(X - \mu_X)(Y - \mu_Y)]$. The means are $\mu_X = 0.5(1) + 0.5(-1) = 0$ and $\mu_Y = 0.25(-1) + 0.5(0) + 0.25(1) = 0$. Then $\operatorname{Cov}(X, Y) = E[XY] = 0.25(1)(-1) + 0.5(-1)(0) + 0.25(1)(1) = 0$.
(b) Even though the covariance is 0, $X$ and $Y$ are not independent. If we observe $Y = -1$ or $Y = 1$, then $X = 1$. If we observe $Y = 0$, then $X = -1$. Covariance measures linear association.`);

push("g2a", G + " Chapter 2, Gauss–Markov assumptions for SLR.", r`The five Gauss--Markov assumptions for SLR are the bedrock of the rest of this chapter.

SLR.1 --- Linearity in parameters. The population model can be written as

$$y = \beta_0 + \beta_1 x + u,$$

where $\beta_0$ and $\beta_1$ are the unknown parameters and $u$ is the unobservable disturbance.

SLR.2 --- Random sampling. We have a random sample $\{(x_i, y_i) : i = 1, \ldots, n\}$ drawn from the population in SLR.1.

SLR.3 --- Sample variation in $x$. The sample values $x_1, x_2, \ldots, x_n$ are not all the same, i.e. $\sum_{i=1}^{n}(x_i - \bar x)^2 > 0$.

SLR.4 --- Zero conditional mean. The error has expected value zero given any value of $x$:

$$\mathbb{E}[u \mid x] = 0.$$

SLR.5 --- Homoskedasticity. The error variance is constant in $x$:

$$\operatorname{Var}(u \mid x) = \sigma^2.$$

SLR.1--SLR.3 are technical conditions that make the estimator well-defined. SLR.4 is what makes the estimator unbiased and lets us interpret $\beta_1$ as a ceteris paribus effect. SLR.5 is needed only for the variance formula and the Gauss--Markov efficiency result, not for unbiasedness.`);

push("g2q2", G + " Chapter 2, self-check Q2.", r`Q2. The zero-conditional-mean assumption

The assumption $\mathbb{E}[u \mid x] = 0$ implies:

A. The error $u$ is normally distributed.
B. $\operatorname{Var}(u \mid x)$ is constant in $x$.
C. $\mathbb{E}[u] = 0$ and $\operatorname{Cov}(x, u) = 0$.
D. $x$ is measured without error.`, [{ t: "mc", a: 2, o: [r`The error $u$ is normally distributed.`, r`$\operatorname{Var}(u \mid x)$ is constant in $x$.`, r`$\mathbb{E}[u] = 0$ and $\operatorname{Cov}(x, u) = 0$.`, r`$x$ is measured without error.`] }], r`Answer: C. Zero conditional mean implies both an unconditional mean of zero (by iterated expectations) and zero covariance between $x$ and $u$. B is the separate homoskedasticity assumption SLR.5.`);

push("g2gm", G + " Chapter 2, the Gauss–Markov theorem.", r`Under SLR.1--SLR.5, conditioning on the regressors:

$$\operatorname{Var}(\hat\beta_1 \mid \mathbf{x}) = \frac{\sigma^2}{\sum_{i=1}^{n}(x_i - \bar x)^2} = \frac{\sigma^2}{\mathrm{SST}_x}.$$

The single most important "why use OLS?" result is the Gauss--Markov theorem.

Under SLR.1--SLR.5, the OLS estimators $\hat\beta_0$ and $\hat\beta_1$ are the Best Linear Unbiased Estimators (BLUE) of $\beta_0$ and $\beta_1$.

"Best" means minimum variance in the class of all estimators that are (i) linear in $y$ and (ii) unbiased for $\beta$.

The Gauss--Markov theorem does not say that OLS is the best estimator in some absolute sense. It says: among linear, unbiased estimators, OLS has minimum variance. There may well be biased estimators (ridge, LASSO) or nonlinear estimators (quantile regression) with lower mean squared error in particular settings.`);

push("g2q6", G + " Chapter 2, self-check Q6.", r`Q6. Precision of $\hat\beta_1$

Which of the following increases the precision of $\hat\beta_1$ (smaller sampling variance)?

A. A larger error variance $\sigma^2$.
B. A smaller sample size.
C. Less variation in $x$.
D. More variation in $x$ (larger $\mathrm{SST}_x$).`, [{ t: "mc", a: 3, o: [r`A larger error variance $\sigma^2$.`, r`A smaller sample size.`, r`Less variation in $x$.`, r`More variation in $x$ (larger $\mathrm{SST}_x$).`] }], r`Answer: D. The variance formula is $\operatorname{Var}(\hat\beta_1 \mid \mathbf{x}) = \sigma^2 / \mathrm{SST}_x$. Larger $\mathrm{SST}_x$ shrinks the variance.`);

push("g2q5", G + " Chapter 2, self-check Q5.", r`Q5. Unbiasedness vs. BLUE

Under SLR.1--SLR.4 only (no homoskedasticity), OLS is:

A. Unbiased: $\mathbb{E}[\hat\beta_j] = \beta_j$.
B. The Best Linear Unbiased Estimator (BLUE).
C. Consistent but biased.
D. Normally distributed.`, [{ t: "mc", a: 0, o: [r`Unbiased: $\mathbb{E}[\hat\beta_j] = \beta_j$.`, r`The Best Linear Unbiased Estimator (BLUE).`, r`Consistent but biased.`, r`Normally distributed.`] }], r`Answer: A. Unbiasedness needs only SLR.1--SLR.4. Adding SLR.5 (homoskedasticity) is what upgrades OLS to BLUE via the Gauss--Markov theorem.`);

push("g22", G + " Exercise 2.2.", r`Exercise 2.2. Algebra of OLS, by hand. Consider the toy data $x = (1, 2, 3, 4, 5)$ and $y = (3, 4, 2, 5, 6)$.

(a) Compute $\bar x$ and $\bar y$.
(b) Compute $\hat\beta_1$.
(c) Compute $\hat\beta_0$.`, [{ t: "num", a: "0.7", l: r`(b) $\hat\beta_1$` }, { t: "num", a: "1.9", l: r`(c) $\hat\beta_0$` }], r`(a) $\bar x = 3$, $\bar y = 4$.
(b) Numerator $\sum (x_i - \bar x)(y_i - \bar y) = 7$. Denominator $\sum (x_i - \bar x)^2 = 10$. So $\hat\beta_1 = 7/10 = 0.7$.
(c) $\hat\beta_0 = \bar y - \hat\beta_1 \bar x = 4 - 0.7 \times 3 = 1.9$.`);

push("a5", G + " Appendix A.5.", r`The rank of a matrix is the number of linearly independent columns (equivalently, of linearly independent rows). A square $k\times k$ matrix is invertible if and only if it has full rank $k$. For the data matrix $\mathbf{X}$ of dimension $n \times k$, the condition $\operatorname{rank}(\mathbf{X}) = k$ is the no perfect multicollinearity assumption (Wooldridge's MLR.3): no column of $\mathbf{X}$ is an exact linear combination of the others. When this fails, $\mathbf{X}'\mathbf{X}$ is singular and OLS cannot be computed.

Perfect multicollinearity (for example including both a dummy for male and a dummy for female plus an intercept --- the dummy-variable trap) makes OLS literally impossible to compute. Near multicollinearity (highly but not perfectly correlated regressors) is a different beast: the estimator still exists, but its variance becomes large.`);

push("writex", E1 + " Section 3.7, exercise 2.", r`2. Suppose the population model is:

$$y_i = \beta_1 + \beta_2 x_i + \epsilon_i$$

The $y$ and $x$ variables are $y = (-1,\ 2,\ 5)$ and $x = (1,\ 2,\ 3)$.`, [], r`Answer. The full $X$ matrix is
$$X = \begin{pmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{pmatrix}.$$`);

push("handb", E1 + " Section 3.7, exercise 2.", r`2. Suppose the population model is $y_i = \beta_1 + \beta_2 x_i + \epsilon_i$. The $y$ and $x$ variables are $y = (-1,\ 2,\ 5)$ and $x = (1,\ 2,\ 3)$.

Calculate the OLS estimators for $\beta_1$ and $\beta_2$.`, [{ t: "num", a: "-4", l: r`intercept $b_1$` }, { t: "num", a: "3", l: r`slope $b_2$` }], r`Answer.
$$b = \begin{pmatrix} -4 \\ 3 \end{pmatrix}.$$`);

push("fwl", E1 + " Section 4.3.5, the Frisch–Waugh–Lovell theorem.", r`The FWL theorem suggests that the LS estimates for $\beta_2$ in a partitioned model can be obtained through the following steps:

(i) Regress $X_2$ on $X_1$, get the residuals ($M_1 X_2$).
(ii) Regress $y$ on $X_1$, get the residuals ($M_1 y$).
(iii) Regress the residuals from (ii) onto (i).

Hence, $b^\star_2 = b_2$.`);

push("gmq", E1 + " Section 5.3 and exercise 5.4, question 5. The book prints the answer.", r`The LS estimator is the Best Linear Unbiased estimator (BLUE) of $\beta$.

Questions in the text:

1. What assumptions did we use, and where?
2. Were there any standard assumptions that we didn’t use?
3. What does this suggest?

Exercise. Explain the result of the Gauss-Markov theorem, and why it is important.`, [], r`The Gauss-Markov theorem states that $V(\hat\beta) - V(b)$ is a positive-semi-definite matrix, where $\hat\beta$ is any linear and unbiased estimator for $\beta$ and $b$ is the LS estimator. That is, the LS estimator has the lowest variance out of the entire class of linear and unbiased estimators for $\beta$. This is important because there are many such possible estimators. The G-M theorem explains a reason why LS might be the “best” choice among them.`);

push("e1rand", E1 + " Section 5.4, exercise 1. The book prints the answer.", r`Explain why the LS estimator is a random variable.`, [], r`Answer. $b$ is a linear function of $y$, and $y$ is a linear function of $\epsilon$. Since $\epsilon$ is random, so is $b$.`);

push("endog", E1 + " Section 5.4, exercise 6. The book prints the answer.", r`Suppose that we have our usual linear model $y = X\beta + \epsilon$, but that we partition the $X$ matrix and $\beta$ vector and write the model as

$$y = X_1\beta_1 + X_2\beta_2 + \epsilon.$$

All of the usual assumptions are satisfied, except that $E[\epsilon] = X_1\gamma$. That is, the mean vector for the disturbances is a linear combination of a subset of the regressors (implying that $\epsilon$ and $X_1$ are correlated). Let $b_1$ and $b_2$ be the OLS estimators for $\beta_1$ and $\beta_2$.

Obtain the expressions for $E[b_1]$ and $E[b_2]$, and interpret your results.`, [], r`Answer. The LS estimator for $\beta_1$ is $b_1 = (X_1' M_2 X_1)^{-1} X_1' M_2 y$, where $M_2 = I - X_2(X_2' X_2)^{-1} X_2'$. Substituting the population model and using $M_2 X_2 = 0$,

$$E[b_1] = \beta_1 + \gamma.$$

A similar expansion gives $E[b_2] = \beta_2$.

A critical assumption for the unbiasedness of the OLS estimator is that the regressors are unrelated to the error term (assumption A.5). The results above show that if some of the regressors ($X_1$ for example) are related to the error term, then only those corresponding LS estimators will be biased ($b_1$). $b_2$ remains unbiased as long as $X_2$ is unrelated to $\epsilon$.`);

push("consread", E1 + " Section 7.2.", r`Consider the LS estimator of $\beta$ under our standard assumptions, in the “large $n$” asymptotic case.

Can relax some assumptions:

i. Don’t need Normality assumption for the error term of our model.
ii. Columns of $X$ can be random, just assume that $\{x_i', \epsilon_i\}$ is a random and independent sequence.
iii. The above assumption implies that $\operatorname{plim} n^{-1} X'\epsilon = 0$.

Amend our assumption about $X$ having full column rank. Assume instead that $\operatorname{plim} n^{-1} X'X = Q$, where $Q$ is a finite, positive-definite and symmetric $(k \times k)$ matrix that is unobservable.

Theorem: The LS estimator of $\beta$ is weakly consistent.`);

push("consq", E1 + " Section 7.5, exercise 1. The proof printed in section 7.2 is the answer.", r`Prove that the LS estimator is consistent, stating any assumptions that you use.`, [], r`Proof, from section 7.2.

$$b = (X'X)^{-1} X'y = (X'X)^{-1} X'(X\beta + \epsilon) = \beta + (X'X)^{-1} X'\epsilon$$

$$= \beta + \left(\frac{1}{n} X'X\right)^{-1} \left(\frac{1}{n} X'\epsilon\right).$$

If we now apply Slutsky’s Theorem repeatedly, we have $\operatorname{plim}(b) = \beta + Q^{-1} 0 = \beta$.`);

push("mleread", E1 + " Chapter 13, pp. 120–121.", r`Least squares does not work when the dependent variable ($y$) is:

1. The length of time it takes for something to happen.
2. The number of things that happen.
3. A yes/no dummy variable.

In these cases, the dependent variable is limited in some way. The linear model, and least-squares, has no way of recognizing or accounting for the limited nature of the dependent variable. A model estimated by LS will provide predicted values that are not allowed for $y$, and in most cases is misspecified so that the LS estimator is inconsistent.

In cases such as above, if we are willing to specify a probability distribution for $y$, then we can use maximum likelihood estimation (MLE). (Anytime we are willing to choose a distribution for $y$, we can use MLE.)

Definition 13.1 — Maximum likelihood estimator (MLE). The MLE of $\theta$ (call it $\tilde\theta$) is that value of $\theta$ such that $L(\tilde\theta) > L(\hat\theta)$, for all other $\hat\theta$.

The idea behind MLE: “given the $y_i$’s, what is the most likely $\theta$ to have generated such a sample?”

If the sample data are independent then $L(\theta \mid y) = \prod_{i=1}^{n} p(y_i \mid \theta)$.`);

push("mleq", E1 + " Section 13.7. The book prints the answer for the MLE of $p$.", r`The book gives

$$\log L = \sum_i y_i \log(1 - p) + n \log p.$$

(c) Find the MLE for $p$.`, [], r`Answer.

$$\frac{\partial \log L}{\partial p} = -\frac{\sum y_i}{1 - p} + \frac{n}{p} = 0,$$

so $\tilde p = 1/(1 + \bar y)$.`);

push("gls", E1 + " Section 11.4. Equation 11.8.", r`We now turn to the estimation of $\beta$, taking into account when the error term is heteroskedastic. Using this information should enable us to improve the efficiency of the LS estimator.

In the present context, (Ordinary) LS ignores some important information, and we’d anticipate that this will result in a loss of efficiency when estimating $\beta$. Intuitively, observations with less variance should be given more weight than observations with high variance. The observations with smaller variance are more “valuable”.

Recall that we are allowing a general form for the covariance matrix of the error term: $V(\epsilon) = \Sigma$. Generally $\Sigma$ will be unknown. However, to begin with, let’s consider the case where it is actually known.

Clearly, $\Sigma$ must be symmetric, as it is a covariance matrix. Assume that $\Sigma$ is also positive-definite. Then, $\Sigma^{-1}$ is also positive-definite, and so there exists a non-singular matrix, $P$, such that $\Sigma^{-1} = P'P$.

The GLS estimator becomes:

$$\hat\beta_{GLS} = (X'\Sigma^{-1} X)^{-1} X'\Sigma^{-1} y = (X'\Omega^{-1} X)^{-1} X'\Omega^{-1} y. \qquad (11.8)$$`);

push("fgls", E1 + " Section 11.5.", r`In many cases the $\Omega$ matrix will be unknown. In order to be able to implement the GLS estimator, in practice, we’re usually going to have to provide a suitable estimator of $\Omega$. We’ll want to obtain an estimator that is at least consistent, and place this into the formula for the GLS estimator, yielding:

$$\hat\beta_{FGLS} = (X'\hat\Omega^{-1} X)^{-1} X'\hat\Omega^{-1} y.$$`);

push("fglsq", E1 + " Section 11.5.", r`A problem is that the $\Omega$ matrix is $(n \times n)$, and it has $n$ distinct elements. However, we have only $n$ observations on the data.`, [], r`This precludes obtaining a consistent estimator. We need to constrain the elements of $\Omega$ in some way. In practice, this won’t be a big problem, because usually there will be lots of “structure” on the form of $\Omega$. Typically, we’ll have $\Omega = \Omega(\theta)$, where the vector $\theta$ has low dimension. For example,

$$\operatorname{var}(\epsilon_i) = \exp(z_i \theta).$$`);

push("sem", E1 + " Section 8.1.", r`There are several ways in which to motivate the situation where $X$ and $\epsilon$ are correlated. The very problem which motivated IV estimation is the simultaneity of price and quantity through demand and supply equations in a competitive market. For example, a linear model of demand and supply is:

$$q_i = \gamma_d p_i + x_{di}\beta_d + \epsilon_{di} \qquad (8.1)$$

$$q_i = \gamma_s p_i + x_{si}\beta_s + \epsilon_{si} \qquad (8.2)$$

where equation 8.1 is the demand function and equation 8.2 is the supply function, the $x$ variables are predetermined or exogenous, and the $\gamma$ are the slopes of the demand or supply curves. There are two equations in two unknowns (pi and qi). In doing so, we see that the solutions for pi and qi depends not only on both xdi and xsi, but also on both edi and esi. In any linear simultaneous equations model, the endogenous variables are necessarily correlated with the error terms. This is a violation of A.5, leading to inconsistency of the LS estimator.`);

push("semq", E1 + " Section 8.1. The book asks for the proof and does not print it.", r`Prove that the LS estimator is inconsistent when $\operatorname{plim}(n^{-1} X'\epsilon) \ne 0$.`);

push("ivread", E1 + " Section 8.2.", r`A variable (or variables), $Z$, qualifies as an instrument if it satisfies two conditions. An instrumental variable, $Z$, must be:

1. Correlated with the endogenous variables $X$.
2. Uncorrelated with the error term.

The book calls the resulting estimator, when there may be more instruments than regressors, the Generalized IV estimator of $\beta$. The key assumption that ensures the consistency of IV estimators is that the instruments are uncorrelated with the error.`);

push("stat", E1 + " Section 12.2.3.", r`Note that in the AR(1) process, we said that $|\rho| < 1$. This condition is needed to ensure that the process is “stationary.” Suppose that the following three conditions are satisfied:

1. $E[\epsilon_t] = 0$ for all $t$
2. $\operatorname{var}[\epsilon_t] = \sigma^2$ for all $t$
3. $\operatorname{cov}[\epsilon_t, \epsilon_s] = \gamma_{|t-s|}$ for all $t, s$ with $t \ne s$

Then we say that the time-series sequence, $\epsilon_t$, is “Covariance Stationary”; or “Weakly Stationary”.

Unless a time-series is stationary, we can’t identify and estimate the parameters of the process that is generating its values.

The series will converge to $\sigma_u^2 (1 - \rho^2)^{-1}$, as long as $\rho^2 < 1$, and this in turn requires that $|\rho| < 1$.`);

push("tsq6", E1 + " Section 12.5, exercise 6. The book does not print the answer.", r`6. Derive the variance of an AR(1) error term, and note the condition on $\rho$ so that the series converges.`);

push("tsq4", E1 + " Section 12.5, exercise 4. The book does not print the answer.", r`4. What is the difference between an AR(1) and MA(1) process?`);

push("rw", E1 + " Section 12.4.", r`Working with non-stationary data is dangerous. A non-stationary time series where:

$$y_t = y_{t-1} + \epsilon_t$$

is said to be integrated of order one $I(1)$, or is said to follow a random walk. The danger arises as we can easily find what is called a “spurious relationship” between two unrelated random walks. For example, suppose that $x_t$ also follows a random walk:

$$x_t = x_{t-1} + \varepsilon_t$$

Remember that both of these series have infinite variance! Now, what happens if we regress one random walk on another unrelated random walk? We shouldn’t find any relationship, because the two series are unrelated. Granger and Newbold performed a simple simulation showing that such a regression yields spurious results.

As the sample size increases, the $t$-statistic on $\beta_1$ goes to infinity, and the $R^2$ goes to 1, even though there is no relationship! This is because both series have infinite variance.

A common way to deal with a random walk is to first difference the data. This will ensure that we don’t find a spurious relationship (as long as we have the order of integration correct).`);

push("tsq8", E1 + " Section 12.5, exercise 8. The book does not print the answer.", r`8. Show that the variance of a random walk is infinite.`);

push("tsq9", E1 + " Section 12.5, exercise 9. The book does not print the answer.", r`9. Explain a “spurious regression” in the context of two random walks.`);

push("hstat", H + " Chapter 14, Key Concept 14.5. https://www.econometrics-with-r.org/14-ittsraf.html", r`A time series $Y_t$ is stationary if its probability distribution is time independent, that is, the joint distribution of $Y_{s+1}, Y_{s+2}, \ldots, Y_{s+T}$ does not change as $s$ is varied, regardless of $T$.

Similarly, two time series $X_t$ and $Y_t$ are jointly stationary if the joint distribution of $(X_{s+1}, Y_{s+1}, X_{s+2}, Y_{s+2}, \ldots, X_{s+T}, Y_{s+T})$ does not depend on $s$, regardless of $T$.

In a probabilistic sense, stationarity means that information about how a time series evolves in the future is inherent to its past. If this is not the case, we cannot use the past of a series as a reliable guideline for its future.`);

push("adf", H + " Chapter 14, Key Concept 14.8.", r`A time series that follows an AR(1) model with $\beta_1 = 1$ has a stochastic trend. The testing problem is

$$H_0: \beta_1 = 1 \quad \text{vs.} \quad H_1: |\beta_1| < 1.$$

The null hypothesis is that the AR(1) model has a unit root and the alternative hypothesis is that it is stationary. One often rewrites the AR(1) model by subtracting $Y_{t-1}$ on both sides:

$$Y_t = \beta_0 + \beta_1 Y_{t-1} + u_t \quad \Leftrightarrow \quad \Delta Y_t = \beta_0 + \delta Y_{t-1} + u_t,$$

where $\delta = \beta_1 - 1$. The testing problem then becomes $H_0: \delta = 0$ vs. $H_1: \delta < 0$.

The Dickey-Fuller test can also be applied in an AR($p$) model. The Augmented Dickey-Fuller (ADF) test uses

$$\Delta Y_t = \beta_0 + \delta Y_{t-1} + \gamma_1 \Delta Y_{t-1} + \gamma_2 \Delta Y_{t-2} + \cdots + \gamma_p \Delta Y_{t-p} + u_t.$$

The ADF test for a unit autoregressive root tests $H_0: \delta = 0$ (stochastic trend) against the one-sided alternative $H_1: \delta < 0$ (stationarity) using the usual OLS $t$-statistic.

Under the null, the $t$-statistic corresponding to $H_0: \delta = 0$ does not have a normal distribution. The critical values can only be obtained from simulation. If it is assumed that $Y_t$ is stationary around a deterministic linear time trend, the model is augmented by the regressor $t$.`);

push("adfq", H + " Chapter 14.", r`so the ADF test statistic is $t = -0.033/0.014$. The corresponding 5% critical value is $-3.41$.`, [{ t: "num", a: "-2.35", abs: 0.02, l: "t" }], r`so the ADF test statistic is $t = -0.033/0.014 = -2.35$. The corresponding 5% critical value is $-3.41$ so we cannot reject the null hypothesis that $\log(GDP)$ has a stochastic trend in favor of the alternative that it is stationary around a deterministic linear time trend.`);

push("lpm", H + " Chapter 11, the linear probability model. https://www.econometrics-with-r.org/11-rwabdv.html", r`The linear regression model

$$Y_i = \beta_0 + \beta_1 X_{1i} + \beta_2 X_{2i} + \cdots + \beta_k X_{ki} + u_i$$

with a binary dependent variable $Y_i$ is called the linear probability model. In the linear probability model,

$$E(Y \mid X_1, \ldots, X_k) = P(Y = 1 \mid X_1, \ldots, X_k).$$

Thus, $\beta_j$ can be interpreted as the change in the probability that $Y_i = 1$, holding constant the other $k - 1$ regressors. It is essential to use robust standard errors since the $u_i$ in a linear probability model are always heteroskedastic.

$$\widehat{deny} = -0.080 + 0.604 \, P/I\ \text{ratio}.$$

The linear probability model has a major flaw: it assumes the conditional probability function to be linear. This does not restrict $P(Y=1\mid X_1,\dots,X_k)$ to lie between 0 and 1. We can easily see this in our reproduction of Figure 11.1 of the book: for $P/I \ ratio \geq 1.75$, (11.2) predicts the probability of a mortgage application denial to be bigger than $1$. For applications with a $P/I$ ratio close to 0, the predicted probability of denial is even negative so that the model has no meaningful interpretation here.`);

push("lpmq", H + " Chapter 11.", r`Its estimate can be interpreted as follows: a 1 percentage point increase in $P/I \ ratio$ leads to an increase in the probability of a loan denial by $0.604 \cdot 0.01 = 0.00604 \approx 0.6\%$.`, [{ t: "num", a: "0.00604", abs: 0.0002, l: "change in probability" }], r`Its estimate can be interpreted as follows: a 1 percentage point increase in $P/I \ ratio$ leads to an increase in the probability of a loan denial by $0.604 \cdot 0.01 = 0.00604 \approx 0.6\%$.`);

push("probit", H + " Chapter 11, Probit regression.", r`In Probit regression, the cumulative standard normal distribution function $\Phi(\cdot)$ is used to model the regression function when the dependent variable is binary, that is, we assume

$$E(Y \mid X) = P(Y = 1 \mid X) = \Phi(\beta_0 + \beta_1 X).$$

$\beta_0 + \beta_1 X$ plays the role of a quantile $z$. Remember that $\Phi(z) = P(Z \le z)$, $Z \sim N(0,1)$, such that the Probit coefficient $\beta_1$ is the change in $z$ associated with a one unit change in $X$. Although the effect on $z$ of a change in $X$ is linear, the link between $z$ and the dependent variable $Y$ is nonlinear since $\Phi$ is a nonlinear function of $X$.

Since the dependent variable is a nonlinear function of the regressors, the coefficient on $X$ has no simple interpretation. According to Key Concept 8.1, the expected change in the probability that $Y=1$ due to a change in $P/I \ ratio$ can be computed as follows:

1. Compute the predicted probability that $Y = 1$ for the original value of $X$.
2. Compute the predicted probability that $Y = 1$ for $X + \Delta X$.
3. Compute the difference between both the predicted probabilities.

The functional form ensures that the predicted conditional probabilities of a denial lie between 0 and 1.`);

push("probitq", H + " Chapter 11.", r`We find that an increase in the payment-to-income ratio from $0.3$ to $0.4$ is predicted to increase the probability of denial by approximately $6.1\%$.`, [{ t: "num", a: "0.061", abs: 0.005, l: "change in probability" }], r`We find that an increase in the payment-to-income ratio from $0.3$ to $0.4$ is predicted to increase the probability of denial by approximately $6.1\%$.`);

push("logit", H + " Chapter 11, Key Concept 11.3.", r`The population Logit regression function is

$$P(Y = 1 \mid X_1, \ldots, X_k) = F(\beta_0 + \beta_1 X_1 + \cdots + \beta_k X_k) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 X_1 + \cdots + \beta_k X_k)}}.$$

The idea is similar to Probit regression except that a different CDF is used: $F(x) = 1/(1 + e^{-x})$ is the CDF of a standard logistic distribution.

As for Probit regression, there is no simple interpretation of the model coefficients and it is best to consider predicted probabilities or differences in predicted probabilities. Here again, $t$-statistics and confidence intervals based on large sample normal approximations can be computed as usual.

Logit regression uses a nonlinear link function that restricts the fitted values to lie between 0 and 1: in Logit regression, the log-odds of the outcome are modeled as a linear combination of the predictors while the LPM assumes that the conditional probability function of the outcome is linear.`);

push("logitq", H + " Chapter 11, Key Concept 11.3.", r`The idea is similar to Probit regression except that a different CDF is used.`, [], r`$F(x) = \dfrac{1}{1+e^{-x}}$ is the CDF of a standard logistic distribution.`);

push("measy", KI + " Section 12.3, measurement error in the outcome.", r`There is asymptotic bias if there’s systematic overreporting by only one group. In the book’s gym example, $Y^*$ is true exercise and $Y$ is reported exercise, with measurement error $M$ so that $Y = Y^* + M$. More positive $M$ (overreporting) associated with gym membership, $X = 1$, leads to positive (upward) asymptotic bias of $\hat\beta_1$.

Figure 12.1 illustrates the upward bias of $\hat\beta_1$ in the gym/exercise example. The $X = 0$ group does not report perfectly, but there is no systematic reporting bias. The $X = 1$ group systematically overreports exercise. Consequently, the slope using observed $Y$ is much larger than the slope using true but unobserved $Y^*$.`);

push("measyq", KI + " Section 12.3, Discussion Question 12.3. The book does not print an answer.", r`Discussion Question 12.3 (measurement error: scrap rate). Imagine the government wants to help increase the efficiency of chalk manufacturing firms. Specifically, $Y^*$ is a firm’s “scrap rate”: what proportion of their output has to be “scrapped” due to manufacturing defects? For example, $Y^* = 0.04$ means a 4% scrap rate. The government randomly assigns firms to a control group and a treatment group. On January 1, the treated firms receive grant money, which they are supposed to use to improve efficiency. All firms self-report their scrap rates on December 31; this is $Y$.

(a) Describe a reason why treated firms might systematically overreport ($M > 0$) or underreport ($M < 0$) their scrap rates.
(b) In that case, and assuming untreated firms report accurately ($M = 0$), would we overestimate or underestimate the treatment effect of a grant? Why?
(c) If the government uses these incorrect estimates to decide whether or not to continue the program, what incorrect decision might they make? Why?`);

push("measx", KI + " Section 12.3.3.", r`The true linear projection with latent $X^*$ is

$$Y = \beta_0 + \beta_1 X^* + R, \qquad E(R) = \operatorname{Cov}(X^*, R) = 0. \qquad (12.5)$$

Because the observed $X$ is $X = X^* + M$, substituting $X^* = X - M$,

$$Y = \beta_0 + \beta_1 X + (R - \beta_1 M). \qquad (12.6)$$

Consider what seems to be the best-case scenario: $M$ is just random noise unrelated to the true value $X^*$, so $\operatorname{Cov}(X^*, M) = 0$. Unfortunately,

$$\operatorname{Cov}(X, M) = \operatorname{Var}(M). \qquad (12.7)$$

Assuming not everybody has $M = 0$, then $\operatorname{Var}(M) > 0$, so $\operatorname{Cov}(X, M) > 0$. In this case the resulting bias is called attenuation bias. This means that the estimates $\hat\beta_1$ tend to be in between 0 and $\beta_1$: $0 < \operatorname{plim} \hat\beta_1 / \beta_1 < 1$, implying $|\operatorname{plim} \hat\beta_1| < |\beta_1|$. The estimates are systematically pushed closer to zero by the measurement error.

Figure 12.2 shows a simple example where $P(X^* = 1) = P(X^* = 2) = 0.5$, and $Y = X^*$ (no error term). The line through $(1, 1)$ and $(2, 2)$ has slope 1. Then $P(M = -1) = P(M = 1) = 0.5$. The result is $\operatorname{LP}(Y \mid 1, X) = 1 + X/3$ (slope is $1/3$), very different from $\operatorname{LP}(Y \mid 1, X^*) = X^*$ (slope is 1).`);

push("measxq", KI + " Section 12.3.3.", r`The line through $(X^*, Y) = (1, 1)$ and $(2, 2)$ has slope 1. After the measurement error in the text, the book gives $\operatorname{LP}(Y \mid 1, X)$.`, [{ t: "num", a: "0.333", abs: 0.01, l: "slope" }], r`The result is $\operatorname{LP}(Y \mid 1, X) = 1 + X/3$ (slope is $1/3$), very different than $\operatorname{LP}(Y \mid 1, X^*) = X^*$ (slope is 1).`);

push("quant", KQ + " Chapter 5, sections 5.1–5.1.3.", r`Like unconditional quantiles, quantile regression (QR) aids both description and prediction. For description, QR captures more of the conditional distribution of $Y$ given $X = x$ than just the mean. For prediction (guessing $Y$ given $X = x$), although the conditional mean function is optimal for quadratic loss, conditional quantile functions are optimal for “check function” loss that allows asymmetry.

The conditional $\tau$-quantile of $Y$ given $X = x$ is

$$Q_\tau(Y \mid X = x) \equiv \inf\{ y : F_{Y \mid X}(y \mid X = x) \ge \tau \}. \qquad (5.1)$$

If a linear model is specified, then

$$Q_\tau(Y \mid X = x) = x'\beta(\tau). \qquad (5.6)$$

Let $0 < s < t < 1$. In the unconditional case, by definition, $Q_s(Y) \le Q_t(Y)$. This remains true conditional on any $X = x$:

$$Q_s(Y \mid X = x) \le Q_t(Y \mid X = x).$$`);

push("quantq", KQ + " Chapter 5, Discussion Question 5.3. The book does not print an answer.", r`Discussion Question 5.3 (QR monotonicity). Consider the model $Q_\tau(Y \mid X = x) = \alpha(\tau) + x\beta(\tau)$, for all $0 < \tau < 1$. That is, the intercept and slope can be different for different $\tau$, according to the functions $\alpha(\cdot)$ and $\beta(\cdot)$.

(a) Does quantile monotonicity imply $\beta(0.25) < \beta(0.5)$? Why, or why not?
(b) Draw a picture of conditional quantile functions where $\beta(0.25) > \beta(0.5)$. Does it look wrong? Why, or why not?
(c) What is the “economic” interpretation of $\beta(0.25) > \beta(0.5)$?`);

push("ridge", RD + " Section 1.3, Definition 1.1.", r`The ridge regression estimator (Hoerl and Kennard, 1970) is an estimator that deals with (super)-collinearity among the columns of the design matrix. It employs an ad-hoc fix to resolve the (almost) singularity of $X^\top X$. Hoerl and Kennard (1970) simply replace X'X by X'X + λ Ipp with λ in (0, ∞). The scalar $\lambda$ is a tuning parameter, henceforth called the ridge parameter, regularization parameter or penalty parameter. The ad-hoc fix solves the singularity as it adds a positive matrix, $\lambda I_{pp}$, to a positive semi-definite one, $X^\top X$, making their sum a positive definite matrix, rendering it invertible.

Definition 1.1. The ridge regression estimator of the regression parameter of the linear regression model is:

$$\hat\beta(\lambda) = (X^\top X + \lambda I_{pp})^{-1} X^\top Y, \qquad (1.4)$$

for $\lambda \in (0, \infty)$.

The ridge regression estimator is a well-defined estimator, even if $X$ is high-dimensional. However, each choice of the regularization parameter $\lambda$ leads to a different ridge regression estimator.`);

push("ridgeq", RD + " Section 1.14, Question 1.4. The notes do not print the proof.", r`Question 1.4. The coefficients $\beta$ of a linear regression model, $Y = X\beta + \varepsilon$, are estimated by $\hat\beta = (X^\top X)^{-1} X^\top Y$. The hat matrix H is a projection matrix as it satisfies H = H2. Now consider the ridge estimator $\hat\beta(\lambda) = (X^\top X + \lambda I_{pp})^{-1} X^\top Y$. Let $\hat Y(\lambda) = X\hat\beta(\lambda)$.

(a) Show that the ridge hat matrix $H(\lambda) = X(X^\top X + \lambda I_{pp})^{-1} X^\top$, associated with ridge regression, is not a projection matrix (for any $\lambda > 0$), i.e. $H(\lambda) \ne [H(\lambda)]^2$.
(b) Show that for any $\lambda > 0$ the ridge fit $\hat Y(\lambda)$ is not orthogonal to the associated ridge residuals.`);

push("lasso", RD + " Chapter 6, the lasso loss.", r`Like ridge regression, lasso regression fits the linear regression model $Y = X\beta + \varepsilon$. Like ridge regression, it does so by minimization of the sum of squares augmented with a penalty. The difference with ridge regression is in the penalty function. Instead of the squared Euclidean norm, lasso regression uses the $\ell_1$-norm: the sum of the absolute values of the regression parameters multiplied by the lasso penalty parameter $\lambda_1$. The lasso regression loss function is

$$L_{\text{lasso}}(\beta; \lambda_1) = \|Y - X\beta\|_2^2 + \lambda_1 \|\beta\|_1 = \sum_{i=1}^{n} (Y_i - X_{i*}\beta)^2 + \lambda_1 \sum_{j=1}^{p} |\beta_j|. \qquad (6.2)$$

The lasso regression estimator is then defined as the minimizer of this loss function. For $\lambda_1$ close to zero, the lasso estimate is close to the maximum likelihood estimate. Whereas for large $\lambda_1$, the penalty term overshadows the sum of squares, and the lasso estimate is small. In general, no explicit expression for the lasso regression estimator exists. For particular cases, an orthonormal design (Example 6.4) and p = 2 (Example 6.6), an analytic expression for the lasso regression estimator exists.`);

push("lassoq", RD + " Section 6.11, Question 6.12. The notes do not print the proof.", r`Question 6.12. Show that $\|\hat\beta(\lambda_1)\|_1$ is monotone decreasing in $\lambda_1$. Assume orthonormality of the design matrix $X$.`);

push("cv", RD + " Section 1.9.3.", r`Cross-validation requires the regularization parameter to yield a model with good predictive performance. Commonly, this performance is evaluated on novel data. Novel data need not be easy to come by and one has to make do with the data at hand. The setting of “original” and novel data is then mimicked by sample splitting: the data set is divided into two groups of samples. One of these two data sets, called the training set, plays the role of original data on which the model is built. The second, called the test set, plays the role of the novel data and is used to evaluate the prediction performance of the model built on the training data set. This procedure is done for a collection of possible penalty parameter choices. The penalty parameter that yields the model with the best prediction performance is to be preferred.

When the repetitive splitting of the data set is done randomly, samples may accidently end up in a vast majority of the splits in either the training or the test set. To avoid this, $k$-fold cross-validation structures the data splitting. The samples are divided into $k$ more or less equally sized exhaustive and mutually exclusive subsets. In turn, one of these subsets plays the role of the test set while the union of the remaining subsets constitutes the training set.`);

push("cvq", RD + " Section 1.9.3.", r`This may be fully excluded when choosing $k = n$.`, [], r`This particular case is referred to as leave-one-out cross-validation (LOOCV).`);

push("pred", G + " Chapter 5, Causality vs. prediction.", r`Up to Chapter 4 we have used regression for one purpose: to estimate the ceteris paribus effect of $x$ on $y$. The coefficient $\beta_j$ was the object of interest.

Econometrics also has a second use: prediction. Here we do not particularly care about the value of any individual $\beta_j$; we care about the accuracy of the fitted value $\hat y_0$ for a new observation.

Causal inference. The target is $\partial \mathbb{E}[y \mid x] / \partial x_j$. The decisive assumption is MLR.4, $\mathbb{E}[u \mid x_1, \ldots, x_k] = 0$.

Prediction. The target is $\hat y_0$ for a new $x_0$. The decisive assumption is stability: the new $(y_0, x_0)$ is drawn from the same population as the sample.

A high $R^2$ tells you that the fitted values track $y$ well. It does not tell you that any individual coefficient measures a causal effect.`);

push("predq", G + " Chapter 5, self-check Q6.", r`Q6. Causality vs. prediction

The model with the smallest AIC is necessarily the best for:

A. Both prediction and causal identification of individual coefficients.
B. Prediction of $y$ given $x$ --- but not necessarily for identifying the causal effect of a specific regressor.
C. Causal identification only.
D. Neither, since AIC is always misleading.`, [{ t: "mc", a: 1, o: [r`Both prediction and causal identification of individual coefficients.`, r`Prediction of $y$ given $x$ --- but not necessarily for identifying the causal effect of a specific regressor.`, r`Causal identification only.`, r`Neither, since AIC is always misleading.`] }], r`Answer: B. AIC is a predictive criterion.`);

push("quad", G + " Chapter 6, Quadratic models.", r`The simplest way to capture a nonlinear shape is to add the square of a regressor:

$$y = \beta_0 + \beta_1 x + \beta_2 x^2 + u.$$

Now the partial effect of $x$ on $y$ is no longer constant:

$$\frac{\partial y}{\partial x} = \beta_1 + 2\beta_2 x.$$

The marginal effect depends on where on the $x$-axis we evaluate it.

- $\beta_1 > 0$, $\beta_2 < 0$: increasing then decreasing --- an inverted U with a maximum at $x^* = -\beta_1/(2\beta_2)$.
- $\beta_1 < 0$, $\beta_2 > 0$: decreasing then increasing --- a U-shape with a minimum at $x^*$.

Setting the partial effect to zero and solving gives the turning point $x^* = -\beta_1/(2\beta_2)$.`);

push("quadq", G + " Chapter 6, Example: wage and age.", r`A study estimates

$$\widehat{\text{wage}} = -10 + 1.5\,\text{age} - 0.02\,\text{age}^2.$$

The marginal effect of age is $1.5 - 0.04\,\text{age}$.`, [{ t: "num", a: "0.7", abs: 0.02, l: "marginal effect at age 20" }, { t: "num", a: "37.5", abs: 0.05, l: "turning point" }], r`- At age 20: $1.5 - 0.04(20) = 0.7$ euros per year of age.
- At age 30: $1.5 - 0.04(30) = 0.3$ euros per year.
- At age 40: $1.5 - 0.04(40) = -0.1$ euros per year.

The turning point is $\text{age}^* = 1.5 / (2 \cdot 0.02) = 37.5$ years.`);

push("quadmc", G + " Chapter 6, self-check Q1.", r`Q1. Marginal effect in a quadratic model

In the model $y = \beta_0 + \beta_1 x + \beta_2 x^2 + u$, the marginal effect of $x$ on $y$ is:

A. $\beta_1$, constant.
B. $\beta_2$, constant.
C. $\beta_1 + 2\beta_2 x$ --- it depends on $x$.
D. Always positive.`, [{ t: "mc", a: 2, o: [r`$\beta_1$, constant.`, r`$\beta_2$, constant.`, r`$\beta_1 + 2\beta_2 x$ --- it depends on $x$.`, r`Always positive.`] }], r`Answer: C. Differentiating the model with respect to $x$ gives $\partial y/\partial x = \beta_1 + 2\beta_2 x$.`);

push("rls", E1 + " Section 9.4, Definition 9.3.", r`The RLS estimator is developed here in order to examine the benefits of imposing restrictions on a model, and the costs of imposing false restrictions.

The basic idea is that the null hypothesis implies restrictions on the initial model under the alternative hypothesis. A model obtained by imposing parameter restrictions on a larger unrestricted model is often said to be “nested”.

Model B is “nested” in model A if B can be obtained by imposing parameter restrictions on A.

Many tests in econometrics can be interpreted as comparing the fit of the restricted model, under $H_0$, to that of the unrestricted model, under $H_A$. The $F$-test is no exception. We can calculate the $F$-statistic by estimating two models and comparing their RSS or $R^2$.

Definition 9.3 — Restricted least squares estimator (RLS). The RLS estimator of $\beta$, in the model $y = X\beta + \epsilon$, is the vector $b^*$, which minimizes the sum of the squared residuals, subject to the constraints $Rb^* = q$.

The book sets up the Lagrangian

$$L = (y - Xb^*)'(y - Xb^*) + 2\lambda'(Rb^* - q)$$

and the first order conditions $\partial L/\partial b^* = 0$ and $\partial L/\partial \lambda = 0$.`);

export { ADDED };

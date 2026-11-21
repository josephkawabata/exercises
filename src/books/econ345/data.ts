import type { Card, Field } from "../../engine";

const r = String.raw;
const SRC = "Godwin, Introduction to Econometrics. https://rtgodwin.com/introeconometrics.pdf";

const CARDS: Card[] = [];

function step(id: string, q: string, section: string, f: Field[] = [], bk?: string): void {
  const c: Card = { id, q, f, h: "", src: f.length > 0 || bk ? "b" : "n", ctx: SRC + " Section " + section + "." };
  if (bk) c.bk = bk;
  CARDS.push(c);
}

const N = (a: string, l: string): Field => ({ t: "num", a, l });
const S = (a: string[], l: string): Field => ({ t: "set", a, l });

step("1.1", r`1.2 What is Econometrics?

Econometrics is the study of statistical methods applied to economics data. It is a subset of statistics. Similarly, biology has “biometrics”, psychology has “psychometrics”, etc. Econometrics uses those methods most suited to economics data.

Econometrics can be used to test economics theories. Economics is a social science, and economics benefits from the scientific method. Theories are formed and tested using observations from the real world. The testing part mostly relies on econometrics.

Econometrics can be used to estimate causal effects, though it should not be used to find them. That is, the theoretical model (e.g. from Micro or Macro) should specify which variable causes which. It is then up to the econometrician to estimate how much of an effect one variable has on another. Econometrics may also be used to forecast or predict economic variables, although forecasting is not covered in this course.

Econometrics specializes in dealing with observational data. Observational data is in contrast to experimental data. In an experiment, there is some element of control - a variable can be changed by the researcher, and the effect of the change on another variable can be more easily measured. In observational data the causal variable is changing on its own, and this can be very problematic. Typically there are important omitted variables in observational data. An experiment provides a better way to estimate a causal effect, since the missing variables are not a problem in a well constructed experiment.

Economic models often suggest that one variable causes another. This often has policy implications. The economic models, however, do not provide quantitative magnitudes of the causal effects. For example:

• How would a change in the price of alcohol or cigarettes effect the quantity consumed?
• If income increases, how much of the increase will be consumed?
• If an additional fireplace is added to a house, how much will the price of the house increase?
• How does another year of education change earnings?

How would you use an experiment to determine the above four causal effects? You will likely conclude that using an experiment would be too costly and/or unethical. Hence, we must rely on observational data, and try to sort out the associated problems.

It is important to be aware of the limitations of statistics. It can never be used to determine causation. Causation must be theorized. If two variables are correlated, statistics alone cannot tell which variable causes which, or if there is any causation at all. That is, correlation does not imply causation. If, however, we find that two variables are statistically independent from each other, one variable can not cause the other.`, "1.2");

step("1.2", r`4.1 Motivating Example 1: Demand for Liquor

How much less alcohol will people consume if we raise the price? In first-year microeconomics you learned about the law of demand. The quantity demanded of a product should depend on its price (and other things):

$$Q^d = a + bP \qquad (4.1)$$

where $a$ is the intercept of the demand “curve”, and $b$ is the slope. See figure 4.1. You learned that the slope of the demand curve, $b$, depends on the type of good. For example, necessities such as medicine should have relatively flatter demand curves than luxuries such as a diamonds.

4.2 Motivating Example 2: Marginal Propensity to Consume

An increase in consumption is induced by an increase in income, but not all of the increase in income is consumed. Marginal propensity to consume is the proportion of an increase in disposable income that individuals spend on consumption:

$$MPC = \frac{\Delta C}{\Delta Y} \qquad (4.2)$$

where $\Delta C$ is the change in consumption “caused” by the change in income, $\Delta Y$. John Maynard Keynes supposed that the $MPC$ should be less than one, but without data and econometrics there is no way to put an actual number to the $MPC$.

We can also write the relationship between consumption and disposable income through the equation of a line:

$$C = a + MPC \times Y \qquad (4.3)$$

where $a$ is again the intercept of the line (representing the amount of consumption with disposable income of zero), and where this time $MPC$ is the slope of the line. Remember that $MPC$ is the thing we are trying to estimate.

One of the points we are trying to make here is that many economics models can be represented by the equation of a straight line. If we can figure out how to estimate the line, then we have an estimate for the slope (the marginal effect), which is of great practical usefulness.`, "4.1–4.2");

step(
  "1.3",
  r`4.3 The Linear Population Regression Model

The general regression model is:

$$Y_i = \beta_0 + \beta_1 X_i + \epsilon_i \qquad (4.4)$$

• $X$ is called the independent variable or regressor. It is the variable that is assumed to cause the $Y$ variable. In the “Demand for Liquor” example, this variable was price ($P$). See equation 4.1. In the $MPC$ example the regressor was income. See equation 4.3.
• $Y$ is the dependent variable. This variable is assumed to be caused by $X$ (it depends on $X$). In the demand example the dependent variable was quantity demanded ($Q^d$) and in the $MPC$ example it was consumption ($C$).
• $\beta_0$ is the population intercept. It was labelled $a$ in both examples. It is unobservable, but we can try to estimate it.
• $\beta_1$ is the population slope. When $X$ increases by 1, $Y$ increases by $\beta_1$. This is the primary object of interest, and is unobservable. We want to estimate $\beta_1$. $\beta_1$ is interpreted as the marginal effect in many economics models.
• $\epsilon$ is the regression error term. It consists of all the other factors or variables that determine $Y$, other than the $X$ variable. All of these other variables causing $Y$ are combined into $\epsilon$. $\epsilon$ is considered to be a random variable since we can not observe it.
• $i = 1, \ldots, n$. The subscript $i$ denotes the observation. $n$ is the sample size. For example, $Y_4$ refers to the fourth $Y$ observation in the data set.

4.3.1 The importance of $\beta_1$

Note that in equation 4.4, the object of interest is $\beta_1$. It is the thing we are trying to estimate. It is the causal, or marginal effect, of $X$ on $Y$. That is, a change in $X$ of $\Delta X$ causes a $\beta_1$ change in $Y$:

$$\frac{\Delta Y}{\Delta X} = \beta_1$$

4.3.2 The importance of $\epsilon$

$\epsilon$ (epsilon) is the random component of the model. Without $\epsilon$, statistics/econometrics is not required. $\epsilon$ represents all of the other things that determine $Y$, other than $X$. They are all added up and lumped into this one random variable. Because we can not observe all of these other factors, we consider them to be random. The fact that $\epsilon$ is random makes $Y$ random as well.

Later, we will make some assumptions about the randomness of $\epsilon$, that will ultimately determine the properties of the way that we choose to estimate $\beta_1$.

4.3.3 Why it’s called a population model

Equation 4.4 is called a “population” model because it represents the true, but unknown way in which the $Y$ variable is “created” or “determined”. $\beta_0$ and $\beta_1$ are unknown (and so is $\epsilon$). We will observe a sample of $Y$ and $X$, and use the sample to try to figure out the $\beta$s.

4. Why is the $\epsilon$ term needed in equation 4.4?`,
  "4.3",
  [],
  r`The error term is needed in order to represent all of the other factors that influence $Y$, besides the $X$ variable. Since these other factors (or variables) are unobserved, we consider them to be random, and add them all up into one term. $\epsilon$ represents the randomness in the population model, without which there would be no need for statistics or econometrics.`,
);

step("1.4", r`4.4 The estimated model

Our primary goal is to estimate $\beta_1$ (the marginal effect of $X$ on $Y$), but to do so we’ll also have to estimate $\beta_0$. This estimated intercept and slope will define a straight line. These estimates will be denoted $b_0$ and $b_1$, the OLS intercept and slope.

Let’s start with a very simple example using data that I made up: $Y = \{1, 4, 5, 4\}$, $X = \{2, 4, 6, 8\}$. The data, and estimated OLS line, are shown in figure 4.4. The OLS estimated intercept is $b_0 = 1$, and the estimated slope is $b_1 = 0.5$.

We still don’t know how to get $b_0$ and $b_1$! Before we decide how to fit a straight line through some data points, we need to define two terms first.

4.4.1 OLS predicted values ($\hat Y_i$)

The OLS predicted (or fitted) values, are the values for $Y$ that we get when we “plug” the $X$ values back into the estimated OLS line. These predicted $Y$ values are denoted by $\hat Y$. We can find each predicted value, $\hat Y_i$, by plugging each $X_i$ into the estimated equation.

In general, the estimated equation (or line) is written as:

$$\hat Y_i = b_0 + b_1 X_i. \qquad (4.5)$$

For our simple example, equation 4.5 becomes $\hat Y_i = 1 + 0.5 X_i$, and each OLS predicted values is:

$\hat Y_1 = 1 + 0.5(2) = 2$

$\hat Y_2 = 1 + 0.5(4) = 3$

$\hat Y_3 = 1 + 0.5(6) = 4$

$\hat Y_4 = 1 + 0.5(8) = 5$

These OLS predicted values are added to the plot in figure 4.5. Notice how each predicted value lies on the blue line, directly above or below the data point.

4.4.2 OLS residuals ($e_i$)

An OLS predicted value tells us what the estimated model predicts for $Y$ when given a particular value of $X$. When we plug in the sample values for $X$ (as we did in the previous section), we see that the predicted values ($\hat Y_i$) don’t quite line up with the actual $Y_i$ values. The differences between the two are the OLS residuals. The OLS residuals are like prediction errors, and are determined by:

$$e_i = Y_i - \hat Y_i \qquad (4.6)$$

Using equation 4.6 for our simple example, each OLS residual is:

$e_1 = 1 - 2 = -1$

$e_2 = 4 - 3 = 1$

$e_3 = 5 - 4 = 1$

$e_4 = 4 - 5 = -1$

These OLS residuals are indicated in figure 4.6. They are the vertical distances between the actual data points (the circles) and the OLS predicted values (the $\times$).

Each data point ($Y_i$) is equal to its predicted value, plus its residual. That is, we can rearrange equation 4.6 and write:

$$Y_i = \hat Y_i + e_i$$

or, using equation 4.5 for the definition of $\hat Y_i$:

$$Y_i = b_0 + b_1 X_i + e_i, \qquad (4.7)$$

which will be useful in the next chapter. Note that equation 4.7 is the observable counterpart to the unobservable population model in equation 4.4.`, "4.4");

step(
  "1.5",
  r`4.5 How to choose $b_0$ and $b_1$, the OLS estimators

Now that we have defined the OLS residuals ($e_i$), we can define the OLS estimators $b_0$ and $b_1$ by coming up with an equation that will tell us how to use the $X$ and $Y$ data.

The OLS estimators are defined in the following way. They are the values for $b_0$ and $b_1$ that minimize the sum of squared vertical distances between the OLS line and the actual data points ($Y_i$). These vertical distances have already been defined as the OLS residuals ($e_i$). So the “objective” is to choose $b_0$ and $b_1$ so that $\sum_{i=1}^{n} e_i^2$ is minimized. This is an optimization problem from calculus. Formally stated, the OLS estimator is the solution to the minimization problem:

$$\min_{b_0, b_1} \sum_{i=1}^{n} e_i^2 \qquad (4.8)$$

Substituting the value for $e_i$ (equation 4.6) into equation 4.8, and substituting in the value for $\hat Y_i$ (from equation 4.5) we get:

$$\min_{b_0, b_1} \sum_{i=1}^{n} (Y_i - b_0 - b_1 X_i)^2 \qquad (4.9)$$

To solve this minimization problem, we take the partial derivatives of $\sum_{i=1}^{n} e_i^2$ with respect to $b_0$ and $b_1$, set those derivatives equal to zero, and solve for $b_0$ and $b_1$. We leave the derivation for an exercise, and only write the solution here:

$$b_1 = \frac{\sum_{i=1}^{n} (Y_i - \bar Y)(X_i - \bar X)}{\sum_{i=1}^{n} (X_i - \bar X)^2} \qquad (4.10)$$

$$b_0 = \bar Y - b_1 \bar X$$

These equations tell us how to pick a line (by picking an intercept and slope) in order to minimize the sum of squared vertical distances between the chosen line and each data point. The next question is, why should we choose a line in such a way?

1. Let the sample data be $Y = \{5, 2, 2, 3\}$ and $X = \{5, 3, 5, 3\}$.

b) Calculate the OLS estimated slope and intercept, using equation 4.10.

d) Calculate the OLS predicted values and residuals.`,
  "4.5 and 4.7",
  [
    N("0.5", r`$b_1 =$`),
    N("1", r`$b_0 =$`),
    S(["1.5", "-0.5", "-1.5", "-0.5"], r`residuals $e_1, e_2, e_3, e_4$`),
  ],
);

step(
  "2.1",
  r`2. How are the formulas for $b_1$ and $b_0$ derived?`,
  "4.7",
  [],
  r`The formulas for the OLS estimator are derived by minimizing the sum of squared OLS residuals. This involves solving an optimization problem in calculus. The derivatives of the sum of squared residuals, with respect to $b_0$ and $b_1$, are set equal to 0 and solved, providing the formulas in equation 4.10.`,
);

step("2.2", r`Chapter 3 Statistics Review

A statistic is any mathematical function using a sample of data. It is just an equation applied to the data. When a statistic is used to estimate a population parameter, it is called an estimator. One of the main goals of this course is to become familiar with a particular estimator - the ordinary least squares estimator, but for this chapter we will review some simpler estimators.

We will discuss the population, and why the sample $y$ should be considered random. Then, we will discuss some estimators. A very important point is that, because $y$ is random, functions of $y$ are also random. Since an estimator is just an equation applied to $y$, the estimator itself is also random. As we know from the previous chapter, random variables have probability functions.

The probability function for an estimator is given a special name - the sampling distribution. Obtaining some properties of the estimator from its sampling distribution, such as mean and variance, will tell us whether or not the estimator is “good”, and will guide our choice of which estimator to use.

4.6 The Assumptions and Properties of OLS

So, what’s so great about OLS? There are many other ways that we could fit a line through some data points:

• instead of vertical distances, we could minimize the sum of horizontal or orthogonal distances
• instead of taking the sum of squared distances, we could take the sum of absolute distances
• we could divide the sample into two parts, get the average $Y$ and $X$ coordinates, and connect the dots
• we could pick (randomly or not) any two different data points and connect them

The main point here is that there are many ways that we could fit a line, so we should wonder why OLS is so special. Some of these alternatives above are obviously silly, but some lead to alternative estimators that have merit in various situations.

Recall that estimators are random variables (see Chapter 3). The OLS slope and intercept estimators have sampling distributions, with a mean and a variance. The reason why we use OLS is because these random estimators have good statistical properties (under certain assumptions). Here, we list the assumptions, and return to them at various stages throughout the book.

4.6.1 The OLS assumptions

A1 The population model is linear in the $\beta$s.

A2 There is no perfect multicollinearity between the $X$ variables.

A3 The random error term, $\epsilon$, has mean zero.

A4 $\epsilon$ is identically and independently distributed.

A5 $\epsilon$ and $X$ are independent.

A6 $\epsilon$ is Normally distributed.

4.6.2 The properties of OLS

Provided that the above six assumptions hold:

• The OLS estimator is unbiased.
• The OLS estimator is efficient.
• The OLS estimator is consistent.
• The OLS estimator is Normally distributed.

Note that not all assumptions are needed for each of the above four properties. Additionally, some of the assumptions A1–A6 are often unrealistic. Testing for the validity of these assumptions, re-evaluating the properties of the OLS estimator in the absence of each assumption, and figuring out how to recover unbiasedness, efficiencyand consistency, would lead to some different estimators, and would form the basis for future econometrics courses.`, "3 and 4.6");

step(
  "2.4",
  r`6.3.2 Interpretation

Let’s look at a population model with two $X$ variables:

$$Y_i = \beta_0 + \beta_1 X_{1i} + \beta_2 X_{2i} + \epsilon_i \qquad (6.3)$$

• $Y$ is still the dependent variable
• $X_1$ and $X_2$ are the independent variables (the regressors)
• $i$ still denotes an observation number
• $\beta_0$ is the population intercept
• $\beta_1$ is the effect of $X_1$ on $Y$, holding all else constant ($X_2$)
• $\beta_2$ is the effect of $X_2$ on $Y$, holding all else constant ($X_1$)
• $\epsilon$ is the regression error term (containing all the omitted factors that effect $Y$)

Nothing substantial has changed. $\beta_1$, for example, is the marginal effect of $X_1$ on $Y$, while holding $X_2$ constant. In the fireplaces example, by inlcuding Living.Area in the regression we are able to find the marginal effect of fireplaces while holding house size constant. When we add more variables to the model, the interpretation of the $\beta$s remains the same.

4. For the model:

$$Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \epsilon,$$

explain the interpretation of $\beta_1$ and $\beta_2$.`,
  "6.3.2 and 6.6",
  [],
  r`$\beta_1$ is the marginal effect of $X_1$ on $Y$, holding $X_2$ constant. Similar for $\beta_2$. To prove this, we can take the partial derivative of $Y$ with respect to (say) $X_1$:

$$\frac{\partial Y}{\partial X_1} = 0 + \beta_1 + 0 + 0 = \beta_1$$

This tells us that the change in $Y$ resulting from a change in $X_1$, is $\beta_1$, and that these changes are independent from changes in $X_2$.`,
);

step(
  "2.3",
  r`6.2 Omitted variable bias

When Living.Area is omitted from the regression, its effect on Price becomes mixed up in the effect of Fireplaces on Price. That is, when the house has more fireplaces, that means it’s a larger house, so there are two reasons for a higher price. Lots of fireplaces is just indicating the house is large!

This is an example of omitted variable bias (OVB). When Living.Area is omitted, the OLS estimator is biased (in this case the effect of more fireplaces on house price is estimated to be way too large). OVB provides an important motivation for the multiple regression model: even though we may only be interested in estimating one marginal effect, we still should include other variables that are correlated to $X$, otherwise our estimator is biased. OVB is solved by adding the extra variables to the equation, thus controlling for their effect.

2. What are the two conditions that will make an omitted variable cause OLS to be biased?`,
  "6.2 and 6.6",
  [],
  r`If the omitted variable is (i) a determinant of the dependent ($Y$) variable; and (ii) is correlated with one or more of the included ($X$) variables.`,
);

step(
  "3.1",
  r`6.4 OLS assumption A2: no perfect multicollinearity

In this section, we pay special attention to assumption A2, which has only now become relevant in the context of the multiple regression model.

A2 There is no perfect multicollinearity between the $X$ variables.

This assumptions means that no two $X$ variables (or combinations of the variables) can have an exact linear relationship. For example, exact linear relationship between $X$s are:

• $X_1 = X_2$
• $X_1 = 100 X_2$
• $X_1 = 1 + X_2 - 3 X_3$

In these examples, you can figure out what one of the $X$s will be, if you know the other $X$s. This situation is usually called perfect multicollinearity. The data contains redundant information. This shouldn’t be much of a problem, except that the OLS formula doesn’t allow all of the estimators to be calculated (the problem is similar to trying to divide by zero).

5. Why is perfect multicollinearity a problem for OLS estimation?

6. Explain how the “dummy variable trap” is a situation of perfect multicollinearity.`,
  "6.4 and 6.6",
  [],
  r`5. Perfect multicollinearity is a problem because the OLS estimator is not defined. That is, our computer software will be unable to calculate all of the OLS estimators.

6. The “dummy variable trap” is when a redundant dummy variable is included in the regression. This is a case of perfect multicollinearity: there is an exact linear relationship between the dummy variables. For example, suppose that I had a two dummy variables:

attended $= 1$ if the student attended class, and $0$ if the student did not attend class

and

skipped $= 1$ if the student skipped class, and $0$ if the student did not skip class

Including both of these variables in the equation would result in perfect multicollinearity because there is an exact linear relationship between the two variables:

$$attended = 1 - skipped$$`,
);

step(
  "3.2",
  r`5.3 Dummy Variables

A dummy variable is a variable that takes on one of two values (usually 0 or 1). A dummy variable is also sometimes called a binary variable or a dichotomous variable. We will consider that the independent variable (the regressor or “$X$” variable) in our population model (equation 4.4) is a dummy variable, where:

$D_i = 0$, if individual $i$ belongs to group A

$D_i = 1$, if individual $i$ belongs to group B

Dummy variables are useful for estimating differences between groups, where groups “A” and “B” can take on many definitions. For example, in labour economics and many other areas of economics, it is common to use a dummy variable to identify the gender of the individual.

5.3.1 A population model with a dummy variable

Now, let’s consider a population model with a dummy:

$$Y_i = \beta_0 + \beta_1 D_i + \epsilon_i, \qquad (5.13)$$

where $D_i = 0$ if the individual is female, $D_i = 1$ if the individual is male, and $Y_i$ is the wage of the individual. How do we interpret $\beta_1$ from equation 5.13? Since $D_i$ is not a continuous variable, $\beta_1$ is not a marginal effect, and we cannot take the derivative of $Y$ with respect to $D$ when $D$ is non-continuous. Instead, let’s use conditional expectations to find the interpretation of $\beta_1$.

Let’s consider the expected wage of a male worker:

$$E[Y_i \mid D_i = 1] = \beta_0 + \beta_1(1) + E[\epsilon_i] = \beta_0 + \beta_1 \qquad (5.14)$$

We have simply substituted in the population model (equation 5.13) for $Y_i$, substituted in $D_i = 1$, and made use of assumption A.3 ($E[\epsilon_i] = 0$). Now, let’s consider the expected wage of a female worker:

$$E[Y_i \mid D_i = 0] = \beta_0 + \beta_1(0) + E[\epsilon_i] = \beta_0 \qquad (5.15)$$

What is the difference between these two conditional expectations (equations 5.14 and 5.15)? $\beta_1$! That is:

$$E[Y_i \mid D_i = 1] - E[Y_i \mid D_i = 0] = \beta_1 \qquad (5.16)$$

So, when the “$X$” variable is a dummy variable, the attached $\beta$ is interpreted as the difference in population means between the two groups.

5.3.2 An estimated model with a dummy variable

OLS works just fine when the right-hand-side variable is a dummy variable. The estimated model will be the same as it was before:

$$Y_i = b_0 + b_1 D_i + e_i, \qquad (5.17)$$

where everything has the same interpretation as before, except that $b_1$ is the estimated difference in population mean of $Y$ between the two groups as defined by the dummy variable. In fact, it turns out that:

• $b_0$ is the sample mean ($\bar Y$) for $D_i = 0$
• $b_0 + b_1$ is the sample mean for $D_i = 1$
• $b_1$ is the difference in sample means (be careful of the sign)

5. Using equation 5.13, explain how to interpret $\beta_0$ and $\beta_1$.`,
  "5.3 and 5.5",
  [],
  r`The interpretation of $\beta_1$, when the independent variable is a dummy variable, is obtained by taking the conditional expectation of $Y$ for each of the two possible values that the dummy variable can take. We repeat equation 5.16:

$$E[Y_i \mid D_i = 1] - E[Y_i \mid D_i = 0] = \beta_1$$`,
);

step(
  "4.1",
  r`8.1 The linear model

The models we have seen so far have been linear. In the population model:

$$Y = \beta_0 + \beta_1 X_1 + \cdots + \beta_k X_k + \epsilon$$

the change in $Y$ due to a change in $X_1$ (for example) is: $\Delta Y / \Delta X_1 = \beta_1$. This effect of $X_1$ on $Y$ is constant. For many relationships between variables, this is unreasonable.

As an example of how the linear model does not work, we use the Diamond data from the Ecdat R package (data originally from Chu, 2001). A plot of the price and carats of diamonds are shown in figure 8.1, with the OLS estimated line included in the plot. The relationship between price and carats appears to be non-linear. The effect of carat on price appears to be small when then diamond is small, and gets large as the size of the diamond grows. The reason for this might be that large diamonds are more rare. A larger diamond can always be cut into smaller diamonds, but two diamonds cannot be combined to make a larger one. The linear model says that the effect of carat on price is constant, no matter how large or small the diamond is to begin with.

Ideally, we would like an estimated model that is capable of capturing the half “U” shape that we see in the diamonds plot, and other such non-linear shapes. If the true relationship between the two variables is non-linear, then the linear model is misspecified. OLS is biased and inconsistent. For situations like this, we need to specify a population model that allows for the marginal effect of $X$ on $Y$ to change depending on the value of $X$.

8.2 Polynomial regression model

A non-linear relationship between two variables can be approximated using a polynomial function. The validity of the approximation is based on a Taylor series expansion. A population model with a polynomial is:

$$Y = \beta_0 + \beta_1 X_1 + \beta_2 X_1^2 + \beta_3 X_1^3 + \cdots + \beta_r X_1^r + \epsilon \qquad (8.1)$$

Equation 8.1 has a polynomial of degree $r$ in $X_1$. If $r = 2$ we get a quadratic equation, and if $r = 3$ we get a cubic equation. Note that this is just the linear model that we have been using all along, but some of the regressors are powers of $X_1$. Other variables ($X_2$, $X_3$, etc.) can be added as usual. With the polynomial, estimation by OLS, and hypothesis testing, is the same as usual. Including powers of $X_1$ in the model as additional regressors is not a violation of no perfect multicollinearity (assumption A.2), because the relationship between the regressors is not linear.

1. What is a polynomial regression model?

2. Why is it important to have a model that can capture non-linear effects?`,
  "8.1, 8.2, and 8.4",
  [],
  r`1. A polynomial regression model is one that includes powers of one or more of the $X$ variables as additional regressors (e.g. $X_3^2$, $X_3^3$). This is done in order to approximate a non-linear relationship between the $X$ and $Y$ variables.

2. Many models in economics specify non-linear relationships between the variables. We want our econometric models to represent the features of the economic model. If non-linear relationships are ignored, the OLS estimator may be biased.`,
);

step(
  "4.2",
  r`8.3 Logarithms

Another way to approximate the non-linear relationship between $Y$ and $X$ is by using logarithms. Logarithms can be used to approximate a percentage change. If the relationship between two variables can be expressed in terms of proportional or percentage changes, then it is a type of non-linear effect. To see this, consider a 1% increase in 100 (which is 1), and a 1% increase in 200 (which is 2). The same 1% increase can be generated by different changes in the variable (e.g. a change of 1 or of 2).

For example, consider an increase in hourly wage of $1. That is not a big increase for someone making $50 per hour (an increase of only 2%). This change in wage is unlikely to have much effect on the behaviour of the individual. However, imagine an individual whose hourly wage is only $1 per hour. An increase of $1 doubles the wage (100% increase)! This is likely to have a big impact on behaviour.

It is desirable to measure thinks like wage in terms of proportional or percentage changes (regardless of whether it is included in a model as the dependent variable or as a regressor). This can be accomplished by using the log of the variable in the regression model, instead of the variable itself.

8.3.3 Logs in the population model

The log function can be used in our population model so that the $\beta$s have various percentage changes interpretations. There are three ways we can introduce the log function into our models.

Table 8.2: Three population models using the log function.

I. linear-log: $Y = \beta_0 + \beta_1 \log X + \epsilon$

II. log-linear: $\log Y = \beta_0 + \beta_1 X + \epsilon$

III. log-log: $\log Y = \beta_0 + \beta_1 \log X + \epsilon$

For each of the three different population models in table 8.2, $\beta_1$ has a different percentage change interpretation. We don’t derive the interpretations of $\beta_1$, but instead list them for the three different cases in table 8.2:

• linear-log: a 1% change in $X$ is associated with a $0.01\beta_1$ change in $Y$.
• log-linear: a change in $X$ of 1 is associated with a $100 \times \beta_1$% change in $Y$.
• log-log: a 1% change in $X$ is associated with a $\beta_1$% change in $Y$. $\beta_1$ can be interpreted as an elasticity.

4. Other than polynomials, what is another way to capture a non-linear effect in an OLS regression model?

5. What are the interpretations of the $\beta$s in population models that use logarithms?`,
  "8.3 and 8.4",
  [],
  r`4. Besides polynomials, we can also take the logarithms of the $X$ and/or $Y$ variables. Exploiting a property of logarithms that small changes in $\log X$ (or $\log Y$) are approximately equal to percentage changes in $X$ (or $Y$). This leads the $\beta$s in the population regression model to have approximate percentage change interpretations of one variable on another. A percentage change is a non-linear change, since the actual amount of the change depends on the starting value.

5. See table 8.2 for the different population models using logs, and see the following discussion for the interpretations of the $\beta$s in the different models.`,
);

step(
  "4.3",
  r`10.1 Homoskedasticity

If assumption A4 is satisfied, then $\epsilon$ is identically distributed. This means that all of the $\epsilon_i$ have the same variance. That is, all of the random effects that determine $Y$, outside of $X$, have the same dispersion. The term homoskedasticity (same dispersion) refers to this situation of identically distributed error terms.

Stated mathematically, homoskedasticity means:

$$Var[\epsilon_i \mid X_i] = \sigma^2, \quad \forall i$$

The variance of $\epsilon$ is constant, even conditional on knowing the value of $X$.

Homoskedasticity means that the squared vertical distance of each data point from the (population or estimated) line is, on average, the same. The values of the $X$ variables do not influence this distance (the variance of the random unobservable effects are not determined by any of the values of $X$). See figure 10.2.

10.2 Heteroskedasticity

Heteroskedasticity refers to the situation where the variance of the error term $\epsilon$ is not equal for all observations. The term heteroskedasticity means differing dispersion. Mathematically:

$$Var[\epsilon_i \mid X_i] \neq \sigma^2, \quad \forall i$$

10.2.1 The implications of heteroskedasticity

Heteroskedasticity is a violation of A.4, since each $\epsilon_i$ is not identically distributed. Heteroskedasticity has two main implications for the estimation procedures we have been using in this book:

(i) The OLS estimator is no longer efficient.

(ii) The estimated standard errors are inconsistent.

The inefficency of OLS is arguably a smaller problem than the inconsistency of the variance estimator. (ii) means that the estimated standard errors in our regression output are wrong, leading to the incorrect $t$-statistics and confidence intervals. Hypothesis testing, in general, is invalid.

10.2.2 Fixing heteroskedasticity - robust standard errors

To fix problem (i), the inefficiency of OLS, we must use a different estimator, such as Generalized Least Squares (GLS). GLS is not discussed here. To fix (ii), the more important problem of the inconsistency of the standard errors, the formula for $Var[b_1]$ must be updated to take into account the possibility of heteroskedasticity.

Updating the formula to allow for heteroskedasticity in the estimation of the standard errors gives what is typically referred to as robust standard errors.

1. Explain the difference between homoskedasticity and heteroskedasticity.

3. Describe the problem that heteroskedasticity brings to LS estimation.

4. Briefly explain how to fix the inconsistency of the standard errors in LS estimation, in the presence of heteroskedasticity.`,
  "10.1–10.2 and 10.3",
  [],
  r`1. Under homoskedasticity, the variance of the error term is constant. Under heteroskedasticity, the variance of the error term can differ by observation, and can depend on the $x$ variables, or on other variables. To state the difference mathematically, see Sections 10.1 and 10.2.

3. If we assume that the errors are homoskedastic, when they are actually heteroskedastic, the estimators for the standard errors of the $b$ are biased and inconsistent. This means that $t$-statistics, $p$-values, confidence intervals, will be wrong, and hypothesis testing in general will be invalid. The usual computer output from the summary() command will be wrong (but the $b$ themselves are unaffected). As a side note, the LS estimator is inefficient under heteroskedasticity, but it is still unbiased and consistent.

4. We can use robust standard errors. We can update the formula for the variance of $b$, in order to take account of heteroskedasticity. This gives us a consistent estimator for the standard errors.`,
);

step(
  "4.4",
  r`Chapter 11 Instrumental Variables

For least-squares to work well, we need to make a very important assumption about the error term $\epsilon$. The error term $\epsilon$ must be independent from the $x$ variables, or else least-squares is biased and inconsistent.

For example, in the simple model:

$$y = \beta_0 + \beta_1 x + \epsilon,$$

if $x$ is correlated with $\epsilon$ then the least-squares estimator for $\beta_1$ will be wrong (biased and inconsistent)!

11.1 Missing, lurking, or confounding variables

The error term contains missing variables, that determine $y$. So, those missing variables need to be uncorrelated with the $x$ variables for LS to work. This is often unreasonable!

A lurking, or confounding variable is one that threatens our ability to correctly estimate the effect that an $x$ variable has on a $y$ variable. Confounding variables are a major issue in analyses of causal inference, and are of tremendous import in many areas, not just economics.

The situation depicted in Figure 11.1, where $m$ is correlated with both $x$ and $y$, implies that the effect of $x$ on $y$ cannot be estimated correctly by LS. That is, the estimated $\beta_1$ ($b_1$) is wrong in the population model:

$$y = \beta_0 + \beta_1 x + \epsilon$$

The reason that $b_1$ gives the wrong answer for the true effect of $x$ on $y$ is that:

• A change in $m$ is associated with a change in both $x$ and $y$.
• When we “see” $x$ changing, we know $m$ is also changing.
• Attributing changes in $y$ due to changes in $x$ alone becomes impossible, since we don’t know how much of the change in $y$ came from $m$.

The solution to the problem is to include the $m$ variable in the model! If we can’t actually observe $m$ (but we can imagine that it is there) then we must use clever strategies and more advanced methods to deal with it.

11.2 Instrumental variable (IV)

A variable, $z$, qualifies as an instrument if it satisfies two conditions.

An instrumental variable, $z$, must be:

1. Correlated with the endogenous variable $x$.
• This is sometimes called the “relevance” of an IV.
• This condition can be tested.

2. Uncorrelated with the error term, or equivalently, uncorrelated with the missing variable $m$.
• This is sometimes called the “exclusion” restriction.
• This restriction cannot be easily tested.

If we can find a valid instrument, then we can use it to extract the “good” or “clean” variation from $x$. With endogeneity, changes in $x$ are associated with changes in $\epsilon$. But, changes in $x$ due to $z$ are not associated with the error term, because $z$ is not correlated with $\epsilon$.

11.3 IV estimation / Two-stage least-squares (2SLS)

Instrumental variables estimation, also called two-stage least-squares, is a statistical method for estimating $\beta_1$ in the equation:

$$y = \beta_0 + \beta_1 x + \epsilon,$$

when $x$ is endogenous (correlated to $\epsilon$), but when we have a valid instrument $z$. The IV estimation gives us a consistent estimator for $\beta_1$, whereas LS gives us an inconsistent estimator and should not be used.

11.3.1 1st stage of 2SLS

In the first stage, we estimate an auxiliary regression to extract variation from $x$ which is independent from $\epsilon$. The 1st stage regression model is:

$$x = \alpha_0 + \alpha_1 z + u \qquad (11.1)$$

After estimating this model by least-squares, we have the estimates $\hat\alpha_0$ and $\hat\alpha_1$. We then use this model to get the least-square predictions for $x$:

$$\hat x = \hat\alpha_0 + \hat\alpha_1 z \qquad (11.2)$$

The LS predicted values $\hat x$ from equation 11.2 are independent from the error term! That is, $\hat x$ contains changes in $x$ that are due to $z$ only, and since $z$ is uncorrelated with $\epsilon$, so is $\hat x$ uncorrelated with $\epsilon$.

11.3.2 2nd stage of 2SLS

In the second stage, we estimate the population model by LS, but instead of using $x$, we replace it with $\hat x$ from the 1st stage. Although $x$ is endogenous, $\hat x$ is not!

1. What is the missing variable problem?

2. What is the general goal of instrumental variable (IV) estimation?

3. What two properties must an instrumental variable have?`,
  "11.1–11.3 and 11.6",
  [],
  r`1. When a variable that is both correlated to $X$ and $Y$ is omitted, we get omitted variable bias. The solution is to include the omitted variable in the model. The missing variable problem is similar, except that the missing variable cannot be included in the model (because it’s missing!). When a variable that is correlated to both $X$ and $Y$ is missing, the least squares estimator for the effect of $X$ on $Y$ will be biased and inconsistent.

2. The general goal of IV estimation is to solve the missing variable problem: obtain a consistent estimator for the effect of $X$ on $Y$ when there is a missing variable that is correlated to both $X$ and $Y$.

3. An instrument must be (i) uncorrelated with the missing variable, and (ii) correlated with the “problem” $X$ variable (the “problem” being the correlation with the missing variable).`,
);

CARDS.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

export { CARDS };

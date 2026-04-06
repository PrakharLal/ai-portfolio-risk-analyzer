import numpy as np

def monte_carlo_simulation(returns, weights, num_simulations=1000):
    mean_returns = returns.mean()
    cov_matrix = returns.cov()

    results = []

    for _ in range(num_simulations):
        simulated_returns = np.random.multivariate_normal(
            mean_returns, cov_matrix
        )
        portfolio_return = np.sum(simulated_returns * weights)
        results.append(portfolio_return)

    return results
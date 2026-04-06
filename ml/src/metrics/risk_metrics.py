import numpy as np

def volatility(returns):
    return np.std(returns) * np.sqrt(252)

def sharpe_ratio(returns, risk_free=0.01):
    return (returns.mean()*252 - risk_free) / (returns.std()*np.sqrt(252))

def portfolio_return(returns, weights):
    return (returns.mean() * weights).sum() * 252

def portfolio_volatility(returns, weights):
    cov_matrix = returns.cov() * 252
    return (weights.T @ cov_matrix @ weights) ** 0.5
"""
Data Loader - Portfolio data utilities
"""

import pandas as pd
import yfinance as yf

class PortfolioLoader:
    """Load and create portfolio data"""
    
    @staticmethod
    def create_mock_portfolio():
        """Create sample portfolio for testing"""
        tickers = ['AAPL', 'MSFT', 'TSLA', 'VTI', 'BND', 'GLD', 'XOM']
        weights = [0.15, 0.15, 0.10, 0.25, 0.20, 0.10, 0.05]
        sectors = [PortfolioLoader.get_sector(t) for t in tickers]
        
        return pd.DataFrame({
            'Ticker': tickers,
            'Weight': weights,
            'Sector': sectors
        })
    
    @staticmethod
    def get_sector(ticker):
        """Fetch sector from Yahoo Finance"""
        try:
            info = yf.Ticker(ticker).info
            return info.get('sector', 'Unknown')
        except:
            return 'Unknown'
    
    @staticmethod
    def from_dict(portfolio_dict):
        """Create portfolio from dictionary with auto sector lookup"""
        total = sum(portfolio_dict.values())
        if abs(total - 1.0) > 0.01:
            raise ValueError(f"Portfolio weights must sum to ~1.0, got {total}")
        
        tickers = list(portfolio_dict.keys())
        weights = list(portfolio_dict.values())
        sectors = [PortfolioLoader.get_sector(t) for t in tickers]
        
        return pd.DataFrame({
            'Ticker': tickers,
            'Weight': weights,
            'Sector': sectors
        })
    
    @staticmethod
    def from_csv(filepath):
        """Load portfolio from CSV file"""
        df = pd.read_csv(filepath)
        if 'Sector' not in df.columns:
            df['Sector'] = df['Ticker'].apply(PortfolioLoader.get_sector)
        return df

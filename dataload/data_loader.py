"""
Data Loader - Portfolio data utilities
Full Yahoo Finance metadata with clean, readable formatting
"""

import pandas as pd
import yfinance as yf
import json
from pprint import pprint


class PortfolioLoader:
    """Load and create portfolio data"""

    # --------------------------------------------------
    # Portfolio creation
    # --------------------------------------------------
    @staticmethod
    def create_mock_portfolio():
        """Create sample portfolio for testing"""
        tickers = ["AAPL", "MSFT", "TSLA", "VTI", "BND", "GLD", "XOM"]
        weights = [0.15, 0.15, 0.10, 0.25, 0.20, 0.10, 0.05]
        sectors = [PortfolioLoader.get_sector(t) for t in tickers]

        return pd.DataFrame({
            "Ticker": tickers,
            "Weight": weights,
            "Sector": sectors
        })

    # --------------------------------------------------
    # Yahoo Finance helpers
    # --------------------------------------------------
    @staticmethod
    def get_sector(ticker):
        """
        Fetch sector from Yahoo Finance metadata.
        Returns a STRING only.
        """
        try:
            info = yf.Ticker(ticker).info
            return info.get("sector", "Unknown")
        except Exception:
            return "Unknown"

    @staticmethod
    def get_full_info(ticker, view="pretty"):
        """
        Fetch full Yahoo Finance info in readable formats.

        view options:
        - "dict"   : raw dictionary
        - "pretty" : formatted print (recommended for reading)
        - "table"  : pandas DataFrame
        - "json"   : JSON formatted print
        """
        try:
            info = yf.Ticker(ticker).info

            if view == "pretty":
                print("\n========== Yahoo Finance Info ==========")
                pprint(info, sort_dicts=False)
                print("=======================================\n")
                return info

            elif view == "table":
                return pd.DataFrame(
                    info.items(),
                    columns=["Field", "Value"]
                )

            elif view == "json":
                print(json.dumps(info, indent=2))
                return info

            return info

        except Exception as e:
            print(f"Error fetching Yahoo Finance info for {ticker}: {e}")
            return {}

    # --------------------------------------------------
    # Input loaders
    # --------------------------------------------------
    @staticmethod
    def from_dict(portfolio_dict):
        """Create portfolio from dictionary with auto sector lookup"""
        total = sum(portfolio_dict.values())
        if abs(total - 1.0) > 0.01:
            raise ValueError(
                f"Portfolio weights must sum to ~1.0, got {total:.3f}"
            )

        tickers = list(portfolio_dict.keys())
        weights = list(portfolio_dict.values())
        sectors = [PortfolioLoader.get_sector(t) for t in tickers]

        return pd.DataFrame({
            "Ticker": tickers,
            "Weight": weights,
            "Sector": sectors
        })

    @staticmethod
    def from_csv(filepath):
        """Load portfolio from CSV file"""
        df = pd.read_csv(filepath)

        if "Sector" not in df.columns:
            df["Sector"] = df["Ticker"].apply(PortfolioLoader.get_sector)

        return df

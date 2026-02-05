from data_loader import PortfolioLoader
from portfolio_analyzer import PortfolioAnalyzer

# ============================================================
# LOAD DATA
# ============================================================
df = PortfolioLoader.create_mock_portfolio()

# ============================================================
# RUN ANALYZER
# ============================================================
analyzer = PortfolioAnalyzer(
    portfolio_data=df,
    risk_tolerance="medium",
    lookback_days=252
)

summary = analyzer.get_summary_report()

# ============================================================
# PRETTY PRINT CORE REPORT
# ============================================================
def pretty_print_report(report):
    print("\n" + "=" * 80)
    print("PORTFOLIO DIAGNOSTIC REPORT")
    print("=" * 80)

    # --------------------------------------------------
    # Portfolio overview
    # --------------------------------------------------
    print("\n📦 ASSETS")
    print("   " + ", ".join(report["assets"]))

    print("\n⚖️  RISK PROFILE")
    print(f"   Classification: {report['portfolio_risk_classification'].upper()}")
    print(f"   Volatility: {report['volatility']:.2%}")
    print(f"   Max Drawdown: {report['max_drawdown']:.2%}")

    # --------------------------------------------------
    # Risk-adjusted performance
    # --------------------------------------------------
    print("\n📈 RISK-ADJUSTED PERFORMANCE")
    print(f"   Sharpe Ratio: {report['sharpe_ratio']:.2f}")

    # --------------------------------------------------
    # Risk alignment
    # --------------------------------------------------
    alignment = report["risk_alignment"]
    print("\n🎯 RISK ALIGNMENT")
    print(f"   Status: {alignment['status'].upper()}")
    print(f"   User Tolerance: {alignment['user_risk_tolerance']}")
    print(f"   Portfolio Risk: {alignment['portfolio_risk_classification']}")

    # --------------------------------------------------
    # Diversification
    # --------------------------------------------------
    div = report["diversification"]
    print("\n🧩 DIVERSIFICATION")
    print(f"   Diversification Score: {div['diversification_score']:.1f}/100")
    print(f"   Effective Assets: {div['effective_number_of_assets']:.2f}")
    print(f"   Actual Assets: {div['actual_number_of_assets']}")

    # --------------------------------------------------
    # Correlation
    # --------------------------------------------------
    corr = report["correlation_analysis"]
    print("\n🔗 CORRELATION ANALYSIS")
    print(f"   Avg Pairwise Correlation: {corr['average_pairwise_correlation']:.3f}")
    print(f"   Assessment: {corr['assessment']}")

    # --------------------------------------------------
    # Risk concentration
    # --------------------------------------------------
    conc = report["risk_concentration"]
    print("\n🔥 RISK CONCENTRATION (Top Contributors)")
    for item in conc["top_contributors"]:
        print(f"   • {item['ticker']}: {item['risk_contribution_pct']:.1f}% of total risk")

    # --------------------------------------------------
    # Individual volatility
    # --------------------------------------------------
    print("\n📊 INDIVIDUAL ASSET VOLATILITY (Annualized)")
    for t, v in sorted(
        report["individual_volatility"].items(),
        key=lambda x: x[1],
        reverse=True
    ):
        print(f"   {t}: {v:.2%}")

    print("\n" + "=" * 80)


# ============================================================
# PRINT CORE REPORT
# ============================================================
pretty_print_report(summary)

# ============================================================
# STEP 7 — PCA + CLUSTERING OUTPUT
# ============================================================
pca = summary["pca_clustering"]

print("\n🧠 PCA + CLUSTERING ANALYSIS")
print("=" * 80)

# ------------------------------------------------------------
# PCA explained variance
# ------------------------------------------------------------
print("\n📊 PCA EXPLAINED VARIANCE")
for i, v in enumerate(pca["explained_variance"], 1):
    print(f"   PC{i}: {v * 100:.2f}%")

# ------------------------------------------------------------
# PCA loadings
# ------------------------------------------------------------
print("\n📐 PCA ASSET LOADINGS (Dominant Factor)")
for asset, pcs in pca["asset_loadings"].items():
    dominant_pc = max(pcs, key=lambda k: abs(pcs[k]))
    print(f"\n{asset}")
    for pc, value in pcs.items():
        print(f"   {pc}: {value:+.3f}")
    print(f"   → Dominant PC: {dominant_pc}")

# ------------------------------------------------------------
# Clusters
# ------------------------------------------------------------
print("\n🔗 ASSET CLUSTERS (Behavioral Similarity)")
for cid, assets in pca["clusters"].items():
    print(f"   Cluster {cid}: {assets}")

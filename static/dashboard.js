const loadMockBtn = document.getElementById('loadMockBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const reportContainer = document.getElementById('reportContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

let currentPortfolio = null;

loadMockBtn.addEventListener('click', loadMockPortfolio);
analyzeBtn.addEventListener('click', analyzePortfolio);

async function loadMockPortfolio() {
    try {
        loadingSpinner.style.display = 'flex';
        errorMessage.style.display = 'none';
        
        const response = await fetch('/api/mock-portfolio');
        const portfolio = await response.json();
        
        currentPortfolio = portfolio;
        analyzeBtn.disabled = false;
        loadingSpinner.style.display = 'none';
        
        console.log('Mock portfolio loaded:', portfolio);
    } catch (error) {
        showError('Failed to load mock portfolio: ' + error.message);
        loadingSpinner.style.display = 'none';
    }
}

async function analyzePortfolio() {
    if (!currentPortfolio) return;
    
    try {
        loadingSpinner.style.display = 'flex';
        errorMessage.style.display = 'none';
        
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                portfolio: currentPortfolio,
                risk_tolerance: 'medium',
                lookback_days: 252
            })
        });
        
        if (!response.ok) throw new Error('Analysis failed');
        
        const report = await response.json();
        displayReport(report);
        loadingSpinner.style.display = 'none';
    } catch (error) {
        showError('Analysis error: ' + error.message);
        loadingSpinner.style.display = 'none';
    }
}

function displayReport(report) {
    // Assets
    document.getElementById('assetsDisplay').innerHTML = report.assets
        .map(a => `<span class="asset-tag">${a}</span>`)
        .join('');
    
    // Risk Profile
    document.getElementById('riskClass').textContent = report.portfolio_risk_classification.toUpperCase();
    document.getElementById('volatility').textContent = (report.volatility * 100).toFixed(2) + '%';
    document.getElementById('maxDD').textContent = (report.max_drawdown * 100).toFixed(2) + '%';
    
    // Risk-Adjusted Performance
    document.getElementById('sharpe').textContent = report.sharpe_ratio.toFixed(2);
    
    // Risk Alignment
    const alignment = report.risk_alignment;
    document.getElementById('alignStatus').textContent = alignment.status.toUpperCase();
    document.getElementById('userTolerance').textContent = alignment.user_risk_tolerance;
    document.getElementById('portRisk').textContent = alignment.portfolio_risk_classification;
    
    // Diversification
    const div = report.diversification;
    document.getElementById('divScore').textContent = div.diversification_score.toFixed(1) + '/100';
    document.getElementById('effAssets').textContent = div.effective_number_of_assets.toFixed(2);
    document.getElementById('actAssets').textContent = div.actual_number_of_assets;
    
    // Correlation Analysis
    const corr = report.correlation_analysis;
    document.getElementById('avgCorr').textContent = corr.average_pairwise_correlation.toFixed(3);
    document.getElementById('corrAssessment').textContent = corr.assessment;
    
    // Risk Concentration
    const concHTML = report.risk_concentration.top_contributors
        .map(item => `
            <div class="list-item">
                <span class="ticker">${item.ticker}</span>
                <span class="value">${item.risk_contribution_pct.toFixed(1)}% of total risk</span>
            </div>
        `).join('');
    document.getElementById('riskConc').innerHTML = concHTML;
    
    // Individual Volatility
    const volatItems = Object.entries(report.individual_volatility)
        .sort((a, b) => b[1] - a[1])
        .map(([ticker, vol]) => `
            <div class="list-item">
                <span class="ticker">${ticker}</span>
                <span class="value">${(vol * 100).toFixed(2)}%</span>
            </div>
        `).join('');
    document.getElementById('indVolatility').innerHTML = volatItems;
    
    // PCA + Clustering
    const pca = report.pca_clustering;
    
    // Explained Variance
    const varianceHTML = pca.explained_variance
        .map((v, i) => `
            <div class="pca-item">
                <div class="label">PC${i + 1}</div>
                <div class="value">${(v * 100).toFixed(2)}%</div>
            </div>
        `).join('');
    document.getElementById('pcaVariance').innerHTML = varianceHTML;
    
    // Asset Loadings
    const loadingsHTML = Object.entries(pca.asset_loadings)
        .map(([asset, pcs]) => {
            const dominant = Object.entries(pcs)
                .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))[0];
            
            return `
                <div class="loading-card">
                    <div class="asset-name">${asset}</div>
                    ${Object.entries(pcs)
                        .map(([pc, val]) => `
                            <div class="pc-value">
                                <span>${pc}</span>
                                <span>${val.toFixed(3)}</span>
                            </div>
                        `).join('')}
                    <div class="dominant">→ Dominant: ${dominant[0]}</div>
                </div>
            `;
        }).join('');
    document.getElementById('assetLoadings').innerHTML = loadingsHTML;
    
    // Clusters
    const clustersHTML = Object.entries(pca.clusters)
        .map(([cid, assets]) => `
            <div class="cluster-card">
                <div class="cluster-title">Cluster ${cid}</div>
                <div class="cluster-assets">
                    ${assets.map(a => `<div class="cluster-asset">${a}</div>`).join('')}
                </div>
            </div>
        `).join('');
    document.getElementById('clusters').innerHTML = clustersHTML;
    
    reportContainer.style.display = 'block';
    window.scrollTo(0, 0);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

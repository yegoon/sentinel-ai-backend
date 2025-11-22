import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Activity, Users, DollarSign, TrendingUp, Bell, Settings, BarChart3, Smartphone, Gamepad2 } from 'lucide-react';

// API Configuration - will use demo mode in artifacts, real API in production
const getApiUrl = () => {
  // In production (Vite), this will use environment variable
  // In artifacts, this will be undefined and trigger demo mode
  try {
    return typeof window !== 'undefined' && window.VITE_API_URL 
      ? window.VITE_API_URL 
      : null;
  } catch {
    return null;
  }
};

const API_URL = getApiUrl();

const FraudDetectionPlatform = () => {
  const [activeProduct, setActiveProduct] = useState('swapguard');
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({
    swapguard: {
      totalChecks: 1247,
      fraudsPrevented: 43,
      riskScore: 23,
      activeMonitoring: 8934
    },
    betshield: {
      totalBets: 45231,
      fraudsPrevented: 127,
      multiAccounts: 18,
      bonusAbuse: 9
    }
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  // Check API connection on mount
  useEffect(() => {
    checkAPIConnection();
  }, []);

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      generateAlert();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        swapguard: {
          ...prev.swapguard,
          totalChecks: prev.swapguard.totalChecks + Math.floor(Math.random() * 5),
          fraudsPrevented: prev.swapguard.fraudsPrevented + (Math.random() > 0.95 ? 1 : 0)
        },
        betshield: {
          ...prev.betshield,
          totalBets: prev.betshield.totalBets + Math.floor(Math.random() * 20),
          fraudsPrevented: prev.betshield.fraudsPrevented + (Math.random() > 0.95 ? 1 : 0)
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const checkAPIConnection = async () => {
    if (!API_URL) {
      // No API URL, use demo mode
      setDemoMode(true);
      setIsConnected(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/health`, { 
        method: 'GET',
        mode: 'cors'
      });
      
      if (response.ok) {
        setIsConnected(true);
        setDemoMode(false);
        setIsLoading(false);
        // Start fetching real data
        fetchRealAlerts();
        fetchRealStats();
      } else {
        useDemoMode();
      }
    } catch (error) {
      console.log('API not available, using demo mode');
      useDemoMode();
    }
  };

  const fetchRealAlerts = async () => {
    if (!API_URL || demoMode) return;
    
    try {
      const response = await fetch(`${API_URL}/api/v1/alerts/recent?limit=10`);
      const data = await response.json();
      if (data.alerts) {
        setAlerts(data.alerts);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const fetchRealStats = async () => {
    if (!API_URL || demoMode) return;
    
    try {
      const response = await fetch(`${API_URL}/api/v1/stats`);
      const data = await response.json();
      if (data) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const useDemoMode = () => {
    setDemoMode(true);
    setIsConnected(true);
    setIsLoading(false);
  };

  const generateAlert = () => {
    const timestamp = new Date().toLocaleTimeString();
    const swapGuardAlerts = [
      { 
        alert_id: Math.random().toString(), 
        product: 'swapguard', 
        alert_type: 'high_risk', 
        message: 'High-risk SIM swap detected', 
        risk_score: 94, 
        timestamp: new Date().toISOString(), 
        details: { phone: '+254712***890', location: 'Mombasa' }
      },
      { 
        alert_id: Math.random().toString(), 
        product: 'swapguard', 
        alert_type: 'medium_risk', 
        message: 'Unusual SIM swap request', 
        risk_score: 67, 
        timestamp: new Date().toISOString(), 
        details: { phone: '+254723***456', location: 'Nairobi' }
      },
      { 
        alert_id: Math.random().toString(), 
        product: 'swapguard', 
        alert_type: 'blocked', 
        message: 'SIM swap blocked - critical risk', 
        risk_score: 98, 
        timestamp: new Date().toISOString(), 
        details: { phone: '+254734***123', location: 'Eldoret' }
      }
    ];
    
    const betShieldAlerts = [
      { 
        alert_id: Math.random().toString(), 
        product: 'betshield', 
        alert_type: 'multi_account', 
        message: 'Multi-accounting detected', 
        risk_score: 91, 
        timestamp: new Date().toISOString(), 
        details: { user_id: 'User_7892', amount: 'KSh 45,000' }
      },
      { 
        alert_id: Math.random().toString(), 
        product: 'betshield', 
        alert_type: 'bonus_abuse', 
        message: 'Bonus abuse pattern identified', 
        risk_score: 88, 
        timestamp: new Date().toISOString(), 
        details: { user_id: 'User_4521', amount: 'KSh 35,000' }
      },
      { 
        alert_id: Math.random().toString(), 
        product: 'betshield', 
        alert_type: 'suspicious_pattern', 
        message: 'Suspicious betting pattern', 
        risk_score: 73, 
        timestamp: new Date().toISOString(), 
        details: { user_id: 'User_3344', amount: 'KSh 12,000' }
      }
    ];

    const allAlerts = [...swapGuardAlerts, ...betShieldAlerts];
    const randomAlert = allAlerts[Math.floor(Math.random() * allAlerts.length)];
    
    setAlerts(prev => [randomAlert, ...prev].slice(0, 8));
  };

  const getRiskColor = (risk) => {
    if (risk >= 80) return 'text-red-600 bg-red-50';
    if (risk >= 50) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const getAlertColor = (type) => {
    if (type === 'high_risk' || type === 'multi_account' || type === 'bonus_abuse' || type === 'blocked') {
      return 'border-l-4 border-red-500 bg-red-50';
    }
    if (type === 'medium_risk' || type === 'suspicious_pattern') {
      return 'border-l-4 border-orange-500 bg-orange-50';
    }
    return 'border-l-4 border-green-500 bg-green-50';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
          <p className="text-xl">Initializing Sentinel AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Sentinel AI Kenya</h1>
                <p className="text-sm text-slate-400">Guarding Kenya's Digital Economy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="text-xs text-slate-400">
                  {demoMode ? 'Demo Mode' : isConnected ? 'Live System' : 'Connecting...'}
                </span>
              </div>
              <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-cyan-400 transition-colors" />
              <Settings className="w-5 h-5 text-slate-400 cursor-pointer hover:text-cyan-400 transition-colors" />
            </div>
          </div>
        </div>
      </header>

      {/* Product Tabs */}
      <div className="border-b border-slate-700 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveProduct('swapguard')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeProduct === 'swapguard'
                  ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              SwapGuard
            </button>
            <button
              onClick={() => setActiveProduct('betshield')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeProduct === 'betshield'
                  ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              BetShield
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Dashboard */}
        {activeProduct === 'swapguard' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-cyan-400" />
              SwapGuard - SIM Swap Detection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Checks Today</p>
                    <p className="text-3xl font-bold mt-1">{stats.swapguard.totalChecks.toLocaleString()}</p>
                  </div>
                  <Activity className="w-10 h-10 text-cyan-400 opacity-50" />
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-green-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Frauds Prevented</p>
                    <p className="text-3xl font-bold mt-1 text-green-400">{stats.swapguard.fraudsPrevented}</p>
                  </div>
                  <Shield className="w-10 h-10 text-green-400 opacity-50" />
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-orange-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Average Risk Score</p>
                    <p className="text-3xl font-bold mt-1 text-orange-400">{stats.swapguard.riskScore}%</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-orange-400 opacity-50" />
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Active Monitoring</p>
                    <p className="text-3xl font-bold mt-1">{stats.swapguard.activeMonitoring.toLocaleString()}</p>
                  </div>
                  <Users className="w-10 h-10 text-cyan-400 opacity-50" />
                </div>
              </div>
            </div>

            {/* SwapGuard Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  Detection Capabilities
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Location Anomaly Detection</p>
                      <p className="text-sm text-slate-400">Identifies swaps from unusual geographic locations</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Behavioral Analysis</p>
                      <p className="text-sm text-slate-400">ML models detect suspicious patterns in swap requests</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Real-Time Alerts</p>
                      <p className="text-sm text-slate-400">Instant SMS/Email notifications for high-risk swaps</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Biometric Verification</p>
                      <p className="text-sm text-slate-400">Facial recognition and liveness detection integration</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  Integration Options
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded p-4">
                    <p className="font-medium mb-2">RESTful API</p>
                    <code className="text-xs text-cyan-400">POST /api/v1/swapguard/check</code>
                    <p className="text-sm text-slate-400 mt-2">Sub-100ms response time for real-time validation</p>
                  </div>
                  <div className="bg-slate-900 rounded p-4">
                    <p className="font-medium mb-2">Webhook Notifications</p>
                    <code className="text-xs text-cyan-400">POST to your endpoint</code>
                    <p className="text-sm text-slate-400 mt-2">Instant alerts pushed to your systems</p>
                  </div>
                  <div className="bg-slate-900 rounded p-4">
                    <p className="font-medium mb-2">SDK Integration</p>
                    <p className="text-sm text-slate-400">Python, Java, Node.js libraries available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeProduct === 'betshield' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-cyan-400" />
              BetShield - Betting Fraud Prevention
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Bets Analyzed Today</p>
                    <p className="text-3xl font-bold mt-1">{stats.betshield.totalBets.toLocaleString()}</p>
                  </div>
                  <Activity className="w-10 h-10 text-cyan-400 opacity-50" />
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-green-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Frauds Prevented</p>
                    <p className="text-3xl font-bold mt-1 text-green-400">{stats.betshield.fraudsPrevented}</p>
                  </div>
                  <Shield className="w-10 h-10 text-green-400 opacity-50" />
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-red-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Multi-Accounts Blocked</p>
                    <p className="text-3xl font-bold mt-1 text-red-400">{stats.betshield.multiAccounts}</p>
                  </div>
                  <AlertTriangle className="w-10 h-10 text-red-400 opacity-50" />
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-orange-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Bonus Abuse Cases</p>
                    <p className="text-3xl font-bold mt-1 text-orange-400">{stats.betshield.bonusAbuse}</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-orange-400 opacity-50" />
                </div>
              </div>
            </div>

            {/* BetShield Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  Detection Capabilities
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Multi-Account Detection</p>
                      <p className="text-sm text-slate-400">Device fingerprinting and behavioral biometrics</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Bonus Abuse Prevention</p>
                      <p className="text-sm text-slate-400">Track redemption patterns and coordinated fraud rings</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Payment Fraud Detection</p>
                      <p className="text-sm text-slate-400">Stolen card/M-Pesa detection and chargeback prediction</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">KYC Verification</p>
                      <p className="text-sm text-slate-400">ID verification, face liveness, and age verification</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  ROI Calculator
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded p-4">
                    <p className="text-sm text-slate-400">Average Fraud Loss per Incident</p>
                    <p className="text-2xl font-bold text-red-400 mt-1">KSh 45,000</p>
                  </div>
                  <div className="bg-slate-900 rounded p-4">
                    <p className="text-sm text-slate-400">Frauds Prevented (Monthly)</p>
                    <p className="text-2xl font-bold text-green-400 mt-1">~380 cases</p>
                  </div>
                  <div className="bg-slate-900 rounded p-4">
                    <p className="text-sm text-slate-400">Estimated Savings</p>
                    <p className="text-2xl font-bold text-cyan-400 mt-1">KSh 17.1M/month</p>
                  </div>
                  <div className="text-sm text-slate-400 italic">
                    * Based on average betting operator processing 10K bets/day
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Real-Time Alerts */}
        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              Live Fraud Detection Stream
              <span className="ml-auto text-sm text-slate-400">
                {demoMode ? 'Demo Mode' : 'Real-time Monitoring'}
              </span>
            </h3>
          </div>
          <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
            {alerts.length === 0 && (
              <p className="text-slate-400 text-center py-8">Monitoring for suspicious activity...</p>
            )}
            {alerts.map((alert, index) => (
              <div key={alert.alert_id || index} className={`p-4 rounded-lg ${getAlertColor(alert.alert_type)} transition-all hover:shadow-lg`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className={`w-4 h-4 ${alert.risk_score >= 80 ? 'text-red-600' : alert.risk_score >= 50 ? 'text-orange-600' : 'text-green-600'}`} />
                      <span className="font-semibold text-slate-900">{alert.message}</span>
                    </div>
                    <div className="text-sm text-slate-700 space-y-1">
                      {alert.product === 'swapguard' && alert.details && (
                        <>
                          <p>Phone: {alert.details.phone} | Location: {alert.details.location}</p>
                        </>
                      )}
                      {alert.product === 'betshield' && alert.details && (
                        <>
                          <p>User ID: {alert.details.user_id}</p>
                          {alert.details.amount && <p>Amount: {alert.details.amount}</p>}
                        </>
                      )}
                      <p className="text-xs text-slate-600">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(alert.risk_score)}`}>
                    Risk: {alert.risk_score}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Sentinel AI - Your Digital Guardian</h3>
          <p className="text-cyan-100 mb-6">Join Kenya's leading banks and betting companies. 30-day free pilot available.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors shadow-lg">
              Schedule Demo
            </button>
            <button className="bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-800 transition-colors border border-cyan-500 shadow-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-slate-400 text-sm">
          <p className="font-semibold text-cyan-400 mb-2">Sentinel AI Kenya © 2025</p>
          <p>SwapGuard & BetShield - Powered by Advanced Machine Learning</p>
          <p className="mt-2 text-xs">Protecting Kenya's Digital Economy | Trusted by Leading Financial Institutions</p>
        </div>
      </footer>
    </div>
  );
};

export default FraudDetectionPlatform;

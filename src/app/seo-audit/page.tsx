'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, Info, TrendingUp, BarChart3, Search, Rss } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { auditSiteSEO, auditArticleSEO, getSEOInsights, checkDuplicateContent, SEOAuditResult, SEOIssue } from '@/lib/seo-audit';
import { articles } from '@/data/articles';

export default function SEOAuditPage() {
  const [siteAudit, setSiteAudit] = useState<SEOAuditResult | null>(null);
  const [insights, setInsights] = useState<any>(null);
  const [duplicates, setDuplicates] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'articles' | 'insights'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runAudit = async () => {
      setLoading(true);
      
      // Run audits
      const siteResult = auditSiteSEO();
      const seoInsights = getSEOInsights();
      const duplicateContent = checkDuplicateContent();
      
      setSiteAudit(siteResult);
      setInsights(seoInsights);
      setDuplicates(duplicateContent);
      setLoading(false);
    };

    runAudit();
  }, []);

  const getIssueIcon = (type: SEOIssue['type']) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Running SEO audit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
            SEO Audit Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Comprehensive analysis of your site's SEO performance, content optimization, and RSS feed integration.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'articles', label: 'Article Analysis', icon: Search },
            { id: 'insights', label: 'Content Insights', icon: TrendingUp },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {selectedTab === 'overview' && siteAudit && (
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold mb-4 ${getScoreColor(siteAudit.score)}`}>
                {siteAudit.score}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Overall SEO Score</h2>
              <p className="text-slate-600">
                {siteAudit.score >= 90 ? 'Excellent' : siteAudit.score >= 80 ? 'Good' : 'Needs Improvement'}
              </p>
            </div>

            {/* Strengths */}
            {siteAudit.strengths.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Strengths
                </h3>
                <div className="space-y-2">
                  {siteAudit.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-green-800">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Issues */}
            {siteAudit.issues.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                  Issues Found ({siteAudit.issues.length})
                </h3>
                <div className="space-y-3">
                  {siteAudit.issues.slice(0, 10).map((issue, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <p className="text-slate-800">{issue.message}</p>
                        {issue.articleSlug && (
                          <p className="text-sm text-slate-500 mt-1">
                            Article: {issue.articleSlug}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {issue.priority}
                      </Badge>
                    </div>
                  ))}
                  {siteAudit.issues.length > 10 && (
                    <p className="text-sm text-slate-500 text-center pt-2">
                      ... and {siteAudit.issues.length - 10} more issues
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {siteAudit.recommendations.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                  Recommendations
                </h3>
                <div className="space-y-2">
                  {siteAudit.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RSS Integration Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Rss className="mr-2 h-5 w-5 text-orange-500" />
                RSS Feed Integration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-800">Main RSS Feed</span>
                  </div>
                  <p className="text-sm text-green-700">Active at /rss.xml</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-800">Category Feeds</span>
                  </div>
                  <p className="text-sm text-green-700">12 specialized feeds available</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Button asChild size="sm" variant="outline">
                  <Link href="/rss">View RSS Feeds</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/rss.xml" target="_blank">Test Main Feed</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'articles' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Article SEO Analysis</h3>
              <div className="space-y-4">
                {articles.slice(0, 10).map(article => {
                  const audit = auditArticleSEO(article);
                  return (
                    <div key={article.slug} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 mb-1">{article.title}</h4>
                          <p className="text-sm text-slate-600">{article.date}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(audit.score)}`}>
                          {audit.score}
                        </div>
                      </div>
                      {audit.issues.length > 0 && (
                        <div className="space-y-2">
                          {audit.issues.slice(0, 2).map((issue, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              {getIssueIcon(issue.type)}
                              <span className="text-slate-700">{issue.message}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'insights' && insights && (
          <div className="space-y-6">
            {/* Content Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{insights.totalArticles}</div>
                <div className="text-slate-600">Total Articles</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{insights.imageOptimization.percentage}%</div>
                <div className="text-slate-600">Articles with Images</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{insights.recentContent.last30Days}</div>
                <div className="text-slate-600">Published Last 30 Days</div>
              </div>
            </div>

            {/* Content Types */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Content Type Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(insights.contentTypes).map(([type, count]) => (
                  <div key={type} className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900">{count as number}</div>
                    <div className="text-sm text-slate-600 capitalize">{type.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Label Distribution */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Topic Distribution</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(insights.labelDistribution).map(([label, count]) => (
                  <Badge key={label} variant="outline" className="text-sm">
                    {label}: {count as number}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Duplicate Content Check */}
            {duplicates.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                  Potential Duplicate Content
                </h3>
                <div className="space-y-3">
                  {duplicates.map((dup, index) => (
                    <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                      <p className="font-medium text-yellow-800">{dup.title}</p>
                      <p className="text-sm text-yellow-700">
                        {dup.articles.length} articles with similar titles
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
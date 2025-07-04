#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Performance analysis script
class PerformanceAnalyzer {
  constructor() {
    this.buildDir = path.join(process.cwd(), '.next');
    this.results = {
      bundleSize: {},
      recommendations: [],
      issues: [],
    };
  }

  analyze() {
    console.log('🔍 Starting performance analysis...\n');
    
    this.analyzeBundleSize();
    this.analyzeComponents();
    this.analyzeImages();
    this.analyzeDependencies();
    this.generateReport();
  }

  analyzeBundleSize() {
    console.log('📊 Analyzing bundle sizes...');
    
    try {
      // Check if build exists
      if (!fs.existsSync(this.buildDir)) {
        console.log('❌ Build directory not found. Run npm run build first.');
        return;
      }

      // Analyze static chunks
      const staticDir = path.join(this.buildDir, 'static');
      if (fs.existsSync(staticDir)) {
        this.analyzeDirSize(staticDir, 'static');
      }

      // Look for large files
      this.findLargeFiles(this.buildDir);
      
    } catch (error) {
      console.error('Error analyzing bundle size:', error.message);
    }
  }

  analyzeComponents() {
    console.log('🧩 Analyzing components...');
    
    const componentsDir = path.join(process.cwd(), 'src/components');
    if (!fs.existsSync(componentsDir)) return;

    const largeComponents = this.findLargeJSFiles(componentsDir);
    
    if (largeComponents.length > 0) {
      this.results.issues.push({
        type: 'Large Components',
        description: 'Found components over 10KB that could benefit from code splitting',
        files: largeComponents,
        recommendation: 'Consider lazy loading or breaking into smaller components'
      });
    }
  }

  analyzeImages() {
    console.log('🖼️ Analyzing images...');
    
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) return;

    const largeImages = this.findLargeImages(publicDir);
    
    if (largeImages.length > 0) {
      this.results.issues.push({
        type: 'Large Images',
        description: 'Found images over 500KB that should be optimized',
        files: largeImages,
        recommendation: 'Use next/image with proper sizing and modern formats (WebP, AVIF)'
      });
    }
  }

  analyzeDependencies() {
    console.log('📦 Analyzing dependencies...');
    
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) return;

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

    // Check for heavy dependencies
    const heavyDeps = [
      'chart.js',
      'recharts',
      '@apollo/client',
      'react-chartjs-2',
      'moment',
      'lodash'
    ];

    const foundHeavyDeps = Object.keys(dependencies).filter(dep => 
      heavyDeps.includes(dep) || dep.includes('chart')
    );

    if (foundHeavyDeps.length > 0) {
      this.results.issues.push({
        type: 'Heavy Dependencies',
        description: 'Found heavy dependencies that could be optimized',
        files: foundHeavyDeps,
        recommendation: 'Consider lazy loading, tree shaking, or lighter alternatives'
      });
    }
  }

  analyzeDirSize(dir, name) {
    try {
      const stats = this.getDirStats(dir);
      this.results.bundleSize[name] = stats;
      
      if (stats.totalSize > 5 * 1024 * 1024) { // 5MB
        this.results.issues.push({
          type: 'Large Directory',
          description: `${name} directory is ${this.formatBytes(stats.totalSize)}`,
          recommendation: 'Consider code splitting or removing unused code'
        });
      }
    } catch (error) {
      console.error(`Error analyzing ${name}:`, error.message);
    }
  }

  findLargeFiles(dir, maxSize = 1024 * 1024) { // 1MB
    const largeFiles = [];
    
    const traverse = (currentDir) => {
      try {
        const files = fs.readdirSync(currentDir);
        
        files.forEach(file => {
          const filePath = path.join(currentDir, file);
          const stats = fs.statSync(filePath);
          
          if (stats.isDirectory()) {
            traverse(filePath);
          } else if (stats.size > maxSize) {
            largeFiles.push({
              path: filePath,
              size: stats.size,
              formattedSize: this.formatBytes(stats.size)
            });
          }
        });
      } catch (error) {
        // Skip directories we can't read
      }
    };
    
    traverse(dir);
    return largeFiles;
  }

  findLargeJSFiles(dir, maxSize = 10 * 1024) { // 10KB
    const largeFiles = [];
    
    const traverse = (currentDir) => {
      try {
        const files = fs.readdirSync(currentDir);
        
        files.forEach(file => {
          const filePath = path.join(currentDir, file);
          const stats = fs.statSync(filePath);
          
          if (stats.isDirectory()) {
            traverse(filePath);
          } else if (
            (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) &&
            stats.size > maxSize
          ) {
            largeFiles.push({
              path: filePath.replace(process.cwd(), ''),
              size: stats.size,
              formattedSize: this.formatBytes(stats.size)
            });
          }
        });
      } catch (error) {
        // Skip directories we can't read
      }
    };
    
    traverse(dir);
    return largeFiles;
  }

  findLargeImages(dir, maxSize = 500 * 1024) { // 500KB
    const largeImages = [];
    
    const traverse = (currentDir) => {
      try {
        const files = fs.readdirSync(currentDir);
        
        files.forEach(file => {
          const filePath = path.join(currentDir, file);
          const stats = fs.statSync(filePath);
          
          if (stats.isDirectory()) {
            traverse(filePath);
          } else if (
            /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(file) &&
            stats.size > maxSize
          ) {
            largeImages.push({
              path: filePath.replace(process.cwd(), ''),
              size: stats.size,
              formattedSize: this.formatBytes(stats.size)
            });
          }
        });
      } catch (error) {
        // Skip directories we can't read
      }
    };
    
    traverse(dir);
    return largeImages;
  }

  getDirStats(dir) {
    let totalSize = 0;
    let fileCount = 0;
    
    const traverse = (currentDir) => {
      try {
        const files = fs.readdirSync(currentDir);
        
        files.forEach(file => {
          const filePath = path.join(currentDir, file);
          const stats = fs.statSync(filePath);
          
          if (stats.isDirectory()) {
            traverse(filePath);
          } else {
            totalSize += stats.size;
            fileCount++;
          }
        });
      } catch (error) {
        // Skip directories we can't read
      }
    };
    
    traverse(dir);
    
    return {
      totalSize,
      fileCount,
      formattedSize: this.formatBytes(totalSize)
    };
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  generateReport() {
    console.log('\n📋 Performance Analysis Report');
    console.log('='.repeat(50));
    
    // Bundle size report
    if (Object.keys(this.results.bundleSize).length > 0) {
      console.log('\n📊 Bundle Size Analysis:');
      Object.entries(this.results.bundleSize).forEach(([name, stats]) => {
        console.log(`  ${name}: ${stats.formattedSize} (${stats.fileCount} files)`);
      });
    }

    // Issues report
    if (this.results.issues.length > 0) {
      console.log('\n⚠️  Issues Found:');
      this.results.issues.forEach((issue, index) => {
        console.log(`\n  ${index + 1}. ${issue.type}`);
        console.log(`     ${issue.description}`);
        if (issue.files && issue.files.length > 0) {
          console.log(`     Files: ${issue.files.slice(0, 5).map(f => f.path || f).join(', ')}`);
          if (issue.files.length > 5) {
            console.log(`     ... and ${issue.files.length - 5} more`);
          }
        }
        console.log(`     💡 ${issue.recommendation}`);
      });
    }

    // Recommendations
    console.log('\n🚀 Optimization Recommendations:');
    const recommendations = [
      'Enable gzip/brotli compression in production',
      'Implement proper image optimization with next/image',
      'Use dynamic imports for heavy components',
      'Consider removing unused dependencies',
      'Implement proper caching strategies',
      'Use bundle analyzer for detailed analysis: npm install --save-dev @next/bundle-analyzer',
      'Consider service worker for caching static assets',
      'Optimize CSS delivery with critical CSS'
    ];

    recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });

    console.log('\n✅ Analysis complete! Use these insights to optimize your application.');
    
    // Save report to file
    const reportPath = path.join(process.cwd(), 'performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`📄 Detailed report saved to: ${reportPath}`);
  }
}

// Run the analysis
if (require.main === module) {
  const analyzer = new PerformanceAnalyzer();
  analyzer.analyze();
}

module.exports = PerformanceAnalyzer;
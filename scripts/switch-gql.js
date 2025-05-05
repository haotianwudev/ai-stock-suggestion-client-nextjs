/**
 * GraphQL Environment Switcher
 * 
 * This script allows for easily switching between local and production GraphQL environments.
 * Usage: 
 *   - npm run use:local-gql   - Switch to local GraphQL server
 *   - npm run use:prod-gql    - Switch to production GraphQL server
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG_FILE = path.join(__dirname, '../src/lib/apollo/gql-config.ts');
const LOCAL_PORT = 4000;
const DEFAULT_PROD_URI = '';

// Get command line arguments
const args = process.argv.slice(2);
const useLocal = args.includes('--local');
const useProd = args.includes('--prod') || !useLocal; // Default to production if not specified

// Function to update the configuration
function updateConfig() {
  try {
    // Read the current config file
    let configContent = fs.readFileSync(CONFIG_FILE, 'utf8');
    
    // Update the USE_LOCAL_GQL constant
    configContent = configContent.replace(
      /export const USE_LOCAL_GQL = (true|false);/,
      `export const USE_LOCAL_GQL = ${useLocal};`
    );
    
    // Update port if specified
    if (args.includes('--port')) {
      const portIndex = args.indexOf('--port');
      if (portIndex >= 0 && args.length > portIndex + 1) {
        const port = parseInt(args[portIndex + 1]);
        if (!isNaN(port)) {
          configContent = configContent.replace(
            /export const LOCAL_GQL_PORT = \d+;/,
            `export const LOCAL_GQL_PORT = ${port};`
          );
          console.log(`Local GraphQL port set to ${port}`);
        }
      }
    }
    
    // Write the updated file
    fs.writeFileSync(CONFIG_FILE, configContent);
    
    if (useLocal) {
      console.log(`✅ Switched to local GraphQL server at http://localhost:${LOCAL_PORT}/graphql`);
      console.log('Note: Make sure your local GraphQL server is running!');
    } else {
      console.log(`✅ Switched to production GraphQL server`);
      console.log('Note: The actual URL will be determined by your NEXT_PUBLIC_GRAPHQL_URI environment variable');
      console.log(`If not set, will use the default: ${DEFAULT_PROD_URI}`);
    }
    
    console.log('\nRestart your Next.js server for changes to take effect');
  } catch (error) {
    console.error('Error updating GraphQL configuration:', error);
  }
}

// Run the update
updateConfig(); 
# The Ontology of Value: Financial Data Classification

## Overview
A comprehensive guide to financial data classification, architecture, and lifecycle management. In the modern financial ecosystem, data is not merely information—it is the structural DNA that enables every transaction, valuation, and risk calculation. 

## 1. Product Master & Identifiers
The Product Master is the foundational database of all tradable instruments, mapping abstract financial concepts to concrete, transacting entities.
- **ISIN (International Securities Identification Number):** The 12-character global standard for identifying specific securities (e.g., US0378331005 for Apple Inc.).
- **CUSIP / SEDOL:** National identifiers used for clearing and settlement within specific jurisdictions.
- **FIGI (Financial Instrument Global Identifier):** An open-source, non-changing identifier created by Bloomberg that links multiple exchange-level listings to a single corporate entity.
- **Attributes:** The Product Master stores critical metadata including coupon rates, maturity dates, multiplier sizes for derivatives, and corporate action histories.

## 2. Entity & Account Hierarchies
Financial ownership requires complex nested hierarchies to satisfy both regulatory reporting and portfolio management needs.
- **Legal Entity Identifier (LEI):** A 20-character code connecting a legal entity to its ownership structure, critical for systemic risk monitoring post-2008.
- **Account Structures:** Ranges from simple retail households to complex institutional structures with multiple trading sleeves managed by different sub-advisors.
- **Counterparty Master:** Tracks the trading relationships and credit limits between institutions.

## 3. Transaction Lifecycle
The journey of a trade from inception to settlement.
- **Execution (Front Office):** FIX (Financial Information eXchange) messages indicating an intent to buy or sell.
- **Allocation (Middle Office):** Splitting block trades across multiple sub-accounts.
- **Settlement (Back Office):** The actual exchange of cash for securities, transitioning heavily toward T+1 (and eventually T+0) cycles.
- **ISO 20022:** The emerging global standard for rich, structured financial messaging, replacing legacy SWIFT MT formats.

## 4. The Three Books of Record
Modern financial architecture separates data into three distinct views, each serving a unique operational mandate.
- **IBOR (Investment Book of Record):** Real-time, start-of-day or intraday view used by traders and portfolio managers. Prioritizes speed and forecasted cash over perfect accounting accuracy.
- **ABOR (Accounting Book of Record):** T+1, fully reconciled view used for producing the official Net Asset Value (NAV) and regulatory reporting. Prioritizes strict double-entry correctness over speed.
- **PBOR (Performance Book of Record):** Specialized view optimized for calculating Time-Weighted Return (TWRR) and Money-Weighted Return (MWRR) across arbitrary timeframes, compliant with GIPS standards.

## 5. Tax Lot Accounting
When a position is liquidated, the system must determine *which specific shares* were sold to calculate the correct cost basis and capital gains tax.
- **Methodologies:** FIFO (First In, First Out), LIFO (Last In, First Out), HIFO (Highest In, First Out), and Specific Identification.
- **Corporate Actions:** Stock splits, mergers, and spin-offs mathematically transform tax lots, requiring precise retroactive adjustments to the cost basis.

## 6. Risk Architecture
- **Market Risk (VaR):** Requires massive historical time-series data to simulate potential portfolio drawdowns.
- **Credit Risk:** Relies on the Entity Master and LEI to calculate aggregate exposure to a single counterparty across all instruments and subsidiaries.
- **Liquidity Risk:** Requires classifying assets based on their time-to-liquidation (e.g., Level 1, Level 2, Level 3 assets under Basel III).

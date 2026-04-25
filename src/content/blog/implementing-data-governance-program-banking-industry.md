---
title: "Data Governance in Financial Services: The Practitioner's Complete Guide for 2026"
description: "A practitioner's complete guide to data governance in financial services. Covers BCBS 239, SR 11-7, data lineage, CDEs, governance council design, and governance technology — written by a Senior Data "
pubDate: 2023-06-01T20:38:01.000Z
wpSlug: "implementing-data-governance-program-banking-industry"
categories: ["Compliance", "Data Governance"]
tags: ["BCBS 239", "critical data elements", "data governance", "data governance framework", "data lineage", "data stewardship", "financial services", "regulatory compliance", "SR 11-7"]
draft: false
image: /2026/04/aioseo-ai-a-high-angle-view-of-a-mo-medium-illustration-landscape-20260417-114638.avif
imageAlt: "a high-angle view of a modern financial district at dusk wit"
ogImage: /og/2026/04/aioseo-ai-a-high-angle-view-of-a-mo-medium-illustration-landscape-20260417-114638.jpg
---

When the Basel Committee on Banking Supervision published BCBS 239 in January 2013, it landed on the desks of Chief Risk Officers across the globe with a deceptively simple demand: know your risk data, know where it comes from, and be able to aggregate it accurately and quickly under stress conditions. Thirteen years later, a significant portion of the world's largest banks are still failing their BCBS 239 assessments. The Basel Committee's own progress reports document this repeatedly — systemically important financial institutions (G-SIBs) that have had over a decade to comply still receive findings on Principles 2, 3, and 4, which cover data architecture, accuracy, and completeness.

The reason those banks are failing is not technology. They have spent hundreds of millions of dollars on data platforms, reporting systems, and risk infrastructure. The reason they are failing is that they never built the foundational layer that makes regulatory compliance possible: data governance. They never established clear ownership over risk data. They never built traceable lineage from source systems to regulatory reports. They never defined what "accurate" means for a critical data element in a stress scenario, or who is accountable when that threshold is breached.

This is the central thesis of this guide: data governance in financial services is not a compliance project. It is not a documentation exercise, a metadata cataloging initiative, or a project that ends at go-live. It is a structural operational capability — the connective tissue that makes a financial institution's data trustworthy enough to manage risk, satisfy regulators, and support strategic decisions. When it is absent, regulatory programs like BCBS 239 expose the gap, but they do not create it. The gap was always there.

This guide is written for practitioners — data governance engineers, chief data officers, risk data managers, stewardship leads, and technology architects working inside financial institutions or consulting into them. It covers the regulatory landscape in operational depth, documents why programs fail, provides a practitioner framework for building governance that holds up under exam conditions, and addresses the technology and MDM dimensions that most resources treat superficially.

---

* [What Data Governance in Financial Services Actually Means](#what-data-governance-in-financial-services-actually-means)
* [The Regulatory Landscape: BCBS 239, SR 11-7, and What They Actually Require](#the-regulatory-landscape-bcbs-239-sr-11-7-and-what-they-actually-require)
  * [BCBS 239: Risk Data Aggregation and Risk Reporting](#bcbs-239-risk-data-aggregation-and-risk-reporting)
  * [SR 11-7: Model Risk Management](#sr-11-7-model-risk-management)
  * [OCC Heightened Standards and the Data Management Handbook](#occ-heightened-standards-and-the-data-management-handbook)
  * [DORA: Digital Operational Resilience Act](#dora-digital-operational-resilience-act)
  * [GDPR and CCPA: Important, But Not the Core Drivers](#gdpr-and-ccpa-important-but-not-the-core-drivers)
* [Why Financial Services Governance Programs Fail](#why-financial-services-governance-programs-fail)
  * [Data Ownership Assigned on Paper, Ignored in Practice](#data-ownership-assigned-on-paper-ignored-in-practice)
  * [Governance Councils That Produce Policies Nobody Enforces](#governance-councils-that-produce-policies-nobody-enforces)
  * [Legacy System Proliferation Makes Lineage Nearly Impossible](#legacy-system-proliferation-makes-lineage-nearly-impossible)
  * [Siloed LOB Data That Doesn't Map to Enterprise Definitions](#siloed-lob-data-that-doesnt-map-to-enterprise-definitions)
  * [Buying Governance Technology Before Defining the Governance Model](#buying-governance-technology-before-defining-the-governance-model)
  * [BCBS 239 Readiness Assessments That Expose Gaps With No Roadmap](#bcbs-239-readiness-assessments-that-expose-gaps-with-no-roadmap)
* [Building a Data Governance Program in Financial Services: A Practitioner's Framework](#building-a-data-governance-program-in-financial-services-a-practitioners-framework)
  * [Phase 1: Establishing Data Ownership and Stewardship](#phase-1-establishing-data-ownership-and-stewardship)
  * [Phase 2: Defining Critical Data Elements and Data Domains](#phase-2-defining-critical-data-elements-and-data-domains)
  * [Phase 3: Building Data Lineage for Regulatory Reporting](#phase-3-building-data-lineage-for-regulatory-reporting)
  * [Phase 4: Standing Up the Governance Council](#phase-4-standing-up-the-governance-council)
  * [Phase 5: Data Quality Measurement and Thresholds](#phase-5-data-quality-measurement-and-thresholds)
  * [Phase 6: The Policy Framework](#phase-6-the-policy-framework)
  * [Phase 7: Integration With Model Risk Management](#phase-7-integration-with-model-risk-management)
* [Governance Technology in Financial Services: What Banks Are Actually Using](#governance-technology-in-financial-services-what-banks-are-actually-using)
  * [Collibra](#collibra)
  * [Microsoft Purview](#microsoft-purview)
  * [Atlan](#atlan)
  * [Informatica IDMC](#informatica-idmc)
  * [IBM Knowledge Catalog and Watson Knowledge Catalog](#ibm-knowledge-catalog-and-watson-knowledge-catalog)
  * [The Selection Decision](#the-selection-decision)
* [MDM in Financial Services: The Customer Data Problem](#mdm-in-financial-services-the-customer-data-problem)
  * [The Golden Record Problem in Banking](#the-golden-record-problem-in-banking)
  * [Matching Rules and Survivorship Logic as Governed Policy](#matching-rules-and-survivorship-logic-as-governed-policy)
  * [MDM and BCBS 239](#mdm-and-bcbs-239)
* [Common Mistakes in Financial Services Data Governance](#common-mistakes-in-financial-services-data-governance)
* [Frequently Asked Questions](#frequently-asked-questions)
  * [What is BCBS 239 and why does it matter for data governance?](#what-is-bcbs-239-and-why-does-it-matter-for-data-governance)
  * [How is data governance in financial services different from other industries?](#how-is-data-governance-in-financial-services-different-from-other-industries)
  * [What roles are required for a bank's data governance program?](#what-roles-are-required-for-a-banks-data-governance-program)
  * [How do you build data lineage for regulatory reporting?](#how-do-you-build-data-lineage-for-regulatory-reporting)
  * [What is SR 11-7 and how does it connect to data governance?](#what-is-sr-11-7-and-how-does-it-connect-to-data-governance)
  * [What tools do financial institutions use for data governance?](#what-tools-do-financial-institutions-use-for-data-governance)
  * [How long does it take to implement a data governance program in a bank?](#how-long-does-it-take-to-implement-a-data-governance-program-in-a-bank)
  * [What are critical data elements (CDEs) and how are they defined in banking?](#what-are-critical-data-elements-cdes-and-how-are-they-defined-in-banking)
  * [How does data governance support DORA compliance?](#how-does-data-governance-support-dora-compliance)
  * [What is the difference between data governance and model risk governance?](#what-is-the-difference-between-data-governance-and-model-risk-governance)
* [Where Financial Services Data Governance Is Heading](#where-financial-services-data-governance-is-heading)

---

## What Data Governance in Financial Services Actually Means

The term "data governance" is used loosely enough to be nearly meaningless in most corporate contexts. In financial services specifically, it has been co-opted by two very different groups with very different agendas — compliance teams who see it as a risk documentation activity, and technology teams who conflate it with data platform modernization — and the result is programs that satisfy neither regulatory requirements nor business needs.

A working practitioner definition: data governance in financial services is the system of decision rights, accountabilities, policies, and processes that ensure data is accurate, available, consistent, and used appropriately across the institution — with enough structure and traceability to satisfy regulatory examination and support enterprise risk management.

That definition carries three elements that matter for financial services specifically.

**Decision rights.** In any organization, data governance is fundamentally about who has the authority to make decisions about data — definitions, quality thresholds, access controls, retention, and usage. In financial institutions, those decisions often implicate regulatory obligations, which means the accountability structure has to be defensible to examiners, not just logical to internal stakeholders. When a regulator asks who owns the counterparty exposure data used in your LCR calculation, the answer cannot be "the technology team" or "it's shared."

**Traceability.** Financial services governance programs live or die on lineage. BCBS 239 Principle 3 requires that risk data be accurate and reliable, and the only way to demonstrate accuracy in a regulatory examination is to show where the data came from, what transformations were applied, and what controls exist at each point in the chain. This is not a capability you retrofit onto existing systems — it has to be designed into the data architecture and governed at the program level.

**Examination readiness.** This is what distinguishes financial services governance from governance in manufacturing, retail, or healthcare. Every program decision — which data elements to prioritize, how to document lineage, what thresholds to set for data quality — should be made with the understanding that a regulator may examine it. That examination readiness discipline actually produces better governance programs, because it forces specificity that internal programs often avoid.

The most important distinction to make before standing up any program is whether the institution wants compliance governance or capability governance. Compliance governance is reactive — it exists to close exam findings, check regulatory boxes, and produce evidence for examiners. It is often scoped narrowly to the data elements cited in examination letters. Capability governance is proactive — it treats high-quality, well-governed data as a competitive and operational asset, and builds governance infrastructure that can absorb new regulatory requirements without starting from scratch each time.

In my financial services governance work at Wells Fargo, the regulatory frameworks created enormous pressure toward compliance governance — close the BCBS finding, satisfy the model risk examiner, document the lineage for this specific report. The programs that achieved durable results were the ones that used regulatory pressure as a forcing function to build actual capability, rather than treating each regulatory program as a separate documentation project.

---

## The Regulatory Landscape: BCBS 239, SR 11-7, and What They Actually Require

Understanding data governance in financial services requires understanding the regulatory frameworks that have shaped it. Most practitioners know the names. Fewer understand what the regulations actually demand at an operational level — and that gap is where governance programs go wrong.

### BCBS 239: Risk Data Aggregation and Risk Reporting

[BCBS 239](https://www.bis.org/publ/bcbs239.htm), formally titled "Principles for Effective Risk Data Aggregation and Risk Reporting," was published by the Basel Committee on Banking Supervision in January 2013 and applied initially to G-SIBs (Global Systemically Important Banks). It was subsequently extended in application to D-SIBs (Domestic Systemically Important Banks) by many national regulators.

The standard comprises 14 principles across four categories: overarching governance and infrastructure (Principles 1–2), risk data aggregation capabilities (Principles 3–6), risk reporting practices (Principles 7–11), and supervisory review (Principles 12–14).

Here is what each principle actually demands at an operational level:

**Principle 1 — Governance.** Banks must establish strong governance arrangements for risk data aggregation and risk reporting. This means board-level awareness, clear senior management accountability, and a framework that covers risk data standards, data quality controls, and reporting architecture. The implication: governance of risk data cannot be delegated to a back-office technology team. It requires executive sponsorship and accountable ownership.

**Principle 2 — Data Architecture and IT Infrastructure.** Banks must design and build data architecture and IT infrastructure to fully support risk data aggregation. This is the principle most often cited in exam findings for legacy-heavy institutions. If your firm's credit exposure data lives in 40 different source systems with no enterprise data model and no lineage documentation, you cannot meet Principle 2 regardless of how good your reporting layer is.

**Principle 3 — Accuracy and Integrity.** Risk data must be accurate and reliable. The bank must be able to demonstrate that data is captured once, validated at source, and reconciles through the chain to the regulatory report. This requires documented data quality controls, not just assertions of accuracy.

**Principle 4 — Completeness.** Banks must be able to capture and aggregate all material risk data across the enterprise. No data gaps in scope, no LOB exclusions because integration was too difficult.

**Principle 5 — Timeliness.** Risk data aggregation must be completed within timeframes consistent with the bank's risk reporting requirements. In stress scenarios, this often means same-day or next-day aggregation that normally takes weeks.

**Principle 6 — Adaptability.** Banks must be able to generate aggregated and ad hoc risk data to meet a broad range of on-demand, frequently changing reporting requests. This principle directly penalizes institutions that hardcode their risk data pipelines — because the regulator will ask for a report you haven't built yet.

**Principle 7 — Accuracy (Reporting).** Risk management reports must accurately and precisely convey aggregated risk data and reflect risk in an exact manner.

**Principle 8 — Comprehensiveness.** Management reports must cover all material risk areas of the organization.

**Principle 9 — Clarity and Usefulness.** Reports must communicate information in a clear and concise manner. This sounds soft but has real implications — risk reports that require translation by intermediaries introduce governance risk.

**Principle 10 — Frequency.** Reports must be produced with appropriate frequency.

**Principle 11 — Distribution.** Reports must be distributed to the relevant parties while ensuring confidentiality is maintained.

**Principles 12–14** address supervisory review, remediation expectations, and home/host supervisor coordination for cross-border institutions.

The operational takeaway: BCBS 239 is not a reporting project. A bank that rebuilds its regulatory reporting front-end without addressing data ownership, lineage, and quality at source will produce cleaner-looking reports that still fail examination on Principles 2, 3, and 4\. The regulator is explicitly looking behind the report to the data infrastructure and governance structure that produced it.

### SR 11-7: Model Risk Management

The Federal Reserve's [Supervisory Guidance on Model Risk Management (SR 11-7)](https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm), issued in April 2011, establishes the framework for how banks should identify, assess, and control the risks associated with models used in decision-making. The OCC published parallel guidance ([OCC 2011-12](https://www.occ.gov/news-issuances/bulletins/2011/bulletin-2011-12.html)) that applies to national banks.

The connection to data governance is direct and often underappreciated: every model consumes data. The quality of that data determines whether the model performs as intended. SR 11-7 requires that banks maintain a model inventory, validate models independently, and document the data used as model inputs.

Data governance intersects with SR 11-7 in four specific ways:

**Model input data quality.** Model validation must include assessment of the data used as inputs. If the training data or input data is not well-governed — no defined quality thresholds, no lineage from source to model feed, no ownership — the model validation cannot be completed to standard. Governance programs that scope themselves only to reporting data and ignore the data consumed by risk models will generate SR 11-7 findings.

**Model inventory governance.** The model inventory itself is a governed data asset. Which models are in use, who owns them, what data they consume, and what their output is used for must all be maintained with the same rigor as any other critical data element. Many institutions maintain model inventories as spreadsheets with no version control, no ownership designation, and no data quality controls — which fails both the letter and spirit of SR 11-7.

**Data lineage for model outputs.** When a model output feeds a regulatory report — a credit loss estimate, a stress test result, a liquidity ratio — the lineage chain has to extend through the model. Regulators reviewing BCBS 239 Principle 3 compliance may request lineage documentation that passes through models, not just through data pipelines.

**Challenger model data standards.** SR 11-7 requires challenger models as part of independent validation. Challenger models consuming different data than production models creates a governance challenge — which data definition is authoritative? Governance frameworks must address this explicitly.

### OCC Heightened Standards and the Data Management Handbook

For national banks supervised by the Office of the Comptroller of the Currency, the OCC's Heightened Standards (12 CFR Part 30, Appendix D) and the OCC Data Management Handbook establish expectations for data management practices. The Heightened Standards, applied to large banks, require that front-line units (FLUs) take ownership of data quality and risk management, with independent risk management (IRM) providing oversight.

The OCC framework creates a three-lines model for data governance: front-line data owners (first line), data governance and independent oversight (second line), and audit (third line). Financial institutions that don't map their governance structure to this model will find exam findings that cite organizational gaps, not just technical ones.

### DORA: Digital Operational Resilience Act

The EU's [Digital Operational Resilience Act (DORA)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R2554), which entered application in January 2025, addresses ICT risk management for EU financial entities and their critical third-party providers. DORA's direct governance implications are focused on ICT asset inventories, incident reporting, and third-party risk management.

For data governance practitioners, DORA matters in two ways. First, data integrity and availability during ICT disruptions must be demonstrable — which requires governed data assets with documented lineage and recovery point requirements. Second, third-party data providers that supply data used in risk management must be assessed and monitored under a formal governance framework. Institutions that have built mature data governance programs will find DORA compliance substantially easier than those starting from scratch.

### GDPR and CCPA: Important, But Not the Core Drivers

Many data governance articles for financial services lead with GDPR and CCPA. This misrepresents where the governance pressure actually comes from for most financial institutions. Consumer data privacy regulations are real compliance obligations and do require governance capabilities — data inventory, consent management, subject rights fulfillment — but they are not the primary governance drivers for banks in the way that BCBS 239 and SR 11-7 are.

The distinction matters because governance programs designed primarily around privacy compliance often produce metadata inventories without the data quality, lineage, and ownership structures that risk data governance requires. Build governance for BCBS 239 and you will have the foundation to support GDPR. Build governance for GDPR and you may have a clean data inventory that is useless for regulatory reporting compliance.

---

## Why Financial Services Governance Programs Fail

The governance programs that fail in financial institutions fail for predictable reasons. After years of financial services governance work, the same patterns repeat across institutions of different sizes, different regulatory profiles, and different technology environments.

### Data Ownership Assigned on Paper, Ignored in Practice

The most common governance failure: an institution publishes a data governance policy, assigns data owner titles to senior business leaders, and then discovers six months later that none of those owners are actually making decisions about data. They are listed as owners because they have the right seniority, not because they have meaningful accountability or time. No one escalated data quality issues to them, they have no process for resolving definitional disputes, and their ownership designation exists only in the policy document.

Ownership that has no teeth — no decision authority, no escalation path, no performance accountability — is documentation theater. Regulators see through it immediately. When an examiner asks a data owner to walk through their data quality monitoring process for a critical data element, a data owner who is owner in name only cannot answer the question.

### Governance Councils That Produce Policies Nobody Enforces

Many institutions stand up Data Governance Councils or Data Management Committees at the program launch stage, produce a set of governance policies over the first year, and then watch the council atrophy. Attendance drops. Agenda items become status updates rather than decisions. Policies accumulate exceptions that are never reviewed. The council continues to exist as an organizational artifact while actual data decisions get made in project meetings by whoever has the most urgency.

This happens when councils are designed as advisory bodies rather than decision-making bodies. If the council cannot resolve a definitional dispute, override a data quality exception, or enforce a policy violation, it is not a governance council — it is a governance newsletter.

In financial services governance work, regulatory frameworks like BCBS 239 create opportunities to reset council authority, because the regulator's expectations give governance practitioners an external mandate that internal politics often cannot. Exam findings create the conditions for the council to have actual authority — but institutions have to seize that opportunity rather than using regulatory pressure as cover to produce more documentation.

### Legacy System Proliferation Makes Lineage Nearly Impossible

Large financial institutions operate technology environments that accumulated over decades of acquisitions, product launches, and regulatory responses. It is not unusual for a major bank to have hundreds of source systems feeding a single regulatory report, with integration logic built over 20 years by teams that have largely turned over. Documenting lineage through that environment is genuinely hard — but the difficulty is not an acceptable substitute for doing it.

The governance failure here is not the complexity of the environment. The failure is treating lineage documentation as a one-time project deliverable rather than an ongoing operational practice. Institutions that conduct a lineage mapping exercise, produce documentation, and then make no effort to maintain it as systems change will find that their lineage documentation is out of date within a year and useless in an examination within two.

### Siloed LOB Data That Doesn't Map to Enterprise Definitions

What does "customer" mean at a large financial institution? In retail banking, a customer is an individual with a deposit or loan account. In commercial banking, a customer is an entity — often a complex legal structure with multiple subsidiaries. In wealth management, a customer relationship may span a family office across multiple generations. In credit cards, the customer concept may be product-centric rather than entity-centric.

When each line of business maintains its own customer data model and its own definition of what a customer relationship means, enterprise-level aggregation of customer risk data — required under BCBS 239 — becomes an exercise in translation rather than aggregation. And translation introduces the definitional inconsistencies that regulators find when they look at the same exposure reported differently across risk systems.

Resolving this requires governance — specifically, enterprise data domain governance with the authority to establish canonical definitions that LOBs are required to map to, not just encouraged to adopt.

### Buying Governance Technology Before Defining the Governance Model

This pattern deserves special attention because it is extremely common and extremely expensive. An institution identifies a governance gap, evaluates metadata catalog and data governance platform vendors, selects a tool, and begins implementation — all before defining what the governance operating model will be, who will play which roles, and what governance processes the tool needs to support.

The result: a tool configured to support a governance process that doesn't exist yet, populated with metadata that no one has accountability for maintaining, governed by workflows that have no human process behind them. The tool sits largely unused while the underlying governance problems remain unsolved.

Technology enables governance. It does not create governance. The sequence must be operating model first, technology second.

### BCBS 239 Readiness Assessments That Expose Gaps With No Roadmap

Many institutions conduct BCBS 239 self-assessments or commission external readiness reviews and receive detailed findings about lineage gaps, ownership deficiencies, and data quality control weaknesses. The findings sit in a report. Leadership acknowledges them. No funded remediation program is established. The next regulatory examination surfaces the same findings, now with a more serious supervisory tone because the institution was aware of the gaps.

This is not a governance program failure — it is a governance program absence. The self-assessment happened. The remediation program did not.

---

## Building a Data Governance Program in Financial Services: A Practitioner's Framework

Building governance that holds up in a regulated financial institution requires a sequenced approach. The sequence matters because financial services governance programs that skip foundational steps generate compliance artifacts without the operational capability those artifacts are supposed to represent.

### Phase 1: Establishing Data Ownership and Stewardship

Data ownership in a financial institution requires three distinct role layers, each with defined authority and accountability.

**Data Owners** are senior business executives accountable for the quality, completeness, and appropriate use of a defined data domain. In practice, this is typically a Managing Director or above who has organizational accountability for the business processes that generate or consume the data. An effective data owner for counterparty exposure data is a Chief Risk Officer or head of credit risk — someone with authority to make decisions that the data supports. An ineffective data owner is a Vice President who was nominated because they attend too many meetings.

Data owners must have explicit authority: authority to define or adjudicate data definitions within their domain, authority to approve exceptions to data quality standards, and accountability for funding data quality remediation in their domain. Without authority, ownership is a title.

**Data Stewards** are the operational layer — subject matter experts who manage the day-to-day governance of specific data sets within a domain. Stewards execute the policies that owners establish: they monitor data quality metrics, investigate quality issues, manage the business glossary definitions for their data elements, and escalate issues that require ownership-level decisions. Strong stewardship is the difference between a governance program that exists on paper and one that runs.

For a detailed treatment of data steward roles and responsibilities in regulated environments, the practitioner guide to [data steward responsibilities in financial services](/what-is-a-data-steward-complete-guide-2026/) is a useful companion reference.

**Data Custodians** are the technology counterpart — the teams responsible for the technical implementation of data controls, access management, lineage capture, and storage. Custodians implement what owners and stewards define. The distinction between stewardship and custodianship is frequently blurred in financial services governance programs, with the result that technical teams make data definition decisions that should belong to the business and business teams are held accountable for technical failures they cannot control.

Governance programs that map these three roles clearly — and create escalation paths between them — are substantially more durable than those that collapse all three into a single "data governance" function.

### Phase 2: Defining Critical Data Elements and Data Domains

In a financial institution where everything is arguably critical, CDEs must be defined by prioritization criteria, not by anyone's intuition about what matters.

**Regulatory consumption** is the primary criterion for CDE designation: any data element that feeds a regulatory report — Basel capital calculations, stress test outputs, liquidity coverage ratios, large exposure reports — should be designated a CDE. These elements carry the most immediate regulatory risk and should be the first priority for lineage documentation and quality control.

**Risk management consumption** is the second criterion: data elements that feed models used in credit underwriting, market risk management, or liquidity management carry material operational risk even when they do not appear directly in regulatory reports.

**Enterprise financial reporting** is the third criterion: data feeding financial statements and management reporting used in board-level decision-making.

CDE designation should produce a governed inventory: for each CDE, the inventory documents the business definition, authorized source system, data type and format constraints, data quality thresholds, owner and steward, and lineage path from source to downstream consumers. That inventory is a living document, not a project deliverable.

Data domains are the organizing structure: logical groupings of related data elements under unified ownership. In financial services, common data domains include counterparty/entity, financial instrument, market data, trade/transaction, credit exposure, collateral, and product. Domain-based ownership allows the governance model to scale — rather than governing thousands of individual data elements independently, you establish domain governance and then apply it consistently within each domain.

### Phase 3: Building Data Lineage for Regulatory Reporting

Lineage documentation for regulatory reporting has to satisfy a specific standard: an examiner should be able to follow a data element from its authoritative source, through every transformation and system handoff, to the value that appeared in the regulatory report — and understand what controls exist at each step.

Building that lineage requires three components:

**Business lineage** documents the flow of a data concept across business processes. Which source systems capture counterparty exposure? How does that exposure get consolidated to an enterprise view? What business rules govern the consolidation? Business lineage is owned by data stewards and documented in the governance catalog.

**Technical lineage** documents the actual system-to-system data flows: ETL jobs, API calls, database procedures, file transfers. Technical lineage is owned by data custodians and, ideally, captured automatically by the governance platform rather than documented manually. Manual lineage documentation goes stale; automated lineage capture stays current as systems change.

**Transformation lineage** documents the calculation and aggregation logic applied as data moves through the chain. For regulatory reporting, transformation logic must be documented specifically enough that it can be independently verified — not just "the system aggregates exposure," but "exposure is aggregated by counterparty LEI using the netting rules defined in policy document DG-CR-007, applied in ETL job RISK\_AGG\_001."

The technical approach to lineage varies by environment. In Azure-native environments, Microsoft Purview provides automated lineage scanning across Azure data services and is a natural fit when the data estate is predominantly cloud-based. In environments with significant on-premise legacy infrastructure, catalog platforms like Collibra can ingest lineage from ETL tools (Informatica PowerCenter, IBM DataStage, dbt) through API integrations and lineage harvesting connectors.

### Phase 4: Standing Up the Governance Council

The governance council — whatever it is named (Data Governance Council, Data Management Committee, Enterprise Data Board) — is the decision-making body for enterprise data policy. Its design determines whether the governance program has actual authority or just documentation.

Effective council design for a financial institution:

**Composition.** Senior business data owners (Managing Director or equivalent) from each major data domain, the Chief Data Officer or equivalent executive sponsor, representation from Risk, Finance, Compliance, and Legal (which has jurisdiction over data retention and regulatory production), and the head of the data governance function. Technology representation attends as support — not as a voting member. This is a business governance body, not an IT governance body.

**Meeting cadence and agenda structure.** Monthly is the minimum frequency for operational governance decisions. The agenda should include: data quality exception review and disposition, policy update approvals, CDE designation requests, definitional dispute resolutions, and escalated stewardship issues. A council that meets to hear status updates rather than make decisions will atrophy within a year.

**Decision authority.** The council must have defined authority — specific categories of decisions that require council approval rather than individual owner or steward judgment. Minimum authority set: enterprise data definitions for CDEs, exceptions to data quality thresholds for CDEs, new CDE designations, and revisions to enterprise data governance policy.

**Escalation path.** The council needs a defined path for issues that exceed its authority — executive sponsorship for decisions that require cross-LOB resource commitments, and a defined connection to regulatory response when governance findings arise from examinations.

In financial services governance work, the most common council failure pattern involves councils that were designed for launch conditions — strong executive attention, clear urgency from a regulatory finding — and then drifted as the urgency faded. Building sustainability requires governance metrics that give the council something to manage over time: data quality trend reporting, CDE coverage progression, stewardship activity rates, and policy exception aging.

### Phase 5: Data Quality Measurement and Thresholds

For regulatory data, data quality must be measured against defined thresholds, not assessed subjectively. BCBS 239 Principle 3 requires accuracy and reliability, and regulators will ask for evidence of ongoing quality monitoring, not just assertions.

A workable data quality framework for financial services CDEs covers six dimensions:

**Completeness:** What percentage of records have values populated for this element? For regulatory data, the threshold is typically 100% for mandatory fields — any missing value in a counterparty exposure record is a governance finding.

**Accuracy:** Does the value correctly represent the real-world concept it is supposed to capture? Accuracy measurement requires a reference — either a system of record comparison or a sampling-based validation process.

**Consistency:** Do values for this element agree across systems that should be reporting the same information? Counterparty identifiers that appear differently in credit risk systems versus market risk systems are a classic consistency failure in banks.

**Timeliness:** Is the data available within the required timeframe? For BCBS 239, timeliness is a specific principle (Principle 5) with regulatory teeth.

**Validity:** Do values conform to defined format and domain constraints? A Legal Entity Identifier field that contains internal identifiers rather than LEI codes fails validity.

**Uniqueness:** Are records uniquely identified without unintended duplication? Duplicate counterparty records drive aggregation errors that propagate directly into regulatory reports.

Thresholds should be defined per CDE and per dimension, with defined breach response procedures: who is notified, within what timeframe, and what remediation process is triggered. Thresholds without breach response are monitoring theater.

### Phase 6: The Policy Framework

Financial institutions need governance policies that are specific enough to be enforceable and structured enough to survive personnel turnover. The minimum policy set for a regulatory-grade governance program includes:

* **Enterprise Data Governance Policy:** Defines the governance operating model, role authorities, council structure, and program scope. Board or senior executive approved.
* **Data Quality Policy:** Defines CDE quality dimensions, measurement standards, threshold-setting authority, breach response requirements, and exception approval process.
* **Data Classification Policy:** Defines data classification tiers (public, internal, confidential, restricted) and corresponding access control requirements.
* **Data Retention and Disposal Policy:** Defines retention schedules by data category, consistent with regulatory requirements (SEC Rule 17a-4, for example, specifies minimum retention periods for broker-dealer records).
* **Data Lineage Policy:** Defines what lineage must be documented, to what level of granularity, and how lineage must be maintained as systems change.
* **Exception Management Policy:** Defines the process for granting, documenting, reviewing, and retiring exceptions to any governance policy. Exceptions that are never reviewed accumulate until they are the de facto standard rather than the exception.

Each policy must have a designated owner responsible for review and update, a review frequency (annually at minimum), and a defined approval authority.

### Phase 7: Integration With Model Risk Management

The SR 11-7 connection requires explicit integration between the data governance program and the model risk management framework. At minimum, this means:

The model inventory — the master list of all models in use, their owners, their inputs, and their outputs — must be treated as a governed data asset. The governance program defines quality standards for the model inventory and ensures it is maintained with the same rigor as other CDEs.

Model input data elements that are already designated CDEs should have their governance documentation extended to note their downstream consumption by specific models. When a data quality threshold breach occurs in a CDE that feeds a risk model, the breach response should automatically notify model risk management, not just the data steward.

Model validation documentation should reference the governance artifacts for input data elements — the lineage documentation, quality thresholds, and stewardship contacts. This creates a coherent story for examiners reviewing both BCBS 239 compliance and SR 11-7 compliance: the same data governance infrastructure supports both.

---

## Governance Technology in Financial Services: What Banks Are Actually Using

The technology landscape for financial services data governance has matured considerably, but no platform is a fit for every institution. Technology selection should follow governance model design, not precede it.

### Collibra

Collibra remains the most widely deployed enterprise data governance platform in large financial institutions. Its strength is the combination of business glossary and data dictionary management, data lineage, policy management, and workflow automation in a single platform that is built for enterprise-scale governance rather than analytics-team self-service.

For BCBS 239 use cases, Collibra's lineage capabilities — including ingestion from major ETL and BI tools — and its CDE management workflows are directly applicable. Policy management features allow governance teams to document and enforce data quality standards, link policies to data assets, and manage exceptions with audit trails that hold up in regulatory examination.

The limitation is implementation complexity. In Collibra implementations I have led, the most consistent finding is that organizations underestimate the effort required to build the governance operating model alongside the tool configuration. Collibra's workflow engine is powerful but requires substantive configuration to reflect the institution's specific governance processes — role structures, escalation paths, approval chains. Implementing Collibra into an organization without a functional governance operating model produces an expensive metadata catalog that nobody has accountability for maintaining.

### Microsoft Purview

Microsoft Purview has emerged as a serious contender in financial institutions with Azure-native or Azure-heavy data estates. Its automated lineage scanning across Azure services — Azure Data Factory, Azure Synapse Analytics, Azure SQL Database, Azure Data Lake Storage — provides technical lineage at a depth that catalog platforms requiring manual integration often cannot match.

Purview's compliance capabilities (formerly Azure Information Protection) address data classification, sensitivity labeling, and DLP policy enforcement — capabilities that matter for GDPR and confidentiality obligations alongside BCBS 239\. For institutions already invested in the Microsoft stack, Purview's integration advantages are significant.

The gap area is policy management depth and the maturity of its workflow capabilities relative to purpose-built governance platforms. Purview is excellent for lineage visibility and data discovery in Azure environments but is lighter on the governance process support — structured stewardship workflows, exception management, council decision tracking — that regulatory-grade programs require.

### Atlan

Atlan has gained adoption among analytics-forward financial services teams — typically in data analytics or business intelligence functions — for its modern UI, strong integration with dbt and Snowflake, and collaborative metadata management features. It is well-suited for analytics governance: cataloging analytical data products, documenting business glossary terms, and enabling data team collaboration.

For regulatory data governance — BCBS 239 lineage, CDE management, policy enforcement — Atlan is not the appropriate primary platform. Its strength is analytics team productivity, not regulatory examination readiness. Institutions that deploy Atlan for analytics governance and a separate platform for regulatory governance will need to manage the integration between them.

### Informatica IDMC

Informatica Intelligent Data Management Cloud addresses data governance, data quality, master data management, and data catalog in a unified platform. For large financial institutions with complex legacy environments, significant data quality remediation requirements, and an existing Informatica footprint (PowerCenter being common in large banks), IDMC can consolidate multiple data management functions into a single platform.

The strength is depth: Informatica's data quality engine is mature, its MDM capabilities are enterprise-grade, and its catalog can ingest metadata from a very wide range of source systems. The limitation is implementation cost and complexity. IDMC implementations in large financial institutions are significant multi-year programs, not tool deployments.

### IBM Knowledge Catalog and Watson Knowledge Catalog

IBM's catalog and governance tooling is present in older financial institutions — particularly those with significant InfoSphere Information Server (DataStage) infrastructure. Watson Knowledge Catalog provides integration with the InfoSphere lineage capability, which is relevant for institutions with DataStage-heavy ETL environments.

IBM's financial services positioning is strongest where there is an existing IBM ecosystem to integrate with. For greenfield governance implementations, it is less commonly selected than Collibra or Purview.

### The Selection Decision

Right tool depends on three variables: existing technology stack (what platforms are already deployed and which tools integrate cleanly), governance maturity (a less mature program needs a platform it can grow into, not one requiring extensive configuration up front), and primary use case (BCBS 239 regulatory lineage requires different capabilities than enterprise data discovery or analytics governance).

The most expensive mistake in governance technology selection is treating it as a make-the-problem-go-away purchase. The tool can accelerate a governance program that has operational foundation. It cannot substitute for one.

---

## MDM in Financial Services: The Customer Data Problem

Financial institutions have a customer data problem that predates modern data governance as a discipline and persists despite decades of CRM implementations, data warehouse consolidations, and digital transformation programs. The same customer appears differently across retail banking, commercial lending, wealth management, and credit cards — different identifiers, different name formats, different address records, different relationship structures. At enterprise scale, this fragmentation makes accurate customer-level risk aggregation, regulatory reporting, and customer experience delivery all materially more difficult.

This is the canonical MDM use case in financial services, and it is why customer MDM is so frequently the first MDM initiative a large bank undertakes.

### The Golden Record Problem in Banking

The "golden record" concept in MDM refers to the single, authoritative representation of an entity — in this case, a customer — that resolves conflicts between source system records and presents the most accurate, complete version of the truth. In manufacturing or retail, golden record creation is complex but structurally bounded: products have SKUs, suppliers have IDs, customers are typically individual consumers.

In banking, the entity resolution problem is harder. A commercial banking customer is a legal entity that may have dozens of subsidiaries, each with their own banking relationships. A wealth management client may be an individual, a trust, a family office, or all three simultaneously. The relationship model — who owns what, who controls whom, who should be aggregated with whom for large exposure reporting — is itself a governed data problem with regulatory implications (Large Exposure Framework, connected counterparties under CRR).

Creating a golden record for a financial institution customer requires decisions that are fundamentally governance decisions, not technology decisions: which source system's record is authoritative for which attributes, what survivorship rules apply when records conflict, and who has authority to override automated match-merge decisions. The MDM platform executes those rules; the governance program defines them.

### Matching Rules and Survivorship Logic as Governed Policy

In MDM implementations I have led at Nestle Purina using Profisee, the most time-intensive work was not technical configuration — it was establishing the business rules for matching and survivorship that the platform would execute. Which attributes uniquely identify an entity? When two records partially match, what threshold triggers an automated merge versus a manual review queue? When records from two source systems have conflicting values for the same attribute, which system's value survives?

These decisions carry different stakes in financial services than in manufacturing. In banking, a false positive merge — incorrectly consolidating two distinct customers into a single record — can create phantom exposures, incorrect risk aggregation, and regulatory findings. The survivorship logic has to be defined with explicit input from risk, compliance, and legal, not just the business analysts closest to the data.

The MDM governance model in financial services requires stewardship capacity for exception management: automated processes will produce a queue of records requiring human review for match decisions, and that queue needs trained stewards with clear decision authority and documented disposition rationale. Under-resourced stewardship is the primary reason MDM programs in financial services accumulate unresolved exception queues that undermine data quality rather than improving it.

### MDM and BCBS 239

The connection between MDM and BCBS 239 is direct: Principle 4 (Completeness) requires that all counterparty exposures be captured and aggregated accurately at the enterprise level. If the institution does not have a reliable enterprise customer/counterparty master, it cannot accurately aggregate counterparty exposure across all business lines. The counterparty master is not a nice-to-have analytics asset; it is a regulatory requirement infrastructure component.

---

## Common Mistakes in Financial Services Data Governance

Governance programs fail in consistent ways. The mistakes below are drawn from patterns observable across multiple institutions in different regulatory environments.

**Treating BCBS 239 as a reporting project.** The most common and most expensive mistake. Rebuilding the front-end reporting layer without addressing data ownership, lineage, and quality at source produces reports that look better but fail examination the moment an examiner looks behind them.

**Building governance without executive sponsorship.** Data governance requires authorities that cross organizational boundaries — LOB data owners who must align on enterprise definitions, technology teams that must prioritize lineage work alongside product deliveries, risk functions that must integrate with governance workflows. Without executive sponsorship, governance cannot compel cross-boundary cooperation.

**Assigning data owner titles without actual authority.** Title assignment is not governance. Data owners who cannot make decisions, resolve disputes, or hold accountable the processes that affect their data are not functioning as owners.

**Purchasing governance tools before defining the governance model.** The tool cannot define the governance model. Governance model design is a human activity that requires organizational decisions about role structures, decision authorities, escalation paths, and process standards. Tools enable those processes once they exist.

**Skipping data lineage documentation because it is hard.** Legacy environments make lineage documentation difficult. The regulatory obligation to document lineage exists regardless of the difficulty. Phased lineage documentation — starting with CDEs feeding the most scrutinized regulatory reports — is a practical approach. Skipping it entirely is not.

**Confusing data governance with data management or data architecture.** Data architecture defines how data should be structured and stored. Data management encompasses the technical practices for data storage, integration, and processing. Data governance defines the decision rights, policies, and accountability structures that ensure data is trustworthy. These are related disciplines with different owners and different governance implications. Conflating them typically means governance gets funded as a technology program and the organizational change work never happens.

**Scoping governance only to regulatory data.** Governance programs that scope exclusively to BCBS 239 CDEs or SR 11-7 model input data create a two-tier data environment: tightly governed regulatory data and ungoverned operational data. But operational data quality failures propagate into regulatory data. Customer onboarding data quality problems become counterparty master data quality problems that surface in regulatory aggregation.

**Underestimating the organizational change requirement.** Data governance is not a technology implementation. It requires sustained behavioral change from business users, technology teams, and senior management. Governance programs that invest in tooling and documentation but not in organizational change management will produce artifacts without adoption.

---

## Frequently Asked Questions

### What is BCBS 239 and why does it matter for data governance?

BCBS 239, published by the Basel Committee on Banking Supervision in 2013, establishes 14 principles for effective risk data aggregation and risk reporting. It applies initially to Global Systemically Important Banks (G-SIBs) and has been extended by national regulators to Domestic SIBs in many jurisdictions.

It matters for data governance because it is the most specific regulatory articulation of what "well-governed risk data" means in a banking context. Principles 1 and 2 address governance structure and data architecture. Principles 3 through 6 address data accuracy, completeness, timeliness, and adaptability. Compliance requires documented data ownership, traced lineage from source to regulatory report, and ongoing quality monitoring — all of which are governance program deliverables, not technology deliverables. Banks that have treated BCBS 239 as a reporting project rather than a governance project continue to receive exam findings more than a decade after the standard was published.

### How is data governance in financial services different from other industries?

Three characteristics distinguish financial services governance from other sectors. First, the regulatory examination burden: banking regulators actively examine data governance programs as part of supervisory oversight, with findings that carry remediation requirements and, in severe cases, enforcement actions. In most industries, governance is driven by internal decision quality; in banking, it is examined externally. Second, the precision required for regulatory data: data elements feeding capital, liquidity, and risk reports must be traceable to authoritative sources with documented lineage and defined quality thresholds — a standard of rigor that few other industries require for operational data. Third, the complexity of entity relationships: counterparty aggregation, connected parties, and large exposure frameworks create data relationship complexity that most industry MDM programs do not encounter.

### What roles are required for a bank's data governance program?

A complete financial services governance organization includes: a Chief Data Officer or equivalent executive who owns the program and provides regulatory-level accountability; a Data Governance function with governance analysts and stewardship program management; Data Domain Owners — senior business executives with decision authority over data domains; Data Stewards — embedded business subject matter experts who operate day-to-day governance within domains; Data Custodians — technology counterparts responsible for technical data controls and lineage capture; and a Data Governance Council — the cross-functional decision-making body for enterprise data policy. For BCBS 239 compliance specifically, a Risk Data Aggregation (RDA) Lead role is often established to coordinate between governance and risk reporting teams.

For a complete treatment of stewardship roles and responsibilities in regulated environments, see the guide to [data steward responsibilities in financial services](/what-is-a-data-steward-complete-guide-2026/). For practitioners entering or advancing in the field, our guide to [data governance interview questions for financial services roles](/crack-the-code-data-governance-interview-questions-unveiled/) covers what hiring managers are asking in 2026.

### How do you build data lineage for regulatory reporting?

Regulatory lineage must cover three layers: business lineage (which systems capture which data concepts and how those concepts flow across business processes), technical lineage (actual system-to-system data flows — ETL jobs, APIs, database procedures), and transformation lineage (the specific calculation and aggregation rules applied as data moves through the chain). For BCBS 239, lineage should extend from the authoritative source system for each CDE, through all intermediate processing, to the specific value appearing in the regulatory report.

Practically, build lineage in priority order: start with CDEs feeding the reports under the most active regulatory scrutiny. Use automated lineage harvesting from ETL tools where possible — manual documentation goes stale. Establish a lineage maintenance process so documentation is updated when systems or processes change, not just when an examiner asks for it. Collibra and Microsoft Purview both provide lineage harvesting capabilities that can accelerate this work in appropriate environments.

### What is SR 11-7 and how does it connect to data governance?

SR 11-7 is the Federal Reserve's Supervisory Guidance on Model Risk Management, issued in April 2011\. It establishes requirements for how banks identify, measure, monitor, and control risk from the use of models in decision-making — including risk models, pricing models, stress testing models, and credit scoring models.

The connection to data governance is that models consume data. SR 11-7 requires that model validation include assessment of model input data quality, and that banks maintain a model inventory documenting each model's inputs, outputs, and use. Both of these requirements are governance deliverables. The model inventory is a governed data asset requiring the same quality management as any other CDE. Input data elements that are already CDEs under the governance program need to have their lineage and quality documentation extended to note downstream model consumption. When a CDE quality breach occurs, model risk management must be notified if that element feeds active risk models.

### What tools do financial institutions use for data governance?

The most widely deployed platform in large financial institutions is Collibra, which provides enterprise data catalog, business glossary, policy management, lineage, and stewardship workflow capabilities suited to BCBS 239 compliance use cases. Microsoft Purview is growing rapidly in Azure-native banks, providing automated lineage scanning across Azure services and strong integration with Microsoft's compliance and information protection ecosystem. Informatica IDMC addresses governance, data quality, and MDM in a unified platform, favored in institutions with complex legacy environments and existing Informatica infrastructure. Atlan has gained traction in analytics-forward teams but is less suited to regulatory governance than analytics governance. IBM Watson Knowledge Catalog is present in institutions with existing IBM infrastructure, particularly DataStage environments. Tool selection should follow governance model design — implementing any platform before the governance operating model is defined produces an expensive catalog without governance.

### How long does it take to implement a data governance program in a bank?

Realistic timeframes: a governance program capable of demonstrating meaningful BCBS 239 progress to examiners typically requires 18 to 24 months of sustained effort. The first 6 months should establish the governance operating model — roles, council structure, policy framework, and CDE prioritization — without attempting to complete lineage documentation. Months 6 through 18 focus on lineage documentation and quality monitoring for highest-priority CDEs, governance technology implementation, and stewardship capacity building. Beyond 18 months, the program transitions from implementation to continuous operations, expanding CDE coverage and maturing governance practices.

Programs that attempt to compress this timeline by running all workstreams simultaneously typically produce documentation without operational capability. The sequencing is the program; shortcuts in it create the gaps that examination findings expose. For a structured view of governance maturity stages, the [data governance maturity model](/data-governance-maturity-model/) framework provides useful benchmarks for each phase.

### What are critical data elements (CDEs) and how are they defined in banking?

Critical Data Elements are the specific data attributes deemed most important to business operations and regulatory compliance, designated for enhanced governance treatment — documented lineage, defined quality thresholds, assigned ownership and stewardship, and monitored quality metrics.

In banking, CDEs are identified through three primary lenses: regulatory reporting consumption (any element that feeds a capital, liquidity, or risk report is a candidate), risk management consumption (elements feeding risk models or risk management decision-making), and enterprise financial reporting. Prioritization applies even within these categories — a bank may have thousands of data elements feeding regulatory reports, and cannot instrument quality monitoring for all of them simultaneously. The governance program should establish a CDE designation process — a formal request, review, and approval workflow — and begin with the elements in the most scrutinized regulatory submissions.

### How does data governance support DORA compliance?

DORA, which entered application in January 2025 for EU financial entities and their critical third-party providers, requires ICT risk management, operational resilience testing, and third-party ICT risk management. Data governance supports DORA compliance in several ways. ICT asset inventories required under DORA include data assets — systems, databases, and data flows — which should already be documented as part of data lineage and CDE management if a governance program is in place. Data integrity requirements during ICT disruptions map directly to governance controls around data quality and availability. Third-party data providers supplying data used in risk management are in-scope for DORA's third-party risk management requirements, and governance frameworks should extend to assess and monitor those providers. Institutions with mature data governance programs will find that most DORA data-related requirements map to existing governance artifacts.

### What is the difference between data governance and model risk governance?

Data governance manages the decision rights, policies, and accountability structures that ensure data assets are accurate, trusted, and used appropriately across the enterprise. Model risk governance — governed by SR 11-7 — manages the identification, development, validation, approval, and ongoing monitoring of models used in business decision-making.

The two disciplines are related but distinct. Data governance is the foundation: if the data that models consume is not well-governed, model validation cannot be completed to standard, because the accuracy and lineage of model inputs cannot be demonstrated. Model risk governance builds on that foundation by adding model-specific controls — independent validation, challenger models, periodic performance monitoring, and model inventory management. The model inventory is itself a data asset that should be governed under the data governance program. The practical integration point is the CDE governance documentation, which should extend to note downstream model consumption and trigger model risk notification when input data quality issues arise.

---

## Where Financial Services Data Governance Is Heading

The argument of this guide is simple but frequently ignored: financial services data governance is a structural operational capability, not a compliance project. When it is built as a compliance project — scoped to close a specific regulatory finding, staffed as a temporary remediation program, and defunded when the immediate pressure subsides — it fails. When it is built as a durable operational capability — with executive ownership, trained stewardship, enforced policies, and governed technology — it pays compounding returns across every regulatory program and business initiative that depends on trusted data.

The institutions that understood BCBS 239 this way in 2013 built governance programs that are now absorbing DORA requirements, SR 11-7 model data requirements, and emerging AI governance obligations without starting from scratch. The institutions that treated BCBS 239 as a reporting remediation project are still receiving exam findings in 2026 — and are now facing the additional burden of AI model governance on top of a risk data infrastructure that was never properly organized.

Looking forward, three developments are converging that will define where financial services data governance goes over the next five years.

**AI governance in regulated institutions.** As financial institutions deploy machine learning models in credit underwriting, fraud detection, market surveillance, and customer analytics, the governance requirements expand. AI models consume data at scale, produce outputs that influence regulated decisions, and introduce explainability requirements that traditional statistical models do not face. The governance infrastructure required for AI — lineage from training data to model, documented data quality standards for training sets, ongoing monitoring of model inputs and outputs — is an extension of BCBS 239-style risk data governance. Institutions that have built mature CDEs and lineage capabilities will extend them to AI governance; institutions that have not will face a governance build from scratch in the middle of AI adoption.

**Regulatory convergence.** BCBS 239, SR 11-7, DORA, and emerging AI regulation are not independent frameworks that can be addressed by independent programs. They share a common infrastructure requirement: governed, traceable, high-quality data with clear ownership. Regulators are increasingly conducting cross-framework examinations — looking at whether risk data governance, model risk management, and operational resilience programs share a coherent data infrastructure or represent siloed compliance exercises. Practitioners should be building toward integrated governance frameworks, not managing separate programs for each regulatory driver.

**Data mesh and federated governance.** Large financial institutions are increasingly moving toward distributed data architectures — data mesh approaches where domain teams own their data products end-to-end rather than routing everything through centralized data engineering. Federated governance models that establish enterprise standards and policies while distributing execution to domain teams are replacing centralized governance approaches that created bottlenecks without improving quality. The practitioner challenge is defining what must be standardized at the enterprise level — CDE definitions, quality thresholds, lineage documentation standards — versus what can vary by domain. Getting that balance wrong in either direction produces either a governance program that cannot move fast enough to support the business or a federation that has no actual standards.

For practitioners building or rebuilding financial services governance programs now: invest in the foundation before the tools, invest in the people before the processes, and build governance that can absorb the next regulatory requirement without requiring a new program to be stood up. The regulatory environment for financial data will not get simpler. The institutions that will manage it best are the ones building governance as a permanent institutional capability, not as a response to the most recent examination finding.

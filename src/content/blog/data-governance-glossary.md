---
title: "Data Governance Glossary: 80 Terms Every Practitioner Should Know (2026)"
description: "The definitive practitioner's glossary of data governance terms — from access control to zero-trust data — with practical context, not vendor marketing."
pubDate: 2026-04-25T00:00:00.000Z
wpSlug: "data-governance-glossary"
categories: ["Data Governance"]
tags: ["data governance", "glossary", "data management", "metadata", "compliance", "definitions"]
draft: false
image: /og/2024/03/data-governance-trends-2024.jpg
imageAlt: "Data Governance Glossary"
ogImage: /og/2024/03/data-governance-trends-2024.jpg
---

A practitioner's glossary, written for people who have to *use* these terms in policies, RFPs, and committee meetings — not just recognize them on a vendor slide. Where a term has nuance, the definition flags it. Where a term is contested between vendors and standards bodies, both interpretations are noted.

* [A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [L](#l) · [M](#m) · [O](#o) · [P](#p) · [Q](#q) · [R](#r) · [S](#s) · [T](#t) · [Z](#z)

---

## A

**Access Control** — The mechanism that determines who can read, write, modify, or delete a piece of data. In modern stacks, increasingly enforced at the query layer (row-level security, column masking) rather than at the application layer.

**Active Metadata** — Metadata that is continuously updated and pushed *into* the tools where work happens (Snowflake, dbt, Slack), as opposed to passive metadata in a catalog users have to visit. The defining shift in catalog architecture in 2024–2026.

**Aggregate Data** — Data that has been summarized or grouped (counts, averages, totals) such that individual records cannot be identified. Often a strategy for reducing privacy risk while preserving analytical value.

**AI Act (EU)** — Regulation 2024/1689, effective in phases through 2027. Classifies AI systems by risk, imposes documentation and conformity requirements on high-risk systems. First major enforcement window opens August 2026. See [EU AI Act compliance guide](/eu-ai-act-data-governance-requirements/).

**AI Steward** — Emerging role (2026) responsible for training data documentation, model card maintenance, bias monitoring, and AI Act conformity artifacts. Often a bifurcation of the traditional data steward role.

**Anonymization** — Irreversible removal of identifying information from data. Distinguished from pseudonymization, which is reversible. Under GDPR, true anonymization removes data from the regulation's scope; pseudonymization does not.

**Audit Trail** — The chronological record of who accessed or modified data and when. A non-negotiable control for regulated industries; increasingly expected for AI inference logs under the AI Act.

## B

**Bias (Algorithmic)** — Systematic deviation in model output that disadvantages a protected group. Governance teams measure it via fairness metrics (demographic parity, equalized odds) and document it in model cards.

**BCBS 239** — Basel Committee on Banking Supervision's principles for effective risk data aggregation and risk reporting. The reason every large bank has a CDO and a data governance program.

**Business Glossary** — A curated dictionary of business terms with agreed definitions, owners, and approval status. Distinct from a data dictionary (which describes technical attributes of fields). See [business glossary vs data dictionary](/business-glossary-vs-data-dictionary/).

**Business Steward** — A practitioner accountable for the day-to-day quality, documentation, and policy adherence of a domain's data. Always a business role, never IT. See [data steward vs data owner vs data custodian](/data-steward-vs-data-owner-vs-data-custodian/).

## C

**CCPA** — California Consumer Privacy Act, effective 2020, amended by CPRA in 2023. Grants California residents rights over their personal data; enforcement falls to the California Privacy Protection Agency. See [CCPA meaning guide](/ccpa-meaning/).

**Chief Data Officer (CDO)** — The C-suite executive accountable for the organization's data strategy, governance, and increasingly AI policy. See [the CDO's guide](/chief-data-officer-guide-data-governance/).

**Conformity Assessment** — Under the EU AI Act, the formal documentation proving a high-risk AI system meets the Act's requirements before market placement. Often a 6+ month process.

**Consent** — Under GDPR/CCPA, a lawful basis for processing personal data when the data subject has explicitly agreed. Must be specific, informed, freely given, and revocable.

**Controller** — Under GDPR, the entity that determines the purposes and means of personal data processing. Distinct from a *processor*, which acts on the controller's instructions.

**Critical Data Element (CDE)** — A data element whose accuracy or availability materially impacts business outcomes or regulatory reporting. Most governance programs scope first to CDEs, then expand.

## D

**Data Architecture** — The structural design of how data flows, is stored, and is governed across an organization. The blueprint that data governance enforces. See [data architecture in governance](/data-architecture-a-key-component-of-data-governance/).

**Data Catalog** — A searchable inventory of an organization's data assets with metadata (ownership, quality, lineage, classification). Modern catalogs increasingly emphasize active-metadata distribution. See [what is a data catalog](/what-is-a-data-catalog/).

**Data Classification** — The process of categorizing data by sensitivity (public, internal, confidential, restricted) so policies can be applied. See [data classification guide](/a-comprehensive-guide-to-data-classification-for-data-governance/).

**Data Contract** — A versioned, enforceable agreement between data producers and consumers specifying schema, freshness, quality, and breaking-change policy. See [data contracts guide](/data-contracts/).

**Data Custodian** — The technical role responsible for implementing controls — encryption, backups, access provisioning — on behalf of the data owner. Usually IT or platform engineering.

**Data Dictionary** — A technical reference describing fields, types, formats, and relationships in a database or schema. Distinct from a business glossary (which defines business concepts).

**Data Domain** — A logical grouping of data by business meaning (customer, finance, product). Modern governance programs assign owners and stewards by domain, not by system.

**Data Ethics** — The branch of governance concerned with the moral implications of data use, especially in AI: fairness, harm, transparency, consent. See [data ethics in governance](/data-ethics-in-data-governance/).

**Data Fabric** — An architectural pattern using metadata, ML, and integration to provide unified access across distributed data sources. Often positioned as alternative to data mesh.

**Data Governance** — The exercise of authority and control over the management of data assets. Defines policies, standards, roles, and processes that determine how data is collected, stored, used, and protected. See [what is data governance](/what-is-data-governance/).

**Data Lake** — A repository of raw data in its native format. Cheap storage, schema-on-read. See [understanding data lakes](/understanding-data-lakes/).

**Data Lakehouse** — Architectural pattern combining data lake economics with data warehouse query performance and ACID guarantees. Powered by open table formats like Apache Iceberg and Delta Lake.

**Data Lineage** — The traceable path of data from source through transformations to final use. Required for AI Act conformity, debugging quality issues, and impact analysis. See [data lineage guide](/data-lineage-leveraging-the-power-of-insight-to-revolutionize-data-governance/).

**Data Literacy** — The ability to read, work with, analyze, and communicate with data. Increasingly required of business stakeholders, not just data teams. See [data literacy for leaders](/data-literacy-for-leaders/).

**Data Mesh** — A decentralized data architecture where domain teams own their data products and a federated governance layer coordinates standards. See [data mesh explained](/data-mesh-decentralized-governance/).

**Data Observability** — Continuous monitoring of data freshness, volume, schema, distribution, and lineage to detect quality issues before they reach consumers. Vendors: Monte Carlo, Bigeye, Soda.

**Data Owner** — The senior business stakeholder accountable for outcomes in a data domain. Approves policies, signs off on access. *Accountable* (RACI sense), distinct from steward (Responsible) and custodian (Responsible-technical).

**Data Privacy** — The right of individuals to control how their personal data is collected and used. Enforced through regulations (GDPR, CCPA, etc.) and operationalized through governance.

**Data Product** — A curated, versioned, documented dataset with an owner, an SLA, and a defined consumer interface. The unit of governance in data mesh and increasingly in non-mesh organizations.

**Data Quality** — The fitness of data for its intended use, typically measured along dimensions: accuracy, completeness, consistency, timeliness, uniqueness, validity. See [data quality strategy](/5-steps-to-a-successful-data-quality-strategy-for-enterprise-data-management/).

**Data Sovereignty** — The principle that data is subject to the laws of the country in which it is stored or collected. Drives multi-cloud architecture decisions. See [data sovereignty](/data-sovereignty/).

**Data Steward** — The business practitioner responsible for day-to-day stewardship of a domain — glossary curation, quality triage, consumer communication. *Responsible* in RACI sense. See [what is a data steward](/what-is-a-data-steward-complete-guide-2026/).

**Data Strategy** — The plan for how an organization will collect, manage, and exploit data to achieve business outcomes. Governance is one component; analytics, ML, and architecture are others. See [data strategy in 9 steps](/comprehensive-data-strategy-9-key-steps-success/).

**Data Subject** — Under GDPR, an identified or identifiable natural person whose personal data is processed.

**Data Warehouse** — A centralized repository optimized for analytical queries, typically with structured, modeled data. Modern data warehouses (Snowflake, BigQuery, Redshift) increasingly blur with lakehouses.

**Deletion (Right to)** — Under GDPR ("right to erasure") and CCPA, the data subject's right to request deletion of their personal data. Operationally enforced through retention controls and deletion workflows.

**De-identification** — The process of removing direct identifiers from a dataset. Weaker than anonymization (which also requires preventing re-identification through inference).

## E

**ELT (Extract, Load, Transform)** — Modern data integration pattern: load raw data into a warehouse, then transform with SQL/dbt. Replaced traditional ETL in cloud-native stacks.

**Encryption** — The conversion of data into ciphertext using a key. Required at rest and in transit by virtually all compliance regimes. Typically a [data custodian](/data-steward-vs-data-owner-vs-data-custodian/) responsibility.

**ETL (Extract, Transform, Load)** — Traditional integration pattern: transform data outside the warehouse before loading. Still common in on-premises environments. See [ETL processes guide](/mastering-data-engineering-etl-processes-guide/).

**EU AI Act** — See **AI Act (EU)**.

**EU Data Act** — Regulation 2023/2854, effective September 2025. Governs access to and sharing of data generated by connected products and related services. Distinct from the AI Act and GDPR.

**Explainability** — The ability to mathematically articulate why a model produced a specific output. Hard requirement under EU AI Act for high-risk systems.

## F

**Fair Information Practices (FIPs)** — Foundational principles (transparency, purpose limitation, data minimization, accuracy, security, accountability) that underpin most modern privacy regulation.

**Federated Governance** — A model where central governance sets standards and policies, but execution is distributed to domain teams. The dominant pattern in modern programs and the basis of data mesh.

**Feature Store** — A managed repository of curated, versioned features for ML training and inference. Increasingly under governance scope as feature-level lineage matters for AI Act conformity.

**Fine-Grained Access Control** — Access controls applied at the row, column, or cell level rather than table or database level. Enabled by warehouse-native features (Snowflake row access policies, Databricks Unity Catalog).

## G

**GDPR** — General Data Protection Regulation (EU Regulation 2016/679), effective May 2018. The benchmark global privacy law. See [GDPR's impact on enterprise governance](/understanding-gdpr-principles-and-their-impact-on-enterprise-data-governance/).

**Glossary** — See **Business Glossary**.

**Golden Record** — In MDM, the authoritative version of a record (customer, product, etc.) consolidated from multiple source systems. See [MDM matching and survivorship](/mdm-matching-and-survivorship/).

## H

**HIPAA** — US Health Insurance Portability and Accountability Act. Imposes privacy and security requirements on covered entities handling protected health information (PHI).

## I

**Information Governance** — A broader discipline encompassing data governance plus records management, content management, and unstructured information. See [what is information governance](/what-is-information-governance-guide/).

**Inference Log** — A record of model inputs, outputs, and metadata at prediction time. Treated as audit material under EU AI Act for high-risk systems.

## L

**Lineage** — See **Data Lineage**.

## M

**Master Data** — The non-transactional data that defines core business entities (customers, products, employees, locations). Managed via Master Data Management (MDM). See [master data management](/master-data-management/).

**Master Data Management (MDM)** — The discipline of creating and maintaining a single, consistent, authoritative view of master data across an enterprise. See [MDM best practices](/mdm-best-practices-for-enterprise-data-management/).

**Maturity Model** — A staged framework for assessing where a governance program sits and what to build next. See [data governance maturity guide](/a-comprehensive-guide-to-achieving-data-governance-maturity/).

**Metadata** — Data about data: schemas, ownership, quality, lineage, classification. Active metadata is the modern variant; passive metadata sits in catalogs unread.

**Metadata Management** — The practice of capturing, curating, and distributing metadata to make data discoverable and trustworthy. See [metadata management best practices](/the-best-practices-for-metadata-management-why-it-matters/).

**Model Card** — A standardized document describing a model's intended use, training data, performance metrics, and limitations. Originally proposed by Mitchell et al. (2019); now an EU AI Act expectation.

**Model Governance** — The discipline of governing AI/ML models: provenance, versioning, performance monitoring, retirement. Increasingly integrated with data governance rather than a separate practice.

## O

**Owner** — See **Data Owner**.

## P

**Personal Data** — Under GDPR, any information relating to an identified or identifiable natural person. The CCPA equivalent is "personal information." Both definitions are broad.

**PII (Personally Identifiable Information)** — Data that identifies an individual: name, SSN, email. A US-centric term; GDPR uses the broader "personal data."

**Policy** — A documented rule defining what is required, allowed, or forbidden in a domain. See [data governance policy guide](/data-governance-policy/).

**Privacy by Design** — A principle (and GDPR requirement) that privacy considerations are embedded in system design from the start, not bolted on after.

**Processor** — Under GDPR, an entity that processes personal data on behalf of a controller. Subject to its own obligations under Article 28.

**Pseudonymization** — Replacing identifiers with artificial tokens that can be reversed using a key held separately. A risk-reduction technique; data remains "personal data" under GDPR.

## Q

**Quality (Data)** — See **Data Quality**.

## R

**RACI** — Responsible, Accountable, Consulted, Informed. The matrix governance teams use to assign clear ownership for activities. See [data steward vs data owner vs data custodian](/data-steward-vs-data-owner-vs-data-custodian/).

**Reference Data** — Slowly-changing data that classifies or categorizes other data: country codes, product categories, status codes. See [understanding reference data](/understanding-reference-data/).

**Retention** — The policy controlling how long data is kept and when it is deleted. Required by most privacy regulations and by industry-specific rules (e.g., FINRA in finance).

**Right to Access / Right to Erasure / Right to Portability** — Three of the GDPR-granted data subject rights. Operationalized through documented response workflows, usually with a 30-day SLA.

**Risk** — The possibility of adverse outcomes from data processing: regulatory fines, reputational damage, operational disruption. See [data risk management](/data-risk-management/).

**Row-Level Security (RLS)** — Access control applied at the row level, typically based on the querying user's identity or role. Enabled natively in modern warehouses.

## S

**Schema** — The structure of a dataset: column names, types, relationships. Schema evolution is a primary subject of data contracts.

**Sensitive Data** — Data whose disclosure could cause harm: health records, financial details, sexual orientation, biometric data. GDPR designates "special categories" with elevated protection requirements.

**SLA (Service Level Agreement)** — A formalized commitment to a service level — for a data product, typically freshness, completeness, and uptime. Data products without SLAs aren't really products.

**Steward** — See **Data Steward**.

## T

**Taxonomy** — A hierarchical classification of concepts. Used in governance to organize a business glossary or to classify data assets. See [mastering data taxonomy](/mastering-data-taxonomy-with-real-life-examples/).

## Z

**Zero-Trust Data** — A security model where access is never assumed: every query, regardless of network or user, is authenticated, authorized, and audited. Growing as the dominant pattern in data platform security.

---

## How to use this glossary

A glossary is most useful when it's *referenced* — link to specific entries from your policies, your catalog, your data product documentation. Pick the 20 terms most central to your program, link to their definitions from your internal wiki, and update annually.

This page is updated as the field evolves; if you spot a term that should be on it, [contact us](/contact/).

### Further Reading

* [What Is Data Governance? The Complete Guide for 2026](/what-is-data-governance-and-why-do-we-need-it/)
* [Data Governance Trends 2026](/data-governance-trends-2024/)
* [Data Steward vs Data Owner vs Data Custodian](/data-steward-vs-data-owner-vs-data-custodian/)
* [What Is a Data Catalog?](/what-is-a-data-catalog/)
* [Business Glossary vs Data Dictionary](/business-glossary-vs-data-dictionary/)

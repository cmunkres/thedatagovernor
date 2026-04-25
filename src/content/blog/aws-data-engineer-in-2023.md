---
title: "AWS Data Engineer Roadmap 2026: From Beginner to AWS Certified Data Engineer"
description: "The complete 2026 roadmap to become an AWS data engineer — services to learn, certification path (DEA-C01), salary expectations, and a 9-month study plan that works."
pubDate: 2023-03-15T14:32:28.000Z
updatedDate: 2026-04-25T00:00:00.000Z
wpSlug: "aws-data-engineer-in-2023"
categories: ["Career in Data"]
tags: ["AWS", "data engineering", "cloud", "certification", "DEA-C01", "Glue", "Redshift", "data engineer 2026"]
draft: false
image: /2023/03/Aws-data-engineer-in-2023-e1678900254272.jpg
imageAlt: "AWS Data Engineer Roadmap 2026"
ogImage: /og/2023/03/Aws-data-engineer-in-2023-e1678900254272.jpg
---

AWS data engineering looks substantially different in 2026 than it did in 2022. The Data Analytics Specialty certification (DAS-C01) was retired in April 2024 and replaced by the Data Engineer Associate (DEA-C01), which is now the canonical credential. The service mix that hiring managers expect has shifted as well — Glue has replaced EMR for most ETL workloads, Iceberg has overtaken proprietary table formats, and the convergence between AWS data services and the rest of the modern data stack (dbt, Airflow, Snowflake on AWS) means the 2026 AWS data engineer is rarely a pure-AWS specialist.

This roadmap is for someone who wants to be hireable as an AWS-leaning data engineer in 6-12 months. It assumes basic SQL and some programming experience. It does not assume prior AWS experience. The path lands you at certified, portfolio-equipped, and ready to interview.

* [What an AWS data engineer does in 2026](#what-an-aws-data-engineer-does-in-2026)
* [The certification landscape post-DAS retirement](#the-certification-landscape-post-das-retirement)
* [Phase 1 (Months 1-2): AWS fundamentals + cloud basics](#phase-1-months-1-2-aws-fundamentals--cloud-basics)
* [Phase 2 (Months 2-4): Storage and ingestion services](#phase-2-months-2-4-storage-and-ingestion-services)
* [Phase 3 (Months 3-5): Compute and ETL services](#phase-3-months-3-5-compute-and-etl-services)
* [Phase 4 (Months 4-6): Analytics and warehousing](#phase-4-months-4-6-analytics-and-warehousing)
* [Phase 5 (Months 5-7): Streaming and real-time](#phase-5-months-5-7-streaming-and-real-time)
* [Phase 6 (Months 6-8): Security, monitoring, governance](#phase-6-months-6-8-security-monitoring-governance)
* [Phase 7 (Months 7-9): The DEA-C01 exam](#phase-7-months-7-9-the-dea-c01-exam)
* [Phase 8: The portfolio that gets interviews](#phase-8-the-portfolio-that-gets-interviews)
* [Salary and market expectations 2026](#salary-and-market-expectations-2026)
* [Common mistakes that waste months](#common-mistakes-that-waste-months)
* [Beyond entry-level: where to specialize](#beyond-entry-level-where-to-specialize)
* [Closing: AWS-first vs cloud-agnostic career strategy](#closing-aws-first-vs-cloud-agnostic-career-strategy)

## What an AWS data engineer does in 2026

The role title "AWS data engineer" covers a recognizable set of responsibilities in 2026 organizations:

- 30-40% of the work is building and maintaining data pipelines (ingestion, transformation, scheduling) using AWS-native tools (Glue, Step Functions, MWAA) plus increasingly Airflow or dbt
- 15-25% is data modeling — schema design in S3 (with Iceberg or Delta), Redshift modeling, dimensional modeling for analytics consumption
- 15-20% is operational work — incident response, pipeline reliability, cost optimization
- 10-15% is collaboration — working with analysts, data scientists, software engineers on data needs
- 10-15% is architecture and design — picking the right service for new data sources, evaluating vendor options
- 5-10% is documentation and governance — schema documentation, data dictionary maintenance, lineage updates

What an AWS data engineer is *not* in 2026:

- Not a data scientist (no modeling work)
- Not a BI developer (limited dashboard building)
- Not a software engineer (writes SQL and Python primarily, not Java or backend services)
- Not a DBA (operates managed services, doesn't tune a self-hosted RDBMS)

The AWS data engineer is the person who keeps the pipelines running and the warehouses fresh. The work is essential, the salaries are good, and the path has clear progression to senior data engineer, staff DE, or platform engineering.

## The certification landscape post-DAS retirement

April 2024 brought a meaningful change: AWS retired the Data Analytics Specialty (DAS-C01) and replaced it with the Data Engineer Associate (DEA-C01). The DEA-C01 is now the canonical AWS data engineering credential. Roadmaps written before mid-2024 referencing DAS-C01 are out of date.

**The 2026 cert hierarchy for AWS data engineering:**

1. **AWS Cloud Practitioner (CLF-C02)** — entry-level, optional but reasonable warmup. Skip if you have any cloud experience.
2. **AWS Solutions Architect Associate (SAA-C03)** — strongly recommended foundation. Covers the architecture vocabulary you'll need.
3. **AWS Data Engineer Associate (DEA-C01)** — the target credential. Replaces the retired DAS-C01.
4. **AWS Database Specialty (DBS-C01)** — optional, useful if you go deep on database internals
5. **AWS Machine Learning Specialty (MLS-C01)** — optional, if you head toward ML engineering

The DEA-C01 exam covers four domains: data ingestion and transformation, data store management, data operations and support, data security and governance. The exam is multiple choice plus multiple response, 65 questions in 130 minutes, $150 USD.

Practical certification advice for 2026:

- Don't get certified before you have hands-on practice. Cert without experience is recognizable to interviewers and weakly signals.
- The SAA-C03 → DEA-C01 path takes most candidates 4-6 months of focused study.
- Free credits via AWS Free Tier are sufficient for almost all hands-on practice; budget $20-50/month for any beyond-tier work.
- The exam emphasizes service-selection reasoning: "given this scenario, which service?" Practice that mode of thinking, not service trivia.

## Phase 1 (Months 1-2): AWS fundamentals + cloud basics

Foundational concepts that everything else builds on.

**Cloud computing basics:**

- IaaS vs PaaS vs SaaS, and where AWS data services fit
- Regions and availability zones
- Shared responsibility model
- Pay-as-you-go pricing (and how it goes wrong)

**AWS account setup:**

- Create a sandbox AWS account
- Set up billing alerts (budget $20-30/month max)
- Configure IAM users (don't use root for daily work)
- Set up MFA on the root account
- Install AWS CLI and configure profiles

**IAM (Identity and Access Management) basics:**

- Users, groups, roles, policies
- Inline vs managed policies
- Trust relationships
- Service-linked roles
- The principle of least privilege (in practice)

**Networking essentials:**

- VPC, subnets (public vs private)
- Security groups vs NACLs
- VPC endpoints for service access
- NAT gateways

**Cost basics:**

- Reading the cost explorer
- Cost-saving tactics: lifecycle policies on S3, instance scheduling, Reserved Instances vs Savings Plans
- The most common ways to surprise yourself with a bill: leaving an EC2 running, leaving a Redshift cluster on, accidentally enabling expensive features

**Recommended resources:**

- AWS Skill Builder (free) — solid foundational courses
- Adrian Cantrill's AWS courses (paid, but the gold standard for hands-on quality)
- A Cloud Guru / Pluralsight (paid, alternative)

**Time investment:** 8 weeks at 10-15 hours per week.

## Phase 2 (Months 2-4): Storage and ingestion services

The data layer foundation.

**S3 (Simple Storage Service) — the most important service to master:**

- Buckets, objects, prefixes
- Storage classes: Standard, Intelligent-Tiering, Standard-IA, Glacier, Glacier Deep Archive
- Lifecycle policies
- Versioning and replication
- Bucket policies vs IAM policies vs ACLs (and why ACLs are deprecated)
- Server-side encryption (SSE-S3, SSE-KMS, SSE-C)
- Object Lock for compliance/WORM
- S3 Select and S3 Object Lambda
- Performance: prefix design, request rates, multi-part upload

**Modern table formats on S3:**

- Apache Iceberg — now the default in 2026 for new lakes
- Delta Lake — Databricks ecosystem, less common in pure-AWS environments
- Apache Hudi — niche but supported
- The differences and when to choose each

**S3 best practices:**

- Layered architecture: raw → bronze → silver → gold (or raw → conformed → curated)
- Compaction strategies for Iceberg/Delta
- Schema evolution patterns
- Partitioning strategies that don't backfire

**Other storage:**

- DynamoDB — operational data, key-value, document workloads
- DocumentDB / RDS — for OLTP workloads that feed analytics
- Aurora — managed Postgres/MySQL with cloud-native architecture
- ElastiCache (Redis/Memcached) — caching layer

**Ingestion services:**

- AWS DMS (Database Migration Service) — for replicating from operational databases
- AWS DataSync — for bulk transfer from on-premises
- AWS Transfer Family — SFTP/FTPS/FTP into S3
- Kinesis Data Firehose — managed delivery to S3, Redshift, OpenSearch

**Time investment:** 8 weeks.

## Phase 3 (Months 3-5): Compute and ETL services

The processing layer.

**AWS Glue — the central ETL service in 2026:**

- Glue Data Catalog (the metadata store underneath everything else)
- Glue ETL Jobs (Spark and Python)
- Glue Crawlers
- Glue Studio (visual development)
- Glue DataBrew (no-code data prep)
- Workflow orchestration (less commonly used; people prefer Step Functions or Airflow)
- Cost considerations — Glue can be expensive if you don't manage worker counts

**EMR (Elastic MapReduce) — for the heavy workloads:**

- Persistent vs transient clusters
- EMR Serverless (the modern recommendation for most non-edge cases)
- EMR on EKS (for cost-conscious large-scale)
- Spark on EMR — knowing when this is the right tool
- Hive, Presto/Trino on EMR (less common in 2026)

In 2026 most teams use Glue for the smaller workloads and EMR Serverless for the bigger ones. EMR with persistent clusters is mostly legacy.

**Step Functions — workflow orchestration:**

- State machines and the workflow language
- Standard vs Express workflows
- Integration with Lambda, Glue, ECS
- Error handling and retries

**Lambda for data engineering:**

- Event-driven processing patterns (S3 event → Lambda)
- Lambda's 15-minute execution limit and what it means
- When Lambda is the wrong tool

**MWAA (Managed Workflows for Apache Airflow):**

- The 2026 default for serious orchestration on AWS
- Airflow vs Step Functions trade-offs
- DAG patterns for data pipelines

**dbt on AWS:**

- dbt Core on Glue, EMR, or Redshift
- dbt Cloud as managed alternative
- dbt + Airflow patterns

**Time investment:** 10 weeks, in parallel with continued S3/Glue work.

## Phase 4 (Months 4-6): Analytics and warehousing

The serving layer.

**Amazon Redshift — the warehouse:**

- Provisioned vs Serverless (Serverless is the recommendation in 2026 for most teams)
- Cluster sizing and node types (RA3 nodes are now standard)
- Distribution and sort keys
- Materialized views and AQUA
- Federated queries (querying RDS/Aurora directly from Redshift)
- Spectrum (querying S3 from Redshift)
- Data sharing (cross-account, cross-region)
- Concurrency scaling
- Workload management (WLM)

**Athena — serverless SQL on S3:**

- Querying Iceberg, Parquet, ORC, JSON, CSV
- Athena Engine v3 (Trino under the hood)
- Apache Iceberg support
- Federated queries to RDS, DynamoDB, etc.
- Cost optimization (partition pruning, columnar formats, query result reuse)

**OpenSearch (formerly Elasticsearch):**

- Use cases: log analytics, full-text search, observability
- Cluster sizing and shard design
- OpenSearch Serverless (newer, still maturing)

**QuickSight — AWS-native BI:**

- Reasonable for AWS-native shops, less common as primary BI tool in 2026
- SPICE engine for in-memory speed
- Embed APIs for app integration

**Choosing the right warehouse pattern:**

- Pure Redshift: simple, fast, AWS-native, costs more
- Athena + S3 + Iceberg: serverless, cheap for moderate volumes, more pieces to assemble
- Snowflake on AWS: hybrid path that many teams choose
- Databricks on AWS: hybrid path for ML-heavy teams

**Time investment:** 10 weeks.

## Phase 5 (Months 5-7): Streaming and real-time

Where many junior data engineers underinvest. Streaming knowledge sets you apart.

**Amazon Kinesis ecosystem:**

- Kinesis Data Streams (the backbone)
- Kinesis Data Firehose (managed delivery)
- Kinesis Data Analytics for Apache Flink (managed Flink)
- Kinesis Video Streams (specialized)

**MSK (Managed Streaming for Apache Kafka):**

- When to choose Kafka over Kinesis
- MSK Serverless
- MSK Connect

**Stream processing patterns:**

- Real-time aggregations
- CDC (Change Data Capture) from operational databases via DMS or Debezium
- Stream-to-warehouse (Firehose to Redshift)
- Stream-to-data-lake (Firehose to Iceberg on S3)

**Practical streaming projects:**

- A simple producer/consumer using Kinesis or Kafka
- A CDC pipeline replicating from RDS to Redshift
- A real-time aggregation using Flink

**Time investment:** 6-8 weeks.

## Phase 6 (Months 6-8): Security, monitoring, governance

The make-or-break-in-production phase.

**Security:**

- IAM at depth (policies, conditions, ABAC vs RBAC)
- KMS — keys, key rotation, cross-account access
- Secrets Manager and Parameter Store
- VPC endpoints to keep traffic private
- Lake Formation for fine-grained access control on the lake
- Network isolation patterns

**Monitoring and observability:**

- CloudWatch metrics, logs, alarms
- CloudTrail for audit logs
- AWS X-Ray for tracing
- AWS Config for compliance monitoring
- Cost anomaly detection

**Data governance:**

- AWS Glue Data Catalog as a metadata foundation
- Lake Formation for permissions and tag-based policies
- Data lineage (DataZone, custom solutions)
- AWS DataZone (newer, AWS's answer to a unified data marketplace)
- Integration with broader [data governance](/what-is-data-governance/) programs
- See also: [data governance framework](/data-governance-framework/) for the non-AWS-specific governance picture

**Cost control:**

- Cost Explorer, Cost and Usage Reports
- Budgets and alerts
- Tagging strategy (tag everything; reports depend on it)
- The most expensive AWS data services and how to spot runaway costs

**Time investment:** 6-8 weeks.

## Phase 7 (Months 7-9): The DEA-C01 exam

Once you've done the hands-on work above, the cert exam is a ~6-8 week additional sprint.

**Preparation strategy:**

1. **Take an end-to-end course.** Stephane Maarek (Udemy) and Adrian Cantrill both have DEA-C01 courses; Cantrill is more thorough, Maarek is more efficient.

2. **Use TutorialsDojo or Whizlabs practice tests.** These are the highest-quality practice tests for AWS exams; if you can score 80%+ consistently, you're ready.

3. **Read the exam guide thoroughly.** AWS publishes the official exam guide listing every domain and sub-objective.

4. **Practice service-selection thinking.** Most exam questions are scenarios where you pick the right service. Practice this mode.

5. **Schedule the exam in advance.** Having a date forces studying. $150 USD; book through Pearson VUE.

**Common pitfalls on DEA-C01:**

- Out-of-date study material referencing DAS-C01 (the exam being replaced)
- Missing recent service updates (Iceberg support, Glue updates, Redshift Serverless)
- Underweighting security/governance domain (it's 18% of the exam)
- Memorizing service trivia instead of understanding service trade-offs

**Pass rate is decent (around 50-65% of people who take it pass first time).** Most failures are people who under-prepared the security/governance domain.

## Phase 8: The portfolio that gets interviews

Cert plus portfolio is the winning combination. Cert alone is not enough.

**Strong portfolio projects for AWS data engineering:**

1. **End-to-end data lake** — ingest a public dataset, land in S3, transform with Glue, register in Iceberg, query with Athena, optional Redshift Spectrum, dashboard with QuickSight or Tableau. Document every architectural decision in the README.

2. **CDC pipeline** — set up a small RDS Postgres database, configure DMS for change data capture, land changes in S3, materialize a current-state table in Redshift Serverless. Show schema evolution handling.

3. **Streaming pipeline** — Kinesis Data Streams ingestion of a synthetic event source, real-time aggregation with Kinesis Data Analytics for Flink, output to S3 and OpenSearch.

4. **Cost-optimized ETL** — same workload built two different ways (Glue PySpark vs Athena CTAS), with cost analysis showing the trade-offs. This is interview gold.

5. **Production-grade pipeline** — orchestration in Step Functions or MWAA, with monitoring, alerting, retry logic, lineage documentation, IaC (CloudFormation or Terraform).

For each project:

- Code on GitHub with clean commit history
- README explaining what the pipeline does, design choices, results
- Architecture diagram (drawn in draw.io or similar)
- IaC where reasonable (Terraform or CloudFormation)
- Cost analysis section

Avoid:

- Tutorial copy-paste with no original content
- Projects that don't show the trade-offs (why Glue vs EMR? Why Iceberg vs Delta?)
- Skipping the IaC — for senior roles, Terraform fluency is expected

## Salary and market expectations 2026

US base salaries for AWS data engineering roles (Glassdoor, levels.fyi, Robert Half):

- **Junior (0-2 years):** $90,000-115,000 mid-cost / $105,000-140,000 high-cost
- **Mid-level (2-5 years):** $115,000-150,000 / $135,000-180,000
- **Senior (5+ years):** $150,000-200,000 / $180,000-250,000
- **Staff/Principal:** $200,000-275,000 / $250,000-360,000

Total comp at FAANG: senior data engineer roles at AWS, Amazon retail, Google, Meta, Microsoft typically clear $300K-450K total comp.

Market notes:

- Strong demand in healthcare, financial services, e-commerce, supply chain — all data-heavy verticals running on AWS
- Pure data engineering roles are slightly more stable than data science roles in 2026 (less ML-hype-cycle exposure)
- AWS-specific data engineering pays a small premium over generalist DE in companies that are AWS-committed
- Remote work is still common in DE roles; many companies have settled on flexible/hybrid

The hiring loop typically:

1. Recruiter screen
2. Technical phone screen — SQL + Python, sometimes AWS service trivia
3. Take-home or live coding (build a small pipeline)
4. Onsite/virtual onsite (3-5 hours): system design, deeper coding, architectural discussion, behavioral
5. Reference checks

Plan 5-10 loops to offer.

## Common mistakes that waste months

**Studying for cert before doing hands-on.** Cert knowledge without service experience is recognizable to interviewers. Build first, certify second.

**Memorizing service catalogs without understanding trade-offs.** "Glue is for ETL" is not the same as "I'd choose Glue over EMR for this workload because…" The latter wins interviews.

**Underinvesting in IAM.** Senior roles get filtered by IAM depth. Spend more time on it than feels comfortable.

**Skipping IaC.** Building everything via console is fine for learning. Production work uses Terraform or CloudFormation. Get fluent in one.

**Ignoring cost.** Senior data engineers know what their pipelines cost. Junior candidates who don't are an obvious flag.

**Treating "AWS data engineer" as the destination.** AWS-specific specialization is a starting point. Most senior data engineers are cloud-agnostic by year 5.

## Beyond entry-level: where to specialize

After year 2-3, paths open up:

**Senior Data Engineer** — broader pipeline ownership, more architectural decisions, mentoring juniors

**Analytics Engineer** — overlap with DE but deeper on dbt, modeled data products, business semantics

**ML Platform Engineer** — bridges DE and ML engineering, owns feature stores, model serving infrastructure

**Data Platform Engineer** — owns the underlying platform (warehouse selection, catalog, orchestration), often a higher-impact role at scale

**Cloud Solutions Architect** — pivots from DE specialist to multi-discipline cloud architect

**Specialist verticals** — healthcare data engineer, fintech DE, gaming DE — domain knowledge plus DE skills pays well

## Closing: AWS-first vs cloud-agnostic career strategy

A strategic question worth thinking about: should you specialize in AWS or build cloud-agnostic skills?

**Pure AWS specialization** wins when:
- You're targeting AWS-committed enterprises (large healthcare, financial services, government)
- You want a clear, well-paid niche with predictable demand
- You're early career and need a focused identity

**Cloud-agnostic generalist** wins when:
- You want to be senior at a company-of-the-future that picks platforms based on workload
- You're at year 3-5+ and want to broaden
- The vendor consolidation through 2030 makes single-vendor expertise riskier

The honest 2026 answer: start AWS-specialized for a clear identity, broaden by year 3 to include at least one of GCP or Azure, dbt fluency, and at least one general open-source compute framework (Spark or Flink). The candidates who do best long-term are AWS-fluent generalists, not AWS-only specialists.

The DEA-C01 cert and a strong portfolio gets you in the door. Year 2-5 of deliberate skill building gets you to senior. The data engineer market in 2026 is solid; the path is clear if you follow it.

### Further Reading

* [Become a Data Engineer in 2026](/how-to-become-a-data-engineer-in-2023/)
* [Navigating the Data Engineer Roadmap](/navigating-the-data-engineer-roadmap-2023-the-skills-and-trends-you-need-to-know/)
* [Charting a Course: The Azure Data Engineer Roadmap 2026](/charting-a-course-to-success-the-azure-data-engineer-roadmap-2023/)
* [Data Engineer vs Data Scientist](/data-engineer-vs-data-scientist-what-are-the-differences/)
* [Data Engineer Interview Preparation](/data-engineer-interview-preparation/)
* [Top 10 Data Engineer Interview Questions](/top-10-data-engineer-interview-questions/)
* [Mastering Data Engineering ETL Processes](/mastering-data-engineering-etl-processes-guide/)
* [Mastering Data Engineering for Streaming Data](/mastering-data-engineering-for-streaming-data/)
* [Creating a Data Pipeline: A Step-by-Step Guide](/creating-a-data-pipeline-a-step-by-step-guide/)
* [A Guide to What Is Azure Data Factory](/a-guide-to-what-is-azure-data-factory/)

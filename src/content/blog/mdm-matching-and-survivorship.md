---
title: "The MDM Duo: Matching and Survivorship - Taming the Chaos of Duplicate Data"
description: "Duplicate data wreaking havoc? Master the art of matching and survivorship to create a single source of truth with your Master Data Management."
pubDate: 2024-02-08T17:29:56.000Z
wpSlug: "mdm-matching-and-survivorship"
categories: ["Data Governance"]
tags: ["Data Management", "Duplicate data wreaking havoc? Master the art of matching and survivorship to create a single source of truth with your Master Data Management.", "Matching", "MDM", "Survivorship"]
draft: false
image: /2024/02/mdm-matching-and-survivorship.webp
imageAlt: "mdm matching and survivorship"
ogImage: /og/2024/02/mdm-matching-and-survivorship.jpg
---

Imagine a room overflowing with books, each with the same title but different content. Frustrating, right? That's what happens when your data lacks **Master [what is data governance](/what-is-data-governance-and-why-do-we-need-it/) (MDM)**. Duplicate records, like those mismatched books, create chaos and confusion. But fear not, MDM warriors! We have two powerful weapons in our arsenal: **matching** and **survivorship**.

**Matching: Finding the Twins in the Crowd**

Think of matching as the detective work of MDM. It meticulously scours [data from diverse sources,](/mastering-data-management-with-open-source-mdm-tools/) hunting down potential duplicates. Using fuzzy logic, it assesses names, addresses, and other attributes, identifying records that likely represent the same entity (like our book titles). This process is crucial for creating a **single, authoritative source** of truth.

But matching isn't perfect. Sometimes, records are so similar it's hard to decide if they're truly duplicates. This is where **survivorship** steps in.

**Survivorship: Choosing the Champion Record**

Once matching identifies potential duplicates, survivorship determines which version survives to become the "golden record." This involves setting predefined [rules based on data](/the-80-20-rule-and-enterprise-data-governance/) quality, lineage, or user-defined criteria. Think of it like a competition, where the record with the most complete information, reliable source, or recent update wins the crown.

Here are some common survivorship strategies:

* **Lineage-based:** prioritize records from trusted or higher-priority source systems.
* **Completeness-based:** choose the record with the most filled-in fields and accurate data.
* **Date-based:** select the record with the most recent update.
* **User-defined:** create custom rules based on specific business needs.

**The Dynamic Duo in Action:**

Matching and survivorship work hand-in-hand. Matching reveals the hidden duplicates, while survivorship ensures the "golden record" is the most accurate and valuable representation of an entity. This leads to numerous benefits:

* **Improved data quality:** Eliminating duplicates increases data consistency and accuracy.
* **Enhanced analytics:** Clean data leads to better insights and informed decision-making.
* **Streamlined operations:** Consistent data across systems facilitates smoother workflows.
* **Reduced costs:** Managing one record is cheaper than maintaining multiple duplicates.

**Remember:** Matching and survivorship are powerful tools, but they require careful configuration and ongoing review. Define clear rules, monitor accuracy, and adapt as your [data evolves](/uncovering-the-evolving-landscape-of-data-governance-opportunities-and-challenges/). With these MDM champions by your side, you can banish [data chaos and create a single source](/mastering-data-management-with-open-source-mdm-tools/) of truth for your organization.

### Further Reading

* [MDM strategy](/how-to-create-efficient-master-data-management-workflows-and-approvals/)
* [MDM strategy](/understanding-the-golden-record-in-master-data-management/)
* [MDM health check](/mdm-good-enough-checklist/)
* [MDM Best Practices for Enterprise Data Management](/mdm-best-practices-for-enterprise-data-management/)
* [MDM strategy](/understanding-data-lifecycle-master-data-management-mdm/)

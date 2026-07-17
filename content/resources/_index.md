+++
archetype = "page"
title = "Resources"
weight = 4
+++

# Resources

Security work rarely starts with a blank page. We rely on models, documentation, shared research, public datasets and the work of people who have already investigated similar problems.

This is a curated collection of resources I return to when investigating suspicious activity, designing defensive capabilities, developing detections or trying to understand how an adversary technique works.

It is intentionally not a complete list. A resource is included because I find it useful, not merely because it exists.

> External rules, indicators and attack mappings should be treated as research material. They still need to be understood, tested and adapted to your own environment.

## Models and frameworks

### [MITRE ATT&CK](https://attack.mitre.org/)

A structured knowledge base of adversary tactics and techniques based on real-world observations.

**Use it when:** describing adversary behaviour, structuring threat intelligence, scoping a hunt or communicating what a detection is intended to identify.

**Keep in mind:** ATT&CK is a common language, not a security checklist. Colouring a large number of techniques green does not prove that an organisation can detect or respond to them effectively.

### [MITRE ATT&CK Navigator](https://mitre-attack.github.io/attack-navigator/)

A browser-based tool for annotating and comparing ATT&CK matrices.

**Use it when:** visualising technique coverage, comparing threat actors, planning an assessment or communicating priorities.

**Keep in mind:** a heatmap can show what has been mapped. It cannot demonstrate that the underlying controls work.

### [MITRE D3FEND](https://d3fend.mitre.org/)

A knowledge graph describing defensive techniques and their relationships to adversary behaviour and digital artefacts.

**Use it when:** exploring how a defensive capability works or looking for countermeasure concepts related to a particular ATT&CK technique.

**Keep in mind:** D3FEND describes defensive techniques. It does not automatically tell you which control is appropriate for your environment.

### [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

A high-level framework for organising and communicating cybersecurity risk and desired security outcomes.

**Use it when:** connecting technical security work with governance, risk, business priorities and organisational responsibility.

**Keep in mind:** the framework describes outcomes rather than prescribing an implementation. The difficult part is deciding what those outcomes mean in your own organisation.

## Investigation references

### [LOLBAS](https://lolbas-project.github.io/)

A catalogue of legitimate Windows binaries, scripts and libraries that can be abused for execution, persistence, discovery, defence evasion and other purposes.

**Use it when:** a familiar Windows component appears in an unfamiliar context.

**Keep in mind:** the presence of a listed binary is not evidence of compromise. Parent process, command line, user context, destination and surrounding activity still matter.

### [GTFOBins](https://gtfobins.org/)

A collection of legitimate Unix and Linux executables that may be abused to bypass local restrictions, access files, transfer data, execute commands or escalate privileges.

**Use it when:** investigating unusual use of standard utilities on a Unix-like system.

**Keep in mind:** most listed commands also have legitimate administrative uses. Context remains more important than the executable name.

### [HijackLibs](https://hijacklibs.net/)

A searchable collection of publicly documented DLL hijacking and side-loading opportunities.

**Use it when:** investigating unexpected DLL loads, suspicious application directories or trusted executables loading code from unusual locations.

**Keep in mind:** a matching executable and DLL pair is a lead, not a verdict. Validate the actual path, signer, hash, process ancestry and expected application behaviour.

### [Sysmon documentation](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon)

Microsoft's reference for Sysmon configuration and event data.

**Use it when:** designing Windows telemetry, interpreting Sysmon events or determining whether the information required by a detection is available.

**Keep in mind:** collecting everything is not the same as gaining visibility. Configuration, filtering, retention and correlation determine whether the telemetry is useful.

### [CyberChef](https://gchq.github.io/CyberChef/)

A browser-based collection of operations for decoding, transforming and inspecting data.

**Use it when:** working with encodings, hashes, timestamps, compressed data, byte sequences, certificates or unfamiliar text formats.

**Keep in mind:** do not paste sensitive organisational data into an externally hosted instance. Run a local copy when the material cannot leave your environment.

## Query and telemetry references

### [Kusto Query Language documentation](https://learn.microsoft.com/en-us/kusto/)

Microsoft's documentation for Kusto Query Language, used across services including Microsoft Sentinel, Defender XDR, Azure Monitor and Azure Data Explorer.

**Use it when:** building investigations, hunts, detections or reusable analytics against Microsoft security telemetry.

**Start here:** [KQL quick reference](https://learn.microsoft.com/en-us/kusto/query/kql-quick-reference)

**Keep in mind:** a query can be syntactically correct and still answer the wrong question. Understand the schema, data source, ingestion path and retention before trusting the result.

### [Microsoft Defender XDR Advanced Hunting](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-overview)

Documentation for investigating endpoint, identity, email, application and cloud activity through the Defender XDR hunting schema.

**Use it when:** pivoting between entities, reconstructing activity or testing behavioural hypotheses across Microsoft security products.

**Keep in mind:** table availability and field population depend on licensing, integration, configuration and the products deployed in the environment.

### [Microsoft Sentinel content repository](https://github.com/Azure/Azure-Sentinel)

Microsoft's public repository of Sentinel analytics, hunting queries, workbooks, parsers, playbooks and solution content.

**Use it when:** looking for implementation examples or understanding how Microsoft and community contributors approach a particular data source or behaviour.

**Keep in mind:** repository content is a starting point. Review assumptions, dependencies, data mappings and false-positive handling before deployment.

## Detection engineering

### [Sigma](https://sigmahq.io/)

An open and structured format for describing log-based detection logic.

**Use it when:** documenting detections independently of a specific SIEM, sharing detection ideas or studying how observable behaviour can be expressed as logic.

**Keep in mind:** conversion does not remove the need for engineering. Field mappings, normalisation, backend semantics and environmental tuning can materially change the result.

### [Sigma rule repository](https://github.com/SigmaHQ/sigma)

The main community repository for Sigma detection rules.

**Use it when:** researching existing approaches to detecting a technique, tool or behaviour.

**Keep in mind:** do not import the repository blindly. Read the rule, inspect its data assumptions, verify the references and test it against both malicious and legitimate activity.

### [Splunk Security Content](https://research.splunk.com/)

A public collection of Splunk detections, analytic stories, data-source descriptions, attack data and response content.

**Use it when:** studying complete detection examples, including required telemetry, implementation logic, investigation guidance and validation material.

**Keep in mind:** even high-quality vendor content reflects particular schemas and assumptions. Translate the idea, not merely the query.

### [Elastic Detection Rules](https://github.com/elastic/detection-rules)

The public repository used to develop, test and maintain detection rules for Elastic Security.

**Use it when:** examining detection-as-code practices, rule testing, behavioural analytics and production rule structure.

**Keep in mind:** some content is closely tied to Elastic Common Schema and the Elastic detection engine. Focus on the behaviour and data requirements before adapting it elsewhere.

## Validation and adversary emulation

### [Atomic Red Team](https://www.atomicredteam.io/)

A library of focused tests that emulate individual adversary techniques.

**Use it when:** checking whether an action produces the expected telemetry, validating a detection or demonstrating a visibility gap.

**Keep in mind:** an atomic test confirms that a particular test action was observed or detected. It does not prove complete coverage of the corresponding ATT&CK technique.

### [Stratus Red Team](https://stratus-red-team.cloud/)

A collection of focused adversary-emulation tests for cloud platforms and Kubernetes.

**Use it when:** validating cloud detections against controlled actions in a dedicated test environment.

**Keep in mind:** run it only in authorised sandbox environments. Cloud actions can modify or remove resources and may generate costs.

> Adversary-emulation tools should only be used in systems where you have explicit authorisation. Understand each test and its cleanup procedure before execution.

## Threat intelligence and vulnerability context

### [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

A catalogue of vulnerabilities for which there is evidence of exploitation in the wild.

**Use it when:** adding exploitation context to vulnerability prioritisation or identifying exposed technologies that deserve immediate investigation.

**Keep in mind:** absence from the catalogue does not mean that a vulnerability is safe or unexploited. KEV should influence prioritisation, not replace risk assessment.

### [MalwareBazaar](https://bazaar.abuse.ch/)

A community platform for sharing and researching malware samples.

**Use it when:** searching by hash, malware family or sample metadata, or when obtaining material for controlled malware research.

**Keep in mind:** malware samples are dangerous. Handle them only in isolated environments with appropriate controls, and verify that your intended use complies with the service terms.

### [URLhaus](https://urlhaus.abuse.ch/)

A community platform that tracks URLs used to distribute malware.

**Use it when:** enriching a suspicious URL, researching malware-delivery infrastructure or obtaining data for controlled analysis.

**Keep in mind:** an indicator represents an observation at a point in time. Infrastructure changes, domains are repurposed and legitimate services may be abused.

### [ThreatFox](https://threatfox.abuse.ch/)

A community platform for sharing indicators associated with malware and command-and-control infrastructure.

**Use it when:** enriching an indicator, identifying related malware context or exploring recently reported infrastructure.

**Keep in mind:** an indicator without context has limited value. Validate timestamps, confidence, indicator type and relevance to your environment before acting on it.

## Public security datasets

### [Security Datasets](https://securitydatasets.com/)

An open collection of malicious and benign datasets produced through documented adversary simulations and research scenarios.

**Use it when:** developing queries, reproducing investigations, teaching analysis or testing detection logic without requiring access to production telemetry.

**Keep in mind:** datasets represent specific tools, environments and execution paths. A query that works against one dataset may not generalise to other systems or telemetry pipelines.

## Inclusion criteria

I keep this collection deliberately small. Resources are included when they meet most of the following criteria:

* they solve a practical problem;
* they expose enough detail to be independently evaluated;
* they are useful beyond a single product demonstration;
* they help explain behaviour rather than merely attach a label to it;
* they can support investigation, detection, validation or defensive design;
* and I would be comfortable recommending them to another practitioner.

No external resource should be treated as authoritative simply because it appears on this page. Understand what it contains, when it was updated, what assumptions it makes and whether those assumptions hold in your environment.
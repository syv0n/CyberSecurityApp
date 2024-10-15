
DROP TABLE IF EXISTS `detect`;
CREATE TABLE `detect` (
  `Category` varchar(1000) DEFAULT NULL,
  `Subcategory` varchar(1000) DEFAULT NULL,
  `Foundational_Objective` varchar(1000) DEFAULT NULL,
  `Maturity_Level` varchar(2000) DEFAULT NULL,
  `Information_Source` varchar(1000) DEFAULT NULL,
  `Score` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `detect` WRITE;
INSERT INTO `detect` VALUES 
('Anomalies and Events (DE.AE)', 'DE.AE-3', 'Enterprise specific event correlation and evaluation capability', '0 - No auditing policy. 1 - Policy addresses event/log collection. 2 - Siloed event/log review. 3 - Centralized log review and correlation. 3.5 - Risk-informed event correlation. 4 - Incident metadata shared with Cal-CSIC.', '0 - OIS Audits or Cal-CSIRS Risk Reporting Tool, 1 - OIS Audits or Cal-CSIRS Risk Reporting Tool, 2 - OIS Audits, 3 - OIS Audits, 3.5 - OIS Audits, 4 - Office of Emergency Services: Cal-CSIC', 0),
('Monitoring (DE.CM)', 'DE.CM-1', 'Exposure and Intrusion detection and prevention capability', '0 - No network defense architecture. 1 - Documented network defense architecture. 2 - Network alerts tied to incident management. 2.5 - Cal-CSIRS accounts setup. 3 - Documented firewall/IDS/IPS procedures. 4 - Penetration test results documented.', '0 - OIS Audits, 1 - OIS Audits, 2 | 2.5 - OIS Audits or Cal-CSIRS Risk Reporting Tool, 3 - OIS Audits, 4 - California Department of Military (CMD), Independent Security Assessment (ISA)', 0),
('Monitoring (DE.CM)', 'DE.CM-4', 'Comprehensive platform-specific anti-malware approach', '0 - No network defense architecture. 0.5 - Documented network defense architecture. 1 - Endpoint anti-malware (< 75% coverage). 2 - Centralized anti-malware (75-95% coverage). 3 - Endpoint anti-malware (> 95% coverage). 4 - Next-Gen Anti-Virus (> 95% coverage).', '0 | 0.5 - Inherits score from DE.CM-1, 1 - CMD, ISA, 2 - CMD, ISA, 3 - CMD, ISA, 4 - CMD, ISA', 0),
('Monitoring (DE.CM)', 'DE.CM-8', 'Comprehensive vulnerability identification program including periodic and pre-production vulnerability scans for platforms and applications', 'Pulled from ID.RA-1', '0', 0),
('Detection Processes (DE.DP)', 'DE.DP-1, DE.DP-3, DE.DP-4', 'Exposure and Intrusion detection and prevention capability', '0 - No defined roles or communication plans. 1 - Defined roles and communication plans. 2 - Documented escalation criteria. 3 - Tabletop exercises or documented incident handling. 4 - Event metadata shared with Cal-CSIC.', '0 - OIS Audits, 1 - OIS Audits, 2 - OIS Audits, 3 - OIS Audits, 4 - Office of Emergency Services: Cal-CSIC', 0);

UNLOCK TABLES;

DROP TABLE IF EXISTS `identify`;

CREATE TABLE `identify` (
  `Category` varchar(1000) DEFAULT NULL,
  `Subcategory` varchar(1000) DEFAULT NULL,
  `OIS Foundational Objective` varchar(1000) DEFAULT NULL,
  `Maturity Level` varchar(2000) DEFAULT NULL,
  `Information Source` varchar(1000) DEFAULT NULL,
  `Score` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `identify` WRITE;

INSERT INTO `identify`  VALUES
('Asset Management (ID.AM)', 'ID.AM-1', '', '0 - No policy for device inventory. 1 - Policy published. 2 - Procedures in place. 3 - Inventory accuracy (3.0 = 50%, 3.1 = 55%... 3.9 = 95%). 4 - Automated inventory tool.', '0 - OIS Audits, 1 - OIS Audits, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits', 0),
('Asset Management (ID.AM)', 'ID.AM-2', 'Application Inventory Management', '0 - No policy for software/app inventory. 1 - Policy published. 2 - Inventory accuracy (2.0 = 45%, 2.1 = 50%... 2.9 = 95%). 3 - App blacklisting/whitelisting on primary platform. 4 - App blacklisting/whitelisting enterprise-wide.', '0 - OIS Audits or Cal-CSIRS Risk Reporting, 1 - OIS Audits or Cal-CSIRS Risk Reporting, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits', 0),
('Business Environment (ID.BE)', 'ID.BE-5', 'Business Impact Assessment', '0 - No BIA or TRP. 1 - BIA conducted. 2 - TRP informed by BIA. 3 - TRP includes all critical systems. 4 - TRP tested with documented lessons learned.', '0 - OIS - Security Risk Governance, 1 - OIS - Security Risk Governance, 2 - OIS - Security Risk Governance, 3 - OIS - Security Risk Governance, 4 - OIS Audits', 0),
('Governance (ID.GV)', 'ID.GV-1a', 'Data Privacy Program and Enforcement', '0 - No policy for PTAs/PIAs. 1 - Policy for PTAs/PIAs. 2 - PTAs/PIAs performed, findings mitigated. 3 - Findings integrated into risk management. 4 - Policy reviewed annually.', '0 - OIS - Security Risk Governance, 1 - OIS Audits, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits', 0),
('Governance (ID.GV)', 'ID.GV-1b', 'Data Privacy Program and Enforcement', '0 - No online privacy statement. 1 - Privacy statement on website. 2 - Statement meets SIMM 5310-A. 3 - Statement approved by CPO. 4 - Policy for annual review of statement.', '0 - OIS Audits, 1 - OIS Audits, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits', 0),
('Governance (ID.GV)', 'ID.GV-4', 'Comprehensive security policy structure, Risk acceptance', '0 - No security program plan or risk management policy. 1 - Security program plan and risk management strategy. 2 - Governing body meets quarterly on risk. 3 - Program effectiveness measured with KPIs. 4 - Program improved based on KPIs.', '0 - OIS Audits or Cal-CSIRS Risk Reporting, 1 - OIS Audits or Cal-CSIRS Risk Reporting, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits', 0),
('Governance (ID.GV)', 'ID.GV-2', 'Awareness training program', '0 - No awareness training. 1 - Security and privacy training. 2 - Training meets SAM 5320. 3 - 10.01-15% phishing success. 4 - < 10% phishing success.', '0 - OIS Audits or Cal-CSIRS Risk Reporting, 1 - OIS Audits or Cal-CSIRS Risk Reporting, 2 - OIS Audits, 3 - CMD, ISA, 4 - CMD, ISA', 0),
('Risk Assessment (ID.RA)', 'ID.RA-1', 'Comprehensive vulnerability identification program including periodic and pre-production vulnerability scans for platforms and applications', '0 - No vulnerability management program. 1 - Program documented. 2 - Authenticated scan results available. 3 - Moderate CCVM score. 4 - Low CCVM score.', '0 - OIS Audits, 1 - OIS Audits, 2 - CMD, ISA, 3 - CMD, ISA, 4 - CMD, ISA', 0);

UNLOCK TABLES;

DROP TABLE IF EXISTS `recovery`;

CREATE TABLE `recovery` (
  `Category` varchar(1000) DEFAULT NULL,
  `Subcategory` varchar(1000) DEFAULT NULL,
  `OIS_Foundational_Objective` varchar(1000) DEFAULT NULL,
  `Maturity_Level` varchar(2000) DEFAULT NULL,
  `Information_Source` varchar(1000) DEFAULT NULL,
  `Score` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `recovery` WRITE;

INSERT INTO `recovery`  VALUES
('Recovery Planning (RC.RP)', 'RC.RP-1, ID.BE-5', 'Comprehensive DRP Testing', 'Inherits score of 4 from ID.BE-5 if criteria met, otherwise score is 0.', 'ID.BE-5: 0 or 4', 0)

UNLOCK TABLES;

DROP TABLE IF EXISTS `respond`;

CREATE TABLE `respond` (
  `Category` text,
  `Subcatagory` text,
  `OIS Foundational Objective` text,
  `Maturity Level` text,
  `Information Source` text,
  `Score` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `respond` WRITE;

INSERT INTO `respond`  VALUES
('Response Planning (RS.RP)', 'RS.RP-1, RS.CO-1, RS.CO-2', 'Comprehensive incident response and management plan', '0 - No incident response plan. 1 - Plan documented, incidents reported via Cal-CSIRS. 2 - Staff trained on plan. 3 - Lessons learned incorporated into plan. 4 - Users identify threats, notify team, and prevent lateral movement.', '0 - OIS Audits or Cal-CSIRS Risk Reporting, 1 - OIS Audits or Cal-CSIRS Risk Reporting, 2 - OIS Audits, 3 - OIS Audits, 4 - CMD, ISA', 0),
('Analysis (RS.AN)', 'RS.AN-1', 'Comprehensive incident response and management plan', '0 - No incident response policy. 1 - Policy exists. 2 - Procedure to track all security events. 3 - Documented investigations with reports. 4 - Trend analysis conducted on incidents.', '0 - OIS Audits, 1 - OIS Audits, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits', 0);
/*!40000 ALTER TABLE `respond` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `protect`;
CREATE TABLE `protect` (
  `Category` varchar(1000) DEFAULT NULL,
  `Subcategory` varchar(1000) DEFAULT NULL,
  `Foundational_Objective` varchar(1000) DEFAULT NULL,
  `Maturity_Level` varchar(2000) DEFAULT NULL,
  `Information_Source` varchar(1000) DEFAULT NULL,
  `Score` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `protect` WRITE;
INSERT INTO `protect`  VALUES
('Access Control (PR.AC)', 'PR.AC-1', 'Comprehensive, documented enterprise access management and provisioning strategy', '0 - No identity/user management policy. 1 - Policy published. 2 - Procedures documented. 3 - Logical password management implemented. 3.25 - No default credentials on external systems. 3.5 - Role-based access control enforced. 3.75 - Workflow automation for account management. 4 - Privileged accounts protected.', '0 - OIS Audits or Cal-CSIRS Risk Reporting, 1 - OIS Audits or Cal-CSIRS Risk Reporting, 2 - OIS Audits or Cal-CSIRS Risk Reporting, 3 - 3.5 CMD, ISA, 3.75 - OIS Audits, 4 - CMD, ISA', 0),
('Access Control (PR.AC)', 'PR.AC-2', 'Physical security policy enforcement for data center and remote sites', '0 - No physical security policy. 1 - Policy published. 2 - Procedures documented. 3 - Adherence to policy demonstrated. 4 - Semi-annual social engineering tests conducted.', '0 - OIS Audits or Cal-CSIRS Risk Reporting, 1 - OIS Audits or Cal-CSIRS Risk Reporting, 2 - OIS Audits or Cal-CSIRS Risk Reporting, 3 - OIS Audits, 4 - OIS Audits', 0),
('Access Control (PR.AC)', 'PR.AC-3', 'Comprehensive, documented enterprise access management and provisioning strategy', '0 - No remote access policy. 1 - Policy published. 2 - Procedures documented. 3 - MFA required for remote access. 4 - Anomalous remote access activity detected.', '0 - OIS Audits or Cal-CSIRS Risk Reporting, 1 - OIS Audits or Cal-CSIRS Risk Reporting, 2 - OIS Audits, 3 - CMD, ISA, 4 - OIS Audits', 0),
('Access Control (PR.AC)', 'PR.AC-5', 'Technical enforcement of security layers and Data center separation', '0 - No network segmentation or risk assessment. 1 - Network segmentation practiced. 2 - DMZ leveraged. 2.5 - Network segmentation but not risk-informed. 3 - Risk-informed network design. 4 - Secure external firewall.', '0 - OIS Audits, 1 - CMD, ISA, 2 - OIS Audits, 3 - OIS Audits, 4 - CMD, ISA', 0),
('Awareness and Training (PR.AT)', 'PR.AT-1, PR.AT-2', 'Awareness training program', '0 - No awareness training policy. 1 - Policy published. 2 - Evidence of training. 3 - At least 80% of users trained. 4 - Training within 30 days of onboarding.', '0 - OIS Audits or Cal-CSIRS Risk Reporting, 1 - OIS Audits or Cal-CSIRS Risk Reporting, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits', 0),
('Data Security (PR.DS)', 'PR.DS-1a', 'Protecting confidential and sensitive data', '0 - No encryption policy for mobile devices. 1 - Policy published. 2 - Key management process documented. 3 - Manual encryption process. 4 - Automated encryption.', '0 - OIS Audits, 1 - OIS Audits, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits', 0),
('Data Security (PR.DS)', 'PR.DS-1b', 'Protecting confidential and sensitive data', '0 - No encryption policy for databases/non-mobile assets. 1 - Policy published. 2 - Data inventory documented. 3 - Data encrypted. 4 - Key management process documented.', '0 - OIS Audits, 1 - OIS Audits, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits', 0),
('Data Security (PR.DS)', 'PR.DS-2', '', '0 - No encryption policy for data-in-transit. 1 - Policy published. 2 - Internet-facing apps encrypted. 3 - Internal network encrypted. 3.5 - No deprecated encryption standards. 4 - Break and inspect point for encrypted traffic.', '0 - OIS Audits, 1 - OIS Audits, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits or CMD', 0),
('Information Protection Processes and Procedures (PR.IP)', 'PR.IP-1', 'Platform-Specific Build Standards and Procedures', '0 - No configuration baseline policy. 1 - Policy published. 2 - Configuration baselines documented. 3 - Baselines implemented (50.01-74.99% compliance). 4 - Baselines implemented (> 75% compliance).', '0 - OIS Audits, 1 - OIS Audits, 2 - OIS Audits, 3 - CMD, ISA, 4 - CMD, ISA', 0),
('Information Protection Processes and Procedures (PR.IP)', 'PR.IP-3', 'Comprehensive enterprise change management process, workflow, and database', '0 - No change control policy. 1 - Policy published. 2 - Formalized change control process. 3 - Documented rollback and impact analysis. 4 - Automated workflow tool.', '0 - OIS Audits or Cal-CSIRS Risk Reporting, 1 - OIS Audits or Cal-CSIRS Risk Reporting, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits', 0),
('Information Protection Processes and Procedures (PR.IP)', 'PR.IP-5', 'Physical security policy enforcement for data center and remote sites', '0 - No physical/environmental controls policy. 1 - Policy published. 2 - Procedures published. 3 - Automated control alerts. 4 - Documented assessment.', '0 - OIS Audits or Cal-CSIRS Risk Reporting, 1 - OIS Audits or Cal-CSIRS Risk Reporting, 2 - OIS Audits, 3 - OIS Audits, 4 - OIS Audits', 0),
('Information Protection Processes and Procedures (PR.IP)', 'PR.IP-9', 'Comprehensive incident response and management plan', 'Pulled in from Respond function.', 'RS.RP-1, RS.CO-1, RS.CO-2', 0),
('Information Protection Processes and Procedures (PR.IP)', 'PR.IP-10', 'Comprehensive DRP Testing', 'Pulled in from Recover function.', 'ID.BE-5: 0 or 4', 0),
('Information Protection Processes and Procedures (PR.IP)', 'PR.IP-12', 'Comprehensive vulnerability identification program including periodic and pre-production vulnerability scans for platforms and applications', 'Pulled in from Identify Function.', 'ID.RA-1', 0);UNLOCK TABLES;

CREATE TABLE `score_history` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `component` varchar(100) NOT NULL,
  `category` varchar(1000) NOT NULL,
  `subcategory` varchar(1000) NOT NULL,
  `score` JSON NOT NULL,
  `final_score` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `assessment_score_history` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `assessment_score` decimal(5,2) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


select * from assessment_score_history 
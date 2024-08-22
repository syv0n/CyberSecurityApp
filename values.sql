INSERT INTO Components (name) VALUES ('Identify'), ('Protect'), ('Detect'), ('Respond'), ('Recover');

INSERT INTO Categories (component_id, name) VALUES
(1, 'Asset Management'),
(1, 'Business Environment'),
(1, 'Governance'),
(1, 'Risk Assessment'),
(1, 'Risk Management Strategy'),
(1, 'Supply Chain Risk Management'),
(2, 'Identity Management, Authentication and Access Control'),
(2, 'Awareness and Training'),
(2, 'Data Security'),
(2, 'Information Protection Processes and Procedures'),
(2, 'Maintenance'),
(2, 'Protective Technology'),
(3, 'Anomalies and Events'),
(3, 'Security Continuous Monitoring'),
(3, 'Detection Processes'),
(4, 'Response Planning'),
(4, 'Respond Communications'),
(4, 'Analysis'),
(4, 'Mitigation'),
(4, 'Respond Improvements'),
(5, 'Recovery Planning'),
(5, 'Recover Improvements'),
(5, 'Recover Communications');


INSERT INTO QuestionSets (user_type, user_role, name) VALUES ('CIO', NULL, 'CIO Questions');
INSERT INTO QuestionSets (user_type, user_role, name) VALUES ('ISO', NULL, 'ISO Questions');


-- Identify subcategories
INSERT INTO Subcategories (component_id, category_id, name) VALUES
(1, (SELECT id FROM Categories WHERE name = 'Asset Management'), 'ID.AM-01'),
(1, (SELECT id FROM Categories WHERE name = 'Asset Management'), 'ID.AM-02'),
(1, (SELECT id FROM Categories WHERE name = 'Asset Management'), 'ID.AM-03'),
(1, (SELECT id FROM Categories WHERE name = 'Asset Management'), 'ID.AM-04'),
(1, (SELECT id FROM Categories WHERE name = 'Asset Management'), 'ID.AM-05'),
(1, (SELECT id FROM Categories WHERE name = 'Asset Management'), 'ID.AM-06'),
(1, (SELECT id FROM Categories WHERE name = 'Business Environment'), 'ID.BE-01'),
(1, (SELECT id FROM Categories WHERE name = 'Business Environment'), 'ID.BE-02'),
(1, (SELECT id FROM Categories WHERE name = 'Business Environment'), 'ID.BE-03'),
(1, (SELECT id FROM Categories WHERE name = 'Business Environment'), 'ID.BE-04'),
(1, (SELECT id FROM Categories WHERE name = 'Business Environment'), 'ID.BE-05'),
(1, (SELECT id FROM Categories WHERE name = 'Governance'), 'ID.GV-01'),
(1, (SELECT id FROM Categories WHERE name = 'Governance'), 'ID.GV-02'),
(1, (SELECT id FROM Categories WHERE name = 'Governance'), 'ID.GV-03'),
(1, (SELECT id FROM Categories WHERE name = 'Governance'), 'ID.GV-04'),
(1, (SELECT id FROM Categories WHERE name = 'Risk Assessment'), 'ID.RA-01'),
(1, (SELECT id FROM Categories WHERE name = 'Risk Assessment'), 'ID.RA-02'),
(1, (SELECT id FROM Categories WHERE name = 'Risk Assessment'), 'ID.RA-03'),
(1, (SELECT id FROM Categories WHERE name = 'Risk Assessment'), 'ID.RA-04'),
(1, (SELECT id FROM Categories WHERE name = 'Risk Assessment'), 'ID.RA-05'),
(1, (SELECT id FROM Categories WHERE name = 'Risk Assessment'), 'ID.RA-06'),
(1, (SELECT id FROM Categories WHERE name = 'Risk Management Strategy'), 'ID.RM-01'),
(1, (SELECT id FROM Categories WHERE name = 'Risk Management Strategy'), 'ID.RM-02'),
(1, (SELECT id FROM Categories WHERE name = 'Risk Management Strategy'), 'ID.RM-03'),
(1, (SELECT id FROM Categories WHERE name = 'Supply Chain Risk Management'), 'ID.SC-01'),
(1, (SELECT id FROM Categories WHERE name = 'Supply Chain Risk Management'), 'ID.SC-02'),
(1, (SELECT id FROM Categories WHERE name = 'Supply Chain Risk Management'), 'ID.SC-03'),
(1, (SELECT id FROM Categories WHERE name = 'Supply Chain Risk Management'), 'ID.SC-04'),
(1, (SELECT id FROM Categories WHERE name = 'Supply Chain Risk Management'), 'ID.SC-05');

-- Protect subcategories
INSERT INTO Subcategories (component_id, category_id, name) VALUES
(2, (SELECT id FROM Categories WHERE name = 'Identity Management, Authentication and Access Control'), 'PR.AC-01'),
(2, (SELECT id FROM Categories WHERE name = 'Identity Management, Authentication and Access Control'), 'PR.AC-02'),
(2, (SELECT id FROM Categories WHERE name = 'Identity Management, Authentication and Access Control'), 'PR.AC-03'),
(2, (SELECT id FROM Categories WHERE name = 'Identity Management, Authentication and Access Control'), 'PR.AC-04'),
(2, (SELECT id FROM Categories WHERE name = 'Identity Management, Authentication and Access Control'), 'PR.AC-05'),
(2, (SELECT id FROM Categories WHERE name = 'Identity Management, Authentication and Access Control'), 'PR.AC-06'),
(2, (SELECT id FROM Categories WHERE name = 'Identity Management, Authentication and Access Control'), 'PR.AC-07'),
(2, (SELECT id FROM Categories WHERE name = 'Awareness and Training'), 'PR.AT-01'),
(2, (SELECT id FROM Categories WHERE name = 'Awareness and Training'), 'PR.AT-02'),
(2, (SELECT id FROM Categories WHERE name = 'Awareness and Training'), 'PR.AT-03'),
(2, (SELECT id FROM Categories WHERE name = 'Awareness and Training'), 'PR.AT-04'),
(2, (SELECT id FROM Categories WHERE name = 'Awareness and Training'), 'PR.AT-05'),
(2, (SELECT id FROM Categories WHERE name = 'Data Security'), 'PR.DS-01'),
(2, (SELECT id FROM Categories WHERE name = 'Data Security'), 'PR.DS-02'),
(2, (SELECT id FROM Categories WHERE name = 'Data Security'), 'PR.DS-03'),
(2, (SELECT id FROM Categories WHERE name = 'Data Security'), 'PR.DS-04'),
(2, (SELECT id FROM Categories WHERE name = 'Data Security'), 'PR.DS-05'),
(2, (SELECT id FROM Categories WHERE name = 'Data Security'), 'PR.DS-06'),
(2, (SELECT id FROM Categories WHERE name = 'Data Security'), 'PR.DS-07'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-01'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-02'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-03'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-04'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-05'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-06'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-07'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-08'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-09'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-10'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-11'),
(2, (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 'PR.IP-12'),
(2, (SELECT id FROM Categories WHERE name = 'Maintenance'), 'PR.MA-01'),
(2, (SELECT id FROM Categories WHERE name = 'Maintenance'), 'PR.MA-02'),
(2, (SELECT id FROM Categories WHERE name = 'Protective Technology'), 'PR.PT-01'),
(2, (SELECT id FROM Categories WHERE name = 'Protective Technology'), 'PR.PT-02'),
(2, (SELECT id FROM Categories WHERE name = 'Protective Technology'), 'PR.PT-03'),
(2, (SELECT id FROM Categories WHERE name = 'Protective Technology'), 'PR.PT-04'),
(2, (SELECT id FROM Categories WHERE name = 'Protective Technology'), 'PR.PT-05');

-- Detect subcategories
INSERT INTO Subcategories (component_id, category_id, name) VALUES
(3, (SELECT id FROM Categories WHERE name = 'Anomalies and Events'), 'DE.AE-01'),
(3, (SELECT id FROM Categories WHERE name = 'Anomalies and Events'), 'DE.AE-02'),
(3, (SELECT id FROM Categories WHERE name = 'Anomalies and Events'), 'DE.AE-03'),
(3, (SELECT id FROM Categories WHERE name = 'Anomalies and Events'), 'DE.AE-04'),
(3, (SELECT id FROM Categories WHERE name = 'Anomalies and Events'), 'DE.AE-05'),
(3, (SELECT id FROM Categories WHERE name = 'Security Continuous Monitoring'), 'DE.CM-01'),
(3, (SELECT id FROM Categories WHERE name = 'Security Continuous Monitoring'), 'DE.CM-02'),
(3, (SELECT id FROM Categories WHERE name = 'Security Continuous Monitoring'), 'DE.CM-03'),
(3, (SELECT id FROM Categories WHERE name = 'Security Continuous Monitoring'), 'DE.CM-04'),
(3, (SELECT id FROM Categories WHERE name = 'Security Continuous Monitoring'), 'DE.CM-05'),
(3, (SELECT id FROM Categories WHERE name = 'Security Continuous Monitoring'), 'DE.CM-06'),
(3, (SELECT id FROM Categories WHERE name = 'Security Continuous Monitoring'), 'DE.CM-07'),
(3, (SELECT id FROM Categories WHERE name = 'Security Continuous Monitoring'), 'DE.CM-08'),
(3, (SELECT id FROM Categories WHERE name = 'Detection Processes'), 'DE.DP-01'),
(3, (SELECT id FROM Categories WHERE name = 'Detection Processes'), 'DE.DP-02'),
(3, (SELECT id FROM Categories WHERE name = 'Detection Processes'), 'DE.DP-03'),
(3, (SELECT id FROM Categories WHERE name = 'Detection Processes'), 'DE.DP-04'),
(3, (SELECT id FROM Categories WHERE name = 'Detection Processes'), 'DE.DP-05');

-- Respond subcategories
INSERT INTO Subcategories (component_id, category_id, name) VALUES
(4, (SELECT id FROM Categories WHERE name = 'Response Planning'), 'RS.RP-01'),
(4, (SELECT id FROM Categories WHERE name = 'Respond Communications'), 'RS.CO-01'),
(4, (SELECT id FROM Categories WHERE name = 'Respond Communications'), 'RS.CO-02'),
(4, (SELECT id FROM Categories WHERE name = 'Respond Communications'), 'RS.CO-03'),
(4, (SELECT id FROM Categories WHERE name = 'Respond Communications'), 'RS.CO-04'),
(4, (SELECT id FROM Categories WHERE name = 'Respond Communications'), 'RS.CO-05'),
(4, (SELECT id FROM Categories WHERE name = 'Analysis'), 'RS.AN-01'),
(4, (SELECT id FROM Categories WHERE name = 'Analysis'), 'RS.AN-02'),
(4, (SELECT id FROM Categories WHERE name = 'Analysis'), 'RS.AN-03'),
(4, (SELECT id FROM Categories WHERE name = 'Analysis'), 'RS.AN-04'),
(4, (SELECT id FROM Categories WHERE name = 'Analysis'), 'RS.AN-05'),
(4, (SELECT id FROM Categories WHERE name = 'Mitigation'), 'RS.MI-01'),
(4, (SELECT id FROM Categories WHERE name = 'Mitigation'), 'RS.MI-02'),
(4, (SELECT id FROM Categories WHERE name = 'Mitigation'), 'RS.MI-03'),
(4, (SELECT id FROM Categories WHERE name = 'Respond Improvements'), 'RS.IM-01'),
(4, (SELECT id FROM Categories WHERE name = 'Respond Improvements'), 'RS.IM-02');

-- Recover subcategories
INSERT INTO Subcategories (component_id, category_id, name) VALUES
(5, (SELECT id FROM Categories WHERE name = 'Recovery Planning'), 'RC.RP-01'),
(5, (SELECT id FROM Categories WHERE name = 'Recover Improvements'), 'RC.IM-01'),
(5, (SELECT id FROM Categories WHERE name = 'Recover Improvements'), 'RC.IM-02'),
(5, (SELECT id FROM Categories WHERE name = 'Recover Communications'), 'RC.CO-01'),
(5, (SELECT id FROM Categories WHERE name = 'Recover Communications'), 'RC.CO-02'),
(5, (SELECT id FROM Categories WHERE name = 'Recover Communications'), 'RC.CO-03');


INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(1, 'CIO', 'To what extent has your organization identified and documented assets that support critical functions?', 
 (SELECT id FROM Subcategories WHERE name = 'ID.AM-01'), 
 (SELECT id FROM Categories WHERE name = 'Asset Management'), 
 (SELECT id FROM Components WHERE name = 'Identify'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(1, 'CIO', 'How comprehensively has your organization implemented risk assessment processes that address cybersecurity risks to operations?', 
 (SELECT id FROM Subcategories WHERE name = 'ID.RA-01'), 
 (SELECT id FROM Categories WHERE name = 'Risk Assessment'), 
 (SELECT id FROM Components WHERE name = 'Identify'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(1, 'CIO', 'To what degree has your organization implemented and maintained identity management and access control systems?', 
 (SELECT id FROM Subcategories WHERE name = 'PR.AC-01'), 
 (SELECT id FROM Categories WHERE name = 'Identity Management, Authentication and Access Control'), 
 (SELECT id FROM Components WHERE name = 'Protect'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(1, 'CIO', 'How well-established are your organization''s data security policies and procedures to protect the confidentiality, integrity, and availability of information?', 
 (SELECT id FROM Subcategories WHERE name = 'PR.DS-01'), 
 (SELECT id FROM Categories WHERE name = 'Data Security'), 
 (SELECT id FROM Components WHERE name = 'Protect'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(1, 'CIO', 'To what extent has your organization implemented continuous security monitoring to detect cybersecurity events?', 
 (SELECT id FROM Subcategories WHERE name = 'DE.CM-01'), 
 (SELECT id FROM Categories WHERE name = 'Security Continuous Monitoring'), 
 (SELECT id FROM Components WHERE name = 'Detect'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(1, 'CIO', 'How well-defined and tested are your organization''s incident response processes and procedures?', 
 (SELECT id FROM Subcategories WHERE name = 'RS.RP-01'), 
 (SELECT id FROM Categories WHERE name = 'Response Planning'), 
 (SELECT id FROM Components WHERE name = 'Respond'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(1, 'CIO', 'To what degree has your organization established and tested communication protocols for coordinating response activities with internal and external stakeholders?', 
 (SELECT id FROM Subcategories WHERE name = 'RS.CO-01'), 
 (SELECT id FROM Categories WHERE name = 'Respond Communications'), 
 (SELECT id FROM Components WHERE name = 'Respond'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(1, 'CIO', 'How comprehensive are your organization''s recovery planning processes to restore systems or assets affected by cybersecurity incidents?', 
 (SELECT id FROM Subcategories WHERE name = 'RC.RP-01'), 
 (SELECT id FROM Categories WHERE name = 'Recovery Planning'), 
 (SELECT id FROM Components WHERE name = 'Recover'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(1, 'CIO', 'To what extent does your organization conduct post-incident reviews and incorporate lessons learned into future response strategies?', 
 (SELECT id FROM Subcategories WHERE name = 'RS.IM-01'), 
 (SELECT id FROM Categories WHERE name = 'Respond Improvements'), 
 (SELECT id FROM Components WHERE name = 'Respond'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(1, 'CIO', 'How effectively does your organization manage relationships with and requirements for third-party providers and partners?', 
 (SELECT id FROM Subcategories WHERE name = 'ID.SC-01'), 
 (SELECT id FROM Categories WHERE name = 'Supply Chain Risk Management'), 
 (SELECT id FROM Components WHERE name = 'Identify'));

-- iso
-- Asset Management
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How is the inventory of all IT assets maintained and updated?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.AM-01'), 
    (SELECT id FROM Categories WHERE name = 'Asset Management'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are critical assets identified and documented?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.AM-02'), 
    (SELECT id FROM Categories WHERE name = 'Asset Management'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

-- Business Environment
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How does the organization assess its business environment for cybersecurity risks?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.BE-01'), 
    (SELECT id FROM Categories WHERE name = 'Business Environment'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

-- Governance
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Is there a governance framework for managing cybersecurity risks?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.GV-01'), 
    (SELECT id FROM Categories WHERE name = 'Governance'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

-- Risk Assessment
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are cybersecurity risks identified and documented?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.RA-01'), 
    (SELECT id FROM Categories WHERE name = 'Risk Assessment'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

-- Risk Management Strategy
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'What strategies are in place to manage identified risks?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.RM-01'), 
    (SELECT id FROM Categories WHERE name = 'Risk Management Strategy'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

-- Supply Chain Risk Management
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are third-party risks assessed and managed?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.SC-01'), 
    (SELECT id FROM Categories WHERE name = 'Supply Chain Risk Management'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

-- Identity Management, Authentication and Access Control
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How is access to sensitive systems controlled?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.AC-01'), 
    (SELECT id FROM Categories WHERE name = 'Identity Management, Authentication and Access Control'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Awareness and Training
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'What training programs are in place to enhance cybersecurity awareness?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.AT-01'), 
    (SELECT id FROM Categories WHERE name = 'Awareness and Training'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Data Security
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are data protection policies aligned with regulatory requirements?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.DS-04'), 
    (SELECT id FROM Categories WHERE name = 'Data Security'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Information Protection Processes and Procedures
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are information protection processes documented and enforced?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.IP-01'), 
    (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Maintenance
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are maintenance activities scheduled and documented?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.MA-01'), 
    (SELECT id FROM Categories WHERE name = 'Maintenance'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Protective Technology
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'What technologies are in place to protect against cybersecurity threats?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.PT-01'), 
    (SELECT id FROM Categories WHERE name = 'Protective Technology'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Anomalies and Events
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are anomalies and events detected and documented?', 
    (SELECT id FROM Subcategories WHERE name = 'DE.AE-01'), 
    (SELECT id FROM Categories WHERE name = 'Anomalies and Events'), 
    (SELECT id FROM Components WHERE name = 'Detect'));

-- Security Continuous Monitoring
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How is continuous monitoring implemented to detect security events?', 
    (SELECT id FROM Subcategories WHERE name = 'DE.CM-01'), 
    (SELECT id FROM Categories WHERE name = 'Security Continuous Monitoring'), 
    (SELECT id FROM Components WHERE name = 'Detect'));

-- Detection Processes
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'What processes are in place for detecting cybersecurity incidents?', 
    (SELECT id FROM Subcategories WHERE name = 'DE.DP-01'), 
    (SELECT id FROM Categories WHERE name = 'Detection Processes'), 
    (SELECT id FROM Components WHERE name = 'Detect'));

-- Response Planning
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How is the incident response plan developed and maintained?', 
    (SELECT id FROM Subcategories WHERE name = 'RS.RP-01'), 
    (SELECT id FROM Categories WHERE name = 'Response Planning'), 
    (SELECT id FROM Components WHERE name = 'Respond'));

-- Respond Communications
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are communication protocols established for incident response?', 
    (SELECT id FROM Subcategories WHERE name = 'RS.CO-01'), 
    (SELECT id FROM Categories WHERE name = 'Respond Communications'), 
    (SELECT id FROM Components WHERE name = 'Respond'));

-- Analysis
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are incidents analyzed to determine root causes?', 
    (SELECT id FROM Subcategories WHERE name = 'RS.AN-01'), 
    (SELECT id FROM Categories WHERE name = 'Analysis'), 
    (SELECT id FROM Components WHERE name = 'Respond'));

-- Mitigation
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'What strategies are in place to mitigate the impact of incidents?', 
    (SELECT id FROM Subcategories WHERE name = 'RS.MI-01'), 
    (SELECT id FROM Categories WHERE name = 'Mitigation'), 
    (SELECT id FROM Components WHERE name = 'Respond'));

-- Respond Improvements
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are lessons learned from incidents integrated into response plans?', 
    (SELECT id FROM Subcategories WHERE name = 'RS.IM-01'), 
    (SELECT id FROM Categories WHERE name = 'Respond Improvements'), 
    (SELECT id FROM Components WHERE name = 'Respond'));

-- Recovery Planning
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How is the recovery plan developed and maintained?', 
    (SELECT id FROM Subcategories WHERE name = 'RC.RP-01'), 
    (SELECT id FROM Categories WHERE name = 'Recovery Planning'), 
    (SELECT id FROM Components WHERE name = 'Recover'));

-- Recover Improvements
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are recovery processes improved based on past incidents?', 
    (SELECT id FROM Subcategories WHERE name = 'RC.IM-01'), 
    (SELECT id FROM Categories WHERE name = 'Recover Improvements'), 
    (SELECT id FROM Components WHERE name = 'Recover'));

-- Recover Communications
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are communication protocols established for recovery activities?', 
    (SELECT id FROM Subcategories WHERE name = 'RC.CO-01'), 
    (SELECT id FROM Categories WHERE name = 'Recover Communications'), 
    (SELECT id FROM Components WHERE name = 'Recover'));

-- Business Environment
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are business priorities and objectives aligned with cybersecurity strategies?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.BE-02'), 
    (SELECT id FROM Categories WHERE name = 'Business Environment'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How does the organization monitor changes in the business environment that may impact cybersecurity?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.BE-03'), 
    (SELECT id FROM Categories WHERE name = 'Business Environment'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

-- Governance
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Is there an executive or board-level oversight committee for information security?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.GV-03'), 
    (SELECT id FROM Categories WHERE name = 'Governance'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How is accountability for cybersecurity risks established within the organization?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.GV-04'), 
    (SELECT id FROM Categories WHERE name = 'Governance'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

-- Risk Assessment
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are risk assessments conducted regularly and documented?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.RA-03'), 
    (SELECT id FROM Categories WHERE name = 'Risk Assessment'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are risk assessment results communicated to stakeholders?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.RA-04'), 
    (SELECT id FROM Categories WHERE name = 'Risk Assessment'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

-- Risk Management Strategy
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are risk management strategies reviewed and updated regularly?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.RM-04'), 
    (SELECT id FROM Categories WHERE name = 'Risk Management Strategy'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

-- Supply Chain Risk Management
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are supply chain risks communicated to stakeholders?', 
    (SELECT id FROM Subcategories WHERE name = 'ID.SC-04'), 
    (SELECT id FROM Categories WHERE name = 'Supply Chain Risk Management'), 
    (SELECT id FROM Components WHERE name = 'Identify'));

-- Identity Management, Authentication and Access Control
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are access control policies aligned with organizational requirements?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.AC-06'), 
    (SELECT id FROM Categories WHERE name = 'Identity Management, Authentication and Access Control'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Awareness and Training
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are training effectiveness evaluations conducted regularly?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.AT-03'), 
    (SELECT id FROM Categories WHERE name = 'Awareness and Training'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Data Security
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How is data integrity ensured across all systems?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.DS-05'), 
    (SELECT id FROM Categories WHERE name = 'Data Security'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Information Protection Processes and Procedures
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are information protection procedures tested regularly?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.IP-04'), 
    (SELECT id FROM Categories WHERE name = 'Information Protection Processes and Procedures'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Maintenance
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are maintenance records maintained and reviewed?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.MA-03'), 
    (SELECT id FROM Categories WHERE name = 'Maintenance'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Protective Technology
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are protective technologies updated to address new threats?', 
    (SELECT id FROM Subcategories WHERE name = 'PR.PT-04'), 
    (SELECT id FROM Categories WHERE name = 'Protective Technology'), 
    (SELECT id FROM Components WHERE name = 'Protect'));

-- Anomalies and Events
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are anomaly detection processes reviewed and updated regularly?', 
    (SELECT id FROM Subcategories WHERE name = 'DE.AE-04'), 
    (SELECT id FROM Categories WHERE name = 'Anomalies and Events'), 
    (SELECT id FROM Components WHERE name = 'Detect'));

-- Security Continuous Monitoring
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are monitoring results communicated to relevant stakeholders?', 
    (SELECT id FROM Subcategories WHERE name = 'DE.CM-04'), 
    (SELECT id FROM Categories WHERE name = 'Security Continuous Monitoring'), 
    (SELECT id FROM Components WHERE name = 'Detect'));

-- Detection Processes
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are detection processes tested for effectiveness?', 
    (SELECT id FROM Subcategories WHERE name = 'DE.DP-04'), 
    (SELECT id FROM Categories WHERE name = 'Detection Processes'), 
    (SELECT id FROM Components WHERE name = 'Detect'));

-- Response Planning
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How are response plans communicated to stakeholders?', 
    (SELECT id FROM Subcategories WHERE name = 'RS.RP-04'), 
    (SELECT id FROM Categories WHERE name = 'Response Planning'), 
    (SELECT id FROM Components WHERE name = 'Respond'));

-- Respond Communications
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are communication plans aligned with organizational policies?', 
    (SELECT id FROM Subcategories WHERE name = 'RS.CO-04'), 
    (SELECT id FROM Categories WHERE name = 'Respond Communications'), 
    (SELECT id FROM Components WHERE name = 'Respond'));

-- Analysis
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'How is the effectiveness of analysis processes evaluated?', 
    (SELECT id FROM Subcategories WHERE name = 'RS.AN-04'), 
    (SELECT id FROM Categories WHERE name = 'Analysis'), 
    (SELECT id FROM Components WHERE name = 'Respond'));

-- Mitigation
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are mitigation strategies tested for effectiveness?', 
    (SELECT id FROM Subcategories WHERE name = 'RS.MI-04'), 
    (SELECT id FROM Categories WHERE name = 'Mitigation'), 
    (SELECT id FROM Components WHERE name = 'Respond'));

-- Respond Improvements
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are lessons learned from incidents communicated to stakeholders?', 
    (SELECT id FROM Subcategories WHERE name = 'RS.IM-03'), 
    (SELECT id FROM Categories WHERE name = 'Respond Improvements'), 
    (SELECT id FROM Components WHERE name = 'Respond'));

-- Recovery Planning
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are recovery plans tested and updated regularly?', 
    (SELECT id FROM Subcategories WHERE name = 'RC.RP-02'), 
    (SELECT id FROM Categories WHERE name = 'Recovery Planning'), 
    (SELECT id FROM Components WHERE name = 'Recover'));

-- Recover Improvements
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are improvement plans documented and reviewed?', 
    (SELECT id FROM Subcategories WHERE name = 'RC.IM-02'), 
    (SELECT id FROM Categories WHERE name = 'Recover Improvements'), 
    (SELECT id FROM Components WHERE name = 'Recover'));

-- Recover Communications
INSERT INTO Questions (set_id, user_type, question, subcategory_id, category_id, component_id) VALUES
(2, 'ISO', 'Are recovery communication plans aligned with organizational policies?', 
    (SELECT id FROM Subcategories WHERE name = 'RC.CO-02'), 
    (SELECT id FROM Categories WHERE name = 'Recover Communications'), 
    (SELECT id FROM Components WHERE name = 'Recover'));
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
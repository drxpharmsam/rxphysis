// ============================================================
// RXPHYSIS SUPER ADMIN DASHBOARD - app.js
// ============================================================

/* ========== STATE ========== */
const APP = {
  currentSection: 'dashboard',
  data: {},
  editingId: null,
  sidebarOpen: true,
  activeTab: {}
};

const SECTIONS = [
  { id: 'dashboard',     label: 'Dashboard',           icon: 'fa-gauge-high' },
  { id: 'finance',       label: 'Finance & Escrow',     icon: 'fa-indian-rupee-sign' },
  { id: 'medicines',     label: 'Medicine Master',      icon: 'fa-capsules' },
  { id: 'prescriptions', label: 'Prescriptions',        icon: 'fa-file-prescription' },
  { id: 'doctors',       label: 'Doctors',              icon: 'fa-user-doctor' },
  { id: 'pharmacies',    label: 'Pharmacies',           icon: 'fa-hospital' },
  { id: 'delivery',      label: 'Delivery',             icon: 'fa-truck' },
  { id: 'nurses',        label: 'Nurses',               icon: 'fa-user-nurse' },
  { id: 'risk',          label: 'Risk & Safety',        icon: 'fa-triangle-exclamation' },
  { id: 'analytics',     label: 'Analytics',            icon: 'fa-chart-line' },
  { id: 'inventory',     label: 'Inventory',            icon: 'fa-boxes-stacked' },
  { id: 'roles',         label: 'Roles & Permissions',  icon: 'fa-shield-halved' },
  { id: 'notifications', label: 'Notifications',        icon: 'fa-bell' },
  { id: 'documents',     label: 'Documents',            icon: 'fa-folder-open' },
  { id: 'incidents',     label: 'Incidents',            icon: 'fa-circle-exclamation' }
];

/* ========== SAMPLE DATA ========== */
function getDefaultData() {
  const now = new Date();
  const d = (offset=0) => {
    const dt = new Date(now);
    dt.setDate(dt.getDate() - offset);
    return dt.toISOString().split('T')[0];
  };

  return {
    transactions: [
      { id:'TXN001', type:'Commission', amount:1240, description:'Order #ORD-8821 commission', party:'MediPlus Pharmacy', status:'Released', date:d(0) },
      { id:'TXN002', type:'Escrow Hold', amount:3500, description:'Order #ORD-8842 escrow', party:'HealthFirst Pharmacy', status:'Held', date:d(0) },
      { id:'TXN003', type:'Pharmacy Payout', amount:18400, description:'Weekly settlement', party:'CareWell Pharmacy', status:'Released', date:d(1) },
      { id:'TXN004', type:'Refund', amount:890, description:'Cancelled order refund', party:'Patient - Ravi Kumar', status:'Refunded', date:d(1) },
      { id:'TXN005', type:'Doctor Fee', amount:500, description:'Teleconsult fee Dr. Patel', party:'Dr. Priya Patel', status:'Released', date:d(2) },
      { id:'TXN006', type:'Commission', amount:2100, description:'Order #ORD-8798 commission', party:'SwiftMeds', status:'Held', date:d(2) },
      { id:'TXN007', type:'Delivery Payout', amount:4200, description:'Weekly delivery payout', party:'QuickDrop Logistics', status:'Released', date:d(3) },
      { id:'TXN008', type:'Escrow Hold', amount:6700, description:'Order #ORD-8780 escrow', party:'AyurMed Pharmacy', status:'Held', date:d(3) },
      { id:'TXN009', type:'Refund', amount:1450, description:'ADR-related refund', party:'Patient - Meena Rao', status:'Refunded', date:d(4) },
      { id:'TXN010', type:'Commission', amount:870, description:'Order #ORD-8761 commission', party:'GenericMart', status:'Released', date:d(4) },
      { id:'TXN011', type:'Pharmacy Payout', amount:22100, description:'Bi-weekly settlement', party:'MediPlus Pharmacy', status:'Released', date:d(5) },
      { id:'TXN012', type:'Dispute', amount:3200, description:'Disputed charge - case #D-441', party:'Patient - Suresh Iyer', status:'Held', date:d(5) },
      { id:'TXN013', type:'Doctor Fee', amount:800, description:'Teleconsult fee Dr. Sharma', party:'Dr. Rajesh Sharma', status:'Released', date:d(6) },
      { id:'TXN014', type:'Commission', amount:1600, description:'Order #ORD-8712 commission', party:'HealthFirst Pharmacy', status:'Released', date:d(7) },
      { id:'TXN015', type:'Delivery Payout', amount:3100, description:'Spot incentive payout', party:'SpeedWay Delivery', status:'Released', date:d(7) },
      { id:'TXN016', type:'Escrow Hold', amount:5400, description:'Order #ORD-8690 escrow', party:'SwiftMeds', status:'Held', date:d(8) },
      { id:'TXN017', type:'Refund', amount:2200, description:'Wrong medicine refund', party:'Patient - Anjali Singh', status:'Refunded', date:d(9) },
      { id:'TXN018', type:'Commission', amount:950, description:'Order #ORD-8655 commission', party:'CareWell Pharmacy', status:'Released', date:d(10) },
      { id:'TXN019', type:'Pharmacy Payout', amount:15800, description:'Monthly settlement', party:'AyurMed Pharmacy', status:'Released', date:d(12) },
      { id:'TXN020', type:'Doctor Fee', amount:600, description:'Teleconsult fee Dr. Nair', party:'Dr. Lakshmi Nair', status:'Released', date:d(14) },
      { id:'TXN021', type:'Commission', amount:3400, description:'Order #ORD-8601 commission', party:'GenericMart', status:'Held', date:d(15) },
      { id:'TXN022', type:'Dispute', amount:1800, description:'Delivery fraud dispute #D-438', party:'Partner Vikram Singh', status:'Held', date:d(16) },
      { id:'TXN023', type:'Delivery Payout', amount:5600, description:'Monthly delivery settlement', party:'QuickDrop Logistics', status:'Released', date:d(18) },
      { id:'TXN024', type:'Refund', amount:750, description:'Out-of-stock refund', party:'Patient - Rahul Mehta', status:'Refunded', date:d(20) },
      { id:'TXN025', type:'Commission', amount:1120, description:'Order #ORD-8500 commission', party:'HealthFirst Pharmacy', status:'Released', date:d(22) }
    ],

    medicines: [
      { id:'MED001', name:'Atorvastatin', salt:'Atorvastatin Calcium', strength:'10mg', category:'Cardiovascular', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'Sun Pharma', mrp:95, generic:'Atorva-10' },
      { id:'MED002', name:'Metformin', salt:'Metformin HCl', strength:'500mg', category:'Anti-diabetic', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'Cipla', mrp:48, generic:'Glucophage' },
      { id:'MED003', name:'Amlodipine', salt:'Amlodipine Besylate', strength:'5mg', category:'Cardiovascular', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'Lupin', mrp:62, generic:'Amlong' },
      { id:'MED004', name:'Alprazolam', salt:'Alprazolam', strength:'0.5mg', category:'Psychotropic', schedule:'H1', highRisk:true, substitutionAllowed:false, tempSensitive:false, manufacturer:'Pfizer', mrp:28, generic:'Xanax' },
      { id:'MED005', name:'Codeine Phosphate', salt:'Codeine Phosphate', strength:'30mg', category:'Narcotic Analgesic', schedule:'X', highRisk:true, substitutionAllowed:false, tempSensitive:false, manufacturer:'Macleods', mrp:0, generic:'' },
      { id:'MED006', name:'Insulin Glargine', salt:'Insulin Glargine', strength:'100IU/ml', category:'Anti-diabetic', schedule:'H', highRisk:true, substitutionAllowed:false, tempSensitive:true, manufacturer:'Sanofi', mrp:1100, generic:'Toujeo' },
      { id:'MED007', name:'Amoxicillin', salt:'Amoxicillin Trihydrate', strength:'500mg', category:'Antibiotic', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'GlaxoSmithKline', mrp:85, generic:'Amoxil' },
      { id:'MED008', name:'Pantoprazole', salt:'Pantoprazole Sodium', strength:'40mg', category:'Gastro', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'Torrent', mrp:72, generic:'Pantop' },
      { id:'MED009', name:'Losartan', salt:'Losartan Potassium', strength:'50mg', category:'Cardiovascular', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'Dr. Reddy\'s', mrp:110, generic:'Losar' },
      { id:'MED010', name:'Clonazepam', salt:'Clonazepam', strength:'0.5mg', category:'Psychotropic', schedule:'H1', highRisk:true, substitutionAllowed:false, tempSensitive:false, manufacturer:'Roche', mrp:35, generic:'Rivotril' },
      { id:'MED011', name:'Paracetamol', salt:'Paracetamol', strength:'500mg', category:'Analgesic', schedule:'OTC', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'Cipla', mrp:18, generic:'Crocin' },
      { id:'MED012', name:'Levothyroxine', salt:'Levothyroxine Sodium', strength:'50mcg', category:'Thyroid', schedule:'H', highRisk:false, substitutionAllowed:false, tempSensitive:true, manufacturer:'Abbott', mrp:42, generic:'Eltroxin' },
      { id:'MED013', name:'Azithromycin', salt:'Azithromycin Dihydrate', strength:'500mg', category:'Antibiotic', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'Pfizer', mrp:95, generic:'Azee' },
      { id:'MED014', name:'Warfarin', salt:'Warfarin Sodium', strength:'5mg', category:'Anticoagulant', schedule:'H', highRisk:true, substitutionAllowed:false, tempSensitive:false, manufacturer:'Cipla', mrp:55, generic:'Warf' },
      { id:'MED015', name:'Escitalopram', salt:'Escitalopram Oxalate', strength:'10mg', category:'Antidepressant', schedule:'H1', highRisk:true, substitutionAllowed:false, tempSensitive:false, manufacturer:'Sun Pharma', mrp:88, generic:'Nexito' },
      { id:'MED016', name:'Metoprolol', salt:'Metoprolol Succinate', strength:'25mg', category:'Cardiovascular', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'Lupin', mrp:78, generic:'Betaloc' },
      { id:'MED017', name:'Cetirizine', salt:'Cetirizine HCl', strength:'10mg', category:'Antihistamine', schedule:'OTC', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'UCB', mrp:22, generic:'Zyrtec' },
      { id:'MED018', name:'Rabeprazole', salt:'Rabeprazole Sodium', strength:'20mg', category:'Gastro', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'Eisai', mrp:68, generic:'Razo' },
      { id:'MED019', name:'Morphine Sulphate', salt:'Morphine Sulphate', strength:'10mg/ml', category:'Narcotic Analgesic', schedule:'X', highRisk:true, substitutionAllowed:false, tempSensitive:true, manufacturer:'Neon Labs', mrp:0, generic:'' },
      { id:'MED020', name:'Glimepiride', salt:'Glimepiride', strength:'2mg', category:'Anti-diabetic', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'Sanofi', mrp:56, generic:'Amaryl' },
      { id:'MED021', name:'Enalapril', salt:'Enalapril Maleate', strength:'5mg', category:'Cardiovascular', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'Merck', mrp:44, generic:'Enam' },
      { id:'MED022', name:'Diazepam', salt:'Diazepam', strength:'5mg', category:'Psychotropic', schedule:'H1', highRisk:true, substitutionAllowed:false, tempSensitive:false, manufacturer:'Roche', mrp:18, generic:'Valium' },
      { id:'MED023', name:'Clopidogrel', salt:'Clopidogrel Bisulphate', strength:'75mg', category:'Antiplatelet', schedule:'H', highRisk:true, substitutionAllowed:false, tempSensitive:false, manufacturer:'Sanofi', mrp:145, generic:'Plavix' },
      { id:'MED024', name:'Omeprazole', salt:'Omeprazole', strength:'20mg', category:'Gastro', schedule:'OTC', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'AstraZeneca', mrp:38, generic:'Prilosec' },
      { id:'MED025', name:'Rosuvastatin', salt:'Rosuvastatin Calcium', strength:'10mg', category:'Cardiovascular', schedule:'H', highRisk:false, substitutionAllowed:true, tempSensitive:false, manufacturer:'AstraZeneca', mrp:128, generic:'Crestor' }
    ],

    prescriptions: [
      { id:'RX001', patient:'Ravi Kumar', doctor:'Dr. Rajesh Sharma', pharmacist:'MediPlus Pharm', date:d(0), status:'Verified', medicines:'Atorvastatin 10mg, Metoprolol 25mg', notes:'Routine refill', flagReason:'' },
      { id:'RX002', patient:'Meena Rao', doctor:'Dr. Priya Patel', pharmacist:'HealthFirst', date:d(0), status:'Pending', medicines:'Amoxicillin 500mg, Paracetamol 500mg', notes:'Fever + throat infection', flagReason:'' },
      { id:'RX003', patient:'Suresh Iyer', doctor:'Dr. Arjun Nair', pharmacist:'CareWell', date:d(1), status:'Flagged', medicines:'Alprazolam 0.5mg', notes:'Anxiety disorder', flagReason:'Schedule H1 without specialist note' },
      { id:'RX004', patient:'Anjali Singh', doctor:'Dr. Kavya Menon', pharmacist:'SwiftMeds', date:d(1), status:'Verified', medicines:'Levothyroxine 50mcg', notes:'Hypothyroidism', flagReason:'' },
      { id:'RX005', patient:'Rahul Mehta', doctor:'Dr. Sanjay Gupta', pharmacist:'AyurMed', date:d(2), status:'Verified', medicines:'Metformin 500mg, Glimepiride 2mg', notes:'T2DM management', flagReason:'' },
      { id:'RX006', patient:'Deepa Krishnan', doctor:'Dr. Priya Patel', pharmacist:'GenericMart', date:d(2), status:'Flagged', medicines:'Clonazepam 0.5mg, Alprazolam 0.5mg', notes:'Mixed anxiety', flagReason:'Multiple H1 drugs same prescription' },
      { id:'RX007', patient:'Vikram Reddy', doctor:'Dr. Anand Iyer', pharmacist:'MediPlus Pharm', date:d(3), status:'Pending', medicines:'Warfarin 5mg, Clopidogrel 75mg', notes:'Post-cardiac procedure', flagReason:'' },
      { id:'RX008', patient:'Sunita Patel', doctor:'Dr. Lakshmi Nair', pharmacist:'HealthFirst', date:d(3), status:'Verified', medicines:'Insulin Glargine 100IU/ml', notes:'T1DM, insulin-dependent', flagReason:'' },
      { id:'RX009', patient:'Mohan Das', doctor:'Dr. Rajesh Sharma', pharmacist:'CareWell', date:d(4), status:'Rejected', medicines:'Morphine 10mg', notes:'Pain management', flagReason:'Non-oncologist prescribing narcotic' },
      { id:'RX010', patient:'Kavita Shah', doctor:'Dr. Sanjay Gupta', pharmacist:'SwiftMeds', date:d(4), status:'Verified', medicines:'Escitalopram 10mg, Clonazepam 0.5mg', notes:'Depression + anxiety', flagReason:'' },
      { id:'RX011', patient:'Arun Nambiar', doctor:'Dr. Anand Iyer', pharmacist:'GenericMart', date:d(5), status:'Pending', medicines:'Azithromycin 500mg', notes:'URTI', flagReason:'' },
      { id:'RX012', patient:'Priya Venkat', doctor:'Dr. Kavya Menon', pharmacist:'AyurMed', date:d(5), status:'Verified', medicines:'Amlodipine 5mg, Enalapril 5mg', notes:'Hypertension', flagReason:'' },
      { id:'RX013', patient:'Kiran Bose', doctor:'Dr. Priya Patel', pharmacist:'MediPlus Pharm', date:d(6), status:'Flagged', medicines:'Diazepam 5mg', notes:'Acute anxiety', flagReason:'Repeated H1 prescription within 2 weeks' },
      { id:'RX014', patient:'Nandini Roy', doctor:'Dr. Arjun Nair', pharmacist:'HealthFirst', date:d(7), status:'Verified', medicines:'Rosuvastatin 10mg, Aspirin 75mg', notes:'Dyslipidemia', flagReason:'' },
      { id:'RX015', patient:'Suraj Patil', doctor:'Dr. Sanjay Gupta', pharmacist:'CareWell', date:d(7), status:'Verified', medicines:'Rabeprazole 20mg, Domperidone 10mg', notes:'GERD', flagReason:'' },
      { id:'RX016', patient:'Geeta Sharma', doctor:'Dr. Lakshmi Nair', pharmacist:'SwiftMeds', date:d(8), status:'Pending', medicines:'Insulin Glargine 100IU/ml, Metformin 500mg', notes:'T2DM uncontrolled', flagReason:'' },
      { id:'RX017', patient:'Ashok Kumar', doctor:'Dr. Rajesh Sharma', pharmacist:'GenericMart', date:d(9), status:'Verified', medicines:'Metoprolol 25mg, Amlodipine 5mg', notes:'Hypertensive heart disease', flagReason:'' },
      { id:'RX018', patient:'Pooja Mishra', doctor:'Dr. Kavya Menon', pharmacist:'AyurMed', date:d(10), status:'Verified', medicines:'Cetirizine 10mg, Montelukast 10mg', notes:'Allergic rhinitis', flagReason:'' },
      { id:'RX019', patient:'Tarun Joshi', doctor:'Dr. Anand Iyer', pharmacist:'MediPlus Pharm', date:d(11), status:'Flagged', medicines:'Codeine Phosphate 30mg', notes:'Post-surgical pain', flagReason:'Schedule X without pain specialist' },
      { id:'RX020', patient:'Lalitha Devi', doctor:'Dr. Priya Patel', pharmacist:'HealthFirst', date:d(12), status:'Verified', medicines:'Metformin 500mg, Glimepiride 2mg, Atorvastatin 10mg', notes:'T2DM + dyslipidemia', flagReason:'' },
      { id:'RX021', patient:'Ramesh Pillai', doctor:'Dr. Arjun Nair', pharmacist:'CareWell', date:d(13), status:'Rejected', medicines:'Alprazolam 0.5mg, Lorazepam 1mg', notes:'Insomnia + anxiety', flagReason:'Multiple benzodiazepines' },
      { id:'RX022', patient:'Divya Iyer', doctor:'Dr. Sanjay Gupta', pharmacist:'SwiftMeds', date:d(14), status:'Verified', medicines:'Omeprazole 20mg, Clarithromycin 500mg', notes:'H.pylori eradication', flagReason:'' },
      { id:'RX023', patient:'Hari Prakash', doctor:'Dr. Lakshmi Nair', pharmacist:'GenericMart', date:d(15), status:'Pending', medicines:'Warfarin 5mg', notes:'DVT prophylaxis', flagReason:'' },
      { id:'RX024', patient:'Sindhu Rao', doctor:'Dr. Kavya Menon', pharmacist:'AyurMed', date:d(16), status:'Verified', medicines:'Pantoprazole 40mg, Ondansetron 4mg', notes:'Post-chemo nausea', flagReason:'' },
      { id:'RX025', patient:'Vijay Narayanan', doctor:'Dr. Rajesh Sharma', pharmacist:'MediPlus Pharm', date:d(18), status:'Verified', medicines:'Clopidogrel 75mg, Aspirin 75mg, Atorvastatin 40mg', notes:'Post-MI dual antiplatelet', flagReason:'' }
    ],

    doctors: [
      { id:'DOC001', name:'Dr. Rajesh Sharma', specialty:'Cardiologist', license:'MCI-KA-12345', status:'Active', prescCount:245, licenseVerified:true, overprescribing:false, phone:'+91-9876543210', email:'rajesh.sharma@rxphysis.in', city:'Bengaluru', joinDate:d(365) },
      { id:'DOC002', name:'Dr. Priya Patel', specialty:'General Physician', license:'MCI-MH-67890', status:'Active', prescCount:312, licenseVerified:true, overprescribing:true, phone:'+91-9876543211', email:'priya.patel@rxphysis.in', city:'Mumbai', joinDate:d(300) },
      { id:'DOC003', name:'Dr. Arjun Nair', specialty:'Psychiatrist', license:'MCI-KL-11223', status:'Active', prescCount:198, licenseVerified:true, overprescribing:true, phone:'+91-9876543212', email:'arjun.nair@rxphysis.in', city:'Kochi', joinDate:d(280) },
      { id:'DOC004', name:'Dr. Kavya Menon', specialty:'Endocrinologist', license:'MCI-TN-44556', status:'Active', prescCount:167, licenseVerified:true, overprescribing:false, phone:'+91-9876543213', email:'kavya.menon@rxphysis.in', city:'Chennai', joinDate:d(240) },
      { id:'DOC005', name:'Dr. Sanjay Gupta', specialty:'Gastroenterologist', license:'MCI-DL-77889', status:'Active', prescCount:221, licenseVerified:true, overprescribing:false, phone:'+91-9876543214', email:'sanjay.gupta@rxphysis.in', city:'Delhi', joinDate:d(220) },
      { id:'DOC006', name:'Dr. Lakshmi Nair', specialty:'Diabetologist', license:'MCI-KL-99001', status:'Active', prescCount:289, licenseVerified:true, overprescribing:false, phone:'+91-9876543215', email:'lakshmi.nair@rxphysis.in', city:'Thiruvananthapuram', joinDate:d(200) },
      { id:'DOC007', name:'Dr. Anand Iyer', specialty:'Pulmonologist', license:'MCI-MH-23456', status:'Suspended', prescCount:88, licenseVerified:true, overprescribing:true, phone:'+91-9876543216', email:'anand.iyer@rxphysis.in', city:'Pune', joinDate:d(180) },
      { id:'DOC008', name:'Dr. Pooja Agarwal', specialty:'Oncologist', license:'MCI-UP-34567', status:'Active', prescCount:156, licenseVerified:true, overprescribing:false, phone:'+91-9876543217', email:'pooja.agarwal@rxphysis.in', city:'Lucknow', joinDate:d(160) },
      { id:'DOC009', name:'Dr. Kiran Reddy', specialty:'Nephrologist', license:'MCI-AP-45678', status:'Pending', prescCount:12, licenseVerified:false, overprescribing:false, phone:'+91-9876543218', email:'kiran.reddy@rxphysis.in', city:'Hyderabad', joinDate:d(30) },
      { id:'DOC010', name:'Dr. Meera Krishnan', specialty:'Rheumatologist', license:'MCI-TN-56789', status:'Active', prescCount:132, licenseVerified:true, overprescribing:false, phone:'+91-9876543219', email:'meera.krishnan@rxphysis.in', city:'Coimbatore', joinDate:d(150) },
      { id:'DOC011', name:'Dr. Suresh Bhat', specialty:'Neurologist', license:'MCI-KA-67890', status:'Active', prescCount:204, licenseVerified:true, overprescribing:false, phone:'+91-9877543210', email:'suresh.bhat@rxphysis.in', city:'Mangaluru', joinDate:d(140) },
      { id:'DOC012', name:'Dr. Asha Nambiar', specialty:'Dermatologist', license:'MCI-KL-78901', status:'Active', prescCount:178, licenseVerified:true, overprescribing:false, phone:'+91-9878543210', email:'asha.nambiar@rxphysis.in', city:'Thrissur', joinDate:d(130) },
      { id:'DOC013', name:'Dr. Vikram Joshi', specialty:'Orthopedist', license:'MCI-MH-89012', status:'Pending', prescCount:5, licenseVerified:false, overprescribing:false, phone:'+91-9879543210', email:'vikram.joshi@rxphysis.in', city:'Nashik', joinDate:d(15) },
      { id:'DOC014', name:'Dr. Radha Pillai', specialty:'Gynecologist', license:'MCI-KL-90123', status:'Active', prescCount:267, licenseVerified:true, overprescribing:false, phone:'+91-9880543210', email:'radha.pillai@rxphysis.in', city:'Kozhikode', joinDate:d(120) },
      { id:'DOC015', name:'Dr. Ajay Saxena', specialty:'General Physician', license:'MCI-UP-01234', status:'Suspended', prescCount:44, licenseVerified:true, overprescribing:true, phone:'+91-9881543210', email:'ajay.saxena@rxphysis.in', city:'Kanpur', joinDate:d(110) },
      { id:'DOC016', name:'Dr. Nidhi Verma', specialty:'Pediatrician', license:'MCI-DL-12345', status:'Active', prescCount:321, licenseVerified:true, overprescribing:false, phone:'+91-9882543210', email:'nidhi.verma@rxphysis.in', city:'Delhi', joinDate:d(100) },
      { id:'DOC017', name:'Dr. Rohit Malhotra', specialty:'Cardiologist', license:'MCI-PB-23456', status:'Active', prescCount:189, licenseVerified:true, overprescribing:false, phone:'+91-9883543210', email:'rohit.malhotra@rxphysis.in', city:'Chandigarh', joinDate:d(90) },
      { id:'DOC018', name:'Dr. Sunita Rao', specialty:'Psychiatrist', license:'MCI-AP-34567', status:'Active', prescCount:143, licenseVerified:true, overprescribing:true, phone:'+91-9884543210', email:'sunita.rao@rxphysis.in', city:'Vijayawada', joinDate:d(80) },
      { id:'DOC019', name:'Dr. Ashok Jain', specialty:'Diabetologist', license:'MCI-RJ-45678', status:'Active', prescCount:256, licenseVerified:true, overprescribing:false, phone:'+91-9885543210', email:'ashok.jain@rxphysis.in', city:'Jaipur', joinDate:d(70) },
      { id:'DOC020', name:'Dr. Preeti Sharma', specialty:'Ophthalmologist', license:'MCI-MP-56789', status:'Pending', prescCount:8, licenseVerified:false, overprescribing:false, phone:'+91-9886543210', email:'preeti.sharma@rxphysis.in', city:'Bhopal', joinDate:d(20) },
      { id:'DOC021', name:'Dr. Dinesh Kumar', specialty:'ENT Specialist', license:'MCI-GJ-67890', status:'Active', prescCount:198, licenseVerified:true, overprescribing:false, phone:'+91-9887543210', email:'dinesh.kumar@rxphysis.in', city:'Ahmedabad', joinDate:d(60) },
      { id:'DOC022', name:'Dr. Shobha Menon', specialty:'Neurologist', license:'MCI-KL-78901', status:'Active', prescCount:211, licenseVerified:true, overprescribing:false, phone:'+91-9888543210', email:'shobha.menon@rxphysis.in', city:'Palakkad', joinDate:d(50) }
    ],

    pharmacies: [
      { id:'PHA001', name:'MediPlus Pharmacy', license:'PCI-KA-2021-001', ownerName:'Ramesh Nair', status:'Active', commission:12, rating:4.8, stockStatus:'Well Stocked', city:'Bengaluru', phone:'+91-9871234501', joinDate:d(400) },
      { id:'PHA002', name:'HealthFirst Pharmacy', license:'PCI-MH-2021-002', ownerName:'Sita Devi', status:'Active', commission:11, rating:4.6, stockStatus:'Well Stocked', city:'Mumbai', phone:'+91-9871234502', joinDate:d(380) },
      { id:'PHA003', name:'CareWell Pharmacy', license:'PCI-TN-2021-003', ownerName:'Krishnaswamy', status:'Active', commission:13, rating:4.4, stockStatus:'Low Stock', city:'Chennai', phone:'+91-9871234503', joinDate:d(360) },
      { id:'PHA004', name:'SwiftMeds', license:'PCI-DL-2021-004', ownerName:'Pradeep Kumar', status:'Active', commission:10, rating:4.7, stockStatus:'Well Stocked', city:'Delhi', phone:'+91-9871234504', joinDate:d(340) },
      { id:'PHA005', name:'AyurMed Pharmacy', license:'PCI-KL-2021-005', ownerName:'Aji Pillai', status:'Suspended', commission:12, rating:3.2, stockStatus:'Out of Stock', city:'Kochi', phone:'+91-9871234505', joinDate:d(320) },
      { id:'PHA006', name:'GenericMart', license:'PCI-AP-2021-006', ownerName:'Venkatesh Rao', status:'Active', commission:14, rating:4.5, stockStatus:'Well Stocked', city:'Hyderabad', phone:'+91-9871234506', joinDate:d(300) },
      { id:'PHA007', name:'PharmaPlus Stores', license:'PCI-WB-2021-007', ownerName:'Debashish Roy', status:'Active', commission:11, rating:4.3, stockStatus:'Well Stocked', city:'Kolkata', phone:'+91-9871234507', joinDate:d(280) },
      { id:'PHA008', name:'NovaMed Dispensary', license:'PCI-GJ-2021-008', ownerName:'Hetal Shah', status:'Pending', commission:12, rating:0, stockStatus:'Unknown', city:'Ahmedabad', phone:'+91-9871234508', joinDate:d(30) },
      { id:'PHA009', name:'LifeCare Pharmacy', license:'PCI-PB-2021-009', ownerName:'Harpreet Singh', status:'Active', commission:12, rating:4.6, stockStatus:'Well Stocked', city:'Ludhiana', phone:'+91-9871234509', joinDate:d(260) },
      { id:'PHA010', name:'RxCorner', license:'PCI-RJ-2021-010', ownerName:'Mohan Lal', status:'Active', commission:13, rating:4.2, stockStatus:'Low Stock', city:'Jaipur', phone:'+91-9871234510', joinDate:d(240) },
      { id:'PHA011', name:'MegaPharma Hub', license:'PCI-UP-2021-011', ownerName:'Vikas Mishra', status:'Blacklisted', commission:0, rating:2.1, stockStatus:'Suspended', city:'Lucknow', phone:'+91-9871234511', joinDate:d(500) },
      { id:'PHA012', name:'TrueHealth Pharmacy', license:'PCI-KA-2022-012', ownerName:'Sunil Gowda', status:'Active', commission:11, rating:4.9, stockStatus:'Well Stocked', city:'Mysuru', phone:'+91-9871234512', joinDate:d(220) },
      { id:'PHA013', name:'CleanMed Outlets', license:'PCI-MH-2022-013', ownerName:'Asha Joshi', status:'Active', commission:12, rating:4.7, stockStatus:'Well Stocked', city:'Nashik', phone:'+91-9871234513', joinDate:d(200) },
      { id:'PHA014', name:'PharmaDirect', license:'PCI-TN-2022-014', ownerName:'Murugan S', status:'Pending', commission:12, rating:0, stockStatus:'Unknown', city:'Madurai', phone:'+91-9871234514', joinDate:d(25) },
      { id:'PHA015', name:'BestChoice Meds', license:'PCI-AP-2022-015', ownerName:'Ravi Teja', status:'Active', commission:10, rating:4.4, stockStatus:'Well Stocked', city:'Vijayawada', phone:'+91-9871234515', joinDate:d(180) },
      { id:'PHA016', name:'ZenMed Pharmacy', license:'PCI-KL-2022-016', ownerName:'Priya Nambiar', status:'Active', commission:13, rating:4.6, stockStatus:'Well Stocked', city:'Thrissur', phone:'+91-9871234516', joinDate:d(160) },
      { id:'PHA017', name:'QuickRx', license:'PCI-DL-2022-017', ownerName:'Rajiv Arora', status:'Active', commission:11, rating:4.3, stockStatus:'Low Stock', city:'Noida', phone:'+91-9871234517', joinDate:d(140) },
      { id:'PHA018', name:'SafeMeds Hub', license:'PCI-GJ-2022-018', ownerName:'Kiran Patel', status:'Active', commission:12, rating:4.8, stockStatus:'Well Stocked', city:'Surat', phone:'+91-9871234518', joinDate:d(120) },
      { id:'PHA019', name:'CityPharma', license:'PCI-WB-2022-019', ownerName:'Biswajit Dey', status:'Suspended', commission:12, rating:3.8, stockStatus:'Low Stock', city:'Howrah', phone:'+91-9871234519', joinDate:d(100) },
      { id:'PHA020', name:'MediCare Point', license:'PCI-MP-2022-020', ownerName:'Suresh Tiwari', status:'Active', commission:12, rating:4.5, stockStatus:'Well Stocked', city:'Indore', phone:'+91-9871234520', joinDate:d(80) }
    ],

    delivery: [
      { id:'DEL001', name:'Ramesh Yadav', status:'Active', bgvStatus:'Verified', performance:94, failedDeliveries:3, earnings:28400, city:'Bengaluru', phone:'+91-9900001001', joinDate:d(400) },
      { id:'DEL002', name:'Pradeep Singh', status:'Active', bgvStatus:'Verified', performance:88, failedDeliveries:7, earnings:22100, city:'Mumbai', phone:'+91-9900001002', joinDate:d(380) },
      { id:'DEL003', name:'Sunil Kumar', status:'Active', bgvStatus:'Pending', performance:75, failedDeliveries:12, earnings:18200, city:'Delhi', phone:'+91-9900001003', joinDate:d(200) },
      { id:'DEL004', name:'Arjun Patel', status:'Suspended', bgvStatus:'Verified', performance:45, failedDeliveries:28, earnings:9400, city:'Ahmedabad', phone:'+91-9900001004', joinDate:d(360) },
      { id:'DEL005', name:'Vijay Sharma', status:'Active', bgvStatus:'Verified', performance:97, failedDeliveries:1, earnings:34600, city:'Bengaluru', phone:'+91-9900001005', joinDate:d(500) },
      { id:'DEL006', name:'Mohan Reddy', status:'Active', bgvStatus:'Verified', performance:91, failedDeliveries:5, earnings:26800, city:'Hyderabad', phone:'+91-9900001006', joinDate:d(340) },
      { id:'DEL007', name:'Kiran Bose', status:'Active', bgvStatus:'Verified', performance:86, failedDeliveries:8, earnings:21300, city:'Kolkata', phone:'+91-9900001007', joinDate:d(300) },
      { id:'DEL008', name:'Santosh Mishra', status:'Active', bgvStatus:'Failed', performance:62, failedDeliveries:18, earnings:14200, city:'Lucknow', phone:'+91-9900001008', joinDate:d(280) },
      { id:'DEL009', name:'Deepak Nair', status:'Active', bgvStatus:'Verified', performance:93, failedDeliveries:4, earnings:29100, city:'Kochi', phone:'+91-9900001009', joinDate:d(260) },
      { id:'DEL010', name:'Ajit Rao', status:'Active', bgvStatus:'Verified', performance:79, failedDeliveries:10, earnings:19800, city:'Chennai', phone:'+91-9900001010', joinDate:d(240) },
      { id:'DEL011', name:'Ravi Menon', status:'Suspended', bgvStatus:'Verified', performance:38, failedDeliveries:35, earnings:8100, city:'Thiruvananthapuram', phone:'+91-9900001011', joinDate:d(450) },
      { id:'DEL012', name:'Manoj Tiwari', status:'Active', bgvStatus:'Verified', performance:85, failedDeliveries:9, earnings:22800, city:'Pune', phone:'+91-9900001012', joinDate:d(220) },
      { id:'DEL013', name:'Rohit Jain', status:'Active', bgvStatus:'Pending', performance:71, failedDeliveries:15, earnings:17400, city:'Jaipur', phone:'+91-9900001013', joinDate:d(150) },
      { id:'DEL014', name:'Naveen Kumar', status:'Active', bgvStatus:'Verified', performance:96, failedDeliveries:2, earnings:32100, city:'Bengaluru', phone:'+91-9900001014', joinDate:d(480) },
      { id:'DEL015', name:'Santhosh Pillai', status:'Active', bgvStatus:'Verified', performance:88, failedDeliveries:6, earnings:24500, city:'Thrissur', phone:'+91-9900001015', joinDate:d(190) },
      { id:'DEL016', name:'Tarun Verma', status:'Active', bgvStatus:'Verified', performance:82, failedDeliveries:11, earnings:20200, city:'Chandigarh', phone:'+91-9900001016', joinDate:d(170) },
      { id:'DEL017', name:'Anuj Prasad', status:'Active', bgvStatus:'Verified', performance:90, failedDeliveries:5, earnings:27600, city:'Patna', phone:'+91-9900001017', joinDate:d(130) },
      { id:'DEL018', name:'Dinesh Chand', status:'Suspended', bgvStatus:'Verified', performance:52, failedDeliveries:22, earnings:11300, city:'Coimbatore', phone:'+91-9900001018', joinDate:d(420) }
    ],

    nurses: [
      { id:'NRS001', name:'Sreeja Menon', license:'NCI-KL-2021-001', status:'Active', specialty:'Wound Care', visitCount:142, rating:4.9, incidents:0, phone:'+91-9910001001', email:'sreeja.m@rxphysis.in', city:'Kochi', joinDate:d(400) },
      { id:'NRS002', name:'Asha Pillai', license:'NCI-KL-2021-002', status:'Active', specialty:'Elderly Care', visitCount:218, rating:4.8, incidents:1, phone:'+91-9910001002', email:'asha.p@rxphysis.in', city:'Thiruvananthapuram', joinDate:d(380) },
      { id:'NRS003', name:'Deepika Nair', license:'NCI-TN-2021-003', status:'Active', specialty:'Pediatric Care', visitCount:165, rating:4.7, incidents:0, phone:'+91-9910001003', email:'deepika.n@rxphysis.in', city:'Chennai', joinDate:d(350) },
      { id:'NRS004', name:'Kavitha R', license:'NCI-AP-2021-004', status:'Suspended', specialty:'IV Therapy', visitCount:78, rating:3.4, incidents:3, phone:'+91-9910001004', email:'kavitha.r@rxphysis.in', city:'Hyderabad', joinDate:d(320) },
      { id:'NRS005', name:'Meera Devi', license:'NCI-KA-2021-005', status:'Active', specialty:'Post-Surgical', visitCount:199, rating:4.8, incidents:0, phone:'+91-9910001005', email:'meera.d@rxphysis.in', city:'Bengaluru', joinDate:d(300) },
      { id:'NRS006', name:'Sindhu Latha', license:'NCI-MH-2021-006', status:'Active', specialty:'Oncology Support', visitCount:134, rating:4.6, incidents:1, phone:'+91-9910001006', email:'sindhu.l@rxphysis.in', city:'Mumbai', joinDate:d(280) },
      { id:'NRS007', name:'Radha Krishnan', license:'NCI-TN-2022-007', status:'Active', specialty:'Dialysis Support', visitCount:88, rating:4.5, incidents:0, phone:'+91-9910001007', email:'radha.k@rxphysis.in', city:'Coimbatore', joinDate:d(260) },
      { id:'NRS008', name:'Priya Susheela', license:'NCI-KL-2022-008', status:'Pending', specialty:'General Nursing', visitCount:5, rating:0, incidents:0, phone:'+91-9910001008', email:'priya.s@rxphysis.in', city:'Thrissur', joinDate:d(15) },
      { id:'NRS009', name:'Anitha George', license:'NCI-KL-2022-009', status:'Active', specialty:'Wound Care', visitCount:176, rating:4.9, incidents:0, phone:'+91-9910001009', email:'anitha.g@rxphysis.in', city:'Palakkad', joinDate:d(240) },
      { id:'NRS010', name:'Latha Suresh', license:'NCI-AP-2022-010', status:'Active', specialty:'Elderly Care', visitCount:231, rating:4.7, incidents:1, phone:'+91-9910001010', email:'latha.s@rxphysis.in', city:'Visakhapatnam', joinDate:d(220) },
      { id:'NRS011', name:'Nirmala Rani', license:'NCI-WB-2022-011', status:'Active', specialty:'Pediatric Care', visitCount:154, rating:4.6, incidents:0, phone:'+91-9910001011', email:'nirmala.r@rxphysis.in', city:'Kolkata', joinDate:d(200) },
      { id:'NRS012', name:'Rekha Mohan', license:'NCI-MH-2022-012', status:'Suspended', specialty:'IV Therapy', visitCount:92, rating:3.8, incidents:2, phone:'+91-9910001012', email:'rekha.m@rxphysis.in', city:'Pune', joinDate:d(300) },
      { id:'NRS013', name:'Geetha Rajan', license:'NCI-KA-2022-013', status:'Active', specialty:'Post-Surgical', visitCount:189, rating:4.8, incidents:0, phone:'+91-9910001013', email:'geetha.r@rxphysis.in', city:'Mangaluru', joinDate:d(180) },
      { id:'NRS014', name:'Saroja Naidu', license:'NCI-AP-2022-014', status:'Active', specialty:'Oncology Support', visitCount:112, rating:4.4, incidents:1, phone:'+91-9910001014', email:'saroja.n@rxphysis.in', city:'Guntur', joinDate:d(160) },
      { id:'NRS015', name:'Amitha Krishnan', license:'NCI-KL-2023-015', status:'Pending', specialty:'General Nursing', visitCount:3, rating:0, incidents:0, phone:'+91-9910001015', email:'amitha.k@rxphysis.in', city:'Kozhikode', joinDate:d(10) },
      { id:'NRS016', name:'Padma Venkat', license:'NCI-TN-2022-016', status:'Active', specialty:'Diabetic Care', visitCount:144, rating:4.7, incidents:0, phone:'+91-9910001016', email:'padma.v@rxphysis.in', city:'Madurai', joinDate:d(140) },
      { id:'NRS017', name:'Sumitha Devi', license:'NCI-GJ-2022-017', status:'Active', specialty:'Wound Care', visitCount:178, rating:4.8, incidents:0, phone:'+91-9910001017', email:'sumitha.d@rxphysis.in', city:'Surat', joinDate:d(120) },
      { id:'NRS018', name:'Bindhu Raj', license:'NCI-KL-2022-018', status:'Active', specialty:'Post-Surgical', visitCount:201, rating:4.9, incidents:0, phone:'+91-9910001018', email:'bindhu.r@rxphysis.in', city:'Thrissur', joinDate:d(100) }
    ],

    riskAlerts: [
      { id:'RSK001', type:'High-Risk Drug', description:'Schedule X drug Morphine ordered without oncologist prescription', severity:'Critical', status:'Open', entity:'Patient: Mohan Das', date:'2024-01-15' },
      { id:'RSK002', type:'Narcotic Alert', description:'Codeine Phosphate prescribed 3 times in 10 days to same patient', severity:'High', status:'Open', entity:'Patient: Tarun Joshi', date:'2024-01-14' },
      { id:'RSK003', type:'Duplicate Prescription', description:'Same prescription submitted at 2 pharmacies within 24 hours', severity:'High', status:'Open', entity:'Patient: Ramesh Pillai', date:'2024-01-14' },
      { id:'RSK004', type:'Antibiotic Overuse', description:'Azithromycin prescribed for 5th time without culture test', severity:'Medium', status:'Escalated', entity:'Dr. Anand Iyer - Patient: Arun Nambiar', date:'2024-01-13' },
      { id:'RSK005', type:'Frequent Refund', description:'Patient has raised 4 refund requests in 2 weeks', severity:'Medium', status:'Open', entity:'Patient: Suresh Iyer', date:'2024-01-13' },
      { id:'RSK006', type:'Suspicious Account', description:'Account created with forged documents, suspicious ordering pattern', severity:'Critical', status:'Open', entity:'Account: acc_suspicious_892', date:'2024-01-12' },
      { id:'RSK007', type:'High-Risk Drug', description:'Warfarin dispensed without INR test confirmation', severity:'High', status:'Resolved', entity:'Pharmacy: AyurMed - Patient: Hari Prakash', date:'2024-01-11' },
      { id:'RSK008', type:'Overprescribing', description:'Doctor issued 45 H1 prescriptions in one day - exceeds threshold', severity:'Critical', status:'Open', entity:'Dr. Priya Patel', date:'2024-01-11' },
      { id:'RSK009', type:'Duplicate Prescription', description:'Duplicate RX submitted at GenericMart and CareWell', severity:'High', status:'Open', entity:'Patient: Kiran Bose', date:'2024-01-10' },
      { id:'RSK010', type:'Antibiotic Overuse', description:'5th antibiotic course in 6 weeks, no specialist referral', severity:'High', status:'Open', entity:'Patient: Rahul Mehta', date:'2024-01-10' },
      { id:'RSK011', type:'Narcotic Alert', description:'Diazepam and Alprazolam dispensed simultaneously', severity:'High', status:'Escalated', entity:'Pharmacy: HealthFirst - Patient: Deepa Krishnan', date:'2024-01-09' },
      { id:'RSK012', type:'Frequent Refund', description:'User claiming non-delivery in 3 consecutive orders - fraud suspected', severity:'High', status:'Open', entity:'Patient: Vikram Reddy', date:'2024-01-08' },
      { id:'RSK013', type:'Suspicious Account', description:'Multiple accounts using same phone number', severity:'Medium', status:'Open', entity:'Accounts: acc_841, acc_842', date:'2024-01-08' },
      { id:'RSK014', type:'High-Risk Drug', description:'Insulin dispensed with no cold chain verification', severity:'High', status:'Resolved', entity:'Pharmacy: CareWell - Patient: Sunita Patel', date:'2024-01-07' },
      { id:'RSK015', type:'Overprescribing', description:'Psychiatrist prescribing sedatives to pediatric patients without guardian consent', severity:'Critical', status:'Open', entity:'Dr. Arjun Nair', date:'2024-01-06' },
      { id:'RSK016', type:'Antibiotic Overuse', description:'Community antibiotic resistance pattern detected - Bengaluru zone', severity:'Medium', status:'Escalated', entity:'Zone: Bengaluru North', date:'2024-01-05' },
      { id:'RSK017', type:'Frequent Refund', description:'4th refund request from same account - pattern analysis triggered', severity:'Medium', status:'Resolved', entity:'Patient: Meena Rao', date:'2024-01-04' },
      { id:'RSK018', type:'Duplicate Prescription', description:'Doctor signature mismatch detected on RX-021', severity:'High', status:'Open', entity:'RX021 - Dr. Arjun Nair', date:'2024-01-03' },
      { id:'RSK019', type:'Suspicious Account', description:'Rapid bulk ordering of Schedule H medicines across 6 pharmacies', severity:'Critical', status:'Open', entity:'Account: acc_pharma_bulk_001', date:'2024-01-02' },
      { id:'RSK020', type:'High-Risk Drug', description:'Temperature-sensitive drug stored at incorrect temperature reported', severity:'High', status:'Open', entity:'Pharmacy: SwiftMeds - Levothyroxine batch', date:'2024-01-01' }
    ],

    inventory: [
      { id:'INV001', item:'Atorvastatin 10mg', quantity:2400, unit:'Strips', expiry:'2025-08-15', batch:'AT-2024-001', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV002', item:'Metformin 500mg', quantity:3100, unit:'Strips', expiry:'2025-09-20', batch:'MF-2024-002', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV003', item:'Insulin Glargine 100IU', quantity:180, unit:'Vials', expiry:'2024-06-30', batch:'IG-2024-003', coldChain:true, location:'Cold Storage', status:'Expiring Soon' },
      { id:'INV004', item:'Amlodipine 5mg', quantity:1800, unit:'Strips', expiry:'2025-10-10', batch:'AM-2024-004', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV005', item:'Levothyroxine 50mcg', quantity:42, unit:'Strips', expiry:'2024-07-01', batch:'LT-2024-005', coldChain:true, location:'Cold Storage', status:'Low Stock' },
      { id:'INV006', item:'Warfarin 5mg', quantity:520, unit:'Strips', expiry:'2025-12-01', batch:'WF-2024-006', coldChain:false, location:'Controlled Vault', status:'Normal' },
      { id:'INV007', item:'Alprazolam 0.5mg', quantity:15, unit:'Strips', expiry:'2025-03-15', batch:'AX-2024-007', coldChain:false, location:'Controlled Vault', status:'Low Stock' },
      { id:'INV008', item:'Azithromycin 500mg', quantity:890, unit:'Strips', expiry:'2025-07-20', batch:'AZ-2024-008', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV009', item:'Paracetamol 500mg', quantity:5600, unit:'Strips', expiry:'2026-01-01', batch:'PC-2024-009', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV010', item:'Amoxicillin 500mg', quantity:1240, unit:'Strips', expiry:'2025-06-01', batch:'AC-2024-010', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV011', item:'Rosuvastatin 10mg', quantity:1680, unit:'Strips', expiry:'2025-11-15', batch:'RS-2024-011', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV012', item:'Clonazepam 0.5mg', quantity:22, unit:'Strips', expiry:'2025-04-20', batch:'CL-2024-012', coldChain:false, location:'Controlled Vault', status:'Low Stock' },
      { id:'INV013', item:'Metoprolol 25mg', quantity:2100, unit:'Strips', expiry:'2025-08-01', batch:'MT-2024-013', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV014', item:'Pantoprazole 40mg', quantity:780, unit:'Strips', expiry:'2025-09-15', batch:'PN-2024-014', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV015', item:'Clopidogrel 75mg', quantity:440, unit:'Strips', expiry:'2024-05-30', batch:'CP-2024-015', coldChain:false, location:'Controlled Vault', status:'Expiring Soon' },
      { id:'INV016', item:'Insulin NPH 40IU', quantity:95, unit:'Vials', expiry:'2024-06-15', batch:'IN-2024-016', coldChain:true, location:'Cold Storage', status:'Expiring Soon' },
      { id:'INV017', item:'Morphine Sulphate 10mg', quantity:8, unit:'Vials', expiry:'2025-02-28', batch:'MS-2024-017', coldChain:false, location:'Narcotic Vault', status:'Low Stock' },
      { id:'INV018', item:'Glimepiride 2mg', quantity:1560, unit:'Strips', expiry:'2025-10-20', batch:'GL-2024-018', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV019', item:'Escitalopram 10mg', quantity:680, unit:'Strips', expiry:'2025-07-01', batch:'ES-2024-019', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV020', item:'Cetirizine 10mg', quantity:2200, unit:'Strips', expiry:'2026-02-15', batch:'CT-2024-020', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV021', item:'Losartan 50mg', quantity:920, unit:'Strips', expiry:'2025-12-01', batch:'LS-2024-021', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV022', item:'Omeprazole 20mg', quantity:3400, unit:'Strips', expiry:'2025-11-20', batch:'OM-2024-022', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV023', item:'Diazepam 5mg', quantity:18, unit:'Strips', expiry:'2025-03-10', batch:'DZ-2024-023', coldChain:false, location:'Controlled Vault', status:'Low Stock' },
      { id:'INV024', item:'Clarithromycin 500mg', quantity:340, unit:'Strips', expiry:'2025-05-15', batch:'CL-2024-024', coldChain:false, location:'Main Warehouse', status:'Normal' },
      { id:'INV025', item:'Ondansetron 4mg', quantity:580, unit:'Strips', expiry:'2025-08-30', batch:'ON-2024-025', coldChain:false, location:'Main Warehouse', status:'Normal' }
    ],

    roles: [
      { id:'ROLE001', name:'Super Admin', description:'Full platform access with override capabilities', color:'purple' },
      { id:'ROLE002', name:'Finance Admin', description:'Manage transactions, payouts, and settlements', color:'teal' },
      { id:'ROLE003', name:'Compliance Admin', description:'Monitor prescriptions, risk alerts, and audits', color:'amber' },
      { id:'ROLE004', name:'City Manager', description:'Manage doctors, pharmacies, and delivery in assigned city', color:'blue' },
      { id:'ROLE005', name:'Support Admin', description:'Handle disputes, complaints, and customer escalations', color:'green' }
    ],

    subAdmins: [
      { id:'ADM001', name:'Anil Mathew', email:'anil.m@rxphysis.in', role:'Finance Admin', status:'Active', lastLogin:'2024-01-15 10:34', phone:'+91-9922001001' },
      { id:'ADM002', name:'Sunitha Krishnan', email:'sunitha.k@rxphysis.in', role:'Compliance Admin', status:'Active', lastLogin:'2024-01-15 09:12', phone:'+91-9922001002' },
      { id:'ADM003', name:'Karthik Rajan', email:'karthik.r@rxphysis.in', role:'City Manager', status:'Active', lastLogin:'2024-01-14 16:45', phone:'+91-9922001003' },
      { id:'ADM004', name:'Divya Sharma', email:'divya.s@rxphysis.in', role:'Support Admin', status:'Active', lastLogin:'2024-01-15 11:22', phone:'+91-9922001004' },
      { id:'ADM005', name:'Rajiv Nambiar', email:'rajiv.n@rxphysis.in', role:'Finance Admin', status:'Inactive', lastLogin:'2024-01-10 14:00', phone:'+91-9922001005' },
      { id:'ADM006', name:'Meenakshi Iyer', email:'meenakshi.i@rxphysis.in', role:'City Manager', status:'Active', lastLogin:'2024-01-15 08:55', phone:'+91-9922001006' },
      { id:'ADM007', name:'Prasad Venkat', email:'prasad.v@rxphysis.in', role:'Compliance Admin', status:'Active', lastLogin:'2024-01-14 12:30', phone:'+91-9922001007' },
      { id:'ADM008', name:'Lekha Subramaniam', email:'lekha.s@rxphysis.in', role:'Support Admin', status:'Active', lastLogin:'2024-01-15 10:05', phone:'+91-9922001008' },
      { id:'ADM009', name:'Vinod Pillai', email:'vinod.p@rxphysis.in', role:'City Manager', status:'Inactive', lastLogin:'2024-01-08 09:15', phone:'+91-9922001009' },
      { id:'ADM010', name:'Harini Reddy', email:'harini.r@rxphysis.in', role:'Finance Admin', status:'Active', lastLogin:'2024-01-15 13:41', phone:'+91-9922001010' },
      { id:'ADM011', name:'Suresh Babu', email:'suresh.b@rxphysis.in', role:'Support Admin', status:'Active', lastLogin:'2024-01-15 07:50', phone:'+91-9922001011' },
      { id:'ADM012', name:'Parvathy Nair', email:'parvathy.n@rxphysis.in', role:'Compliance Admin', status:'Active', lastLogin:'2024-01-14 15:22', phone:'+91-9922001012' }
    ],

    notifications: [
      { id:'NOT001', type:'System Alert', target:'All', message:'Platform maintenance scheduled for Jan 20 at 02:00 AM. Expect 1 hour downtime.', sentAt:'2024-01-15 10:00', status:'Sent', createdBy:'Super Admin' },
      { id:'NOT002', type:'Drug Safety', target:'Doctors', message:'URGENT: Batch recall of Metformin 500mg Batch MF-2023-445 from Cipla. Do not prescribe from this batch.', sentAt:'2024-01-14 14:30', status:'Sent', createdBy:'Compliance Admin' },
      { id:'NOT003', type:'Drug Recall', target:'Pharmacies', message:'Immediate recall: Atorvastatin 10mg Batch AT-2023-221. Pull from shelves and await further instructions.', sentAt:'2024-01-14 09:15', status:'Sent', createdBy:'Compliance Admin' },
      { id:'NOT004', type:'Promo', target:'Patients', message:'Exclusive offer: 15% off on all generic medicines this weekend. Use code GENERIC15.', sentAt:'2024-01-13 12:00', status:'Sent', createdBy:'Super Admin' },
      { id:'NOT005', type:'Subscription', target:'Doctors', message:'Your RxPhysis Pro subscription is expiring in 7 days. Renew now for uninterrupted service.', sentAt:'2024-01-12 11:00', status:'Sent', createdBy:'Finance Admin' },
      { id:'NOT006', type:'System Alert', target:'Delivery', message:'New route optimization algorithm deployed. Check updated delivery zones in your app.', sentAt:'2024-01-11 15:45', status:'Sent', createdBy:'Super Admin' },
      { id:'NOT007', type:'Drug Safety', target:'All', message:'WHO advisory: Increased vigilance for antibiotic prescriptions. Follow resistance protocols.', sentAt:'2024-01-10 09:00', status:'Sent', createdBy:'Compliance Admin' },
      { id:'NOT008', type:'Promo', target:'Pharmacies', message:'New commission structure effective Feb 1. Tiered rates: 10-15% based on volume.', sentAt:'2024-01-09 16:00', status:'Sent', createdBy:'Finance Admin' },
      { id:'NOT009', type:'System Alert', target:'Doctors', message:'Updated prescription form now available. New mandatory fields: ICD-10 code, Duration.', sentAt:'2024-01-08 10:30', status:'Sent', createdBy:'Super Admin' },
      { id:'NOT010', type:'Drug Recall', target:'Pharmacies', message:'Codeine-containing products batch CDE-2023-890 recalled. Return to warehouse immediately.', sentAt:'2024-01-07 14:00', status:'Sent', createdBy:'Compliance Admin' },
      { id:'NOT011', type:'Subscription', target:'Pharmacies', message:'Annual subscription renewal reminder for 12 pharmacies. Deadline: Jan 31.', sentAt:'2024-01-06 11:15', status:'Sent', createdBy:'Finance Admin' },
      { id:'NOT012', type:'Promo', target:'Patients', message:'Refer a doctor and earn ₹500 RxPhysis credits. Terms apply.', sentAt:'2024-01-05 12:00', status:'Sent', createdBy:'Super Admin' },
      { id:'NOT013', type:'System Alert', target:'All', message:'New KYC requirements for Schedule H medicine orders effective immediately.', sentAt:'2024-01-04 09:00', status:'Sent', createdBy:'Compliance Admin' },
      { id:'NOT014', type:'Drug Safety', target:'Doctors', message:'Clozapine monitoring guidelines updated. Mandatory blood count before prescription.', sentAt:'2024-01-03 10:00', status:'Sent', createdBy:'Compliance Admin' },
      { id:'NOT015', type:'Promo', target:'Delivery', message:'Performance bonus: Extra ₹200/day for achieving 95%+ delivery rating this month.', sentAt:'2024-01-02 09:30', status:'Sent', createdBy:'Super Admin' }
    ],

    documents: [
      { id:'DOC001', name:'Dr. Rajesh Sharma - MCI License', category:'Doctor Licenses', uploader:'Dr. Rajesh Sharma', date:'2023-01-15', status:'Verified', fileType:'PDF', size:'1.2 MB' },
      { id:'DOC002', name:'Dr. Priya Patel - Medical Degree', category:'Doctor Licenses', uploader:'Dr. Priya Patel', date:'2023-02-20', status:'Verified', fileType:'PDF', size:'3.4 MB' },
      { id:'DOC003', name:'MediPlus - Pharmacy License 2023', category:'Pharmacy Licenses', uploader:'MediPlus Admin', date:'2023-01-10', status:'Verified', fileType:'PDF', size:'0.8 MB' },
      { id:'DOC004', name:'HealthFirst - Drug License', category:'Pharmacy Licenses', uploader:'HealthFirst Admin', date:'2023-02-05', status:'Verified', fileType:'PDF', size:'1.1 MB' },
      { id:'DOC005', name:'Sreeja Menon - Nursing Certificate', category:'Nurse Certs', uploader:'Sreeja Menon', date:'2023-03-01', status:'Verified', fileType:'PDF', size:'0.9 MB' },
      { id:'DOC006', name:'Asha Pillai - ANM Certificate', category:'Nurse Certs', uploader:'Asha Pillai', date:'2023-04-15', status:'Verified', fileType:'PDF', size:'0.7 MB' },
      { id:'DOC007', name:'Ramesh Yadav - Delivery Partner KYC', category:'KYC Documents', uploader:'Ramesh Yadav', date:'2023-02-10', status:'Verified', fileType:'JPG', size:'2.1 MB' },
      { id:'DOC008', name:'Q3 2023 Audit Report', category:'Audit Reports', uploader:'Finance Admin', date:'2023-10-01', status:'Verified', fileType:'PDF', size:'4.8 MB' },
      { id:'DOC009', name:'CDSCO Compliance Certificate 2023', category:'Government Compliance', uploader:'Super Admin', date:'2023-07-01', status:'Verified', fileType:'PDF', size:'1.6 MB' },
      { id:'DOC010', name:'Dr. Kiran Reddy - MCI License', category:'Doctor Licenses', uploader:'Dr. Kiran Reddy', date:'2024-01-10', status:'Pending', fileType:'PDF', size:'1.3 MB' },
      { id:'DOC011', name:'NovaMed - Pharmacy License', category:'Pharmacy Licenses', uploader:'NovaMed Admin', date:'2024-01-08', status:'Pending', fileType:'PDF', size:'0.9 MB' },
      { id:'DOC012', name:'Kavitha R - Nursing Certificate', category:'Nurse Certs', uploader:'Kavitha R', date:'2023-06-20', status:'Verified', fileType:'PDF', size:'0.8 MB' },
      { id:'DOC013', name:'Priya Susheela - BSc Nursing Degree', category:'Nurse Certs', uploader:'Priya Susheela', date:'2024-01-05', status:'Pending', fileType:'PDF', size:'2.2 MB' },
      { id:'DOC014', name:'Pradeep Singh - Driver License & BGV', category:'KYC Documents', uploader:'Pradeep Singh', date:'2023-03-15', status:'Verified', fileType:'PDF', size:'1.8 MB' },
      { id:'DOC015', name:'Santosh Mishra - BGV Failure Report', category:'KYC Documents', uploader:'HR Admin', date:'2023-08-20', status:'Verified', fileType:'PDF', size:'0.6 MB' },
      { id:'DOC016', name:'Q4 2023 Audit Report', category:'Audit Reports', uploader:'Finance Admin', date:'2024-01-05', status:'Pending', fileType:'PDF', size:'5.2 MB' },
      { id:'DOC017', name:'State Drug Controller Permit 2024', category:'Government Compliance', uploader:'Super Admin', date:'2024-01-01', status:'Verified', fileType:'PDF', size:'1.4 MB' },
      { id:'DOC018', name:'PharmaDirect - Drug License Application', category:'Pharmacy Licenses', uploader:'PharmaDirect Admin', date:'2024-01-12', status:'Pending', fileType:'PDF', size:'1.0 MB' },
      { id:'DOC019', name:'Dr. Vikram Joshi - Orthopedic Specialization', category:'Doctor Licenses', uploader:'Dr. Vikram Joshi', date:'2024-01-14', status:'Pending', fileType:'PDF', size:'2.8 MB' },
      { id:'DOC020', name:'Annual PCPNDT Compliance 2023', category:'Government Compliance', uploader:'Compliance Admin', date:'2023-12-31', status:'Verified', fileType:'PDF', size:'3.1 MB' }
    ],

    incidents: [
      { id:'INC001', type:'Adverse Drug Reaction', patient:'Ravi Kumar', status:'Resolved', priority:'High', date:'2024-01-15', description:'Patient reported severe allergic reaction to Amoxicillin. Hospitalized.', notes:'Refund approved. Doctor notified. Case closed after recovery.', assignedTo:'Sunitha Krishnan' },
      { id:'INC002', type:'Delivery Issue', patient:'Meena Rao', status:'In Progress', priority:'Medium', date:'2024-01-15', description:'Insulin vial delivered at room temperature, cold chain violation.', notes:'Investigation ongoing. Delivery partner suspended pending inquiry.', assignedTo:'Karthik Rajan' },
      { id:'INC003', type:'Payment Dispute', patient:'Suresh Iyer', status:'Open', priority:'Medium', date:'2024-01-14', description:'Patient claims double charged for same order.', notes:'Finance team reviewing transaction logs.', assignedTo:'Anil Mathew' },
      { id:'INC004', type:'Complaint', patient:'Anjali Singh', status:'Resolved', priority:'Low', date:'2024-01-14', description:'Medicine substitution done without patient consent.', notes:'Pharmacy warned. Policy reminder sent.', assignedTo:'Divya Sharma' },
      { id:'INC005', type:'Refund Request', patient:'Rahul Mehta', status:'Open', priority:'Low', date:'2024-01-13', description:'Medicines received past expiry date.', notes:'Awaiting quality team verification.', assignedTo:'Lekha Subramaniam' },
      { id:'INC006', type:'Adverse Drug Reaction', patient:'Deepa Krishnan', status:'Escalated', priority:'Critical', date:'2024-01-13', description:'Serious cardiac event possibly linked to clonazepam + alprazolam combination.', notes:'Hospital report received. Regulatory authority notified. Legal team involved.', assignedTo:'Sunitha Krishnan' },
      { id:'INC007', type:'Delivery Issue', patient:'Vikram Reddy', status:'Open', priority:'Medium', date:'2024-01-12', description:'Order marked delivered but not received by patient.', notes:'GPS verification requested from delivery partner.', assignedTo:'Karthik Rajan' },
      { id:'INC008', type:'Payment Dispute', patient:'Sunita Patel', status:'Resolved', priority:'Medium', date:'2024-01-12', description:'Discount coupon not applied despite valid offer.', notes:'Refund of discount amount processed.', assignedTo:'Anil Mathew' },
      { id:'INC009', type:'Complaint', patient:'Mohan Das', status:'In Progress', priority:'High', date:'2024-01-11', description:'Narcotic prescription dispensed to non-patient (identity fraud suspected).', notes:'Police complaint filed. Account flagged.', assignedTo:'Sunitha Krishnan' },
      { id:'INC010', type:'Refund Request', patient:'Kavita Shah', status:'Open', priority:'Low', date:'2024-01-11', description:'Returned unopened medicines, refund not processed for 7 days.', notes:'Finance team processing.', assignedTo:'Anil Mathew' },
      { id:'INC011', type:'Delivery Issue', patient:'Arun Nambiar', status:'Resolved', priority:'Low', date:'2024-01-10', description:'Medicines delivered to wrong address.', notes:'New delivery arranged. Compensation of ₹100 credited.', assignedTo:'Karthik Rajan' },
      { id:'INC012', type:'Adverse Drug Reaction', patient:'Priya Venkat', status:'Open', priority:'High', date:'2024-01-10', description:'Rash and swelling after Azithromycin course.', notes:'Doctor notified. Awaiting patient medical report.', assignedTo:'Sunitha Krishnan' },
      { id:'INC013', type:'Complaint', patient:'Kiran Bose', status:'In Progress', priority:'Medium', date:'2024-01-09', description:'Pharmacist dispensed different brand without informing.', notes:'Pharmacy counseled. Review of substitution policy underway.', assignedTo:'Divya Sharma' },
      { id:'INC014', type:'Payment Dispute', patient:'Nandini Roy', status:'Resolved', priority:'Low', date:'2024-01-09', description:'Bank charged twice due to gateway error.', notes:'One charge reversed. Bank confirmed.', assignedTo:'Anil Mathew' },
      { id:'INC015', type:'Refund Request', patient:'Suraj Patil', status:'Open', priority:'Low', date:'2024-01-08', description:'Order cancelled but refund status showing pending.', notes:'Payment gateway team alerted.', assignedTo:'Lekha Subramaniam' },
      { id:'INC016', type:'Adverse Drug Reaction', patient:'Geeta Sharma', status:'Escalated', priority:'Critical', date:'2024-01-07', description:'Anaphylactic shock post insulin injection at home. Nurse present.', notes:'Emergency response deployed. ICU admission. Nurse suspended.', assignedTo:'Sunitha Krishnan' },
      { id:'INC017', type:'Delivery Issue', patient:'Ashok Kumar', status:'Resolved', priority:'Medium', date:'2024-01-07', description:'Cold chain medicine delivered warm - patient noticed loose packaging.', notes:'Delivery partner penalized. New delivery with verified cold chain done.', assignedTo:'Karthik Rajan' },
      { id:'INC018', type:'Complaint', patient:'Pooja Mishra', status:'Open', priority:'Low', date:'2024-01-06', description:'App showed incorrect medicine information causing confusion.', notes:'Tech team reviewing content accuracy.', assignedTo:'Divya Sharma' },
      { id:'INC019', type:'Payment Dispute', patient:'Tarun Joshi', status:'In Progress', priority:'Medium', date:'2024-01-05', description:'Charged for prescription fee though doctor cancelled appointment.', notes:'Doctor fee reversal under review.', assignedTo:'Anil Mathew' },
      { id:'INC020', type:'Refund Request', patient:'Lalitha Devi', status:'Resolved', priority:'Low', date:'2024-01-04', description:'Subscription auto-renewed without consent.', notes:'Full refund processed. User opted out of auto-renewal.', assignedTo:'Lekha Subramaniam' },
      { id:'INC021', type:'Adverse Drug Reaction', patient:'Ramesh Pillai', status:'Open', priority:'High', date:'2024-01-03', description:'Benzodiazepine overdose - patient reported extreme drowsiness, confusion.', notes:'Hospital treatment in progress. Regulatory report filed.', assignedTo:'Sunitha Krishnan' },
      { id:'INC022', type:'Complaint', patient:'Divya Iyer', status:'Resolved', priority:'Low', date:'2024-01-02', description:'Incorrect invoice generated for order.', notes:'Invoice corrected and resent.', assignedTo:'Divya Sharma' }
    ],

    auditLog: []
  };
}

/* ========== LOCALSTORAGE ========== */
const LS_KEY = 'rxphysis_admin_data';

function loadData() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      APP.data = JSON.parse(raw);
      // ensure all keys exist
      const def = getDefaultData();
      Object.keys(def).forEach(k => {
        if (!APP.data[k]) APP.data[k] = def[k];
      });
    } else {
      APP.data = getDefaultData();
      saveData();
    }
  } catch(e) {
    APP.data = getDefaultData();
  }
}

function saveData() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(APP.data));
  } catch(e) {
    showToast('Storage error: ' + e.message, 'error');
  }
}

function resetDemoData() {
  if (!confirm('Reset all data to demo defaults? This cannot be undone.')) return;
  localStorage.removeItem(LS_KEY);
  APP.data = getDefaultData();
  saveData();
  navigate(APP.currentSection);
  showToast('Demo data reset successfully', 'success');
}

/* ========== UTILITIES ========== */
let _idCounter = Date.now();
function genId(prefix) {
  return (prefix || 'ID') + (++_idCounter).toString(36).toUpperCase();
}

function fmtDate(s) {
  if (!s) return '—';
  try {
    const d = new Date(s);
    return d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
  } catch(e) { return s; }
}

function fmtCurrency(n) {
  const num = parseFloat(n) || 0;
  if (num >= 100000) return '₹' + (num/100000).toFixed(1) + 'L';
  if (num >= 1000) return '₹' + (num/1000).toFixed(1) + 'K';
  return '₹' + num.toFixed(0);
}

function fmtNum(n) {
  return Number(n).toLocaleString('en-IN');
}

function statusBadge(s) {
  const map = {
    'Active':'active', 'Released':'active', 'Verified':'verified', 'Resolved':'resolved',
    'Approved':'approved',
    'Suspended':'suspended', 'Rejected':'rejected', 'Failed':'failed', 'Refunded':'refunded',
    'Blacklisted':'blacklisted',
    'Pending':'pending', 'Held':'held', 'In Progress':'in-progress',
    'Open':'open', 'Escalated':'escalated', 'Flagged':'flagged',
    'Sent':'active', 'Normal':'active', 'Well Stocked':'active',
    'Low Stock':'pending', 'Expiring Soon':'warning', 'Out of Stock':'danger',
    'Inactive':'suspended', 'Disputed':'escalated', 'Dispute':'escalated',
    'Critical':'danger', 'High':'high', 'Medium':'medium', 'Low':'low',
    'Narcotic Vault':'purple', 'Cold Storage':'info', 'Controlled Vault':'warning'
  };
  const cls = map[s] || 'info';
  return `<span class="badge badge-${cls}">${s}</span>`;
}

function yesNo(val, yesClass, noClass) {
  if (val === true || val === 'true' || val === '1') {
    return `<span class="badge badge-${yesClass||'active'}"><i class="fas fa-check"></i> Yes</span>`;
  }
  return `<span class="badge badge-${noClass||'suspended'}"><i class="fas fa-xmark"></i> No</span>`;
}

function escHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function filterData(arr, query, fields) {
  if (!query) return arr;
  const q = query.toLowerCase();
  return arr.filter(item => fields.some(f => String(item[f]||'').toLowerCase().includes(q)));
}

/* ========== AUDIT LOG ========== */
function addAudit(action, section, detail) {
  if (!APP.data.auditLog) APP.data.auditLog = [];
  APP.data.auditLog.unshift({
    id: genId('AUD'),
    action,
    section,
    detail,
    timestamp: new Date().toISOString(),
    user: 'Super Admin'
  });
  if (APP.data.auditLog.length > 100) APP.data.auditLog = APP.data.auditLog.slice(0, 100);
  saveData();
}

function showAuditLog() {
  const logs = (APP.data.auditLog || []).slice(0, 50);
  const rows = logs.length ? logs.map(l => `
    <div class="audit-entry">
      <span class="audit-time">${new Date(l.timestamp).toLocaleString('en-IN', {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</span>
      <span class="audit-action">${l.action}</span>
      <span class="audit-detail">${escHtml(l.section)} — ${escHtml(l.detail)}</span>
    </div>`).join('') : '<div class="empty-state"><i class="fas fa-clock-rotate-left"></i><p>No audit entries yet</p></div>';
  showModal('Audit Log (Last 50)', `<div style="max-height:460px;overflow-y:auto">${rows}</div>`, 'modal-lg');
}

/* ========== CRUD HELPERS ========== */
function addItem(key, item) {
  if (!item.id) item.id = genId(key.toUpperCase().slice(0,3));
  APP.data[key].push(item);
  saveData();
  addAudit('ADD', key, `Added: ${item.name || item.id}`);
}

function editItem(key, id, updates) {
  const idx = APP.data[key].findIndex(x => x.id === id);
  if (idx < 0) return;
  APP.data[key][idx] = { ...APP.data[key][idx], ...updates };
  saveData();
  addAudit('EDIT', key, `Updated: ${APP.data[key][idx].name || id}`);
}

function deleteItemById(key, id) {
  const item = APP.data[key].find(x => x.id === id);
  APP.data[key] = APP.data[key].filter(x => x.id !== id);
  saveData();
  addAudit('DELETE', key, `Deleted: ${item ? (item.name || id) : id}`);
}

function confirmDelete(key, id, label, section) {
  const item = APP.data[key].find(x => x.id === id);
  const name = item ? (item.name || item.id) : id;
  showModal('Confirm Delete', `
    <div class="confirm-body">
      <i class="fas fa-trash-can"></i>
      <h4>Delete ${escHtml(label || 'item')}?</h4>
      <p>Are you sure you want to delete <strong>${escHtml(name)}</strong>? This action cannot be undone.</p>
      <div class="confirm-actions">
        <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn btn-danger" onclick="doDelete('${key}','${id}','${section}')">
          <i class="fas fa-trash-can"></i> Delete
        </button>
      </div>
    </div>
  `, 'modal-sm');
}

function doDelete(key, id, section) {
  deleteItemById(key, id);
  closeModal();
  navigate(section || APP.currentSection);
  showToast('Deleted successfully', 'success');
}

/* ========== MODAL SYSTEM ========== */
function showModal(title, content, sizeClass) {
  const overlay = document.getElementById('modalOverlay');
  const container = document.getElementById('modalContainer');
  const titleEl = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');
  if (!overlay) return;
  titleEl.textContent = title;
  body.innerHTML = content;
  container.className = sizeClass || '';
  overlay.classList.add('open');
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('open');
  APP.editingId = null;
}

function handleOverlayClick(e) {
  if (e.target.id === 'modalOverlay') closeModal();
}

/* ========== TOAST SYSTEM ========== */
function showToast(msg, type) {
  type = type || 'success';
  const icons = { success:'fa-circle-check', error:'fa-circle-xmark', warning:'fa-triangle-exclamation', info:'fa-circle-info' };
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `
    <i class="fas ${icons[type]||icons.info} toast-icon"></i>
    <span class="toast-msg">${escHtml(msg)}</span>
    <span class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-xmark"></i></span>
  `;
  container.appendChild(t);
  setTimeout(() => {
    t.classList.add('removing');
    setTimeout(() => t.remove(), 300);
  }, 3500);
}

/* ========== NAVIGATION ========== */
function navigate(sectionId) {
  if (!SECTIONS.find(s => s.id === sectionId)) sectionId = 'dashboard';
  APP.currentSection = sectionId;

  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.section === sectionId);
  });

  const sec = SECTIONS.find(s => s.id === sectionId);
  const title = document.getElementById('topbarTitle');
  if (title && sec) title.textContent = sec.label;

  document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
  const div = document.getElementById('section-' + sectionId);
  if (div) div.classList.add('active');

  renderSection(sectionId);
  updateBadges();
}

function renderSection(id) {
  const map = {
    dashboard: renderDashboard,
    finance: renderFinance,
    medicines: renderMedicines,
    prescriptions: renderPrescriptions,
    doctors: renderDoctors,
    pharmacies: renderPharmacies,
    delivery: renderDelivery,
    nurses: renderNurses,
    risk: renderRisk,
    analytics: renderAnalytics,
    inventory: renderInventory,
    roles: renderRoles,
    notifications: renderNotifications,
    documents: renderDocuments,
    incidents: renderIncidents
  };
  if (map[id]) map[id]();
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('collapsed');
    APP.sidebarOpen = !sidebar.classList.contains('collapsed');
  }
}

function updateBadges() {
  const openIncidents = (APP.data.incidents || []).filter(i => i.status === 'Open' || i.status === 'Escalated').length;
  const pendingNotif = (APP.data.notifications || []).filter(n => n.status === 'Pending').length;
  const incBadge = document.getElementById('navIncidentBadge');
  const notifBadge = document.getElementById('navNotifBadge');
  const notifDot = document.getElementById('notifDot');
  if (incBadge) { incBadge.textContent = openIncidents || ''; incBadge.style.display = openIncidents ? 'flex' : 'none'; }
  if (notifBadge) { notifBadge.textContent = pendingNotif || ''; notifBadge.style.display = pendingNotif ? 'flex' : 'none'; }
  if (notifDot) notifDot.style.display = (openIncidents > 0) ? 'block' : 'none';
}

function handleGlobalSearch(val) {
  if (!val) return;
  showToast(`Searching for: ${val}`, 'info');
}

/* ========== SECTION: DASHBOARD ========== */
function renderDashboard() {
  const el = document.getElementById('section-dashboard');
  if (!el) return;
  const d = APP.data;
  const totalOrders = (d.prescriptions||[]).length;
  const totalDoctors = (d.doctors||[]).filter(x => x.status==='Active').length;
  const totalPharmacies = (d.pharmacies||[]).filter(x => x.status==='Active').length;
  const totalDelivery = (d.delivery||[]).filter(x => x.status==='Active').length;
  const pendingRx = (d.prescriptions||[]).filter(x => x.status==='Pending').length;
  const flaggedRx = (d.prescriptions||[]).filter(x => x.status==='Flagged').length;
  const openIncidents = (d.incidents||[]).filter(x => x.status==='Open').length;
  const escalated = (d.incidents||[]).filter(x => x.status==='Escalated').length;
  const totalRev = (d.transactions||[]).filter(x => x.status==='Released').reduce((a,x) => a + parseFloat(x.amount||0), 0);
  const escrowHeld = (d.transactions||[]).filter(x => x.status==='Held').reduce((a,x) => a + parseFloat(x.amount||0), 0);
  const highRiskDrugs = (d.riskAlerts||[]).filter(x => x.type==='High-Risk Drug' && x.status==='Open').length;
  const refunds = (d.transactions||[]).filter(x => x.type==='Refund').length;
  const failedDel = (d.delivery||[]).reduce((a,x) => a + (parseInt(x.failedDeliveries)||0), 0);
  const lowStock = (d.inventory||[]).filter(x => x.status==='Low Stock').length;

  const recentAudit = (d.auditLog||[]).slice(0, 10);
  const activityFeed = recentAudit.length ? recentAudit.map(e => {
    const type = e.action === 'ADD' ? 'add' : e.action === 'DELETE' ? 'delete' : e.action === 'EDIT' ? 'edit' : 'system';
    const time = new Date(e.timestamp);
    const timeStr = time.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    return `<div class="activity-item">
      <div class="activity-dot ${type}"></div>
      <div class="activity-text"><strong>${e.action}</strong> in ${e.section} — ${escHtml(e.detail)}</div>
      <div class="activity-time">${timeStr}</div>
    </div>`;
  }).join('') : `
    <div class="activity-item"><div class="activity-dot system"></div><div class="activity-text">Dashboard initialized. Welcome to RxPhysis Admin.</div><div class="activity-time">Now</div></div>
    <div class="activity-item"><div class="activity-dot add"></div><div class="activity-text">Sample data loaded — 15 modules ready</div><div class="activity-time">Now</div></div>
  `;

  el.innerHTML = `
    <div class="gradient-banner">
      <h2><i class="fas fa-gauge-high" style="margin-right:10px"></i>Super Admin Dashboard</h2>
      <p>Welcome back, Super Admin. Here's your platform overview for today — ${new Date().toLocaleDateString('en-IN', {weekday:'long', day:'numeric', month:'long', year:'numeric'})}.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon teal"><i class="fas fa-file-prescription"></i></div><span class="stat-trend up"><i class="fas fa-arrow-trend-up"></i> +8%</span></div>
        <div class="stat-value">${fmtNum(totalOrders)}</div>
        <div class="stat-label">Total Prescriptions</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon green"><i class="fas fa-indian-rupee-sign"></i></div><span class="stat-trend up"><i class="fas fa-arrow-trend-up"></i> +12%</span></div>
        <div class="stat-value">${fmtCurrency(totalRev)}</div>
        <div class="stat-label">Total Revenue Released</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon amber"><i class="fas fa-lock"></i></div><span class="stat-trend flat">— steady</span></div>
        <div class="stat-value">${fmtCurrency(escrowHeld)}</div>
        <div class="stat-label">Escrow Held</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon teal"><i class="fas fa-user-doctor"></i></div><span class="stat-trend up"><i class="fas fa-arrow-trend-up"></i> +3</span></div>
        <div class="stat-value">${totalDoctors}</div>
        <div class="stat-label">Active Doctors</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon teal"><i class="fas fa-hospital"></i></div><span class="stat-trend up"><i class="fas fa-arrow-trend-up"></i> +1</span></div>
        <div class="stat-value">${totalPharmacies}</div>
        <div class="stat-label">Active Pharmacies</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon green"><i class="fas fa-truck"></i></div><span class="stat-trend flat">— steady</span></div>
        <div class="stat-value">${totalDelivery}</div>
        <div class="stat-label">Active Delivery Partners</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon amber"><i class="fas fa-clock"></i></div><span class="stat-trend down"><i class="fas fa-arrow-trend-down"></i> -2</span></div>
        <div class="stat-value">${pendingRx}</div>
        <div class="stat-label">Pending RX Verification</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon red"><i class="fas fa-triangle-exclamation"></i></div><span class="stat-trend down"><i class="fas fa-arrow-trend-down"></i> -1</span></div>
        <div class="stat-value">${flaggedRx}</div>
        <div class="stat-label">Flagged Prescriptions</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon red"><i class="fas fa-skull-crossbones"></i></div><span class="stat-trend up"><i class="fas fa-arrow-trend-up"></i> +2</span></div>
        <div class="stat-value">${highRiskDrugs}</div>
        <div class="stat-label">High-Risk Drug Alerts</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon amber"><i class="fas fa-rotate-left"></i></div><span class="stat-trend up"><i class="fas fa-arrow-trend-up"></i> +1</span></div>
        <div class="stat-value">${refunds}</div>
        <div class="stat-label">Refund Transactions</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon red"><i class="fas fa-circle-exclamation"></i></div><span class="stat-trend up"><i class="fas fa-arrow-trend-up"></i> +${escalated}</span></div>
        <div class="stat-value">${openIncidents}</div>
        <div class="stat-label">Open Incidents</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-row"><div class="stat-icon amber"><i class="fas fa-boxes-stacked"></i></div><span class="stat-trend flat">— monitor</span></div>
        <div class="stat-value">${lowStock}</div>
        <div class="stat-label">Low Stock Items</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title"><i class="fas fa-clock-rotate-left" style="color:var(--c4);margin-right:8px"></i>Recent Activity</div>
            <div class="card-sub">Last 10 admin actions</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showAuditLog()"><i class="fas fa-expand"></i> View All</button>
        </div>
        <div class="card-body" style="padding-top:8px">
          <div class="activity-list">${activityFeed}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title"><i class="fas fa-bolt" style="color:var(--c4);margin-right:8px"></i>Quick Actions</div>
        </div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <button class="btn btn-outline" onclick="navigate('prescriptions')"><i class="fas fa-file-prescription"></i> Review RX</button>
            <button class="btn btn-outline" onclick="navigate('risk')"><i class="fas fa-triangle-exclamation"></i> Risk Alerts</button>
            <button class="btn btn-outline" onclick="navigate('incidents')"><i class="fas fa-circle-exclamation"></i> Incidents</button>
            <button class="btn btn-outline" onclick="navigate('finance')"><i class="fas fa-indian-rupee-sign"></i> Finance</button>
            <button class="btn btn-outline" onclick="navigate('doctors')"><i class="fas fa-user-doctor"></i> Doctors</button>
            <button class="btn btn-outline" onclick="navigate('inventory')"><i class="fas fa-boxes-stacked"></i> Inventory</button>
            <button class="btn btn-outline" onclick="navigate('notifications')"><i class="fas fa-bell"></i> Notify All</button>
            <button class="btn btn-outline" onclick="showAuditLog()"><i class="fas fa-clock-rotate-left"></i> Audit Log</button>
          </div>
          <div style="margin-top:20px">
            <div class="card-title mb-4" style="font-size:13px">Platform Health</div>
            <div class="bar-chart">
              <div class="bar-row">
                <div class="bar-label">Delivery Success</div>
                <div class="bar-track"><div class="bar-fill" style="width:87%"></div></div>
                <div class="bar-value">87%</div>
              </div>
              <div class="bar-row">
                <div class="bar-label">RX Verification</div>
                <div class="bar-track"><div class="bar-fill" style="width:76%"></div></div>
                <div class="bar-value">76%</div>
              </div>
              <div class="bar-row">
                <div class="bar-label">Pharmacy Uptime</div>
                <div class="bar-track"><div class="bar-fill" style="width:94%"></div></div>
                <div class="bar-value">94%</div>
              </div>
              <div class="bar-row">
                <div class="bar-label">Settlement Rate</div>
                <div class="bar-track"><div class="bar-fill" style="width:91%"></div></div>
                <div class="bar-value">91%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ========== SECTION: FINANCE ========== */
function renderFinance() {
  const el = document.getElementById('section-finance');
  if (!el) return;
  const txns = APP.data.transactions || [];
  const released = txns.filter(x => x.status==='Released').reduce((a,x)=>a+parseFloat(x.amount||0),0);
  const held = txns.filter(x => x.status==='Held').reduce((a,x)=>a+parseFloat(x.amount||0),0);
  const refunded = txns.filter(x => x.status==='Refunded').reduce((a,x)=>a+parseFloat(x.amount||0),0);
  const commission = txns.filter(x => x.type==='Commission').reduce((a,x)=>a+parseFloat(x.amount||0),0);
  const pharmPayout = txns.filter(x => x.type==='Pharmacy Payout').reduce((a,x)=>a+parseFloat(x.amount||0),0);
  const delivPayout = txns.filter(x => x.type==='Delivery Payout').reduce((a,x)=>a+parseFloat(x.amount||0),0);

  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Finance & Escrow</div><div class="sec-sub">Manage transactions, payouts, and settlements</div></div>
      <div class="sec-actions">
        <button class="btn btn-secondary btn-sm" onclick="downloadFinanceCSV()"><i class="fas fa-download"></i> Download CSV</button>
        <button class="btn btn-primary btn-sm" onclick="showAddTransactionModal()"><i class="fas fa-plus"></i> Add Transaction</button>
      </div>
    </div>

    <div class="comm-cards">
      <div class="comm-card"><div class="comm-card-label">Revenue Released</div><div class="comm-card-value">${fmtCurrency(released)}</div><div class="comm-card-sub">All settled transactions</div></div>
      <div class="comm-card" style="background:linear-gradient(135deg,#92400E,#F59E0B)"><div class="comm-card-label">Escrow Held</div><div class="comm-card-value">${fmtCurrency(held)}</div><div class="comm-card-sub">Pending release</div></div>
      <div class="comm-card" style="background:linear-gradient(135deg,#991B1B,#EF4444)"><div class="comm-card-label">Total Refunded</div><div class="comm-card-value">${fmtCurrency(refunded)}</div><div class="comm-card-sub">Refunds processed</div></div>
      <div class="comm-card" style="background:linear-gradient(135deg,#1E40AF,#3B82F6)"><div class="comm-card-label">Commission Earned</div><div class="comm-card-value">${fmtCurrency(commission)}</div><div class="comm-card-sub">Platform commission</div></div>
      <div class="comm-card" style="background:linear-gradient(135deg,#065F46,#10B981)"><div class="comm-card-label">Pharmacy Payouts</div><div class="comm-card-value">${fmtCurrency(pharmPayout)}</div><div class="comm-card-sub">Settled to pharmacies</div></div>
      <div class="comm-card" style="background:linear-gradient(135deg,#4C1D95,#8B5CF6)"><div class="comm-card-label">Delivery Payouts</div><div class="comm-card-value">${fmtCurrency(delivPayout)}</div><div class="comm-card-sub">Settled to partners</div></div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Transaction Ledger</div>
        <div class="filter-bar" style="margin:0">
          <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search transactions..." oninput="filterFinance(this.value)"></div>
          <select onchange="filterFinanceStatus(this.value)">
            <option value="">All Status</option>
            <option>Held</option><option>Released</option><option>Refunded</option><option>Pending</option>
          </select>
          <select onchange="filterFinanceType(this.value)">
            <option value="">All Types</option>
            <option>Commission</option><option>Pharmacy Payout</option><option>Doctor Fee</option>
            <option>Refund</option><option>Escrow Hold</option><option>Delivery Payout</option><option>Dispute</option>
          </select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table" id="financeTable">
          <thead><tr>
            <th>ID</th><th>Type</th><th>Amount</th><th>Description</th><th>Party</th><th>Status</th><th>Date</th><th>Actions</th>
          </tr></thead>
          <tbody id="financeTbody"></tbody>
        </table>
      </div>
    </div>
  `;
  renderFinanceTable(txns);
}

window._financeSearch = '';
window._financeStatus = '';
window._financeType = '';

function renderFinanceTable(data) {
  let rows = data;
  if (window._financeSearch) rows = filterData(rows, window._financeSearch, ['id','description','party','type','status']);
  if (window._financeStatus) rows = rows.filter(r => r.status === window._financeStatus);
  if (window._financeType) rows = rows.filter(r => r.type === window._financeType);

  const tbody = document.getElementById('financeTbody');
  if (!tbody) return;
  tbody.innerHTML = rows.length ? rows.map(t => `<tr>
    <td class="id-cell">${escHtml(t.id)}</td>
    <td><span class="badge badge-teal">${escHtml(t.type)}</span></td>
    <td class="amt-cell">₹${fmtNum(t.amount)}</td>
    <td style="max-width:200px">${escHtml(t.description)}</td>
    <td>${escHtml(t.party)}</td>
    <td>${statusBadge(t.status)}</td>
    <td class="no-wrap">${fmtDate(t.date)}</td>
    <td><div class="actions">
      <button class="btn btn-warning btn-xs" onclick="showEditTransactionModal('${t.id}')"><i class="fas fa-pen"></i></button>
      <button class="btn btn-danger btn-xs" onclick="confirmDelete('transactions','${t.id}','Transaction','finance')"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('') : `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text4)">No transactions found</td></tr>`;
}

function filterFinance(val) { window._financeSearch = val; renderFinanceTable(APP.data.transactions||[]); }
function filterFinanceStatus(val) { window._financeStatus = val; renderFinanceTable(APP.data.transactions||[]); }
function filterFinanceType(val) { window._financeType = val; renderFinanceTable(APP.data.transactions||[]); }

function getTransactionForm(t) {
  return `<form id="txnForm" class="form-grid">
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Transaction Type <span class="required">*</span></label>
        <select name="type" required>
          <option ${t&&t.type==='Commission'?'selected':''}>Commission</option>
          <option ${t&&t.type==='Pharmacy Payout'?'selected':''}>Pharmacy Payout</option>
          <option ${t&&t.type==='Doctor Fee'?'selected':''}>Doctor Fee</option>
          <option ${t&&t.type==='Refund'?'selected':''}>Refund</option>
          <option ${t&&t.type==='Escrow Hold'?'selected':''}>Escrow Hold</option>
          <option ${t&&t.type==='Delivery Payout'?'selected':''}>Delivery Payout</option>
          <option ${t&&t.type==='Dispute'?'selected':''}>Dispute</option>
        </select></div>
      <div class="form-group"><label>Amount (₹) <span class="required">*</span></label>
        <input name="amount" type="number" min="0" value="${t?t.amount:''}" required></div>
    </div>
    <div class="form-group"><label>Description</label><input name="description" value="${t?escHtml(t.description):''}" placeholder="e.g. Order #ORD-8821 commission"></div>
    <div class="form-group"><label>Party / Entity</label><input name="party" value="${t?escHtml(t.party):''}" placeholder="e.g. MediPlus Pharmacy"></div>
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Status</label>
        <select name="status">
          <option ${t&&t.status==='Held'?'selected':''}>Held</option>
          <option ${t&&t.status==='Released'?'selected':''}>Released</option>
          <option ${t&&t.status==='Refunded'?'selected':''}>Refunded</option>
          <option ${t&&t.status==='Pending'?'selected':''}>Pending</option>
        </select></div>
      <div class="form-group"><label>Date</label><input name="date" type="date" value="${t?t.date:new Date().toISOString().split('T')[0]}"></div>
    </div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary"><i class="fas fa-check"></i> Save</button></div>
  </form>`;
}

function showAddTransactionModal() {
  APP.editingId = null;
  showModal('Add Transaction', getTransactionForm(null));
  document.getElementById('txnForm').onsubmit = (e) => { e.preventDefault(); submitTransactionForm(e.target); };
}
function showEditTransactionModal(id) {
  const t = APP.data.transactions.find(x => x.id === id);
  if (!t) return;
  APP.editingId = id;
  showModal('Edit Transaction', getTransactionForm(t));
  document.getElementById('txnForm').onsubmit = (e) => { e.preventDefault(); submitTransactionForm(e.target); };
}
function submitTransactionForm(form) {
  const d = Object.fromEntries(new FormData(form));
  if (APP.editingId) { editItem('transactions', APP.editingId, d); showToast('Transaction updated', 'success'); }
  else { addItem('transactions', d); showToast('Transaction added', 'success'); }
  closeModal(); navigate('finance');
}

function downloadFinanceCSV() {
  const txns = APP.data.transactions || [];
  const headers = ['ID','Type','Amount','Description','Party','Status','Date'];
  const rows = txns.map(t => [t.id, t.type, t.amount, `"${t.description}"`, `"${t.party}"`, t.status, t.date]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'rxphysis_transactions.csv'; a.click();
  URL.revokeObjectURL(url);
  addAudit('EXPORT', 'finance', 'Downloaded Finance CSV');
  showToast('CSV downloaded', 'success');
}

/* ========== SECTION: MEDICINES ========== */
function renderMedicines() {
  const el = document.getElementById('section-medicines');
  if (!el) return;
  const meds = APP.data.medicines || [];
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Medicine Master Control</div><div class="sec-sub">Manage medicines, schedules, and substitution rules</div></div>
      <div class="sec-actions">
        <button class="btn btn-secondary btn-sm" onclick="showToast('Batch upload UI coming soon','info')"><i class="fas fa-upload"></i> Batch Upload</button>
        <button class="btn btn-primary btn-sm" onclick="showAddMedicineModal()"><i class="fas fa-plus"></i> Add Medicine</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="filter-bar" style="margin:0">
          <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search medicines..." oninput="filterMedicines(this.value)"></div>
          <select onchange="filterMedSchedule(this.value)"><option value="">All Schedules</option><option>H</option><option>H1</option><option>X</option><option>OTC</option></select>
          <select onchange="filterMedRisk(this.value)"><option value="">All</option><option value="1">High Risk Only</option></select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Name</th><th>Salt</th><th>Strength</th><th>Category</th><th>Schedule</th><th>High Risk</th><th>Sub Allowed</th><th>Temp Sensitive</th><th>MRP</th><th>Actions</th></tr></thead>
          <tbody id="medsTbody"></tbody>
        </table>
      </div>
    </div>`;
  window._medsSearch=''; window._medsSchedule=''; window._medsRisk='';
  renderMedsTable(meds);
}
window._medsSearch=''; window._medsSchedule=''; window._medsRisk='';
function renderMedsTable(data) {
  let rows = data;
  if (window._medsSearch) rows = filterData(rows, window._medsSearch, ['name','salt','category','manufacturer','generic']);
  if (window._medsSchedule) rows = rows.filter(r => r.schedule === window._medsSchedule);
  if (window._medsRisk) rows = rows.filter(r => r.highRisk === true || r.highRisk === 'true');
  const tbody = document.getElementById('medsTbody');
  if (!tbody) return;
  tbody.innerHTML = rows.map(m => `<tr>
    <td class="name-cell">${escHtml(m.name)}</td>
    <td style="font-size:12px">${escHtml(m.salt)}</td>
    <td><strong>${escHtml(m.strength)}</strong></td>
    <td>${escHtml(m.category)}</td>
    <td>${statusBadge(m.schedule==='X'?'Escalated':m.schedule==='H1'?'Pending':m.schedule==='H'?'Info':m.schedule)} <small>${m.schedule}</small></td>
    <td>${m.highRisk===true||m.highRisk==='true'?'<span class="badge badge-danger"><i class="fas fa-skull-crossbones"></i> High Risk</span>':'<span class="badge badge-active">No</span>'}</td>
    <td>${yesNo(m.substitutionAllowed)}</td>
    <td>${yesNo(m.tempSensitive,'info','active')}</td>
    <td>₹${m.mrp||'—'}</td>
    <td><div class="actions">
      <button class="btn btn-info btn-xs" onclick="showEditMedicineModal('${m.id}')"><i class="fas fa-pen"></i></button>
      <button class="btn btn-danger btn-xs" onclick="confirmDelete('medicines','${m.id}','Medicine','medicines')"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('') || '<tr><td colspan="10" style="text-align:center;padding:40px;color:var(--text4)">No medicines found</td></tr>';
}
function filterMedicines(v) { window._medsSearch=v; renderMedsTable(APP.data.medicines||[]); }
function filterMedSchedule(v) { window._medsSchedule=v; renderMedsTable(APP.data.medicines||[]); }
function filterMedRisk(v) { window._medsRisk=v; renderMedsTable(APP.data.medicines||[]); }

function getMedForm(m) {
  return `<form id="medForm" class="form-grid">
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Medicine Name *</label><input name="name" value="${m?escHtml(m.name):''}" required></div>
      <div class="form-group"><label>Salt / Composition *</label><input name="salt" value="${m?escHtml(m.salt):''}" required></div>
    </div>
    <div class="form-grid form-grid-3">
      <div class="form-group"><label>Strength</label><input name="strength" value="${m?escHtml(m.strength):''}"></div>
      <div class="form-group"><label>Category</label><input name="category" value="${m?escHtml(m.category):''}"></div>
      <div class="form-group"><label>Schedule</label><select name="schedule"><option ${m&&m.schedule==='H'?'selected':''}>H</option><option ${m&&m.schedule==='H1'?'selected':''}>H1</option><option ${m&&m.schedule==='X'?'selected':''}>X</option><option ${m&&m.schedule==='OTC'?'selected':''}>OTC</option></select></div>
    </div>
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Manufacturer</label><input name="manufacturer" value="${m?escHtml(m.manufacturer):''}"></div>
      <div class="form-group"><label>MRP (₹)</label><input name="mrp" type="number" value="${m?m.mrp:''}"></div>
    </div>
    <div class="form-group"><label>Generic Mapping</label><input name="generic" value="${m?escHtml(m.generic):''}"></div>
    <div style="display:flex;gap:20px;flex-wrap:wrap">
      <div class="form-check"><input type="checkbox" name="highRisk" id="chkHighRisk" ${m&&(m.highRisk===true||m.highRisk==='true')?'checked':''}><label for="chkHighRisk">High Risk Drug</label></div>
      <div class="form-check"><input type="checkbox" name="substitutionAllowed" id="chkSub" ${m&&(m.substitutionAllowed===true||m.substitutionAllowed==='true')?'checked':''}><label for="chkSub">Substitution Allowed</label></div>
      <div class="form-check"><input type="checkbox" name="tempSensitive" id="chkTemp" ${m&&(m.tempSensitive===true||m.tempSensitive==='true')?'checked':''}><label for="chkTemp">Temperature Sensitive</label></div>
    </div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary"><i class="fas fa-check"></i> Save</button></div>
  </form>`;
}
function showAddMedicineModal() { APP.editingId=null; showModal('Add Medicine', getMedForm(null),'modal-lg'); document.getElementById('medForm').onsubmit=(e)=>{e.preventDefault();submitMedForm(e.target);}; }
function showEditMedicineModal(id) {
  const m = APP.data.medicines.find(x=>x.id===id);
  if (!m) return;
  APP.editingId=id; showModal('Edit Medicine', getMedForm(m),'modal-lg');
  document.getElementById('medForm').onsubmit=(e)=>{e.preventDefault();submitMedForm(e.target);};
}
function submitMedForm(form) {
  const d = Object.fromEntries(new FormData(form));
  d.highRisk = form.querySelector('[name=highRisk]').checked;
  d.substitutionAllowed = form.querySelector('[name=substitutionAllowed]').checked;
  d.tempSensitive = form.querySelector('[name=tempSensitive]').checked;
  if (APP.editingId) { editItem('medicines',APP.editingId,d); showToast('Medicine updated','success'); }
  else { addItem('medicines',d); showToast('Medicine added','success'); }
  closeModal(); navigate('medicines');
}

/* ========== SECTION: PRESCRIPTIONS ========== */
function renderPrescriptions() {
  const el = document.getElementById('section-prescriptions');
  if (!el) return;
  const rxs = APP.data.prescriptions || [];
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Prescription Monitoring</div><div class="sec-sub">Verify, flag, and audit all prescriptions</div></div>
      <div class="sec-actions">
        <button class="btn btn-primary btn-sm" onclick="showAddRxModal()"><i class="fas fa-plus"></i> Add Prescription</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="filter-bar" style="margin:0">
          <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search prescriptions..." oninput="filterRx(this.value)"></div>
          <select onchange="filterRxStatus(this.value)"><option value="">All Status</option><option>Verified</option><option>Pending</option><option>Flagged</option><option>Rejected</option></select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>RX ID</th><th>Patient</th><th>Doctor</th><th>Pharmacist</th><th>Medicines</th><th>Date</th><th>Status</th><th>Flag Reason</th><th>Actions</th></tr></thead>
          <tbody id="rxTbody"></tbody>
        </table>
      </div>
    </div>`;
  window._rxSearch=''; window._rxStatus='';
  renderRxTable(rxs);
}
window._rxSearch=''; window._rxStatus='';
function renderRxTable(data) {
  let rows = data;
  if (window._rxSearch) rows = filterData(rows, window._rxSearch, ['id','patient','doctor','pharmacist','medicines']);
  if (window._rxStatus) rows = rows.filter(r => r.status === window._rxStatus);
  const tbody = document.getElementById('rxTbody');
  if (!tbody) return;
  tbody.innerHTML = rows.map(r => `<tr>
    <td class="id-cell">${escHtml(r.id)}</td>
    <td class="name-cell">${escHtml(r.patient)}</td>
    <td>${escHtml(r.doctor)}</td>
    <td style="font-size:12px">${escHtml(r.pharmacist)}</td>
    <td style="max-width:160px;font-size:12px">${escHtml(r.medicines)}</td>
    <td class="no-wrap">${fmtDate(r.date)}</td>
    <td>${statusBadge(r.status)}</td>
    <td style="max-width:140px;font-size:11px;color:var(--error)">${escHtml(r.flagReason||'—')}</td>
    <td><div class="actions">
      <button class="btn btn-info btn-xs" onclick="viewRxModal('${r.id}')"><i class="fas fa-eye"></i></button>
      <button class="btn btn-warning btn-xs" onclick="toggleRxFlag('${r.id}')" title="${r.status==='Flagged'?'Unflag':'Flag'}"><i class="fas fa-flag"></i></button>
      <button class="btn btn-success btn-xs" onclick="setRxStatus('${r.id}','Verified')"><i class="fas fa-check"></i></button>
      <button class="btn btn-danger btn-xs" onclick="confirmDelete('prescriptions','${r.id}','Prescription','prescriptions')"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('') || '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text4)">No prescriptions found</td></tr>';
}
function filterRx(v) { window._rxSearch=v; renderRxTable(APP.data.prescriptions||[]); }
function filterRxStatus(v) { window._rxStatus=v; renderRxTable(APP.data.prescriptions||[]); }
function toggleRxFlag(id) {
  const rx = APP.data.prescriptions.find(x=>x.id===id);
  if (!rx) return;
  if (rx.status==='Flagged') { editItem('prescriptions',id,{status:'Pending',flagReason:''}); showToast('Prescription unflagged','success'); }
  else { editItem('prescriptions',id,{status:'Flagged',flagReason:'Manually flagged by admin'}); showToast('Prescription flagged','warning'); }
  navigate('prescriptions');
}
function setRxStatus(id,status) {
  editItem('prescriptions',id,{status}); showToast(`Status set to ${status}`,'success'); navigate('prescriptions');
}
function viewRxModal(id) {
  const r = APP.data.prescriptions.find(x=>x.id===id);
  if (!r) return;
  showModal('Prescription Details — ' + r.id, `
    <div class="form-grid">
      <div class="grid-2">
        <div><label class="text-sm fw-600 text-muted">Patient</label><p class="fw-600">${escHtml(r.patient)}</p></div>
        <div><label class="text-sm fw-600 text-muted">Doctor</label><p class="fw-600">${escHtml(r.doctor)}</p></div>
        <div><label class="text-sm fw-600 text-muted">Pharmacist</label><p>${escHtml(r.pharmacist)}</p></div>
        <div><label class="text-sm fw-600 text-muted">Date</label><p>${fmtDate(r.date)}</p></div>
        <div><label class="text-sm fw-600 text-muted">Status</label><p>${statusBadge(r.status)}</p></div>
      </div>
      <div><label class="text-sm fw-600 text-muted">Medicines</label><p style="background:var(--bg);padding:10px;border-radius:8px;font-size:13px">${escHtml(r.medicines)}</p></div>
      <div><label class="text-sm fw-600 text-muted">Notes</label><p>${escHtml(r.notes||'—')}</p></div>
      ${r.flagReason?`<div class="alert alert-danger"><i class="fas fa-flag alert-icon"></i><div class="alert-body"><div class="alert-title">Flag Reason</div><div class="alert-sub">${escHtml(r.flagReason)}</div></div></div>`:''}
      <div class="form-footer">
        <button class="btn btn-warning" onclick="toggleRxFlag('${r.id}');closeModal()">${r.status==='Flagged'?'<i class="fas fa-flag-checkered"></i> Unflag':'<i class="fas fa-flag"></i> Flag'}</button>
        <button class="btn btn-success" onclick="setRxStatus('${r.id}','Verified');closeModal()"><i class="fas fa-check"></i> Verify</button>
        <button class="btn btn-secondary" onclick="closeModal()">Close</button>
      </div>
    </div>
  `, 'modal-lg');
}
function showAddRxModal() {
  APP.editingId=null;
  showModal('Add Prescription', `<form id="rxForm" class="form-grid">
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Patient Name *</label><input name="patient" required></div>
      <div class="form-group"><label>Doctor *</label><input name="doctor" required></div>
      <div class="form-group"><label>Pharmacist</label><input name="pharmacist"></div>
      <div class="form-group"><label>Date</label><input name="date" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
    </div>
    <div class="form-group"><label>Medicines *</label><textarea name="medicines" rows="2" required></textarea></div>
    <div class="form-group"><label>Notes</label><textarea name="notes" rows="2"></textarea></div>
    <div class="form-group"><label>Status</label><select name="status"><option>Pending</option><option>Verified</option><option>Flagged</option><option>Rejected</option></select></div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
  </form>`,'modal-lg');
  document.getElementById('rxForm').onsubmit=(e)=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));d.flagReason='';addItem('prescriptions',d);showToast('Prescription added','success');closeModal();navigate('prescriptions');};
}

/* ========== SECTION: DOCTORS ========== */
function renderDoctors() {
  const el = document.getElementById('section-doctors');
  if (!el) return;
  const docs = APP.data.doctors || [];
  const stats = { active: docs.filter(d=>d.status==='Active').length, suspended: docs.filter(d=>d.status==='Suspended').length, pending: docs.filter(d=>d.status==='Pending').length, overp: docs.filter(d=>d.overprescribing===true||d.overprescribing==='true').length };
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Doctor Management</div><div class="sec-sub">Manage doctor licenses, approvals, and prescribing analytics</div></div>
      <div class="sec-actions">
        <button class="btn btn-primary btn-sm" onclick="showAddDoctorModal()"><i class="fas fa-plus"></i> Add Doctor</button>
      </div>
    </div>
    <div class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon green"><i class="fas fa-user-check"></i></div></div><div class="stat-value">${stats.active}</div><div class="stat-label">Active Doctors</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon amber"><i class="fas fa-clock"></i></div></div><div class="stat-value">${stats.pending}</div><div class="stat-label">Pending Approval</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon red"><i class="fas fa-user-xmark"></i></div></div><div class="stat-value">${stats.suspended}</div><div class="stat-label">Suspended</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon red"><i class="fas fa-triangle-exclamation"></i></div></div><div class="stat-value">${stats.overp}</div><div class="stat-label">Overprescribing Flags</div></div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="filter-bar" style="margin:0">
          <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search doctors..." oninput="filterDoctors(this.value)"></div>
          <select onchange="filterDocStatus(this.value)"><option value="">All Status</option><option>Active</option><option>Suspended</option><option>Pending</option></select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Name</th><th>Specialty</th><th>License</th><th>City</th><th>Prescriptions</th><th>Verified</th><th>Overprescribing</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="docsTbody"></tbody>
        </table>
      </div>
    </div>`;
  window._docsSearch=''; window._docsStatus='';
  renderDocsTable(docs);
}
window._docsSearch=''; window._docsStatus='';
function renderDocsTable(data) {
  let rows = data;
  if (window._docsSearch) rows = filterData(rows, window._docsSearch, ['name','specialty','license','city','email']);
  if (window._docsStatus) rows = rows.filter(r => r.status === window._docsStatus);
  const tbody = document.getElementById('docsTbody');
  if (!tbody) return;
  tbody.innerHTML = rows.map(d => `<tr>
    <td><div class="name-cell">${escHtml(d.name)}</div><div style="font-size:11px;color:var(--text4)">${escHtml(d.email)}</div></td>
    <td>${escHtml(d.specialty)}</td>
    <td class="id-cell">${escHtml(d.license)}</td>
    <td>${escHtml(d.city)}</td>
    <td class="num-cell">${d.prescCount}</td>
    <td>${d.licenseVerified===true||d.licenseVerified==='true'?'<span class="badge badge-active"><i class="fas fa-shield-check"></i> Verified</span>':'<span class="badge badge-pending">Pending</span>'}</td>
    <td>${d.overprescribing===true||d.overprescribing==='true'?'<span class="badge badge-danger"><i class="fas fa-triangle-exclamation"></i> Flagged</span>':'<span class="badge badge-active">Normal</span>'}</td>
    <td>${statusBadge(d.status)}</td>
    <td><div class="actions">
      ${d.status!=='Active'?`<button class="btn btn-success btn-xs" onclick="setDocStatus('${d.id}','Active')">Activate</button>`:''}
      ${d.status==='Active'?`<button class="btn btn-warning btn-xs" onclick="setDocStatus('${d.id}','Suspended')">Suspend</button>`:''}
      <button class="btn btn-info btn-xs" onclick="showEditDoctorModal('${d.id}')"><i class="fas fa-pen"></i></button>
      <button class="btn btn-danger btn-xs" onclick="confirmDelete('doctors','${d.id}','Doctor','doctors')"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('') || '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text4)">No doctors found</td></tr>';
}
function filterDoctors(v) { window._docsSearch=v; renderDocsTable(APP.data.doctors||[]); }
function filterDocStatus(v) { window._docsStatus=v; renderDocsTable(APP.data.doctors||[]); }
function setDocStatus(id, status) {
  editItem('doctors',id,{status});
  showToast(`Doctor ${status==='Active'?'activated':'suspended'}`,'success');
  navigate('doctors');
}
function getDoctorForm(d) {
  return `<form id="docForm" class="form-grid">
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Full Name *</label><input name="name" value="${d?escHtml(d.name):''}" required></div>
      <div class="form-group"><label>Specialty *</label><input name="specialty" value="${d?escHtml(d.specialty):''}" required></div>
      <div class="form-group"><label>License Number</label><input name="license" value="${d?escHtml(d.license):''}"></div>
      <div class="form-group"><label>City</label><input name="city" value="${d?escHtml(d.city):''}"></div>
      <div class="form-group"><label>Phone</label><input name="phone" value="${d?escHtml(d.phone):''}"></div>
      <div class="form-group"><label>Email</label><input name="email" type="email" value="${d?escHtml(d.email):''}"></div>
      <div class="form-group"><label>Status</label><select name="status"><option ${d&&d.status==='Active'?'selected':''}>Active</option><option ${d&&d.status==='Suspended'?'selected':''}>Suspended</option><option ${d&&d.status==='Pending'?'selected':''}>Pending</option></select></div>
      <div class="form-group"><label>Join Date</label><input name="joinDate" type="date" value="${d?d.joinDate:new Date().toISOString().split('T')[0]}"></div>
    </div>
    <div style="display:flex;gap:20px">
      <div class="form-check"><input type="checkbox" name="licenseVerified" id="chkLV" ${d&&(d.licenseVerified===true||d.licenseVerified==='true')?'checked':''}><label for="chkLV">License Verified</label></div>
      <div class="form-check"><input type="checkbox" name="overprescribing" id="chkOP" ${d&&(d.overprescribing===true||d.overprescribing==='true')?'checked':''}><label for="chkOP">Flag Overprescribing</label></div>
    </div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
  </form>`;
}
function showAddDoctorModal() { APP.editingId=null; showModal('Add Doctor', getDoctorForm(null),'modal-lg'); document.getElementById('docForm').onsubmit=(e)=>{e.preventDefault();submitDoctorForm(e.target);}; }
function showEditDoctorModal(id) {
  const d = APP.data.doctors.find(x=>x.id===id); if(!d) return;
  APP.editingId=id; showModal('Edit Doctor', getDoctorForm(d),'modal-lg');
  document.getElementById('docForm').onsubmit=(e)=>{e.preventDefault();submitDoctorForm(e.target);};
}
function submitDoctorForm(form) {
  const d = Object.fromEntries(new FormData(form));
  d.licenseVerified = form.querySelector('[name=licenseVerified]').checked;
  d.overprescribing = form.querySelector('[name=overprescribing]').checked;
  d.prescCount = APP.editingId ? (APP.data.doctors.find(x=>x.id===APP.editingId)||{}).prescCount || 0 : 0;
  if (APP.editingId) { editItem('doctors',APP.editingId,d); showToast('Doctor updated','success'); }
  else { addItem('doctors',d); showToast('Doctor added','success'); }
  closeModal(); navigate('doctors');
}

/* ========== SECTION: PHARMACIES ========== */
function renderPharmacies() {
  const el = document.getElementById('section-pharmacies');
  if (!el) return;
  const pharms = APP.data.pharmacies || [];
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Pharmacy Management</div><div class="sec-sub">Manage pharmacy licenses, commissions, and performance</div></div>
      <div class="sec-actions">
        <button class="btn btn-primary btn-sm" onclick="showAddPharmacyModal()"><i class="fas fa-plus"></i> Add Pharmacy</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="filter-bar" style="margin:0">
          <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search pharmacies..." oninput="filterPharmacies(this.value)"></div>
          <select onchange="filterPharmStatus(this.value)"><option value="">All Status</option><option>Active</option><option>Suspended</option><option>Pending</option><option>Blacklisted</option></select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Name</th><th>License</th><th>Owner</th><th>City</th><th>Commission %</th><th>Rating</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="pharmTbody"></tbody>
        </table>
      </div>
    </div>`;
  window._pharmSearch=''; window._pharmStatus='';
  renderPharmTable(pharms);
}
window._pharmSearch=''; window._pharmStatus='';
function renderPharmTable(data) {
  let rows = data;
  if (window._pharmSearch) rows = filterData(rows, window._pharmSearch, ['name','license','ownerName','city']);
  if (window._pharmStatus) rows = rows.filter(r => r.status === window._pharmStatus);
  const tbody = document.getElementById('pharmTbody');
  if (!tbody) return;
  tbody.innerHTML = rows.map(p => `<tr>
    <td class="name-cell">${escHtml(p.name)}</td>
    <td class="id-cell">${escHtml(p.license)}</td>
    <td>${escHtml(p.ownerName)}</td>
    <td>${escHtml(p.city)}</td>
    <td><input type="number" value="${p.commission}" min="0" max="30" style="width:60px;padding:4px 6px;border:1px solid var(--border);border-radius:6px;font-size:12px" onchange="updateCommission('${p.id}',this.value)"> %</td>
    <td>${parseFloat(p.rating)>0?'⭐ '+p.rating:'—'}</td>
    <td>${statusBadge(p.stockStatus)}</td>
    <td>${statusBadge(p.status)}</td>
    <td><div class="actions">
      ${p.status!=='Active'?`<button class="btn btn-success btn-xs" onclick="setPharmStatus('${p.id}','Active')">Approve</button>`:''}
      ${p.status==='Active'?`<button class="btn btn-warning btn-xs" onclick="setPharmStatus('${p.id}','Suspended')">Suspend</button>`:''}
      ${p.status!=='Blacklisted'?`<button class="btn btn-danger btn-xs" onclick="setPharmStatus('${p.id}','Blacklisted')">Blacklist</button>`:''}
      <button class="btn btn-info btn-xs" onclick="showEditPharmacyModal('${p.id}')"><i class="fas fa-pen"></i></button>
      <button class="btn btn-danger btn-xs" onclick="confirmDelete('pharmacies','${p.id}','Pharmacy','pharmacies')"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('') || '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text4)">No pharmacies found</td></tr>';
}
function filterPharmacies(v) { window._pharmSearch=v; renderPharmTable(APP.data.pharmacies||[]); }
function filterPharmStatus(v) { window._pharmStatus=v; renderPharmTable(APP.data.pharmacies||[]); }
function setPharmStatus(id, status) { editItem('pharmacies',id,{status}); showToast(`Pharmacy ${status}`,'success'); navigate('pharmacies'); }
function updateCommission(id, val) { editItem('pharmacies',id,{commission:parseFloat(val)||0}); addAudit('EDIT','pharmacies',`Commission updated for ${id}: ${val}%`); showToast('Commission updated','success'); }
function getPharmForm(p) {
  return `<form id="pharmForm" class="form-grid">
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Pharmacy Name *</label><input name="name" value="${p?escHtml(p.name):''}" required></div>
      <div class="form-group"><label>License Number</label><input name="license" value="${p?escHtml(p.license):''}"></div>
      <div class="form-group"><label>Owner Name</label><input name="ownerName" value="${p?escHtml(p.ownerName):''}"></div>
      <div class="form-group"><label>City</label><input name="city" value="${p?escHtml(p.city):''}"></div>
      <div class="form-group"><label>Phone</label><input name="phone" value="${p?escHtml(p.phone):''}"></div>
      <div class="form-group"><label>Commission %</label><input name="commission" type="number" min="0" max="30" value="${p?p.commission:12}"></div>
      <div class="form-group"><label>Status</label><select name="status"><option ${p&&p.status==='Active'?'selected':''}>Active</option><option ${p&&p.status==='Suspended'?'selected':''}>Suspended</option><option ${p&&p.status==='Pending'?'selected':''}>Pending</option><option ${p&&p.status==='Blacklisted'?'selected':''}>Blacklisted</option></select></div>
      <div class="form-group"><label>Stock Status</label><select name="stockStatus"><option ${p&&p.stockStatus==='Well Stocked'?'selected':''}>Well Stocked</option><option ${p&&p.stockStatus==='Low Stock'?'selected':''}>Low Stock</option><option ${p&&p.stockStatus==='Out of Stock'?'selected':''}>Out of Stock</option></select></div>
    </div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
  </form>`;
}
function showAddPharmacyModal() { APP.editingId=null; showModal('Add Pharmacy',getPharmForm(null),'modal-lg'); document.getElementById('pharmForm').onsubmit=(e)=>{e.preventDefault();submitPharmForm(e.target);}; }
function showEditPharmacyModal(id) {
  const p=APP.data.pharmacies.find(x=>x.id===id); if(!p) return;
  APP.editingId=id; showModal('Edit Pharmacy',getPharmForm(p),'modal-lg');
  document.getElementById('pharmForm').onsubmit=(e)=>{e.preventDefault();submitPharmForm(e.target);};
}
function submitPharmForm(form) {
  const d=Object.fromEntries(new FormData(form)); d.rating=APP.editingId?(APP.data.pharmacies.find(x=>x.id===APP.editingId)||{}).rating||0:0;
  if(APP.editingId){editItem('pharmacies',APP.editingId,d);showToast('Pharmacy updated','success');}
  else{addItem('pharmacies',d);showToast('Pharmacy added','success');}
  closeModal(); navigate('pharmacies');
}

/* ========== SECTION: DELIVERY ========== */
function renderDelivery() {
  const el = document.getElementById('section-delivery');
  if (!el) return;
  const partners = APP.data.delivery || [];
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Delivery Management</div><div class="sec-sub">Manage delivery partners, BGV, and performance</div></div>
      <div class="sec-actions">
        <button class="btn btn-primary btn-sm" onclick="showAddDeliveryModal()"><i class="fas fa-plus"></i> Add Partner</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="filter-bar" style="margin:0">
          <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search partners..." oninput="filterDelivery(this.value)"></div>
          <select onchange="filterDelivStatus(this.value)"><option value="">All Status</option><option>Active</option><option>Suspended</option></select>
          <select onchange="filterDelivBGV(this.value)"><option value="">All BGV</option><option>Verified</option><option>Pending</option><option>Failed</option></select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Name</th><th>City</th><th>BGV Status</th><th>Performance</th><th>Failed Deliveries</th><th>Earnings</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="delivTbody"></tbody>
        </table>
      </div>
    </div>`;
  window._delivSearch=''; window._delivStatus=''; window._delivBGV='';
  renderDelivTable(partners);
}
window._delivSearch=''; window._delivStatus=''; window._delivBGV='';
function renderDelivTable(data) {
  let rows = data;
  if (window._delivSearch) rows = filterData(rows, window._delivSearch, ['name','city','phone']);
  if (window._delivStatus) rows = rows.filter(r => r.status === window._delivStatus);
  if (window._delivBGV) rows = rows.filter(r => r.bgvStatus === window._delivBGV);
  const tbody = document.getElementById('delivTbody');
  if (!tbody) return;
  const perfColor = v => v>=90?'var(--success)':v>=75?'var(--c4)':v>=60?'var(--warning)':'var(--error)';
  tbody.innerHTML = rows.map(d => `<tr>
    <td><div class="name-cell">${escHtml(d.name)}</div><div style="font-size:11px;color:var(--text4)">${escHtml(d.phone)}</div></td>
    <td>${escHtml(d.city)}</td>
    <td>${statusBadge(d.bgvStatus)}</td>
    <td><span style="font-weight:700;color:${perfColor(d.performance)}">${d.performance}%</span></td>
    <td><span style="color:${d.failedDeliveries>15?'var(--error)':d.failedDeliveries>8?'var(--warning)':'var(--text2)'};font-weight:600">${d.failedDeliveries}</span></td>
    <td>₹${fmtNum(d.earnings)}</td>
    <td>${statusBadge(d.status)}</td>
    <td><div class="actions">
      ${d.status!=='Active'?`<button class="btn btn-success btn-xs" onclick="setDelivStatus('${d.id}','Active')">Activate</button>`:`<button class="btn btn-warning btn-xs" onclick="setDelivStatus('${d.id}','Suspended')">Suspend</button>`}
      <button class="btn btn-info btn-xs" onclick="showEditDeliveryModal('${d.id}')"><i class="fas fa-pen"></i></button>
      <button class="btn btn-danger btn-xs" onclick="confirmDelete('delivery','${d.id}','Delivery Partner','delivery')"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('') || '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text4)">No partners found</td></tr>';
}
function filterDelivery(v) { window._delivSearch=v; renderDelivTable(APP.data.delivery||[]); }
function filterDelivStatus(v) { window._delivStatus=v; renderDelivTable(APP.data.delivery||[]); }
function filterDelivBGV(v) { window._delivBGV=v; renderDelivTable(APP.data.delivery||[]); }
function setDelivStatus(id,status) { editItem('delivery',id,{status}); showToast(`Partner ${status}`,'success'); navigate('delivery'); }
function getDelivForm(d) {
  return `<form id="delivForm" class="form-grid">
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Name *</label><input name="name" value="${d?escHtml(d.name):''}" required></div>
      <div class="form-group"><label>City</label><input name="city" value="${d?escHtml(d.city):''}"></div>
      <div class="form-group"><label>Phone</label><input name="phone" value="${d?escHtml(d.phone):''}"></div>
      <div class="form-group"><label>BGV Status</label><select name="bgvStatus"><option ${d&&d.bgvStatus==='Verified'?'selected':''}>Verified</option><option ${d&&d.bgvStatus==='Pending'?'selected':''}>Pending</option><option ${d&&d.bgvStatus==='Failed'?'selected':''}>Failed</option></select></div>
      <div class="form-group"><label>Performance %</label><input name="performance" type="number" min="0" max="100" value="${d?d.performance:80}"></div>
      <div class="form-group"><label>Failed Deliveries</label><input name="failedDeliveries" type="number" min="0" value="${d?d.failedDeliveries:0}"></div>
      <div class="form-group"><label>Earnings (₹)</label><input name="earnings" type="number" min="0" value="${d?d.earnings:0}"></div>
      <div class="form-group"><label>Status</label><select name="status"><option ${d&&d.status==='Active'?'selected':''}>Active</option><option ${d&&d.status==='Suspended'?'selected':''}>Suspended</option></select></div>
    </div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
  </form>`;
}
function showAddDeliveryModal() { APP.editingId=null; showModal('Add Delivery Partner',getDelivForm(null),'modal-lg'); document.getElementById('delivForm').onsubmit=(e)=>{e.preventDefault();submitDelivForm(e.target);}; }
function showEditDeliveryModal(id) {
  const d=APP.data.delivery.find(x=>x.id===id); if(!d) return;
  APP.editingId=id; showModal('Edit Delivery Partner',getDelivForm(d),'modal-lg');
  document.getElementById('delivForm').onsubmit=(e)=>{e.preventDefault();submitDelivForm(e.target);};
}
function submitDelivForm(form) {
  const d=Object.fromEntries(new FormData(form)); d.performance=parseInt(d.performance)||0; d.failedDeliveries=parseInt(d.failedDeliveries)||0; d.earnings=parseFloat(d.earnings)||0;
  if(APP.editingId){editItem('delivery',APP.editingId,d);showToast('Partner updated','success');}
  else{addItem('delivery',d);showToast('Partner added','success');}
  closeModal(); navigate('delivery');
}

/* ========== SECTION: NURSES ========== */
function renderNurses() {
  const el = document.getElementById('section-nurses');
  if (!el) return;
  const nurses = APP.data.nurses || [];
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Nurse / Home Service</div><div class="sec-sub">Manage home care nurses, certifications, and incident tracking</div></div>
      <div class="sec-actions">
        <button class="btn btn-primary btn-sm" onclick="showAddNurseModal()"><i class="fas fa-plus"></i> Add Nurse</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="filter-bar" style="margin:0">
          <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search nurses..." oninput="filterNurses(this.value)"></div>
          <select onchange="filterNurseStatus(this.value)"><option value="">All Status</option><option>Active</option><option>Suspended</option><option>Pending</option></select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Name</th><th>License</th><th>Specialty</th><th>City</th><th>Visits</th><th>Rating</th><th>Incidents</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="nursesTbody"></tbody>
        </table>
      </div>
    </div>`;
  window._nursesSearch=''; window._nursesStatus='';
  renderNursesTable(nurses);
}
window._nursesSearch=''; window._nursesStatus='';
function renderNursesTable(data) {
  let rows = data;
  if (window._nursesSearch) rows = filterData(rows, window._nursesSearch, ['name','license','specialty','city']);
  if (window._nursesStatus) rows = rows.filter(r => r.status === window._nursesStatus);
  const tbody = document.getElementById('nursesTbody');
  if (!tbody) return;
  tbody.innerHTML = rows.map(n => `<tr>
    <td><div class="name-cell">${escHtml(n.name)}</div><div style="font-size:11px;color:var(--text4)">${escHtml(n.email)}</div></td>
    <td class="id-cell">${escHtml(n.license)}</td>
    <td>${escHtml(n.specialty)}</td>
    <td>${escHtml(n.city)}</td>
    <td class="num-cell">${n.visitCount}</td>
    <td>${parseFloat(n.rating)>0?'⭐ '+n.rating:'—'}</td>
    <td><span style="color:${n.incidents>2?'var(--error)':n.incidents>0?'var(--warning)':'var(--success)'};font-weight:700">${n.incidents}</span></td>
    <td>${statusBadge(n.status)}</td>
    <td><div class="actions">
      ${n.status!=='Active'?`<button class="btn btn-success btn-xs" onclick="setNurseStatus('${n.id}','Active')">Activate</button>`:`<button class="btn btn-warning btn-xs" onclick="setNurseStatus('${n.id}','Suspended')">Suspend</button>`}
      <button class="btn btn-info btn-xs" onclick="showEditNurseModal('${n.id}')"><i class="fas fa-pen"></i></button>
      <button class="btn btn-danger btn-xs" onclick="confirmDelete('nurses','${n.id}','Nurse','nurses')"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('') || '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text4)">No nurses found</td></tr>';
}
function filterNurses(v) { window._nursesSearch=v; renderNursesTable(APP.data.nurses||[]); }
function filterNurseStatus(v) { window._nursesStatus=v; renderNursesTable(APP.data.nurses||[]); }
function setNurseStatus(id,status) { editItem('nurses',id,{status}); showToast(`Nurse ${status}`,'success'); navigate('nurses'); }
function getNurseForm(n) {
  return `<form id="nurseForm" class="form-grid">
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Full Name *</label><input name="name" value="${n?escHtml(n.name):''}" required></div>
      <div class="form-group"><label>License</label><input name="license" value="${n?escHtml(n.license):''}"></div>
      <div class="form-group"><label>Specialty</label><input name="specialty" value="${n?escHtml(n.specialty):''}"></div>
      <div class="form-group"><label>City</label><input name="city" value="${n?escHtml(n.city):''}"></div>
      <div class="form-group"><label>Phone</label><input name="phone" value="${n?escHtml(n.phone):''}"></div>
      <div class="form-group"><label>Email</label><input name="email" type="email" value="${n?escHtml(n.email):''}"></div>
      <div class="form-group"><label>Status</label><select name="status"><option ${n&&n.status==='Active'?'selected':''}>Active</option><option ${n&&n.status==='Suspended'?'selected':''}>Suspended</option><option ${n&&n.status==='Pending'?'selected':''}>Pending</option></select></div>
      <div class="form-group"><label>Incidents</label><input name="incidents" type="number" min="0" value="${n?n.incidents:0}"></div>
    </div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
  </form>`;
}
function showAddNurseModal() { APP.editingId=null; showModal('Add Nurse',getNurseForm(null),'modal-lg'); document.getElementById('nurseForm').onsubmit=(e)=>{e.preventDefault();submitNurseForm(e.target);}; }
function showEditNurseModal(id) {
  const n=APP.data.nurses.find(x=>x.id===id); if(!n) return;
  APP.editingId=id; showModal('Edit Nurse',getNurseForm(n),'modal-lg');
  document.getElementById('nurseForm').onsubmit=(e)=>{e.preventDefault();submitNurseForm(e.target);};
}
function submitNurseForm(form) {
  const d=Object.fromEntries(new FormData(form)); d.incidents=parseInt(d.incidents)||0; d.visitCount=APP.editingId?(APP.data.nurses.find(x=>x.id===APP.editingId)||{}).visitCount||0:0; d.rating=APP.editingId?(APP.data.nurses.find(x=>x.id===APP.editingId)||{}).rating||0:0;
  if(APP.editingId){editItem('nurses',APP.editingId,d);showToast('Nurse updated','success');}
  else{addItem('nurses',d);showToast('Nurse added','success');}
  closeModal(); navigate('nurses');
}

/* ========== SECTION: RISK & SAFETY ========== */
function renderRisk() {
  const el = document.getElementById('section-risk');
  if (!el) return;
  const alerts = APP.data.riskAlerts || [];
  const openAlerts = alerts.filter(a => a.status === 'Open');
  const escalated = alerts.filter(a => a.status === 'Escalated');
  const byType = {};
  alerts.forEach(a => { byType[a.type] = (byType[a.type]||0)+1; });
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Risk & Safety Monitoring</div><div class="sec-sub">Monitor high-risk prescriptions, alerts, and suspicious activities</div></div>
      <div class="sec-actions">
        <button class="btn btn-primary btn-sm" onclick="showAddRiskModal()"><i class="fas fa-plus"></i> Add Alert</button>
      </div>
    </div>
    <div class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon red"><i class="fas fa-circle-exclamation"></i></div></div><div class="stat-value">${openAlerts.length}</div><div class="stat-label">Open Alerts</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon amber"><i class="fas fa-arrow-up-right-dots"></i></div></div><div class="stat-value">${escalated.length}</div><div class="stat-label">Escalated</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon red"><i class="fas fa-skull-crossbones"></i></div></div><div class="stat-value">${byType['High-Risk Drug']||0}</div><div class="stat-label">High-Risk Drug Alerts</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon purple"><i class="fas fa-syringe"></i></div></div><div class="stat-value">${byType['Narcotic Alert']||0}</div><div class="stat-label">Narcotic Alerts</div></div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="filter-bar" style="margin:0">
          <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search alerts..." oninput="filterRisk(this.value)"></div>
          <select onchange="filterRiskType(this.value)">
            <option value="">All Types</option>
            <option>High-Risk Drug</option><option>Narcotic Alert</option><option>Duplicate Prescription</option>
            <option>Antibiotic Overuse</option><option>Frequent Refund</option><option>Suspicious Account</option><option>Overprescribing</option>
          </select>
          <select onchange="filterRiskStatus(this.value)"><option value="">All Status</option><option>Open</option><option>Escalated</option><option>Resolved</option></select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>ID</th><th>Type</th><th>Description</th><th>Entity</th><th>Severity</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="riskTbody"></tbody>
        </table>
      </div>
    </div>`;
  window._riskSearch=''; window._riskType=''; window._riskStatus='';
  renderRiskTable(alerts);
}
window._riskSearch=''; window._riskType=''; window._riskStatus='';
function renderRiskTable(data) {
  let rows = data;
  if (window._riskSearch) rows = filterData(rows, window._riskSearch, ['id','description','entity','type']);
  if (window._riskType) rows = rows.filter(r => r.type === window._riskType);
  if (window._riskStatus) rows = rows.filter(r => r.status === window._riskStatus);
  const tbody = document.getElementById('riskTbody');
  if (!tbody) return;
  tbody.innerHTML = rows.map(r => `<tr>
    <td class="id-cell">${escHtml(r.id)}</td>
    <td><span class="badge badge-${r.type.includes('High-Risk')||r.type.includes('Narcotic')?'danger':r.type.includes('Duplicate')||r.type.includes('Overprescribing')?'warning':'purple'}">${escHtml(r.type)}</span></td>
    <td style="max-width:220px;font-size:12px">${escHtml(r.description)}</td>
    <td style="font-size:12px;color:var(--text3)">${escHtml(r.entity)}</td>
    <td>${statusBadge(r.severity)}</td>
    <td class="no-wrap">${fmtDate(r.date)}</td>
    <td>${statusBadge(r.status)}</td>
    <td><div class="actions">
      ${r.status!=='Resolved'?`<button class="btn btn-success btn-xs" onclick="setRiskStatus('${r.id}','Resolved')">Resolve</button>`:''}
      ${r.status==='Open'?`<button class="btn btn-warning btn-xs" onclick="setRiskStatus('${r.id}','Escalated')">Escalate</button>`:''}
      ${r.status!=='Open'?`<button class="btn btn-info btn-xs" onclick="setRiskStatus('${r.id}','Open')">Reopen</button>`:''}
      <button class="btn btn-danger btn-xs" onclick="confirmDelete('riskAlerts','${r.id}','Alert','risk')"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('') || '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text4)">No alerts found</td></tr>';
}
function filterRisk(v) { window._riskSearch=v; renderRiskTable(APP.data.riskAlerts||[]); }
function filterRiskType(v) { window._riskType=v; renderRiskTable(APP.data.riskAlerts||[]); }
function filterRiskStatus(v) { window._riskStatus=v; renderRiskTable(APP.data.riskAlerts||[]); }
function setRiskStatus(id,status) { editItem('riskAlerts',id,{status}); showToast(`Alert ${status}`,'success'); navigate('risk'); }
function showAddRiskModal() {
  APP.editingId=null;
  showModal('Add Risk Alert', `<form id="riskForm" class="form-grid">
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Type *</label><select name="type" required><option>High-Risk Drug</option><option>Narcotic Alert</option><option>Duplicate Prescription</option><option>Antibiotic Overuse</option><option>Frequent Refund</option><option>Suspicious Account</option><option>Overprescribing</option></select></div>
      <div class="form-group"><label>Severity</label><select name="severity"><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div>
    </div>
    <div class="form-group"><label>Entity / Subject</label><input name="entity" placeholder="e.g. Patient: John Doe"></div>
    <div class="form-group"><label>Description *</label><textarea name="description" rows="3" required></textarea></div>
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Status</label><select name="status"><option>Open</option><option>Escalated</option><option>Resolved</option></select></div>
      <div class="form-group"><label>Date</label><input name="date" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
    </div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
  </form>`,'modal-lg');
  document.getElementById('riskForm').onsubmit=(e)=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));addItem('riskAlerts',d);showToast('Alert added','success');closeModal();navigate('risk');};
}

/* ========== SECTION: ANALYTICS ========== */
function renderAnalytics() {
  const el = document.getElementById('section-analytics');
  if (!el) return;
  const meds = APP.data.medicines||[];
  const presc = APP.data.prescriptions||[];
  const pharms = APP.data.pharmacies||[];
  const topSalts = [
    {name:'Metformin HCl',count:1247,pct:100},
    {name:'Atorvastatin Calcium',count:1089,pct:87},
    {name:'Amlodipine Besylate',count:956,pct:77},
    {name:'Pantoprazole Sodium',count:891,pct:71},
    {name:'Paracetamol',count:842,pct:68},
    {name:'Amoxicillin',count:756,pct:61},
    {name:'Losartan Potassium',count:712,pct:57},
    {name:'Levothyroxine Sodium',count:668,pct:54},
    {name:'Rosuvastatin Calcium',count:534,pct:43},
    {name:'Omeprazole',count:498,pct:40}
  ];
  const peakHours = [
    {h:'8AM',v:45},{h:'9AM',v:72},{h:'10AM',v:88},{h:'11AM',v:95},{h:'12PM',v:78},
    {h:'1PM',v:62},{h:'2PM',v:70},{h:'3PM',v:85},{h:'4PM',v:91},{h:'5PM',v:76},{h:'6PM',v:55},{h:'7PM',v:42}
  ];
  const maxPeak = Math.max(...peakHours.map(p=>p.v));
  const diseaseData = [
    {disease:'Type 2 Diabetes',patients:8421,pct:'31%',growth:'+8.2%'},
    {disease:'Hypertension',patients:7654,pct:'28%',growth:'+5.1%'},
    {disease:'Dyslipidemia',patients:5234,pct:'19%',growth:'+6.8%'},
    {disease:'Thyroid Disorders',patients:3412,pct:'12%',growth:'+12.3%'},
    {disease:'Anxiety / Depression',patients:2876,pct:'10%',growth:'+18.5%'}
  ];
  const cityData = [
    {city:'Bengaluru',orders:12841,growth:'+14%',rev:'₹28.4L'},
    {city:'Mumbai',orders:10234,growth:'+11%',rev:'₹24.1L'},
    {city:'Delhi',orders:9876,growth:'+9%',rev:'₹22.3L'},
    {city:'Chennai',orders:7654,growth:'+16%',rev:'₹18.2L'},
    {city:'Hyderabad',orders:6543,growth:'+13%',rev:'₹15.8L'},
    {city:'Pune',orders:4321,growth:'+19%',rev:'₹10.2L'},
    {city:'Kochi',orders:3456,growth:'+22%',rev:'₹8.6L'}
  ];
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Analytics & Intelligence</div><div class="sec-sub">Platform usage insights, trends, and intelligence reports</div></div>
    </div>
    <div class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon teal"><i class="fas fa-rotate"></i></div><span class="stat-trend up">↑ +2.1%</span></div><div class="stat-value">68%</div><div class="stat-label">Patient Repeat Rate</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon green"><i class="fas fa-sack-dollar"></i></div><span class="stat-trend up">↑ +₹124</span></div><div class="stat-value">₹4,280</div><div class="stat-label">Avg Customer LTV</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon blue"><i class="fas fa-cart-shopping"></i></div><span class="stat-trend up">↑ +8%</span></div><div class="stat-value">27,641</div><div class="stat-label">Total Orders (MTD)</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon amber"><i class="fas fa-stopwatch"></i></div><span class="stat-trend flat">— stable</span></div><div class="stat-value">38 min</div><div class="stat-label">Avg Fulfillment Time</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div class="card-title">Top 10 Most Prescribed Salts</div></div>
        <div class="card-body"><div class="bar-chart">
          ${topSalts.map(s=>`<div class="bar-row"><div class="bar-label">${escHtml(s.name)}</div><div class="bar-track"><div class="bar-fill" style="width:${s.pct}%"></div></div><div class="bar-value">${fmtNum(s.count)}</div></div>`).join('')}
        </div></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Peak Order Hours</div></div>
        <div class="card-body">
          <div style="display:flex;align-items:flex-end;gap:8px;height:160px">
            ${peakHours.map(p=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
              <div style="font-size:10px;font-weight:700;color:var(--c5)">${p.v}</div>
              <div style="width:100%;background:linear-gradient(180deg,var(--c3),var(--c5));border-radius:4px 4px 0 0;height:${Math.round(p.v/maxPeak*120)}px"></div>
              <div style="font-size:10px;color:var(--text4)">${p.h}</div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="grid-2" style="margin-top:20px">
      <div class="card">
        <div class="card-header"><div class="card-title">Chronic Disease Clusters</div></div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Condition</th><th>Patients</th><th>% Share</th><th>Growth</th></tr></thead>
            <tbody>${diseaseData.map(d=>`<tr><td class="name-cell">${escHtml(d.disease)}</td><td class="num-cell">${fmtNum(d.patients)}</td><td>${d.pct}</td><td style="color:var(--success);font-weight:600">${d.growth}</td></tr>`).join('')}</tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">City-Based Growth Trends</div></div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>City</th><th>Orders</th><th>Growth</th><th>Revenue</th></tr></thead>
            <tbody>${cityData.map(c=>`<tr><td class="name-cell">${escHtml(c.city)}</td><td class="num-cell">${fmtNum(c.orders)}</td><td style="color:var(--success);font-weight:600">${c.growth}</td><td>${c.rev}</td></tr>`).join('')}</tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:20px">
      <div class="card-header"><div class="card-title">Pharmacy Performance Comparison</div></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Pharmacy</th><th>City</th><th>Commission %</th><th>Rating</th><th>Stock Status</th><th>Status</th></tr></thead>
          <tbody>${(APP.data.pharmacies||[]).filter(p=>p.status==='Active').map(p=>`<tr><td class="name-cell">${escHtml(p.name)}</td><td>${escHtml(p.city)}</td><td class="num-cell">${p.commission}%</td><td>${parseFloat(p.rating)>0?'⭐ '+p.rating:'—'}</td><td>${statusBadge(p.stockStatus)}</td><td>${statusBadge(p.status)}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </div>`;
}

/* ========== SECTION: INVENTORY ========== */
function renderInventory() {
  const el = document.getElementById('section-inventory');
  if (!el) return;
  const inv = APP.data.inventory || [];
  const low = inv.filter(i => i.status==='Low Stock').length;
  const expiring = inv.filter(i => i.status==='Expiring Soon').length;
  const coldChain = inv.filter(i => i.coldChain===true||i.coldChain==='true').length;
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Inventory Control</div><div class="sec-sub">Monitor warehouse stock, expiry, and cold chain items</div></div>
      <div class="sec-actions">
        <button class="btn btn-primary btn-sm" onclick="showAddInventoryModal()"><i class="fas fa-plus"></i> Add Item</button>
      </div>
    </div>
    <div class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon teal"><i class="fas fa-boxes-stacked"></i></div></div><div class="stat-value">${inv.length}</div><div class="stat-label">Total SKUs</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon red"><i class="fas fa-battery-low"></i></div></div><div class="stat-value">${low}</div><div class="stat-label">Low Stock Items</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon amber"><i class="fas fa-calendar-xmark"></i></div></div><div class="stat-value">${expiring}</div><div class="stat-label">Expiring in 30 Days</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon blue"><i class="fas fa-snowflake"></i></div></div><div class="stat-value">${coldChain}</div><div class="stat-label">Cold Chain Items</div></div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="filter-bar" style="margin:0">
          <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search inventory..." oninput="filterInventory(this.value)"></div>
          <select onchange="filterInvStatus(this.value)"><option value="">All Status</option><option>Normal</option><option>Low Stock</option><option>Expiring Soon</option></select>
          <select onchange="filterInvCC(this.value)"><option value="">All</option><option value="1">Cold Chain Only</option></select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Item</th><th>Quantity</th><th>Unit</th><th>Expiry</th><th>Batch</th><th>Cold Chain</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="invTbody"></tbody>
        </table>
      </div>
    </div>`;
  window._invSearch=''; window._invStatus=''; window._invCC='';
  renderInvTable(inv);
}
window._invSearch=''; window._invStatus=''; window._invCC='';
function renderInvTable(data) {
  let rows = data;
  if (window._invSearch) rows = filterData(rows, window._invSearch, ['item','batch','location']);
  if (window._invStatus) rows = rows.filter(r => r.status === window._invStatus);
  if (window._invCC) rows = rows.filter(r => r.coldChain===true||r.coldChain==='true');
  const tbody = document.getElementById('invTbody');
  if (!tbody) return;
  tbody.innerHTML = rows.map(i => {
    const expDate = new Date(i.expiry);
    const today = new Date();
    const daysToExp = Math.round((expDate-today)/(1000*60*60*24));
    const expStyle = daysToExp<30?'color:var(--error);font-weight:700':daysToExp<60?'color:var(--warning);font-weight:600':'';
    return `<tr style="${i.status==='Low Stock'?'background:var(--error-bg)':i.status==='Expiring Soon'?'background:var(--warning-bg)':''}">
      <td class="name-cell">${escHtml(i.item)}</td>
      <td><span style="font-weight:700;color:${parseInt(i.quantity)<50?'var(--error)':parseInt(i.quantity)<200?'var(--warning)':'var(--success)'}">${fmtNum(i.quantity)}</span></td>
      <td style="font-size:12px">${escHtml(i.unit)}</td>
      <td class="no-wrap" style="${expStyle}">${fmtDate(i.expiry)}${daysToExp<30?` <span class="badge badge-danger">${daysToExp}d</span>`:''}</td>
      <td class="id-cell">${escHtml(i.batch)}</td>
      <td>${i.coldChain===true||i.coldChain==='true'?'<span class="badge badge-info"><i class="fas fa-snowflake"></i> Cold</span>':'—'}</td>
      <td style="font-size:12px">${escHtml(i.location)}</td>
      <td>${statusBadge(i.status)}</td>
      <td><div class="actions">
        <button class="btn btn-info btn-xs" onclick="showEditInventoryModal('${i.id}')"><i class="fas fa-pen"></i></button>
        <button class="btn btn-danger btn-xs" onclick="confirmDelete('inventory','${i.id}','Inventory Item','inventory')"><i class="fas fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('') || '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text4)">No items found</td></tr>';
}
function filterInventory(v) { window._invSearch=v; renderInvTable(APP.data.inventory||[]); }
function filterInvStatus(v) { window._invStatus=v; renderInvTable(APP.data.inventory||[]); }
function filterInvCC(v) { window._invCC=v; renderInvTable(APP.data.inventory||[]); }
function getInvForm(i) {
  return `<form id="invForm" class="form-grid">
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Item Name *</label><input name="item" value="${i?escHtml(i.item):''}" required></div>
      <div class="form-group"><label>Batch Number</label><input name="batch" value="${i?escHtml(i.batch):''}"></div>
      <div class="form-group"><label>Quantity *</label><input name="quantity" type="number" min="0" value="${i?i.quantity:''}" required></div>
      <div class="form-group"><label>Unit</label><input name="unit" value="${i?escHtml(i.unit):'Strips'}" placeholder="Strips/Vials/Boxes"></div>
      <div class="form-group"><label>Expiry Date</label><input name="expiry" type="date" value="${i?i.expiry:''}"></div>
      <div class="form-group"><label>Location</label><select name="location"><option ${i&&i.location==='Main Warehouse'?'selected':''}>Main Warehouse</option><option ${i&&i.location==='Cold Storage'?'selected':''}>Cold Storage</option><option ${i&&i.location==='Controlled Vault'?'selected':''}>Controlled Vault</option><option ${i&&i.location==='Narcotic Vault'?'selected':''}>Narcotic Vault</option></select></div>
      <div class="form-group"><label>Status</label><select name="status"><option ${i&&i.status==='Normal'?'selected':''}>Normal</option><option ${i&&i.status==='Low Stock'?'selected':''}>Low Stock</option><option ${i&&i.status==='Expiring Soon'?'selected':''}>Expiring Soon</option></select></div>
    </div>
    <div class="form-check"><input type="checkbox" name="coldChain" id="chkCC" ${i&&(i.coldChain===true||i.coldChain==='true')?'checked':''}><label for="chkCC">Cold Chain Required</label></div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
  </form>`;
}
function showAddInventoryModal() { APP.editingId=null; showModal('Add Inventory Item',getInvForm(null),'modal-lg'); document.getElementById('invForm').onsubmit=(e)=>{e.preventDefault();submitInvForm(e.target);}; }
function showEditInventoryModal(id) {
  const i=APP.data.inventory.find(x=>x.id===id); if(!i) return;
  APP.editingId=id; showModal('Edit Inventory Item',getInvForm(i),'modal-lg');
  document.getElementById('invForm').onsubmit=(e)=>{e.preventDefault();submitInvForm(e.target);};
}
function submitInvForm(form) {
  const d=Object.fromEntries(new FormData(form)); d.coldChain=form.querySelector('[name=coldChain]').checked;
  if(APP.editingId){editItem('inventory',APP.editingId,d);showToast('Item updated','success');}
  else{addItem('inventory',d);showToast('Item added','success');}
  closeModal(); navigate('inventory');
}

/* ========== SECTION: ROLES ========== */
function renderRoles() {
  const el = document.getElementById('section-roles');
  if (!el) return;
  const roles = APP.data.roles || [];
  const admins = APP.data.subAdmins || [];
  const modulePerms = ['Finance','Medicines','Prescriptions','Doctors','Pharmacies','Delivery','Nurses','Risk','Analytics','Inventory'];
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Roles & Permission Control</div><div class="sec-sub">Manage sub-admin roles and module access permissions</div></div>
      <div class="sec-actions">
        <button class="btn btn-primary btn-sm" onclick="showAddAdminModal()"><i class="fas fa-plus"></i> Add Sub-Admin</button>
      </div>
    </div>

    <div class="tab-bar" id="roleTabBar">
      <button class="tab-btn active" onclick="switchRoleTab('subadmins')">Sub-Admin Users</button>
      <button class="tab-btn" onclick="switchRoleTab('matrix')">Permission Matrix</button>
    </div>

    <div id="roleTabSubadmins" class="tab-content active">
      <div class="card">
        <div class="card-header">
          <div class="filter-bar" style="margin:0">
            <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search admins..." oninput="filterAdmins(this.value)"></div>
            <select onchange="filterAdminRole(this.value)"><option value="">All Roles</option>${roles.map(r=>`<option>${r.name}</option>`).join('')}</select>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
            <tbody id="adminsTbody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="roleTabMatrix" class="tab-content">
      <div class="card">
        <div class="card-header"><div class="card-title">Module Permission Matrix</div><div class="card-sub">Check/uncheck to grant or revoke module access per role</div></div>
        <div class="table-wrap">
          <table class="data-table perm-table">
            <thead><tr><th>Module</th>${roles.map(r=>`<th>${escHtml(r.name)}</th>`).join('')}</tr></thead>
            <tbody>${modulePerms.map(mod=>`<tr><td>${mod}</td>${roles.map(r=>`<td><input type="checkbox" class="perm-check" ${r.name==='Super Admin'?'checked disabled':mod==='Finance'&&r.name==='Finance Admin'?'checked':mod==='Prescriptions'&&r.name==='Compliance Admin'?'checked':mod==='Risk'&&r.name==='Compliance Admin'?'checked':mod==='Doctors'&&r.name==='City Manager'?'checked':mod==='Pharmacies'&&r.name==='City Manager'?'checked':mod==='Delivery'&&r.name==='City Manager'?'checked':''} onchange="showToast('Permission updated (demo)','info')"></td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
  window._adminsSearch=''; window._adminsRole='';
  renderAdminsTable(admins);
}
window._adminsSearch=''; window._adminsRole='';
function switchRoleTab(tab) {
  document.querySelectorAll('#roleTabBar .tab-btn').forEach((b,i)=>b.classList.toggle('active',['subadmins','matrix'][i]===tab));
  document.getElementById('roleTabSubadmins').classList.toggle('active', tab==='subadmins');
  document.getElementById('roleTabMatrix').classList.toggle('active', tab==='matrix');
}
function renderAdminsTable(data) {
  let rows = data;
  if (window._adminsSearch) rows = filterData(rows, window._adminsSearch, ['name','email','role']);
  if (window._adminsRole) rows = rows.filter(r => r.role === window._adminsRole);
  const tbody = document.getElementById('adminsTbody');
  if (!tbody) return;
  tbody.innerHTML = rows.map(a => `<tr>
    <td class="name-cell">${escHtml(a.name)}</td>
    <td style="font-size:12px">${escHtml(a.email)}</td>
    <td><span class="badge badge-teal">${escHtml(a.role)}</span></td>
    <td>${statusBadge(a.status)}</td>
    <td style="font-size:12px;color:var(--text4)">${escHtml(a.lastLogin||'—')}</td>
    <td><div class="actions">
      <button class="btn btn-info btn-xs" onclick="showEditAdminModal('${a.id}')"><i class="fas fa-pen"></i></button>
      <button class="btn btn-danger btn-xs" onclick="confirmDelete('subAdmins','${a.id}','Sub-Admin','roles')"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text4)">No admins found</td></tr>';
}
function filterAdmins(v) { window._adminsSearch=v; renderAdminsTable(APP.data.subAdmins||[]); }
function filterAdminRole(v) { window._adminsRole=v; renderAdminsTable(APP.data.subAdmins||[]); }
function getAdminForm(a) {
  const roles = APP.data.roles || [];
  return `<form id="adminForm" class="form-grid">
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Full Name *</label><input name="name" value="${a?escHtml(a.name):''}" required></div>
      <div class="form-group"><label>Email *</label><input name="email" type="email" value="${a?escHtml(a.email):''}" required></div>
      <div class="form-group"><label>Phone</label><input name="phone" value="${a?escHtml(a.phone):''}"></div>
      <div class="form-group"><label>Role</label><select name="role">${roles.map(r=>`<option ${a&&a.role===r.name?'selected':''}>${escHtml(r.name)}</option>`).join('')}</select></div>
      <div class="form-group"><label>Status</label><select name="status"><option ${a&&a.status==='Active'?'selected':''}>Active</option><option ${a&&a.status==='Inactive'?'selected':''}>Inactive</option></select></div>
    </div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
  </form>`;
}
function showAddAdminModal() { APP.editingId=null; showModal('Add Sub-Admin',getAdminForm(null)); document.getElementById('adminForm').onsubmit=(e)=>{e.preventDefault();submitAdminForm(e.target);}; }
function showEditAdminModal(id) {
  const a=APP.data.subAdmins.find(x=>x.id===id); if(!a) return;
  APP.editingId=id; showModal('Edit Sub-Admin',getAdminForm(a));
  document.getElementById('adminForm').onsubmit=(e)=>{e.preventDefault();submitAdminForm(e.target);};
}
function submitAdminForm(form) {
  const d=Object.fromEntries(new FormData(form)); d.lastLogin=APP.editingId?(APP.data.subAdmins.find(x=>x.id===APP.editingId)||{}).lastLogin||'Never':'Never';
  if(APP.editingId){editItem('subAdmins',APP.editingId,d);showToast('Sub-admin updated','success');}
  else{addItem('subAdmins',d);showToast('Sub-admin added','success');}
  closeModal(); navigate('roles');
}

/* ========== SECTION: NOTIFICATIONS ========== */
function renderNotifications() {
  const el = document.getElementById('section-notifications');
  if (!el) return;
  const notifs = APP.data.notifications || [];
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Notification Control</div><div class="sec-sub">Compose and broadcast notifications to platform users</div></div>
    </div>
    <div class="grid-2" style="margin-bottom:24px">
      <div class="card">
        <div class="card-header"><div class="card-title"><i class="fas fa-paper-plane" style="color:var(--c4);margin-right:8px"></i>Compose Notification</div></div>
        <div class="card-body">
          <form id="notifForm" class="form-grid" onsubmit="sendNotification(event)">
            <div class="form-grid form-grid-2">
              <div class="form-group"><label>Type *</label>
                <select name="type" required>
                  <option>System Alert</option><option>Drug Safety</option><option>Drug Recall</option><option>Promo</option><option>Subscription</option>
                </select></div>
              <div class="form-group"><label>Target *</label>
                <select name="target" required>
                  <option>All</option><option>Doctors</option><option>Pharmacies</option><option>Patients</option><option>Delivery</option>
                </select></div>
            </div>
            <div class="form-group"><label>Message *</label><textarea name="message" rows="4" placeholder="Enter notification message..." required></textarea></div>
            <div class="form-footer" style="justify-content:flex-start"><button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Send Notification</button></div>
          </form>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Quick Stats</div></div>
        <div class="card-body">
          <div class="bar-chart">
            ${['System Alert','Drug Safety','Drug Recall','Promo','Subscription'].map(t=>{
              const cnt = notifs.filter(n=>n.type===t).length;
              return `<div class="bar-row"><div class="bar-label">${t}</div><div class="bar-track"><div class="bar-fill" style="width:${cnt?cnt/notifs.length*100:0}%"></div></div><div class="bar-value">${cnt}</div></div>`;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Notification History</div>
        <div class="filter-bar" style="margin:0">
          <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search..." oninput="filterNotifications(this.value)"></div>
          <select onchange="filterNotifType(this.value)"><option value="">All Types</option><option>System Alert</option><option>Drug Safety</option><option>Drug Recall</option><option>Promo</option><option>Subscription</option></select>
          <select onchange="filterNotifTarget(this.value)"><option value="">All Targets</option><option>All</option><option>Doctors</option><option>Pharmacies</option><option>Patients</option><option>Delivery</option></select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>ID</th><th>Type</th><th>Target</th><th>Message</th><th>Sent At</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="notifTbody"></tbody>
        </table>
      </div>
    </div>`;
  window._notifSearch=''; window._notifType=''; window._notifTarget='';
  renderNotifTable(notifs);
}
window._notifSearch=''; window._notifType=''; window._notifTarget='';
function renderNotifTable(data) {
  let rows = data;
  if (window._notifSearch) rows = filterData(rows, window._notifSearch, ['id','message','target','type']);
  if (window._notifType) rows = rows.filter(r => r.type === window._notifType);
  if (window._notifTarget) rows = rows.filter(r => r.target === window._notifTarget);
  const tbody = document.getElementById('notifTbody');
  if (!tbody) return;
  tbody.innerHTML = rows.map(n => {
    const typeColors = {'System Alert':'teal','Drug Safety':'danger','Drug Recall':'danger','Promo':'success','Subscription':'info'};
    return `<tr>
      <td class="id-cell">${escHtml(n.id)}</td>
      <td><span class="badge badge-${typeColors[n.type]||'teal'}">${escHtml(n.type)}</span></td>
      <td><span class="badge badge-info">${escHtml(n.target)}</span></td>
      <td style="max-width:240px;font-size:12px">${escHtml(n.message)}</td>
      <td class="no-wrap" style="font-size:12px">${escHtml(n.sentAt)}</td>
      <td>${statusBadge(n.status)}</td>
      <td><button class="btn btn-danger btn-xs" onclick="confirmDelete('notifications','${n.id}','Notification','notifications')"><i class="fas fa-trash"></i></button></td>
    </tr>`;
  }).join('') || '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text4)">No notifications found</td></tr>';
}
function filterNotifications(v) { window._notifSearch=v; renderNotifTable(APP.data.notifications||[]); }
function filterNotifType(v) { window._notifType=v; renderNotifTable(APP.data.notifications||[]); }
function filterNotifTarget(v) { window._notifTarget=v; renderNotifTable(APP.data.notifications||[]); }
function sendNotification(e) {
  e.preventDefault();
  const form = e.target;
  const d = Object.fromEntries(new FormData(form));
  d.id = genId('NOT');
  d.sentAt = new Date().toLocaleString('en-IN');
  d.status = 'Sent';
  d.createdBy = 'Super Admin';
  addItem('notifications', d);
  form.reset();
  showToast('Notification sent to ' + d.target, 'success');
  navigate('notifications');
}

/* ========== SECTION: DOCUMENTS ========== */
function renderDocuments() {
  const el = document.getElementById('section-documents');
  if (!el) return;
  const docs = APP.data.documents || [];
  const cats = [...new Set(docs.map(d => d.category))];
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Document & Legal Storage</div><div class="sec-sub">Manage licenses, certificates, compliance documents, and audits</div></div>
      <div class="sec-actions">
        <button class="btn btn-primary btn-sm" onclick="showAddDocModal()"><i class="fas fa-plus"></i> Add Document</button>
      </div>
    </div>
    <div class="filter-bar" style="margin-bottom:16px">
      <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search documents..." oninput="filterDocs(this.value)"></div>
      <select onchange="filterDocCat(this.value)"><option value="">All Categories</option>${cats.map(c=>`<option>${c}</option>`).join('')}</select>
      <select onchange="filterDocStat(this.value)"><option value="">All Status</option><option>Verified</option><option>Pending</option></select>
    </div>
    <div class="doc-list" id="docList"></div>`;
  window._docsDocSearch=''; window._docsDocCat=''; window._docsDocStat='';
  renderDocList(docs);
}
window._docsDocSearch=''; window._docsDocCat=''; window._docsDocStat='';
function renderDocList(data) {
  let rows = data;
  if (window._docsDocSearch) rows = filterData(rows, window._docsDocSearch, ['name','category','uploader']);
  if (window._docsDocCat) rows = rows.filter(r => r.category === window._docsDocCat);
  if (window._docsDocStat) rows = rows.filter(r => r.status === window._docsDocStat);
  const container = document.getElementById('docList');
  if (!container) return;
  const catIcons = {'Doctor Licenses':'fa-user-doctor','Pharmacy Licenses':'fa-hospital','Nurse Certs':'fa-user-nurse','KYC Documents':'fa-id-card','Audit Reports':'fa-file-chart-column','Government Compliance':'fa-landmark'};
  const catColors = {'Doctor Licenses':'var(--c4)','Pharmacy Licenses':'var(--c5)','Nurse Certs':'var(--info)','KYC Documents':'var(--warning)','Audit Reports':'var(--purple)','Government Compliance':'var(--success)'};
  container.innerHTML = rows.map(d => `
    <div class="doc-item">
      <div class="doc-icon" style="background:${catColors[d.category]||'var(--c4)'}15;color:${catColors[d.category]||'var(--c4)'}">
        <i class="fas ${catIcons[d.category]||'fa-file'}"></i>
      </div>
      <div class="doc-info">
        <div class="doc-name">${escHtml(d.name)}</div>
        <div class="doc-meta">${escHtml(d.category)} · Uploaded by ${escHtml(d.uploader)} · ${fmtDate(d.date)} · ${escHtml(d.fileType||'PDF')} · ${escHtml(d.size||'—')}</div>
      </div>
      ${statusBadge(d.status)}
      <div class="doc-actions">
        <button class="btn btn-info btn-sm" onclick="showToast('Document preview coming soon','info')"><i class="fas fa-eye"></i></button>
        <button class="btn btn-secondary btn-sm" onclick="showToast('Download simulated for: ${escHtml(d.name)}','success')"><i class="fas fa-download"></i></button>
        ${d.status==='Pending'?`<button class="btn btn-success btn-sm" onclick="verifyDoc('${d.id}')"><i class="fas fa-check"></i> Verify</button>`:''}
        <button class="btn btn-danger btn-sm" onclick="confirmDelete('documents','${d.id}','Document','documents')"><i class="fas fa-trash"></i></button>
      </div>
    </div>`).join('') || '<div class="empty-state"><i class="fas fa-folder-open"></i><p>No documents found</p></div>';
}
function filterDocs(v) { window._docsDocSearch=v; renderDocList(APP.data.documents||[]); }
function filterDocCat(v) { window._docsDocCat=v; renderDocList(APP.data.documents||[]); }
function filterDocStat(v) { window._docsDocStat=v; renderDocList(APP.data.documents||[]); }
function verifyDoc(id) { editItem('documents',id,{status:'Verified'}); showToast('Document verified','success'); navigate('documents'); }
function showAddDocModal() {
  APP.editingId=null;
  showModal('Add Document', `<form id="docAddForm" class="form-grid" onsubmit="submitDocForm(event)">
    <div class="form-group"><label>Document Name *</label><input name="name" required placeholder="e.g. Dr. John Doe - MCI License"></div>
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Category *</label>
        <select name="category" required>
          <option>Doctor Licenses</option><option>Pharmacy Licenses</option><option>Nurse Certs</option>
          <option>KYC Documents</option><option>Audit Reports</option><option>Government Compliance</option>
        </select></div>
      <div class="form-group"><label>Uploader</label><input name="uploader" placeholder="Name or system"></div>
    </div>
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>File Name / Type</label><input name="fileType" value="PDF" placeholder="PDF/JPG/DOCX"></div>
      <div class="form-group"><label>Status</label><select name="status"><option>Pending</option><option>Verified</option></select></div>
    </div>
    <div class="form-group"><label>Date</label><input name="date" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
  </form>`);
}
function submitDocForm(e) {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  d.size = '—';
  addItem('documents', d);
  showToast('Document added', 'success');
  closeModal(); navigate('documents');
}

/* ========== SECTION: INCIDENTS ========== */
function renderIncidents() {
  const el = document.getElementById('section-incidents');
  if (!el) return;
  const incidents = APP.data.incidents || [];
  const open = incidents.filter(i=>i.status==='Open').length;
  const inProg = incidents.filter(i=>i.status==='In Progress').length;
  const esc = incidents.filter(i=>i.status==='Escalated').length;
  const resolved = incidents.filter(i=>i.status==='Resolved').length;
  el.innerHTML = `
    <div class="sec-header">
      <div><div class="sec-title">Incident & Dispute Management</div><div class="sec-sub">Track, resolve, and escalate incidents, complaints, and disputes</div></div>
      <div class="sec-actions">
        <button class="btn btn-primary btn-sm" onclick="showAddIncidentModal()"><i class="fas fa-plus"></i> Add Incident</button>
      </div>
    </div>
    <div class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon red"><i class="fas fa-folder-open"></i></div></div><div class="stat-value">${open}</div><div class="stat-label">Open</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon amber"><i class="fas fa-spinner"></i></div></div><div class="stat-value">${inProg}</div><div class="stat-label">In Progress</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon purple"><i class="fas fa-arrow-up-right-dots"></i></div></div><div class="stat-value">${esc}</div><div class="stat-label">Escalated</div></div>
      <div class="stat-card"><div class="stat-icon-row"><div class="stat-icon green"><i class="fas fa-circle-check"></i></div></div><div class="stat-value">${resolved}</div><div class="stat-label">Resolved</div></div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="filter-bar" style="margin:0">
          <div class="search-box"><i class="fas fa-magnifying-glass"></i><input type="text" placeholder="Search incidents..." oninput="filterIncidents(this.value)"></div>
          <select onchange="filterIncType(this.value)"><option value="">All Types</option><option>Adverse Drug Reaction</option><option>Delivery Issue</option><option>Payment Dispute</option><option>Complaint</option><option>Refund Request</option></select>
          <select onchange="filterIncStatus(this.value)"><option value="">All Status</option><option>Open</option><option>In Progress</option><option>Resolved</option><option>Escalated</option></select>
          <select onchange="filterIncPriority(this.value)"><option value="">All Priority</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>ID</th><th>Type</th><th>Patient/User</th><th>Description</th><th>Priority</th><th>Assigned To</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="incTbody"></tbody>
        </table>
      </div>
    </div>`;
  window._incSearch=''; window._incType=''; window._incStatus=''; window._incPriority='';
  renderIncTable(incidents);
}
window._incSearch=''; window._incType=''; window._incStatus=''; window._incPriority='';
function renderIncTable(data) {
  let rows = data;
  if (window._incSearch) rows = filterData(rows, window._incSearch, ['id','patient','description','type','assignedTo']);
  if (window._incType) rows = rows.filter(r => r.type === window._incType);
  if (window._incStatus) rows = rows.filter(r => r.status === window._incStatus);
  if (window._incPriority) rows = rows.filter(r => r.priority === window._incPriority);
  const tbody = document.getElementById('incTbody');
  if (!tbody) return;
  const typeColors = {'Adverse Drug Reaction':'danger','Delivery Issue':'warning','Payment Dispute':'info','Complaint':'purple','Refund Request':'amber'};
  tbody.innerHTML = rows.map(i => `<tr>
    <td class="id-cell">${escHtml(i.id)}</td>
    <td><span class="badge badge-${typeColors[i.type]||'info'}">${escHtml(i.type)}</span></td>
    <td class="name-cell">${escHtml(i.patient)}</td>
    <td style="max-width:180px;font-size:12px">${escHtml(i.description)}</td>
    <td><span class="prio-${(i.priority||'').toLowerCase()}">${escHtml(i.priority)}</span></td>
    <td style="font-size:12px">${escHtml(i.assignedTo||'—')}</td>
    <td class="no-wrap">${fmtDate(i.date)}</td>
    <td>${statusBadge(i.status)}</td>
    <td><div class="actions">
      <button class="btn btn-info btn-xs" onclick="viewIncidentModal('${i.id}')"><i class="fas fa-eye"></i></button>
      ${i.status!=='Resolved'?`<button class="btn btn-success btn-xs" onclick="setIncStatus('${i.id}','Resolved')">Resolve</button>`:''}
      ${i.status==='Open'?`<button class="btn btn-warning btn-xs" onclick="setIncStatus('${i.id}','Escalated')">Escalate</button>`:''}
      ${i.type==='Payment Dispute'||i.type==='Refund Request'?`<button class="btn btn-purple btn-xs" onclick="approveRefund('${i.id}')"><i class="fas fa-check-circle"></i> Refund</button>`:''}
      <button class="btn btn-danger btn-xs" onclick="confirmDelete('incidents','${i.id}','Incident','incidents')"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('') || '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text4)">No incidents found</td></tr>';
}
function filterIncidents(v) { window._incSearch=v; renderIncTable(APP.data.incidents||[]); }
function filterIncType(v) { window._incType=v; renderIncTable(APP.data.incidents||[]); }
function filterIncStatus(v) { window._incStatus=v; renderIncTable(APP.data.incidents||[]); }
function filterIncPriority(v) { window._incPriority=v; renderIncTable(APP.data.incidents||[]); }
function setIncStatus(id,status) { editItem('incidents',id,{status}); showToast(`Incident ${status}`,'success'); navigate('incidents'); }
function approveRefund(id) {
  editItem('incidents',id,{status:'Resolved',notes:(APP.data.incidents.find(x=>x.id===id)||{}).notes+' | Refund approved by admin.'});
  showToast('Refund approved','success');
  addAudit('APPROVE_REFUND','incidents',`Refund approved for incident ${id}`);
  navigate('incidents');
}
function viewIncidentModal(id) {
  const i = APP.data.incidents.find(x=>x.id===id); if(!i) return;
  showModal('Incident Details — ' + i.id, `
    <div class="form-grid">
      <div class="grid-2">
        <div><label class="text-sm fw-600 text-muted">Type</label><p><span class="badge badge-info">${escHtml(i.type)}</span></p></div>
        <div><label class="text-sm fw-600 text-muted">Patient/User</label><p class="fw-600">${escHtml(i.patient)}</p></div>
        <div><label class="text-sm fw-600 text-muted">Priority</label><p><span class="prio-${(i.priority||'').toLowerCase()}">${escHtml(i.priority)}</span></p></div>
        <div><label class="text-sm fw-600 text-muted">Status</label><p>${statusBadge(i.status)}</p></div>
        <div><label class="text-sm fw-600 text-muted">Date</label><p>${fmtDate(i.date)}</p></div>
        <div><label class="text-sm fw-600 text-muted">Assigned To</label><p>${escHtml(i.assignedTo||'—')}</p></div>
      </div>
      <div><label class="text-sm fw-600 text-muted">Description</label><p style="background:var(--bg);padding:10px;border-radius:8px">${escHtml(i.description)}</p></div>
      <div><label class="text-sm fw-600 text-muted">Internal Notes</label><p style="background:var(--warning-bg);padding:10px;border-radius:8px;font-size:12.5px">${escHtml(i.notes||'—')}</p></div>
      <div class="form-group"><label>Add Note</label>
        <textarea id="incNoteInput" rows="2" placeholder="Add internal note..."></textarea>
      </div>
      <div class="form-footer">
        <button class="btn btn-secondary" onclick="addIncNote('${i.id}')"><i class="fas fa-note-sticky"></i> Save Note</button>
        ${i.status!=='Resolved'?`<button class="btn btn-success" onclick="setIncStatus('${i.id}','Resolved');closeModal()"><i class="fas fa-check"></i> Resolve</button>`:''}
        ${i.status==='Open'?`<button class="btn btn-warning" onclick="setIncStatus('${i.id}','Escalated');closeModal()"><i class="fas fa-arrow-up"></i> Escalate</button>`:''}
        <button class="btn btn-secondary" onclick="closeModal()">Close</button>
      </div>
    </div>
  `, 'modal-lg');
}
function addIncNote(id) {
  const noteInput = document.getElementById('incNoteInput');
  if (!noteInput || !noteInput.value.trim()) { showToast('Please enter a note','warning'); return; }
  const inc = APP.data.incidents.find(x=>x.id===id);
  if (!inc) return;
  const newNotes = (inc.notes||'') + '\n[' + new Date().toLocaleDateString('en-IN') + '] ' + noteInput.value.trim();
  editItem('incidents', id, { notes: newNotes });
  showToast('Note added', 'success');
  closeModal();
}
function showAddIncidentModal() {
  APP.editingId=null;
  showModal('Add Incident', `<form id="incForm" class="form-grid" onsubmit="submitIncForm(event)">
    <div class="form-grid form-grid-2">
      <div class="form-group"><label>Type *</label><select name="type" required><option>Adverse Drug Reaction</option><option>Delivery Issue</option><option>Payment Dispute</option><option>Complaint</option><option>Refund Request</option></select></div>
      <div class="form-group"><label>Patient/User *</label><input name="patient" required></div>
      <div class="form-group"><label>Priority</label><select name="priority"><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div>
      <div class="form-group"><label>Assigned To</label><input name="assignedTo"></div>
      <div class="form-group"><label>Status</label><select name="status"><option>Open</option><option>In Progress</option><option>Resolved</option><option>Escalated</option></select></div>
      <div class="form-group"><label>Date</label><input name="date" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
    </div>
    <div class="form-group"><label>Description *</label><textarea name="description" rows="3" required></textarea></div>
    <div class="form-group"><label>Internal Notes</label><textarea name="notes" rows="2"></textarea></div>
    <div class="form-footer"><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
  </form>`,'modal-lg');
}
function submitIncForm(e) {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  addItem('incidents', d);
  showToast('Incident added','success');
  closeModal(); navigate('incidents');
}

/* ========== INIT ========== */
function initApp() {
  loadData();
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  navigate('dashboard');
}

document.addEventListener('DOMContentLoaded', initApp);

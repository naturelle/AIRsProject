var express = require(`express`);
var app = express();
var sqlite3 = require(`sqlite3`);
var db = new sqlite3.Database(`db/imalat.db`);
var alertflag = 0
var bodyParser = require(`body-parser`);
const bcrypt = require('bcrypt');
const saltRounds = 10;

var nodemailer = require('nodemailer');

app.use (express.static(__dirname + `/proje`));
app.use (bodyParser.urlencoded({extended : false}));




console.log("dongu is running");

// verigir()


let veriler = `ANS1.C.B00.A00001;Ownership of application documents
ANS1.C.B00.A00002;Classification of application documents
ANS1.C.B00.A00003;Revision number of application documents
ANS1.C.B00.A00004;Consistency of lists of contents, abbreviations, references, tables, etc., with main text
ANS1.C.B00.A00005;Low quality of non-text items
ANS1.C.B00.A00006;Absence of drawings in separate electronic form
ANS1.C.B00.A00007;Format deficiencies
ANS1.C.B05.A00008;Missing information on fuel computer codes
ANS1.C.B05.A00009;Missing reference document
ANS1.C.B05.A00010;Submission of references 
ANS1.C.B05.A00011;Missing electronic copies of the references
ANS1.C.B05.A00012;Submission of references 
ANS1.C.B11.A00013;Missing references
ANS1.C.B12.A00014;Contradiction of SMP with the approved Site Parameters Report
ANS1.C.B05.A00015;Absence drawings in separate electronic form
ANS1.C.B05.A00016;Non submission of Reference Documents
ANS1.C.B05.A00017;Non submission of Reference Documents
ANS1.C.B05.A00018;Non submission of Reference Documents
ANS1.C.B05.A00019;Missing electronic copies of references of Chapter 13
ANS1.C.B05.A00020;Non submission of Reference Documents electronically for Chapter14
ANS1.C.B13.A00021;Non submission of electronic copies of References for PTQP 
ANS1.C.B06.A00022;Noncompliance with the Scope of PSA
ANS1.C.B06.A00023;Noncompliance with the Scope of PSA
ANS1.C.B06.A00024;Noncompliance with the Scope of PSA
ANS1.C.B06.A00025;Poor printing & contrast quality in Book 1, Book 9 & Book10
ANS1.C.B05.A00026;Non submission of Reference Documents
ANS1.C.B05.A00027;Non submission of Reference Documents
ANS1.C.B05.A00028;Missing reference for safety limit
ANS1.C.B05.A00029;Missing reference for safety limits
ANS1.C.B05.A00030;Missing reference for additional requirements
ANS1.C.B05.A00031;Missing references for information on materials
ANS1.C.B05.A00032;Missing reference for safety limit
ANS1.C.B05.A00033;Missing references for information on control rods
ANS1.C.B05.A00034;Missing references for information on core heat transfer
ANS1.C.B05.A00035;Incorrect information
ANS1.C.B05.A00036;Missing coolant flow diagrams
ANS1.C.B05.A00037;Missing information on materials
ANS1.C.B05.A00038;Missing information on materials
ANS1.C.B05.A00039;Missing information on fuel
ANS1.C.B05.A00040;Missing information on absorbers
ANS1.C.B05.A00041;Missing information on performance in case of failures
ANS1.C.B05.A00042;Missing information on control rods
ANS1.C.B05.A00043;Missing information on reactivity
ANS1.C.B05.A00044;Incomplete information on core heat removal
ANS1.C.B05.A00045;Missing figure
ANS1.C.B05.A00046;Missing information on design constraints
ANS1.C.B05.A00047;Incomplete information on list of beyond design basis accidents
ANS1.C.B05.A00048;Missing information on design basis accidents
ANS1.C.B05.A00049;Missing information on severe accidents
ANS1.C.B05.A00050;Incorrect information in UAR analysis
ANS1.C.B05.A00051;Missing information on spent fuel accidents
ANS1.C.B05.A00052;Inconsistency in satisfaction of dose criterion
ANS1.C.B05.A00053;Inconsistency in dose criteria
ANS1.C.B05.A00054;Missing information, in PSAR 13.1.1.1, regarding structural diagram for operating company
ANS1.C.B05.A00055;Missing information in PSAR 13.1.1.2, regarding organization structure of operating company. 
ANS1.C.B05.A00056;Missing information, in PSAR 13.1.1.3, regarding educational level of personnel for each position in the organizational structure of operating company
ANS1.C.B05.A00057;Missing information, in PSAR 13.1.2.2, regarding functions of some departments in operating organization.
ANS1.C.B05.A00058;Missing information in figure 13.1.2.1.1 and 13.1.2.1.2
ANS1.C.B05.A00059;Missing information regarding analysis of implementation of provisions of the regulatory documents stated in PSAR 13.1.3
ANS1.C.B05.A00060;Missing information, in PSAR 13.2.2, regarding time-schedule for each stage of operating personnel training within each functional group to implement NPP commissioning stages 
ANS1.C.B05.A00061;Missing information,  in PSAR 13.3.3.4, regarding list of safety-at-work manuals 
ANS1.C.B05.A00062;Missing information, in PSAR 13.3.4.1, regarding list of emergency procedures.
ANS1.C.B05.A00063;Non submission of General Plan to Involve extra Personnel
ANS1.C.B05.A00064;Non Submission of Organization Chart for Commissioning Management
ANS1.C.B05.A00065;Non Submission of Organization Chart for Commissions involved commissioning stage.
ANS1.C.B09.A00066;Internal procedures and guidelines
ANS1.C.B09.A00067;Non submission of procedures, guidelines etc.
ANS1.C.B09.A00068;Missing information.
ANS1.C.B09.A00069;Missing Information
ANS1.C.B05.A00070;Reevaluation of Tsunami Value
ANS1.C.B05.A00071;More Information on Slope Stability
ANS1.C.B05.A00072;Missing information on protection of lines and substations from external impacts
ANS1.C.B05.A00073;Missing information on Emergency automation, its layout, quantitative reliability characteristics
ANS1.C.B05.A00074;Missing information on overvoltage protection of external power grid
ANS1.C.B05.A00075;Noncompliance on overvoltage protection of external power grid
ANS1.C.B05.A00076;Missing information on requirements to the NPP power unit maneuvering and frequency control
ANS1.C.B05.A00077;Missing information on acceptable capacity of one NPP power unit regarding the grid stability conditions
ANS1.C.B05.A00078;Missing information on types of the grid abnormal operation and their frequency
ANS1.C.B05.A00079;Missing information on other natural impacts on power supply system
ANS1.C.B05.A00080;Missing information on grid impact to unit performance
ANS1.C.B05.A00081;Missing information on analysis of impact to NPP safety caused by various violations
ANS1.C.B05.A00082;Missing information on secondary connections schemes with protection settings
ANS1.C.B05.A00083;Reference missing for relay protection, electromagnetic compatibility, testing and maintenance
ANS1.C.B05.A00084;Missing information on battery sizing
ANS1.C.B05.A00085;Missing information on fuel stock for diesel generators
ANS1.C.B05.A00086;Missing information on the justification of two train structure
ANS1.C.B05.A00087;Missing information on Station Black-Out 
ANS1.C.B05.A00088;Licensing basis list of Akkuyu
ANS1.C.B05.A00089;Projectile generation by material warehouses, liquefied or compressed gas warehouses
ANS1.C.B05.A00090;Secondary Projectile Generation
ANS1.C.B05.A00091;Information on shock-absorbing devices
ANS1.C.B05.A00092;Information on the chemical composition and resulting ?? values of media flowing through pipelines subject to possible collapse
ANS1.C.B05.A00093;Degrees of corrosion damage of the safety important equipment, parts of structures
ANS1.C.B05.A00094;Tabulated format of all types of loads regarding to all systems and elements
ANS1.C.B05.A00095;Indication of what structures and buildings and elevations should be provided with floor accelerograms and response spectra
ANS1.C.B05.A00096;Tsunami evaluation considering new bathymetry and layout of NPP
ANS1.C.B05.A00097;Lack of reference reports
ANS1.C.B05.A00098;Lack of section “3.10.2. Hydraulic and geo-technical structures, units and channels”
ANS1.C.B05.A00099;Information on software used
ANS1.C.B05.A00100;Description of main building structures
ANS1.C.B05.A00101;Stability of foundation
ANS1.C.B05.A00102;Containment reinforced concrete structure
ANS1.C.B05.A00103;Conclusions on strength and stability of structures
ANS1.C.B05.A00104;Inconsistent tsunami values
ANS1.C.B05.A00105;Non submission of Reference Documents
ANS1.C.B05.A00106;Non submission of Reference Documents
ANS1.C.B05.A00107;Non submission of relevant drawings.
ANS1.C.B05.A00108;Missing Technical Data
ANS1.C.B05.A00109;Missing Technical Data
ANS1.C.B05.A00110;Missing Technical Data
ANS1.C.B05.A00111;Pipeline route diagrams with enough details
ANS1.C.B05.A00112;Missing references
ANS1.C.B05.A00113;Plant Specific Information and Missing Justifications
ANS1.C.B05.A00114;Noncompliance with the TAEK Letter in terms of PSA Scope
ANS1.C.B05.A00115;Misinformation about submission of PSA’s parts
ANS1.C.B06.A00116;Missing safety system in Book 5 
ANS1.C.B06.A00117;Missing summary information in Book 1
ANS1.C.B06.A00118;Missing system information & figures in Book 6 
ANS1.C.B06.A00119;Missing system information, table & information in Book 7
ANS1.C.B05.A00120;Inconsistency between PSAR Chapter 1.8.1 & PSA Documentation
ANS1.C.B05.A00121;Very Low Safety Margin
ANS1.C.B05.A00122;Inconsistency in collapsed level values
ANS1.C.B13.A00123;Missing information, regarding requirements of personnel in commissioning, fuel loading and trial tests, for PTQP
ANS1.C.B13.A00124;Missing information, regarding implementation of systematic approach in training, in PTQP
ANS1.C.B13.A00125;Missing information, regarding calendar of personnel training, in PTQP
ANS1.C.B13.A00126;Missing information, regarding requirements of trainers, in PTQP
ANS1.C.B13.A00127;Missing information, regarding unit responsible for training, in PTQP
ANS1.C.B13.A00128;Missing information, regarding members of Examination Board, for PTQP
ANS1.C.B13.A00129;Missing information, regarding reviewing and updating of training, in PTQP
ANS1.C.B05.A00130;Citing of references
ANS1.C.B05.A00131;Citing of references 
ANS1.C.B05.A00132;Missing references
ANS1.C.B11.A00133;Non-cited references
ANS1.C.B11.A00134;Missing section for environmental monitoring during decommissioning of Akkuyu NPP
ANS1.C.B05.A00135;Non-compliant information
ANS1.C.B05.A00136;Non-compliant information
ANS1.C.B06.A00137;Missing information on sources of uncertainty in Book 11
ANS1.C.B06.A00138;Non-compliance in Book 11
ANS1.C.B05.A00139;Missing information in PSAR Chapter 1.8.1 regarding PSA 
ANS1.C.B05.A00140;Missing information
ANS1.C.B05.A00141;Missing information
ANS1.C.B05.A00142;Non-compliant information
ANS1.C.B05.A00143;Non-compliant information
ANS1.C.B05.A00144;Use of wrong unit
ANS1.C.B05.A00145;Non-compliant information
ANS1.C.B05.A00146;Missing information regarding to section 11.3.3
ANS1.C.B05.A00147;Missing information regarding to section 11.3.3
ANS1.C.B05.A00148;Missing Substantiating calculation reports
ANS1.C.B05.A00149;Missing information on 00UFA
ANS1.C.B05.A00150;Missing section 3.12.2.6.5
ANS1.C.B05.A00151;Inadequate information on sealing steel liner
ANS1.C.B05.A00152;Inadequate information on reinforced concrete containments
ANS1.C.B05.A00153;Indication of the function of system & analysis need regarding natural and man-induced impacts
ANS1.C.B05.A00154;Coverage of the Structures on the Layout
ANS1.C.B05.A00155;Ground Improvement and Settlement Assessment #1
ANS1.C.B05.A00156;Ground Improvement and Settlement Assessment #2
ANS1.C.B05.A00157;Ground Improvement and Settlement Assessment #3
ANS1.C.B05.A00158;Ground Improvement and Settlement Assessment #4
ANS1.C.B05.A00159;Ground Improvement and Settlement Assessment #5
ANS1.C.B05.A00160;Ground Improvement and Settlement Assessment #6
ANS1.C.B05.A00161;Thermal dynamic (raise of pressure and temperature) impacts.
ANS1.C.B05.A00162;Absence drawings in separate electronic form
ANS1.C.B05.A00163;Inconsistent information in 1st and 7th chapters of PSAR
ANS1.C.B05.A00164;Reference on automated dispatch control system
ANS1.C.B05.A00165;Missing information on grid-NPP disconnection cases
ANS1.C.B05.A00166;Inconsistent information in 1st and 7th chapters of PSAR
ANS1.C.B05.A00167;Reference on human error measures and blockage actions
ANS1.C.B05.A00168;Missing references on protection
ANS1.C.B05.A00169;Missing information on acceptable duration for frequency decrease and changes in the current shape
ANS1.C.B05.A00170;Inconsistencies between 3rd and 7th chapters of PSAR in terms of safety classification
ANS1.C.B05.A00171;Missing justification on duration of power sources
ANS1.C.B05.A00172;Missing information on technical characteristics of electrical power sources
ANS1.C.B05.A00173;Missing information on protection features for internal and external noises
ANS1.C.B05.A00174;Missing information on selection of automation settings (ALT, automatic re-start, etc.) and their justification.
ANS1.C.B05.A00175;Missing information on secondary interconnections' flow diagrams, automation and other circuits
ANS1.C.B05.A00176;Clarification on testing procedures
ANS1.C.B05.A00177;Clarification on replacement schedules
ANS1.C.B05.A00178;Clarification reference on environmental conditions
ANS1.C.B05.A00179;Missing information on the class of insulation
ANS1.C.B05.A00180;Missing information on the analysis of common cause failures
ANS1.C.B05.A00181;Missing information on the reliability of power supply
ANS1.C.B05.A00182;Missing information on “Monitoring, control and diagnostic system”
ANS1.C.B05.A00183;Missing information on “Monitoring, control and diagnostic system”
ANS1.C.B05.A00184;Missing reference for information on core thermohydraulics
ANS1.C.B05.A00185;Missing reference for information on primary loop thermohydraulics
ANS1.C.B05.A00186;Missing references on core neutronics
ANS1.C.B05.A00187;Missing definitions of symbols on core neutronics
ANS1.C.B05.A00188;Missing reference for a leak and damaged rods
ANS1.C.B05.A00189;Missing reference for acceptance criteria
ANS1.C.B05.A00190;Missing analysis of compliance with regulations
ANS1.C.B05.A00191;Missing information on neutron flux
ANS1.C.B05.A00192;Missing information on core transients
ANS1.C.B05.A00193;Missing information on improper positioning of control rods
ANS1.C.B05.A00194;Missing information on reactivity control
ANS1.C.B05.A00195;Missing information on start-up, load following and xenon
ANS1.C.B05.A00196;Stability analyses are not for Akkuyu NPP
ANS1.C.B05.A00197;Missing information on subcritical state
ANS1.C.B05.A00198;Missing information on experimental studies
ANS1.C.B05.A00199;Inconsistency in list of accidents
ANS1.C.B05.A00200;Inconsistency in damaged fuel rods
ANS1.C.B05.A00201;Missing figures of NPPs
ANS1.C.B05.A00202;Missing information regarding to section 11.1.2 
ANS1.C.B05.A00203;Missing information regarding to section 11.2.1
ANS1.C.B05.A00204;Missing information regarding to section 11.2.1
ANS1.C.B05.A00205;Missing information regarding to section 11.2.2
ANS1.C.B05.A00206;Missing information regarding to section 11.3.1
ANS1.C.B05.A00207;Missing information regarding to section 11.3.1
ANS1.C.B05.A00208;Missing information regarding to section 11.3.1
ANS1.C.B05.A00209;Missing information regarding to section 11.3.2
ANS1.C.B05.A00210;Missing information regarding to section 11.3.2
ANS1.C.B05.A00211;Missing information regarding to section 11.3.3.2 and 11.3.3.3
ANS1.C.B05.A00212;Missing information regarding to section 11.3.4
ANS1.C.B05.A00213;Missing information regarding to section 11.3.5
ANS1.C.B05.A00214;Missing information regarding to section 11.3.5
ANS1.C.B05.A00215;Missing information regarding to section 11.3.5
ANS1.C.B05.A00216;Missing information regarding to section 11.4
ANS1.C.B05.A00217;Inconsistent information regarding to section 11.4
ANS1.C.B05.A00218;Missing information regarding to section 11.4
ANS1.C.B05.A00219;Missing information regarding to section 11.4
ANS1.C.B05.A00220;Missing information regarding to section 11.4
ANS1.C.B05.A00221;Missing information regarding to section 11.4
ANS1.C.B05.A00222;Missing information regarding to section 11.5
ANS1.C.B05.A00223;Missing information regarding to section 11.5
ANS1.C.B05.A00224;Missing information regarding to section 11.5.2.
ANS1.C.B05.A00225;Missing information regarding to section 11.5.2.3
ANS1.C.B05.A00226;Clarification regarding to section 11.5.2.3
ANS1.C.B05.A00227;Missing information regarding to section 11.5.3
ANS1.C.B05.A00228;Missing information regarding to section 11.5.3
ANS1.C.B05.A00229;Missing information regarding to section 11.5.3
ANS1.C.B05.A00230;Missing information regarding to section 11.5.3.2
ANS1.C.B05.A00231;Missing information regarding to section 11.5.3.2
ANS1.C.B05.A00232;Missing information regarding to section 11.5.3.3
ANS1.C.B05.A00233;Use of Turkish Legislation and IAEA Documents 
ANS1.C.B05.A00234;References to the information contained in other PSAR Chapters 
ANS1.C.B05.A00235;Characteristics of spent fuel intended for storage
ANS1.C.B05.A00236;Information on other elements stored in SNF Storage facilities 
ANS1.C.B05.A00237;Information on systems related to functioning of Spent Nuclear Fuel Storage and Handling System
ANS1.C.B05.A00238;Resistance properties of materials of Spent Nuclear Fuel Storage and Handling System
ANS1.C.B05.A00239;Missing information on SNFS 
ANS1.C.B05.A00240;Information about all types of monitoring and alarms
ANS1.C.B05.A00241;Missing reference documents
ANS1.C.B05.A00242;Missing reference document 
ANS1.C.B05.A00243;Missing drawings/figures/diagrams of 10KPF10 System and 10KPK System 
ANS1.C.B05.A00244;Missing parameters
ANS1.C.B05.A00245;Missing lists of description of protective features and interlocks
ANS1.C.B05.A00246;Non-compliant information 
ANS1.C.B05.A00247;Non-compliant information 
ANS1.C.B05.A00248;Clarification on on-site response organization 
ANS1.C.B05.A00249;Non-compliant information 
ANS1.C.B05.A00250;Non-compliant information 
ANS1.C.B05.A00251;Non-compliant information 
ANS1.C.B05.A00252;Deficiency in English 
ANS1.C.B05.A00253;Non-compliant information 
ANS1.C.B05.A00254;Non-compliant information 
ANS1.C.B05.A00255;Non-compliant information 
ANS1.C.B05.A00256;Non-compliant information 
ANS1.C.B05.A00257;Inconsistent information 
ANS1.C.B05.A00258;Non-compliant information 
ANS1.C.B05.A00259;Missing information regarding the accidents
ANS1.C.B05.A00260;Missing information
ANS1.C.B05.A00261;Missing information
ANS1.C.B05.A00262;Missing information
ANS1.C.B05.A00263;Missing information
ANS1.C.B05.A00264;Missing information on Radioactive Releases and Doses
ANS1.C.B05.A00265;Inconsistent information
ANS1.C.B05.A00266;Missing information
ANS1.C.B05.A00267;Missing information
ANS1.C.B05.A00268;Missing information
ANS1.C.B05.A00269;Missing information
ANS1.C.B05.A00270;Missing information
ANS1.C.B05.A00271;Missing information
ANS1.C.B05.A00272;Missing Reference
ANS1.C.B05.A00273;Missing information
ANS1.C.B05.A00274;Missing information
ANS1.C.B05.A00275;Missing information
ANS1.C.B05.A00276;Missing information
ANS1.C.B05.A00277;Missing references
ANS1.C.B05.A00278;Missing information
ANS1.C.B05.A00279;Missing information
ANS1.C.B05.A00280;Missing analyses on compliance and measurement of distortions
ANS1.C.B05.A00281;Missing analyses on justification of measurement locations
ANS1.C.B05.A00282;Missing information on core reflectors
ANS1.C.B05.A00283;Missing information on start-up neutron source
ANS1.C.B05.A00284;Clarification needed related to “Identification of MCDS”
ANS1.C.B05.A00285;Missing references for SDPS parameters
ANS1.C.B05.A00286;Contradictions for SDPS parameters
ANS1.C.B05.A00287;Missing information on calculations to select protective features and their settings.
ANS1.C.B05.A00288;Missing reference on calculations to select protective features and their settings.
ANS1.C.B05.A00289;Independency of EPSS
ANS1.C.B05.A00290;Clarification needed related to “Reactor plant instrumentation and control systems” and “monitoring, control and diagnostic system”
ANS1.C.B05.A00291;Inconsistency between 3rd and 12th chapters in terms of safety classification
ANS1.C.B05.A00292;Missing information on Pre-commissioning works of Reactor plant instrumentation and control systems
ANS1.C.B05.A00293;Missing information on Pre-commissioning works of Reactor plant instrumentation and control systems
ANS1.C.B05.A00294;Missing information on Pre-commissioning works of Reactor plant instrumentation and control systems
ANS1.C.B05.A00295;Figure revision
ANS1.C.B05.A00296;Non-Compliant Information
ANS1.C.B05.A00297;Reference tectonics and geodynamic
ANS1.C.B05.A00298;Presentation of  faults mentioned in the text
ANS1.C.B05.A00299;Resolution of some of the maps and figures
ANS1.C.B05.A00300;Simplification of seismotectonic conditions
ANS1.C.B05.A00301;More Information on supporting statement
ANS1.C.B05.A00302;Conditional mean spectrum
ANS1.C.B05.A00303;Landslides and screes
ANS1.C.B05.A00304;Liquefaction definition
ANS1.C.B05.A00305;Missing Technical Data
ANS1.C.B05.A00306;Missing Technical Data
ANS1.C.B05.A00307;Missing Technical Data
ANS1.C.B05.A00308;Missing Technical Data
ANS1.C.B05.A00309;Missing Technical Data
ANS1.C.B05.A00310;Missing Technical Data
ANS1.C.B05.A00311;Inconsistent Information regarding safety classification
ANS1.C.B05.A00312;Missing Technical Data
ANS1.C.B05.A00313;Missing Technical Data
ANS1.C.B05.A00314;Missing Technical Data
ANS1.C..A00315;
ANS1.C.B05.A00316;Inconvenient referencing.
ANS1.C.B05.A00317;Design information for manufacturing of reactor fuel
ANS1.C.B05.A00318;Design information for manufacturing of control rods
ANS1.C.B05.A00319;Design information for manufacturing 
ANS1.C.B05.A00320;Design information for manufacturing
ANS1.C.B05.A00321;Design information for manufacturing
ANS1.C.B05.A00322;Design information for manufacturing
ANS1.C.B05.A00323;Design information for manufacturing
ANS1.C.B05.A00324;Design information for manufacturing
ANS1.C.B05.A00325;Missing Technical Data
ANS1.C.B00.A00326;Regulatory documents which are not present in Licensing Basis List of Akkuyu
ANS1.C.B05.A00327;Missing information in PSAR Chapter 1.8.3 regarding PSA 
ANS1.C.B05.A00328;Inconsistency between PSAR Chapter 1.8.3 & PSA Documentation
ANS1.C.B05.A00329;Missing information on Radioactive Releases and Doses
ANS1.C.B05.A00330;Missing information on Radioactive Releases and Doses
ANS1.C.B05.A00331;Missing information on Radioactive Releases and Doses
ANS1.C.B05.A00332;Missing information on Radioactive Releases and Doses
ANS1.C.B05.A00333;Missing information on Radioactive Releases and Doses
ANS1.C.B05.A00334;Missing information on Radioactive Releases and Doses
ANS1.C.B05.A00335;Missing information on Radioactive Releases and Doses
ANS1.C.B05.A00336;Missing information on Radioactive Releases and Doses
ANS1.C.B05.A00337;Missing information on Radioactive Releases and Doses
ANS1.C.B05.A00338;Conformance to Article 4.5.2 of OPB-88/97 (NP-001-97)
ANS1.C.B05.A00339;Conformance to Article 2.3.3.14 of NP-082-07
ANS1.C.B05.A00340;Missing coolant circuit diagram
ANS1.C.B05.A00341;Missing information on core design constraints
ANS1.C.B05.A00342;Missing information on distribution of coolant flow rate in the core
ANS1.C.B05.A00343;Missing information on distribution of linear power density in the core
ANS1.C.B05.A00344;Missing information on distribution of coolant temperature at the core exit
ANS1.C.B05.A00345;Missing information on distribution of cladding temperature at the core exit
ANS1.C.B05.A00346;Missing information on hydraulic loads at high temperatures
ANS1.C.B00.A00347;Regulatory documents which are not present in Licensing Basis List of Akkuyu
ANS1.C.B05.A00348;Missing information on I&C systems
ANS1.C.B05.A00349;Missing information on I&C systems
ANS1.C.B05.A00350;Missing information
ANS1.C.B05.A00351;Missing information on I&C systems
ANS1.C.B05.A00352;Missing information on I&C systems
ANS1.C.B05.A00353;Missing information on description of safety related I&C subsystems
ANS1.C.B05.A00354;Missing information on monitoring and control systems and devices ensuring power unit normal operation
ANS1.C.B05.A00355;Missing information on limits and conditions of I&C systems
ANS1.C.B05.A00356;Missing information on I&C systems
ANS1.C.B05.A00357;Missing information on I&C systems
ANS1.C.B05.A00358;Missing information on I&C systems
ANS1.C.B05.A00359;Missing information on I&C systems
ANS1.C.B05.A00360;Missing information on I&C systems
ANS1.C.B05.A00361;Missing information on I&C systems
ANS1.C.B05.A00362;Missing information on I&C systems
ANS1.C.B05.A00363;Missing information on I&C systems
ANS1.C.B05.A00364;Missing information on I&C systems
ANS1.C.B05.A00365;Missing information on I&C systems
ANS1.C.B09.A00366;Missing information
ANS1.C.B09.A00367;Missing information
ANS1.C.B09.A00368;Missing information
ANS1.C.B09.A00369;Missing information
ANS1.C.B09.A00370;Missing information
ANS1.C.B09.A00371;Missing information
ANS1.C.B09.A00372;Abbreviation issues.
ANS1.C.B09.A00373;Missing information
ANS1.C.B09.A00374;Missing information
ANS1.C.B09.A00375;Missing information
ANS1.C.B09.A00376;Unclear criteria
ANS1.C.B05.A00377;Missing Technical Data
ANS1.C.B05.A00378;Missing Information
ANS1.C.B05.A00379;Missing Information
ANS1.C.B05.A00380;Missing Information
ANS1.C.B05.A00381;Missing Information
ANS1.C.B05.A00382;Missing Information
ANS1.C.B05.A00383;Missing Reference
ANS1.C.B05.A00384;Inconsistent Information 
ANS1.C.B05.A00385;Inconsistent Information 
ANS1.C.B05.A00386;Inconsistent Information 
ANS1.C.B05.A00387;Need to provide detailed factors in determining the structure of the operating organization and its staffing requirements  
ANS1.C.B05.A00388;Missing information regarding goals and objectives of plant management and its requirements.   
ANS1.C.B05.A00389;Missing information regarding duties, authorities, requirements for training and qualifications of contractor personnel or temporary personnel
ANS1.C.B05.A00390;Clarification of requirements regarding staffing of shift operating personnel 
ANS1.C.B05.A00391;Missing information regarding responsibilities of shift operating supervisor.  
ANS1.C.B05.A00392;Missing information regarding functions of shift technical advisor. 
ANS1.C.B05.A00393;Inconsistencies related to safety class and seismic category and quality group of RWM systems
ANS1.C.B05.A00394;Missing information 
ANS1.C.B05.A00395;Non compliant information 
ANS1.C.B05.A00396;Non compliant information 
ANS1.C.B05.A00397;Non compliant information 
ANS1.C.B05.A00398;Missing information 
ANS1.C.B05.A00399;Missing information 
ANS1.C.B05.A00400;Missing information 
ANS1.C.B05.A00401;Missing information 
ANS1.C.B05.A00402;Non-compliant information
ANS1.C.B05.A00403;Non-compliant information
ANS1.C.B05.A00404;Missing information
ANS1.C.B05.A00405;Non-compliant information
ANS1.C.B05.A00406;Non-compliant information
ANS1.C.B05.A00407;Non-compliant information
ANS1.C.B05.A00408;Non-consistent information
ANS1.C.B05.A00409;Non-compliant information
ANS1.C.B05.A00410;Non-compliant information
ANS1.C.B05.A00411;Missing Reference
ANS1.C.B05.A00412;Inconsistent information
ANS1.C.B05.A00413;Missing information
ANS1.C.B05.A00414;Inconsistent Information
ANS1.C.B05.A00415;Missing Reference
ANS1.C.B05.A00416;Missing Reference
ANS1.C.B05.A00417;Referencing issue
ANS1.C.B05.A00418;Inconsistent Information
ANS1.C.B05.A00419;Inconsistent Information
ANS1.C.B05.A00420;Missing information on I&C systems
ANS1.C.B05.A00421;Missing information on I&C systems
ANS1.C.B05.A00422;Missing information on I&C systems
ANS1.C.B05.A00423;Missing information on I&C systems
ANS1.C.B05.A00424;Missing information on I&C systems
ANS1.C.B05.A00425;Incompliances related to safety and seismic classes, and quality groups of gaseous and liquid RWM systems
ANS1.C.B05.A00426;Missing Technical Data
ANS1.C.B05.A00427;Missing Technical Data
ANS1.C.B05.A00428;Secondary Projectile Generation
ANS1.C.B05.A00429;Information on shock-absorbing devices
ANS1.C.B05.A00430;Pipeline route diagrams with enough details
ANS1.C.B05.A00431;Geotechnical aspects of site evaluation (IAEA SEED Mission / Geotechnic-1.1
ANS1.C.B05.A00432;Geotechnical aspects of site evaluation (IAEA SEED Mission / Geotechnic-1.3)
ANS1.C.B05.A00433;Geotechnical aspects of site evaluation (IAEA SEED Mission / Geotechnic-1.4)
ANS1.C.B05.A00434;New response analyses according to the final soil characterization and design solutions (IAEA SEED Mission / Seismic-1)
ANS1.C.B05.A00435;Seismic systems interaction between components of different categories (IAEA SEED Mission / Seismic-2)
ANS1.C.B05.A00436;Soil uncertainties and control in site response analyses (IAEA SEED Mission / Seismic-3)
ANS1.C.B05.A00437;Soil uncertainties in soil structure interaction (IAEA SEED Mission / Seismic-4)
ANS1.C.B05.A00438;Soil uncertainties in soil structure interaction (IAEA SEED Mission / Seismic-4)
ANS1.C.B05.A00439;Standards for seismic qualification by test (IAEA SEED Mission / Seismic-5)
ANS1.C.B05.A00440;Seismic instrumentation compliance with IAEA requirements (IAEA SEED Mission / Seismic-6)
ANS1.C.B05.A00441;Methodology for performing a seismic margin assessment (IAEA SEED Mission / Seismic-7)
ANS1.C.B05.A00442;Methodology for seismic design and analysis of Seismic Category I earth structures (IAEA SEED Mission / Seismic-8)
ANS1.C.B05.A00443;Methodology for Soil-Structure Interaction (SSI) (IAEA SEED Mission/Seismic-9)
ANS1.C.B05.A00444;Standards for capacity assessment of concrete and steel structures (IAEA SEED Mission / Seismic-10)
ANS1.C.B05.A00445;Philosophy for beyond design basis AC event (IAEA SEED Mission / Aircraft Crash-1)
ANS1.C.B05.A00446;List of buildings selected for AC analysis (IAEA SEED Mission / Aircraft Crash-2)
ANS1.C.B05.A00447;Impact scenarios for all buildings which are indicated to be designed for AC (IAEA SEED Mission / Aircraft Crash-3)
ANS1.C.B05.A00448;Load-Time Function for B747 (IAEA SEED Mission / Aircraft Crash-4)
ANS1.C.B05.A00449;Reinforcement drawings for judging adequacy of the AC design (IAEA SEED Mission / Aircraft Crash-5)
ANS1.C.B05.A00450;Subsequent analyses for local effects and FRS for beyond design AC scenarios (IAEA SEED Mission / Aircraft Crash-6)
ANS1.C.B05.A00451;Drawings and analyses of UFA (IAEA SEED Mission / Aircraft Crash-7)
ANS1.C.B05.A00452;UKS AC analysis in PSAR (IAEA SEED Mission / Aircraft Crash-8)
ANS1.C.B05.A00453;UFC (New fuel storage building) (IAEA SEED Mission / Aircraft Crash-9)
ANS1.C.B05.A00454;Inconsistent information related to tsunami (IAEA SEED Mission / Tsunami-1)
ANS1.C.B05.A00455;Consideration of Uncertainties (IAEA SEED Mission / Tsunami-2)
ANS1.C.B05.A00456;Safety Margins against Tsunami (IAEA SEED Mission / Tsunami-3)
ANS1.C.B05.A00457;Nuclear safety principles in case of external impact
ANS1.C.B05.A00458;Backfilling activities
ANS1.C.B05.A00459;GIS based information
ANS1.C.B05.A00460;Groundwater
ANS1.C.B05.A00461;Geotechnical parameters specific to safety important structures 
ANS1.C.B05.A00462;Missing Reference
ANS1.C.B05.A00463;Missing Information
ANS1.C.B05.A00464;Missing Information
ANS1.C.B05.A00465;Missing Information
ANS1.C.B05.A00466;Inconsistent information
ANS1.C.B05.A00467;Inconsistent information
ANS1.C.B05.A00468;Missing information
ANS1.C.B05.A00469;Missing information
ANS1.C.B05.A00470;Missing reference
ANS1.C.B05.A00471;Missing information
ANS1.C.B05.A00472;Descriptions are missing.
ANS1.C.B05.A00473;Descriptions are missing.
ANS1.C.B05.A00474;Descriptions are missing.
ANS1.C.B05.A00475;Missing Information
ANS1.C.B05.A00476;Missing Information
ANS1.C.B05.A00477;Missing technical data
ANS1.C.B05.A00478;Missing information on I&C systems
ANS1.C.B05.A00479;Missing information regarding individual communication
ANS1.C.B05.A00480;Missing information regarding calculation Input data used for safety analysis
ANS1.C.B05.A00481;Missing information regarding system components which do not affect safety
ANS1.C.B05.A00482;Missing information
ANS1.C.B05.A00483;Missing information
ANS1.C.B05.A00484;Missing information on performance criteria of I&C systems
ANS1.C.B05.A00485;Missing information on I&C systems
ANS1.C.B05.A00486;Missing information on I&C systems
ANS1.C.B05.A00487;Missing information on I&C systems
ANS1.C.B05.A00488;Missing information on I&C systems
ANS1.C.B05.A00489;Missing information on I&C systems
ANS1.C.B05.A00490;Missing information on I&C systems
ANS1.C.B05.A00491;Missing information on I&C systems
ANS1.C.B05.A00492;Conformance to Article 9(1) of Reg. on Design Principles for Safety of NPPs
ANS1.C.B05.A00493;Conformance to Article 4.5.6 of OPB-88/97 (NP-001-97)
ANS1.C.B05.A00494;Conformance to Article 2.3.1.6 of NP-082-07
ANS1.C.B05.A00495;Conformance to Article 2.3.1.6 of NP-082-07
ANS1.C.B05.A00496;Conformance to Article 2.3.1.7 of NP-082-07
ANS1.C.B05.A00497;Conformance to Article 2.3.3.8 of NP-082-07
ANS1.C.B05.A00498;Conformance to Article 2.3.3.17 of NP-082-07
ANS1.C.B05.A00499;Conformance to Article 2.4.12 of NP-082-07
ANS1.C.B05.A00500;Conformance to Paragraph 6.4 of SSR-2/1 Rev. 1
ANS1.C.B05.A00501;Inconsistency in fuel rod clad temperature
ANS1.C.B05.A00502;Missing references for information on core heat transfer
ANS1.C.B13.A00503;Need for citation of references in text of PTQP and submission of electronic copies of references
ANS1.C.B05.A00504;Missing information
ANS1.C.B05.A00505;Missing references
ANS1.C.B05.A00506;Normal and safe operation limits
ANS1.C.B05.A00507;Permissible volumetric activity (PVApers.) for group A personnel on I-131
ANS1.C.B05.A00508;Missing reference
ANS1.C.B05.A00509;Planned special exposure during radiation accident consequences management
ANS1.C.B05.A00510;Missing information 
ANS1.C.B05.A00511;Missing references
ANS1.C.B05.A00512;Calculation program
ANS1.C.B05.A00513;Radiation sources
ANS1.C.B05.A00514;Main dose limits (DL) for normal operation conditions
ANS1.C.B05.A00515;Missing references 
ANS1.C.B05.A00516;Main dose limits (DL) for normal operation conditions
ANS1.C.B05.A00517;RSAMS information
ANS1.C.B05.A00518;Inconsistency of Medical Care with ALARA principle
ANS1.C.B05.A00519;Compatibility of monitoring limits with Turkish Legislation and IAEA documents.
ANS1.C.B05.A00520;Missing information
ANS1.C.B05.A00521;Clarification request for measurement range selection for liquid discharge
ANS1.C.B05.A00522;Missing information 
ANS1.C.B05.A00523;Incompliance with national regulation 
ANS1.C.B05.A00524;Missing information 
ANS1.C.B05.A00525;Missing information 
ANS1.C.B05.A00526;Missing information 
ANS1.C.B05.A00527;Missing information 
ANS1.C.B05.A00528;Missing information 
ANS1.C.B05.A00529;Missing information 
ANS1.C.B05.A00530;Missing information 
ANS1.C.B05.A00531;Missing information 
ANS1.C.B05.A00532;Missing topics
ANS1.C.B05.A00533;Missing topics
ANS1.C.B05.A00534;Missing topics
ANS1.C.B05.A00535;Missing topics
ANS1.C.B05.A00536;Missing topics
ANS1.C.B05.A00537;Missing information
ANS1.C.B05.A00538;Missing information
ANS1.C.B05.A00539;Missing information
ANS1.C.B05.A00540;Missing information
ANS1.C.B05.A00541;Missing information
ANS1.C.B05.A00542;Some descriptions and analysis with enough details
ANS1.C.B05.A00543;Some descriptions and analysis with enough details
ANS1.C.B05.A00544;Missing information
ANS1.C.B05.A00545;Missing information
ANS1.C.B05.A00546;Missing information
ANS1.C.B05.A00547;Missing information
ANS1.C.B05.A00548;Missing information
ANS1.C.B05.A00549;Missing information
ANS1.C.B05.A00550;Missing information
ANS1.C.B05.A00551;Missing information
ANS1.C.B05.A00552;Missing information
ANS1.C.B05.A00553;Missing information
ANS1.C.B05.A00554;Design information for manufacturing of Fuel assembly
ANS1.C.B05.A00555;Design information for manufacturing of Control rod assembly
ANS1.C.B05.A00556;Design information for manufacturing of JAA Pressure vessel
ANS1.C.B05.A00557;Design information for manufacturing of JAB Pressure vessel upper unit
ANS1.C.B05.A00558;Design information for manufacturing of JAC Core Barrel
ANS1.C.B05.A00559;Design information for manufacturing of JAB Sealing parts of the main reactor joint
ANS1.C.B05.A00560;Design information for manufacturing of JEA Steam generators
ANS1.C.B05.A00561;Design information for manufacturing of of JEA Steam generators pilot-operated safety valves
ANS1.C.B05.A00562;Design information for manufacturing of JEA Hydraulic shock absorbers
ANS1.C.B05.A00563;Design information for manufacturing of JEC Main coolant pipelines
ANS1.C.B05.A00564;Design information for manufacturing of JEB Reactor coolant pump set
ANS1.C.B05.A00565;Design information for manufacturing of JEF Pressurizer vessel
ANS1.C.B05.A00566;Design information for manufacturing of JEF Pressurizer system pipelines
ANS1.C.B05.A00567;Design information for manufacturing of JEF Pressurizer system valves
ANS1.C.B05.A00568;Design information for manufacturing of JEF21-23 Pressurizer pilot-operated safety valves
ANS1.C.B05.A00569;Design information for manufacturing of JEG Pressurizer relief tank (bubbler tank)
ANS1.C.B05.A00570;Design information for manufacturing of MAA-MAB-MAC Steam Turbine
ANS1.C.B05.A00571;Design information for manufacturing of MAJ10AP001 Vacuum pumps
ANS1.C.B05.A00572;Design information for manufacturing of LAD71AC001 High pressure regenerator heat exchanger
ANS1.C.B05.A00573;Design information for manufacturing of LCJ30AP001 LPH-3, 4 condensate return pumps
ANS1.C.B05.A00574;Design information for manufacturing of LAC10AP001 Main feedwater pumps
ANS1.C.B05.A00575;Design information for manufacturing of BRU-C Turbine bypass valves
ANS1.C.B05.A00576;Design information for manufacturing of JNG50-80 Emergency core cooling system accumulator
ANS1.C.B05.A00577;Design information for manufacturing of JNG50-80 Emergency core cooling system pipelines
ANS1.C.B05.A00578;Design information for manufacturing of JNG50-80 Emergency core cooling system valves
ANS1.C.B05.A00579;Design information for manufacturing of KTP Emergency gas removal system valves
ANS1.C.B05.A00580;Design information for manufacturing of JNG10-40 Passive core flooding system accumulator
ANS1.C.B05.A00581;Design information for manufacturing of JNG10-40 Passive core flooding system double check valves
ANS1.C.B05.A00582;Design information for manufacturing of JNG50 PHRS Air duct
ANS1.C.B05.A00583;Design information for manufacturing of JNG50 PHRS Heat exchanger
ANS1.C.B05.A00584;Design information for manufacturing of JNG50 PHRS Upper air gates
ANS1.C.B05.A00585;Design information for manufacturing of JNG50 PHRS Control device (regulator valves)
ANS1.C.B05.A00586;Design information for manufacturing of JNA Emergency and planned cooldown heat exchanger
ANS1.C.B05.A00587;Design information for manufacturing of JNA Emergency and planned cooldown HP pumps
ANS1.C.B05.A00588;Design information for manufacturing of JNA Emergency and planned cooldown LP pumps
ANS1.C.B05.A00589;Design information for manufacturing of JND Emergency boron injection pumps
ANS1.C.B05.A00590;Design information for manufacturing of JNB10 SG Emergency cooldown pumps
ANS1.C.B05.A00591;Design information for manufacturing of JNB10 SG Emergency cooldown heat exchangers
ANS1.C.B05.A00592;Design information for manufacturing of JNB10 SG Emergency cooldown fast acting valves
ANS1.C.B05.A00593;Design information for manufacturing of KAA Component cooling system for reactor building secured load heat exchanger
ANS1.C.B05.A00594;Design information for manufacturing of KAA Component cooling system for reactor building secured load pumps
ANS1.C.B05.A00595;Design information for manufacturing of JMN Sprinkling solution water-jet pump
ANS1.C.B05.A00596;Design information for manufacturing of LBA10-40 AA002, AA95 MSIV motor-operated gate valves
ANS1.C.B05.A00597;Design information for manufacturing of KBA Volume control system blowdown regenerative heat exchanger
ANS1.C.B05.A00598;Design information for manufacturing of safety class I Cranes
ANS1.C.B05.A00599;Design information for manufacturing of UJA20WB Piping penetrations of the reactor building
ANS1.C.B05.A00600;Design information for manufacturing of PEC Vertical centrifugal pumps for sea water intake
ANS1.C.B05.A00601;Design information for manufacturing of JKM Core catcher
ANS1.C.B05.A00602;Missing Information- Unresolved issue from SPR & LWP
ANS1.C.B05.A00603;Missing Information- Unresolved issue from SPR & LWP
ANS1.C.B05.A00604;Non-Compliant Information with SPR Meteorology
ANS1.C.B05.A00605;Missing Information
ANS1.C.B05.A00606;Missing Information
ANS1.C.B05.A00607;Missing Information
ANS1.C.B05.A00608;Missing Information
ANS1.C.B05.A00609;Missing Information
ANS1.C.B05.A00610;Missing Information
ANS1.C.B05.A00611;Missing Information
ANS1.C.B05.A00612;Missing Information
ANS1.C.B05.A00613;Missing Information
ANS1.C.B05.A00614;Missing Information
ANS1.C.B05.A00615;Missing Information
ANS1.C.B05.A00616;Missing Information
ANS1.C.B05.A00617;Missing Information
ANS1.C.B05.A00618;Missing Information
ANS1.C.B05.A00619;Missing Information
ANS1.C.B05.A00620;Missing Information
ANS1.C.B05.A00621;Improperly arranged and possibly incomplete information
ANS1.C.B05.A00622;Possibility of NPP switch over to a balanced load in case of a system accident
ANS1.C.B05.A00623;Explanation on RD 210-006-90 switchyard requirements
ANS1.C.B05.A00624;Overvoltage protection of DC loads
ANS1.C.B05.A00625;Climatic conditions of EPSS
ANS1.C.B05.A00626;Explanation on ALT asynchronous currents
ANS1.C.B05.A00627;Explanation on relaying
ANS1.C.B05.A00628;Physical Separation
ANS1.C.B05.A00629;Explanation on switchyard SSG-34 requirements
ANS1.C.B05.A00630;Missing information on alternate diesel generator
ANS1.C.B05.A00631;Missing information on ageing management program
ANS1.C.B06.A00632;Missing Information & Inconsistency in the Accident Sequence Modelling in Book 4
ANS1.C.B06.A00633;Missing information for Valve - 11JNA10AA003
ANS1.C.B06.A00634;Cavitation-free operation of JNA during accidents
ANS1.C.B06.A00635;Air cooling in rooms
ANS1.C.B06.A00636;Reliability of PHRS in Akkuyu Site Conditions
ANS1.C.B06.A00637;Allowable time for On-line Maintenance in Akkuyu NPP
ANS1.C.B06.A00638;Missing information & Inconsistent statements for Identification of POS List 
ANS1.C.B06.A00639;Missing analysis of residual heat for grouping of POSs & identification of POS parameters 
ANS1.C.B06.A00640;Identification of POS parameters in a not conservative way. 
ANS1.C.B06.A00641;Missing information on initiating events due to inspections and tests
ANS1.C.B05.A00642;Missing information about redundancy, diversity, fail-safe, physical separation/independence principles in design of gaseous radioactive waste management systems
ANS1.C.B05.A00643;Missing information about redundancy principle in design of some liquid radioactive waste management systems
ANS1.C.B05.A00644;Missing information about redundancy, diversity, fail-safe, physical separation/independence principles in design of liquid radioactive waste management systems
ANS1.C.B05.A00645;Missing information regarding gaseous waste management systems
ANS1.C.B05.A00646;Missing information on gaseous radioactive waste systems
ANS1.C.B05.A00647;Missing information on liquid radioactive waste systems
ANS1.C.B05.A00648;Missing information on liquid radioactive waste systems
ANS1.C.B05.A00649;Missing information on liquid radioactive waste systems
ANS1.C.B05.A00650;Missing information on liquid radioactive waste systems
ANS1.C.B05.A00651;Missing information on gaseous radioactive waste systems
ANS1.C.B05.A00652;Missing information on gaseous radioactive waste systems
ANS1.C.B05.A00653;Missing information on activity of radioactive wastes
ANS1.C.B05.A00654;Missing information on radioactive leakages 
ANS1.C.B05.A00655;Missing information on gaseous radioactive waste systems
ANS1.C.B05.A00656;Missing information regarding gaseous waste management systems
ANS1.C.B05.A00657;Inconsistent information on RW storage capacity 
ANS1.C.B05.A00658;Missing information on spent fuel management option 
ANS1.C.B05.A00659;Missing information for “At-reactor SNF storage system”
ANS1.C.B05.A00660;Missing information for “Spent nuclear fuel storage system”
ANS1.C.B05.A00661;Missing information for “Primary coolant low-temperature purification system”
ANS1.C.B05.A00662;Missing information for “Fuel storage and refuelling pool water purification system”
ANS1.C.B05.A00663;Missing information for “coolant treatment system”
ANS1.C.B05.A00664;Missing information for “floor water treatment system”
ANS1.C.B05.A00665;Missing information for “Radioactive sewerage system of the 10UJA and 10UKC buildings (the pressure part)”
ANS1.C.B05.A00666;Missing information for “Decontamination system”
ANS1.C.B05.A00667;Missing information for “Radwaste Collection, Reprocessing and Storage systems”
ANS1.C.B05.A00668;Spent MOX Fuel Storage at “At-reactor SNF storage system” and “Spent nuclear fuel storage (SNFS)”
ANS1.C.B05.A00669;Detail request for “reactor coolant circuit emergency and planned cooldown and fuel pool cooling system, JNA”
ANS1.C.B05.A00670;Missing information on commissioning of “At-reactor SNF storage system”
ANS1.C.B05.A00671;Missing information for “At-reactor SNF storage system” (operation)
ANS1.C.B05.A00672;Missing information for “Spent nuclear fuel storage (SNFS)” (operation)
ANS1.C.B05.A00673;Missing information on commissioning of “Spent nuclear fuel storage (SNFS)”
ANS1.C.B05.A00674;Nuclear hazardous operations
ANS1.C.B05.A00675;Tests and inspections
ANS1.C.B05.A00676;Analysis of design
ANS1.C.B06.A00677 ;Missing information on dependent failures between multi-units
ANS1.C.B06.A00678 ;Missing information in identification of initiating events
ANS1.C.B06.A00679 ;Consideration of mission time longer than 24 hours
ANS1.C.B06.A00680 ;Effect of mission time on Fuel damage probability
ANS1.C.B06.A00681 ;Construction of emergency sequences
ANS1.C.B06.A00682 ;Missing fault trees of PSA Book 12,13,14,15,16 & 17
ANS1.C.B06.A00683 ;Missing information & inconsistency about Dnom 200 pipeline in the sump suction line.
ANS1.C.B05.A00684 ;Missing information on start up loads
ANS1.C.B05.A00685 ;Missing information on SS loads
ANS1.C.B05.A00686 ;Missing information 
ANS1.C.B05.A00687 ;Missing information regarding erroneous personnel actions
ANS1.C.B05.A00688 ;Missing information
ANS1.C.B05.A00689 ;Missing information
ANS1.C.B05.A00690 ;Missing information
ANS1.C.B05.A00691 ;Missing information
ANS1.C.B05.A00692 ;Missing information
ANS1.C.B05.A00693 ;Missing information
ANS1.C.B05.A00694 ;Missing information on description of safety related I&C subsystems
ANS1.C.B05.A00695 ;Missing information on I&C systems
ANS1.C.B05.A00696 ;Missing information on I&C systems
ANS1.C.B05.A00697 ;Missing information on I&C systems
ANS1.C.B05.A00698 ;Missing information on I&C systems
ANS1.C.B05.A00699 ;Missing information on I&C systems
ANS1.C.B05.A00700 ;Missing information on I&C systems
ANS1.C.B05.A00701 ;Missing information on I&C systems
ANS1.C.B05.A00702 ;Missing information on I&C systems
ANS1.C.B05.A00703 ;Missing information on I&C systems
ANS1.C.B05.A00704 ;Missing information on I&C systems
ANS1.C.B05.A00705 ;Missing information on I&C systems
ANS1.C.B05.A00706 ;Missing information on I&C systems
ANS1.C.B05.A00707 ;Missing information on I&C systems
ANS1.C.B05.A00708 ;Missing information on I&C systems
ANS1.C.B05.A00709 ;Missing information on I&C systems
ANS1.C.B05.A00710 ;Missing information on I&C systems
ANS1.C.B05.A00711 ;Missing information on I&C systems
ANS1.C.B05.A00712 ;Missing information on I&C systems
ANS1.C.B05.A00713 ;Missing information on I&C systems
ANS1.C.B05.A00714 ;Missing information on I&C systems
ANS1.C.B05.A00715 ;Missing information on I&C systems
ANS1.C.B05.A00716 ;Missing information on I&C systems
ANS1.C.B05.A00717;Missing information on I&C systems
ANS1.C.B05.A00718 ;Missing information on I&C systems
ANS1.C.B05.A00719 ;Missing information on I&C systems
ANS1.C.B05.A00720 ;Missing information on I&C systems
ANS1.C.B05.A00721 ;Missing information on I&C systems
ANS1.C.B05.A00722 ;Missing information on I&C systems
ANS1.C.B05.A00723 ;Missing information on I&C systems
ANS1.C.B05.A00724 ;Missing information on I&C systems
ANS1.C.B05.A00725 ;Missing information on I&C systems
ANS1.C.B05.A00726 ;Missing information on I&C systems
ANS1.C.B05.A00727 ;Missing information on I&C systems
ANS1.C.B05.A00728 ;Missing information on I&C systems
ANS1.C.B05.A00729 ;Missing information on I&C systems
ANS1.C.B05.A00730 ;Missing information on I&C systems
ANS1.C.B05.A00731 ;Missing information on I&C systems
ANS1.C.B05.A00732 ;Missing information on I&C systems
ANS1.C.B05.A00733 ;Missing information on I&C systems
ANS1.C.B05.A00734 ;Missing information on I&C systems
ANS1.C.B05.A00735 ;Missing information on I&C systems
ANS1.C.B05.A00736 ;Missing information on I&C systems
ANS1.C.B05.A00737 ;Missing information on I&C systems
ANS1.C.B05.A00738 ;Missing information on I&C systems
ANS1.C.B05.A00739 ;Missing information on I&C systems
ANS1.C.B05.A00740 ;Missing information on I&C systems
ANS1.C.B05.A00741 ;Missing information on I&C systems
ANS1.C.B05.A00742 ;Missing information on I&C systems
ANS1.C.B05.A00743 ;Missing information on I&C systems
ANS1.C.B05.A00744 ;Missing information on I&C systems
ANS1.C.B05.A00745 ;Missing information on I&C systems
ANS1.C.B05.A00746 ;Missing information on I&C systems
ANS1.C.B05.A00747 ;Missing information on I&C systems
ANS1.C.B05.A00748 ;Missing information on I&C systems
ANS1.C.B05.A00749;Missing information on I&C systems
ANS1.C.B05.A00750;Missing information on I&C systems
ANS1.C.B05.A00751;Missing information on I&C systems
ANS1.C.B05.A00752;Missing information on I&C systems
ANS1.C.B05.A00753;Missing information on I&C systems
ANS1.C.B05.A00754;Missing information on I&C systems
ANS1.C.B05.A00755;Missing information on I&C systems
ANS1.C.B05.A00756;Missing information on I&C systems
ANS1.C.B05.A00757;Missing information on I&C systems
ANS1.C.B05.A00758;Missing information on I&C systems
ANS1.C.B05.A00759;Missing information on I&C systems
ANS1.C.B05.A00760;Missing information on I&C systems
ANS1.C.B05.A00761;Missing information on I&C systems
ANS1.C.B05.A00762;Missing information on I&C systems
ANS1.C.B05.A00763;Missing information on I&C systems
ANS1.C.B05.A00764;Missing information on I&C systems
ANS1.C.B05.A00765;Missing information on I&C systems
ANS1.C.B05.A00766;Missing information on I&C systems
ANS1.C.B05.A00767;Missing information on I&C systems
ANS1.C.B05.A00768;Missing information on I&C systems
ANS1.C.B05.A00769;Missing information on I&C systems
ANS1.C.B05.A00770;Missing information on I&C systems
ANS1.C.B05.A00771;Missing information on I&C systems
ANS1.C.B05.A00772;Missing information on I&C systems
ANS1.C.B05.A00773;Missing information on I&C systems
ANS1.C.B05.A00774;Missing information on I&C systems
ANS1.C.B05.A00775;Missing information on I&C systems
ANS1.C.B05.A00776;Missing information on I&C systems
ANS1.C.B05.A00777;Missing information on I&C systems
ANS1.C.B05.A00778;Missing information on I&C systems
ANS1.C.B05.A00779;Missing information on I&C systems
ANS1.C.B05.A00780;Missing information on I&C systems
ANS1.C.B05.A00781;Missing information on I&C systems
ANS1.C.B05.A00782;Missing information on I&C systems
ANS1.C.B05.A00783;Missing information on I&C systems
ANS1.C.B05.A00784;Missing information on I&C systems
ANS1.C.B05.A00785;Missing information on I&C systems
ANS1.C.B05.A00786;Missing information on I&C systems
ANS1.C.B05.A00787;Missing information on I&C systems
ANS1.C.B05.A00788;Missing information on I&C systems
ANS1.C.B05.A00789;Missing information on I&C systems
ANS1.C.B05.A00790;Missing information on I&C systems
ANS1.C.B05.A00791;Missing information on I&C systems
ANS1.C.B05.A00792;Missing information on I&C systems
ANS1.C.B05.A00793;Missing information on I&C systems
ANS1.C.B05.A00794;Missing information on I&C systems
ANS1.C.B05.A00795;Missing information on I&C systems
ANS1.C.B05.A00796;Missing information on I&C systems
ANS1.C.B05.A00797;Missing information on I&C systems
ANS1.C.B05.A00798;Missing information on I&C systems
ANS1.C.B05.A00799;Missing information on I&C systems
ANS1.C.B05.A00800;Missing information on I&C systems
ANS1.C.B05.A00801;Missing information on I&C systems
ANS1.C.B05.A00802;Missing information on I&C systems
ANS1.C.B05.A00803;Missing information on I&C systems
ANS1.C.B05.A00804;Missing information on I&C systems
ANS1.C.B05.A00805;Missing information on I&C systems
ANS1.C.B05.A00806;Missing information on I&C systems
ANS1.C.B05.A00807;Missing information on I&C systems
ANS1.C.B05.A00808;Missing information on I&C systems
ANS1.C.B05.A00809;Missing information
ANS1.C.B05.A00810;Missing information
ANS1.C.B05.A00811;Missing information
ANS1.C.B05.A00812;Missing information
ANS1.C.B05.A00813;Missing information
ANS1.C.B05.A00814;Mismatch in reference
ANS1.C.B05.A00815;Inconsistency of Medical Care with ALARA principle
ANS1.C.B05.A00816;Missing References
ANS1.C.B05.A00817;Radiation monitoring systems
ANS1.C.B05.A00818;Missing explanation regarding flow -5 t/h- from KBA. 
ANS1.C.B05.A00819;Missing initial condition related with the conductivity of gas gap between fuel pellet and cladding In PSAR 15 Book5  15.5.6.3  LB LOCA 
ANS1.C.B05.A00820;Inconsistency In operation of system. PSAR 15 Book 5   15.5.6.3  and  PSAR 15 Book 9  15.7.3.3.4 
ANS1.C.B05.A00821;Missing information related with the containment pressure and temperature   
ANS1.C.B05.A00822;Explanation of missing scenario related with the 15.5.10  
ANS1.C.B05.A00823;Need for clarification In PSAR 15 Book 6 scenario 15.5.6.8   
ANS1.C.B05.A00824;Explanation of assumption in scenario 15.6.1.1  
ANS1.C.B05.A00825;Annual dose limits for workers
ANS1.C.B05.A00826;“Regulation on Radiation Safety” and “Radiation Safety Decree” are inapplicable
ANS1.C.B05.A00827;Information about radioactive waste
ANS1.C.B05.A00828;Solid radioactive waste classification
ANS1.C.B05.A00829;Very short lived solid radioactive wastes
ANS1.C.B05.A00830;Process diagrams of SRW management systems
ANS1.C.B05.A00831;Processing and packaging methods for the large-size radioactive  waste
ANS1.C.B05.A00832;Possible short-term increase in the content of the radioactive products
ANS1.C.B05.A00833;Solid radioactive waste management systems incompatible with AES-2006 design
ANS1.C.B05.A00834;Quality assurance of solid radioactive waste management systems
ANS1.C.B05.A00835;Design information for manufacturing of JAC Pressure Vessel Internals Protective tube unit (PTU), baffle
ANS1.C.B05.A00836;Updating of  document “20170328_ID for UJV+eng.xls”
ANS1.C.B05.A00837;Inconsistency of “list of accident in PSAR 15” and “NP-006-98 annex 15-1”
ANS1.C.B05.A00838;Inconsistency of “list of accident in PSAR 15” and “NP-006-98 annex 15-1”
ANS1.C.B05.A00839;Missing accident, NP-006-98 Annex 15-1/ 7.1 and 7.4
ANS1.C.B05.A00840;Justification of selection of the scenario of the beyond design basis accidents without fuel melting
ANS1.C.B05.A00841;Missing Information
ANS1.C.B05.A00842;Missing Information
ANS1.C.B05.A00843;Missing Information
ANS1.C.B05.A00844;Missing Information
ANS1.C.B05.A00845;Missing Information
ANS1.C.B05.A00846;Unidentified graphic 15.6.1.5.16
ANS1.C.B05.A00847; Inconsistency  in operation of BRU-A, missing figure of operation of BRU-A  and  in scenario – table 15.6.1.6.2
ANS1.C.B05.A00848;Correction in PSAR related with the operation of HA-3 
ANS1.C.B05.A00849;Explanation of operation of PHRS related with the SG poisoning
ANS1.C.B10.A00850;Explanation for “Engineering Changes” indicated in Configuration Management program (Manual & Plan)
ANS1.C.B10.A00851;Submission of Master Equipment List (MEL) indicated in Configuration Management Manual
ANS1.C.B10.A00852;Explanation for “Audits” indicated in Configuration Management program (Manual & Plan)
ANS1.C.B05.A00853 ;Missing information for “At-reactor SNF storage system”
ANS1.C.B05.A00854 ;Missing information for “At-reactor SNF storage system”
ANS1.C.B05.A00855 ;Missing information for “At-reactor SNF storage system”
ANS1.C.B05.A00856 ;Missing information for “At-reactor SNF storage system”
ANS1.C.B05.A00857;Software/Program Table
ANS1.C.B05.A00858;Missing information
ANS1.C.B05.A00859;Missing information
ANS1.C.B06.A00860 ;Missing References of PSA Book 12,13,14,15 & 16
ANS1.C.B05.A00861 ;Missing information on dose assessment
ANS1.C.B05.A00862 ;Missing information on release limit of C-14
ANS1.C.B05.A00863 ;Missing information on LRW collection, segregation, chemical adjustment, pretreatment, decontamination, recycling and reuse
ANS1.C.B05.A00864 ;Missing information on LRW classification
ANS1.C.B05.A00865 ;Missing information on determination of health protection zone
ANS1.C.B05.A00866 ;Missing information on cementation system (00KPC) in 00UKS building
ANS1.C.B05.A00867 ;Missing information on minimization of gaseous waste generation
ANS1.C.B05.A00868 ;Missing information on minimization of liquid waste generation
ANS1.C.B05.A00869 ;Missing information on capacity of waste storage
ANS1.C.B05.A00870 ;Missing information on physical protection and radioactive waste accounting and tracking system
ANS1.C.B05.A00871 ;Missing information on storage of waste packages produced in 10KPC system and connection between LRW and SRW systems
ANS1.C.B05.A00872 ;Missing information on secondary liquid and gaseous radioactive waste
ANS1.C.B05.A00873 ;Missing information on WAC
ANS1.C.B05.A00874 ;Missing information on liquid discharges
ANS1.C.B05.A00875 ;Missing information on compliance with the regulations related to transport and packaging
ANS1.C.B05.A00876 ;Missing information on compliance with the regulations related to transport and packaging
ANS1.C.B05.A00877 ;Missing information on comparison with Novovoronezh-2 for pyrolosis system
ANS1.C.B05.A00878 ;Missing information on comparison with reference plant, NVV-2
ANS1.C.B05.A00879 ;Missing information on liquid discharges under different operational regimes
ANS1.C.B05.A00880 ;Missing information on connection between LRW and SRW systems
ANS1.C.B11.A00881 ;Missing subchapter for site selection study of ARSMS
ANS1.C.B05.A00882 ;Missing information for “Floor water treatment system”
ANS1.C.B05.A00883 ;Missing information for “Primary coolant low-temperature purification system”
ANS1.C.B05.A00884 ;Missing information for “Primary coolant low-temperature purification system”
ANS1.C.B05.A00885 ;Missing information for “Primary coolant low-temperature purification system”
ANS1.C.B05.A00886;(Brief but concise title for the AIR)Inconsistency of NP-006-98/15.2 and PSAR 15.2.1 beyond design basis accidents without fuel melting 
ANS1.C.B11.A00887 ;Sampling plot
ANS1.C.B11.A00888 ;Type of analyses
ANS1.C.B11.A00889 ;Clarification request
ANS1.C.B11.A00890 ;Inconsistent information
ANS1.C.B11.A00891 ;Missing reference
ANS1.C.B11.A00892 ;Irrelevant information
ANS1.C.B11.A00893 ;Missing references
ANS1.C.B11.A00894 ;Missing reference
ANS1.C.B11.A00895 ;Inconsistency with the regulatory document
ANS1.C.B11.A00896 ;Inconsistency between EMP and PSAR
ANS1.C.B11.A00897 ;Inconsistency between documents
ANS1.C.B11.A00898 ;Missing information
ANS1.C.B11.A00899 ;Investigation levels
ANS1.C.B11.A00900 ;Missing Reference for pre-operational monitoring study start-up
ANS1.C.B11.A00901 ;Missing information for harvest time
ANS1.C.B11.A00902 ;Missing objects of operational monitoring
ANS1.C.B11.A00903 ;Missing information of animal products for pre-operational monitoring
ANS1.C.B11.A00904 ;Non- compliant frequency for pre-operational monitoring sampling frequency
ANS1.C.B11.A00905;Non-compliant information for the purpose of air monitoring
ANS1.C.B11.A00906 ;Non-compliant information for the purpose of monitoring of water bodies
ANS1.C.B11.A00907 ;Non-compliant frequency of sediment sampling in fresh water and sea waters
ANS1.C.B11.A00908 ;Missing information on fish in previous surveys in pre-operational monitoring
ANS1.C.B11.A00909 ;Missing baseline radioactivity level information in pre-operational monitoring for foodstuffs
ANS1.C.B11.A00910 ;Missing information locally produced and consumed foodstuffs in the region based on dietary habits of public
ANS1.C.B11.A00911 ;Missing information for sediment monitoring during operational monitoring
ANS1.C.B11.A00912 ;Missing Information for Monitoring Methodology, Sampling and Periodicity of Measurements During Operation
ANS1.C.B11.A00913 ;Missing information for purpose and goals of operational monitoring and aquatic discharge
ANS1.C.B11.A00914 ;Missing information for Emergency Exposure Monitoring
ANS1.C.B05.A00915;Missing Information- Effect of Climate Change on Meteorological Parameters
ANS1.C.B05.A00916;Inconsistency of NP-006-98/15.2 and PSAR 15.2.1 beyond design basis accidents without fuel melting 
ANS1.C.B05.A00917 ;Missing information on voltage oscillations, availability of the automated dispatch system
ANS1.C.B05.A00918 ;Missing information on reliability of auxiliary power supply
ANS1.C.B05.A00919 ;Missing information on conditions to set limitations in power system for the NPP capacity
ANS1.C.B05.A00920 ;Missing information on possibility of frequency regulation in the system in case of system accidents
ANS1.C.B05.A00921 ;Missing information on possibility of automatic or manual disconnection of the NPP from the power system
ANS1.C.B05.A00922 ;Missing information on the turbine generators excitation control system
ANS1.C.B05.A00923 ;Missing information on quantitative auxiliary power supply analysis for all the different voltage values
ANS1.C.B05.A00924 ;Missing information on justification for absence of emergency automatic control.
ANS1.C.B05.A00925 ;Wrong classification of power generation switchgear
ANS1.C.B05.A00926 ;Connection voltage level of reserve auxiliary transformers and self-actuation of electric motors 
ANS1.C.B05.A00927;Missing information on setpoints of protection equipment 
ANS1.C.B05.A00928;Missing information on justification of technique and scope of incoming inspection
ANS1.C.B05.A00929;Missing information on analysis of failures in the main scheme and analysis of impact by failure consequences
ANS1.C.B05.A00930;Missing information on setpoints of protections for the unit transformer and generator
ANS1.C.B05.A00931;Missing information on two-phase remote protection into the relay protection and automation of the generator
ANS1.C.B05.A00932;Contradiction between informations given in different text about tap changers of transformer
ANS1.C.B05.A00933;Contradiction between informations given in different text about tap changers step values
ANS1.C.B05.A00934;Missing information on justification of the technique and scope of the incoming inspection, pre-commissioning test s for unit transformer equipment
ANS1.C.B05.A00935;Missing information on analysis of failures of the generator transformer unit equipment and analysis of impact by failure consequences
ANS1.C.B05.A00936;Missing information on monitoring equipment for indication of pressure and rate of hydrogen in the turbine cooling system
ANS1.C.B05.A00937;Missing information on the main circuit control points regarding control of the elements of 400 kV GICS
ANS1.C.B05.A00938;Missing information on analysis of failures of the normal operation auxiliary power supply system and that of failure consequences
;Missing information on the schemes of secondary commutation
ANS1.C.B05.A00940;Missing information on justification of the technique and scope of the incoming inspection, pre-commissioning tests for the main circuit equipment
ANS1.C.B05.A00941;Missing information on the results of assessment of impact caused by fires and related to burning of electrical cables on safety important nodes
ANS1.C.B05.A00942;Inconsistency with regulation
ANS1.C.B05.A00943;Missing technical data
ANS1.C.B05.A00944;Missing technical data
ANS1.C.B05.A00945;Missing technical data
ANS1.C.B05.A00946;Missing technical data
ANS1.C.B05.A00947;Missing technical data
ANS1.C.B05.A00948;Missing technical data
ANS1.C.B05.A00949;Missing technical data
ANS1.C.B05.A00950;Missing technical data
ANS1.C.B05.A00951;Missing technical data
ANS1.C.B05.A00952;Missing technical data
ANS1.C.B05.A00953;Missing technical data
ANS1.C.B05.A00954;Missing technical data
ANS1.C.B05.A00955;Missing technical data
;Missing technical data
ANS1.C.B05.A00957;Missing technical data
ANS1.C.B05.A00958;Missing technical data
ANS1.C.B05.A00959;Missing technical data
ANS1.C.B05.A00960;Missing technical data
ANS1.C.B05.A00961;Missing technical data
ANS1.C.B05.A00962 ;CAM Rigid Foundation Assumption
ANS1.C.B05.A00963 ;Lack of sensitivity study regarding foundation spring & dashpods
ANS1.C.B05.A00964 ;Correlation between 1D site response and heterogeneous layering
ANS1.C.B05.A00965 ;Seismic wave incoherence
ANS1.C.B05.A00966 ;Selection of different soil profiles (????)
ANS1.C.B05.A00967 ;Individual RS components of enveloped and broadened FRS
ANS1.C.B05.A00968 ;6x6 Condensation in CAM
ANS1.C.B05.A00969 ;Justification for the Employment of Single Set Ground Motion Time Histories
ANS1.C.B05.A00970 ;Explanation on RD 210-006-90 switchyard requirements
ANS1.C.B05.A00971 ;Isolation of Electrical SSC
ANS1.C.B05.A00972 ;Electrical Bus Voltage Profile Limitations
ANS1.C.B05.A00973 ;Short-circuit calculations
ANS1.C.B05.A00974 ;Short-circuit calculations
ANS1.C.B05.A00975 ;Load Limitations
ANS1.C.B05.A00976 ;Transformer OLTC functions
ANS1.C.B05.A00977 ;Bus Transfer Options
ANS1.C.B05.A00978 ;Deviations from Regulations
ANS1.C.B05.A00979 ;Missing information on equipment ratings and confirmation of design margins
ANS1.C.B05.A00980 ;Missing information on Relay protection of standby power sources
ANS1.C.B05.A00981;Missing information on starting systems for standby ac power sources
ANS1.C.B05.A00982 ;Missing information on motor loads
ANS1.C.B05.A00983 ;Missing information on overload operation
ANS1.C.B05.A00984 ;Missing information on rating and sizing of electrical equipment, cables and raceways
ANS1.C.B05.A00985;Missing information on safety standby AC power sources
ANS1.C.B05.A00986;Missing information on design features against common cause failure risk of software based devices
ANS1.C.B05.A00987 ;Missing information on distribution systems
ANS1.C.B05.A00988 ;Missing information on reliability of protective devices and high voltage equipment
ANS1.C.B05.A00989 ;Missing information on interface and interaction between TSO and NPP operator
ANS1.C.B05.A00990 ;Missing information on cable separation
ANS1.C.B05.A00991 ;Missing infromation on allowable frequency range of some equipments
ANS1.C.B05.A00992 ;Missing information on equipment qualification
ANS1.C.B05.A00993 ;Methodology used for seismic response dynamic analysis of the safety related structures, system and equipment
ANS1.C.B05.A00994;Missing information on human reliability analysis assumptions and limitations
ANS1.C.B05.A00995;Missing information on human reliability analysis
ANS1.C.B05.A00996;Inconsistent information 
ANS1.C.B05.A00997;Important building omitted
ANS1.C.B05.A00998 ;Missing information & inconsistent assumption about alternative spent fuel cooling options in Akkuyu NPP.
ANS1.C.B05.A00999;Missing initiating events in BDBA
ANS1.C.B05.A01000;Preparation of Procedures and submission of MEL
ANS1.C.B05.A01001;Envisaged administrative and engineering measures as per design to prevent erroneous opening of boundary valves by personnel
ANS1.C.B05.A01002;Design analysis of cooldown modes
ANS1.C.B05.A01003;FGC program
ANS1.C.B05.A01004;Transition from operation of high pressure pumps to operation of low pressure pumps
ANS1.C.B05.A01005;Functions of the pipelines and valves of JNA
ANS1.C.B05.A01006;Functions of the valves and pipelines of JND
ANS1.C.B05.A01007;Information about calculations 
ANS1.C.B05.A01008;Methodology used for seismic response dynamic analysis of the safety related structures
ANS1.C.B05.A01009;After effects of the human errors and potential failure of the valves control system 
ANS1.C.B05.A01010;Design flow rate of HA-2
ANS1.C.B05.A01011;Missing information
ANS1.C.B05.A01012;Missing information, designs of basic PHRS components
ANS1.C.B05.A01013;Missing information
ANS1.C.B05.A01014;Missing information
ANS1.C.B05.A01015 ;Functional Explanation Battery Loads and Valves
ANS1.C.B05.A01016 ;Functional Explanation Battery Loads and Valves
ANS1.C.B05.A01017 ;Functional Explanation Battery Loads and Valves
ANS1.C.B05.A01018 ;Functional Explanation Battery Loads and Valves
ANS1.C.B05.A01019;Justification of 15.5.1.5
ANS1.C.B05.A01020;Unvisible figure 15.6.2.2.3.12 
ANS1.C.B05.A01021;Missing information regarding physical protection system  
ANS1.C.B05.A01022;Missing information regarding the organizational measures 
ANS1.C.B05.A01023;Missing information regarding access control  
ANS1.C.B05.A01024;Need to redefinition of “areas” in accordance with the related Regulation
ANS1.C.B05.A01025;Need to redefinition of “areas” in accordance with the related Regulation
ANS1.C.B05.A01026;Quality System
ANS1.C.B05.A01027;Quality Assurance Programs
ANS1.C.B05.A01028;Design Control
ANS1.C.B05.A01029;Supply-related Documentation Control
ANS1.C.B05.A01030;Inspection Personnel Training Program and Methodologies
ANS1.C.B05.A01031;Test Control
ANS1.C.B05.A01032;Instrumentation and Testing Equipment Verification
ANS1.C.B05.A01033;Equipment handling, storage and transportation
ANS1.C.B05.A01034;Equipment handling, storage and transportation
ANS1.C.B05.A01035;Inconsistencies and points to be completed between PSAR and PSA-1
ANS1.C.B05.A01036;Inconsistencies and points to be completed between PSAR and PSA-1
ANS1.C.B05.A01037;Missing information on analysis methodologies
ANS1.C.B05.A01038;Missing information on software certification and verification
ANS1.C.B05.A01039;Missing technical data
ANS1.C.B05.A01040;Missing basic thermal diagram
ANS1.C.B05.A01041;Missing Technical Data
ANS1.C.B05.A01042;Missing Technical Data
ANS1.C.B05.A01043;Missing Technical Data
ANS1.C.B05.A01044;Inconsistent Information 
ANS1.C.B05.A01045;Inconsistent Information 
ANS1.C.B05.A01046;Inconsistent Information 
ANS1.C.B05.A01047;Determination of base mat stresses and deformations for 10UJA
ANS1.C.B05.A01048;Determined base mat stresses and deformations for 10UJA
ANS1.C.B05.A01049;10 UJA & UJG finalized design
ANS1.C.B05.A01050;10UJA Reactor Building Effective Stiffness Factors
ANS1.C.B05.A01051;10UJA Reactor Building Effective Stiffness Factors
ANS1.C.B05.A01052;Seismic capacity and behavior of prestressed inner containment
ANS1.C.B05.A01053;Complience of the new text of reworked sections with the rest of the document.
ANS1.C.B05.A01054;Confusing  information regarding system structure and functions.
ANS1.C.B05.A01055;Confusing  information regarding system structure and functions
ANS1.C.B05.A01056;Defense in Depth level regarding system structure.
ANS1.C.B05.A01057;Missing information regarding NFMS.
ANS1.C.B05.A01058;“Design  extension conditions (DEC)” approach
ANS1.C.B05.A01059;Missing abbreviations  
ANS1.C.B05.A01060;Missing information related to physical protection measures to be considered during the early phase of designing the NPP 
ANS1.C.B05.A01061;Missing information regarding the responsibilities 
ANS1.C.B05.A01062;Missing information about “Special Security Zone” statue of  Akkuyu NPPs 
ANS1.C.B05.A01063;Need to statement on written agreement between authorized person and relevant law enforcement bodies
ANS1.C.B05.A01064;Need to information about emergency action plan dedicated to nuclear security events.
ANS1.C.B05.A01065;Need to information about central alarm station
ANS1.C.B05.A01066;Uncertainty about periphery of protected area
ANS1.C.B05.A01067;Missing information regarding the structure of the Akkuyu NPP PPS.
ANS1.C.B05.A01068;Need to update of list of references and citation of them.
ANS1.C.B05.A01069;Differences between submissions, either error or design change
ANS1.C.B05.A01070;Contradictory statement for “At-reactor SNF storage system”
ANS1.C.B05.A01071;Contradictory statement for “At-reactor SNF storage system”
ANS1.C.B05.A01072;Missing calculation analysis for “At-reactor SNF storage system”
ANS1.C.B05.A01073;Missing document for Double Purpose Transportation Casks (SCS)
ANS1.C.B05.A01074;Missing reference linkage for Spent Nuclear Fuel Storage (SNFS)
ANS1.C.B05.A01075;Missing information for Spent Nuclear Fuel Storage (SNFS)
ANS1.C.B05.A01076;Operational Limits and Conditions for “10KBE50 System”
ANS1.C.B05.A01077;Missing information for “At-reactor SNF storage system”
ANS1.C.B05.A01078;Missing information for “At-reactor SNF storage system”
ANS1.C.B05.A01079;Missing information for SNFS 
ANS1.C.B05.A01080;Missing information for SNFS 
ANS1.C.B05.A01081;Missing information for “At-reactor SNF storage system”
ANS1.C.B05.A01082;Missing information for “At-reactor SNF storage system” and SNFS
ANS1.C.B05.A01083;Missing information regarding fail safe design
ANS1.C.B05.A01084;Missing information regarding fail safe design
ANS1.C.B05.A01085;Missing information regarding self-resetting
ANS1.C.B05.A01086;Missing information regarding computer based system complexity
ANS1.C.B05.A01087;Missing information regarding computer based system complexity
ANS1.C.B05.A01088;Missing information regarding safety of computer based systems.
ANS1.C.B05.A01089;Missing information regarding diversity principle.
ANS1.C.B05.A01090;Missing information regarding CCF.
ANS1.C.B05.A01091;Missing information regarding CCF.
ANS1.C.B05.A01092;Missing information regarding SCR
ANS1.C.B05.A01093;Missing information regarding Fire Protection 
ANS1.C.B05.A01094;Missing information regarding physical protection
ANS1.C.B05.A01095;Missing information regarding physical protection
ANS1.C.B05.A01096;Missing information regarding references
ANS1.C.B05.A01097;Missing information regarding MCR
ANS1.C.B05.A01098;Missing information regarding reliability targets.
ANS1.C.B05.A01099;Missing information related with PHRS power with respect to regulator valve position 
ANS1.C.B05.A01100;Clarification of secondary containment bypass pathway
ANS1.C.B05.A01101;Missing information on list of beyond design basis accidents with fuel melting
ANS1.C.B05.A01102;Inconsistency of information on beyond design basis accidents with fuel melting
ANS1.C.B05.A01103;Insufficient time span of analyses of BDBAs with fuel melting
ANS1.C.B05.A01104;Missing information on evaluation of containment behavior during beyond design basis accidents with fuel melting
ANS1.C.B05.A01105;Inconsistency of information on core damage for plant power operation modes
ANS1.C.B05.A01106;Missing information on software certification and verification
ANS1.C.B05.A01107;Insuitable time span of the graphs used for the result evaluation of the analyses of BDBAs with fuel melting
ANS1.C.B05.A01108;PAMS description
ANS1.C.B05.A01109;Missing information regarding spurious action
ANS1.C.B05.A01110;Information needs to be provided on “Which Seismic Categories are Used for Some Electrical Equipment”
ANS1.C.B05.A01111;Information needs to be provided on “Which Seismic Qualification Standards are Used for Seismic Resistance Tests of Electrical Equipment”
ANS1.C.B05.A01112;SSC sharing between units
ANS1.C.B05.A01113;Inconsistent and insufficient information
ANS1.C.B05.A01114;Initiating events regarding the shut-down and start-up conditions
ANS1.C.B05.A01115;Missing reference
ANS1.C.B05.A01116;Missing information for Chapter 9 
ANS1.C.B11.A01117;Redundancy and single failure tolerance
ANS1.C.B11.A01118;EMP-ARSMS Document- Missing monitoring parameters 
ANS1.C.B11.A01119;The methodology for selecting ARSMS locations
ANS1.C.B11.A01120;Missing reference and information
ANS1.C.B11.A01121;EMP-ARSMS Document- Missing and Irrelevant References
ANS1.C.B11.A01122;Missing info on type of bioindicators
ANS1.C.B11.A01123;Missing  reference (SP 2.6.1.2216-07 regulation)
ANS1.C.B11.A01124;Missing information on Gülnar MS
ANS1.C.B05.A01125;Missing information
ANS1.C.B05.A01126;Non-compliant information
ANS1.C.B06.A01127;Configurations with prohibited planned maintenance  
ANS1.C.B06.A01128;Failed Equipment Recovery in Akkuyu PSA Model 
ANS1.C.B06.A01129;Missing justification for exclusion
ANS1.C.B06.A01130;Missing justification for exclusion
ANS1.C.B06.A01131;Verification of Secondary side cooling limits  
ANS1.C.B06.A01132;Poor quality in the house event description  
ANS1.C.B06.A01133;Missing information on I&C system  
ANS1.C.B06.A01134;Missing justification and inconsistency with PSAR  
ANS1.C.B06.A01135;Possible underestimation of AS2A frequency  
ANS1.C.B06.A01136;Needed Information about response to LOCA on primary circuit
ANS1.C.B06.A01137;Missing analysis about containment by-pass scenarios 
ANS1.C.B06.A01138;Missing items in the Seismic Equipment List without justification
ANS1.C.B06.A01139;Missing justification for expert judgment
ANS1.C.B06.A01140;Missing information on equipment grouping 
ANS1.C.B06.A01141;Missing information on accident sequences 
ANS1.C.B06.A01142;Missing justification on accident sequences 
ANS1.C.B06.A01143;Missing bounding analysis  
ANS1.C.B06.A01144;Missing seismic initiating event
ANS1.C.B06.A01145;Missing information on Quantification algorithm of seismic PSA
ANS1.C.B06.A01146;Missing POSs in Seismic PSA
ANS1.C.B06.A01147;Missing POSs in Seismic PSA
ANS1.C.B06.A01148;Methodology used for seismic response dynamic analysis of the safety related structures, system and equipment
ANS1.C.B06.A01149;Inconsistencies between PSAR and PSA, Possible overestimation of reliability parameter for MSIV
ANS1.C.B06.A01150;Information related to computer codes 
ANS1.C.B05.A01151;Missing information on calculations the corrosion product activities
ANS1.C.B05.A01152;Missing information on spike effect calculations
ANS1.C.B05.A01153;Missing information on design of filters and other equipment of GRWM systems 
ANS1.C.B05.A01154;Missing information on comparison with operating NPPs 
ANS1.C.B05.A01155;Correction on incoming LRW to cementation system 
ANS1.C.B05.A01156;Missing information on WP integrity during accidental conditions
ANS1.C.B05.A01157;Missing information on transport vehicle certification
ANS1.C.B05.A01158;Missing information on filter efficiency and test of filter efficiency
ANS1.C.B05.A01159;Missing information on cooling of carbon filters 
ANS1.C.B05.A01160;Missing information on filter material used in 00KPM
ANS1.C.B05.A01161;Missing information on interconnected systems of 00KPM
ANS1.C.B05.A01162;Missing information on LSALWr
ANS1.C.B05.A01163;Clarification on missing subsystems in LRWMS
ANS1.C.B05.A01164;Missing information on SW tools for activity calculation in primary coolant
ANS1.C.B05.A01165;Missing information on calculations of impurities’ activities including tritium
ANS1.C.B05.A01166;Missing information on citation in  media activity in process systems
ANS1.C.B05.A01167;Missing information on compliance with WAC for processed liquid waste
ANS1.C.B05.A01168;Missing information on compliance with the regulations related to transport and packaging of processed liquid waste
ANS1.C.B05.A01169;Correction on LRW characterization 
ANS1.C.B05.A01170;Missing information on input data for media activity in process systems
ANS1.C.B05.A01171;Natural circulation in primary circuit
ANS1.C.B05.A01172;Displacement restraint and piping rupture probability
ANS1.C.B05.A01173;Pipeline destruction analysis
ANS1.C.B05.A01174;Design parameters, operating cycles and environmental conditions
ANS1.C.B05.A01175;Drainage devices
ANS1.C.B05.A01176;Monitoring variables and equipment
ANS1.C.B05.A01177;Incoming inspection and testing
ANS1.C.B05.A01178;Primary cooling system operation
ANS1.C.B05.A01179;Service life and reliability indices of primary piping
ANS1.C.B05.A01180;Jet thrust impact analysis
ANS1.C.B05.A01181;Piping displacement restraints
ANS1.C.B05.A01182;Whip displacement analyses
ANS1.C.B05.A01183;Degradation mechanisms in LBB
ANS1.C.B05.A01184;Fracture toughness in LBB
ANS1.C.B05.A01185;Justification of materials
ANS1.C.B05.A01186;Design fulfillment of requirements
ANS1.C.B05.A01187;Cyclic damageability of fasteners
ANS1.C.B05.A01188;Informative drawings and description of RCPs
ANS1.C.B05.A01189;Sealing unit of RCPs
ANS1.C.B05.A01190;Regulatory documents of RCPs
ANS1.C.B05.A01191;Analysis of compliance for RCPs
ANS1.C.B05.A01192;Service life and reliability indices of RCPs
ANS1.C.B05.A01193;Confirmation of reliability indices for RCPs
ANS1.C.B05.A01194;Design fulfillment of requirements for RCPs
ANS1.C.B05.A01195;Justification of materials for RCPs
ANS1.C.B05.A01196;References for materials of RCPs
ANS1.C.B05.A01197;Data and codes for analyses of RCPs
ANS1.C.B05.A01198;References for recommended values of strength
ANS1.C.B05.A01199;Strength analysis for supporting structures
ANS1.C.B05.A01200;Primary coolant circuit pipeline drawings
ANS1.C.B05.A01201;Systems P&ID diagrams
ANS1.C.B05.A01202;Inconsistent information
ANS1.C.B05.A01203;Missing information
ANS1.C.B05.A01204;Steam Generator Weld 111 cracks
ANS1.C.B05.A01205;Structures designed against external events
ANS1.C.B05.A01206;Physical Separation of 11-12 UQC “Pump Station of Essential Loads” Buildings
ANS1.C.B05.A01207;Secondary effects of aircraft crash
ANS1.C.B05.A01208;Reinforcement detailing requirements for reinforced concrete structures
ANS1.C.B05.A01209;Missing information on moisture removal in 00KPM
ANS1.C.B05.A01210;Missing information on replacement of filters
ANS1.C.B05.A01211;Missing information on contamination on the waste package surface
ANS1.C.B05.A01212;Seismic analysis of seismic category I and II equipment supports
ANS1.C.B06.A01213;Missing information about Control Circuitry
ANS1.C.B06.A01214;Possible underestimation of PRZ safety valve LOCA frequency
ANS1.C.B06.A01215;Possible missing part in Fault Trees
ANS1.C.B06.A01216;Missing human induced flood scenarios
ANS1.C.B06.A01217;Missing consideration during failure mode & effect analysis
ANS1.C.B06.A01218;Missing consideration during failure mode & effect analysis
ANS1.C.B06.A01219;Missing modeling issue
ANS1.C.B06.A01220;Contradictory information related to recovery-related HEs
ANS1.C.B06.A01221;Missing justification for successful accident management in case of LCI
ANS1.C.B06.A01222;Missing justification for successful accident management in case of STGR
ANS1.C.B06.A01223;Missing information about KL function & Its importance measures
ANS1.C.B06.A01224;Inconsistency of information given in PSAR and PSA Level 2
ANS1.C.B05.A01225 ;Comparison of dynamic loads due to seismic, ASW and aircraft impacts
ANS1.C.B05.A20001;Missing Information- Unresolved issue from SPR, LWP & CL
ANS1.C.B05.A20002;Non-compliant Information with SPR Meteorology
ANS1.C.B05.A20003;Missing Information- Unresolved issue from SPR, LWP & CL
ANS1.C.B05.A20004;Missing information
ANS1.C.B05.A20005;Conformance to Article 4.5.2 of OPB-88/97 (NP-001-97)
ANS1.C.B05.A20006;Hydraulic loads on fuel at high temperatures
ANS1.C.B05.A20007;Conformance to Article 4.5.6 of OPB-88/97 (NP-001-97)
ANS1.C.B05.A20008;Conformance to Article 2.3.3.17 of NP-082-07
ANS1.C.B05.A20009;Conformance to Article 2.4.12 of NP-082-07
ANS1.C.B05.A20010;Conformance to Paragraph 6.4 of SSR-2/1 Rev. 1
ANS1.C.B05.A20011;Conformance to Article 2.1.4 of NP-082-07
ANS1.C.B05.A20012;Fuel safety limits
ANS1.C.B05.A20013;Information on materials
ANS1.C.B05.A20014;Information on control rods
ANS1.C.B05.A20015;Information on welded joints in the core
ANS1.C.B05.A20016;Information on creep of core materials
ANS1.C.B05.A20017;Information on neutron flux
ANS1.C.B05.A20018;Missing information regarding computer based system complexity
ANS1.C.B05.A20019;Inconsistent Information with References - Chapter 2.5
ANS1.C.B05.A20020;Atmospheric dispersion and dose calculation analysis-Ch. 15.7
ANS1.C.B05.A20021;Consideration of IAEA documents and NREP- Ch. 15.7
ANS1.C.B05.A20022;Elimination of EUR criteria- Ch.15.7
ANS1.C.B05.A20023;Correction of personnel exposure quota expression-Ch .15.7
ANS1.C.B05.A20024;Employee doses-Ch. 15.7
ANS1.C.B05.A20025 ;Missing information about redundancy, diversity, fail-safe, physical separation/independence principles in design of gaseous radioactive waste management systems
ANS1.C.B05.A20026 ;Missing information about diversity and physical separation/independence principles in design of liquid radioactive waste management systems
ANS1.C.B05.A20027;Correction in FSAR 
ANS1.C.B05.A20028;Explanation of repair time of JNA 
ANS1.C.B05.A20029;Providing the document regarding the experience operation of PHRS at NVNPP2 -Related with AIR-1099
ANS1.C.B05.A20030;Inconsistency in PSAR and related references -regarding Core Catcher 
ANS1.C.B05.A20031;Explanation regarding management of steam in containment space  
ANS1.C.B05.A20032;Inconsistency in PSAR chapters regarding the accident 15.6.3.4 
ANS1.C.B05.A20033;Inconsistency in operability of batteries after 72 hours from the moment of accident + SBO+ no alternating current sources (regarding Core Catcher) 
ANS1.C.B05.A20034;Inconsistency in PSAR and UJV calculation regarding leak diameter 
ANS1.C.B05.A20035;Inconsistency in PSAR and UJV calculation regarding hydrogen production
ANS1.C.B05.A20036;Inconsistency in heat-up of  fuel assemblies in  PSAR and UJV calculation
ANS1.C.B05.A20037;Correction regarding in wording “passively” in core catcher valve. 
ANS1.C.B05.A20038;Confliction of height of  Ventilation Stack
ANS1.C.B05.A20039;Explanation regarding “no boiling crisis” Follow-up of  AIR-10146
ANS1.C.B05.A20040;Verification of computer code LEAK3 Follow up of ANS1.C.B05.A10139 
ANS1.C.B05.A20041;Explanation of selection of NODL and DRSLfollow-up of ANS1.C.B05.A10141-10142
ANS1.C.B05.A20042 ;Missing analysis/discussion on long duration of the plant shutdown mode and short release duration
ANS1.C.B05.A20043;Explanation of selection of NODL and DRSL
ANS1.C.B05.A20044;Explanation and justification of additional fission products release 
ANS1.C.B06.A20045;Seismic events which are covered in Book 16
ANS1.C.B06.A20046;Determination of SSE level PGA value & significant differences between PSA and SPR documents
ANS1.C.B09.A20047;Traceability of changes in management system documents
ANS1.C.B09.A20048;Main participants of Akkuyu NPP Construction
ANS1.C.B09.A20049;Procedure of AN JSC interaction with other participants
ANS1.C.B09.A20050;QMS procedures to be submitted 
ANS1.C.B09.A20051;QMS guidelines to be submitted
ANS1.C.B05.A20052;Non-conformance management procedures
ANS1.C.B05.A20053;Steam Generator Weld 111 cracksFollow-up of “A01204.ANS1.C.B05-MS-WG08”
ANS1.C.B05.A20054;Information related with water sources  Follow-up of “A01206. ANS1.C.B05.IG-WG12 rev1”
ANS1.C.B05.A20055;Explanation of the steps which to bring the PHRS in a usable stage. Follow-up of AIR “A01206. ANS1.C.B05.IG-WG12 rev1”
ANS1.C.B06.A20056;QCA System, Its Reliability & Safety Classification
ANS1.C.B11.A20057 ;Missing Information/EMP
ANS1.C.B07.A20058 ;Missing deterministic analysis of severe accident progression in SFP (Level 2 PSA)
ANS1.C.B07.A20059 ;Missing information on relevant procedures and SAMGs used by operators (Level 2 PSA)
ANS1.C.B07.A20060;Missing information on data sources (Level 2 PSA)
ANS1.C.B07.A20061;Missing CET analysis for PDS groups C07-C10 (Level 2 PSA)
ANS1.C.B07.A20062;Missing information on data used for containment performance analysis (Level 2 PSA)
ANS1.C.B07.A20063;Missing Information on core catcher and MCCI
ANS1.C.B07.A20064;Missing information on sensitivity analyses
ANS1.C.B07.A20065;Missing Information on uncertainty analysis
ANS1.C.B07.A20066;Missing structured information on human actions considered in PSA-2
ANS1.C.B07.A20067;Missing Information on general rules for assignment the values
ANS1.C.B07.A20068;Missing information related to PSA-2 results
ANS1.C.B07.A20069;Different results of CDF
ANS1.C.B07.A20070;Missing information on the links between specific analyses and PDS groups and between specific analyses and release categories
ANS1.C.B07.A20071;Missing information on source term analysis results
ANS1.C.B07.A20072;Missing information on grouping of radioisotopes
ANS1.C.B07.A20073;Missing summary report
ANS1.C.B07.A20074;Missing information on using PSA-2 results for emergency planning
ANS1.C.B07.A20075;Missing fault trees relevant to Level 2 PSA
ANS1.C.B07.A20076 ;Noncompliance with probabilistic safety criteria caused by over-conservatism in modelling of seismic events
ANS3.C.B06.A20077;Consistency with single failure criteria
ANS1.C.B05.A20078;Missing information on rating and sizing of electrical equipment, cables and raceways-followup of AIR # 984
ANS1.C.B05.A20079;Missing information on ageing management program -followup of AIR # 631
ANS1.C.B05.A20080;Explanation on RD 210-006-90 switchyard requirements-followup of AIR # 623
ANS1.C.B05.A20081;Missing information on the justification of two train structure –follow up of AIR # 86
ANS1.C.B05.A20082;Missing information on ageing management program -followup of AIR # 81
ANS1.C.B05.A20083;Missing information on improper positioning of control rods-re-issue of AIR 193
ANS1.C.B05.A20084;Missing information on Radioactive Releases and Doses
ANS1.C.B13.A20085 ;Insufficient information regarding PTQP
ANS1.C.B13.A20086;Insufficient information about PTQP
ANS1.C.B05.A20087 ;Clarification on differences between ANPP and Kursk NPP-2 Pyrolysis system-followup of AIR #877 
ANS1.C.B05.A20088;Missing Technical Data-follow up of AIR #305
ANS1.C.B05.A20089;Missing Technical Data-follow up of AIR #306
ANS1.C.B05.A20090;Missing Technical Data-follow up of AIR #308
ANS1.C.B05.A20091;Missing Technical Data-follow up of AIR #957
ANS1.C.B05.A20092;Missing Technical Data-follow up of AIR#959
ANS1.C.B05.A20093;Seismic classification of valves- follow up of AIR #10256
ANS1.C.B05.A20094;Missing Information regarding design- follow up of AIR #10266
ANS1.C.B05.A20095;Missing Information that procedure for technical testing, inspection is prescribed-follow up of AIR #10275
ANS1.C.B05.A20096;Missing Information about procedure for testing and adjustment of safety valves- follow up of AIR #10280
ANS1.C.B05.A20097;Missing technical data- followup of AIR #309
ANS1.C.B05.A20098;Missing Technical Data-follow up of AIR #314
ANS1.C.B05.A20099;Missing technical data-follow up of AIR #960
ANS1.C.B05.A20100;Results of the calculations-follow up of AIR #10035
ANS1.C.B05.A20101;Reliability of systems-follow up of AIR #10122
ANS1.C.B05.A20102;Justification of requirement fulfilling-follow up of AIR #10123
ANS1.C.B05.A20103;Missing information regarding proven technology, codes, standards-follow up of AIR #10264
ANS1.C.B05.A20104;Missing neutron-physical data and information-follow up of AIR #10414
ANS1.C.B05.A20105;K-eff calculations for various states of equipment for fuel handling at NPP-follow-up AIR for #854)
ANS1.C.B05.A20106;K-eff calculations for various states of equipment for fuel handling at NPP-follow-up AIR #856)
ANS1.C.B05.A20107;Calculations related to the Dual Purpose Casks-follow-up AIR #1073
ANS1.C.B13.A20108;Insufficient information about PTQP
ANS1.C.B05.A20109;Missing information follow up AIR #A00483
ANS1.C.B05.A20110;Performance criteria of I&C systems follow up AIR #A00484
ANS1.C.B05.A20111;Missing information follow up AIR #A00686
ANS1.C.B05.A20112;Missing information follow up AIR #A00690
ANS1.C.B05.A20113;CMS Safety Analysis follow up AIR #A00739
ANS1.C.B05.A20114;Performance criteria of I&C systems follow up AIR #A01057
ANS1.C.B05.A20115;PSAR Chapter 7 follow up AIR #A01096
ANS1.C.B05.A20116;Design information for commissioning of I&C system equipment “EP ESFAS IP”
ANS1.C.B05.A20117;Design information for commissioning of I&C system equipment “ESFAS AP -  Priority control subsystem (computerized subsystem) (PC CS)”
ANS1.C.B05.A20118;Design information for commissioning of I&C system equipment “ESFAS AP - SS LCP CS”
ANS1.C.B05.A20119;Design information for commissioning of I&C system equipment  “EP AP”
ANS1.C.B05.A20120;Design information for commissioning of I&C system equipment  “DPS IP”
ANS1.C.B05.A20121;Design information for commissioning of I&C system equipment  “DPS AP”
ANS1.C.B05.A20122;Design information for commissioning of I&C system equipment  “ICIS - P CS”
ANS1.C.B05.A20123;Design information for commissioning of I&C system equipment “NFMS”
ANS1.C.B05.A20124;Design information for commissioning of I&C system equipment “PAMS”
ANS1.C.B05.A20125;Design information for commissioning of I&C system equipment “ARMS-RLME” 
ANS1.C.B05.A20126;Design information for commissioning of I&C system equipment “MCR/SCR - safety panels”
ANS1.C.B05.A20127;Design information for commissioning of I&C system equipment  “Transducers of Safety Systems”
ANS1.C.B05.A20128;Design information for commissioning of I&C system equipment ”CLMS”
ANS1.C.B05.A20129;Missing design information on the signals of level drop of 2nd stage HAs
ANS1.C.B07.A20130 ;Atomspheric dispersion and dose analyis
ANS1.C.B13.A20131;Addition of Reactor Shop Shift Supervisor and Turbine Shop Shift Supervisor positions to the list of positions that need to obtain an operating personnel license
ANS1.C.B06.A20132;Analysis of Total Loss of Ultimate Heat Sink in different operating modes in a conservative & consistent way. Inconsistencies in KAA/PE design.`
  
  veriler = veriler.split("\n")


db.all(`SELECT * FROM ebtler`, function(err, rows1){
// db.all(`SELECT * FROM unit1excel`, function(err, rows2){

  for (let i = 0; i<veriler.length;i++) {
    var bulundu = false
    for (let j = 0; j<rows1.length;j++) {
      if (rows1[j].uniteno == veriler[i].split(";")[0].charAt(3) && rows1[j].aircode.slice(-5)==veriler[i].split(";")[0].slice(-5)) {
        
        db.run(`UPDATE ebtler SET subject = ?
        WHERE aircode = ?`,
        [veriler[i].split(";")[1], rows1[j].aircode], 
          function(err, rows){
              
          }
        );
        // bulundu = true
        // break
      }
      
    }
    // if (bulundu==false) {
    //  console.log (veriler[i].split(";")[0] + " tabloda bulunamadı")
    // }
  }
// })
})

function verigir () {
  
  let veriler = `ANS1.C.B00.A00001;closed(+)
  ANS1.C.B00.A00002;closed(+)
  ANS1.C.B00.A00003;closed(+)
  ANS1.C.B00.A00004;closed(+)
  ANS1.C.B00.A00005;closed(+)
  ANS1.C.B00.A00006;closed(+)
  ANS1.C.B00.A00007;closed(+)
  ANS1.C.B05.A00008;closed(+)
  ANS1.C.B05.A00009;closed(+)
  ANS1.C.B05.A00010;closed(+)
  ANS1.C.B05.A00011;closed(+)
  ANS1.C.B05.A00012;closed(+)
  ANS1.C.B05.A00015;closed(+)
  ANS1.C.B05.A00016;closed(+)
  ANS1.C.B05.A00017;closed(+)
  ANS1.C.B05.A00018;closed(+)
  ANS1.C.B05.A00019;closed(+)
  ANS1.C.B05.A00020;closed(+)
  ANS1.C.B05.A00086 ;closed(-) with follow-up
  ANS1.C.B05.A00623;closed(-) with follow-up
  ANS1.C.B13.A00021;closed(+)
  ANS1.C.B05.A10002;closed(+)
  ANS1.C.B05.A10003;closed(+)
  ANS1.C.B05.A10004;closed(+)
  ANS1.C.B05.A10005;closed(+)
  ANS1.C.B05.A10006;closed(+)
  ANS1.C.B05.A00030 ;Rev under NDK review
  ANS1.C.B05.A10008;closed(+)
  ANS1.C.B05.A00031 ;closed(+)
  ANS1.C.B05.A00034 ;closed(+)
  ANS1.C.B05.A00978;closed(+)
  ANS1.C.B05.A01054;closed(+)
  ANS1.C.B05.A01056;closed(+)
  ANS1.C.B05.A01057;closed(+)
  ANS1.C.B05.A01083;closed(+)
  ANS1.C.B05.A01085;closed(+)
  ANS1.C.B05.A10017;closed(+)
  ANS1.C.B05.A10018;closed(+)
  ANS1.C.B05.A00071;closed(+)
  ANS1.C.B05.A01086;closed(+)
  ANS1.C.B05.A10021;closed(+)
  ANS1.C.B05.A01087;closed(+)
  ANS1.C.B05.A10023;closed(+)
  ANS1.C.B05.A01089;closed(+)
  ANS1.C.B05.A10025;closed(+)
  ANS1.C.B05.A10026;closed(+)
  ANS1.C.B05.A10027;closed(+)
  ANS1.C.B05.A10028;closed(+)
  ANS1.C.B05.A10029;closed(+)
  ANS1.C.B05.A10030;closed(+)
  ANS1.C.B05.A10031;closed(+)
  ANS1.C.B05.A10032;closed(+)
  ANS1.C.B05.A10033;closed(+)
  ANS1.C.B05.A10034;closed(+)
  ANS1.C.B05.A10035;closed(+)
  ANS1.C.B05.A10036;closed(+)
  ANS1.C.B05.A01090;closed(+)
  ANS1.C.B05.A10038;closed(+)
  ANS1.C.B05.A10039;closed(+)
  ANS1.C.B05.A10040;closed(+)
  ANS1.C.B05.A10041;closed(+)
  ANS1.C.B05.A10042;closed(+)
  ANS1.C.B05.A10043;closed(+)
  ANS1.C.B05.A10044;closed(+)
  ANS1.C.B05.A01092;closed(+)
  ANS1.C.B05.A01095;closed(+)
  ANS1.C.B05.A01108;closed(+)
  ANS1.C.B05.A10051;closed(+)
  ANS1.C.B05.A01109;closed(+)
  ANS1.C.B05.A10053;closed(+)
  ANS1.C.B05.A20018;closed(+)
  ANS1.C.B05.A10063;closed(+)
  ANS1.C.B05.A10064;closed(+)
  ANS1.C.B05.A10067;closed(+)
  ANS1.C.B05.A10066;closed(+)
  ANS1.C.B05.A00269;closed(+)
  ANS1.C.B05.A10068;closed(+)
  ANS1.C.B05.A00090;closed(+)
  ANS1.C.B05.A10070;closed(+)
  ANS1.C.B05.A10071;closed(+)
  ANS1.C.B05.A00091;closed(+)
  ANS1.C.B05.A10073;closed(+)
  ANS1.C.B05.A20080;Rev under NDK review
  ANS1.C.B05.A20081;Rev under NDK review
  ANS1.C.B05.A00026;closed(+)
  ANS1.C.B05.A00027;closed(+)
  ANS1.C.B05.A10296;closed(+)
  ANS1.C.B05.A10095;closed(+)
  ANS1.C.B05.A10297;closed(+)
  ANS1.C.B05.A10097;closed(+)
  ANS1.C.B05.A10011;closed(+)
  ANS1.C.B05.A10107;closed(+)
  ANS1.C.B05.A10108;closed(+)
  ANS1.C.B05.A10109;closed(+)
  ANS1.C.B05.A10110;closed(+)
  ANS1.C.B05.A00095;closed(+)
  ANS1.C.B05.A00097;closed(+)
  ANS1.C.B05.A10113;closed(+)
  ANS1.C.B05.A10114;closed(+)
  ANS1.C.B05.A10115;closed(+)
  ANS1.C.B05.A10116;closed(+)
  ANS1.C.B05.A00099 ;closed(+)
  ANS1.C.B05.A10119;closed(+)
  ANS1.C.B05.A10120;closed(+)
  ANS1.C.B05.A10121;closed(+)
  ANS1.C.B05.A10122;closed(+)
  ANS1.C.B05.A10123;closed(+)
  ANS1.C.B05.A00103;closed(+)
  ANS1.C.B05.A00111;closed(+)
  ANS1.C.B06.A00024;closed(+)
  ANS1.C.B06.A00025;closed(+)
  ANS1.C.B05.A00112 ;closed(+)
  ANS1.C.B05.A00113 ;closed(+)
  ANS1.C.B06.A10056;closed(+)
  ANS1.C.B06.A10057;closed(+)
  ANS1.C.B06.A10058;closed(+)
  ANS1.C.B06.A10059;closed(+)
  ANS1.C.B06.A00117;closed(+)
  ANS1.C.B06.A10061;closed(+)
  ANS1.C.B17.A10045;closed(+)
  ANS1.C.B17.A10046;closed(+)
  ANS1.C.B17.A10047;Rev under NDK review
  ANS1.C.B17.A10074;closed(+)
  ANS1.C.B17.A10075;closed(+)
  ANS1.C.B17.A10076;closed(+)
  ANS1.C.B17.A10077;closed(+)
  ANS1.C.B17.A10078;closed(+)
  ANS1.C.B17.A10079;closed(+)
  ANS1.C.B17.A10081;closed(+)
  ANS1.C.B17.A10082;closed(+)
  ANS1.C.B17.A10083;closed(+)
  ANS1.C.B17.A10084;closed(+)
  ANS1.C.B17.A10085;closed(+)
  ANS1.C.B17.A10086;closed(+)
  ANS1.C.B17.A10087;closed(+)
  ANS1.C.B17.A10088;closed(+)
  ANS1.C.B17.A10089;closed(+)
  ANS1.C.B17.A10099;closed(+)
  ANS1.C.B17.A10100;closed(+)
  ANS1.C.B11.A00134 ;closed(+)
  ANS1.C.B05.A00135;closed(-) with follow-up
  ANS1.C.B05.A00136 ;closed(-) with follow-up
  ANS1.C.B17.A10104;closed(+)
  ANS1.C.B05.A00140;closed(+)
  ANS1.C.B17.A10106;closed(+)
  ANS1.C.B12.A00014;closed(+)
  ANS1.C.B11.A00013 ;closed(+)
  ANS1.C.B05.A00142;closed(+)
  ANS1.C.B05.A00028 ;closed(+)
  ANS1.C.B05.A00029 ;closed(+)
  ANS1.C.B05.A00143;closed(+)
  ANS1.C.B05.A00144;closed(+)
  ANS1.C.B05.A00032 ;closed(+)
  ANS1.C.B05.A00033 ;closed(+)
  ANS1.C.B05.A00145;closed(+)
  ANS1.C.B05.A00035;closed(+)
  ANS1.C.B05.A00036;closed(+)
  ANS1.C.B05.A00037;closed(+)
  ANS1.C.B05.A00038;closed(+)
  ANS1.C.B05.A00039;closed(+)
  ANS1.C.B05.A00040;closed(+)
  ANS1.C.B05.A00041;closed(+)
  ANS1.C.B05.A00042;closed(+)
  ANS1.C.B05.A00043;closed(+)
  ANS1.C.B05.A00044;closed(+)
  ANS1.C.B05.A00045;closed(+)
  ANS1.C.B05.A00046;closed(+)
  ANS1.C.B05.A00047;closed(+)
  ANS1.C.B05.A00048;closed(+)
  ANS1.C.B05.A00049;closed(+)
  ANS1.C.B05.A00050;closed(+)
   ANS1.C.B05.A00051;closed(+)
  ANS1.C.B05.A00148;closed(+)
  ANS1.C.B05.A00053;closed(+)
  ANS1.C.B05.A00054;closed(+)
  ANS1.C.B05.A00055 ;closed(+)
  ANS1.C.B05.A00056 ;closed(+)
  ANS1.C.B05.A00057 ;closed(+)
  ANS1.C.B05.A00058 ;closed(+)
  ANS1.C.B05.A00059 ;closed(+)
  ANS1.C.B05.A00060;closed(+)
  ANS1.C.B05.A00061 ;closed(+)
  ANS1.C.B05.A00062 ;closed(+)
  ANS1.C.B05.A00063;closed(+)
  ANS1.C.B05.A00064;closed(+)
  ANS1.C.B05.A00065;closed(+)
  ANS1.C.B09.A00066;closed(+)
  ANS1.C.B09.A00067;closed(+)
  ANS1.C.B09.A00068;closed(+)
  ANS1.C.B09.A00069;closed(+)
  ANS1.C.B05.A00070;closed(+)
  ANS1.C.B05.A00154 ;closed(+)
  ANS1.C.B05.A00155 ;closed(+)
  ANS1.C.B05.A10012;closed(+)
  ANS1.C.B05.A00157 ;closed(+)
  ANS1.C.B05.A10013;closed(+)
  ANS1.C.B05.A00158 ;closed(+)
  ANS1.C.B05.A10014;closed(+)
  ANS1.C.B05.A00159 ;closed(+)
  ANS1.C.B05.A10015;closed(+)
  ANS1.C.B05.A00160 ;closed(+)
  ANS1.C.B05.A00191;closed(-) with follow-up
  ANS1.C.B05.A10016;closed(+)
  ANS1.C.B05.A00072;closed(+)
  ANS1.C.B05.A00259;closed(+)
  ANS1.C.B05.A00074;closed(+)
  ANS1.C.B05.A00263;closed(+)
  ANS1.C.B05.A00265;closed(+)
  ANS1.C.B05.A00088;closed(+)
  ANS1.C.B05.A00089;closed(+)
  ANS1.C.B05.A00266;closed(+)
  ANS1.C.B05.A00267;closed(+)
  ANS1.C.B05.A00092;closed(+)
  ANS1.C.B05.A00093;closed(+)
  ANS1.C.B05.A00094 ;closed(+)
  ANS1.C.B05.A00270;closed(+)
  ANS1.C.B05.A00096;closed(+)
  ANS1.C.B05.A00271;closed(+)
  ANS1.C.B05.A00098 ;closed(+)
  ANS1.C.B05.A00279;Rev under NDK review
  ANS1.C.B05.A00100;closed(+)
  ANS1.C.B05.A00101;closed(+)
  ANS1.C.B05.A00102;closed(+)
  ANS1.C.B05.A00296;closed(+)
  ANS1.C.B05.A00104;closed(+)
  ANS1.C.B05.A00105;closed(+)
  ANS1.C.B05.A00106;closed(+)
  ANS1.C.B05.A00107;closed(+)
  ANS1.C.B05.A00108;closed(+)
  ANS1.C.B05.A00109;closed(+)
  ANS1.C.B05.A00110;closed(+)
  ANS1.C.B05.A00302;closed(+)
  ANS1.C.B05.A00317;cancelled by NDK
  ANS1.C.B05.A00318;cancelled by NDK
  ANS1.C.B05.A10127;closed(+)
  ANS1.C.B05.A10128;closed(+)
  ANS1.C.B05.A00114 ;closed(+)
  ANS1.C.B05.A00115;closed(+)
  ANS1.C.B06.A00116;closed(+)
  ANS1.C.B05.A00319;closed(+)
  ANS1.C.B06.A00118;closed(+)
  ANS1.C.B06.A00119 ;closed(+)
  ANS1.C.B05.A00120;closed(+)
  ANS1.C.B05.A00121;closed(+)
  ANS1.C.B05.A00122;closed(+)
  ANS1.C.B13.A00123;closed(+)
  ANS1.C.B13.A00124;closed(+)
  ANS1.C.B13.A00125;closed(+)
  ANS1.C.B13.A00126;closed(+)
  ANS1.C.B13.A00127;closed(+)
  ANS1.C.B13.A00128;closed(+)
  ANS1.C.B13.A00129;closed(+)
  ANS1.C.B05.A00130 ;closed(+)
  ANS1.C.B05.A00131;closed(+)
  ANS1.C.B05.A00132;closed(+)
  ANS1.C.B05.A00320;closed(+)
  ANS1.C.B05.A00321;cancelled by NDK
  ANS1.C.B06.A00137;closed(+)
  ANS1.C.B06.A00138;closed(+)
  ANS1.C.B05.A00139 ;closed(+)
  ANS1.C.B05.A00322;closed(+)
  ANS1.C.B05.A00141;closed(+)
  ANS1.C.B05.A00323;cancelled by NDK
  ANS1.C.B05.A00324;closed(+)
  ANS1.C.B05.A00325;closed(+)
  ANS1.C.B05.A00332 ;closed(+)
  ANS1.C.B05.A00146;closed(+)
  ANS1.C.B05.A00147 ;closed(+)
  ANS1.C.B11.A00133;closed(+)
  ANS1.C.B05.A00333 ;closed(+)
  ANS1.C.B05.A00335 ;closed(-) with follow-up
  ANS1.C.B05.A10137 ;closed(-) with follow-up
  ANS1.C.B05.A10138 ;closed(-) with follow-up
  ANS1.C.B05.A10139 ;closed(-) with follow-up
  ANS1.C.B05.A10140;closed(+)
  ANS1.C.B05.A10141;closed(+)
  ANS1.C.B05.A10142;closed(+)
  ANS1.C.B05.A10143;closed(+)
  ANS1.C.B05.A10144;cancelled by NDK
  ANS1.C.B05.A10145;closed(-) with follow-up
  ANS1.C.B05.A10146;closed(+)
  ANS1.C.B05.A10147;closed(-) with follow-up
  ANS1.C.B17.A10132;closed(+)
  ANS1.C.B05.A00336 ;closed(+)
  ANS1.C.B17.A10134;closed(+)
  ANS1.C.B05.A00337 ;closed(+)
  ANS1.C.B05.A00149 ;closed(+)
  ANS1.C.B05.A00153 ;closed(+)
  ANS1.C.B05.A00156 ;closed(+)
  ANS1.C.B05.A00161 ;closed(+)
  ANS1.C.B05.A00162 ;closed(+)
  ANS1.C.B05.A00076;closed(+)
  ANS1.C.B05.A00078;closed(+)
  ANS1.C.B05.A00080;closed(+)
  ANS1.C.B05.A00081;closed(+)
  ANS1.C.B05.A00084;closed(+)
  ANS1.C.B05.A00087;closed(+)
  ANS1.C.B05.A00184;closed(+)
  ANS1.C.B05.A00185;closed(+)
  ANS1.C.B05.A00186;closed(+)
  ANS1.C.B05.A00187;closed(+)
  ANS1.C.B05.A00189;closed(+)
  ANS1.C.B05.A00190;closed(+)
  ANS1.C.B05.A00192;closed(+)
  ANS1.C.B05.A00193;closed(+)
  ANS1.C.B05.A00194;closed(+)
  ANS1.C.B05.A00195;closed(+)
  ANS1.C.B05.A00196;closed(+)
  ANS1.C.B05.A00197;closed(+)
  ANS1.C.B05.A00198;closed(+)
  ANS1.C.B05.A00199;closed(+)
  ANS1.C.B05.A10090;closed(+)
  ANS1.C.B05.A00201;closed(+)
  ANS1.C.B05.A00202;closed(+)
  ANS1.C.B05.A00204;closed(+)
  ANS1.C.B05.A00205;closed(+)
  ANS1.C.B05.A00206;closed(+)
  ANS1.C.B05.A00207;Rev under NDK review
  ANS1.C.B05.A00208;Rev under NDK review
  ANS1.C.B05.A00209;closed(+)
  ANS1.C.B05.A00210;Rev under NDK review
  ANS1.C.B05.A00211;closed(+)
  ANS1.C.B05.A00212;closed(+)
  ANS1.C.B05.A00213;Rev under NDK review
  ANS1.C.B05.A00214;closed(+)
  ANS1.C.B05.A00215;closed(+)
  ANS1.C.B05.A00188;closed(+)
  ANS1.C.B05.A00216;closed(+)
  ANS1.C.B05.A00217;closed(+)
  ANS1.C.B05.A00338;closed(-) with follow-up
  ANS1.C.B05.A00218;closed(+)
  ANS1.C.B05.A00219;closed(+)
  ANS1.C.B05.A00220;closed(+)
  ANS1.C.B05.A00221;closed(+)
  ANS1.C.B05.A00223;Rev under NDK review
  ANS1.C.B05.A00224;Rev under NDK review
  ANS1.C.B05.A00225;Rev under NDK review
  ANS1.C.B05.A00226;Rev under NDK review
  ANS1.C.B05.A00200;closed(+)
  ANS1.C.B05.A00233;closed(+)
  ANS1.C.B05.A00234;closed(+)
  ANS1.C.B05.A00203;closed(+)
  ANS1.C.B05.A00235;closed(+)
  ANS1.C.B05.A00237;closed(+)
  ANS1.C.B05.A00241;closed(+)
  ANS1.C.B05.A00242;closed(+)
  ANS1.C.B05.A00243;closed(+)
  ANS1.C.B05.A00244;closed(+)
  ANS1.C.B05.A00245;closed(+)
  ANS1.C.B05.A00246;closed(+)
  ANS1.C.B05.A00247;closed(+)
  ANS1.C.B05.A00248;closed(+)
  ANS1.C.B05.A00249;closed(+)
  ANS1.C.B05.A00250 ;closed(+)
  ANS1.C.B05.A00251 ;closed(+)
  ANS1.C.B05.A00252 ;closed(+)
  ANS1.C.B05.A00253 ;closed(+)
  ANS1.C.B05.A00254 ;closed(+)
  ANS1.C.B05.A00255 ;closed(+)
  ANS1.C.B05.A00256 ;closed(+)
  ANS1.C.B05.A00222;closed(+)
  ANS1.C.B05.A00257 ;closed(+)
  ANS1.C.B05.A00258 ;closed(+)
  ANS1.C.B05.A00260;closed(+)
  ANS1.C.B05.A00262;closed(+)
  ANS1.C.B05.A00227;closed(+)
  ANS1.C.B05.A00228;closed(+)
  ANS1.C.B05.A00229;closed(+)
  ANS1.C.B05.A00230;closed(+)
  ANS1.C.B05.A00231;closed(+)
  ANS1.C.B05.A00232;closed(+)
  ANS1.C.B05.A00264;closed(+)
  ANS1.C.B05.A00268;closed(+)
  ANS1.C.B05.A10301;closed(+)
  ANS1.C.B05.A00236;closed(+)
  ANS1.C.B05.A00272;closed(+)
  ANS1.C.B05.A00273;closed(+)
  ANS1.C.B05.A00239;closed(+)
  ANS1.C.B05.A00240;closed(+)
  ANS1.C.B05.A00274;closed(+)
  ANS1.C.B05.A00276;closed(+)
  ANS1.C.B05.A00277;closed(+)
  ANS1.C.B05.A00280;closed(+)
  ANS1.C.B05.A00281;closed(+)
  ANS1.C.B05.A00282;closed(+)
  ANS1.C.B05.A00283;closed(+)
  ANS1.C.B05.A10091;closed(+)
  ANS1.C.B05.A10156 ;closed(+)
  ANS1.C.B05.A10158;closed(+)
  ANS1.C.B05.A10098;closed(+)
  ANS1.C.B05.A00073;closed(+)
  ANS1.C.B05.A00075;closed(+)
  ANS1.C.B05.A00295;closed(+)
  ANS1.C.B05.A00400;closed(+)
  ANS1.C.B05.A00401;closed(+)
  ANS1.C.B05.A00405;closed(+)
  ANS1.C.B05.A00409;closed(+)
  ANS1.C.B05.A00412;closed(+)
  ANS1.C.B05.A00431;closed(+)
  ANS1.C.B05.A00261;closed(+)
  ANS1.C.B05.A00297;closed(+)
  ANS1.C.B05.A00150 ;closed(+)
  ANS1.C.B05.A00151 ;closed(+)
  ANS1.C.B05.A00152 ;closed(+)
  ANS1.C.B05.A00298;closed(+)
  ANS1.C.B05.A00432;closed(+)
  ANS1.C.B05.A00433;closed(+)
  ANS1.C.B05.A00299;closed(+)
  ANS1.C.B05.A00443;closed(+)
  ANS1.C.B05.A00448;closed(+)
  ANS1.C.B05.A00451;closed(+)
  ANS1.C.B05.A00453;closed(+)
  ANS1.C.B05.A00300;closed(+)
  ANS1.C.B05.A00163;closed(+)
  ANS1.C.B05.A00077;closed(+)
  ANS1.C.B05.A00079 ;closed(+)
  ANS1.C.B05.A00082;closed(+)
  ANS1.C.B05.A00083;closed(+)
  ANS1.C.B05.A00085;closed(+)
  ANS1.C.B05.A00301;closed(+)
  ANS1.C.B05.A00171;closed(+)
  ANS1.C.B05.A00178;closed(+)
  ANS1.C.B05.A00303;closed(+)
  ANS1.C.B05.A00180;closed(+)
  ANS1.C.B05.A00181;closed(+)
  ANS1.C.B05.A00182;closed(+)
  ANS1.C.B05.A00183;closed(+)
  ANS1.C.B05.A00173;closed(+)
  ANS1.C.B05.A00304;closed(+)
  ANS1.C.B05.A00285;closed(+)
  ANS1.C.B05.A00305;closed(+)
  ANS1.C.B05.A00306;closed(+)
  ANS1.C.B05.A00307;closed(+)
  ANS1.C.B05.A00308;closed(+)
  ANS1.C.B05.A00309;closed(+)
  ANS1.C.B05.A00310;closed(+)
  ANS1.C.B05.A00311;closed(+)
  ANS1.C.B05.A00312;closed(+)
  ANS1.C.B05.A00313;closed(+)
  ANS1.C.B05.A00314;closed(+)
  ANS1.C.B05.A00316;closed(+)
  ANS1.C.B05.A00238;closed(+)
  ANS1.C.B00.A00326;closed(+)
  ANS1.C.B05.A00458;closed(+)
  ANS1.C.B05.A00331 ;closed(+)
  ANS1.C.B05.A00334 ;closed(+)
  ANS1.C.B05.A00460;closed(+)
  ANS1.C.B05.A10150 ;closed(+)
  ANS1.C.B05.A00467;closed(+)
  ANS1.C.B05.A00468;closed(+)
  ANS1.C.B05.A00517;closed(+)
  ANS1.C.B05.A10151 ;closed(+)
  ANS1.C.B05.A00530;Rev under NDK review
  ANS1.C.B05.A00602;closed(-) with follow-up
  ANS1.C.B05.A10152 ;closed(+)
  ANS1.C.B05.A00288;closed(+)
  ANS1.C.B05.A00275;closed(+)
  ANS1.C.B05.A00289;closed(+)
  ANS1.C.B05.A00292;closed(+)
  ANS1.C.B05.A00278;closed(+)
  ANS1.C.B05.A00604;closed(+)
  ANS1.C.B05.A10307;closed(+)
  ANS1.C.B05.A00293;closed(+)
  ANS1.C.B05.A10310;closed(+)
  ANS1.C.B05.A00327;closed(+)
  ANS1.C.B05.A00328;closed(+)
  ANS1.C.B05.A00294;closed(+)
  ANS1.C.B05.A00330 ;closed(+)
  ANS1.C.B05.A00164;closed(+)
  ANS1.C.B05.A00621;closed(+)
  ANS1.C.B05.A00165;closed(+)
  ANS1.C.B05.A00166;closed(+)
  ANS1.C.B05.A00809;closed(+)
  ANS1.C.B05.A00167;closed(+)
  ANS1.C.B05.A00828;Rev under NDK review
  ANS1.C.B05.A00168;closed(+)
  ANS1.C.B05.A00169;closed(+)
  ANS1.C.B05.A10167 ;closed(+)
  ANS1.C.B05.A10168 ;closed(+)
  ANS1.C.B05.A10169 ;closed(+)
  ANS1.C.B05.A00833;closed(+)
  ANS1.C.B05.A00861;Rev under NDK review
  ANS1.C.B05.A00170;closed(+)
  ANS1.C.B05.A10172;closed(+)
  ANS1.C.B05.A10173;closed(+)
  ANS1.C.B05.A00864;closed(+)
  ANS1.C.B05.A00871;closed(+)
  ANS1.C.B05.A00873;closed(+)
  ANS1.C.B05.A00877;closed(+)
  ANS1.C.B11.A00881;closed(+)
  ANS1.C.B11.A00904;closed(+)
  ANS1.C.B11.A00912;closed(+)
  ANS1.C.B05.A00915;closed(+)
  ANS1.C.B05.A00172;closed(+)
  ANS1.C.B05.A10175 ;closed(+)
  ANS1.C.B05.A10176 ;closed(+)
  ANS1.C.B05.A10177 ;closed(+)
  ANS1.C.B05.A00329;closed(+)
  ANS1.C.B05.A10185 ;closed(+)
  ANS1.C.B05.A00962;closed(+)
  ANS1.C.B06.A10159;closed(+)
  ANS1.C.B06.A10160;closed(+)
  ANS1.C.B05.A00963;closed(+)
  ANS1.C.B06.A10181;closed(+)
  ANS1.C.B06.A10162;closed(+)
  ANS1.C.B06.A10182;closed(+)
  ANS1.C.B17.A10178;closed(+)
  ANS1.C.B05.A00174;closed(+)
  ANS1.C.B17.A10192;closed(+)
  ANS1.C.B17.A10191;closed(+)
  ANS1.C.B05.A00175;closed(+)
  ANS1.C.B05.A00176;closed(+)
  ANS1.C.B05.A00964;closed(+)
  ANS1.C.B05.A00177;closed(+)
  ANS1.C.B05.A10204;closed(+)
  ANS1.C.B05.A00965;closed(+)
  ANS1.C.B05.A00966;closed(+)
  ANS1.C.B05.A00179;closed(+)
  ANS1.C.B05.A00967;closed(+)
  ANS1.C.B05.A00968;closed(+)
  ANS1.C.B05.A00969;closed(+)
  ANS1.C.B05.A10153 ;closed(+)
  ANS1.C.B05.A10196;closed(+)
  ANS1.C.B05.A10195;closed(+)
  ANS1.C.B05.A10194;closed(+)
  ANS1.C.B05.A10154 ;closed(+)
  ANS1.C.B05.A10155 ;closed(+)
  ANS1.C.B05.A10183;closed(+)
  ANS1.C.B05.A10171;closed(+)
  ANS1.C.B05.A10210;closed(+)
  ANS1.C.B05.A10211;closed(+)
  ANS1.C.B05.A10212;closed(+)
  ANS1.C.B05.A10213;closed(+)
  ANS1.C.B05.A10214;closed(+)
  ANS1.C.B05.A10215;closed(+)
  ANS1.C.B05.A01038;closed(+)
  ANS1.C.B05.A10217;closed(+)
  ANS1.C.B05.A01100;Rev under NDK review
  ANS1.C.B05.A10219;closed(+)
  ANS1.C.B05.A01102;closed(+)
  ANS1.C.B05.A10221;closed(+)
  ANS1.C.B05.A10222;closed(+)
  ANS1.C.B05.A10223;closed(+)
  ANS1.C.B05.A10224;closed(+)
  ANS1.C.B05.A10225;closed(+)
  ANS1.C.B05.A10226;closed(+)
  ANS1.C.B05.A10227;closed(+)
  ANS1.C.B05.A10228;closed(+)
  ANS1.C.B05.A10229;closed(+)
  ANS1.C.B05.A10230;closed(+)
  ANS1.C.B05.A10232;closed(+)
  ANS1.C.B05.A10233;closed(+)
  ANS1.C.B05.A10234;closed(+)
  ANS1.C.B05.A10235;closed(+)
  ANS1.C.B05.A10236;closed(+)
  ANS1.C.B05.A10237;closed(+)
  ANS1.C.B05.A00284;closed(+)
  ANS1.C.B05.A 10377;closed(+)
  ANS1.C.B05.A10241;closed(+)
  ANS1.C.B05.A10242;closed(+)
  ANS1.C.B05.A10243;closed(+)
  ANS1.C.B05.A10244;closed(+)
  ANS1.C.B05.A01103;closed(+)
  ANS1.C.B05.A10246;closed(+)
  ANS1.C.B05.A10247;closed(+)
  ANS1.C.B17.A10240 ;closed(+)
  ANS1.C.B05.A10249;closed(+)
  ANS1.C.B05.A10250;closed(+)
  ANS1.C.B05.A10251 ;closed(+)
  ANS1.C.B05.A10252 ;closed(+)
  ANS1.C.B05.A10253 ;closed(+)
  ANS1.C.B05.A10254 ;closed(+)
  ANS1.C.B05.A10256;closed(+)
  ANS1.C.B05.A10257;closed(+)
  ANS1.C.B05.A10258;closed(+)
  ANS1.C.B05.A10259;closed(+)
  ANS1.C.B05.A10260;closed(+)
  ANS1.C.B05.A10261;closed(+)
  ANS1.C.B05.A10262;closed(+)
  ANS1.C.B05.A10263;closed(+)
  ANS1.C.B05.A10264;closed(+)
  ANS1.C.B05.A10265;closed(+)
  ANS1.C.B05.A01104;Rev under NDK review
  ANS1.C.B05.A10267;closed(+)
  ANS1.C.B05.A01105;closed(+)
  ANS1.C.B05.A10269;closed(+)
  ANS1.C.B05.A10270;closed(+)
  ANS1.C.B05.A10271;closed(+)
  ANS1.C.B05.A00462;closed(+)
  ANS1.C.B05.A10273;closed(+)
  ANS1.C.B05.A10275;closed(+)
  ANS1.C.B05.A10276;closed(+)
  ANS1.C.B05.A10277;closed(+)
  ANS1.C.B05.A10278;closed(+)
  ANS1.C.B05.A10279;closed(+)
  ANS1.C.B05.A10280;closed(+)
  ANS1.C.B05.A10281;closed(+)
  ANS1.C.B05.A10282;closed(+)
  ANS1.C.B05.A10283;closed(+)
  ANS1.C.B05.A10284;closed(+)
  ANS1.C.B05.A10285;closed(+)
  ANS1.C.B05.A10286;closed(+)
  ANS1.C.B05.A10287;closed(+)
  ANS1.C.B05.A10288;closed(+)
  ANS1.C.B05.A10289;closed(+)
  ANS1.C.B05.A10290;closed(+)
  ANS1.C.B05.A10291;closed(+)
  ANS1.C.B05.A00466;closed(+)
  ANS1.C.B05.A10293;closed(+)
  ANS1.C.B05.A00469;closed(+)
  ANS1.C.B05.A10295;closed(+)
  ANS1.C.B05.A00471;closed(+)
  ANS1.C.B05.A00608;closed(+)
  ANS1.C.B05.A01106;closed(+)
  ANS1.C.B05.A01107;closed(+)
  ANS1.C.B05.A10300;closed(+)
  ANS1.C.B05.A00609;closed(+)
  ANS1.C.B05.A10302;closed(+)
  ANS1.C.B05.A10303;closed(+)
  ANS1.C.B05.A10304;closed(+)
  ANS1.C.B05.A10305;closed(+)
  ANS1.C.B05.A10306;closed(+)
  ANS1.C.B05.A00617;closed(+)
  ANS1.C.B05.A10308;closed(+)
  ANS1.C.B05.A10309;closed(+)
  ANS1.C.B05.A00476;closed(+)
  ANS1.C.B05.A10311;closed(+)
  ANS1.C.B05.A10312;closed(+)
  ANS1.C.B05.A00286;closed(+)
  ANS1.C.B05.A00287;closed(+)
  ANS1.C.B05.A10255;closed(+)
  ANS1.C.B05.A 10163;closed(+)
  ANS1.C.B11.A01117;closed(+)
  ANS1.C.B04.A10187;closed(+)
  ANS1.C.B05.A 10166;closed(+)
  ANS1.C.B06.A10370;closed(+)
  ANS1.C.B05.A10126;closed(+)
  ANS1.C.B05.A10129;closed(+)
  ANS1.C.B05.A 10130;closed(+)
  ANS1.C.B05.A 10131;closed(+)
  ANS1.C.B04.A10188;closed(+)
  ANS1.C.B05.A10321;closed(+)
  ANS1.C.B05.A10328;closed(+)
  ANS1.C.B05.A10329;closed(+)
  ANS1.C.B05.A10330;closed(+)
  ANS1.C.B05.A10331;closed(+)
  ANS1.C.B05.A10332;closed(+)
  ANS1.C.B05.A10336;closed(+)
  ANS1.C.B05.A10337;closed(+)
  ANS1.C.B05.A10338;closed(+)
  ANS1.C.B05.A 10339;closed(+)
  ANS1.C.B06.A10322;closed(+)
  ANS1.C.B06.A10323;closed(+)
  ANS1.C.B06.A10324;closed(+)
  ANS1.C.B06.A10325;closed(+)
  ANS1.C.B06.A10326;closed(+)
  ANS1.C.B06.A10327;closed(+)
  ANS1.C.B17.A10333;closed(+)
  ANS1.C.B17.A10334;closed(+)
  ANS1.C.B04.A10189;closed(+)
  ANS1.C.B05.A10342;closed(+)
  ANS1.C.B05.A10343;closed(+)
  ANS1.C.B11.A01118;closed(+)
  ANS1.C.B05.A10345;closed(+)
  ANS1.C.B11.A01119;closed(+)
  ANS1.C.B05.A10348;closed(+)
  ANS1.C.B05.A10353;closed(+)
  ANS1.C.B17.A10351;closed(+)
  ANS1.C.B17.A10352;closed(+)
  ANS1.C.B11.A01120;closed(+)
  ANS1.C.B05.A00339;closed(+)
  ANS1.C.B05.A00340;closed(+)
  ANS1.C.B05.A00341;closed(+)
  ANS1.C.B05.A00342;closed(+)
  ANS1.C.B05.A00343;closed(+)
  ANS1.C.B05.A00344;closed(+)
  ANS1.C.B05.A00345;closed(+)
  ANS1.C.B05.A00346;closed(+)
  ANS1.C.B00.A00347;closed(+)
  ANS1.C.B05.A00290;closed(+)
  ANS1.C.B05.A00291;closed(+)
  ANS1.C.B05.A 10170;closed(+)
  ANS1.C.B05.A00926;cancelled by NDK
  ANS1.C.B17.A10184;closed(+)
  ANS1.C.B05.A10208;closed(+)
  ANS1.C.B05.A10207 ;closed(+)
  ANS1.C.B05.A10205 ;closed(+)
  ANS1.C.B05.A10201 ;closed(+)
  ANS1.C.B05.A10193 ;closed(+)
  ANS1.C.B05.A10190 ;closed(+)
  ANS1.C.B05.A 10148;closed(+)
  ANS1.C.B05.A 10174;closed(+)
  ANS1.C.B05.A 10248;closed(+)
  ANS1.C.B05.A10274;closed(+)
  ANS1.C.B05.A00482;closed(+)
  ANS1.C.B05.A00348 ;closed(+)
  ANS1.C.B05.A00349 ;closed(+)
  ANS1.C.B09.A00366;closed(+)
  ANS1.C.B09.A00367;closed(+)
  ANS1.C.B09.A00368;closed(+)
  ANS1.C.B09.A00369;closed(+)
  ANS1.C.B09.A00370;closed(+)
  ANS1.C.B09.A00371;closed(+)
  ANS1.C.B09.A00372;closed(+)
  ANS1.C.B09.A00373;closed(+)
  ANS1.C.B09.A00374;closed(+)
  ANS1.C.B09.A00375;closed(+)
  ANS1.C.B09.A00376;closed(+)
  ANS1.C.B05.A00377;closed(+)
  ANS1.C.B05.A00378;closed(+)
  ANS1.C.B05.A00379;closed(+)
  ANS1.C.B05.A00380;closed(+)
  ANS1.C.B05.A00381;closed(+)
  ANS1.C.B05.A00382;closed(+)
  ANS1.C.B05.A00383;closed(+)
  ANS1.C.B05.A00384;closed(+)
  ANS1.C.B05.A00385;closed(+)
  ANS1.C.B05.A00386;closed(+)
  ANS1.C.B05.A00394;closed(+)
  ANS1.C.B05.A00395;closed(+)
  ANS1.C.B05.A00396;closed(+)
  ANS1.C.B05.A00397;closed(+)
  ANS1.C.B05.A00398;closed(+)
  ANS1.C.B05.A00399;closed(+)
  ANS1.C.B11.A01121;closed(+)
  ANS1.C.B11.A01124;closed(+)
  ANS1.C.B05.A00402;closed(+)
  ANS1.C.B05.A00403;closed(+)
  ANS1.C.B05.A00404;closed(+)
  ANS1.C.B05.A01167;closed(+)
  ANS1.C.B05.A00406;closed(+)
  ANS1.C.B05.A00407;closed(+)
  ANS1.C.B05.A00408;closed(+)
  ANS1.C.B05.A00052;closed(+)
  ANS1.C.B05.A00410;closed(+)
  ANS1.C.B05.A00411;closed(+)
  ANS1.C.B05.A00350 ;closed(+)
  ANS1.C.B05.A00413;closed(+)
  ANS1.C.B05.A00414;closed(+)
  ANS1.C.B05.A00415;closed(+)
  ANS1.C.B05.A00416;closed(+)
  ANS1.C.B05.A00417;closed(+)
  ANS1.C.B05.A00418;closed(+)
  ANS1.C.B05.A00419;closed(+)
  ANS1.C.B05.A00351 ;closed(+)
  ANS1.C.B05.A00352 ;closed(+)
  ANS1.C.B05.A00353 ;closed(+)
  ANS1.C.B05.A00354 ;closed(+)
  ANS1.C.B05.A00355 ;closed(+)
  ANS1.C.B05.A00393;closed(+)
  ANS1.C.B05.A00425;closed(+)
  ANS1.C.B05.A00426;closed(+)
  ANS1.C.B05.A00427;closed(+)
  ANS1.C.B06.A10362;closed(+)
  ANS1.C.B06.A10363;closed(+)
  ANS1.C.B06.A10364;closed(+)
  ANS1.C.B06.A10365;closed(+)
  ANS1.C.B06.A10366;closed(+)
  ANS1.C.B06.A10367;closed(+)
  ANS1.C.B06.A10368;closed(+)
  ANS1.C.B06.A10369;closed(+)
  ANS1.C.B05.A10065;closed(+)
  ANS1.C.B06.A10371;closed(+)
  ANS1.C.B06.A10372;closed(+)
  ANS1.C.B05.A10318 ;closed(+)
  ANS1.C.B05.A10319 ;closed(+)
  ANS1.C.B05.A10092;closed(+)
  ANS1.C.B05.A10355 ;closed(+)
  ANS1.C.B05.A10007;closed(+)
  ANS1.C.B05.A10009;closed(+)
  ANS1.C.B05.A00356 ;closed(+)
  ANS1.C.B05.A 10373;closed(+)
  ANS1.C.B05.A 10374;closed(+)
  ANS1.C.B05.A 10375;closed(+)
  ANS1.C.B05.A 10376;closed(+)
  ANS1.C.B05.A10093;closed(+)
  ANS1.C.B05.A 10378;closed(+)
  ANS1.C.B05.A00357 ;closed(+)
  ANS1.C.B05.A00428;closed(+)
  ANS1.C.B05.A00429;closed(+)
  ANS1.C.B05.A00430;closed(+)
  ANS1.C.B05.A10019;closed(+)
  ANS1.C.B05.A10020;closed(+)
  ANS1.C.B05.A10022;closed(+)
  ANS1.C.B05.A00434;closed(+)
  ANS1.C.B05.A00435;closed(+)
  ANS1.C.B05.A00436;closed(+)
  ANS1.C.B05.A00437;closed(+)
  ANS1.C.B05.A00438;closed(+)
  ANS1.C.B05.A00439;closed(+)
  ANS1.C.B05.A00440;closed(+)
  ANS1.C.B05.A00441;closed(+)
  ANS1.C.B05.A00442;closed(+)
  ANS1.C.B05.A10024;closed(+)
  ANS1.C.B05.A00444;closed(+)
  ANS1.C.B05.A00445;closed(+)
  ANS1.C.B05.A00446;closed(+)
  ANS1.C.B05.A00447;closed(+)
  ANS1.C.B05.A10037;closed(+)
  ANS1.C.B05.A00449;closed(+)
  ANS1.C.B05.A00450;closed(+)
  ANS1.C.B05.A10048;closed(+)
  ANS1.C.B05.A00452;closed(+)
  ANS1.C.B05.A10049;closed(+)
  ANS1.C.B05.A00454;closed(+)
  ANS1.C.B05.A00455;closed(+)
  ANS1.C.B05.A00456;closed(+)
  ANS1.C.B05.A00457;closed(+)
  ANS1.C.B05.A10050;closed(+)
  ANS1.C.B05.A00459;closed(+)
  ANS1.C.B05.A10052;closed(+)
  ANS1.C.B05.A00461;closed(+)
  ANS1.C.B05.A10094;closed(+)
  ANS1.C.B05.A00463;closed(+)
  ANS1.C.B05.A00464;closed(+)
  ANS1.C.B05.A00465;closed(+)
  ANS1.C.B05.A10096;closed(+)
  ANS1.C.B05.A10062;closed(+)
  ANS1.C.B05.A10069;closed(+)
  ANS1.C.B05.A10238;closed(+)
  ANS1.C.B05.A00470;closed(+)
  ANS1.C.B05.A10239;closed(+)
  ANS1.C.B05.A00472;closed(+)
  ANS1.C.B05.A00473;closed(+)
  ANS1.C.B05.A00474;closed(+)
  ANS1.C.B05.A00475;closed(+)
  ANS1.C.B05.A10272;closed(+)
  ANS1.C.B05.A00477;closed(+)
  ANS1.C.B05.A00358 ;closed(+)
  ANS1.C.B05.A00359;closed(+)
  ANS1.C.B05.A00360;closed(+)
  ANS1.C.B05.A00361;closed(+)
  ANS1.C.B05.A10292;closed(+)
  ANS1.C.B05.A00362;closed(+)
  ANS1.C.B05.A00363;closed(+)
  ANS1.C.B05.A00364;closed(+)
  ANS1.C.B05.A00365;closed(+)
  ANS1.C.B05.A10001;closed(+)
  ANS1.C.B05.A00420;closed(+)
  ANS1.C.B05.A00421;closed(+)
  ANS1.C.B05.A00422;closed(+)
  ANS1.C.B05.A00423;closed(+)
  ANS1.C.B05.A00492;closed(+)
  ANS1.C.B05.A00493;closed(+)
  ANS1.C.B05.A00494;closed(+)
  ANS1.C.B05.A00495;closed(+)
  ANS1.C.B05.A00496;closed(+)
  ANS1.C.B05.A00497;closed(+)
  ANS1.C.B05.A00498;closed(+)
  ANS1.C.B05.A00499;closed(+)
  ANS1.C.B05.A00500;closed(+)
  ANS1.C.B05.A00501;closed(+)
  ANS1.C.B05.A00502;closed(+)
  ANS1.C.B05.A10380;closed(+)
  ANS1.C.B05.A10382;closed(+)
  ANS1.C.B05.A10383 ;closed(+)
  ANS1.C.B05.A10384 ;closed(+)
  ANS1.C.B05.A10072;closed(+)
  ANS1.C.B05.A10111;closed(+)
  ANS1.C.B05.A10387 ;closed(+)
  ANS1.C.B05.A10388 ;closed(+)
  ANS1.C.B05.A10389 ;closed(+)
  ANS1.C.B05.A10391 ;closed(+)
  ANS1.C.B05.A10392 ;closed(+)
  ANS1.C.B05.A10393;closed(+)
  ANS1.C.B05.A10394;closed(+)
  ANS1.C.B05.A10395;closed(+)
  ANS1.C.B05.A10396;closed(+)
  ANS1.C.B05.A10397;closed(+)
  ANS1.C.B05.A10398;closed(+)
  ANS1.C.B05.A10399;closed(+)
  ANS1.C.B05.A10112;closed(-) with follow-up
  ANS1.C.B05.A10117;closed(+)
  ANS1.C.B17.A10401;closed(+)
  ANS1.C.B13.A00503;closed(+)
  ANS1.C.B05.A00504;closed(+)
  ANS1.C.B05.A00505;closed(+)
  ANS1.C.B05.A00506;closed(+)
  ANS1.C.B05.A00507;closed(+)
  ANS1.C.B05.A00508;closed(+)
  ANS1.C.B05.A00509;closed(+)
  ANS1.C.B05.A00510;Rev under NDK review
  ANS1.C.B05.A00511;closed(+)
  ANS1.C.B05.A00512;closed(+)
  ANS1.C.B05.A00513;closed(+)
  ANS1.C.B05.A00514;closed(+)
  ANS1.C.B05.A00515;closed(+)
  ANS1.C.B05.A00516;closed(+)
  ANS1.C.B05.A10136 ;closed(-) with follow-up
  ANS1.C.B05.A00519;closed(+)
  ANS1.C.B05.A00520;Rev under NDK review
  ANS1.C.B05.A00521;Rev under NDK review
  ANS1.C.B05.A00522;Rev under NDK review
  ANS1.C.B05.A00523;closed(+)
  ANS1.C.B05.A00524;closed(+)
  ANS1.C.B05.A00525;closed(+)
  ANS1.C.B05.A00526;closed(+)
  ANS1.C.B05.A00527;closed(+)
  ANS1.C.B05.A00528;closed(+)
  ANS1.C.B05.A00529;closed(+)
  ANS1.C.B05.A00424;closed(+)
  ANS1.C.B05.A00531;closed(+)
  ANS1.C.B05.A00532;closed(+)
  ANS1.C.B05.A00533;closed(+)
  ANS1.C.B05.A00534;closed(+)
  ANS1.C.B05.A00535;closed(+)
  ANS1.C.B05.A00536;closed(+)
  ANS1.C.B05.A00537;closed(+)
  ANS1.C.B05.A00538;closed(+)
  ANS1.C.B05.A00539;closed(+)
  ANS1.C.B05.A00540;closed(+)
  ANS1.C.B05.A00541;closed(+)
  ANS1.C.B05.A00542;closed(+)
  ANS1.C.B05.A00543;closed(+)
  ANS1.C.B05.A00544;closed(+)
  ANS1.C.B05.A00545;closed(+)
  ANS1.C.B05.A00546;closed(+)
  ANS1.C.B05.A00547;closed(+)
  ANS1.C.B05.A00548;closed(+)
  ANS1.C.B05.A00549;closed(+)
  ANS1.C.B05.A00550;closed(+)
  ANS1.C.B05.A00551;closed(+)
  ANS1.C.B05.A00552;closed(+)
  ANS1.C.B05.A00553;closed(+)
  ANS1.C.B06.A10390;closed(+)
  ANS1.C.B05.A10404;closed(+)
  ANS1.C.B05.A10294;closed(+)
  ANS1.C.B05.A10320 ;closed(+)
  ANS1.C.B17.A10405;closed(+)
  ANS1.C.B05.A10406 ;closed(+)
  ANS1.C.B05.A10407 ;closed(+)
  ANS1.C.B05.A 10356;closed(+)
  ANS1.C.B05.A00603;closed(+)
  ANS1.C.B05.A10010;closed(+)
  ANS1.C.B05.A00605;closed(+)
  ANS1.C.B05.A00606;closed(+)
  ANS1.C.B05.A00607;closed(+)
  ANS1.C.B05.A10412 ;closed(+)
  ANS1.C.B05.A10413 ;closed(+)
  ANS1.C.B05.A00610;closed(+)
  ANS1.C.B05.A00611;closed(+)
  ANS1.C.B05.A00612;closed(+)
  ANS1.C.B05.A00613;closed(+)
  ANS1.C.B05.A00614;closed(+)
  ANS1.C.B05.A00615;closed(+)
  ANS1.C.B05.A00616;closed(+)
  ANS1.C.B05.A10415 ;closed(+)
  ANS1.C.B05.A00618;closed(+)
  ANS1.C.B05.A00619;closed(+)
  ANS1.C.B05.A00620;closed(+)
  ANS1.C.B05.A10180 ;closed(+)
  ANS1.C.B05.A00478;closed(+)
  ANS1.C.B05.A10197;closed(+)
  ANS1.C.B05.A00479;closed(+)
  ANS1.C.B05.A00480;closed(+)
  ANS1.C.B05.A00481;closed(+)
  ANS1.C.B05.A00483;closed(+)
  ANS1.C.B05.A00484;closed(+)
  ANS1.C.B05.A00485;closed(+)
  ANS1.C.B05.A00486;closed(+)
  ANS1.C.B05.A00487;closed(+)
  ANS1.C.B06.A00632;closed(+)
  ANS1.C.B06.A00633;closed(+)
  ANS1.C.B06.A00634;closed(+)
  ANS1.C.B06.A00635;closed(+)
  ANS1.C.B06.A00636;closed(+)
  ANS1.C.B06.A00637;Rev response under preparation
  ANS1.C.B06.A00638;closed(+)
  ANS1.C.B06.A00639;closed(+)
  ANS1.C.B06.A00640;closed(+)
  ANS1.C.B06.A00641;closed(+)
  ANS1.C.B05.A00643;closed(+)
  ANS1.C.B05.A00645;closed(+)
  ANS1.C.B05.A00646;closed(+)
  ANS1.C.B05.A00647;closed(+)
  ANS1.C.B05.A00648;closed(+)
  ANS1.C.B05.A00649;closed(+)
  ANS1.C.B05.A00650;closed(+)
  ANS1.C.B05.A00651;closed(+)
  ANS1.C.B05.A00652;closed(+)
  ANS1.C.B05.A00653;closed(+)
  ANS1.C.B05.A00654;closed(+)
  ANS1.C.B05.A00655;closed(+)
  ANS1.C.B05.A00656;closed(+)
  ANS1.C.B05.A00657;closed(+)
  ANS1.C.B05.A00658;closed(+)
  ANS1.C.B05.A00659;closed(+)
  ANS1.C.B05.A00660;closed(+)
  ANS1.C.B05.A00661;closed(+)
  ANS1.C.B05.A00662;closed(+)
  ANS1.C.B05.A00663;closed(+)
  ANS1.C.B05.A00664;closed(+)
  ANS1.C.B05.A00665;closed(+)
  ANS1.C.B05.A00666;closed(+)
  ANS1.C.B05.A00667;closed(+)
  ANS1.C.B05.A00668;closed(+)
  ANS1.C.B05.A00669;closed(+)
  ANS1.C.B05.A00670;closed(+)
  ANS1.C.B05.A00671;closed(+)
  ANS1.C.B05.A00672;closed(+)
  ANS1.C.B05.A00673;closed(+)
  ANS1.C.B05.A00674;closed(+)
  ANS1.C.B05.A00675;closed(+)
  ANS1.C.B05.A00676;closed(+)
  ANS1.C.B06.A00677 ;closed(+)
  ANS1.C.B06.A00678;closed(+)
  ANS1.C.B06.A00679;closed(+)
  ANS1.C.B06.A00680;closed(+)
  ANS1.C.B06.A00681;closed(+)
  ANS1.C.B06.A00682;closed(+)
  ANS1.C.B06.A00683;closed(+)
  ANS1.C.B05.A00488;closed(+)
  ANS1.C.B05.A00489;closed(+)
  ANS1.C.B05.A00490;closed(+)
  ANS1.C.B05.A00491;closed(+)
  ANS1.C.B05.A10157;closed(-) with follow-up
  ANS1.C.B05.A 10164;closed(+)
  ANS1.C.B05.A 10165;closed(+)
  ANS1.C.B05.A00622;closed(+)
  ANS1.C.B05.A00624;closed(+)
  ANS1.C.B05.A00625;closed(+)
  ANS1.C.B05.A00626;closed(+)
  ANS1.C.B05.A00627;closed(+)
  ANS1.C.B05.A00628;closed(+)
  ANS1.C.B05.A00629;closed(+)
  ANS1.C.B05.A00630;closed(+)
  ANS1.C.B05.A00631;closed(+)
  ANS1.C.B05.A00684;closed(+)
  ANS1.C.B05.A00685;closed(+)
  ANS1.C.B05.A00686;closed(+)
  ANS1.C.B05.A00687;closed(+)
  ANS1.C.B05.A00688;closed(+)
  ANS1.C.B05.A00689;closed(+)
  ANS1.C.B05.A00690;closed(+)
  ANS1.C.B05.A00691;closed(+)
  ANS1.C.B05.A00692;closed(+)
  ANS1.C.B05.A00693;closed(+)
  ANS1.C.B05.A00694;closed(+)
  ANS1.C.B05.A00695;closed(+)
  ANS1.C.B05.A00696;closed(+)
  ANS1.C.B05.A00697;closed(+)
  ANS1.C.B05.A00698;closed(+)
  ANS1.C.B05.A00699;closed(+)
  ANS1.C.B05.A00700;closed(+)
  ANS1.C.B05.A00701;closed(+)
  ANS1.C.B05.A00702;closed(+)
  ANS1.C.B05.A00703;closed(+)
  ANS1.C.B05.A00704;closed(+)
  ANS1.C.B05.A00705;closed(+)
  ANS1.C.B05.A00706;closed(+)
  ANS1.C.B05.A00707;closed(+)
  ANS1.C.B05.A00708;closed(+)
  ANS1.C.B05.A00709;closed(+)
  ANS1.C.B05.A00710;closed(+)
  ANS1.C.B05.A00711;closed(+)
  ANS1.C.B05.A00712;closed(+)
  ANS1.C.B05.A00713;closed(+)
  ANS1.C.B05.A00714;closed(+)
  ANS1.C.B05.A00715;closed(+)
  ANS1.C.B05.A00716;closed(+)
  ANS1.C.B05.A00717;closed(+)
  ANS1.C.B05.A00718;closed(+)
  ANS1.C.B05.A00719;closed(+)
  ANS1.C.B05.A00720;closed(+)
  ANS1.C.B05.A00721;closed(+)
  ANS1.C.B05.A00722;closed(+)
  ANS1.C.B05.A00723;closed(+)
  ANS1.C.B05.A00724;closed(+)
  ANS1.C.B05.A00725;closed(+)
  ANS1.C.B05.A00726;closed(+)
  ANS1.C.B05.A00727;closed(+)
  ANS1.C.B05.A00728;closed(+)
  ANS1.C.B05.A00729;closed(+)
  ANS1.C.B05.A00730;closed(+)
  ANS1.C.B05.A00731;closed(+)
  ANS1.C.B05.A00732;closed(+)
  ANS1.C.B05.A00733;closed(+)
  ANS1.C.B05.A00734;closed(+)
  ANS1.C.B05.A00735;closed(+)
  ANS1.C.B05.A00736;closed(+)
  ANS1.C.B05.A00737;closed(+)
  ANS1.C.B05.A00738;closed(+)
  ANS1.C.B05.A00739;closed(+)
  ANS1.C.B05.A00740;closed(+)
  ANS1.C.B05.A00741;closed(+)
  ANS1.C.B05.A00742;closed(+)
  ANS1.C.B05.A00743;closed(+)
  ANS1.C.B05.A00744;closed(+)
  ANS1.C.B05.A00745;closed(+)
  ANS1.C.B05.A00746;closed(+)
  ANS1.C.B05.A00747;closed(+)
  ANS1.C.B05.A00748;closed(+)
  ANS1.C.B05.A00749;closed(+)
  ANS1.C.B05.A00750;closed(+)
  ANS1.C.B05.A00751;closed(+)
  ANS1.C.B05.A00752;closed(+)
  ANS1.C.B05.A00753;closed(+)
  ANS1.C.B05.A00754;closed(+)
  ANS1.C.B05.A00755;closed(+)
  ANS1.C.B05.A00756;closed(+)
  ANS1.C.B05.A00757;closed(+)
  ANS1.C.B05.A00758;closed(+)
  ANS1.C.B05.A00759;closed(+)
  ANS1.C.B05.A00760;closed(+)
  ANS1.C.B05.A00761;closed(+)
  ANS1.C.B05.A00762;closed(+)
  ANS1.C.B05.A00763;closed(+)
  ANS1.C.B05.A00764;closed(+)
  ANS1.C.B05.A00765;closed(+)
  ANS1.C.B05.A00766;closed(+)
  ANS1.C.B05.A00767;closed(+)
  ANS1.C.B05.A00768;closed(+)
  ANS1.C.B05.A00769;closed(+)
  ANS1.C.B05.A00770;closed(+)
  ANS1.C.B05.A00771;closed(+)
  ANS1.C.B05.A00772;closed(+)
  ANS1.C.B05.A00773;closed(+)
  ANS1.C.B05.A00774;closed(+)
  ANS1.C.B05.A00775;closed(+)
  ANS1.C.B05.A00776;closed(+)
  ANS1.C.B05.A00777;closed(+)
  ANS1.C.B05.A00778;closed(+)
  ANS1.C.B05.A00779;closed(+)
  ANS1.C.B05.A00780;closed(+)
  ANS1.C.B05.A00781;closed(+)
  ANS1.C.B05.A00782;closed(+)
  ANS1.C.B05.A00783;closed(+)
  ANS1.C.B05.A00784;closed(+)
  ANS1.C.B05.A00785;closed(+)
  ANS1.C.B05.A00786;closed(+)
  ANS1.C.B05.A00787;closed(+)
  ANS1.C.B05.A00788;closed(+)
  ANS1.C.B05.A00789;closed(+)
  ANS1.C.B05.A00790;closed(+)
  ANS1.C.B05.A00791;closed(+)
  ANS1.C.B05.A00792;closed(+)
  ANS1.C.B05.A10198;closed(+)
  ANS1.C.B05.A00810;closed(+)
  ANS1.C.B05.A00811;closed(+)
  ANS1.C.B05.A00812;closed(+)
  ANS1.C.B05.A00813;closed(+)
  ANS1.C.B05.A00814;closed(+)
  ANS1.C.B05.A00815;closed(+)
  ANS1.C.B05.A00816;closed(+)
  ANS1.C.B05.A00817;Rev under NDK review
  ANS1.C.B05.A00818;closed(+)
  ANS1.C.B05.A00819;closed(+)
  ANS1.C.B05.A00820;closed(+)
  ANS1.C.B05.A00821;closed(+)
  ANS1.C.B05.A00822;closed(+)
  ANS1.C.B05.A00823;closed(+)
  ANS1.C.B05.A00824;closed(+)
  ANS1.C.B05.A00825;closed(+)
  ANS1.C.B05.A00826;closed(+)
  ANS1.C.B05.A00827;closed(+)
  ANS1.C.B05.A00793;closed(+)
  ANS1.C.B05.A00829;closed(+)
  ANS1.C.B05.A00830;closed(+)
  ANS1.C.B05.A00831;closed(+)
  ANS1.C.B05.A00832;closed(+)
  ANS1.C.B05.A10200;closed(+)
  ANS1.C.B05.A00834;closed(+)
  ANS1.C.B17.A10414 ;closed(+)
  ANS1.C.B17.A10335;closed(+)
  ANS1.C.B05.A10416;closed(+)
  ANS1.C.B17.A10417;closed(+)
  ANS1.C.B05.A00836;closed(+)
  ANS1.C.B05.A00837;closed(+)
  ANS1.C.B05.A00838;closed(+)
  ANS1.C.B05.A00839;closed(+)
  ANS1.C.B05.A00840;closed(+)
  ANS1.C.B05.A00794;closed(+)
  ANS1.C.B05.A10419;cancelled by NDK
  ANS1.C.B05.A10420;cancelled by NDK
  ANS1.C.B05.A00795;closed(+)
  ANS1.C.B05.A10422 ;closed(+)
  ANS1.C.B05.A10202;closed(+)
  ANS1.C.B05.A10426;closed(+)
  ANS1.C.B05.A10427;closed(+)
  ANS1.C.B05.A10203;closed(+)
  ANS1.C.B05.A10429;closed(+)
  ANS1.C.B05.A00841;closed(+)
  ANS1.C.B05.A00842;closed(+)
  ANS1.C.B05.A00843;closed(+)
  ANS1.C.B05.A00844;closed(+)
  ANS1.C.B05.A00845;closed(+)
  ANS1.C.B05.A00846;closed(+)
  ANS1.C.B05.A00847;closed(+)
  ANS1.C.B05.A00848;closed(+)
  ANS1.C.B05.A00849;closed(+)
  ANS1.C.B05.A00796;closed(+)
  ANS1.C.B05.A10431;closed(+)
  ANS1.C.B05.A10432;closed(+)
  ANS1.C.B05.A10440;closed(+)
  ANS1.C.B17.A10441;closed(+)
  ANS1.C.B05.A10433;closed(+)
  ANS1.C.B05.A10434;closed(+)
  ANS1.C.B05.A10435;closed(+)
  ANS1.C.B05.A10436;closed(+)
  ANS1.C.B05.A10437;closed(+)
  ANS1.C.B05.A10438;closed(+)
  ANS1.C.B05.A10439;closed(+)
  ANS1.C.B05.A00850;closed(+)
  ANS1.C.B05.A00851;closed(+)
  ANS1.C.B05.A00852;closed(+)
  ANS1.C.B17.A10442;closed(+)
  ANS1.C.B05.A00853 ;closed(+)
  ANS1.C.B05.A00854;closed(+)
  ANS1.C.B05.A00855;closed(+)
  ANS1.C.B05.A00856;closed(+)
  ANS1.C.B010.A00857;closed(+)
  ANS1.C.B05.A00858;closed(+)
  ANS1.C.B05.A00859;closed(+)
  ANS1.C.B05.A00860;closed(+)
  ANS1.C.B05.A10216;closed(+)
  ANS1.C.B05.A00862;closed(+)
  ANS1.C.B05.A00863;closed(+)
  ANS1.C.B05.A10218;closed(+)
  ANS1.C.B05.A00865;Rev under NDK review
  ANS1.C.B05.A00866;closed(+)
  ANS1.C.B05.A00867;closed(+)
  ANS1.C.B05.A00868;closed(+)
  ANS1.C.B05.A00869;closed(+)
  ANS1.C.B05.A00870;closed(+)
  ANS1.C.B05.A10220;closed(+)
  ANS1.C.B05.A00872;closed(+)
  ANS1.C.B05.A10245;closed(-) with follow-up
  ANS1.C.B05.A00874;closed(+)
  ANS1.C.B05.A00875;closed(+)
  ANS1.C.B05.A00876;closed(+)
  ANS1.C.B05.A10266;closed(+)
  ANS1.C.B05.A00878;closed(+)
  ANS1.C.B05.A00879;closed(+)
  ANS1.C.B05.A00880;closed(+)
  ANS1.C.B05.A10268;closed(+)
  ANS1.C.B05.A00882;closed(+)
  ANS1.C.B05.A00883;closed(+)
  ANS1.C.B05.A00884;closed(+)
  ANS1.C.B05.A00885;closed(+)
  ANS1.C.B05.A00886;closed(+)
  ANS1.C.B11.A00887;closed(+)
  ANS1.C.B11.A00888;closed(+)
  ANS1.C.B11.A00889;closed(+)
  ANS1.C.B11.A00890;closed(+)
  ANS1.C.B11.A00891;closed(+)
  ANS1.C.B11.A00892;closed(+)
  ANS1.C.B11.A00893;closed(+)
  ANS1.C.B11.A00894;closed(+)
  ANS1.C.B11.A00895;closed(+)
  ANS1.C.B11.A00896;closed(+)
  ANS1.C.B11.A00897;closed(+)
  ANS1.C.B11.A00898;closed(+)
  ANS1.C.B11.A00899;closed(+)
  ANS1.C.B11.A00900;closed(+)
  ANS1.C.B11.A00901;closed(+)
  ANS1.C.B11.A00902;closed(+)
  ANS1.C.B11.A00903;closed(+)
  ANS1.C.B05.A10298;closed(+)
  ANS1.C.B11.A00905;closed(+)
  ANS1.C.B11.A00906;closed(+)
  ANS1.C.B11.A00907;closed(+)
  ANS1.C.B11.A00908;closed(+)
  ANS1.C.B11.A00909;closed(+)
  ANS1.C.B11.A00910;closed(+)
  ANS1.C.B11.A00911;closed(+)
  ANS1.C.B05.A10299;closed(+)
  ANS1.C.B11.A00913;closed(+)
  ANS1.C.B11.A00914;closed(+)
  ANS1.C.B05.A10313;closed(+)
  ANS1.C.B05.A00916;closed(+)
  ANS1.C.B05.A00797;closed(+)
  ANS1.C.B05.A00798;closed(+)
  ANS1.C.B05.A00799;closed(+)
  ANS1.C.B05.A00800;closed(+)
  ANS1.C.B05.A00801;closed(+)
  ANS1.C.B05.A00802;closed(+)
  ANS1.C.B05.A00803;closed(+)
  ANS1.C.B05.A00804;closed(+)
  ANS1.C.B05.A00805;closed(+)
  ANS1.C.B05.A10344;closed(+)
  ANS1.C.B05.A00806;closed(+)
  ANS1.C.B05.A00807;closed(+)
  ANS1.C.B05.A00808;closed(+)
  ANS1.C.B05.A10199 ;closed(+)
  ANS1.C.B05.A10149;closed(+)
  ANS1.C.B05.A10421;closed(+)
  ANS1.C.B05.A10206 ;closed(+)
  ANS1.C.B05.A00917;closed(+)
  ANS1.C.B05.A00918;closed(+)
  ANS1.C.B05.A00919;closed(+)
  ANS1.C.B05.A00920;closed(+)
  ANS1.C.B05.A00921;closed(+)
  ANS1.C.B05.A00922;closed(+)
  ANS1.C.B05.A00923;closed(+)
  ANS1.C.B05.A00942;closed(+)
  ANS1.C.B05.A00943;closed(+)
  ANS1.C.B05.A00944;closed(+)
  ANS1.C.B05.A00945;closed(+)
  ANS1.C.B05.A00946;closed(+)
  ANS1.C.B05.A00947;closed(+)
  ANS1.C.B05.A00948;closed(+)
  ANS1.C.B05.A00949;closed(+)
  ANS1.C.B05.A00950;closed(+)
  ANS1.C.B05.A00951;closed(+)
  ANS1.C.B05.A00952;closed(+)
  ANS1.C.B05.A00953;closed(+)
  ANS1.C.B05.A00954;closed(+)
  ANS1.C.B05.A00955;closed(+)
  ANS1.C.B05.A00957;closed(+)
  ANS1.C.B05.A00958;closed(+)
  ANS1.C.B05.A00959;closed(+)
  ANS1.C.B05.A00960;closed(+)
  ANS1.C.B05.A00961;closed(+)
  ANS1.C.B05.A10347;closed(+)
  ANS1.C.B05.A10357 ;closed(+)
  ANS1.C.B05.A10359 ;closed(+)
  ANS1.C.B05.A10385 ;closed(+)
  ANS1.C.B05.A10386 ;closed(+)
  ANS1.C.B05.A10428;cancelled by NDK
  ANS1.C.B05.A10430;closed(+)
  ANS1.C.B06.A10379;Rev under NDK review
  ANS1.C.B05.A00924;closed(+)
  ANS1.C.B05.A00925;closed(+)
  ANS1.C.B05.A00927;closed(+)
  ANS1.C.B05.A00928;closed(+)
  ANS1.C.B05.A00929;closed(+)
  ANS1.C.B05.A00930;closed(+)
  ANS1.C.B05.A00931;closed(+)
  ANS1.C.B05.A00932;closed(+)
  ANS1.C.B06.A00022;closed(+)
  ANS1.C.B05.A00933;closed(+)
  ANS1.C.B05.A00934;closed(+)
  ANS1.C.B05.A00935;closed(+)
  ANS1.C.B05.A00936;closed(+)
  ANS1.C.B05.A00937;closed(+)
  ANS1.C.B05.A00938;closed(+)
  ANS1.C.B05.A00940;closed(+)
  ANS1.C.B05.A00941;closed(+)
  ANS1.C.B05.A00970;closed(+)
  ANS1.C.B05.A00971;closed(+)
  ANS1.C.B05.A00972;closed(+)
  ANS1.C.B05.A00973;closed(+)
  ANS1.C.B05.A00974;closed(+)
  ANS1.C.B05.A00975;closed(+)
  ANS1.C.B05.A00993;closed(+)
  ANS1.C.B05.A00994;closed(+)
  ANS1.C.B05.A00995;closed(+)
  ANS1.C.B06.A00996;closed(+)
  ANS1.C.B06.A00997;closed(+)
  ANS1.C.B05.A00998;closed(+)
  ANS1.C.B05.A00999;closed(+)
  ANS1.C.B10.A01000;closed(+)
  ANS1.C.B05.A01001;closed(+)
  ANS1.C.B05.A01002;closed(+)
  ANS1.C.B05.A01003;closed(+)
  ANS1.C.B05.A01004;closed(+)
  ANS1.C.B05.A01005;closed(+)
  ANS1.C.B05.A01006;closed(+)
  ANS1.C.B05.A01007;closed(+)
  ANS1.C.B05.A01008;closed(+)
  ANS1.C.B05.A01009;closed(+)
  ANS1.C.B05.A01010;closed(+)
  ANS1.C.B05.A01011;closed(+)
  ANS1.C.B05.A01012;closed(+)
  ANS1.C.B05.A01013;closed(+)
  ANS1.C.B05.A01014;closed(+)
  ANS1.C.B05.A00976;closed(+)
  ANS1.C.B05.A00977;closed(+)
  ANS1.C.B05.A00979;closed(+)
  ANS1.C.B05.A00980;closed(+)
  ANS1.C.B05.A01019;closed(+)
  ANS1.C.B05.A01020;closed(+)
  ANS1.C.B05.A01021;closed(+)
  ANS1.C.B05.A01022;closed(+)
  ANS1.C.B05.A01023;closed(+)
  ANS1.C.B05.A01024;closed(+)
  ANS1.C.B05.A01025;closed(+)
  ANS1.C.B05.A01026;closed(+)
  ANS1.C.B05.A01027;closed(+)
  ANS1.C.B05.A01028;closed(+)
  ANS1.C.B05.A01029;closed(+)
  ANS1.C.B05.A01030;closed(+)
  ANS1.C.B05.A01031;closed(+)
  ANS1.C.B05.A01032;closed(+)
  ANS1.C.B05.A01033;closed(+)
  ANS1.C.B05.A01034;closed(+)
  ANS1.C.B05.A00981;closed(+)
  ANS1.C.B05.A00982;closed(+)
  ANS1.C.B05.A01037;closed(+)
  ANS1.C.B06.A00023;closed(+)
  ANS1.C.B05.A01039;closed(+)
  ANS1.C.B05.A01040;closed(+)
  ANS1.C.B05.A01041;closed(+)
  ANS1.C.B05.A01042;closed(+)
  ANS1.C.B05.A01043;closed(+)
  ANS1.C.B05.A01044;closed(+)
  ANS1.C.B05.A01045;closed(+)
  ANS1.C.B05.A01046;closed(+)
  ANS1.C.B05.A01047;closed(+)
  ANS1.C.B05.A01048;closed(+)
  ANS1.C.B05.A01049;closed(+)
  ANS1.C.B05.A01050;closed(+)
  ANS1.C.B05.A01051;closed(+)
  ANS1.C.B05.A01052;closed(+)
  ANS1.C.B05.A00983;closed(+)
  ANS1.C.B05.A00984;closed(+)
  ANS1.C.B05.A00985;closed(+)
  ANS1.C.B05.A00986;closed(+)
  ANS1.C.B05.A00987;closed(+)
  ANS1.C.B05.A01058;under NDK review
  ANS1.C.B05.A01059;closed(+)
  ANS1.C.B05.A01060;closed(+)
  ANS1.C.B05.A01061;closed(+)
  ANS1.C.B05.A01062;closed(+)
  ANS1.C.B05.A01063;closed(+)
  ANS1.C.B05.A01064;closed(+)
  ANS1.C.B05.A01065;closed(+)
  ANS1.C.B05.A01066;closed(+)
  ANS1.C.B05.A01067;closed(+)
  ANS1.C.B05.A01068;closed(+)
  ANS1.C.B05.A01069;closed(+)
  ANS1.C.B05.A01070;closed(+)
  ANS1.C.B05.A01071;closed(+)
  ANS1.C.B05.A01072;closed(+)
  ANS1.C.B05.A01073;closed(+)
  ANS1.C.B05.A01074;closed(+)
  ANS1.C.B05.A01075;closed(+)
  ANS1.C.B05.A01076;closed(+)
  ANS1.C.B05.A01077;closed(+)
  ANS1.C.B05.A01078;closed(+)
  ANS1.C.B05.A01079;closed(+)
  ANS1.C.B05.A01080;closed(+)
  ANS1.C.B05.A01081;closed(+)
  ANS1.C.B05.A01082;closed(+)
  ANS1.C.B05.A00988;closed(+)
  ANS1.C.B05.A00989;closed(+)
  ANS1.C.B05.A00990;closed(+)
  ANS1.C.B05.A00991;closed(+)
  ANS1.C.B05.A00992;closed(+)
  ANS1.C.B05.A01015;closed(+)
  ANS1.C.B05.A01016;closed(+)
  ANS1.C.B05.A01017;closed(+)
  ANS1.C.B05.A01018;closed(+)
  ANS1.C.B05.A01035;Rev response under preparation
  ANS1.C.B05.A01036;closed(+)
  ANS1.C.B05.A01053;closed(+)
  ANS1.C.B05.A01055;closed(+)
  ANS1.C.B05.A01084;closed(+)
  ANS1.C.B05.A01088;closed(+)
  ANS1.C.B05.A01091;closed(+)
  ANS1.C.B05.A01099;closed(+)
  ANS1.C.B06.A10054;Rev under NDK review
  ANS1.C.B05.A01101;closed(+)
  ANS1.C.B06.A10055;closed(+)
  ANS1.C.B06.A10060;closed(+)
  ANS1.C.B06.A10161;Rev under NDK review
  ANS1.C.B05.A01093;closed(+)
  ANS1.C.B17.A10102;closed(+)
  ANS1.C.B17.A10103;closed(+)
  ANS1.C.B05.A01094;closed(+)
  ANS1.C.B05.A01096;closed(+)
  ANS1.C.B05.A01097;closed(+)
  ANS1.C.B05.A01098;closed(+)
  ANS1.C.B17.A10101;closed(+)
  ANS1.C.B05.A01113;closed(+)
  ANS1.C.B05.A01114;closed(+)
  ANS1.C.B05.A01115;closed(+)
  ANS1.C.B05.A01116;closed(+)
  ANS1.C.B17.A10105;closed(+)
  ANS1.C.B17.A10133;closed(+)
  ANS1.C.B17.A10135;closed(+)
  ANS1.C.B05.A01110;closed(+)
  ANS1.C.B17.A10381;closed(+)
  ANS1.C.B11.A01122;closed(+)
  ANS1.C.B11.A01123;closed(+)
  ANS1.C.B17.A10400;closed(+)
  ANS1.C.B05.A01125;closed(-) with follow-up
  ANS1.C.B05.A01126;closed(+)
  ANS1.C.B06.A01127;closed(+)
  ANS1.C.B06.A01128;Rev under NDK review
  ANS1.C.B06.A01129;closed(+)
  ANS1.C.B06.A01130;closed(+)
  ANS1.C.B06.A01131;closed(+)
  ANS1.C.B06.A01132;closed(+)
  ANS1.C.B06.A01133;Rev under NDK review
  ANS1.C.B06.A01134;closed(+)
  ANS1.C.B06.A01135;closed(+)
  ANS1.C.B06.A01136;Rev under NDK review
  ANS1.C.B06.A01137;closed(+)
  ANS1.C.B06.A01138;closed(+)
  ANS1.C.B06.A01139;Rev under NDK review
  ANS1.C.B06.A01140;closed(+)
  ANS1.C.B06.A01141;closed(+)
  ANS1.C.B06.A01142;closed(+)
  ANS1.C.B06.A01143;closed(+)
  ANS1.C.B06.A01144;closed(-) with follow-up
  ANS1.C.B06.A01145;closed(+)
  ANS1.C.B06.A01146;closed(+)
  ANS1.C.B06.A01147;closed(+)
  ANS1.C.B06.A01148;Rev under NDK review
  ANS1.C.B06.A01149;closed(+)
  ANS1.C.B06.A01150;closed(+)
  ANS1.C.B05.A01151;closed(+)
  ANS1.C.B05.A01152;closed(+)
  ANS1.C.B05.A01153;closed(+)
  ANS1.C.B05.A01154;closed(+)
  ANS1.C.B05.A01155;closed(+)
  ANS1.C.B05.A01156;Rev under NDK review
  ANS1.C.B05.A01157;closed(+)
  ANS1.C.B05.A01158;closed(+)
  ANS1.C.B05.A01159;closed(+)
  ANS1.C.B05.A01160;closed(+)
  ANS1.C.B05.A01161;closed(+)
  ANS1.C.B05.A01162;closed(+)
  ANS1.C.B05.A01163;closed(+)
  ANS1.C.B05.A01164;closed(+)
  ANS1.C.B05.A01165;closed(+)
  ANS1.C.B05.A01166;closed(+)
  ANS1.C.B17.A10425;closed(+)
  ANS1.C.B05.A01168;closed(+)
  ANS1.C.B05.A01169;closed(+)
  ANS1.C.B05.A01170;closed(+)
  ANS1.C.B05.A01171;closed(+)
  ANS1.C.B05.A01172;closed(+)
  ANS1.C.B05.A01173;closed(+)
  ANS1.C.B05.A01174;closed(+)
  ANS1.C.B05.A01175;closed(+)
  ANS1.C.B05.A01176;closed(+)
  ANS1.C.B05.A01177;closed(+)
  ANS1.C.B05.A01178;closed(+)
  ANS1.C.B05.A01179;closed(+)
  ANS1.C.B05.A01180;closed(+)
  ANS1.C.B05.A01181;closed(+)
  ANS1.C.B05.A01182;closed(+)
  ANS1.C.B05.A01183;closed(+)
  ANS1.C.B05.A01184;closed(+)
  ANS1.C.B05.A01185;closed(+)
  ANS1.C.B05.A01186;closed(+)
  ANS1.C.B05.A01187;closed(+)
  ANS1.C.B05.A01188;closed(+)
  ANS1.C.B05.A01189;closed(+)
  ANS1.C.B05.A01190;closed(+)
  ANS1.C.B05.A01191;closed(+)
  ANS1.C.B05.A01192;closed(+)
  ANS1.C.B05.A01193;closed(+)
  ANS1.C.B05.A01194;closed(+)
  ANS1.C.B05.A01195;closed(+)
  ANS1.C.B05.A01196;closed(+)
  ANS1.C.B05.A01197;closed(+)
  ANS1.C.B05.A01198;closed(+)
  ANS1.C.B05.A01199;Rev under NDK review
  ANS1.C.B05.A01200;closed(+)
  ANS1.C.B05.A01201;closed(+)
  ANS1.C.B05.A01202;closed(+)
  ANS1.C.B05.A01203;closed(+)
  ANS1.C.B05.A01204;closed(+)
  ANS1.C.B05.A01205;closed(+)
  ANS1.C.B05.A01206;closed(+)
  ANS1.C.B05.A01207;closed(+)
  ANS1.C.B05.A01208;closed(+)
  ANS1.C.B05.A01209;closed(+)
  ANS1.C.B05.A01210;closed(+)
  ANS1.C.B05.A01211;closed(+)
  ANS1.C.B05.A01212;closed(+)
  ANS1.C.B06.A01213;Rev under NDK review
  ANS1.C.B06.A01214;closed(+)
  ANS1.C.B06.A01215;closed(+)
  ANS1.C.B06.A01216;closed(+)
  ANS1.C.B06.A01217;closed(+)
  ANS1.C.B06.A01218;closed(+)
  ANS1.C.B06.A01219;closed(+)
  ANS1.C.B06.A01220;closed(+)
  ANS1.C.B06.A01221;closed(+)
  ANS1.C.B06.A01222;Rev under NDK review
  ANS1.C.B06.A01223;closed(+)
  ANS1.C.B05.A01224;closed(+)
  ANS1.C.B05.A01225;closed(+)
  ANS1.C.B05.A20001 ;closed(+)
  ANS1.C.B05.A20002;closed(+)
  ANS1.C.B05.A20003;Rev response under preparation
  ANS1.C.B05.A20004;closed(+)
  ANS1.C.B05.A20005;Rev under NDK review
  ANS1.C.B05.A20006;Rev under NDK review
  ANS1.C.B05.A20007;Rev under NDK review
  ANS1.C.B05.A20008;closed(+)
  ANS1.C.B05.A20009;closed(+)
  ANS1.C.B05.A20010;closed(+)
  ANS1.C.B05.A20011;closed(+)
  ANS1.C.B05.A20012;closed(+)
  ANS1.C.B05.A20013;closed(+)
  ANS1.C.B05.A20014;closed(+)
  ANS1.C.B05.A20015;Rev under NDK review
  ANS1.C.B05.A20016;closed(+)
  ANS1.C.B05.A20017;Rev under NDK review
  ANS1.C.B05.A01111;closed(+)
  ANS1.C.B05.A20019;closed(+)
  ANS1.C.B05.A20020;under NDK review
  ANS1.C.B05.A20021;closed(+)
  ANS1.C.B05.A20022;closed(+)
  ANS1.C.B05.A20023;closed(+)
  ANS1.C.B05.A20024;closed(+)
  ANS1.C.B05.A20025;closed(+)
  ANS1.C.B05.A20026;closed(+)
  ANS1.C.B05.A20027;closed(+)
  ANS1.C.B05.A20028;closed(+)
  ANS1.C.B05.A20029;closed(+)
  ANS1.C.B05.A20030;closed(+)
  ANS1.C.B05.A20031;closed(+)
  ANS1.C.B05.A20032;closed(+)
  ANS1.C.B05.A20033;closed(+)
  ANS1.C.B05.A20034;closed(+)
  ANS1.C.B05.A20035;closed(+)
  ANS1.C.B05.A20036;closed(+)
  ANS1.C.B05.A20037;closed(+)
  ANS1.C.B05.A20038;closed(+)
  ANS1.C.B05.A20039;closed(+)
  ANS1.C.B05.A20040;under NDK review
  ANS1.C.B05.A20041;closed(+)
  ANS1.C.B05.A20042;under NDK review
  ANS1.C.B05.A20043;closed(+)
  ANS1.C.B05.A20044;closed(+)
  ANS1.C.B06.A20045;Rev under NDK review
  ANS1.C.B06.A20046;Rev under NDK review
  ANS1.C.B09.A20047;closed(+)
  ANS1.C.B09.A20048;closed(+)
  ANS1.C.B09.A20049;closed(+)
  ANS1.C.B09.A20050;closed(+)
  ANS1.C.B09.A20051;closed(+)
  ANS1.C.B09.A20052;closed(+)
  ANS1.C.B05.A20053;closed(+)
  ANS1.C.B05.A20054;closed(+)
  ANS1.C.B05.A20055;closed(+)
  ANS1.C.B0.A20056;closed(+)
  ANS1.C.B11.A20057 ;Rev response under preparation
  ANS1.C.B07.A20058;closed(+)
  ANS1.C.B07.A20059;closed(+)
  ANS1.C.B07.A20060;closed(+)
  ANS1.C.B07.A20061;closed(+)
  ANS1.C.B07.A20062;under NDK review
  ANS1.C.B07.A20063;Rev under NDK review
  ANS1.C.B07.A20064;Rev under NDK review
  ANS1.C.B07.A20065;Rev under NDK review
  ANS1.C.B07.A20066;closed(+)
  ANS1.C.B07.A20067;closed(+)
  ANS1.C.B07.A20068;under NDK review
  ANS1.C.B07.A20069;closed(+)
  ANS1.C.B07.A20070;under NDK review
  ANS1.C.B07.A20071;under NDK review
  ANS1.C.B07.A20072;closed(+)
  ANS1.C.B07.A20073;under NDK review
  ANS1.C.B07.A20074;under NDK review
  ANS1.C.B07.A20075;closed(+)
  ANS1.C.B07.A20076;under NDK review
  ANS1.C.B06.A20077;under NDK review
  ANS1.C.B05.A01112;closed(+)
  ANS1.C.B17.A10179;closed(+)
  ANS1.C.B05.A20078;closed(+)
  ANS1.C.B05.A20079;closed(+)
  ANS1.C.B05.A20082;closed(+)
  ANS1.C.B05.A20083;Rev under NDK review
  ANS1.C.B05.A20084;closed(+)
  ANS1.C.B13.A20085 ;closed(+)
  ANS1.C.B13.A20086;closed(+)
  ANS1.C.B05.A20087;closed(+)
  ANS1.C.B05.A20088;Rev response under preparation
  ANS1.C.B05.A20089;Rev response under preparation
  ANS1.C.B05.A20090;Rev response under preparation
  ANS1.C.B05.A20091;Rev response under preparation
  ANS1.C.B05.A20092;Rev response under preparation
  ANS1.C.B05.A20093;Rev response under preparation
  ANS1.C.B05.A20094;Rev response under preparation
  ANS1.C.B05.A20095;Rev response under preparation
  ANS1.C.B05.A20096;Rev response under preparation
  ANS1.C.B05.A20097;Rev response under preparation
  ANS1.C.B05.A20098;closed(+)
  ANS1.C.B05.A20099;Rev response under preparation
  ANS1.C.B05.A20100;Rev response under preparation
  ANS1.C.B05.A20101;Rev response under preparation
  ANS1.C.B05.A20102;closed(+)
  ANS1.C.B05.A20103;Rev response under preparation
  ANS1.C.B05.A20104;closed(+)
  ANS1.C.B05.A20105;Rev under NDK review
  ANS1.C.B05.A20106;Rev under NDK review
  ANS1.C.B05.A20107;Rev under NDK review
  ANS1.C.B13.A20108;Rev under NDK review
  ANS1.C.B05.A20109;Rev under NDK review
  ANS1.C.B05.A20110;under NDK review
  ANS1.C.B05.A20111;under NDK review
  ANS1.C.B05.A20112;response under preparation
  ANS1.C.B05.A20113;under NDK review
  ANS1.C.B05.A20114;response under preparation
  ANS1.C.B05.A20115;closed(+)
  ANS1.C.B05.A20129;closed(+)
  ANS1.C.B07.A20130 ;under NDK review
  ANS1.C.B07.A20131;closed(+)
  ANS1.C.B06.A20132;under NDK review
  ANS1.C.B05.A20133;Rev under NDK review
  ANS1.C.B05.A20134;response under preparation`
  
  veriler =veriler.replace(/ /g,"").split("\n")
  
  console.log (veriler)
  


  db.serialize(function() {
    veriler.forEach(function(veri) {
      db.run(`INSERT INTO unit1excel VALUES (?,?);`,
      [veri.split(";")[0],veri.split(";")[1]]
      );
    });
  });


}








export interface ServicePlan {
  id: number;
  name: string;
  price: string;
  features: string;
  is_recommended: boolean;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  detail_description?: string;
  is_active: boolean;
  category: number;
  plans: ServicePlan[];
  features: string;
  requirements: string;
  deliverables: string;
  timeline: string;
  icon: string;
  price?: number | string;
  slug?: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  icon?: string;
  services: Service[];
}

export const categories: ServiceCategory[] = [
  {
    id: 3,
    name: "Trademark",
    description: "Protect your brand and intellectual property",
    icon: "\u00ae\ufe0f",
    services: [
      {
        id: 8,
        name: "Trademark Registration",
        description: "Secure legal protection for your brand name and logo",
        detail_description: "Trademark Registration provides legal protection to your brand name, logo, and tagline. It gives you exclusive rights to use the mark and prevents others from using similar marks",
        is_active: true,
        category: 3,
        features: "Trademark Search',\r\n          'Application Filing',\r\n          'Government Fees guidance',\r\n          'Use of TM symbol',\r\n          'Application tracking'",
        requirements: "Logo / Brand Name\r\n          Applicant Details\r\n          MSME Certificate (for fee discount)\r\n          User Affidavit",
        deliverables: "Trademark Application No.\r\n          Vienna Code\r\nExamination Report reply assistance",
        timeline: "3-5 working days",
        icon: "\ud83d\udee1\ufe0f",
        plans: [
        ]
      },
      {
        id: 9,
        name: "Trademark Objection",
        description: "Professional reply to trademark objections (  examination report )",
        detail_description: "If the Trademark Registry raises an objection, a legal reply must be filed within 30 days. We draft strong legal responses citing precedents to overcome objections",
        is_active: true,
        category: 3,
        features: "Examination Report analysis\r\n          Legal reply drafting\r\n          Filing with Registry\r\n          Status monitoring",
        requirements: "Examination Report\r\n          Application Number\r\n          POA (Power of Attorney)",
        deliverables: "Filed Examination Reply\r\n          Arguments copy",
        timeline: "2-4 working days",
        icon: "\ud83d\udccb",
        plans: []
      },
      {
        id: 10,
        name: "Trademark Opposition",
        description: "Legal support for trademark opposition ( File or defend opposition)",
        detail_description: "Opposition proceedings happen when a third party opposes a trademark application. We handle filing Notice of Opposition or Counter Statement and evidence stages",
        is_active: true,
        category: 3,
        features: "Notice of Opposition drafting\r\n          Counter Statement drafting\r\n          Evidence filing\r\n          Hearing representation",
        requirements: "Case history\r\n          Evidence of use\r\n          POA  (Power of Attorney)",
        deliverables: "Filed Notice/Counter Statement\r\n          Legal Strategy",
        timeline: "Month-on-month",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 12,
        name: "Copyright Registration",
        description: "Copyright for artistic, literary, and musical works ( Protect your creative work)",
        detail_description: "Copyright gives exclusive rights to creators of literary, artistic, musical works, and software. We handle the application filing with the Copyright Office",
        is_active: true,
        category: 3,
        features: "Application filing\r\n          Work classification\r\n          Diary Number generation\r\n          Discrepancy clearing",
        requirements: "Copies of work\r\n          NOC from author (if applicant is different)\r\n          ID Proof",
        deliverables: "Diary Number\r\n          Registration Certificate (after approval)",
        timeline: "3-4 months",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 13,
        name: "Patent Registration",
        description: "Patent filing and prosecution ( Protect your invention)",
        detail_description: "Patents protect inventions. We assist in prior art search, patent drafting (provisional/complete), and filing with the Patent Office",
        is_active: true,
        category: 3,
        features: "Patent Search\r\n          Drafting of specification\r\n          Filing Application\r\n          Request for Examination",
        requirements: "Invention details\r\n          Drawings\r\n          Applicant details",
        deliverables: "Patent Application Number\r\n          Published Patent",
        timeline: "12-24 months",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 14,
        name: "Designing Registration",
        description: "Protection for industrial designs ,shape and aesthetics",
        detail_description: "Design registration protects the visual features of shape, configuration, pattern or ornament applied to an article. It does not cover the functionality",
        is_active: true,
        category: 3,
        features: "Design classification\r\n          Representation sheets preparation\r\n          Filing\r\n          Objection handling",
        requirements: "Photos/Drawings of article\r\n          Description of novelty\r\n          Applicant details",
        deliverables: "Design Application Number\r\n          Registration Certificate",
        timeline: "6-8 months",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 15,
        name: "Logo Designing",
        description: "Custom logo design services / Professional logo for your brand",
        detail_description: "Get a unique and professional logo designed for your business. A good logo builds brand identity and is essential for trademark registration",
        is_active: true,
        category: 3,
        features: "Multiple concepts\r\n          Revisions included\r\n          High resolution files\r\n          Copyright transfer",
        requirements: "Business Name\r\n          Industry/Niche\r\n          Color preferences",
        deliverables: "Logo files (PNG, JPG, Vector)\r\n          Brand guidelines",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 17,
        name: "Trademark Rectification",
        description: "Rectification or cancellation of trademark ( Correct register entries)",
        detail_description: "Application to rectify an error in the trademark register or to cancel a competitor's trademark on grounds of non-use or bad faith",
        is_active: true,
        category: 3,
        features: "Rectification petition\r\n          Grounds of research\r\n          Filing with updated rules",
        requirements: "Target trademark details\r\n          Applicant's locus standi",
        deliverables: "Filed Petition\r\n          Registry Order",
        timeline: "Based on proceedings",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 19,
        name: "Trademark Protection",
        description: "Monitor and Watch service against infringement",
        detail_description: "We monitor the trademark journal and market for similar marks being filed or used, alerting you to potential infringements so you can take timely action",
        is_active: true,
        category: 3,
        features: "Trademark Journal watch\r\n         Market surveillance\r\n         Infringement alert\r\n         Legal opinion",
        requirements: "Details of registered mark",
        deliverables: "Monthly Watch Report",
        timeline: "Monthly",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 20,
        name: "Copyright Objection",
        description: "Clear copyright objections / Response to copyright discrepancies",
        detail_description: "If the Copyright Office raises discrepancies in your application, we help file a formal response to resolve them and proceed towards registration",
        is_active: true,
        category: 3,
        features: "Discrepancy analysis\r\n          Response drafting\r\n          Filing\r\n          Follow-up",
        requirements: "Discrepancy Letter\r\n          Application details",
        deliverables: "Filed Response\r\n          Status Update",
        timeline: "5-7 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 11,
        name: "Trademark Renewal",
        description: "Keep your trademark valid ( Renew your trademark every 10 years)",
        detail_description: "Trademarks are valid for 10 years. They must be renewed to maintain protection. We assist in filing Form TM-R for renewal",
        is_active: true,
        category: 3,
        features: "Renewal filing\r\n          Application tracking\r\n          Validity extension\r\n          Status update",
        requirements: "Registration Certificate\r\n          POA  (Power of Attorney)",
        deliverables: "Renewal Request Filed\r\n          Next 10 years validity",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 16,
        name: "Trademark Hearing",
        description: "Legal representation for show cause hearings",
        detail_description: "If your trademark application is set for a hearing, our attorneys will represent your case before the Registrar to argue for acceptance",
        is_active: true,
        category: 3,
        features: "Hearing Preparation\r\n          Attorney Appearance\r\n          Submissions on record\r\n          Order verification",
        requirements: "Hearing Notice\r\n          POA  (Power of Attorney)\r\n          Case papers",
        deliverables: "Hearing Report\r\n          Acceptance Order (if successful )",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 18,
        name: "Trademark Transfer",
        description: "Transfer ownership of trademark ( Assignment of trademark rights)",
        detail_description: "Trademark assignment is the process of transferring ownership of a trademark from one person/entity to another (with or without goodwill)",
        is_active: true,
        category: 3,
        features: "Assignment Deed drafting\r\n          Form TM-P filing\r\n          Recordal of assignment",
        requirements: "Deed of Assignment\r\n          POA  (Power of Attorney) from Assignee",
        deliverables: "Filed TM-P\r\n          Updated proprietor details",
        timeline: "1-2 months",
        icon: "\ud83d\udccb",
        plans: [
        ]
      }
    ]
  },
  {
    id: 4,
    name: "GST",
    description: "Goods and Services Tax compliance",
    icon: "\ud83d\udcca",
    services: [
      {
        id: 21,
        name: "GST Registration",
        description: "New GST Registration service ( Get your GSTIN quickly)",
        detail_description: "Get your business registered under GST. Mandatory for turnover above threshold or for interstate trade/e-commerce. We handle the complete online application process",
        is_active: true,
        category: 4,
        features: "Application filing\r\n          Document verification\r\n          Clarification response\r\n          HSN/SAC code selection\r\n          Certificate issuance",
        requirements: "PAN & Aadhaar\r\n          Business Address Proof\r\n          Bank Account Proof\r\n          Photo",
        deliverables: "GST Certificate (REG-06)\r\n          Login Credentials",
        timeline: "3-5 working days",
        icon: "\ud83d\udcca",
        plans: []
      },
      {
        id: 22,
        name: "GST Return Filing (Monthly)",
        description: "Monthly GSTR-1 and GSTR-3B filing ( Regular monthly GST compliance)",
        detail_description: "Comprehensive monthly compliance for regular taxpayers. Handing GSTR-1 (Outward supplies) and GSTR-3B (Summary return) ensuring ITC claim and liability discharge",
        is_active: true,
        category: 4,
        features: "GSTR-1 Filing\r\n          GSTR-3B Filing\r\n          ITC Reconciliation (2A/2B)\r\n          Tax payment support\r\n          Monthly report",
        requirements: "Sales Invoices\r\n          Purchase Invoices\r\n          Expense bills\r\n          Bank statement",
        deliverables: "Filed Returns\r\n          Tax Challans\r\n          Compliance Report",
        timeline: "Monthly",
        icon: "\ud83d\udcd1",
        plans: [
        ]
      },
      {
        id: 23,
        name: "GST Return Filing (Quarterly)",
        description: "Quarterly return filing service ( Composition/QRMP scheme filing)",
        detail_description: "For composition dealers (CMP-08) and regular taxpayers under QRMP scheme. We ensure timely filing of statements and returns every quarter",
        is_active: true,
        category: 4,
        features: "CMP-08 / GSTR-1 & 3B (QRMP)\r\n          Challan generation\r\n          Invoice uploading\r\n          Compliance check",
        requirements: "Sales data\r\n          Purchase data\r\n          Bank statement",
        deliverables: "Filed Return\r\n          Payment Challan",
        timeline: "Quarterly",
        icon: "\ud83d\udcd1",
        plans: [
        ]
      },
      {
        id: 24,
        name: "GST Annual Return (GSTR-9)",
        description: "Annual GSTR-9 filing ( Consolidated annual return filing)",
        detail_description: "GSTR-9 is an annual return to be filed by all registered taxpayers. It consists of details regarding outward and inward supplies made/received during the financial year",
        is_active: true,
        category: 4,
        features: "Consolidated data preparation\r\n          ITC reconciliation\r\n          Tax liability matching\r\n          Filing support",
        requirements: "Monthly/Quarterly returns data\r\n          Financial statements\r\n          GSTR-2A/2B reports",
        deliverables: "'Filed GSTR-9\r\n          Acknowledgement",
        timeline: "5 -7 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 25,
        name: "GST Audit (GSTR-9C)",
        description: "GSTR-9C filing and certification ( Reconciliation statement filing)",
        detail_description: "Filing of Reconciliation Statement (GSTR-9C) for taxpayers with turnover exceeding prescribed limit. reconciling returns with audited financial statements",
        is_active: true,
        category: 4,
        features: "Reconciliation of GSTR-9 with Audited Financials\r\n          Clause-by-clause reporting\r\n          Certification\r\n          Liability assessment",
        requirements: "Audited Financials\r\n          GSTR-9\r\n          Annual returns data\r\n          ITC register",
        deliverables: "Filed GSTR-9C\r\n          Reconciliation Report",
        timeline: "7 -10 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 26,
        name: "GST LUT Filing",
        description: "File Letter of Undertaking for exports ( Export without paying IGST)",
        detail_description: "Letter of Undertaking (LUT) allows exporters to export goods or services without payment of IGST. It is valid for one financial year and must be renewed annually",
        is_active: true,
        category: 4,
        features: "Form GST RFD-11 filing\r\n          ARN generation\r\n          Export compliance advisory\r\n          Annual renewal",
        requirements: "GSTIN\r\n          Authorized signatory DSC\r\n          Witness details",
        deliverables: "LUT Acknowledgement\r\n          LUT ARN",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 27,
        name: "GST Refund Filing",
        description: "Assistance in claiming GST refunds ( Claim your GST refunds)",
        detail_description: "We help you file GST refund applications for exports (with/without payment of tax), inverted duty structure, and excess balance in cash ledger",
        is_active: true,
        category: 4,
        features: "Eligibility check\r\n          RFD-01 filing\r\n          Document preparation\r\n          Department follow-up\r\n          Refund tracking",
        requirements: "Export documents\r\n          ITC ledger\r\n          GSTR-2A/2B\r\n          Bank details",
        deliverables: "Filed Refund Application\r\n          ARN generation\r\n          Refund Order",
        timeline: "15-30 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      }
    ]
  },
  {
    id: 8,
    name: "Loan",
    description: "Financial assistance and loan services",
    icon: "\ud83d\udcb0",
    services: [
      {
        id: 65,
        name: "Personal Loan",
        description: "Instant personal loans for your needs",
        detail_description: "Quick and easy personal loans for medical emergencies, travel, wedding, or any other personal requirement. We help you choose the lender with the best terms and fastest processing",
        is_active: true,
        category: 8,
        features: "Instant approval options\r\n          No collateral\r\n          Flexible tenure\r\n          Minimum documentation\r\n          Competitive rates",
        requirements: "Salary Slips / Income Proof\r\n          Bank Statements\r\n          KYC Documents\r\n          Employment Proof",
        deliverables: "Loan Sanction\r\n          Cash in account",
        timeline: "3-5 working days",
        icon: "\ud83d\udcb8",
        plans: [
        ]
      },
      {
        id: 66,
        name: "Business Loan",
        description: "Funds to grow and expand your business",
        detail_description: "Get unsecured business loans to expand your operations, purchase inventory, or manage cash flow. We work with multiple banks and NBFCs to get you the capital you need without collateral",
        is_active: true,
        category: 8,
        features: "Unsecured loans\r\n          Flexible repayment\r\n          Quick disbursal\r\n          Minimal paperwork\r\n          High loan amount",
        requirements: "Business Registration\r\n          ITR for 2-3 years\r\n          Bank Statements\r\n          Business Proof\r\n          KYC of owners",
        deliverables: "Loan Approval\r\n          Disbursement",
        timeline: "3-5 working days",
        icon: "\ud83d\udcbc",
        plans: [
        ]
      },
      {
        id: 67,
        name: "Home Loan",
        description: "Home loan consultation and application",
        detail_description: "Expert assistance for home loans. Whether you are buying a flat, constructing a house, or renovating, we guide you through the process, helping you get the lowest interest rates and maximum eligibility",
        is_active: true,
        category: 8,
        features: "Lowest interest rates\r\n          Maximum loan eligibility\r\n          Balance transfer options\r\n          Legal check support\r\n          Pradhan Mantri Awas Yojana benefits",
        requirements: "Property Documents\r\n          Income Documents\r\n          KYC Documents\r\n          Bank Statements\r\n          Employment Proof",
        deliverables: "Loan Sanction Letter\r\n          Legal clearance support",
        timeline: "3-5 working days",
        icon: "\ud83c\udfe0",
        plans: [
        ]
      },
      {
        id: 68,
        name: "Car Loan",
        description: "Get the best deal on your car loan",
        detail_description: "We help you find and apply for the best car loan offers from top banks. Compare interest rates, processing fees, and tenure to choose the right loan for your new or used car",
        is_active: true,
        category: 8,
        features: "Compare multiple banks\r\n          Low interest rates\r\n         Quick approval\r\n          Minimal documentation\r\n          Doorstep service",
        requirements: "Income Proof\r\n          Identity Proof\r\n          Address Proof\r\n          Vehicle Quotation\r\n          Bank Statements",
        deliverables: "Loan Sanction\r\n          Disbursement Support",
        timeline: "3-5 working days",
        icon: "\ud83d\ude97",
        plans: [
        ]
      },
      {
        id: 69,
        name: "MSME Loan",
        description: "Assistance for MSME loans ( Collateral-free loans for small businesses)",
        detail_description: "We assist MSMEs in obtaining loans under various government schemes like MUDRA and CGTMSE. These loans are often collateral-free and come with attractive interest rates to boost small businesses",
        is_active: true,
        category: 8,
        features: "Collateral-free options\r\n          Government scheme benefits\r\n          Low interest rates\r\n          Documentation support\r\n          Fast processing",
        requirements: "Udyam Registration\r\n          Business Plan\r\n          KYC Documents\r\n          Bank Statements\r\n          ITR (if available)",
        deliverables: "Loan Application Submission\r\n          Project Report\r\n          Sanction Letter assistance",
        timeline: "15-20 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      }
    ]
  },
  {
    id: 6,
    name: "MCA",
    description: "Ministry of Corporate Affairs filings and services",
    icon: "\ud83c\udfdb\ufe0f",
    services: [
      {
        id: 43,
        name: "DIN Reactivation",
        description: "Process to reactivate deactivated DIN",
        detail_description: "If a Director Identification Number (DIN) is deactivated due to non-filing of KYC, we assist in reactivating it by filing DIR-3 KYC with necessary penalties",
        is_active: true,
        category: 6,
        features: "DIR-3 KYC preparation\r\n          Penalty payment assistance\r\n          DIN status check\r\n          Reactivation support",
        requirements: "PAN and Aadhaar\r\n          Mobile and Email OTP\r\n          Passport (if foreign tax resident)",
        deliverables: "Reactivated DIN\r\n          KYC acknowledgement",
        timeline: "2-3 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 49,
        name: "Dormant Status Filing",
        description: "Apply for dormant status (MSC-1) and obtain it for inactive companies",
        detail_description: "If your company has no significant accounting transactions, you can apply for \"Dormant Status\" to reduce compliance burden. It saves you from being struck off and allows maintaining the company with minimal filing",
        is_active: true,
        category: 6,
        features: "MSC-1 Form filing\r\n          Statement of Affairs\r\n          Board Resolution\r\n         Compliance reduction",
        requirements: "Financial Statement showing no transactions\r\n          Director details\r\n          Board approval",
        deliverables: "Dormant Status Certificate",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 53,
        name: "Share Transfer",
        description: "Formalize transfer of company shares between shareholders",
        detail_description: "Transfer of shares in a private limited company requires execution of Share Transfer Deed (SH-4) and payment of stamp duty. We help you with the documentation and board resolutions",
        is_active: true,
        category: 6,
        features: "SH-4 Deed drafting\r\n          Stamp duty calculation\r\n          Board Resolution drafting\r\n          Share Certificate endorsement",
        requirements: "Share Certificates\r\n          Transferor and Transferee details\r\n          Consideration amount\r\n          Board approval",
        deliverables: "Executed Transfer Deed\r\n          Board Resolution\r\n          Updated Share Certificates",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 54,
        name: "Winding Up-LLP",
        description: "Legal closure of Limited Liability Partnership",
        detail_description: "Process to close a defunct LLP by filing Form 24. We handle the complete documentation and filing process to legally shut down your LLP",
        is_active: true,
        category: 6,
        features: "Form 24 preparation\r\n          Statement of Accounts\r\n          Affidavits from Partners\r\n          Professional certification",
        requirements: "Financial Statement (Nil assets/liabilities)\r\n          Consent of all partners\r\n          Affidavits and Indemnity\r\n          ITR acknowledgement",
        deliverables: "Filed Form 24\r\n          Closure confirmation",
        timeline: "30-45 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 55,
        name: "Winding Up-Company",
        description: "Close your private limited company legally (Strike Off)",
        detail_description: "If your company is not carrying on any business, it is better to close it legally to avoid annual compliance costs and penalties. We assist in filing Form STK-2 for striking off the company name",
        is_active: true,
        category: 6,
        features: "STK-2 preparation and filing\r\n          Affidavits and Indemnity Bonds\r\n          Statement of Accounts preparation\r\n          Professional certification",
        requirements: "Statement of Accounts\r\n          Indemnity Bond by Directors\r\n          Affidavit by Directors\r\n          Bank closure certificate",
        deliverables: "Filed STK-2\r\n          Strike off notice",
        timeline: "30-60 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 56,
        name: "Commencement (INC-20A)",
        description: "Mandatory file declaration of commencement of new business",
        detail_description: "Every company incorporated after November 2018 must file form INC-20A within 180 days of incorporation. It declares that the shareholders have paid the share capital value",
        is_active: true,
        category: 6,
        features: "Form INC-20A filing\r\n          Professional certification\r\n          Challan generation\r\n          Compliance status update",
        requirements: "Bank statement showing capital infusion\r\n          Photograph of registered office\r\n          Certificate of Incorporation",
        deliverables: "Approved INC-20A\r\n          Challan receipt",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 50,
        name: "MOA Amendment",
        description: "Alter Memorandum of Association by changing company objectives or capital clause",
        detail_description: "MOA alteration is required for changing the main objects of the company, name change, or capital clause change. We assist in the complete legal process",
        is_active: true,
        category: 6,
        features: "Special Resolution drafting\r\n          Form MGT-14 filing\r\n          Altered MOA drafting\r\n          Process guidance",
        requirements: "Existing MOA\r\n          Proposed changes\r\n          Shareholder consent",
        deliverables: "Filed MGT-14\r\n          Updated MOA",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 51,
        name: "AOA Amendment",
        description: "Alter Articles of Association by changing company rules and regulations",
        detail_description: "Alteration of Articles of Association might be needed for changing internal rules, adopting new regulations, or conversion of company type. We handle resolution drafting and MGT-14 filing",
        is_active: true,
        category: 6,
        features: "Special Resolution drafting\r\n          Form MGT-14 filing\r\n          Altered AOA drafting\r\n          ROC approval support",
        requirements: "Existing AOA\r\n          Proposed changes\r\n          Board meeting details",
        deliverables: "Filed MGT-14\r\n          Updated AOA",
        timeline: "7 - 10 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 52,
        name: "Authorized Capital Increase",
        description: "File Form SH-7 to increase authorized capital capacity of a company",
        detail_description: "To issue more shares (investment), you may need to increase the authorized capital of the company. This involves conducting a meeting, passing a resolution, and filing Form SH-7 with the ROC",
        is_active: true,
        category: 6,
        features: "EGM Notice and Resolution\r\n          Form SH-7 filing\r\n          MOA alteration\r\n          Compliance advisory",
        requirements: "Existing MOA/AOA\r\n          Proposed capital amount\r\n          Shareholder breakdown",
        deliverables: "Approved SH-7\r\n          Updated Company Master Data\r\n          Altered MOA",
        timeline: "5 -7 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 38,
        name: "Company Compliance",
        description: "All-inclusive annual compliance package for Pvt Ltd",
        detail_description: "Complete peace of mind package for Private Limited Companies including AOC-4, MGT-7, Director KYC, and secretarial support",
        is_active: true,
        category: 6,
        features: "ROC Returns (AOC-4, MGT-7)\r\n          Director KYC\r\n          Statutory Register maintenance\r\n          Minutes Book maintenance\r\n          Secretarial support",
        requirements: "Audited Financials\r\n          Director DSC\r\n          Board meeting details",
        deliverables: "Filed Annual Returns\r\n          Minutes and Registers\r\n          Confirmation of Compliance",
        timeline: "Annually",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 39,
        name: "LLP Compliance",
        description: "End-to-end annual filling for LLP",
        detail_description: "Comprehensive package covering Form 11 (Annual Return) and Form 8 (Statement of Accounts & Solvency) filing for Limited Liability Partnerships",
        is_active: true,
        category: 6,
        features: "Form 11 Filing\r\n          Form 8 Filing\r\n          Partner KYC\r\n          Drafting of documents\r\n          Advisory",
        requirements: "LLP Financials\r\n          Partner details\r\n          DSC",
        deliverables: "Filed Form 11 & Form 8\r\n          Compliance status report",
        timeline: "Annually",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 40,
        name: "Name Change- Company",
        description: "Process to change company name",
        detail_description: "Changing a company name involves checking name availability (RUN), passing a special resolution, and obtaining a fresh Certificate of Incorporation",
        is_active: true,
        category: 6,
        features: "Name availability search\r\n          RUN application\r\n          MGT-14 filing\r\n          Information INC-24\r\n          Fresh COI",
        requirements: "Proposed names\r\n          Board and Shareholder approval\r\n          Justification for change",
        deliverables: "Fresh Certificate of Incorporation\r\n          Updated MOA/AOA",
        timeline: "15 - 20 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 41,
        name: "Registered Office Change",
        description: "Change of registered office address within/outside state",
        detail_description: "Process to shift registered office. Complexity varies based on whether the shift is within the same city, same state, or to another state (requires regional director approval)",
        is_active: true,
        category: 6,
        features: "INC-22 filing\r\n          Board/Special Resolution\r\n          Liaison with ROC/RD (for state shift)\r\n          Documentation support",
        requirements: "New address proof (Utility bill)\r\n          NOC from owner\r\n          Rent agreement",
        deliverables: "Filed INC-22\r\n          Updated Master Data",
        timeline: "5 - 10 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 42,
        name: "DIN eKYC Filing",
        description: "Mandatory annual DIR-3 KYC for Directors",
        detail_description: "Every person holding a DIN must complete DIR-3 KYC annually before 30th September. Failure leads to DIN deactivation and penalty of ???5,000",
        is_active: true,
        category: 6,
        features: "Web-KYC or Form KYC filing\r\n          OTP verification\r\n          Status monitoring\r\n          Compliance certificate",
        requirements: "DIN\r\n          PAN\r\n          Aadhaar\r\n          Personal Mobile & Email",
        deliverables: "Filed DIR-3 KYC\r\n          Active status confirmation",
        timeline: "1-2 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 44,
        name: "Director Change",
        description: "Appointment of new director (DIR-12)",
        detail_description: "Process to appoint a new director to the Board. Involves obtaining DIN, obtaining consent (DIR-2), passing resolution, and filing Form DIR-12",
        is_active: true,
        category: 6,
        features: "DIN Application (if required)\r\n          Consent Form DIR-2\r\n          Appointment Letter\r\n          DIR-12 filing",
        requirements: "Director KYC (PAN, Aadhaar)\r\n          Photo\r\n          DSC\r\n          Board Resolution",
        deliverables: "Filed DIR-12\r\n          Appointment validation\r\n          Updated Master Data",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 45,
        name: "Remove Director",
        description: "Filing DIR-12 for removal/resignation of director",
        detail_description: "When a director resigns from a company, Form DIR-12 must be filed with the ROC within 30 days. We handle the resignation letter, board resolution, and filing process",
        is_active: true,
        category: 6,
        features: "Resignation letter drafting\r\n          Board Resolution\r\n          DIR-12 filing\r\n          Master Data update",
        requirements: "Resignation Letter\r\n          Board Meeting confirmation\r\n          Director DSC",
        deliverables: "Filed DIR-12\r\n          Updated Company Master Data",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 46,
        name: "ADT-1 Filing",
        description: "Notify ROC about auditor appointment",
        detail_description: "Form ADT-1 is filed by a company to intimate the Registrar of Companies about the appointment of an auditor after the AGM. It must be filed within 15 days of the meeting",
        is_active: true,
        category: 6,
        features: "Form ADT-1 preparation\r\n          AGM Resolution details\r\n        Auditor consent letter\r\n          Filing support",
        requirements: "Auditor details (Name, PAN, Membership No.)\r\n          Consent letter from Auditor\r\n          Board/AGM Resolution",
        deliverables: "Filed ADT-1\r\n          Challan Receipt",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 47,
        name: "DPT-3 Filing",
        description: "Disclosure of deposits and outstanding loans",
        detail_description: "Form DPT-3 is a return of deposits that companies must file to furnish information about deposits and/or outstanding receipt of loan or money other than deposits. Due date is generally 30th June",
        is_active: true,
        category: 6,
        features: "Loan/Deposit classification\r\n          DPT-3 Form preparation\r\n          Auditor certificate coordination\r\n          Filing with ROC",
        requirements: "List of loans and deposits\r\n          Ageing of loans\r\n         Trust deed (if any)\r\n          Statutory Auditor inputs",
        deliverables: "Filed DPT-3\r\n          Challan Receipt",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 48,
        name: "LLP Form 11 Filing",
        description: "Mandatory annual return filing for LLP",
        detail_description: "LLP Form 11 is the Annual Return of Limited Liability Partnership. It contains details of partners and contributions. It must be filed within 60 days of closure of financial year (by 30th May)",
        is_active: true,
        category: 6,
        features: "Form 11 preparation\r\n          Partner details verification\r\n          Turnover declaration\r\n          Penalty avoidance",
        requirements: "LLP Agreement\r\n          Contribution details\r\n          Partner details\r\n          DSC of Designated Partner",
        deliverables: "Filed Form 11\r\n          Challan Receipt",
        timeline: "2 - 3 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Startup",
    description: "Launch your business",
    icon: "\ud83d\ude80",
    services: [
      {
        id: 3,
        name: "Sole-proprietorship",
        description: "Start a proprietorship business ( Simplest business form)",
        detail_description: "Sole Proprietorship is the simplest form of business organization owned and managed by a single individual. Registration is usually done via UDYAM or GST",
        is_active: true,
        category: 2,
        features: "UDYAM Registration\r\n          GST Registration (if opted)\r\n          Current Account opening support\r\n          Business proof",
        requirements: "PAN & Aadhaar\r\n          Address Proof\r\n          Photo",
        deliverables: "Registration Certificate\r\n          Entity Proof",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 4,
        name: "Limited Liability Partnership",
        description: "Incorporation of LLP ( LLP Registration)",
        detail_description: "LLP combines the flexibility of a partnership with the limited liability of a company. Ideal for professionals and small businesses",
        is_active: true,
        category: 2,
        features: "DSC & DIN\r\n          Name Reservation\r\n          LLP Agreement drafting\r\n          Incorporation filing",
        requirements: "Partner KYC\r\n          Address Proof\r\n          Contribution details",
        deliverables: "Certificate of Incorporation\r\n          LLP Agreement\r\n          PAN & TAN",
        timeline: "10-12 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 5,
        name: "Partnership Firm Registration",
        description: "Registration of Partnership Firm",
        detail_description: "A partnership is an arrangement where parties, known as business partners, agree to cooperate to advance their mutual interests. Registration makes it a legal entity capable of suing",
        is_active: true,
        category: 2,
        features: "Partnership Deed Drafting\r\n          Notarization\r\n          Registration application\r\n          Firm Card/Certificate",
        requirements: "Partners Details\r\n          Office Address Proof\r\n          Capital Contribution details",
        deliverables: "Registered Partnership Deed\r\n          Registration Certificate (RoF)",
        timeline: "10-15 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 6,
        name: "Private Limited Company",
        description: "Private Limited Company incorporation",
        detail_description: "The most preferred structure for startups. It offers limited liability, separate legal entity status, and easy fund raising capability",
        is_active: true,
        category: 2,
        features: "DSC for 2 Directors\r\n          DIN for 2 Directors\r\n          Name Approval\r\n          MOA & AOA\r\n          Incorporation Certificate",
        requirements: "PAN & Aadhaar\r\n          Bank statement/Utility bill\r\n          Photo\r\n          Rent Agreement (Office)",
        deliverables: "Certificate of Incorporation\r\n          PAN & TAN\r\n          MOA & AOA",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 7,
        name: "Section 8 Company",
        description: "Register a Section 8 company for Non-profit organization (NGOs)",
        detail_description: "Section 8 Company is a special type of company formed for promoting charitable objectives. It enjoys various tax benefits and exemptions.",
        is_active: true,
        category: 2,
        features: "DSC & DIN\r\n          Name Reservation\r\n          License under Section 8\r\n          Incorporation Certificate\r\n         PAN & TAN",
        requirements: "Director IDs\r\n          Photos\r\n          Address Proof\r\n          Objectives of NGO",
        deliverables: "Incorporation Certificate\r\n          License\r\n          Section 8 License",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Income Tax",
    description: "Income tax return filing and planning",
    icon: "\ud83d\udcdd",
    services: [
      {
        id: 34,
        name: "(ITR-7) Return Filing",
        description: "Filing ITR-7 for entities claiming exemption ( Trusts, NGOs and Political Parties )",
        detail_description: "ITR-7 is applicable for persons including companies required to furnish return under sections 139(4A) or 139(4B) or 139(4C) or 139(4D). Ideal for Trusts, Political parties ,Institutions, Colleges, etc.",
        is_active: true,
        category: 5,
        features: "Review of Audit Report\r\n          Exemption claim (11/12)\r\n          Form 10B/10BB analysis\r\n          Return filing\r\n          Compliance check",
        requirements: "Audited Financials\r\n          Audit Report (Form 10B/10BB)\r\n          Registration Certificate (12A/80G)\r\n          Trust Deed",
        deliverables: "Filed ITR-7\r\n          Computation of Income\r\n          Acknowledgement",
        timeline: "5 - 7 working days",
        icon: "\ud83d\udcb0",
        plans: [
        ]
      },
      {
        id: 31,
        name: "(ITR-4) Return Filing",
        description: "Sugam ITR filing under presumptive scheme for small businesses",
        detail_description: "ITR-4 (Sugam) is for individuals, HUFs and Firms (other than LLP) being a resident having total income up to ???50 lakh and having income from business and profession computed under sections 44AD, 44ADA or 44AE",
        is_active: true,
        category: 5,
        features: "Presumptive income calculation\r\n          No books of accounts required\r\n          Tax planning\r\n          Quick filing\r\n          Refund processing",
        requirements: "Bank statements\r\n          Turnover/Receipts details\r\n          Form 26AS\r\n          Personal details",
        deliverables: "Filed ITR-4\r\n          Computation of Income\r\n          Acknowledgement",
        timeline: "2 -3 working days",
        icon: "\ud83d\udcb0",
        plans: [
        ]
      },
      {
        id: 33,
        name: "(ITR-6) Return Filing",
        description: "Corporate tax return filing for companies",
        detail_description: "ITR-6 is mandatory for all companies (except those claiming exemption under section 11). It must be filed electronically. We handle complex corporate tax computations and MAT calculations",
        is_active: true,
        category: 5,
        features: "Corporate tax computation\r\n          MAT calculation\r\n          Depreciation schedule\r\n          Foreign asset reporting\r\n          Audit report integration",
        requirements: "Audited Financial Statements\r\n          Tax Audit Report\r\n          Bank Statements\r\n          DSC of Director",
        deliverables: "Filed ITR-6\r\n          Computation of Income\r\n          Acknowledgement",
        timeline: "3-5 working days",
        icon: "\ud83d\udcb0",
        plans: [
        ]
      },
      {
        id: 37,
        name: "Business Tax Filing",
        description: "End-to-end comprehensive tax filing solutions for businesses",
        detail_description: "Tailored tax filing service for businesses covering Income Tax, Advance Tax, and TDS planning. We help you stay compliant while optimizing your tax liability",
        is_active: true,
        category: 5,
        features: "Advance Tax estimation\r\n          Tax planning\r\n          Return filing\r\n          Compliance calendar\r\n          Expert advisory",
        requirements: "Financial data\r\n          Previous returns\r\n          Business details",
        deliverables: "Filed Returns\r\n          Tax Plan Report\r\n          Challans",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 35,
        name: "TDS Return Filing",
        description: "Quarterly TDS return filing with complete reconciliation",
        detail_description: "TDS Return Filing service for businesses deducting tax at source. We handle quarterly filing of Forms 24Q, 26Q, 27Q, and 27EQ with complete reconciliation, error correction, and Form 16/16A generation",
        is_active: true,
        category: 5,
        features: "Form 24Q/26Q/27Q filing\r\n          PAN verification\r\n          Challan verification\r\n          Form 16/16A generation\r\n          Late fee advice",
        requirements: "TAN number\r\n          TDS Challans\r\n          Deductee details\r\n          Deduction details",
        deliverables: "Filed TDS Return\r\n          Form 16/16A\r\n          Acknowledgement",
        timeline: "Quarterly",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 36,
        name: "Income tax E-Filing",
        description: "File your income tax return with expert assistance",
        detail_description: "Get your Income Tax Return filed by tax experts. We help maximum tax refund and ensure complete compliance with Income Tax laws. Suitable for all types of income",
        is_active: true,
        category: 5,
        features: "Expert consultation\r\n          Tax planning advice\r\n          Refund assistance\r\n          Notice management\r\n          Compliance check",
        requirements: "Form 16/16A\r\n          Bank statements\r\n          Investment proofs\r\n          Aadhaar & PAN",
        deliverables: "Filed ITR Acknowledgement\r\n          Computation of Income\r\n          Tax payment challan (if any)",
        timeline: "2 - 3 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 29,
        name: "(ITR-2) Return Filing",
        description: "ITR-2 filing for capital gains and multiple properties",
        detail_description: "ITR-2 is for individuals and HUFs not having income from business or profession. Applicable when you have capital gains from property, shares, or multiple house properties. Our experts handle complex calculations and exemptions",
        is_active: true,
        category: 5,
        features: "Capital gains calculation\r\n          Foreign Asset reporting\r\n          Multiple house property\r\n          Agricultural income\r\n          Clubbing of income",
        requirements: "Capital Gain Statement\r\n          Broker reports\r\n          Property deed\r\n          Form 26AS",
        deliverables: "Filed ITR-2\r\n          Capital Gain Report\r\n          Computation of Income",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 30,
        name: "(ITR-3) Return Filing",
        description: "ITR-3 filing for business income with financial statements",
        detail_description: "ITR-3 is for individuals and HUFs having income from business or profession. Includes preparation of profit and loss account and balance sheet. Our CAs handle complete book keeping and ensure maximum deductions",
        is_active: true,
        category: 5,
        features: "P&L and Balance Sheet preparation\r\n          Business income calculation\r\n          Audit report filing (if applicable)\r\n          Loss carry forward\r\n          Expert review",
        requirements: "Books of Accounts\r\n          Bank statements\r\n          Form 26AS\r\n          Investment proofs",
        deliverables: "Filed ITR-3\r\n          Financial Statements\r\n          Computation Sheet",
        timeline: "5 - 7 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 28,
        name: "(ITR-1) Return Filing",
        description: "Simple ITR filing for salary/pension income",
        detail_description: "ITR-1 (Sahaj) is for individuals being a resident (other than not ordinarily resident) having total income upto ???50 lakh, having Income from Salaries, one house property, other sources (Interest etc.), and agricultural income upto ???5 thousand.Our CAs ensure error-free filing, maximum deductions under 80C, 80D and other sections, and handle all compliance to get you maximum refunds.",
        is_active: true,
        category: 5,
        features: "Form 16 analysis and verification\r\n          Maximum tax-saving deductions claimed\r\n          Error-free filing guaranteed\r\n          ITR acknowledgment and e-verification\r\n          Expert Chartered Accountant review\r\n          Free response to income tax notices",
        requirements: "Form 16 from employer\r\n          Form 26AS from income tax portal\r\n          Bank account statements\r\n          Investment proofs (80C, 80D, etc.)\r\n          Home loan interest certificate\r\n       Capital gains statement (if applicable)",
        deliverables: "Filed ITR with acknowledgment number\r\n          Detailed tax computation sheet\r\n          Refund tracking assistance\r\n         ITR-V for Aadhaar verification\r\n          Complete copy of filed return",
        timeline: "1 - 2 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 32,
        name: "(ITR-5) Return Filing",
        description: "Tax filing for Partnerships , LLPs and AOPs",
        detail_description: "ITR-5 is for firms, LLPs, AOPs, BOIs, etc. We ensure correct reporting of partner's remuneration, interest on capital, and other specific deductions available to firms",
        is_active: true,
        category: 5,
        features: "Partnership tax computation\r\n          Partner salary/interest schedule\r\n          Presumptive scheme (if applicable)\r\n          Tax audit assistance\r\n          Filing support",
        requirements: "Financial Statements\r\n          Partnership Deed\r\n          Partner details\r\n          Bank statements",
        deliverables: "Filed ITR-5\r\n          Computation of Income\r\n          Acknowledgement",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Compliance",
    description: "Regular compliance and filing services",
    icon: "\ud83d\udcc2",
    services: [
      {
        id: 58,
        name: "FSSAI Renewal",
        description: "Renewal of FSSAI Registration or License",
        detail_description: "FSSAI License is valid for 1 to 5 years. It must be renewed before expiry to continue food business operations. We assist in filing the renewal application with necessary declarations",
        is_active: true,
        category: 7,
        features: "Renewal application filing\r\n          Document verification\r\n          Avoidance of late fees\r\n          Extended validity\r\n          Compliance check",
        requirements: "Existing License\r\n          Address Proof\r\n          ID Proof\r\n          Declaration of valid details",
        deliverables: "Renewed FSSAI Certificate",
        timeline: "10-15 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 64,
        name: "Bookkeeping",
        description: "Maintain your accounts professionally by bookkeeping services",
        detail_description: "Outsource your bookkeeping to experts. We maintain your ledgers, accounts payable/receivable, and bank reconciliation ensuring your books are always up-to-date and ready for tax filing",
        is_active: true,
        category: 7,
        features: "Daily/Weekly transaction recording\r\n          Bank reconciliation\r\n          Financial reporting\r\n          Cloud accounting software\r\n          Vendor management",
        requirements: "Bank and Credit Card statements\r\n          Invoices and Bills\r\n          Expense receipts\r\n          Payroll data",
        deliverables: "Updated Books of Accounts\r\n          Monthly Financial Statements\r\n          Profit & Loss Report",
        timeline: "Monthly",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 62,
        name: "Partnership Compliance",
        description: "Annual compliance services for partnership firms",
        detail_description: "Partnership firms are required to file income tax returns (ITR-5) and maintain proper books of accounts. We handle all annual compliances including tax audit assistance if turnover exceeds limits",
        is_active: true,
        category: 7,
        features: "ITR-5 Filing\r\n          Financial Statements\r\n          Tax Audit Support\r\n          GST Compliance\r\n          Partner Salary calculations",
        requirements: "Partnership Deed\r\n          Financial data\r\n          Bank statements\r\n          Partner details",
        deliverables: "Filed ITR\r\n          Balance Sheet & P&L\r\n          Tax Audit Report (if applicable)",
        timeline: "Annually",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 63,
        name: "Proprietorship Compliance",
        description: "Complete annual compliance handling for sole proprietors",
        detail_description: "Proprietorships need to manage income tax and GST filings. We provide a comprehensive package to handle all statutory compliances for your sole proprietorship business",
        is_active: true,
        category: 7,
        features: "ITR Filing\r\n         GST Return Filing\r\n         TDS Compliance (if applicable)\r\n      Financial Statement preparation\r\n          Tax planning",
        requirements: "Bank statements\r\n          Sales/Purchase details\r\n          Expense proofs\r\n          GST login",
        deliverables: "Filed Returns\r\n          Computation of Income\r\n          Compliance Certificate",
        timeline: "Annually",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 59,
        name: "HR & Payroll Services",
        description: "End-to-end payroll management and outsourcing",
        detail_description: "We manage your entire payroll process including salary calculation, tax deduction (TDS), PF/ESI computations, payslip generation, and transfer advice. Focus on your business while we handle your workforce payments",
        is_active: true,
        category: 7,
        features: "Salary processing\r\n          Payslip generation\r\n          Tax calculation\r\n          Statutory compliance (PF/ESI/PT)\r\n          Leave management",
        requirements: "Employee Master Data\r\n          Attendance inputs\r\n          Salary structure\r\n          Investment declarations",
        deliverables: "Monthly Payslips\r\n          Salary Sheet\r\n          Tax Reports\r\n          Bank Transfer File",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 60,
        name: "PF Return Filing",
        description: "Monthly PF Electronic Challan Return (ECR) filing service",
        detail_description: "Timely filing of PF returns is crucial for employers. We handle the preparation and filing of the monthly Electronic Challan cum Return (ECR) and generation of payment challans",
        is_active: true,
        category: 7,
        features: "ECR preparation\r\n          UAN generation for new employees\r\n          Challan generation\r\n          KYC update assistance\r\n          Withdrawal support",
        requirements: "Salary sheet\r\n          PF login credentials\r\n          New joiner details\r\n          Exit details",
        deliverables: "Filed PF Return (ECR)\r\n          Payment Receipt\r\n          Monthly Report",
        timeline: "Monthly",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 61,
        name: "ESI Return Filing",
        description: "Monthly ESI contribution filing",
        detail_description: "Employers registered under ESI must file monthly contributions and half-yearly returns. We ensure timely filing to avoid penalties and interest, ensuring your employees get their benefits",
        is_active: true,
        category: 7,
        features: "Monthly contribution generation\r\n         Challan creation\r\n         Return filing\r\n         Employee data management\r\n         Compliance alerts",
        requirements: "Wages data\r\n          Attendance records\r\n          ESI login credentials\r\n          Employee details",
        deliverables: "Filed ESI Return\r\n          Payment Challan\r\n          Contribution History",
        timeline: "Monthly",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 57,
        name: "Annual ROC Filing",
        description: "Complete annual ROC compliance with MCA for companies",
        detail_description: "Every registered company must file annual returns (MGT-7) and financial statements (AOC-4) with the Registrar of Companies (ROC). Our service ensures timely filing to avoid heavy penalties up to ???5 lakhs",
        is_active: true,
        category: 7,
        features: "AOC-4 and MGT-7 filing\r\n          Financial statement preparation\r\n          Board meeting minutes\r\n          Penalty avoidance\r\n          Director KYC",
        requirements: "Financial statements\r\n          Director details\r\n          Board minutes\r\n          DSC of directors",
        deliverables: "Filed AOC-4 and MGT-7\r\n          Compliance Certificate\r\n          Acknowledgement Receipts",
        timeline: "5-7 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      }
    ]
  },
  {
    id: 9,
    name: "Registration",
    description: "Essential business and tax registrations",
    icon: "\ud83d\udcc2",
    services: [
      {
        id: 78,
        name: "UDYAM Registration",
        description: "Udyam registration for MSME benefits",
        detail_description: "MSME (Udyam) Registration provides recognition and numerous benefits to micro, small, and medium enterprises including priority sector lending, collateral-free loans, subsidies on electricity bills, patent registration, and eligibility for government tenders.",
        is_active: true,
        category: 9,
        features: "Online Udyam registration\r\n          Permanent registration number\r\n          No renewal required - lifetime validity\r\n          Government benefits access\r\n          Subsidy eligibility certificate\r\n          Tender participation rights",
        requirements: "Aadhaar number\r\n          PAN card\r\n          Business name and type\r\n          Investment and turnover details\r\n          Bank account details\r\n          'Business address",
        deliverables: "Udyam Registration Number (URN)\r\n          Udyam Registration Certificate\r\n          Digital certificate download\r\n          Benefits guide document",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 75,
        name: "Import Export Code (IEC)",
        description: "IEC registration for international trade",
        detail_description: "Import Export Code (IEC) is a 10-digit code mandatory for any business engaged in importing or exporting goods and services. It is issued by the Directorate General of Foreign Trade (DGFT) and has lifetime validity with no renewal required.",
        is_active: true,
        category: 9,
        features: "IEC number within 7 days\r\n          Complete documentation support\r\n          DGFT filing and follow-up\r\n          Digital certificate\r\n          No renewal required - lifetime validity\r\n          'Bank and customs registration",
        requirements: "Business PAN card',\r\n          Bank certificate with IFSC and SWIFT code\r\n          Cancelled cheque\r\n          Business address proof\r\n          ID proof of proprietor/directors\r\n          Business registration documents",
        deliverables: "10-digit IEC number\r\n          IEC certificate from DGFT\r\n          Digital certificate download\r\n          Bank registration confirmation",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 70,
        name: "Startup",
        description: "Registration under Startup India scheme",
        detail_description: "Get recognized as a Startup by DPIIT to avail various benefits such as tax exemptions, self-certification compliance, and easier public procurement norms. We assist in the complete registration process.",
        is_active: true,
        category: 9,
        features: "Eligibility check\r\n          Profile creation\r\n          Application drafting\r\n          Document upload\r\n          Recognition certificate\r\n          Tax exemption application support",
        requirements: "Certificate of Incorporation\r\n          Write-up on nature of business\r\n          Pitch deck / Website link\r\n          Director details\r\n          Patent/Trademark details (if any)",
        deliverables: "DPIIT Recognition Certificate\r\n          Startup India Profile",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 79,
        name: "Apply TAN",
        description: "Obtain your Tax Deduction Account Number (TAN) quickly",
        detail_description: "TAN or Tax Deduction and Collection Account Number is a 10-digit alpha-numeric number required to be obtained by all persons who are responsible for deducting or collecting tax. It is mandatory to quote TAN in all TDS/TCS returns, payment challans, and certificates.",
        is_active: true,
        category: 9,
        features: "Application filing (Form 49B)\r\n          Error-free processing\r\n          Quick allotment\r\n          Advisory on TDS compliance",
        requirements: "Organization details\r\n          PAN of the entity\r\n          Address proof\r\n          Authorized signatory details",
        deliverables: "TAN Allotment Letter",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 71,
        name: "Trade Registration",
        description: "Municipal trade license registration",
        detail_description: "A Trade License is a document/certificate that gives the permission to the applicant (person seeking to open a business) to commence a particular trade or business in a particular area/location",
        is_active: true,
        category: 9,
        features: "Application filing with municipal corporation\r\n          Document processing\r\n         Fee payment assistance\r\n          Follow-up with authorities\r\n          License issuance",
        requirements: "Premises proof (Rent agreement/Ownership)\r\n          ID Proof of applicant\r\n          PAN Card\r\n          Business details\r\n          NOC from neighbors (if applicable)",
        deliverables: "Trade License Certificate",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 80,
        name: "Apply PAN",
        description: "Get your Permanent Account Number (PAN) hassle-free",
        detail_description: "Permanent Account Number (PAN) is a ten-character alphanumeric identifier, issued in the form of a laminated \"PAN card\", by the Indian Income Tax Department, to any \"person\" who applies for it or to whom the department allot the number without an application",
        is_active: true,
        category: 9,
        features: "Online application processing\r\n          Document verification\r\n          Assistance with corrections\r\n          Track status updates\r\n          Physical card delivery",
        requirements: "Proof of Identity\r\n          Proof of Address\r\n          Proof of Date of Birth\r\n          Photographs",
        deliverables: "PAN Card (Physical)\r\n          e-PAN (Digital)",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 77,
        name: "Digital Signature",
        description: "Secure Class 3 Digital Signature Certificate for individuals and organizations",
        detail_description: "A Digital Signature Certificate (DSC) allows you to sign documents digitally. It is mandatory for various government filings including MCA, GST, Income Tax, and e-tenders. faster, safer, and cleaner way of signing documents.",
        is_active: true,
        category: 9,
        features: "Class 3 DSC (Highest security)\r\n          Signature + Encryption\r\n          USB Token included\r\n          Paperless approval process\r\n          Valid for 2 years",
        requirements: "Aadhaar Card\r\n          PAN Card\r\n          Mobile number linked with Aadhaar\r\n          Email ID\r\n          Video verification",
        deliverables: "Digital Signature Certificate\r\n          USB Token",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 76,
        name: "12A and 80G Registration",
        description: "Obtain 12A and 80G registration for tax benefits",
        detail_description: "12A registration allows an NGO to get income tax exemption on its surplus income. 80G registration allows donors to claim tax deduction on donations made to the NGO. These are critical for the financial sustainability of any non-profit organization.",
        is_active: true,
        category: 9,
        features: "Form 10A filing\r\n          Documentation drafting\r\n          Department follow-up\r\n          Query resolution\r\n          Provisional and final registration",
        requirements: "Trust Deed / Bylaws / MOA & AOA\r\n          PAN of NGO\r\n          Trustee details\r\n          Financial statements\r\n          Activity report",
        deliverables: "12A Registration Certificate',\r\n          '80G Registration Certificate",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 72,
        name: "FSSAI Registration and License",
        description: "FSSAI license for food businesses",
        detail_description: "FSSAI (Food Safety and Standards Authority of India) license is mandatory for all food businesses including manufacturing, storage, distribution, and retail. We help you obtain the appropriate license (Basic/State/Central) based on your business size and type.",
        is_active: true,
        category: 9,
        features: "License type consultation\r\n          Complete application filing\r\n          Documentation support\r\n          Inspection assistance\r\n          License certificate\r\n          'Renewal reminders",
        requirements: "Business registration proof\r\n          Food category details\r\n          Premises layout plan\r\n          ID and address proof\r\n          List of food products\r\n          NOC from municipality (if required)",
        deliverables: "FSSAI registration/license number\r\n          License certificate\r\n          Food safety plan\r\n          Compliance guidelines",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 73,
        name: "PF Registration",
        description: "EPF registration for organizations",
        detail_description: "Employees Provident Fund (EPF) registration is mandatory for organizations with 20 or more employees. It is a retirement benefit scheme helping employees save a fraction of their salary every month, which can be used upon retirement.",
        is_active: true,
        category: 9,
        features: "Establishment registration\r\n          DSC registration\r\n          Document verification\r\n          Code number allotment\r\n          Compliance advisory",
        requirements: "Business PAN\r\n          Certificate of Incorporation/Registration\r\n          Director/Partner details\r\n          Employee details\r\n          Bank proof\r\n          Digital Signature",
        deliverables: "PF Code Number\r\n          Registration Certificate\r\n          Access to Employer Portal",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      },
      {
        id: 74,
        name: "ESI Registration",
        description: "Register for ESI to provide social security to employees",
        detail_description: "ESI Registration is mandatory for entities employing 10 or more persons (20 in some states) with wages up to ???21,000. It provides medical, cash, maternity, disability, and dependent benefits to employees",
        is_active: true,
        category: 9,
        features: "Employer registration\r\n          Employee data upload\r\n          ESI code generation\r\n          Compliance guidance\r\n          Document management",
        requirements: "Business Registration Certificate\r\n          PAN Card\r\n          GST Certificate\r\n          Employee details\r\n          Bank details\r\n          Address proof",
        deliverables: "ESI Code Number (17 digits)\r\n          Registration Letter\r\n          Employee Insurance Numbers",
        timeline: "3-5 working days",
        icon: "\ud83d\udccb",
        plans: [
        ]
      }
    ]
  }
];
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, field_validator
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import aiosmtplib
import os
from dotenv import load_dotenv
import json
from datetime import datetime
import re

# Load environment variables
load_dotenv()

app = FastAPI(title="Boston Manufacturing Group API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Mount static files
app.mount("/static", StaticFiles(directory="../public"), name="static")

# Data structures matching the Next.js content
REPORTS_DATA = [
    {
        "id": "trust-but-verify-supplier-qualification-by-process-capability",
        "title": "Trust but Verify - Supplier Qualification by Process Capability",
        "author": "Guy Breier, CEO, BMG",
        "date": "Feb 8, 2021",
        "summary": "Years back, I was in charge of supplier and manufacturing quality for one of the large US-based companies designing and selling complex... ",
        "url": "/reports/trust-but-verify-supplier-qualification-by-process-capability",
        "content": """Years back, I was in charge of supplier and manufacturing quality for one of the large US-based companies designing and selling complex electromechanical home products. One of these products was a sophisticated vacuum cleaner, and we were about to order a large production run, with components coming from different suppliers. One of these components was a drive belt that provided fine control over the vacuum nozzle-head. The belt was transferring power from an electric motor to the nozzle-head's brush-roll which was turning at high RPM. We decided to choose a new supplier that we haven't used before.

From our early prototype testing and from similar products in our portfolio, we knew that a precise and accurate length of the drive belt was critical. If the belt was too long, the tension would be too low and the belt would slip. This in turn would lead to poor nozzle performance, a noisy operation, and premature wear and tear. The mechanics of this is simple: a belt that is too long will be loose, and can slip against the gear teeth and over time, this can degrade the belt to the point that it doesn't work at all. On the other hand, if the belt is too short, the tension would be too high causing too much stress on the gears. This too impacts long-term reliability, but also creates a high-pitch sound disturbing to the human ear.

As part of the design package delivered to this supplier, detailed drawings were sent, which included the required belt length and tolerances. The belt specifications were 150mm with a tolerance of ±10mm. To ensure they were producing the belt to spec, and since it was a new supplier, I insisted that we obtain a First Article Inspection (FAI): they needed to show us the first 30 samples for evaluation.

So they had sent us the samples, and the belts were within spec. We were ready to roll, right?

Something seemed off, though, although no one else seemed to see it. I decided to look at the data more closely. I noticed that the FAI samples had a curious fact: all the samples were on the lower end of the specification limit. Strange. I decided to run a statistical analysis of the belt lengths of the samples they had sent. Thirty data points isn't a lot, but it is just enough to get some sense of the distribution of what could be expected from the supplier. (for normal distribution with continuous data 30 samples is the minimum required).

There are two important parameters that describe a sample distribution: the variance (width) and the mean (average of the data they sent). If the mean is not close to the center of the spec tolerance range, in this case 150mm, even if it is a narrow distribution, it could still skew out of spec. The CPK is an index that is used for statistics that skew to one side of a tolerance range. It is a riff on the "process capability" index Cp which describes how narrow the distribution is. The extra K in CPK accounts for this - it comes from the Japanese word "katayori" which means offset. It modifies the CP-index to account for skewed data. A CPK of zero would be very bad! It would mean that the center of the distribution will actually be on one of the boundaries of the tolerated specs - so about half the output will be out of spec! (A negative CPK would be even worse.) On the other hand, a CPK of one would mean the distribution is within the boundaries of both sides, with the tail reaching the closest tolerance boundary at 3σ from the average of the sample set.

What was the CPK of the 30 samples in the FAI we received? I readily calculated from the data to be slightly more than 1/2 (see figure). This CPK, if reflected in the entire line of belts being produced, would indicate an 11% defect rate. In other words, a defective parts per million (DPPM) of about 110,000. This was enormous, and it didn't jive with the 30 samples they had produced for the First Article Inspection (FAI) we received. I immediately knew what was happening. They had almost certainly pulled all the samples that were out of range. About three of the samples FAI set were out of range, and they never sent them to us.

A simple calculation shows that the probability of all thirty samples being in range is:

So with a 97% likelihood, they had misrepresented their FAI, most likely because they pulled them out from the sample sent to us. We called them on this, and they adjusted the average length of the belt to be more centered. The production line ran with the new length belts (6 mm longer on average), and all was well.

There were many lessons learned from this, but the most important one for me, that I have carried forward, is that it is mission critical to do more than make sure the initial samples are within specification. It's not sufficient, especially if you do not have someone you trust onsite collecting the FAI. I also understood clearly that my job is to use these analyses to catch problems before they happen at scale. When data speaks, we should listen. In this case, the samples needed to be representative, and if some are removed by hand, this can be detected using statistical strategies."""
    },
    {
        "id": "p2p-blog",
        "title": "P2P Blog",
        "author": "Guy Breier, CEO, BMG",
        "date": "Jan 29, 2021",
        "summary": "Welcome to the Boston Manufacturing Group (BMG) Prototype-to-Production™ blog. BMG supports manufacturing efforts that include... ",
        "url": "/reports/p2p-blog",
        "content": "Welcome to the Boston Manufacturing Group (BMG) Prototype-to-Production™ blog. BMG supports manufacturing efforts that include Sourcing, Technical Support, and Quality Control with a personal approach tailored to our customers' individual needs."
    },
    {
        "id": "hardware-startups-and-the-best-path-to-high-volume-manufacturing",
        "title": "Hardware startups and the best path to high-volume manufacturing",
        "author": "Ron Rubin PhD, Managing Director, BMG",
        "date": "Jan 29, 2021",
        "summary": "A proper manufacturing process can position a hardware startup months and even years ahead of its competition.",
        "url": "/reports/hardware-startups-and-the-best-path-to-high-volume-manufacturing",
        "content": "A proper manufacturing process can position a hardware startup months and even years ahead of its competition. This article explores the key considerations for scaling from prototype to high-volume production."
    }
]

TEAM_DATA = [
    {
        "name": "Guy Breier",
        "title": "Chief Executive Officer",
        "image": "/static/guy-breier.png",
        "linkedin": "https://www.linkedin.com/in/breier/",
        "bio": "Guy Breier, the Chief Executive Officer at BMG, combines decades of international expertise in Operations, Manufacturing, and Quality Control with an impressive academic background. Holding an Engineering degree from Tel Aviv University and an MBA from Boston College, he has also enriched his knowledge and contributed to the field as a Professor of Operations at Boston University. His innovative approach culminated in the creation of the proprietary Five Phase Assessment Process, a game-changer in the manufacturing industry. This unique process has not only powered the successful delivery of millions of premium-quality products but also realized cumulative savings exceeding hundreds million dollars for manufacturing plants around the globe."
    },
    {
        "name": "Dr. Ron Rubin",
        "title": "Advisor",
        "image": "/static/ron-rubin.png",
        "linkedin": "https://www.linkedin.com/in/ron-shai-rubin/",
        "bio": "Dr. Ron Rubin, a distinguished member of the Boston College faculty, is also the esteemed founder of Rubin/Anders Scientific, a premier scientific placement agency serving an impressive roster of law firms and corporate clientele. His academic laurels include a Ph.D. from Harvard University, reinforcing his status as a leader in the scientific community. In addition to his contributions at Boston College, Dr. Rubin has also shared his knowledge as a lecturer at the prestigious Massachusetts Institute of Technology (MIT), showcasing his commitment to fostering the next generation of scientific minds."
    }
]

TESTIMONIALS_DATA = [
    {
        "quote": "I had a great experience with Guy when he was the head of quality at Jibo so I knew that Guy brought serious hardware quality skills to the table. I reached out to him at the Boston Manufacturing Group and he took my team at Pillo through a great quality review process and identified some items we needed to improve with our manufacturer. Very smooth structured experience and great results.",
        "author": "Brian Eberman",
        "title": "CEO at Pilo Health"
    },
    {
        "quote": "While working as a Buyer at Piaggio Fast Forward, I have used the services of Guy Breier and The Boston Manufacturing Group. Guy and the group were instrumental in helping me in several areas including: Identifying the best quality components at a reasonable pricing, provide full quality analysis of every component, conducted Supplier audits and design validation, used the group's professional network to identify technical experts to support the design of the new robot. It has been an absolute pleasure working with The Boston Manufacturing Group, and I'm looking forward to the opportunity to work with them again in the future.",
        "author": "Ariel Lisogorsky",
        "title": "Buyer at Piaggio Fast Forward"
    }
]

# API Endpoints
@app.get("/")
async def root():
    return {"message": "Boston Manufacturing Group API", "version": "1.0.0"}

@app.get("/api/home")
async def get_home_data():
    return {
        "meta": {
            "title": "Boston Manufacturing Group",
            "description": "Prototype to production manufacturing solutions. Sourcing, technical support, quality control, and more."
        },
        "hero": {
            "title": "Boston Manufacturing Group",
            "subtitle": "Navigating the path from idea to production with world-class manufacturing solutions and support.",
            "video": "/static/manufacturing-bg.mp4"
        },
        "services": [
            {
                "title": "Intelligent Sourcing",
                "description": "We identify and procure the best materials and resources for your product, ensuring cost-effectiveness and quality."
            },
            {
                "title": "Technical Support", 
                "description": "Our experts provide ongoing guidance throughout the manufacturing process, keeping your product development on track."
            },
            {
                "title": "Quality Control",
                "description": "Stringent quality control measures ensure your products meet and exceed industry standards."
            }
        ],
        "capabilities": {
            "electronics": ["PCBA", "Electronic components", "Cable systems", "Power supplies"],
            "metals_plastics": ["Precision machining", "Stamping, castings, welding", "Injection molding, 3D printing", "Vacuum forming, extrusion"],
            "motors_batteries": ["BLDC, universal, induction motors", "Li-Ion, Ni-MH, Lead-Acid batteries", "Final assemblies & contract manufacturing"]
        },
        "process": [
            "Initial Engagement: Comprehensive consultation to understand your needs and challenges.",
            "Audit and Assessment: In-depth evaluation of your product and production strategy.",
            "Report and Proposal Delivery: Concise report and proposal with recommended actions and costs.",
            "Expert Engagement and Project Management: Deployment of top manufacturing experts and project management for execution.",
            "Sustain: Ongoing partnership to ensure quality and successful production runs."
        ],
        "team": TEAM_DATA,
        "testimonials": TESTIMONIALS_DATA,
        "contact": {
            "email": "contact@boston-mfg.com",
            "phone": "(617) 410-8155"
        }
    }

@app.get("/api/about")
async def get_about_data():
    return {
        "meta": {
            "title": "About | Boston Manufacturing Group"
        },
        "title": "About Boston Manufacturing Group",
        "description": "Boston Manufacturing Group (BMG) provides manufacturing services and support to customers on their way to production. Our services include Sourcing, Technical Support, and Quality Control with a personal approach tailored to our customers' individual needs. BMG provides a revolutionary combination of hands-on assessment and solutions from the leading manufacturing minds in the world, including faculty from leading institutions such as Harvard, MIT, and Boston College.",
        "five_phase_approach": [
            {
                "phase": "Phase 1 – Initial Engagement",
                "description": "We begin with a comprehensive initial consultation to meticulously identify the breadth and depth of your challenge, issue, or requirement. This ensures a thorough understanding of the problem that needs resolution and sets the stage for a successful partnership."
            },
            {
                "phase": "Phase 2 – Audit and Assessment", 
                "description": "Our team immerses itself in a detailed exploration of your existing challenges. We comprehensively evaluate your product's current state and production strategy to gain a deep understanding of your specific situation. This phase includes on-site visits, data collection, and process mapping."
            },
            {
                "phase": "Phase 3 – Report and Proposal Delivery",
                "description": "After our analysis, BMG presents a concise report outlining the identified issues and recommended actions. Accompanying the report, we share a proposal covering project scope, our engagement process, and the associated costs. Our team, comprising leading U.S. manufacturing scientists, is ready to guide your project towards success. This step ensures transparency and aids in informed decision-making."
            },
            {
                "phase": "Phase 4 – Expert Engagement and Project Management",
                "description": "BMG deploys globally recognized manufacturing and control process experts to address the identified manufacturing challenges. We closely collaborate with your team, overseeing project management to ensure timely execution and cost-efficiency, driving your production journey towards success."
            },
            {
                "phase": "Phase 5 – Sustain",
                "description": "BMG promises a persistent partnership until your product is successfully delivered to your customers. We continuously monitor and ensure quality, conducting necessary tests to guarantee a seamless and successful production run. Our commitment extends beyond project completion, ensuring ongoing support and continuous improvement."
            }
        ],
        "team": TEAM_DATA,
        "contact": {
            "email": "contact@boston-mfg.com",
            "phone": "(617) 410-8155"
        }
    }

@app.get("/api/sourcing")
async def get_sourcing_data():
    return {
        "meta": {
            "title": "Sourcing | Boston Manufacturing Group"
        },
        "title": "Sourcing",
        "description": "At Boston Manufacturing Group (BMG), sourcing is more than just procurement—it's a strategic process that ensures your product is built with the best materials, components, and partners available. Our sourcing services are designed to deliver quality, reliability, and cost-effectiveness across a wide range of technical domains.",
        "global_reach": {
            "title": "Global Sourcing Network",
            "subtitle": "BMG maintains strategic partnerships with qualified suppliers across major manufacturing regions worldwide",
            "regions": [
                {"name": "North America", "countries": ["United States", "Canada", "Mexico"], "specialties": ["Advanced electronics", "Precision machining", "Automotive components"]},
                {"name": "Europe", "countries": ["Germany", "Italy", "United Kingdom", "France"], "specialties": ["Industrial machinery", "High-precision tooling", "Medical devices"]},
                {"name": "Asia Pacific", "countries": ["China", "Japan", "South Korea", "Taiwan", "Singapore"], "specialties": ["Electronics manufacturing", "Plastics & injection molding", "Batteries & power systems"]},
                {"name": "Other Regions", "countries": ["India", "Brazil", "Israel"], "specialties": ["Software integration", "Specialized materials", "R&D partnerships"]}
            ]
        },
        "what_we_source": [
            {
                "category": "Electronics",
                "image": "/static/pcba.jpg",
                "icon": "💻",
                "items": ["PCBA", "Electronic components", "Cable systems", "Power supplies", "and more"]
            },
            {
                "category": "Metals",
                "image": "/static/metal.jpg", 
                "icon": "⚙️",
                "items": ["Precision machining", "Stamping", "Castings", "Welding supplies", "Custom metal parts"]
            },
            {
                "category": "Batteries",
                "image": "/static/battery.jpg",
                "icon": "🔋", 
                "items": ["Lithium-Ion (Li-Ion)", "Nickel-Metal Hydride (Ni-MH)", "Lead-Acid", "Other battery technologies"]
            },
            {
                "category": "Plastics",
                "image": "/static/plastics.jpg",
                "icon": "🧩",
                "items": ["Injection molding", "3D printing materials", "Vacuum forming", "Extrusion equipment", "Advanced plastic solutions"]
            },
            {
                "category": "Motors",
                "image": "/static/motors.jpg",
                "icon": "🔩",
                "items": ["Brushless DC (BLDC)", "Universal motors", "Induction motors", "Various applications"]
            },
            {
                "category": "Final Assemblies & Contract Manufacturing",
                "image": "/static/CM.jpg",
                "icon": "🏭",
                "items": ["Final assembly components", "Contract manufacturing resources", "Complete solutions"]
            }
        ],
        "process": [
            "Elite Supplier Network: We maintain a global network of thoroughly vetted suppliers, ensuring consistent delivery of high-quality components and materials.",
            "Bespoke Quality Assurance: BMG offers customized quality inspection levels for sourced materials, tailored to your specific standards and needs. We are committed to exceeding your expectations with every delivery.",
            "Cost-Effectiveness Without Compromise: Our deep market understanding allows us to identify the best value options, balancing cost and quality to maximize your ROI.",
            "Hands-On Support: Our team works closely with you from initial engagement through delivery, providing technical support, supplier audits, and design validation as needed.",
            "Transparent Communication: We keep you informed at every step, providing clear reports and recommendations so you can make confident decisions."
        ],
        "why_choose_bmg": [
            "Access to Thousands of Suppliers: We open doors to a vast supplier base, giving you more options and better leverage.",
            "Technical Expertise: Our team includes manufacturing scientists and engineers who understand the nuances of sourcing for complex products.",
            "Proven Track Record: BMG has saved manufacturing plants over $300 million through improved sourcing and process optimization.",
            "End-to-End Partnership: From initial consultation to sustained production, we're with you every step of the way."
        ],
        "contact": {
            "email": "contact@boston-mfg.com",
            "phone": "(617) 410-8155"
        }
    }

@app.get("/api/reports")
async def get_reports_data():
    return {
        "meta": {
            "title": "Reports | Boston Manufacturing Group",
            "description": "Reports and insights from Boston Manufacturing Group."
        },
        "title": "Reports",
        "description": "Explore our latest reports, insights, and case studies on manufacturing, sourcing, and quality control. Our team regularly publishes findings and recommendations to help you stay ahead in the industry.",
        "reports": REPORTS_DATA
    }

@app.get("/api/reports/{report_id}")
async def get_report_data(report_id: str):
    report = next((r for r in REPORTS_DATA if r["id"] == report_id), None)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    return {
        "meta": {
            "title": f"{report['title']} | Boston Manufacturing Group"
        },
        "report": report
    }

# Contact Form Models and Configuration
class ContactFormData(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    company: str
    title: str
    inquiry: str
    projectStage: str = ""
    message: str
    consent: bool
    
    @field_validator('firstName', 'lastName', 'company', 'title', 'message')
    @classmethod
    def validate_required_fields(cls, v):
        if not v or not v.strip():
            raise ValueError('This field is required')
        return v.strip()
    
    @field_validator('inquiry')
    @classmethod
    def validate_inquiry(cls, v):
        valid_options = [
            'ai-supply-chain',
            'manufacturing-consulting', 
            'global-sourcing',
            'quality-control',
            'prototype-production',
            'general-consultation'
        ]
        if v not in valid_options:
            raise ValueError('Invalid inquiry type')
        return v
    
    @field_validator('consent')
    @classmethod
    def validate_consent(cls, v):
        if not v:
            raise ValueError('Consent is required')
        return v

# Email Configuration
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USE_TLS = os.getenv("SMTP_USE_TLS", "false").strip().lower() == "true"
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "your-email@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "your-app-password")
BMG_EMAIL = os.getenv("BMG_EMAIL", "contact@boston-mfg.com")

async def send_contact_email(form_data: ContactFormData):
    """Send contact form data via email"""
    try:
        # First, always log the email content to a file for backup
        email_content = f"""
=== NEW CONTACT FORM SUBMISSION ===
Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
From: {form_data.firstName} {form_data.lastName} <{form_data.email}>
Company: {form_data.company}
Title: {form_data.title}
Service Interest: {form_data.inquiry}
Project Stage: {form_data.projectStage}
Message: {form_data.message}
Consent: {form_data.consent}
=====================================
"""
        
        with open("email_notifications.txt", "a") as f:
            f.write(email_content)
        
        print(f"📧 Email notification logged to file for {form_data.email}")
        # Create message
        message = MIMEMultipart('alternative')
        message['Subject'] = f"New Manufacturing Consultation Request from {form_data.company}"
        message['From'] = BMG_EMAIL
        message['To'] = BMG_EMAIL
        
        # Inquiry type mapping for display
        inquiry_types = {
            'ai-supply-chain': 'AI Supply Chain Disruption Analysis',
            'manufacturing-consulting': 'Manufacturing Operations Consulting',
            'global-sourcing': 'Global Sourcing & Supplier Management',
            'quality-control': 'Quality Control & Process Improvement',
            'prototype-production': 'Prototype to Production Support',
            'general-consultation': 'General Manufacturing Consultation'
        }
        
        project_stages = {
            'concept': 'Concept/Design Phase',
            'prototype': 'Prototype Development',
            'pilot': 'Pilot Production',
            'scaling': 'Scaling/Volume Production',
            'operational': 'Ongoing Operations Optimization'
        }
        
        # Create HTML email content
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .header {{ background-color: #2563eb; color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; }}
                .field {{ margin-bottom: 15px; }}
                .label {{ font-weight: bold; color: #2563eb; }}
                .value {{ margin-left: 10px; }}
                .message-box {{ background-color: #f8f9fa; padding: 15px; border-left: 4px solid #2563eb; margin: 15px 0; }}
                .footer {{ background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }}
                .priority {{ background-color: #dc3545; color: white; padding: 5px 10px; border-radius: 3px; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>New Manufacturing Consultation Request</h1>
                <span class="priority">HIGH PRIORITY LEAD</span>
            </div>
            
            <div class="content">
                <div class="field">
                    <span class="label">Contact Person:</span>
                    <span class="value">{form_data.firstName} {form_data.lastName}</span>
                </div>
                
                <div class="field">
                    <span class="label">Email:</span>
                    <span class="value"><a href="mailto:{form_data.email}">{form_data.email}</a></span>
                </div>
                
                <div class="field">
                    <span class="label">Company:</span>
                    <span class="value">{form_data.company}</span>
                </div>
                
                <div class="field">
                    <span class="label">Role/Title:</span>
                    <span class="value">{form_data.title}</span>
                </div>
                
                <div class="field">
                    <span class="label">Service Interest:</span>
                    <span class="value">{inquiry_types.get(form_data.inquiry, form_data.inquiry)}</span>
                </div>
                
                {f'<div class="field"><span class="label">Project Stage:</span><span class="value">{project_stages.get(form_data.projectStage, "Not specified")}</span></div>' if form_data.projectStage else ''}
                
                <div class="message-box">
                    <div class="label">Project Details:</div>
                    <div style="margin-top: 10px; white-space: pre-wrap;">{form_data.message}</div>
                </div>
                
                <div class="field">
                    <span class="label">Consent Confirmed:</span>
                    <span class="value">✅ Company representative seeking consulting services</span>
                </div>
                
                <div class="field">
                    <span class="label">Submission Time:</span>
                    <span class="value">{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} EST</span>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Next Steps:</strong></p>
                <p>• Respond within 24-48 hours as promised</p>
                <p>• Schedule initial consultation call</p>
                <p>• Add to CRM system for tracking</p>
                <br>
                <p>This lead was generated from the boston-mfg.com contact form</p>
            </div>
        </body>
        </html>
        """
        
        # Create plain text version
        text_content = f"""
        NEW MANUFACTURING CONSULTATION REQUEST - HIGH PRIORITY LEAD

        Contact Information:
        - Name: {form_data.firstName} {form_data.lastName}
        - Email: {form_data.email}
        - Company: {form_data.company}
        - Role/Title: {form_data.title}

        Request Details:
        - Service Interest: {inquiry_types.get(form_data.inquiry, form_data.inquiry)}
        - Project Stage: {project_stages.get(form_data.projectStage, "Not specified") if form_data.projectStage else "Not specified"}
        
        Project Details:
        {form_data.message}

        Additional Info:
        - Consent Confirmed: Company representative seeking consulting services
        - Submission Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} EST

        Next Steps:
        • Respond within 24-48 hours as promised
        • Schedule initial consultation call
        • Add to CRM system for tracking

        This lead was generated from the boston-mfg.com contact form.
        """
        
        # Attach parts
        part1 = MIMEText(text_content, 'plain')
        part2 = MIMEText(html_content, 'html')
        message.attach(part1)
        message.attach(part2)
        
        # Send email using standard smtplib (more reliable than aiosmtplib)
        import smtplib
        
        if SMTP_USE_TLS:
            server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
        else:
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(message)
        server.quit()
        
        return True
        
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return False

@app.post("/api/contact")
async def submit_contact_form(form_data: ContactFormData, background_tasks: BackgroundTasks):
    """Handle contact form submission"""
    try:
        # Add email sending to background tasks to avoid blocking the response
        background_tasks.add_task(send_contact_email, form_data)
        
        # Log the submission (you could also save to database here)
        print(f"Contact form submission from {form_data.email} at {form_data.company}")
        
        # Save submission to file as backup
        import json
        submission_data = {
            "timestamp": datetime.now().isoformat(),
            "name": f"{form_data.firstName} {form_data.lastName}",
            "email": form_data.email,
            "company": form_data.company,
            "title": form_data.title,
            "inquiry": form_data.inquiry,
            "projectStage": form_data.projectStage,
            "message": form_data.message,
            "consent": form_data.consent
        }
        
        with open("contact_submissions.json", "a") as f:
            f.write(json.dumps(submission_data) + "\n")
        
        return {
            "success": True,
            "message": "Thank you for your inquiry! We'll respond within 24-48 hours.",
            "data": {
                "name": f"{form_data.firstName} {form_data.lastName}",
                "company": form_data.company,
                "submissionTime": datetime.now().isoformat()
            }
        }
        
    except Exception as e:
        print(f"Contact form error: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Unable to process your request. Please try again or contact us directly."
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 
# PED – Cloud-Deployed Aerial Inspection Management System

## Overview
PED (Precision Evaluation & Diagnostics) is a cloud-deployed web application designed to streamline the intake and management of aerial inspection requests. The system provides a professional, scalable alternative to manual inspection workflows commonly used by small drone operators, contractors, and property managers.

This project serves as a full-stack capstone focused on systems engineering, cloud deployment, and project management rather than isolated feature development.

---

## Problem Statement
Aerial inspection services often rely on informal intake methods such as emails, phone calls, or generic contact forms. These approaches create friction, reduce trust, and make it difficult to scale operations or maintain consistent client experiences.

There is a need for a structured, cloud-based system that:
- Guides users through inspection requests
- Captures inspection data consistently
- Demonstrates operational professionalism
- Can scale with business growth

---

## Solution
PED provides a cloud-hosted inspection request platform with a clear user experience, backend API services, and an AWS-based deployment strategy. The system is designed as a minimum viable product (MVP) that can be incrementally expanded into a full inspection management platform.

---

## System Architecture (High-Level)

**Frontend**
- Static HTML, CSS, and JavaScript
- Hosted on AWS S3
- Handles user interaction and form validation

**Backend**
- Node.js with Express
- Deployed on AWS Elastic Beanstalk
- Exposes REST APIs for inspection requests

**Data Layer (Phase 1)**
- In-memory or JSON-based storage
- Planned migration path to DynamoDB or RDS

**Cloud Services**
- AWS S3 (frontend hosting)
- AWS Elastic Beanstalk (backend API)
- AWS IAM (access control)
- AWS CloudWatch (logging and monitoring)

---

## Key Features (Current)
- Professional landing page with service selection
- Interactive inspection request form
- Client-side validation and UX feedback
- State persistence using browser storage
- Modular structure designed for backend integration

---

## Planned Features
- Backend API for inspection request processing
- Server-side validation and error handling
- Persistent data storage
- Admin-facing request review
- Email or notification integration
- Client inspection history

---

## Project Phases

### Phase 1 – Deployment Foundation
- Finalize frontend MVP
- Create backend API skeleton
- Deploy frontend and backend to AWS
- Document architecture and tradeoffs

### Phase 2 – Core Functionality
- Connect frontend form to backend API
- Persist inspection requests
- Improve system robustness

### Phase 3 – Polish and Expansion
- UX refinements
- Architecture diagrams
- Scalability planning
- Final presentation and demo preparation

---

## Role and Responsibilities
This project is approached from the perspective of a **Technical Project Manager / Systems Engineer**, emphasizing:
- Scope definition
- Architecture decisions
- Cloud deployment strategy
- Phased delivery
- Tradeoff analysis

---

## Technology Stack
- HTML, CSS, JavaScript
- Node.js, Express
- AWS (S3, Elastic Beanstalk, IAM)
- GitHub for version control

---

## Deployment Status
🚧 In progress  
This system is actively being developed and deployed as part of a multi-phase capstone project.

---

## Author
Phillip Dowdy  

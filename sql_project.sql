-- ==========================================================
-- Database Schema & Seed Data: Job Roles & Compensation in India
-- Currency: INR (LPA = Lakhs Per Annum)
-- ==========================================================

DROP DATABASE IF EXISTS india_jobs_db;
CREATE DATABASE india_jobs_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE india_jobs_db;

-- 1. Departments Table
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 2. Experience Levels Table
CREATE TABLE experience_levels (
    level_id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(50) NOT NULL,
    years_range VARCHAR(20) NOT NULL
) ENGINE=InnoDB;

-- 3. Job Roles & Packages Table
CREATE TABLE job_packages (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(150) NOT NULL,
    department_id INT NOT NULL,
    level_id INT NOT NULL,
    min_package_lpa DECIMAL(5, 2) NOT NULL COMMENT 'Minimum CTC in INR Lakhs Per Annum',
    max_package_lpa DECIMAL(5, 2) NOT NULL COMMENT 'Maximum CTC in INR Lakhs Per Annum',
    avg_package_lpa DECIMAL(5, 2) NOT NULL COMMENT 'Median/Average CTC in INR Lakhs Per Annum',
    top_locations VARCHAR(255) DEFAULT 'Bengaluru, Hyderabad, Pune, Gurugram',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE,
    CONSTRAINT fk_level FOREIGN KEY (level_id) REFERENCES experience_levels(level_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ==========================================================
-- Seed Data Insertion
-- ==========================================================

-- Populate Departments
INSERT INTO departments (department_name) VALUES
('Information Technology & Software'),
('Data Science & AI'),
('Product Management'),
('Cloud & DevOps'),
('Cybersecurity'),
('Human Resources'),
('Sales & Marketing'),
('Banking & Finance');

-- Populate Experience Levels
INSERT INTO experience_levels (level_name, years_range) VALUES
('Entry Level', '0-2 Years'),
('Mid Level', '3-6 Years'),
('Senior Level', '7-10 Years'),
('Lead / Principal', '10+ Years');

-- Populate Job Titles and Package Ranges (in Lakhs Per Annum - LPA)
INSERT INTO job_packages 
(job_title, department_id, level_id, min_package_lpa, max_package_lpa, avg_package_lpa, top_locations) 
VALUES
-- IT & Software
('Graduate Software Engineer', 1, 1, 3.50, 8.50, 5.50, 'Bengaluru, Hyderabad, Pune, Chennai'),
('Full Stack Developer', 1, 2, 8.00, 18.00, 12.50, 'Bengaluru, Pune, Gurugram'),
('Senior Backend Engineer (Node/Java/Go)', 1, 3, 18.00, 35.00, 24.00, 'Bengaluru, Hyderabad, Noida'),
('Software Architect', 1, 4, 32.00, 65.00, 45.00, 'Bengaluru, Hyderabad, Gurugram'),

-- Data Science & AI
('Junior Data Analyst', 2, 1, 4.00, 7.50, 5.00, 'Mumbai, Bengaluru, Gurugram'),
('Machine Learning Engineer', 2, 2, 10.00, 22.00, 15.00, 'Bengaluru, Hyderabad'),
('Lead AI / LLM Researcher', 2, 4, 35.00, 80.00, 52.00, 'Bengaluru, Hyderabad'),

-- Product Management
('Associate Product Manager', 3, 1, 6.00, 14.00, 9.50, 'Bengaluru, Gurugram, Mumbai'),
('Product Manager', 3, 2, 14.00, 28.00, 20.00, 'Bengaluru, Gurugram, Noida'),
('Director of Product Management', 3, 4, 45.00, 95.00, 65.00, 'Bengaluru, Gurugram'),

-- Cloud & DevOps
('DevOps Engineer', 4, 2, 8.50, 18.00, 13.00, 'Bengaluru, Pune, Hyderabad'),
('Cloud Architect (AWS/GCP/Azure)', 4, 3, 22.00, 45.00, 30.00, 'Bengaluru, Chennai, Hyderabad'),

-- Cybersecurity
('Security Analyst (SOC)', 5, 1, 4.00, 8.00, 5.50, 'Pune, Bengaluru, Hyderabad'),
('Cybersecurity Specialist', 5, 2, 10.00, 24.00, 16.00, 'Bengaluru, Mumbai, Gurugram'),

-- Human Resources
('HR Executive / Talent Acquisition', 6, 1, 3.00, 5.50, 4.00, 'Mumbai, Delhi NCR, Pune'),
('Human Resources Business Partner (HRBP)', 6, 2, 8.00, 16.00, 11.50, 'Bengaluru, Mumbai, Gurugram'),

-- Sales & Marketing
('Digital Marketing Specialist', 7, 2, 5.00, 12.00, 8.00, 'Mumbai, Bengaluru, Delhi NCR'),
('Enterprise Sales Account Executive', 7, 3, 16.00, 35.00, 24.00, 'Mumbai, Bengaluru, Gurugram'),

-- Banking & Finance
('Investment Banking Analyst', 8, 1, 9.00, 22.00, 14.00, 'Mumbai, Bengaluru'),
('Financial Controller', 8, 3, 18.00, 36.00, 25.00, 'Mumbai, Delhi NCR');

-- ==========================================================
-- Helpful Sample Queries
-- ==========================================================

-- 1. View all jobs with formatted LPA values
SELECT 
    jp.job_title AS 'Job Title',
    d.department_name AS 'Department',
    el.level_name AS 'Experience Level',
    el.years_range AS 'Experience Range',
    CONCAT('₹ ', jp.min_package_lpa, ' - ', jp.max_package_lpa, ' LPA') AS 'Package Range',
    CONCAT('₹ ', jp.avg_package_lpa, ' LPA') AS 'Average Package',
    jp.top_locations AS 'Primary Locations'
FROM job_packages jp
JOIN departments d ON jp.department_id = d.department_id
JOIN experience_levels el ON jp.level_id = el.level_id
ORDER BY jp.avg_package_lpa DESC;

-- 2. Find high-paying roles offering >= 20 LPA average
SELECT 
    job_title, 
    CONCAT('₹ ', avg_package_lpa, ' LPA') AS avg_package, 
    top_locations
FROM job_packages
WHERE avg_package_lpa >= 20.00
ORDER BY avg_package_lpa DESC;
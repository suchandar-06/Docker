from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.database import Base

class Department(Base):
    __tablename__ = "departments"

    department_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    department_name = Column(String(100), unique=True, nullable=False)

    jobs = relationship("JobPackage", back_populates="department")

class ExperienceLevel(Base):
    __tablename__ = "experience_levels"

    level_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    level_name = Column(String(50), nullable=False)
    years_range = Column(String(20), nullable=False)

    jobs = relationship("JobPackage", back_populates="experience_level")

class JobPackage(Base):
    __tablename__ = "job_packages"

    job_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    job_title = Column(String(150), nullable=False, index=True)
    department_id = Column(Integer, ForeignKey("departments.department_id"), nullable=False)
    level_id = Column(Integer, ForeignKey("experience_levels.level_id"), nullable=False)
    min_package_lpa = Column(Numeric(5, 2), nullable=False)
    max_package_lpa = Column(Numeric(5, 2), nullable=False)
    avg_package_lpa = Column(Numeric(5, 2), nullable=False)
    top_locations = Column(String(255), default="Bengaluru, Hyderabad, Pune, Gurugram")
    created_at = Column(TIMESTAMP, server_default=func.now())

    department = relationship("Department", back_populates="jobs")
    experience_level = relationship("ExperienceLevel", back_populates="jobs")

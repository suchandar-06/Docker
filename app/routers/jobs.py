from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import JobPackage, Department
from app.schemas import JobPackageResponse, JobPackageCreate

router = APIRouter()

@router.get("/", response_model=List[JobPackageResponse])
def get_jobs(
    department: Optional[str] = Query(None, description="Filter by department name"),
    min_lpa: Optional[float] = Query(None, description="Minimum average package in LPA"),
    location: Optional[str] = Query(None, description="Search by location"),
    db: Session = Depends(get_db)
):
    query = db.query(JobPackage)
    if department:
        query = query.join(Department).filter(Department.department_name.ilike(f"%{department}%"))
    if min_lpa is not None:
        query = query.filter(JobPackage.avg_package_lpa >= min_lpa)
    if location:
        query = query.filter(JobPackage.top_locations.ilike(f"%{location}%"))
    return query.all()

@router.get("/{job_id}", response_model=JobPackageResponse)
def get_job_by_id(job_id: int, db: Session = Depends(get_db)):
    job = db.query(JobPackage).filter(JobPackage.job_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.post("/", response_model=JobPackageResponse, status_code=201)
def create_job(job: JobPackageCreate, db: Session = Depends(get_db)):
    db_job = JobPackage(**job.model_dump())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

from pydantic import BaseModel
from typing import Optional
from decimal import Decimal

class DepartmentResponse(BaseModel):
    department_id: int
    department_name: str

    class Config:
        from_attributes = True

class ExperienceLevelResponse(BaseModel):
    level_id: int
    level_name: str
    years_range: str

    class Config:
        from_attributes = True

class JobPackageBase(BaseModel):
    job_title: str
    department_id: int
    level_id: int
    min_package_lpa: Decimal
    max_package_lpa: Decimal
    avg_package_lpa: Decimal
    top_locations: Optional[str] = None

class JobPackageCreate(JobPackageBase):
    pass

class JobPackageResponse(JobPackageBase):
    job_id: int
    department: Optional[DepartmentResponse] = None
    experience_level: Optional[ExperienceLevelResponse] = None

    class Config:
        from_attributes = True

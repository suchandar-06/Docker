# Use the official MySQL 8.0 image
FROM mysql:8.0

# Set environment variables for the database
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=india_jobs_db

# Copy your SQL initialization script into the container
# Any .sql file placed in this folder is automatically run on container first start
COPY sql_project.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306

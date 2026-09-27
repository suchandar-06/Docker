FROM python
WORKDIR /workdir
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
# Expose port will be define in developer script
MAINTAINER Suchandar
CMD ["python", "app.py"]

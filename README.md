# Creating Devices

## Create RS256 keys

- `openssl genrsa -out rsa_private.pem 2048`
- `openssl rsa -in rsa_private.pem -pubout -out rsa_public.pem`
- Register device in console
- Get device list: `gcloud iot devices list --project=project-name --registry=registry-name --region=europe-west1`
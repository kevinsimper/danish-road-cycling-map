gcloud builds submit . --tag=gcr.io/road-cycling-map/road-cycling-map:$(git rev-parse HEAD)

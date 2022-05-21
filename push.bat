set version=1.1

docker tag ambrosia-loans/website docker.appleptr16.com/ambrosia-loans/website:%version%
docker tag ambrosia-loans/postgres docker.appleptr16.com/ambrosia-loans/postgres:%version%
docker tag ambrosia-loans/base docker.appleptr16.com/ambrosia-loans/base:%version%
docker tag ambrosia-loans/api docker.appleptr16.com/ambrosia-loans/api:%version%
docker tag ambrosia-loans/nginx docker.appleptr16.com/ambrosia-loans/nginx:%version%

docker push docker.appleptr16.com/ambrosia-loans/website:%version%
docker push docker.appleptr16.com/ambrosia-loans/postgres:%version%
docker push docker.appleptr16.com/ambrosia-loans/base:%version%
docker push docker.appleptr16.com/ambrosia-loans/api:%version%
docker push docker.appleptr16.com/ambrosia-loans/nginx:%version%

@Pause
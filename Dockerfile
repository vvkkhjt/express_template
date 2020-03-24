FROM hub.digi-sky.com/base/nodejs:8.9.4

WORKDIR /data/platform
COPY . .
RUN yarn

EXPOSE 5000
CMD [ "yarn","prod" ]

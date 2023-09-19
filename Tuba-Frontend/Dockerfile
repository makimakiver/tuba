FROM node:13.12.0-alpine
WORKDIR /EPQ-PROJECT-TUBA
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install react-scripts@4.0.3 -g --silent

COPY . ./

CMD ["npm", "start"]
FROM node:latest as build-stage
WORKDIR /SpruTT
COPY package*.json ./
RUN npm install vue
RUN npm install vuex
RUN npm install vuex-persistedstate
RUN npm install axios
RUN npm install vue-router
RUN npm install bootstrap
RUN npm install bootstrap-vue
RUN npm install select2
RUN npm install -save vue-xlsx
RUN npm install vue-excel-xlsx
# RUN npm install @handsontable/vue
RUN npm install handsontable @handsontable/vue
RUN npm install lodash
RUN npm install vue-select
RUN npm install @amcharts/amcharts5
RUN npm install @amcharts/amcharts4
RUN npm install -save vue-xlsx
RUN npm install moment
RUN npm install html2pdf.js
RUN npm install normalize.css
# RUN npm i vuedraggable
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /appS
COPY --from=build-stage /SpruTT/dist /appS
COPY nginx.conf /etc/nginx/nginx.conf

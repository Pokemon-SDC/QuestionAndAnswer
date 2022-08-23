# The Clapper API


## Goal
* Improve web scalability of an e-commerce website by transforming a monolithic back-end service to one with a service-oriented architecture. 
* Focus on the application's Question and Answers component

## Technologies Used
<div align="center" width="100%">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" />
</div>
Local Testing: K6, Chakram

Deployed Testing: Loader.io

## Description
* Client Requirements: Application should operate at >=1000 RPS, <2000 ms latency time, with <1% error rate 
* Designed DB schema for questions about a product, respective answers to questions, and respective photos relating to a particular answer
* Utilized ETL to combine and cleanse data and input into a PostgreSQL DB
* Developed efficient JSON aggregate functions and applied indexing to improve query search times
* Deplyed service on AWS EC2 instance and stress-tested the service with Loader.io
* Implemented Nginx Load Balancer and 2 AWS EC2 microservices to horizontally scale service
** Result: Improved load capacity from 1000 RPS to 2500 RPS with reduction in latency from 1779 ms to 102 ms

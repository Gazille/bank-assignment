# Assignment

## Technologies

Project was created with:

- nodejs
- postgresql

## Setup

- Clone code with command ```git clone https://github.com/Gazille/bank-assignment.git``` and swith to branh master
- Run ```npm install```
- Create .env file .env.example
- Run ```npm start``` to start source BE

## Diagram
![image](https://github.com/Gazille/bank-assignment/assets/147364431/21ac47f8-c086-47ef-b51b-ac01b9d14142)

- Based on history to suggest and predict the maximum money limit that users can achieve when registering for a credit card => I will query transactions of bank_account in last recent 6 months, count all transaction in and out and multiply by 70% to get the limit


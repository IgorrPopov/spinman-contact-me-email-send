require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { isEmail } = require('class-validator');

const { createHtmlEmail } = require('./utils/createHtmlEmail');

const { 
  allowedProperties, 
  maxNameLength, 
  maxMessageLenght, 
  bodyPropsAmount 
} = require('./constants/const');


exports.spinmanMail = async ({ method, body }, res) => {
  if (method !== 'POST') return res.status(400).send('Only POST method is allowed');

  const bodyArr = Object.keys(body);

  let isValidRequest = bodyArr.every(prop => allowedProperties.includes(prop));

  if (!isValidRequest || bodyArr.length !== bodyPropsAmount) 
    return res.status(400).send('Invalid request');

  isValidRequest = Object.entries(body).every(
    ([key, value]) => { 
      if (key === 'email') return isEmail(value);
      if (key === 'name') return value && value.length <= maxNameLength;
      return value && value.length <= maxMessageLenght;
    } 
  );

  if (!isValidRequest) return res.status(400).send('Invalid request ');

  // Email send if valid data

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'ivpoov@gmail.com',
    from: body.email,
    subject: `Contact request from ${body.name}`,
    html: createHtmlEmail(body),
  };
  
  const sendEmail = async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  };

  await sendEmail();

  res.send('Email sent');
};
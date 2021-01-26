const nodemailer = require("nodemailer");
require("dotenv").config();
exports.email = async function (name, email, mobile) {
  // create reusable transporter object using the default SMTP transport
  let transporter = await nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });

  try {
    //     // send mail to company mailbox
    //     let company = await transporter.sendMail({
    //       from: `'"Digaut",${process.env.MAIL_SENDER}'`, // sender address
    //       to: "client@digaut.com", // list of receivers
    //       subject: subject, // Subject line
    //       text: description,
    //       html: `<!DOCTYPE html>
    // <html>
    // <head>
    // <style>
    // table {
    //   font-family: arial, sans-serif;
    //   border-collapse: collapse;
    //   width: 100%;
    // }

    // td {
    //   border: 1px solid #dddddd;
    //   text-align: left;
    //   padding: 8px;
    // }

    // tr:nth-child(even) {
    //   background-color: #dddddd;
    // }
    // </style>
    // </head>
    // <body>

    // <img src='https://digaut.com/digaut-logo.png' width='70 height='70 alt='logo' /><br>
    // <table style=''>
    //   <tr>
    //     <td>Name</td>
    //     <td>${name}</td>
    //   </tr>
    //   <tr>
    //     <td>Email</td>
    //     <td>${email}</td>
    //   </tr>
    //   <tr>
    //     <td>Mobile No</td>
    //     <td>${mobile}</td>
    //   </tr>
    //   <tr>
    //     <td>Subject</td>
    //     <td>${subject}</td>
    //   </tr>
    //   <tr>
    //     <td>Description</td>
    //     <td>${description}</td>
    //   </tr>

    // </table>

    // </body>
    // </html>`, // the tick should come here
    //     });

    //send mail to client mailbox
    let welcome = `<img src='https://digaut.com/digaut-logo.png' width='70 height='70 alt='logo' /><br><br>
      Dear ${name},<br><br>
      Thankyou for connecting with Doorest partner<br><br>
      Our team will contact you as soon as possible<br><br>
       Regaurds ,<br>
       Doorest Team<br>
       <a href='https://digaut.com'>Doorest.in</a> `;
    let client = await transporter.sendMail({
      from: `'"Doorest",${process.env.MAIL_SENDER}'`, // sender address
      to: email, // list of receivers
      subject: "Welcome to Doorest family", // Subject line
      text: "Thankyou for choosing Digaut",
      html: welcome, // the tick should come here
    });
  } catch (error) {
    console.log(error);
  }
};

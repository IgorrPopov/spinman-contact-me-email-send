const createHtmlEmail = ({ name, email, message }) => `  
  <!DOCTYPE HTML>
  <head>
    <style type="text/css">
        .body {
            margin: 10px;
            font-size: 1.50em;
        }
        .return-address {
            text-align: left;
            float: right;
        }
        .subject {
            clear: both;
            font-weight: bold;
            padding-top: 80px;
        }
    </style>
  </head>
  <body class="body">
    <div class="return-address">
        From ${name}<br/>
        Emai: ${email}<br/>
        <br/>
      
    </div>

    <div class="subject">
        Contact from requst from ${name}!
    </div>

    <div>
        <p>
          ${message}
        </p>
    </div>
  </body>`;

module.exports = { createHtmlEmail };
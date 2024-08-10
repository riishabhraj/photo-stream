export default function emailVerification(email, otp) {
  return `<div style="text-align:center;">
  
    <div style="background:#0a66c2;padding:20px;color:white">
      <h3>Thankyou for choosing Us</h3>
      <p>Verify Your E-mail Address</p>
    </div>
   
    <div style="padding:20px;">
      <p>You're almost ready to start enjoying DALL.E.</p>
      <p>
        Simply confirm that ${email} is your e-mail address by
        using this code:
      </p>
      <h1>${otp}</h1>
      <p>This code will expire in 1 hour</p>
      <p>Thanks</p>
    </div>

    <div style="background:gray;padding:20px;">
      <h4 style="color:white;">Get in touch</h4>
      <p>
        <a style="color:white;" href="tel:+91-972-442-7873">+91-972-442-7873</a>
      </p>
      <p>
        <a style="color:white;" href="mailto:amit.edu@outlook.com">amit.edu@outlook.com</a>
      </p>
    </div>

  </div>
    `;
}

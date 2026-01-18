import nodemailer from "nodemailer";

const sendContact = async(req, res)=>{
  try {
    const {name, email, message} = req.body;

    if(!name || !email || !message){
      res.status(400).send({error: "All the fields are required!!"})
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.USER_EMAIL, // your email
      subject: `New Contact Message from ${name}`,
      html: `
        <h1>RecipeHub<h1>
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({message: "You message has been sent successfully!!"})
  } catch (error) {
    res.status(500).send({error: error.message});
  }
}
export default sendContact;
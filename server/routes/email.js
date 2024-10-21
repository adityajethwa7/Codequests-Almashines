import express from 'express';
import emailjs from 'emailjs-com';

const router = express.Router();

// POST /api/email
router.post('/', async (req, res) => {
  const { email, results } = req.body;

  const templateParams = {
    to_email: "kavan2269@gmail.com", // Your email where form submissions will be sent
    from_email: email,
    message: results.map(result => `Title: ${result.title}\nSummary: ${result.summary}\nLink: ${result.link}\nUpvotes: ${result.upvotes}\nSource: ${result.source}`).join('\n\n'),
  };

  emailjs.send(
    "service_ye8dcwn",  // Replace with your EmailJS service ID
    "template_pugw7xi",  // Replace with your EmailJS template ID
    templateParams,
    "ajo1ulgU4OAxWjb2_"  // Replace with your EmailJS user ID
  )
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      res.status(200).send('Email sent successfully!');
    }, (err) => {
      console.log("FAILED...", err);
      res.status(500).json({ error: 'Failed to send email', details: err.text });
    });
});

export default router;
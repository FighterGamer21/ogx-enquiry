document.getElementById('enquiryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      message: form.message.value,
    };
  
    try {
      const response = await fetch('/.netlify/functions/sendEnquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (result.success) {
        document.getElementById('responseMsg').textContent = '✅ Enquiry sent successfully!';
        form.reset();
      } else {
        document.getElementById('responseMsg').textContent = '❌ Failed to send email.';
      }
    } catch (err) {
      document.getElementById('responseMsg').textContent = '⚠️ Error submitting form.';
      console.error(err);
    }
  });
  
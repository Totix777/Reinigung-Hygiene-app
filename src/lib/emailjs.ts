import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("-vX-Xu0v-kys4kH1Z");

// Function to compress image and convert to base64
async function compressImage(base64String: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      // Calculate new dimensions (max 800px width/height)
      let width = img.width;
      let height = img.height;
      const maxSize = 800;
      
      if (width > height && width > maxSize) {
        height = (height * maxSize) / width;
        width = maxSize;
      } else if (height > maxSize) {
        width = (width * maxSize) / height;
        height = maxSize;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.6)); // Compress with 60% quality
    };
    img.src = base64String;
  });
}

export async function sendNotificationEmail(params: {
  room_number: string;
  notes: string;
  images: string[];
  cleaning_types: string[];
  staff_name: string;
}) {
  try {
    // Compress images and limit to 3 images maximum
    const compressedImages = await Promise.all(
      params.images.slice(0, 3).map(compressImage)
    );

    // Create HTML for images
    const imagesHtml = compressedImages.map((img, index) => 
      `<div style="margin-bottom: 10px;">
        <p style="margin: 5px 0;">Foto ${index + 1}:</p>
        <img src="${img}" style="max-width: 100%; height: auto; border-radius: 4px;" alt="Foto ${index + 1}" />
      </div>`
    ).join('');

    // Format the email content
    const templateParams = {
      to_name: "Benito Marconi",
      to_email: "b.marconi@kv-vorderpfalz.drk.de",
      from_name: params.staff_name,
      room_number: params.room_number,
      cleaning_types: params.cleaning_types.join(', '),
      notes: params.notes || 'Keine Notizen',
      images_html: imagesHtml || 'Keine Bilder',
      date_time: `${new Date().toLocaleDateString('de-DE')} ${new Date().toLocaleTimeString('de-DE', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`
    };

    const response = await emailjs.send(
      'service_2aqxvxr',
      'template_drk_hw',
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

import React, { useState, useEffect } from "react";
function Help() {
  const [activeIndex, setActiveIndex] = useState(null);

const toggleFAQ = (index) => {
  setActiveIndex(activeIndex === index ? null : index);
};
  const faqs = [

  { 
    q: "How do I report an issue?", 
    a: "Click the 'Create' button in the sidebar. You'll need to provide a clear description (at least 5 characters), specify the location, and you must upload a photo to provide more context." 
  },
  { 
    q: "What kind of issues can I report?", 
    a: "You can report any civic concerns like broken streetlights, potholes, illegal dumping, or public safety hazards that need community or authority attention." 
  },
  { 
    q: "Can I edit an issue after posting?", 
    a: "Yes. If you are the creator, navigate to the issue details page and click the 'Edit' button to update the description or photo." 
  },
  { 
    q: "What does 'Resolving' an issue mean?", 
    a: "If you reported an issue and it has been fixed, you can mark it as 'Resolved'. This moves it to the resolved category and lets the community know the problem is gone." 
  },

 
  { 
    q: "What happens when I upvote?", 
    a: "Upvoting increases the visibility of an issue. Higher upvote counts move issues to the 'Trending' section, signaling to others and authorities that it is a high-priority concern." 
  },
  { 
    q: "How do comments work?", 
    a: "Users can comment on issues to provide updates, offer help, or discuss solutions. You can also delete your own comments if needed." 
  },

  { 
    q: "Can I delete my reports?", 
    a: "Yes. As the creator of an issue, you have full control. You can find the delete option on the specific issue's details page." 
  },
  { 
    q: "Is my data safe?", 
    a: "Absolutely. We only use your data to facilitate civic reporting. Your email is kept private, and only your username and profile picture (if provided) are visible to the community." 
  },
  { 
    q: "How do I change my profile picture?", 
    a: "Go to your 'Profile' page and click on your current display picture or the edit icon to upload a new image via Cloudinary." 
  }
];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>How can we help?</h1>
      <p style={styles.subtitle}>Find answers to the most common questions below.</p>

      <div style={styles.faqList}>
        {faqs.map((faq, i) => (
          <div key={i} style={styles.faqItem}>
            <h4 style={styles.question}>Q: {faq.q}</h4>
            <p style={styles.answer}>{faq.a}</p>
          </div>
        ))}
      </div>
      {faqs.map((faq, index) => (
  <div key={index} style={styles.faqItem} onClick={() => toggleFAQ(index)}>
    <div style={styles.question}>
      {faq.q}
      <span>{activeIndex === index ? '−' : '+'}</span>
    </div>
    {activeIndex === index && <div style={styles.answer}>{faq.a}</div>}
  </div>
))}

      <div style={styles.contactCard}>
        <h3>Still have questions?</h3>
        <p>Email us at: karthikithikash12@gmail.com</p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px 20px", maxWidth: "700px", margin: "0 auto", fontFamily: "'Inter', sans-serif" },
  title: { fontSize: "32px", fontWeight: "800", color: "#0f172a", marginBottom: "10px" },
  subtitle: { fontSize: "16px", color: "#64748b", marginBottom: "40px" },
  faqList: { display: "flex", flexDirection: "column", gap: "20px" },
  faqItem: { background: "#fff", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" },
  question: { margin: "0 0 10px 0", color: "#1e293b", fontSize: "17px" },
  answer: { margin: 0, color: "#475569", lineHeight: "1.6" },
  contactCard: { marginTop: "40px", padding: "25px", background: "#6366f1", borderRadius: "20px", color: "#fff", textAlign: "center" }
};

export default Help;
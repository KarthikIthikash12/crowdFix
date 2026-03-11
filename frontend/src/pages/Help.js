import React, { useState } from "react";

function Help() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    { q: "How do I report an issue?", a: "Click the 'Create' button in the sidebar. You'll need to provide a clear description (at least 5 characters), specify the location, and upload a mandatory photo for context." },
    { q: "What kind of issues can I report?", a: "You can report any civic concerns like broken streetlights, potholes, illegal dumping, or public safety hazards that need community attention." },
    { q: "Can I edit an issue after posting?", a: "Yes. If you are the creator, navigate to the issue details page and click the 'Edit' button to update the description or photo." },
    { q: "What does 'Resolving' an issue mean?", a: "If an issue has been fixed, you can mark it as 'Resolved'. This moves it to the resolved category and lets the community know the problem is gone." },
    { q: "What happens when I upvote?", a: "Upvoting increases visibility. Higher upvote counts move issues to the 'Trending' section, signaling that it is a high-priority concern." },
    { q: "How do comments work?", a: "Users can comment on issues to provide updates or discuss solutions. You can also delete your own comments if needed." },
    { q: "Can I delete my reports?", a: "Yes. As the creator of an issue, you have full control. You can find the delete option on the specific issue's details page." },
    { q: "Is my data safe?", a: "Absolutely. We only use your data to facilitate civic reporting. Your email is kept private; only your username is visible." },
    { q: "Who can see my reports?", a: "All reports are public to the CrowdFix community to ensure transparency and collective action for community improvements." }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>How can we help?</h1>
      <p style={styles.subtitle}>Find answers to the 10 most common questions below.</p>

      <div style={styles.faqList}>
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            style={styles.faqItem} 
            onClick={() => toggleFAQ(index)}
          >
            <div style={styles.question}>
              <span style={{ fontWeight: "700" }}>{faq.q}</span>
              <span style={styles.toggleIcon}>{activeIndex === index ? '−' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div style={styles.answer}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.contactCard}>
        <h3 style={{ margin: "0 0 10px 0" }}>Still have questions?</h3>
        <p style={{ margin: 0 }}>Email us at: karthikithikash12@gmail.com</p>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    padding: "60px 20px", 
    maxWidth: "800px", 
    margin: "0 auto", 
    fontFamily: "'Inter', sans-serif" 
  },
  title: { 
    fontSize: "36px", 
    fontWeight: "800", 
    color: "#0f172a", 
    marginBottom: "12px",
    textAlign: "center" 
  },
  subtitle: { 
    fontSize: "18px", 
    color: "#64748b", 
    marginBottom: "50px", 
    textAlign: "center" 
  },
  faqList: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "14px" 
  },
  faqItem: { 
    background: "#fff", 
    padding: "20px 28px", 
    borderRadius: "16px", 
    border: "1px solid #e2e8f0", 
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
  },
  question: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    color: "#1e293b", 
    fontSize: "17px" 
  },
  toggleIcon: { 
    fontSize: "22px", 
    color: "#6366f1",
    fontWeight: "300"
  },
  answer: { 
    marginTop: "15px", 
    color: "#475569", 
    lineHeight: "1.7", 
    fontSize: "15px",
    borderTop: "1px solid #f1f5f9",
    paddingTop: "15px"
  },
  contactCard: { 
    marginTop: "60px", 
    padding: "35px", 
    background: "#6366f1", 
    borderRadius: "24px", 
    color: "#fff", 
    textAlign: "center",
    boxShadow: "0 15px 30px -5px rgba(99, 102, 241, 0.4)"
  }
};

export default Help;
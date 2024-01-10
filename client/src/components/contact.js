import Card from "./card/Card"
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import styles from "./Contact.module.css";;

const Contact = () => {

  const sendEmail = (e) => {
    e.preventDefault();

    
      e.target.reset();
  };

  return (
    <section>
        <div className="maindiv">
      <div className={styles.contact}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Your Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Infromation</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+91-8899850117</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>aashishg863@gmail.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Roorkee,Uttarakhand</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@Aashish2109</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
export default Contact;
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import FarmerLayout from "../layouts/FarmerLayout";
import { motion } from "framer-motion";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
        import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("✅ Your message has been sent successfully!");
          form.current?.reset();
          setLoading(false);
        },
        (error) => {
          console.error(error.text);
          alert("❌ Something went wrong. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <FarmerLayout title="Contact Us" subtitle="We’re here to assist you anytime">
      <motion.form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col gap-5 max-w-lg mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Full Name</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="from_name"
            placeholder="John Doe"
            required
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Email Address</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            name="from_email"
            placeholder="you@example.com"
            required
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Your Message</label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            name="message"
            placeholder="Write your message here..."
            rows={5}
            required
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`${
            loading ? "bg-gray-400" : "bg-naturopura-gradient"
          } text-white py-3 rounded-lg font-medium shadow-md transition`}
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </FarmerLayout>
  );
};

export default ContactForm;

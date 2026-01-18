import { useState } from "react";
import { useSendContactMutation } from "../slices/contactApiSlice";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendContact, { isLoading }] = useSendContactMutation();

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await sendContact({ name, email, message }).unwrap();
      toast.success(res.message);
      setName("");
      setEmail("");
      setMessage("");

    } catch (error) {
      toast.error(error?.data?.error || "Error sending message!!")
    }
  }

  return (
    <div className="min-h-screen from-neutral-50 to-stone-100">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-stone-900 mb-6">
            Contact Us
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-green-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Have questions or suggestions? We'd love to hear from you! Fill out the
            form below or reach out to us directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-stone-200 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-stone-900 mb-2">Get in Touch</h2>
              <p className="text-stone-500">We're here to help and answer any question you might have</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <p className="text-sm text-stone-500 mb-1">Email</p>
                  <p className="text-lg font-semibold text-emerald-600">support@recipehub.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <p className="text-sm text-stone-500 mb-1">Phone</p>
                  <p className="text-lg font-semibold text-stone-800">01 4446667</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <p className="text-sm text-stone-500 mb-1">Address</p>
                  <p className="text-lg font-semibold text-stone-800">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white rounded-3xl p-10 shadow-lg border border-stone-200"
            onSubmit={sendMessageHandler}>
            <h3 className="text-2xl font-bold text-stone-900 mb-6">Send us a Message</h3>

            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-stone-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all text-stone-700 placeholder:text-stone-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Your Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-stone-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all text-stone-700 placeholder:text-stone-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Your Message</label>
                <textarea
                  placeholder="Tell us what's on your mind..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-2 border-stone-200 rounded-2xl px-5 py-3 h-36 resize-none focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all text-stone-700 placeholder:text-stone-400"
                ></textarea>
              </div>

              <button
                disabled={isLoading}
               className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 mt-2">
              {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Contact;
import { useState } from "react";

const Contact = () => {
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  return (
    <main id="contact" className="flex-1 m-auto rounded-xl bg-coffee-dark py-10 max-w-[800px] font-poppins">
      <div className="max-w-[600px] mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl text-white mb-6">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-white mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-lg bg-white/90 text-black"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-white/90 text-black"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-white mb-2">Message</label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-white/90 text-black"
            ></textarea>
          </div>
          <button
            type="submit"
            className={`order-btn bg-coffee-latte text-coffee-cho rounded-2xl px-8 py-2 ${isClicked ? 'scale-95' : ''}`}
            onClick={handleClick}
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  )
}

export default Contact
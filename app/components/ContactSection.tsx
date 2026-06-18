'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader2 } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CONTACT_INFO = {
  email: 'mahmoudsaeed0112074@gmail.com',
  address: 'Cairo, Egypt',
  phone: '01120847850',
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGPathElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  useGSAP(
    () => {
      if (!sectionRef.current || !ringRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      if (infoRef.current) {
        tl.from(infoRef.current, {
          autoAlpha: 0,
          y: 28,
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      tl.fromTo(
        ringRef.current,
        { strokeDashoffset: 3000 },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power2.inOut',
        },
        0.15
      );

      if (formRef.current) {
        gsap.set(formRef.current, { autoAlpha: 0, y: 24 });
        tl.to(
          formRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '+=0.15'
        );
      }
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send');
      }

      setStatus('success');
      setFeedback('Message sent! I will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setFeedback(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 border-t border-white/10 bg-gradient-to-b from-[#0f172a] to-black py-20 md:py-28"
    >
      <div className="page-container">
        <div className="flex w-full flex-col gap-14 lg:flex-row lg:items-start lg:gap-20">
          {/* Info */}
          <div
            ref={infoRef}
            className="flex w-full shrink-0 flex-col gap-4 capitalize text-gray-200 lg:w-[38%]"
          >
            <h2 className="mb-5 text-3xl font-semibold text-indigo-500 lg:text-4xl xl:text-5xl">
              Call Me Now!
            </h2>

            <div>
              <h3 className="mb-1 text-lg font-semibold capitalize lg:text-3xl">mail</h3>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="break-all text-lg hover:text-indigo-400 lg:text-xl"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

            <div>
              <h3 className="mb-1 text-lg font-semibold capitalize lg:text-3xl">location</h3>
              <span className="text-lg lg:text-xl">{CONTACT_INFO.address}</span>
            </div>

            <div>
              <h3 className="mb-1 text-lg font-semibold capitalize lg:text-3xl">phone</h3>
              <a
                href={`tel:+20${CONTACT_INFO.phone.replace(/^0/, '')}`}
                className="text-lg hover:text-indigo-400 lg:text-xl"
              >
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>

          {/* Form + ring */}
          <div className="relative w-full min-w-0 flex-1">
            {/* Ring — own row on mobile so it never covers the form */}
            <div className="mb-8 flex h-[220px] w-full items-center justify-center sm:mb-10 sm:h-[260px] lg:pointer-events-none lg:absolute lg:inset-0 lg:mb-0 lg:h-auto">
              <svg
                className="h-full max-h-[260px] w-full max-w-[260px] stroke-indigo-600 sm:max-h-[300px] sm:max-w-[300px] lg:absolute lg:max-h-[420px] lg:max-w-[420px] lg:opacity-40"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-hidden
              >
                <path
                  ref={ringRef}
                  strokeDasharray="3000"
                  strokeWidth="3"
                  fill="none"
                  d="M255.998,0.002C114.606,0.012,0.01,114.604,0,256c0.01,141.406,114.65,255.328,255.926,255.998h0.334 l0.297-0.009c27.124,0.038,49.507-8.527,64.961-22.594c15.468-14.01,23.727-33.254,23.708-52.736 c0.02-9.148-1.914-18.306-5.521-27.024c6.086-3.464,10.143-6.612,11.301-7.444c4.152-2.957,16-18.766,7.693-31.79 c-8.344-13.014-38.042-42.678-46.152-47.702c-8.086-5.015-21.598-0.124-28.105,9.426c-6.526,9.55-11.674,6.689-11.674,6.689 s-18.516-14.957-44.124-66.621c-25.607-51.694-26.263-75.454-26.263-75.454s0.833-5.847,12.388-5.263 c11.53,0.621,23.598-7.168,24.516-16.66c0.928-9.464-4.698-51.091-10-65.598c-5.316-14.516-25.062-14.65-29.928-13.138 c-4.89,1.502-55.033,13.712-59.014,66.21c-3.966,52.506,9.565,100.18,28.943,139.309c19.387,39.119,49.128,78.765,93.3,107.406 c17.89,11.598,35.058,13.1,49.493,10.67c2.483,5.54,3.718,11.291,3.746,16.985c-0.028,11.292-4.621,22.354-14.066,30.966 c-9.469,8.564-24.071,14.928-45.2,14.967l-0.516,0.009C130.797,481.96,29.387,381.09,29.397,256 c0.01-62.621,25.339-119.186,66.367-160.237c41.053-41.023,97.612-66.354,160.234-66.364c62.621,0.01,119.181,25.34,160.232,66.364 c41.033,41.052,66.354,97.606,66.373,160.237c-0.01,38.67-9.666,74.966-26.698,106.784c-9.531,17.837-21.397,34.23-35.177,48.812 c-5.569,5.905-5.301,15.206,0.594,20.776c5.894,5.578,15.205,5.32,20.784-0.584c15.54-16.46,28.937-34.976,39.712-55.139 C501.071,340.717,512,299.589,512,256C511.98,114.604,397.389,0.012,255.998,0.002z"
                />
              </svg>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative z-10 flex w-full flex-col gap-5 opacity-0 lg:min-h-[480px] lg:justify-center"
            >
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 px-6 text-base text-gray-100 caret-indigo-500 outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-gray-500 focus:border-indigo-500 focus:bg-white/10"
              />
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 px-6 text-base text-gray-100 caret-indigo-500 outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-gray-500 focus:border-indigo-500 focus:bg-white/10"
              />
              <textarea
                name="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 px-6 text-base text-gray-100 caret-indigo-500 outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-gray-500 focus:border-indigo-500 focus:bg-white/10"
              />

              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/50 bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {feedback && (
                <p
                  className={`text-sm ${status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}
                >
                  {feedback}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

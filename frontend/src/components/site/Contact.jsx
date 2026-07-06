import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY } from "../../data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = { name: "", email: "", phone: "", company: "", project_type: "", message: "" };

export const Contact = () => {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Enquiry received. Our project team will be in touch shortly.");
      setForm(initial);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative px-6 lg:px-10 py-24 md:py-32 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5">
          <p className="overline mb-4">[ 08 · Start a project ]</p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter">
            Bid, build,<br /><span className="text-[#FF4500]">deliver.</span>
          </h2>
          <p className="mt-6 text-zinc-400 max-w-md leading-relaxed">
            For tenders, sub-contracting enquiries or new project consultations — reach the project head&apos;s office directly.
            Government departments welcome.
          </p>

          <div className="mt-10 space-y-6">
            <div className="border-t border-white/10 pt-4">
              <p className="overline mb-2">Head Office</p>
              <p className="text-zinc-200 text-sm leading-relaxed" data-testid="contact-address">{COMPANY.address}</p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="overline mb-2">Direct line</p>
              <a href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`} className="font-display text-2xl text-white hover:text-[#FF4500] transition-colors" data-testid="contact-phone">
                {COMPANY.phone}
              </a>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="overline mb-2">Email</p>
              <a href={`mailto:${COMPANY.email}`} className="font-display text-2xl text-white hover:text-[#FF4500] transition-colors break-all" data-testid="contact-email">
                {COMPANY.email}
              </a>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:pl-12 lg:border-l border-white/10">
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="contact-form">
            <Input label="Full name" name="name" value={form.name} onChange={onChange} required testid="contact-input-name" />
            <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} required testid="contact-input-email" />
            <Input label="Phone" name="phone" value={form.phone} onChange={onChange} testid="contact-input-phone" />
            <Input label="Organisation" name="company" value={form.company} onChange={onChange} testid="contact-input-company" />

            <div className="sm:col-span-2">
              <label className="overline block mb-2">Project type</label>
              <select
                name="project_type"
                value={form.project_type}
                onChange={onChange}
                data-testid="contact-input-project-type"
                className="w-full bg-[#141414] border border-white/15 focus:border-[#FF4500] outline-none px-4 py-3 text-sm text-white"
              >
                <option value="">Select a category</option>
                <option>National Highway</option>
                <option>State Highway</option>
                <option>Rural Road (PMGSY)</option>
                <option>Bridge / Approach Work</option>
                <option>Government Building</option>
                <option>Irrigation</option>
                <option>Other</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="overline block mb-2">Project brief</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={5}
                required
                data-testid="contact-input-message"
                className="w-full bg-[#141414] border border-white/15 focus:border-[#FF4500] outline-none px-4 py-3 text-sm text-white resize-none"
                placeholder="Scope, tentative timeline, estimated value..."
              />
            </div>

            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-2">
              <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-zinc-500">
                Response within 2 working days
              </p>
              <button
                type="submit"
                disabled={submitting}
                data-testid="contact-submit-button"
                className="inline-flex items-center gap-3 bg-[#FF4500] hover:bg-[#E03E00] disabled:opacity-60 text-white px-6 py-3.5 font-medium transition-colors"
              >
                {submitting ? "Sending..." : "Submit enquiry"}
                <span>→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Input = ({ label, name, value, onChange, type = "text", required, testid }) => (
  <div>
    <label className="overline block mb-2">{label}{required && " *"}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      data-testid={testid}
      className="w-full bg-[#141414] border border-white/15 focus:border-[#FF4500] outline-none px-4 py-3 text-sm text-white"
    />
  </div>
);

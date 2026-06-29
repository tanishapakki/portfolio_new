import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.current) return;

        emailjs
            .sendForm(
                "service_ezmskcc",
                "template_73ro3kp",
                form.current,
                "8RyfTnegdIQlZDLJi"
            )
            .then(() => {
                alert("Message sent!");
                form.current?.reset();
            })
            .catch((err: Error | unknown) => {
                console.error(err);
                alert("Failed to send message.");
            });
    };

    return (
        <>
        <form ref={form} onSubmit={sendEmail}>
    <input
        type="text"
    name="from_name"
    placeholder="Your Name"
    required
    />

    <input
        type="email"
    name="from_email"
    placeholder="Email"
    required
    />

    <textarea
        name="message"
    placeholder="Message"
    required
    />

    <button type="submit">
        Send Message
    </button>
    </form>
    </>
);
}
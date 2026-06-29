import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { CONTACT } from "@/data/contact";
import "../contact.css";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<Status>("idle");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current || status === "sending") return;

        setStatus("sending");

        emailjs
            .sendForm(
                "service_ezmskcc",
                "template_73ro3kp",
                form.current,
                "8RyfTnegdIQlZDLJi"
            )
            .then(() => {
                setStatus("success");
                form.current?.reset();
                setTimeout(() => setStatus("idle"), 5000);
            })
            .catch(() => {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 5000);
            });
    };

    const { form: f } = CONTACT;

    return (
        <div className="contact-form-wrapper">
            {status === "success" && (
                <div className="contact-toast contact-toast--success" role="status">
                    {f.successMessage}
                </div>
            )}
            {status === "error" && (
                <div className="contact-toast contact-toast--error" role="alert">
                    {f.errorMessage}
                </div>
            )}

            <form
                ref={form}
                onSubmit={sendEmail}
                className="contact-form"
                noValidate
            >
                <div className="contact-form__row">
                    <div className="contact-form__field">
                        <label htmlFor="cf-name" className="contact-form__label">
                            Name
                        </label>
                        <input
                            id="cf-name"
                            type="text"
                            name="from_name"
                            placeholder={f.namePlaceholder}
                            required
                            className="contact-form__input"
                            disabled={status === "sending"}
                        />
                    </div>

                    <div className="contact-form__field">
                        <label htmlFor="cf-email" className="contact-form__label">
                            Email
                        </label>
                        <input
                            id="cf-email"
                            type="email"
                            name="from_email"
                            placeholder={f.emailPlaceholder}
                            required
                            className="contact-form__input"
                            disabled={status === "sending"}
                        />
                    </div>
                </div>

                <div className="contact-form__field">
                    <label htmlFor="cf-message" className="contact-form__label">
                        Message
                    </label>
                    <textarea
                        id="cf-message"
                        name="message"
                        placeholder={f.messagePlaceholder}
                        required
                        rows={5}
                        className="contact-form__textarea"
                        disabled={status === "sending"}
                    />
                </div>

                <button
                    type="submit"
                    className="contact-form__submit"
                    disabled={status === "sending"}
                >
                    {status === "sending" ? "Sending…" : f.submitLabel}
                </button>
            </form>
        </div>
    );
}

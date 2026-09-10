import { nav, site } from "@/data/content";
import { Container } from "./ui";

const contacts = [
  { label: "Telegram", href: site.contacts.telegram },
  { label: "Instagram", href: site.contacts.instagram },
  { label: "Viber", href: site.contacts.viber },
  { label: site.contacts.email, href: `mailto:${site.contacts.email}` },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/12 bg-surface py-12">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-semibold">{site.brand}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {site.tagline}. Вчимо ремесла системно — з практикою, підтримкою і
              повагою до людей, які приходять по відповіді.
            </p>
          </div>

          <nav aria-label="Навігація в підвалі">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-faint">Розділи</p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-faint">Контакти</p>
            <ul className="space-y-2.5">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-ink/10 pt-6 text-xs text-faint">
          © {new Date().getFullYear()} {site.brand}. Усі права захищені.
        </p>
      </Container>
    </footer>
  );
}

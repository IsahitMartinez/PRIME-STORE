import { Link } from "react-router-dom";
import Icon from "./Icon";

// ✏️ PERSONALIZA TODO DESDE AQUÍ — no necesitas tocar el JSX de abajo.
const BRAND = {
  name: "PRIME",
  tagline: "Viste y entrena premium.",
};

// Grupos de enlaces. Si el href empieza con "/" se usa <Link> (navega sin recargar).
// Si empieza con "http" se abre en otra pestaña. Cualquier otro (como "#") es un <a> normal.
const LINK_GROUPS = [
  {
    title: "Tienda",
    links: [
      { label: "Ver productos", href: "/shop" },
      { label: "Cómo pedir", href: "#como-pedir" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Envíos", href: "#" },
      { label: "Tallas", href: "#" },
      { label: "Contacto", href: "#" },
    ],
  },
];

// Redes: "icon" es el nombre de un ícono de Icon.jsx
const SOCIALS = [
  { label: "Instagram", icon: "instagram", href: "#" },
  { label: "WhatsApp", icon: "chat", href: "#" },
];

const CONTACT = [
  { icon: "mail", text: "tucorreo@ejemplo.com" },
  { icon: "phone", text: "+00 000 000 0000" },
  { icon: "pin", text: "Tu ciudad, País" },
];

// Componente pequeño que decide qué etiqueta usar según el tipo de enlace
function FooterLink({ href, children }) {
  const className = "text-gray-400 transition hover:text-white";

  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="mt-8 overflow-hidden rounded-t-[2.5rem] bg-black text-white">
      <div className="px-6 pt-16 md:px-24">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Mensaje + redes */}
          <div>
            <p
              className="max-w-sm text-5xl leading-none"
              style={{ fontFamily: "Bebas Neue" }}
            >
              {BRAND.tagline}
            </p>

            <div className="mt-8 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon name={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Grupos de enlaces generados desde LINK_GROUPS */}
          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contacto + derechos */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-8 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-col gap-3 md:flex-row md:gap-8">
            {CONTACT.map((item) => (
              <li key={item.text} className="flex items-center gap-2">
                <Icon name={item.icon} className="h-4 w-4" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          {/* El año se calcula solo */}
          <p className="text-gray-500">
            © {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Wordmark gigante, tono sobre tono: decorativo, por eso aria-hidden */}
      <p
        aria-hidden="true"
        className="select-none pt-10 text-center text-[26vw] leading-[0.85] text-white/10 md:text-[18rem]"
        style={{ fontFamily: "Bebas Neue" }}
      >
        {BRAND.name}
      </p>
    </footer>
  );
}

export default Footer;
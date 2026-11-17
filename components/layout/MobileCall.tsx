import { business } from "@/lib/site";

/** Bouton d'appel fixe sur mobile (action principale d'un snack : appeler / commander). */
export function MobileCall() {
  return (
    <a className="mobile-call" href={business.phone.href}>
      <span aria-hidden="true">✆</span> Appeler CRAZY · {business.phone.display}
    </a>
  );
}

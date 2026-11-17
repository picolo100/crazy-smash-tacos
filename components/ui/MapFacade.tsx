"use client";

import { useState } from "react";
import { business } from "@/lib/site";

/**
 * Plan Google Maps chargé uniquement à la demande :
 * aucune requête ni cookie Google tant que le visiteur ne clique pas (performance + RGPD).
 */
export function MapFacade() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="map-facade">
      {loaded ? (
        <iframe
          src={business.links.mapEmbed}
          title="Plan d’accès à Crazy Smash & Tacos, 27 avenue de Mâcon à Bourg-en-Bresse"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map-pin">
          <span className="pin" aria-hidden="true" />
          <strong>27 av. de Mâcon</strong>
          <p>01000 Bourg-en-Bresse · près du campus</p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn btn-ink" onClick={() => setLoaded(true)}>
              Afficher le plan
            </button>
            <a className="btn" href={business.links.directions} target="_blank" rel="noopener noreferrer">
              Itinéraire ↗<span className="sr-only"> (Google Maps, nouvel onglet)</span>
            </a>
          </div>
          <p>Le plan est fourni par Google Maps, qui peut déposer des cookies.</p>
        </div>
      )}
    </div>
  );
}

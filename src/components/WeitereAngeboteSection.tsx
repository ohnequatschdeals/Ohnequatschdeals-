import * as React from "react";
import { Button } from "./Button";
import { Card, CardContent } from "./Card";

/**
 * Basit “Weitere Angebote” bölümü
 * - Props ile teklif dizisi geçebilirsin; boşsa örnek 3 teklif gösterir.
 * - Card ve Button senin mevcut componentlerini kullanır.
 */

type Offer = {
  id: string;
  title: string;
  desc?: string;
  badge?: string;
  ctaLabel?: string;
  href?: string;
};

interface WeitereAngeboteSectionProps {
  title?: string;
  subtitle?: string;
  offers?: Offer[];
  onOfferClick?: (offer: Offer) => void;
}

const defaultOffers: Offer[] = [
  {
    id: "o1",
    title: "Internet & TV",
    desc: "Schnelle Tarife mit Top-Preis",
    badge: "Beliebt",
    ctaLabel: "Angebot ansehen",
  },
  {
    id: "o2",
    title: "Mobilfunk",
    desc: "5G-Ready, starke Konditionen",
    badge: "Neu",
    ctaLabel: "Jetzt vergleichen",
  },
  {
    id: "o3",
    title: "Strom & Gas",
    desc: "Günstig wechseln & sparen",
    ctaLabel: "Zum Tarifrechner",
  },
];

export default function WeitereAngeboteSection({
  title = "Weitere Angebote",
  subtitle = "Wähle eine Kategorie und sichere dir den besten Deal.",
  offers = defaultOffers,
  onOfferClick,
}: WeitereAngeboteSectionProps) {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Başlık */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm sm:text-base text-white/70">
              {subtitle}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <Card
              key={offer.id}
              className="relative overflow-hidden border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                {/* Badge */}
                {offer.badge && (
                  <span className="inline-flex w-fit items-center rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/80">
                    {offer.badge}
                  </span>
                )}

                {/* Title + desc */}
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {offer.title}
                  </h3>
                  {offer.desc && (
                    <p className="mt-1 text-sm text-white/70">
                      {offer.desc}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Button
                    onClick={() => onOfferClick?.(offer)}
                    className="w-full"
                  >
                    {offer.ctaLabel ?? "Mehr"}
                  </Button>
                </div>
              </CardContent>

              {/* Soft gradient flare (çok hafif) */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#FF3F87]/25 to-[#00D0C0]/25 blur-2xl" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
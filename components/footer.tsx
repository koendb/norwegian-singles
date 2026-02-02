import Link from 'next/link';
import { Activity } from 'lucide-react';

const footerLinks = {
  methode: [
    { href: '/achtergrond', label: 'Achtergrond' },
    {
      href: 'https://www.amazon.nl/Norwegian-Singles-Method-Subthreshold-Running/dp/B0G4D8438Z/ref=asc_df_B0G4D8438Z?mcid=cb5b1bc6b70331edae4011b4821b43b4&tag=nlshogostdde-21&linkCode=df0&hvadid=710146015862&hvpos=&hvnetw=g&hvrand=8022875777135471680&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1010722&hvtargid=pla-2455151581631&psc=1&gad_source=1',
      label: 'Het boek',
      external: true,
    },
  ],
  hulpmiddelen: [
    { href: '/calculator', label: 'Pace Calculator' },
    {
      href: 'https://forms.gle/kKzoJDd7k4Focoj38',
      label: 'Neem contact op',
      external: true,
    },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Norwegian Singles
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Norwegian Singles is een effectieve trainingsmethode voor hardlopers 
              die hun uithoudingsvermogen willen verbeteren zonder overmatige belasting.
            </p>
          </div>

          {/* Methode Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Methode
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.methode.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hulpmiddelen Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Hulpmiddelen
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.hulpmiddelen.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> Deze website biedt algemene informatie over 
            de Norwegian Singles trainingsmethode. Raadpleeg altijd een gekwalificeerde 
            trainer of arts voordat je aan een nieuw trainingsprogramma begint. 
            De berekende tempo&apos;s zijn schattingen en kunnen per individu verschillen.
          </p>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} NorwegianSingles.nl
          </p>
        </div>
      </div>
    </footer>
  );
}

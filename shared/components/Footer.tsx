'use client';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FaTelegramPlane, FaGithub, FaFacebook, FaPhone } from 'react-icons/fa';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-border/60 bg-card/20 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand / Bio */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xl font-extrabold tracking-tight text-foreground">
              Ratana<span className="text-primary">.dev</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Full-Stack Web & Mobile Developer focused on high performance,
              clean UI, scalable code, and modern technologies.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a
                  href="#projects"
                  className="transition-colors hover:text-primary"
                >
                  Featured Projects
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="transition-colors hover:text-primary"
                >
                  Tech Stack
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="transition-colors hover:text-primary"
                >
                  Experience & Journey
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="transition-colors hover:text-primary"
                >
                  Contact Me
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Stack Highlights */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">
              Technologies
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>Next.js & React</li>
              <li>TypeScript & Tailwind CSS</li>
              <li>Node.js & Prisma ORM</li>
              <li>React Native & Expo</li>
            </ul>
          </div>

          {/* Column 4: Social & Connect */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">
              Connect
            </h4>
            <p className="text-xs text-muted-foreground">
              Feel free to reach out via Telegram or check out my repositories
              on GitHub.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://t.me/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="rounded-full border border-border/60 bg-background/50 p-2 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary hover:text-primary-foreground"
              >
                <FaTelegramPlane className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full border border-border/60 bg-background/50 p-2 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary hover:text-primary-foreground"
              >
                <FaGithub className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://facebook.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-border/60 bg-background/50 p-2 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary hover:text-primary-foreground"
              >
                <FaFacebook className="h-3.5 w-3.5" />
              </a>
              <a
                href="tel:+85512345678"
                aria-label="Phone"
                className="rounded-full border border-border/60 bg-background/50 p-2 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary hover:text-primary-foreground"
              >
                <FaPhone className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/60" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-foreground">@trna</span>. All
            rights reserved. Built with Next.js & Tailwind CSS.
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="h-8 w-8 rounded-full border-border/80 bg-background/50 backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Github, Linkedin, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Made with ❣️ by{" "}
          <span className="font-medium">Shivam</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://yourportfolio.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
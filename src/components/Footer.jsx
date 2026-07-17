const aboutLinks = [
  "About DeoVR",
  "Contact us",
  "Hiring now",
  "DeoVR Blog",
  "Creator Handbook",
  "Developer Documentation",
  "Brand Assets",
  "Run Speed Test",
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Acceptable Use Policy", "Contest Terms"];

const socialLinks = [
  { label: "X.com", icon: "/uploads/x-twitter.svg" },
  { label: "Discord", icon: "/uploads/discord.svg" },
  { label: "Reddit", icon: "/uploads/reddit.svg" },
  { label: "DEO Forum", icon: "/uploads/announcement.svg" },
  { label: "Facebook", icon: "/uploads/facebook.svg" },
  { label: "Instagram", icon: "/uploads/instagram.svg" },
  { label: "LinkedIn", icon: "/uploads/linkedin.svg" },
];

export default function Footer() {
  return (
    <div className="mx-[185px] mt-[160px] mb-16 box-border flex gap-8 rounded-lg bg-white p-8">
      <div className="flex flex-1 flex-col gap-6">
        <img src="/assets/logo-wordmark.png" alt="DeoVR" className="h-[34px] w-[100px] object-contain" />
        <span className="text-xs leading-[1.5] font-normal text-[rgb(29,36,46)]">
          © 2026 DeoVR. This website is protected by reCAPTCHA, and the Google Privacy Policy and Terms of Service apply.
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <span className="text-base leading-[1.5] font-semibold text-[rgb(29,36,46)]">About us</span>
        <div className="flex flex-col gap-2">
          {aboutLinks.map((label) => (
            <a key={label} href="#" className="text-sm text-[rgb(125,146,175)]">
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <span className="text-base leading-[1.5] font-semibold text-[rgb(29,36,46)]">Legal</span>
        <div className="flex flex-col gap-2">
          {legalLinks.map((label) => (
            <a key={label} href="#" className="text-sm text-[rgb(125,146,175)]">
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <span className="text-base leading-[1.5] font-semibold text-[rgb(29,36,46)]">Social Media</span>
        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((s) => (
            <a key={s.label} href="#" className="flex items-center gap-2 text-sm text-[rgb(125,146,175)]">
              <img src={s.icon} alt="" className="h-5 w-5" />
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

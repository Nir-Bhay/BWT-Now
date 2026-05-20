import fs from 'fs';

const path = 'privacy-policy.html';
let html = fs.readFileSync(path, 'utf8');

const faqBlockRe = /            <section id="section-faq" class="privacy-section">[\s\S]*?            <\/section>\n\n/;
const faqMatch = html.match(faqBlockRe);
if (!faqMatch) throw new Error('FAQ block not found in privacy');
const faqContent = faqMatch[0]
  .replace('            <section id="section-faq" class="privacy-section">\n              <p class="bento-card__tag">F.A.Q.</p>\n              <h2>Frequently Asked Questions</h2>\n              ', '          ')
  .replace('\n            </section>\n\n', '\n');

html = html.replace(faqBlockRe, '');

const faqCard = `
        <article class="bento-card bento-faq bento-span-12">
          <div style="padding:18px 20px 8px;">
            <p class="bento-card__tag">FAQ</p>
            <h2>Frequently asked questions</h2>
          </div>
${faqContent}        </article>
`;

html = html.replace(
  '        </article>\n      </div>\n    </div>\n\n    <section class="landing-cta-band">',
  `        </article>\n${faqCard}      </div>\n    </div>\n\n    <section class="landing-cta-band">`
);

html = html.replace(
  /\n    \/\* FAQ Accordion Styling inside Reader Card \*\/[\s\S]*?    \/\* Conclusion Summary Card inside Reader \*\//,
  '\n    /* Conclusion Summary Card inside Reader */'
);

fs.writeFileSync(path, html);
console.log('Updated privacy-policy.html');

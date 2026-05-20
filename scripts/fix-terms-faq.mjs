import fs from 'fs';

const termsPath = 'terms-and-conditions.html';
let html = fs.readFileSync(termsPath, 'utf8');

const sections = [
  ['Section 1', '1. About These Terms', 'Legal Framework', 'About These Terms'],
  ['Section 2', '2. Eligibility and Age Restrictions', 'Eligibility', 'Eligibility and Age Restrictions'],
  ['Section 3', '3. Account Registration and Cricket ID Access', 'Registration', 'Account Registration and Cricket ID Access'],
  ['Section 4', '4. Login Details and Account Security', 'Account Security', 'Login Details and Account Security'],
  ['Section 5', '5. Use of the Website', 'Website Use', 'Use of the Website'],
  ['Section 6', '6. Sports, Casino, and Gaming Features', 'Gaming Features', 'Sports, Casino, and Gaming Features'],
  ['Section 7', '7. Deposits and Payments', 'Deposits', 'Deposits and Payments'],
  ['Section 8', '8. Withdrawals', 'Withdrawals', 'Withdrawals'],
  ['Section 9', '9. Verification and KYC Checks', 'Verification', 'Verification and KYC Checks'],
  ['Section 10', '10. Bonuses, Promotions, and Offers', 'Promotions', 'Bonuses, Promotions, and Offers'],
  ['Section 11', '11. Mobile Access and APK Use', 'Mobile Access', 'Mobile Access and APK Use'],
  ['Section 12', '12. Responsible Gaming', 'Responsible Gaming', 'Responsible Gaming'],
  ['Section 13', '13. Prohibited Conduct', 'Prohibited Conduct', 'Prohibited Conduct'],
  ['Section 14', '14. Account Suspension or Closure', 'Account Status', 'Account Suspension or Closure'],
  ['Section 15', '15. Website Availability and Technical Issues', 'Availability', 'Website Availability and Technical Issues'],
  ['Section 16', '16. Information Accuracy', 'Information', 'Information Accuracy'],
  ['Section 17', '17. Third-Party Links and Similar Names', 'Third-Party Links', 'Third-Party Links and Similar Names'],
  ['Section 18', '18. Intellectual Property', 'Intellectual Property', 'Intellectual Property'],
  ['Section 19', '19. Privacy and Data Use', 'Privacy', 'Privacy and Data Use'],
  ['Section 20', '20. Limitation of Responsibility', 'Liability', 'Limitation of Responsibility'],
  ['Section 21', '21. Changes to These Terms', 'Policy Updates', 'Changes to These Terms'],
  ['Section 22', '22. Governing Rules and Legal Compliance', 'Legal Compliance', 'Governing Rules and Legal Compliance'],
  ['Section 23', '23. Customer Care and Support', 'Support', 'Customer Care and Support'],
];

for (const [oldTag, oldH2, newTag, newH2] of sections) {
  html = html.replace(
    `<p class="bento-card__tag">${oldTag}</p>\n              <h2>${oldH2}</h2>`,
    `<p class="bento-card__tag">${newTag}</p>\n              <h2>${newH2}</h2>`
  );
}

const faqBlockRe = /            <section id="section-faq" class="privacy-section">[\s\S]*?            <\/section>\n\n/;
const faqMatch = html.match(faqBlockRe);
if (!faqMatch) throw new Error('FAQ block not found in terms');
const faqContent = faqMatch[0]
  .replace('            <section id="section-faq" class="privacy-section">\n              <p class="bento-card__tag">F.A.Q.</p>\n              <h2>FAQ</h2>\n              ', '          ')
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

// terms uses slightly different comment
html = html.replace(
  /\n    \.privacy-section \.landing-faq[\s\S]*?    \.privacy-section \.landing-faq \.faq-body p \{[\s\S]*?\}\n/,
  '\n'
);

fs.writeFileSync(termsPath, html);
console.log('Updated terms-and-conditions.html');

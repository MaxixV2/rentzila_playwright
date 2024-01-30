import Page from '../page';

const footer: string = '[class*="Footer_footer__"]';
const logo: string = '[class*="Footer_footer__"] div[data-testid="logo"]';
const aboutUsLbl: string = '[class*="RentzilaAbout_title__"]';
const privacyPolicyLink: string = '[data-testid="politika-konfidenciinosti"] a';
const cookiePolicyLink: string = '[data-testid="pravila-vikoristannya-failiv-cookie"] a';
const termsConditionsLink: string = '[data-testid="umovi-dostupu-ta-koristuvannya"] a';
const forBuyersLbl: string = '[class*="RentzilaForBuyers_title__"]';
const advertismentsLink: string = '[data-testid="ogoloshennya"]';
const tendersLink: string = '[data-testid="tenderi"] a';
const jobRequestsLink: string = '[data-testid="zapiti-na-robotu"]';
const contactsLbl: string = '[class*="RentzilaContacts_title__"]';
const email: string = '[class*="RentzilaContacts_email__"]';
const copyrightLbl: string = '[data-testid="copyright"]';
const privacyTitle: string = 'h1[class*="PrivacyPolicy_title"]';
const cookiesTitle: string = 'h1[class*="Cookies_title"]';
const termsOfUseTitle: string = 'h1[class*="TermsConditions_title"]';

export class Footer extends Page {
    constructor(page: Page['page']) {
        super(page);
    }

    async getFooter() {
        return await super.getElement(footer);
    }

    async getLogo() {
        return await super.getElement(logo);
    }

    async getAboutUsLbl() {
        return await super.getElement(aboutUsLbl);
    }

    async getPrivacyPolicyLink() {
        return await super.getElement(privacyPolicyLink);
    }

    async getTermsConditionsLink() {
        return await super.getElement(termsConditionsLink);
    }

    async getForBuyersLbl() {
        return await super.getElement(forBuyersLbl);
    }

    async getAdvertismentsLink() {
        return await super.getElement(advertismentsLink);
    }

    async getTendersLink() {
        return await super.getElement(tendersLink);
    }

    async getJobRequestsLink() {
        return await super.getElement(jobRequestsLink);
    }

    async getContactsLbl() {
        return await super.getElement(contactsLbl);
    }

    async getEmail() {
        return await super.getElement(email);
    }

    async getCopyrightLbl() {
        return await super.getElement(copyrightLbl);
    }

    async getPrivacyTitle() {
        return await super.getElement(privacyTitle);
    }

    async getCookiesTitle() {
        return await super.getElement(cookiesTitle);
    }

    async getTermsOfUseTitle() {
        return await super.getElement(termsOfUseTitle);
    }

    async clickPrivacyPolicyLink() {
        await super.clickElement(privacyPolicyLink);
    }

    async clickCookiePolicyLink() {
        await super.clickElement(cookiePolicyLink);
    }

    async clickTermsConditionsLink() {
        await super.clickElement(termsConditionsLink);
    }

    async clickAdvertismentsLink() {
        await super.clickElement(advertismentsLink);
    }

    async clickTendersLink() {
        await super.clickElement(tendersLink);
    }

    async clickJobRequestsLink() {
        await super.clickElement(jobRequestsLink);
    }

    async scrollToFooter() {
        await super.scrollToElement(footer);
    }
}
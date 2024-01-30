import { test, expect } from '@playwright/test';
import { Footer } from '../pages/components/footer';
import { NavBar } from '../pages/components/navbar';
import { MainPage } from '../pages/mainPage.page';

let footer: Footer;
let navBar: NavBar;
let mainPage: MainPage;

test.describe('Footer check', () => {
    test.beforeEach(async ({ page }) => {
        footer = new Footer(page);
        mainPage = new MainPage(page);
        navBar = new NavBar(page);

        await mainPage.openUrl();
    });

    test("Verify footer elements", async () => {
        await footer.scrollToFooter();
        await expect(await footer.getFooter()).toBeVisible();

        await expect(await footer.getAboutUsLbl()).toBeVisible();
        await expect(await footer.getPrivacyPolicyLink()).toBeVisible();
        await expect(await footer.getTermsConditionsLink()).toBeVisible();
        await expect(await footer.getForBuyersLbl()).toBeVisible();
        await expect(await footer.getAdvertismentsLink()).toBeVisible();
        await expect(await footer.getTendersLink()).toBeVisible();
        await expect(await footer.getJobRequestsLink()).toBeVisible();
        await expect(await footer.getContactsLbl()).toBeVisible();
        await expect(await footer.getEmail()).toBeVisible();
        await expect(await footer.getLogo()).toBeVisible();
        await expect(await footer.getCopyrightLbl()).toBeVisible();

        await footer.clickPrivacyPolicyLink();
        await expect(footer.page).toHaveURL(/privacy-policy/);
        await expect(await footer.getPrivacyTitle()).toBeVisible();
        await expect(await footer.getPrivacyTitle()).toHaveText('Політика конфіденційності');
        await footer.scrollToFooter();

        await footer.clickCookiePolicyLink();
        await expect(footer.page).toHaveURL(/cookie-policy/);
        await expect(await footer.getCookiesTitle()).toBeVisible();
        await expect(await footer.getCookiesTitle()).toHaveText('Політика використання файлів cookie');
        await footer.scrollToFooter();

        await footer.clickTermsConditionsLink();
        await expect(footer.page).toHaveURL(/terms-conditions/);
        await expect(await footer.getTermsOfUseTitle()).toBeVisible();
        await expect(await footer.getTermsOfUseTitle()).toHaveText('Угода користувача');


        await footer.scrollToFooter();
        await footer.clickAdvertismentsLink();
        await expect(footer.page).toHaveURL(/products/);
        await expect(await navBar.getSearchInput()).toHaveAttribute('placeholder', 'Пошук оголошень або послуг'); 
        await navBar.clickLogo();
        await footer.scrollToFooter();

        await footer.clickTendersLink();
        await expect(footer.page).toHaveURL(/tenders-map/);
        await expect(await navBar.getTendersJobRequestsSearchInput()).toHaveAttribute('placeholder', 'Пошук тендера за ключовими словами');

        await navBar.clickLogo();
        await footer.scrollToFooter();
        await footer.clickJobRequestsLink();
        await expect(footer.page).toHaveURL(/requests-map/);
        await expect(await navBar.getTendersJobRequestsSearchInput()).toHaveAttribute('placeholder', 'Пошук запита на роботу за ключовими словами');

        await navBar.clickLogo();
        await expect(await mainPage.getPageTitle()).toBeVisible();
        await footer.scrollToFooter();
        await expect(await footer.getEmail()).toHaveAttribute('href', /mailto/);
    })
});
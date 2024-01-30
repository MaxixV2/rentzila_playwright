import { test, expect } from "@playwright/test";
import { NavBar } from "../pages/components/navbar";
import { ProductsPage } from "../pages/products.page";
import { MainPage } from "../pages/mainPage.page";
import { UnitsPage } from "../pages/units.page";
import { servicesData } from "../fixtures/servicesData.json";
import { vehiclesData } from "../fixtures/vehiclesData.json";

let navBar: NavBar;
let productsPage: ProductsPage;
let mainPage: MainPage;
let unitDetailsPage: UnitsPage;

test.describe('Sections check', () => {
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        navBar = new NavBar(page);
        productsPage = new ProductsPage(page);
        unitDetailsPage = new UnitsPage(page);

        await mainPage.openUrl();
    });

    test('Checking services on the main page', async () => {
        const servicesTabs = await mainPage.getServicesTabs();
        for (let i = 0; i < servicesTabs.length; i++) {
            await mainPage.clickServicesSectionTab(i);
            const services = await mainPage.getServices();
            await expect(services).toHaveLength(7);

            for (let j = 0; j < services.length; j++) {
                await mainPage.scrollToServicesSection();
                await mainPage.clickServicesSectionTab(i);
                await expect(services[j]).toHaveText(servicesData[i].services[j]);
                await mainPage.clickService(j);
                await expect(productsPage.page).toHaveURL(/products/);
                await expect(await productsPage.getSelectedFilters()).toHaveText(servicesData[i].services[j]);

                const unitCards = await productsPage.getUnitCards();
                for (const unitCard of unitCards) {
                    await expect(unitCard).toBeVisible();
                }

                if (unitCards.length > 0) {
                    await productsPage.clickFistUnitCard();
                    await expect(await unitDetailsPage.getServices()).toContainText([servicesData[i].services[j]]);
                }
                await navBar.clickLogo();
            }
        }
    })

    test('Checking special equipment on the main page', async () => {
        const vehiclesTabs = await mainPage.getVehiclesTabs();
        for (let i = 0; i < vehiclesTabs.length; i++) {
            await mainPage.clickVehiclesSectionTab(i);
            const vehicles = await mainPage.getVehicles();
            await expect(vehicles).toHaveLength(7);
            for (let j = 0; j < vehicles.length; j++) {
                await mainPage.scrollToVehiclesSection();
                await mainPage.clickVehiclesSectionTab(i);
                await expect(vehicles[j]).toHaveText(vehiclesData[i].equipment[j].name);
                await mainPage.clickVehicle(j);
                await expect(productsPage.page).toHaveURL(/products/);
                await expect(await productsPage.getSelectedFilters()).toHaveText(vehiclesData[i].equipment[j].filter);

                const unitCards = await productsPage.getUnitCards();
                for (const unitCard of unitCards) {
                    await expect(unitCard).toBeVisible();
                }

                if (unitCards.length > 0) {
                    await productsPage.clickFistUnitCard();
                    const category = await unitDetailsPage.getCategoryName();
                    expect(vehiclesData[i].equipment[j].categories).toContainEqual(category?.replace(/./, c => c.toUpperCase()).trim());
                }
                await navBar.clickLogo();
            }
        }
    })
});


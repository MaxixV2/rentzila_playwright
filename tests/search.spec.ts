import { test, expect } from '@playwright/test';
import { NavBar } from '../pages/components/navbar';
import { ProductsPage } from '../pages/products.page';
import { UnitsPage } from '../pages/units.page';
import searchData from '../fixtures/searchData.json';

let navBar: NavBar;
let productsPage: ProductsPage;
let unitDetailsPage: UnitsPage;

test.describe('Search check', () => {
    test.beforeEach(async ({ page }) => {
        navBar = new NavBar(page);
        productsPage = new ProductsPage(page);
        unitDetailsPage = new UnitsPage(page);

        await navBar.openUrl();
    });

    test("Verify search input", async () => {
        await navBar.clickSearchInput();

        await expect(await navBar.getSearchDropdown()).toBeVisible();
        await expect(await navBar.getSearchHistoryPopup()).toBeVisible();
        await expect(await navBar.getSearchDropdownServices()).toHaveText(searchData.services);
        await expect(await navBar.getSearchDropdownCategories()).toHaveText(searchData.categories);

        await navBar.pressEnter();
        await expect(productsPage.page).toHaveURL(/products/);
        await expect(await navBar.getSearchInput()).toBeEmpty();
        for (const unitCard of await productsPage.getUnitCards()) {
            await expect(unitCard).toBeVisible();
        }

        for (const searchPhrase of searchData.strings) {
            await navBar.clickLogo();
            await navBar.searchItem(searchPhrase);
            await expect(productsPage.page).toHaveURL(/products/);
            await expect(await productsPage.getResultCountMsg()).toContainText(searchPhrase);
            for (const unitCard of await productsPage.getUnitCards()) {
                await expect(unitCard).toBeVisible();
            }

            await productsPage.clickFistUnitCard();
            await expect(unitDetailsPage.page).toHaveURL(/unit/);

            await navBar.clickLogo();
            await navBar.clickSearchInput();
            await expect(await navBar.getSearchDropdown()).toBeVisible();
            await expect(await navBar.getLastSearchHistoryElement()).toHaveText(searchPhrase);
        }

        await navBar.fillSearchInput(searchData.string);
        let searchResults = await navBar.getSearchResults();
        for (const searchResult of searchResults) {
            await expect(searchResult).toContainText(searchData.string);
        }
        await navBar.clickFirstSearchResult();
        await expect(unitDetailsPage.page).toHaveURL(/unit/);
        await expect(await unitDetailsPage.getUnitName()).toContainText(searchData.string);

        await navBar.clickLogo();
        await navBar.fillSearchInput(searchData.empty);
        expect(await navBar.getSearchResults()).toHaveLength(0);
        await expect(await navBar.getSearchDropdownServices()).toHaveCount(0);
        await expect(await navBar.getSearchDropdownCategories()).toHaveCount(0);
        await expect(await navBar.getSearchHistoryElements()).toHaveText([searchData.empty, searchData.string, searchData.strings[1]]);

        await navBar.pressEnter();
        await expect(productsPage.page).toHaveURL(/products/);
        await expect(await productsPage.getResultCountMsg()).toHaveText('Знайдено 0 оголошень на видимій території за запитом " "');

        await navBar.clickLogo();
        await navBar.fillSearchInput(searchData.numbers);
        searchResults = await navBar.getSearchResults();
        for (const searchResult of searchResults) {
            await expect(searchResult).toContainText(searchData.numbers);
        }
        await navBar.pressEnter();
        await expect(await productsPage.getResultCountMsg())
        .toHaveText(new RegExp(`^Знайдено \\d+ (оголошень|оголошення)  на видимій території за запитом "${searchData.numbers}"$`));

        await productsPage.clickFistUnitCard();
        await expect(unitDetailsPage.page).toHaveURL(/unit/);

        for (const symbol of searchData.symbols) {
            await navBar.clickLogo();
            await navBar.fillSearchInput(symbol);
            await expect(await navBar.getSearchInput()).toHaveValue(symbol);
            await expect(await navBar.getSearchDropdown()).toBeVisible();
            searchResults = await navBar.getSearchResults();
            for (const searchResult of searchResults) {
                await expect(searchResult).toContainText(symbol);
            }
            await navBar.pressEnter();
            await expect(productsPage.page).toHaveURL(/products/);
            await expect(await productsPage.getResultCountMsg())
            .toHaveText(new RegExp(`^Знайдено \\d+ (оголошень|оголошення)  на видимій території за запитом "\\${symbol}"$`));
        }

        for (const symbol of searchData.invalidSymbols) {
            await navBar.clickLogo();
            await navBar.fillSearchInput(symbol);

            await navBar.pressEnter();
            await expect(productsPage.page).toHaveURL(/products/);
            await expect(await navBar.getSearchInput()).toBeEmpty();
            for (const unitCard of await productsPage.getUnitCards()) {
                await expect(unitCard).toBeVisible();
            }
        }

        await navBar.clickLogo();
        await navBar.fillSearchInput(searchData.invalidSearch);
        await expect(await navBar.getSearchResults()).toHaveLength(0);

        await navBar.pressEnter();
        await expect(productsPage.page).toHaveURL(/products/);
        await expect(await navBar.getSearchInput()).toHaveValue(searchData.invalidSearch);
        await expect(await productsPage.getResultCountMsg())
        .toHaveText(new RegExp(`^Знайдено 0 оголошень  на видимій території за запитом "${searchData.invalidSearch}"$`));

        await navBar.clickLogo();
        await navBar.fillSearchInput(searchData.validServiceSearch);
        await expect(await navBar.getSearchDropdownServices()).toContainText([searchData.validServiceSearch]);

        await navBar.clickServiceSearchDropdown(searchData.validServiceSearch);
        await expect(productsPage.page).toHaveURL(/products/);
        await expect(await productsPage.getSelectedFilters()).toHaveText(searchData.validServiceSearch);
        await expect(await productsPage.getResultCountMsg())
        .toHaveText(new RegExp(`^Знайдено \\d+ (оголошень|оголошення)  на видимій території $`));

        await navBar.clickLogo();
        await navBar.fillSearchInput(searchData.validVehicleSearch);
        await expect(await navBar.getSearchDropdown()).toBeVisible();
        await expect(await navBar.getSearchDropdownCategories()).toContainText([searchData.validVehicleSearch], { ignoreCase: true });

        await navBar.clickCategorySearchDropdown(searchData.validVehicleSearch);
        await expect(productsPage.page).toHaveURL(/products/);
        await expect(await productsPage.getSelectedFilters()).toContainText(searchData.validVehicleSearch, { ignoreCase: true });
        await expect(await productsPage.getResultCountMsg())
        .toHaveText(new RegExp(`^Знайдено \\d+ (оголошень|оголошення)  на видимій території $`));

        await navBar.clickLogo();
        await navBar.fillSearchInput(searchData.string);
        await expect(await navBar.getSearchDropdown()).toBeVisible();
        searchResults = await navBar.getSearchResults();
        for (const searchResult of searchResults) {
            await expect(searchResult).toContainText(searchData.string);
        }

        await navBar.clickSearchCrossBtn();
        await expect(await navBar.getSearchInput()).toBeEmpty();
        await expect(await navBar.getSearchDropdown()).not.toBeVisible();

        await navBar.refresh();
        await navBar.clickSearchInput();
        await expect(await navBar.getSearchHistoryElements()).toHaveText([searchData.string, searchData.validVehicleSearch, searchData.validServiceSearch]);
    });
});
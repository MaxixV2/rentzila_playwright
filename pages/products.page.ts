import Page from './page';

const resultCountMsg: string = 'h1[class*="MapPagination_count"]';
const selectedFilters: string = '[class*="selectedCategory"]';
const unitCards: string = '[data-testid="cardWrapper"]';

export class ProductsPage extends Page {
    constructor(page: Page['page']) {
        super(page);
    }

    async getSelectedFilters() {
        return await super.getElement(selectedFilters);
    }

    async getUnitCards() {
        return await super.getElementsArray(unitCards);
    }

    async getResultCountMsg() {
        return await super.getElement(resultCountMsg);
    }

    async clickFistUnitCard() {
        await super.clickElementByIndex(unitCards, 0);
        await super.pause(100);
    }
}
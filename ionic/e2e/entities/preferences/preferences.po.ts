import { element, by, browser, ElementFinder } from 'protractor';

export class PreferencesComponentsPage {
  createButton = element(by.css('ion-fab-button'));
  viewButtons = element.all(by.css('ion-item'));
  title = element.all(by.css('ion-title')).get(2);
  noResult = element(by.cssContainingText('ion-label', 'No Preferences found.'));
  entities = element.all(by.css('page-preferences ion-item'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastViewButton(): Promise<void> {
    await this.viewButtons.last().click();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }

  async getEntitiesNumber(): Promise<number> {
    return await this.entities.count();
  }
}

export class PreferencesUpdatePage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  saveButton = element.all(by.css('ion-button')).get(1);

  idInput = element(by.css('ion-input[formControlName="id"] input'));
  weeklyGoalInput = element(by.css('ion-input[formControlName="weeklyGoal"] input'));
  weightUnitsSelect = element(by.css('ion-select[formControlName="weightUnits"]'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }
  async setWeeklyGoalInput(weeklyGoal: string): Promise<void> {
    await this.weeklyGoalInput.sendKeys(weeklyGoal);
  }
  async weightUnitsSelectLastOption(): Promise<void> {
    await this.weightUnitsSelect.click();
    await browser.sleep(500);
    await element.all(by.className('alert-radio')).last().click();
    await element.all(by.className('alert-button')).last().click();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }
}

export class PreferencesDetailPage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  deleteButton = element(by.css('ion-button[color="danger"]'));
  idInput = element.all(by.css('span')).get(1);

  weeklyGoalInput = element.all(by.css('span')).get(2);

  async getIdInput(): Promise<string> {
    return await this.idInput.getText();
  }

  async getWeeklyGoalInput(): Promise<string> {
    return await this.weeklyGoalInput.getText();
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.deleteButton.click();
  }

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }
}

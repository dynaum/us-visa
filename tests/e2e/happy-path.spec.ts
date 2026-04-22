import { test, expect } from '@playwright/test';

test('home → stage → checklist persistence', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/pt-BR$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('visto americano');

  await page.getByRole('link', { name: /Passo a passo/i }).first().click();
  await expect(page).toHaveURL(/\/pt-BR\/guide$/);

  await page.getByRole('link', { name: /DS-160/i }).first().click();
  await expect(page).toHaveURL(/\/pt-BR\/stages\/ds-160$/);

  await page.getByRole('link', { name: /^Checklist$/i }).first().click();
  await expect(page).toHaveURL(/\/pt-BR\/tools\/checklist$/);

  const passport = page.getByLabel(/Passaporte válido/i);
  await passport.check();
  await expect(passport).toBeChecked();

  await page.reload();
  await expect(page.getByLabel(/Passaporte válido/i)).toBeChecked();
});

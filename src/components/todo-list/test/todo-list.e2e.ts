import { newE2EPage } from '@stencil/core/testing';

describe('todo-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<todo-list></todo-list>');

    const element = await page.find('todo-list');
    expect(element).toHaveClass('hydrated');
  });
});

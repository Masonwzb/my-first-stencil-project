import { newSpecPage } from '@stencil/core/testing';
import { TodoList } from '../todo-list';

describe('todo-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TodoList],
      html: `<todo-list></todo-list>`,
    });
    expect(page.root).toEqualHtml(`
      <todo-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </todo-list>
    `);
  });
});

import { query, end } from '../src/db.ts';

test('can connect to db', async () => {
    const result = await query('SELECT 1+1 AS sum');

    expect(parseInt(result.rows[0].sum)).toBe(2);
});

afterAll(async () => {
    await end();
});

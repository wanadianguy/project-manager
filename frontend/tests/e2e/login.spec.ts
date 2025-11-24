import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:5173';
const apiBaseUrl = 'http://localhost:3001';
const email = 'manager@example.com';
const password = 'password';
const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYTk1ZjE3MC1mZjVmLTRhNjUtODg3Ny1jYTZlNTVhNGYzNmQiLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTc2MzgxODY4MSwiZXhwIjoxNzYzODM2NjgxfQ.Am85jI1_H_COJ2tlyX_T0EPpFYmt5Fg31zqCVNBffKQ';
const refreshToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYTk1ZjE3MC1mZjVmLTRhNjUtODg3Ny1jYTZlNTVhNGYzNmQiLCJpYXQiOjE3NjM4MTg2ODEsImV4cCI6MTc2Mzk5MTQ4MX0.Ph0BfR9vRADiBtfDYUmVKPtHrBlyba-2X1uK0tdMTho';

type PostData = {
    email: string;
    password: string;
};

test.describe('login', () => {
    test.beforeEach(async ({ page }) => {
        // End to end tests should not be mocking data but should instead send requests to a test environment or create a temporary one.
        await page.route(`${apiBaseUrl}/auth/login`, (route) => {
            const data: PostData = route.request().postDataJSON();

            if (data.email === email && data.password === password) {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    }),
                });
            } else {
                route.fulfill({
                    status: 401,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        message: 'Bad credentials',
                        error: 'Unauthorized',
                    }),
                });
            }
        });
        await page.goto(`${baseUrl}/login`);
    });

    test('success', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill(email);
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        await page.getByRole('button', { name: 'Sign In' }).click();

        await page.waitForFunction(() => !!localStorage.getItem('accessToken'));

        const token = await page.evaluate(() => localStorage.getItem('accessToken'));
        const role = await page.evaluate(() => localStorage.getItem('role'));

        expect(token).toBe(accessToken);
        expect(role).toBe('manager');
    });

    test('bad credentials', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('');
        await page.getByRole('textbox', { name: 'Password' }).fill('');
        await page.getByRole('button', { name: 'Sign In' }).click();

        const errorMessage = page.getByRole('alert');

        await expect(errorMessage).toBeVisible();
    });
});

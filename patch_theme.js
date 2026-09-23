const fs = require('fs');
let file = 'tests/theme.spec.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/let isDark = await page\.evaluate\(\(\) => document\.documentElement\.classList\.contains\('dark-theme'\)\);\n\s*expect\(isDark\)\.toBe\(true\);/, "await expect(page.locator('html')).toHaveClass(/dark-theme/);");

content = content.replace(/let isLight = await page\.evaluate\(\(\) => document\.documentElement\.classList\.contains\('light-theme'\)\);\n\s*expect\(isLight\)\.toBe\(true\);/, "await expect(page.locator('html')).toHaveClass(/light-theme/);");

fs.writeFileSync(file, content, 'utf8');
console.log('Patched tests/theme.spec.ts');

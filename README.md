# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## GitHub Pages deployment

To deploy the site to GitHub Pages you have two options:

1) GitHub Actions (already added)

- I added a workflow at `.github/workflows/gh-pages.yml` that runs on pushes to `main`. It builds the site and uses `peaceiris/actions-gh-pages` to publish `dist/` to the `gh-pages` branch. If that Action succeeds the site will be available at:

```
https://OmarMostafa6103.github.io/-GoLynk_website/
```

Check the Actions tab on GitHub to see the workflow run and logs: `https://github.com/OmarMostafa6103/-GoLynk_website/actions`

2) Local deploy using the `gh-pages` package

- Install the package and run the deploy script (this will build then push `dist/` to `gh-pages`):

```bash
npm install --save-dev gh-pages
npm run deploy
```

If you prefer to publish locally, the repository now contains `predeploy` and `deploy` scripts in `package.json` that call `vite build` and `gh-pages -d dist` respectively.

Troubleshooting (Windows EPERM errors)

- If you get `EPERM` errors during `npm ci` or `npm run build` on Windows, try the following:
	- Close VS Code and other apps that may lock files.
	- Run your terminal as Administrator.
	- Remove problematic native modules and reinstall:

```powershell
Remove-Item -LiteralPath 'F:\GoLynk\web\node_modules\@esbuild' -Force -Recurse
Remove-Item -LiteralPath 'F:\GoLynk\web\node_modules\@rollup\rollup-win32-x64-msvc' -Force -Recurse
npm ci
npm run build
```

After a successful build you can either rely on the GitHub Actions workflow or run `npm run deploy` locally to create the `gh-pages` branch.

If you want, I can:
- Inspect the latest GitHub Action run logs and fix any build-time issues.
- Attempt a local deploy once you confirm the build succeeds locally (or give me permission to push for you).
